const select = document.getElementById("countriesList");
let ignoreFirstClick = 0;
const response = []; //Covid for statistic calculation
let countryUrl;

//  fetch 1 get country names
const getCountries = () => {
  const countries = fetch("https://api.covid19api.com/countries")
    .then((request) => request.json())
    .then((data) => {
      console.log("fetch 1 country names =>", data);
      return data;
    })
    .catch((error) => console.log("error in 1-st fetch =>", error));
  return countries;
};
// call fetch get country names
function addCountriesList() {
  getCountries().then((countries) =>
    countries.forEach((obj) => {
      const option = document.createElement("option");
      option.value = obj.Slug;
      option.textContent = obj.Country;
      select.appendChild(option);
    })
  );
}
// set country
function selectChangeValue() {
  clearContent("statistic");
  pullCovidInf(document.getElementById("countriesList").value);
}
// fetch 2
function getCovidInf() {
  const covidInf = fetch(countryUrl)
    .then((request) => request.json())
    .then((covidInf) => {
      console.log("fetch 2 - covid inf from country =>", covidInf);
      if (covidInf.length === 0) {
      }
      return covidInf;
    })
    .catch((error) => console.log("error in 2-nd fetch =>", error));
  return covidInf;
}

function pullCovidInf(country) {
  countryUrl = "https://api.covid19api.com/country/" + country;
  getCovidInf().then((Covid) => {
    // checking country  data for availability inform cov
    const content = clearContent("content");
    const h2 = document.createElement("h2");

    if (Covid.length == 0 || Covid[Covid.length - 31].Active == 0) {
      h2.textContent =
        "Server hasn't information about covid-19 in this country";
      content.appendChild(h2);
    } else {
      while (response.length > 0) {
        response.pop();
      }
      response.push(...Covid);
      console.log("response -> ", response); //
      creatContent();
    }
  });
}

function creatContent() {
  const content = clearContent("content");
  const h2 = document.createElement("h2");
  h2.textContent = "Country - " + response[response.length - 1].Country;

  const p0 = document.createElement("p");
  p0.textContent = `Date - ${response[response.length - 1].Date}`;

  const p1 = document.createElement("p");
  p1.textContent = `Amount of Active - ${response[response.length - 1].Active}`;
  const p2 = document.createElement("p");
  p2.textContent = `Amount Confirmed  - ${
    response[response.length - 1].Confirmed
  }`;

  const p3 = document.createElement("p");
  p3.textContent = `Amount of deaths - ${response[response.length - 1].Deaths}`;

  content.appendChild(h2);
  content.appendChild(p0);
  content.appendChild(p1);
  content.appendChild(p2);
  content.appendChild(p3);
  content.classList.add("content");

  //create BUTTON
  const lastDay = document.createElement("button");
  lastDay.textContent = "Statistics for last day";
  lastDay.addEventListener("click", () => {
    addStatistic(
      response[response.length - 1],
      response[response.length - 2],
      "week"
    );
  });
  const week = document.createElement("button");
  week.textContent = "Statistics for last week";
  week.addEventListener("click", () => {
    addStatistic(
      response[response.length - 1],
      response[response.length - 8],
      "week"
    );
  });
  const month = document.createElement("button");
  month.textContent = "Statistics for last month";
  month.addEventListener("click", () => {
    addStatistic(
      response[response.length - 1],
      response[response.length - 31],
      "month"
    );
  });
  const inputMenu = document.createElement("button");
  inputMenu.textContent = "Input menu";
  inputMenu.addEventListener("click", () => createInputMenu());

  content.appendChild(lastDay);
  content.appendChild(week);
  content.appendChild(month);
  content.appendChild(inputMenu);
}

function clearContent(id) {
  const elemDOM = document.getElementById(id);
  if (elemDOM.length <= 1) {
    return elemDOM;
  } else {
    while (elemDOM.firstChild) {
      elemDOM.removeChild(elemDOM.firstChild);
    }
    return elemDOM;
  }
}

// create Input Menu
function createInputMenu() {
  //const inputMenu = clearContent("inputMenu");
  const inputMenu = document.getElementById("inputMenu");
  inputMenu.classList.remove("hidden");
  inputMenu.classList.add("content");

  const labelFirstDate = document.createElement("label");
  labelFirstDate.name = "inputFirstDate";
  labelFirstDate.textContent = "Enter start period (number day ago)";

  const inputFirstDate = document.createElement("input");
  inputFirstDate.id = "inputFirstDate";
  inputFirstDate.type = "Number";
  inputFirstDate.value = 0;

  const labelSecondDate = document.createElement("label");
  labelSecondDate.name = "inputSecondDate";
  labelSecondDate.textContent = "Enter end period (number day ago)";

  const inputSecondDate = document.createElement("input");
  inputSecondDate.id = "inputSecondDate";
  inputSecondDate.type = "Number";

  inputMenu.appendChild(labelFirstDate); //++++++++++++++++++++

  addStatistic(
    inputFirstDate.value,
    inputSecondDate.value,
    inputFirstDate.value - inputSecondDate.value
  );
}

// add Statistic inf
function addStatistic(today, dayAgo, time) {
  const statistic = clearContent("statistic");

  const deaths = document.createElement("p");
  deaths.textContent = "People DEATHS -" + (today.Deaths - dayAgo.Deaths);

  const confirmed = document.createElement("p");
  confirmed.textContent =
    "People CONFIRMED -" + (today.Confirmed - dayAgo.Confirmed);

  const active = document.createElement("p");
  active.textContent = "People ACTIVE -" + (today.Active - dayAgo.Active);

  const Time = document.createElement("h2");
  Time.textContent = `For last ${time}`;

  const buttonHideStatistic = document.createElement("button");
  buttonHideStatistic.id = "buttonHideStatistic";
  buttonHideStatistic.textContent = "Hide statistics";
  buttonHideStatistic.addEventListener("click", () => {
    clearContent("statistic");
    statistic.classList.add("hidden");
  });
  statistic.classList.remove("hidden");
  statistic.classList.add("content");
  statistic.appendChild(Time);
  statistic.appendChild(active);
  statistic.appendChild(confirmed);
  statistic.appendChild(deaths);
  statistic.appendChild(buttonHideStatistic);
}

//    S   T   A   R    T
//  <---= check loading window and  START
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addCountriesList());
} else {
  addCountriesList();
}
