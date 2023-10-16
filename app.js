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
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  celTemp = Math.round(response.data.temperature.current);
  let mainTempElement = document.querySelector("#main-temp");
  mainTempElement.innerHTML = celTemp;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let mainIconElement = document.querySelector("#main-icon");
  mainIconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  mainIconElement.setAttribute("alt", response.data.condition.description);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
}

function search(city) {
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
  let apiKey = "045ace03oteb7d0da03b1286fde00d59";
  let units = "metric";
  let apiUrl = `${apiEndpoint}query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let mainTempElement = document.querySelector("#main-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrTemp = Math.round((celTemp * 9) / 5 + 32);
  mainTempElement.innerHTML = fahrTemp;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let mainTempElement = document.querySelector("#main-temp");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  mainTempElement.innerHTML = celTemp;
}

let celTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Brooklyn");
