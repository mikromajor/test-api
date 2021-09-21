const select = document.getElementById('countriesList');
const response = []; //Covid for statistic calculation

//  fetch 1 get country names
const getCountries = () => {
  const countries = fetch('https://api.covid19api.com/countries')
    .then((response) => {
      if (!response.ok) {
        // statuses 400+
        // if(response.status >= 200 && response.status < 300){
        throw new Error(`Response status is ${response.status}`);
      } else {
        return response;
      }
    })
    .then((request) => request.json())
    .then((data) => {
      console.log('fetch 1 country names =>', data);
      return data;
    })
    .catch((error) => console.log('error in 1-st fetch =>', error)); // 500+ statuses
  return countries;
};
// call fetch get country names
function addCountriesList() {
  getCountries().then((countries) =>
    countries.forEach((obj) => {
      const option = document.createElement('option');
      option.value = obj.Slug;
      option.textContent = obj.Country;
      select.appendChild(option);
    })
  );
}

// set country
select.addEventListener('change', () => {
  clearContent('statistic');
  pullCovidInf(select.value);
});

// fetch 2
function getCovidInf(country) {
  const countryUrl = 'https://api.covid19api.com/country/' + country;

  const covidInf = fetch(countryUrl)
    .then((request) => request.json())
    .then((covidInf) => {
      console.log('fetch 2 - covid inf from country =>', covidInf);

      return covidInf;
    })
    .catch((error) => console.log('error in 2-nd fetch =>', error));
  return covidInf;
}

function pullCovidInf(country) {
  getCovidInf(country).then((Covid) => {
    // checking country  data for availability inform cov
    const content = clearContent('content');
    const h2 = document.createElement('h2');
    if (!Covid.length) {
      h2.textContent = "Server hasn't information about covid-19 in this country";
      content.appendChild(h2);
    } else {
      response.length = 0;

      response.push(...Covid);
      console.log('response -> ', response); //
      createContent();
    }
  });
}

function createContent() {
  const content = clearContent('content');
  const h2 = document.createElement('h2');
  h2.textContent = 'Country - ' + response[response.length - 1].Country;

  const p0 = document.createElement('p');
  p0.textContent = `Date - ${response[response.length - 1].Date}`;

  const p1 = document.createElement('p');
  p1.textContent = `Amount of Active - ${response[response.length - 1].Active}`;
  const p2 = document.createElement('p');
  p2.textContent = `Amount Confirmed  - ${response[response.length - 1].Confirmed}`;

  const p3 = document.createElement('p');
  p3.textContent = `Amount of deaths - ${response[response.length - 1].Deaths}`;

  content.appendChild(h2);
  content.appendChild(p0);
  content.appendChild(p1);
  content.appendChild(p2);
  content.appendChild(p3);
  content.classList.add('content');

  //create BUTTON
  const lastDay = document.createElement('button');
  lastDay.textContent = 'Statistics for last day';
  lastDay.addEventListener('click', () => {
    addStatistic(response[response.length - 1], response[response.length - 2], 'week');
  });
  const week = document.createElement('button');
  week.textContent = 'Statistics for last week';
  week.addEventListener('click', () => {
    addStatistic(response[response.length - 1], response[response.length - 8], 'week');
  });
  const month = document.createElement('button');
  month.textContent = 'Statistics for last month';
  month.addEventListener('click', () => {
    addStatistic(response[response.length - 1], response[response.length - 31], 'month');
  });
  const inputMenu = document.createElement('button');
  inputMenu.textContent = 'Input menu';
  inputMenu.addEventListener('click', () => createInputMenu());

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
  const inputMenu = document.getElementById('inputMenu');
  inputMenu.classList.remove('hidden');
  inputMenu.classList.add('content');

  const labelFirstDate = document.createElement('label');
  labelFirstDate.name = 'inputFirstDate';
  labelFirstDate.textContent = 'Enter start period (number day ago)';

  const inputFirstDate = document.createElement('input');
  inputFirstDate.id = 'inputFirstDate';
  inputFirstDate.type = 'Number';
  inputFirstDate.value = 0;

  //input type='date'
  //

  const labelSecondDate = document.createElement('label');
  labelSecondDate.name = 'inputSecondDate';
  labelSecondDate.textContent = 'Enter end period (number day ago)';

  const inputSecondDate = document.createElement('input');
  inputSecondDate.id = 'inputSecondDate';
  inputSecondDate.type = 'Number';

  inputMenu.appendChild(labelFirstDate); //++++++++++++++++++++

  addStatistic(
    inputFirstDate.value,
    inputSecondDate.value,
    inputFirstDate.value - inputSecondDate.value
  );
}

// add Statistic inf
function addStatistic(today, dayAgo, time) {
  const statistic = clearContent('statistic');

  const deaths = document.createElement('p');
  deaths.textContent = 'People DEATHS -' + (today.Deaths - dayAgo.Deaths);

  const confirmed = document.createElement('p');
  confirmed.textContent = 'People CONFIRMED -' + (today.Confirmed - dayAgo.Confirmed);

  const active = document.createElement('p');
  active.textContent = 'People ACTIVE -' + (today.Active - dayAgo.Active);

  const Time = document.createElement('h2');
  Time.textContent = `For last ${time}`;

  const buttonHideStatistic = document.createElement('button');
  buttonHideStatistic.id = 'buttonHideStatistic';
  buttonHideStatistic.textContent = 'Hide statistics';
  buttonHideStatistic.addEventListener('click', () => {
    clearContent('statistic');
    statistic.classList.add('hidden');
  });
  statistic.classList.remove('hidden');
  statistic.classList.add('content');
  statistic.appendChild(Time);
  statistic.appendChild(active);
  statistic.appendChild(confirmed);
  statistic.appendChild(deaths);
  statistic.appendChild(buttonHideStatistic);
}

//    S   T   A   R    T
document.addEventListener('DOMContentLoaded', () => addCountriesList());

// document.querySelector('#form').addEventListener('submit', (e) => {
//   e.preventDefault();

//   const data = new FormData(e.target);

//   fetch('test.com', {method: 'POST', body: data, 'Content-Type': 'multipart / form - data'});
//   console.log(data.get('first'), data.get('last'), data.get('countries'));
// });
