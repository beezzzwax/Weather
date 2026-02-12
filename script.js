let tempContainer = document.querySelector(".temp");
let icon = document.querySelector("#icon");
let weatherType = document.querySelector("#weather-type");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");
let locationContainer = document.querySelector("#location");

const apiKey = "960575f5688b5edd68105b8c9114e151";


navigator.geolocation.getCurrentPosition(
  function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    apiFetchByCoords(lat, lon);
  },
  function () {
    apiFetch("Sydney");
  }
);

function submitLocation(event) {
  event.preventDefault();
  let loc = document.querySelector("#location-input").value.trim();
  apiFetch(loc);
}

function apiFetch(loc) {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`;

  fetch(api)
    .then((res) => res.json())
    .then((data) => display(data))
    .catch(() => alert("City Not Found"));
}

function apiFetchByCoords(lat, lon) {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(api)
    .then((res) => res.json())
    .then((data) => display(data));
}

function display(data) {
  tempContainer.innerHTML = Math.round(data.main.temp) + "°C";
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherType.innerHTML = data.weather[0].description;
  humidity.innerHTML = data.main.humidity;
  windSpeed.innerHTML = `${(data.wind.speed * 3.6).toFixed(2)} Km/h`;
  locationContainer.innerHTML = `${data.name}, ${data.sys.country}`;

  let condition = data.weather[0].main.toLowerCase();
  let backgroundImage = "";

  switch (condition) {
    case "clouds":
      backgroundImage = "Images/clouds.gif";
      break;
    case "rain":
      backgroundImage = "Images/rainy.gif";
      break;
    case "snow":
      backgroundImage = "Images/snowy.gif";
      break;
    case "clear":
      backgroundImage = "Images/sun.gif";
      break;
    default:
      backgroundImage = "Images/default.jpg";
  }

  document.body.style.backgroundImage = `url('${backgroundImage}')`;
}
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
