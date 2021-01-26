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
  let formattedDate = `${day}, ${month} ${date}, ${year}`;
  return formattedDate;
}
let now = new Date();
let date = document.querySelector("#date");
date.innerHTML = `${formatDate(now)}`;
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    return `0` + minutes;
  }
  let formattedTime = `${hour}:${minutes}`;
  return formattedTime;
}
let time = document.querySelector("#time");
time.innerHTML = `${formatTime(now)}`;

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
  document.querySelector("#time").innerHTML = formatTime(response.data.time);
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature-c").innerHTML = Math.round(
    response.data.main.temp
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

function searchCity(city) {
  let apiKey = "e056cd661dc38600e82e2301e14e451d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInfo);
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

function convertFToC(event) {
  event.preventDefault();
  document.querySelector("#temperature-c").innerHTML = Math.round(
    response.data.main.temp
  );
}

let celsiusInitial = document.querySelector("#temperature-c");
celsiusInitial.addEventListener("click", convertFToC);

function convertCToF(event) {
  event.preventDefault();
  let celsius = response.data.main.temp;
  let farenheit = document.querySelector("#temperature-c");
  farenheit.innerHTML = celsius * 1.8 + 32;
}

let farenheitInitial = document.querySelector("#temperature-f");
farenheitInitial.addEventListener("click", convertCToF);

searchCity("Tokyo");
