
let tempContainer = document.querySelector(".temp");
let icon = document.querySelector("#icon");
let weatherType = document.querySelector("#weather-type");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");
let locationContainer = document.querySelector("#location");

const apiKey = "960575f5688b5edd68105b8c9114e151";


function submitLocation(event) {
  event.preventDefault();
  let loc = document.querySelector("#location-input").value.trim();

  apiFetch(loc);
}

function apiFetch(loc) {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`;

  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      tempContainer.innerHTML = data.main.temp;
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherType.innerHTML = data.weather[0].description;
      humidity.innerHTML = data.main.humidity;
      windSpeed.innerHTML = `${(data.wind.speed * 3.6).toFixed(2)} Km/h`; 
      locationContainer.innerHTML = `${data.name}, ${data.sys.country}`;
      
      const weatherMain = data.name[0].main.toLowerCase();
      const country = data.sys.country.toLowerCase();
      const backgroud = `https://source.unsplash.com/1600x900/?${weatherMain},${country}`;
      document.body.style.backgroundImage = `url(${bgUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    })
    .catch((err) => {
      alert("City Not Found");
    });
}

apiFetch("australia");