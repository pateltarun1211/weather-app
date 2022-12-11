const APIKey = "d691f3d54b136b743c6eedc7c43f34b7";
const urlBase = "https://api.openweathermap.org/data/2.5/";

let inputLocation = document.querySelector("#inputLocation");
let loc = document.querySelector("#loc");
let btn = document.querySelector("#btn");
let date = document.querySelector("#date");
let temp = document.querySelector("#temp");
let weather = document.querySelector("#weather");
let background = document.querySelector("#background");
let showWeather = document.querySelector("#showWeather");

inputLocation.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (inputLocation.value != "") {
      fetchWeather();
    }
  }
});

btn.addEventListener("click", function () {
  if (inputLocation.value != "") {
    fetchWeather();
  }
});

function fetchWeather() {
  fetch(
    `${urlBase}weather?q=${inputLocation.value}&units=metric&appid=${APIKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      loc.innerHTML = data.name;
      temp.innerHTML = setDegrees(data.main.temp) + "&#8451";
      weather.innerHTML = data.weather[0].main;
      setBackground(data.weather[0].main);
      date.innerHTML = getDate();
      showWeather.classList.remove("hidden");
    })
    .catch((err) => {
      console.log(err);
    });
}

function setDegrees(number) {
  return String(number).slice(0, 2);
}

function getDate() {
  let d = new Date();
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
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function setBackground(weather) {
  if (weather == "Rain") {
    background.src = "./resources/rainy-weather.jpg";
  } else if (weather == "Snow") {
    background.src = "./resources/snowy-weather.jpg";
  } else if (weather == "Clear") {
    background.src = "./resources/sunny-weather.jpg";
  } else if (weather == "Clouds") {
    background.src = "./resources/cloudy-weather.jpg";
  }
}