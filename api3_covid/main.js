const select = document.getElementById("countriesList");
const arrCovidInf = []; //Covid for statistic calculation

//    get Inf from  Server
async function getServerInf(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Response status fetch is : ${response.status}`);
  } else {
    const arrObjects = await response.json();
    return arrObjects;
  }
}

// call fetch  get country names and covid inf
function addCountriesList() {
  getServerInf("https://api.covid19api.com/countries")
    .then((arrObjs) => {
      console.log("fetch 1 country names =>", arrObjs);
      arrObjs.forEach((obj) => {
        const option = document.createElement("option");
        option.value = obj.Slug;
        option.textContent = obj.Country;
        select.appendChild(option);
      });
    })
    .catch((e) => {
      console.log(
        "There has been a problem with your fetch 1 operation: " + e.message
      );
    });
}

// set country
select.addEventListener("change", () => {
  const statistic = clearContent("statistic");
  statistic.classList.add("hidden");
  pullCovidInf(select.value);
});

function pullCovidInf(country) {
  getServerInf("https://api.covid19api.com/country/" + country)
    .then((Covid) => {
      const h2 = document.createElement("h2");
      if (!Covid.length) {
        h2.textContent =
          "Server hasn't information about covid-19 in this country";
        document.getElementById("content").appendChild(h2);
      } else {
        arrCovidInf.length = 0;

        arrCovidInf.push(...Covid);
        console.log("arrCovidInf -> ", arrCovidInf); //
        createContent();
      }
    })
    .catch((error) => console.log("error in 2-nd fetch =>", error));
}

// C O N T E N T
function createContent() {
  const content = clearContent("content");
  const h2 = document.createElement("h2");
  h2.textContent = arrCovidInf[arrCovidInf.length - 1].Country;

  const p0 = document.createElement("p");
  p0.textContent = `Date - ${arrCovidInf[arrCovidInf.length - 1].Date}`;

  const p1 = document.createElement("p");
  p1.textContent = `Amount of Active - ${
    arrCovidInf[arrCovidInf.length - 1].Active
  }`;
  const p2 = document.createElement("p");
  p2.textContent = `Amount Confirmed  - ${
    arrCovidInf[arrCovidInf.length - 1].Confirmed
  }`;

  const p3 = document.createElement("p");
  p3.textContent = `Amount of deaths - ${
    arrCovidInf[arrCovidInf.length - 1].Deaths
  }`;

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
      arrCovidInf[arrCovidInf.length - 1],
      arrCovidInf[arrCovidInf.length - 2],
      "day"
    );
  });
  const week = document.createElement("button");
  week.textContent = "Statistics for last week";
  week.addEventListener("click", () => {
    addStatistic(
      arrCovidInf[arrCovidInf.length - 1],
      arrCovidInf[arrCovidInf.length - 8],
      "week"
    );
  });
  const month = document.createElement("button");
  month.textContent = "Statistics for last month";
  month.addEventListener("click", () => {
    addStatistic(
      arrCovidInf[arrCovidInf.length - 1],
      arrCovidInf[arrCovidInf.length - 31],
      "month"
    );
  });
  const menuInput = document.createElement("button");
  menuInput.textContent = "Input menu";
  menuInput.addEventListener("click", () => {
    const menuInput = document.getElementById("menuInput");
    console.log("menuInput.children.length  ->", menuInput.children.length);
    if (menuInput.children.length > 1) {
      menuInput.classList.remove("hidden");
    } else {
      createInputMenu();
    }
  });

  content.appendChild(lastDay);
  content.appendChild(week);
  content.appendChild(month);
  content.appendChild(menuInput);
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

//  I n p u t
function createInputMenu() {
  const menuInput = document.getElementById("menuInput");
  menuInput.classList.remove("hidden");

  const h3Warning = document.createElement("h3");
  h3Warning.id = "warning";
  h3Warning.classList.add("hidden");

  const headerMenu = document.createElement("h3");
  headerMenu.textContent = "Choose the period what you need";

  const labelFirstDate = document.createElement("label");
  labelFirstDate.name = "inputFirstDate";
  labelFirstDate.textContent = "First date";

  const inputFirstDate = document.createElement("input");
  inputFirstDate.id = "inputFirstDate";
  inputFirstDate.type = "Date";
  inputFirstDate.value = "2020 6 17";

  const labelSecondDate = document.createElement("label");
  labelSecondDate.name = "inputLastDate";
  labelSecondDate.textContent = "Last date";

  const inputLastDate = document.createElement("input");
  inputLastDate.id = "inputLastDate";
  inputLastDate.type = "Date";
  inputLastDate.value = "2021 6 17";

  const buttonEnter = document.createElement("button");
  buttonEnter.textContent = "ENTER";
  buttonEnter.addEventListener("click", () => {
    calculationPeriod(inputFirstDate.value, inputLastDate.value);
  });

  const buttonHide = document.createElement("button");
  buttonHide.textContent = "Hide menu";
  buttonHide.addEventListener("click", () => {
    menuInput.classList.add("hidden");
  });
  menuInput.appendChild(headerMenu);
  menuInput.appendChild(labelFirstDate);
  menuInput.appendChild(inputFirstDate);
  menuInput.appendChild(labelSecondDate);
  menuInput.appendChild(inputLastDate);
  menuInput.appendChild(buttonEnter);
  menuInput.appendChild(buttonHide);
  menuInput.appendChild(h3Warning);
  menuInput.classList.add("content");
}

function calculationPeriod(first, last) {
  const h3Warning = document.getElementById("warning");
  const dateToday = new Date();
  const dateFirst = new Date(first);
  const dateLast = new Date(last);
  const T_F = Math.trunc((dateToday - dateFirst) / 86400000);
  const T_L = Math.trunc((dateToday - dateLast) / 86400000);
  console.log("T_F", T_F);
  console.log("T_L", T_L);
  if (T_F > arrCovidInf.length || T_L > arrCovidInf.length) {
    h3Warning.textContent = `Available information about covid does not exceed ${arrCovidInf.length} days from today`;
    h3Warning.classList.remove("hidden");
  } else if (dateFirst - dateLast) {
    h3Warning.classList.add("hidden");
    addStatistic(
      arrCovidInf[
        arrCovidInf.length - 1 - Math.trunc((dateToday - dateFirst) / 86400000)
      ],
      arrCovidInf[
        arrCovidInf.length - 1 - Math.trunc((dateToday - dateLast) / 86400000)
      ],
      Math.abs(T_F - T_L) + " days"
    );
  } else {
    h3Warning.textContent = "Error, entered yours period is zero";
    h3Warning.classList.remove("hidden");
  }
}

// add Statistic inf
function addStatistic(today, dayAgo, time) {
  const statistic = clearContent("statistic");

  const deaths = document.createElement("p");
  deaths.textContent =
    "People DEATHS: " + Math.abs(today.Deaths - dayAgo.Deaths);

  const confirmed = document.createElement("p");
  confirmed.textContent =
    "People CONFIRMED: " + Math.abs(today.Confirmed - dayAgo.Confirmed);

  const active = document.createElement("p");
  active.textContent =
    "People ACTIVE: " + Math.abs(today.Active - dayAgo.Active);

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
document.addEventListener("DOMContentLoaded", () => addCountriesList());

// document.querySelector('#form').addEventListener('submit', (e) => {
//   e.preventDefault();

//   const data = new FormData(e.target);

//   fetch('test.com', {method: 'POST', body: data, 'Content-Type': 'multipart / form - data'});
//   console.log(data.get('first'), data.get('last'), data.get('countries'));
// });
