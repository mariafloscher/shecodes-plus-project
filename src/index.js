function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let formattedDate = `${day} ${"<br />"} ${month} ${date.getDate()}, ${year}`;
  return formattedDate;
}

let now = new Date();
let date = document.querySelector("#date");
date.innerHTML = `${formatDate(now)}`;

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0` + hour;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0` + minutes;
  }
  let formattedTime = `${hour}:${minutes}`;
  return formattedTime;
}

function showWeatherInfo(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#country-name").innerHTML = response.data.sys.country;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);
  document.querySelector("#latitude").innerHTML = response.data.coord.lat;
  document.querySelector("#longitude").innerHTML = response.data.coord.lon;
  document.querySelector("#time-zone").innerHTML = Math.round(
    response.data.timezone / 3600
  );
  document.querySelector("#time").innerHTML = formatTime(
    response.data.dt * 1000
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature-value").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure
  );
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-sm-2">
   <h2>${formatTime(forecast.dt * 1000)}</h2>
     <h3>
       <span class="icon-today">
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"/>
       </span>
      </h3>
        <h4 class="highest-temperature">${Math.round(
          forecast.main.temp_max
        )}º</h4>
        <h4 class="lowest-temperature">${Math.round(
          forecast.main.temp_min
        )}º</h4>
    </div>`;
  }
}

function searchCity(city) {
  let apiKey = "e056cd661dc38600e82e2301e14e451d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInfo);

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function handleCitySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "e056cd661dc38600e82e2301e14e451d";
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInfo);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let cityForm = document.querySelector("#search-city-form");
cityForm.addEventListener("submit", handleCitySubmit);

function convertCToF(event) {
  event.preventDefault();
  celsiusInitial.classList.remove("active");
  fahrenheitInitial.classList.add("active");
  let temperatureElement = document.querySelector("#temperature-value");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertFToC(event) {
  event.preventDefault();
  celsiusInitial.classList.add("active");
  fahrenheitInitial.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitInitial = document.querySelector("#temperature-f");
fahrenheitInitial.addEventListener("click", convertCToF);

let celsiusInitial = document.querySelector("#temperature-c");
celsiusInitial.addEventListener("click", convertFToC);

searchCity("Tokyo");
