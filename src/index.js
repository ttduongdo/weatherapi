// Import our custom CSS
import "./scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import Alert from "bootstrap/js/dist/alert";

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from "bootstrap";

const unitC = "°C";
const unitF = "°F";

async function populate() {
  const requestURL =
    "https://api.weatherapi.com/v1/current.json?key=5b897c4ce27240a0b3305927232909&q=";
  const URL = makeURL(requestURL);
  const response = await fetch(URL);
  const data = await response.json();

  populateCity(data);
  populateInfo(data);
}

function populateCity(obj) {
  const city = document.querySelector(".city");
  city.textContent = `${obj.location.name}, ${obj.location.country}`;

  const temp = document.querySelector(".temp");
  temp.textContent = `${obj.current.temp_c}`;
}

function populateInfo(obj) {
  const tempC = obj.current.feelslike_c;

  const tempF = obj.current.feelslike_f;

  const condition = document.querySelector(".condition");
  const feelslike = document.querySelector(".feelslike");
  const humidity = document.querySelector(".humidity");
  const uv = document.querySelector(".uv");

  condition.textContent = obj.current.condition.text;
  feelslike.textContent = `Feels like: ${tempC} ${unitC}`;
  humidity.textContent = `Humidity: ${obj.current.humidity}%`;
  uv.textContent = `UV Index: ${obj.current.uv}`;
}

function makeURL(url) {
  const location = search.value;
  location.toLowerCase();
  url = url + location;
  return url;
}

const search = document.querySelector("#locate");

search.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    populate();
    search.value = "";
  }
});
