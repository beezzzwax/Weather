const apiKey= "960575f5688b5edd68105b8c9114e151"
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
async function checkWeather(city){
  const response= await fetch(apiUrl + city + "&appid=" + apiKey);
  var data= await response.json();
  console.log(data);
  if(response.status==404){
    document.querySelector(".error").style.display="block";
    document.querySelector(".weather-icon").style.display="none";
  } else {
    document.querySelector(".error").style.display="none";
    document.querySelector(".weather-icon").style.display="block";
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
    document.querySelector(".Humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".windspeed").innerHTML=data.wind.speed + " km/h";
    if(data.weather[0].main=="Clouds"){
      document.querySelector(".weather-icon img").src="images/Cloudy-weather.jpg";
    }
    else if(data.weather[0].main=="Clear"){
      document.querySelector(".weather-icon img").src="images/Clear-weather.jpg";
    }
    else if(data.weather[0].main=="Rain"){
      document.querySelector(".weather-icon img").src="images/Rain-weather.jpg";
    }
  }
}
searchBtn.addEventListener("click", ()=>{
                checkWeather(searchBox.value);
});
