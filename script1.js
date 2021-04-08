const container = createBootstrap("div", "container");
const colTitle = createBootstrap("div", "mb-3 title");
const title = createBootstrap("h1", "head text-center");
title.innerHTML = "Countries Weather Info";
const rowSelector = createBootstrap("div", "row");
const colSelector = createBootstrap("div", "col-lg-12");
const inputSelectGroup = createBootstrap("div", "input-group");
const inputSelect = createBootstrap("select", "custom-select");
inputSelect.id = "inputGroupSelect";
inputSelect.innerHTML = `<option value ="Select One" selected disabled>Select One</div>`;

const rowCard = createBootstrap("div", "row mx-auto card-row");

inputSelectGroup.append(inputSelect);
colSelector.appendChild(inputSelectGroup);
colTitle.append(title);
rowSelector.appendChild(colSelector);
container.append(rowSelector, rowCard);
document.body.append(colTitle, container);

function createBootstrap(ele, className = "") {
  let element = document.createElement(ele);
  element.setAttribute("class", className);
  return element;
}

let count = 6;


const selectBar = document.querySelector(".custom-select");
const countryUrl = "https://restcountries.eu/rest/v2/all";

fetch(countryUrl)
  .then((res) => res.json())
  .then((data) => {
    list(data);

    selectBar.addEventListener("change", (e) => {
      const countryName = e.target.value;


      const countryData = data.filter((d) => d.name === countryName);
      const countryCapital = countryData[0].capital;


      card(countryData[0]);

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&units=metric&appid=9df134bdc0f2dcc1e0b6bf7d0ae792c1`;
      fetch(weatherUrl)
        .then((res) => res.json())
        .then((data) => cityWeather(data))
        .catch((error) => console.log(error));
    });
  })
  .catch((error) => console.log(error));


function list(countrylist) {
  countrylist.forEach((country) => {
    const selectOption = document.createElement("option");
    selectOption.setAttribute("value", country.name);
    selectOption.innerHTML = `${country.name}`;
    inputSelect.appendChild(selectOption);
  });
}


function card(country) {
  const colCard = createBootstrap("div", "col-md-4 mt-3");
  colCard.innerHTML = `
    <div class="card country-card" style="width: 18rem;">
        <img src="${country.flag}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${country.name}</h5>
            <p class="card-text">Capital: ${country.capital}</p>
            <p class="card-text">Region: ${country.region}</p>
            <p class="card-text">Code: ${country.alpha3Code}</p>
            <button class="button btn btn-primary">Weather</button>
        </div>
      </div>`;
  rowCard.insertBefore(colCard, rowCard.childNodes[0]);
}

function cityWeather(city) {
  const weatherBtn = document.querySelector(".button");
  weatherBtn.addEventListener("click", (e) => {
    let btn = e.target;
    btn.innerHTML = `Capital Weather: ${city.main.temp} C<sup>o</sup>`;
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-success");
  });
}