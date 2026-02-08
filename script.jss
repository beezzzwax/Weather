function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
const weatherform = document.querySelector(".search");
const search = document.querySelector(".search-input");
const card = document.querySelector(".card");
const apiKey = "YOUR_API_KEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
weatherform.addEventListener("submit", async event => {
});
async function checkWeather(city) {
  event.preventDefault();
  if (!city) return;

  const response = await fetch(apiUrl + city + "&appid=" + apiKey);

  if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    return;
  }

  const data = await response.json();

  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather-icon").style.display = "block";

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML =
    data.main.humidity + "%";
  document.querySelector(".windspeed").innerHTML =
    (data.wind.speed * 3.6).toFixed(1) + " km/h";

  const weather = data.weather[0].main;
  const icon = document.querySelector(".weather-icon img");

  if (weather === "Clouds") icon.src = "images/Cloudy-weather.jpg";
  else if (weather === "Clear") icon.src = "images/Clear-weather.jpg";
  else if (weather === "Rain") icon.src = "images/Rain-weather.jpg";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});
