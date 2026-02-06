function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
const apiKey= "960575f5688b5edd68105b8c9114e151"
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + "&appid=" + apiKey);
  const data = await response.json();

  if (data.cod == "404") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-icon").style.display = "none";
    return;
  }

  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather-icon").style.display = "block";

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".Humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".windspeed").innerHTML = data.wind.speed + " km/h";

  const weather = data.weather[0].main;

  const iconMap = {
    Clouds: "images/Cloudy-weather.jpg",
    Clear: "images/Clear-weather.jpg",
    Rain: "images/Rain-weather.jpg",
    Drizzle: "images/Drizzle-weather.jpg",
    Snow: "images/Snow-weather.jpg",
    Mist: "images/Mist-weather.jpg"
  };

  document.querySelector(".weather-icon img").src =
    iconMap[weather] || "images/default-weather.jpg";
}
