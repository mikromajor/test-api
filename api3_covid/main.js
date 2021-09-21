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
  const inputMenu = document.createElement("button");
  inputMenu.textContent = "Input menu";
  inputMenu.addEventListener("click", () => {
    const inputMenu = document.getElementById("inputMenu");
    console.log("inputMenu.children.length  ->", inputMenu.children.length);
    if (inputMenu.children.length > 1) {
      inputMenu.classList.remove("hidden");
    } else {
      createInputMenu();
    }
  });

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

//  I n p u t (input type='date')
function createInputMenu() {
  const inputMenu = document.getElementById("inputMenu");
  inputMenu.classList.remove("hidden");
  const h3Warning = document.createElement("h3");
  h3Warning.textContent = "Error, you period - zero";
  h3Warning.classList.add("hidden");

  const headerMenu = document.createElement("h3");
  headerMenu.textContent = "Choose the period what you need";

  const labelFirstDate = document.createElement("label");
  labelFirstDate.name = "inputFirstDate";
  labelFirstDate.textContent = "Start (number day ago)";

  const inputFirstDate = document.createElement("input");
  inputFirstDate.id = "inputFirstDate";
  inputFirstDate.type = "Number";
  inputFirstDate.value = 0;

  const labelSecondDate = document.createElement("label");
  labelSecondDate.name = "inputSecondDate";
  labelSecondDate.textContent = "End (number day ago)";

  const inputSecondDate = document.createElement("input");
  inputSecondDate.id = "inputSecondDate";
  inputSecondDate.type = "Number";
  inputSecondDate.value = 100;
  const buttonEnter = document.createElement("button");
  buttonEnter.textContent = "ENTER";
  buttonEnter.addEventListener("click", () => {
    if (inputSecondDate.value - inputFirstDate.value == 0) {
      h3Warning.classList.remove("hidden");
    } else {
      h3Warning.classList.add("hidden");
      addStatistic(
        arrCovidInf[arrCovidInf.length - 1 - inputFirstDate.value],
        arrCovidInf[arrCovidInf.length - 1 - inputSecondDate.value],
        inputSecondDate.value - inputFirstDate.value + " days"
      );
    }
  });

  const buttonHide = document.createElement("button");
  buttonHide.textContent = "Hide menu";
  buttonHide.addEventListener("click", () => {
    inputMenu.classList.add("hidden");
  });
  inputMenu.appendChild(headerMenu);
  inputMenu.appendChild(labelFirstDate);
  inputMenu.appendChild(inputFirstDate);
  inputMenu.appendChild(labelSecondDate);
  inputMenu.appendChild(inputSecondDate);
  inputMenu.appendChild(buttonEnter);
  inputMenu.appendChild(buttonHide);
  inputMenu.appendChild(h3Warning);
  inputMenu.classList.add("content");
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
