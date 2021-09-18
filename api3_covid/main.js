const select = document.getElementById("countriesList");
let ignoreFirstClick = 0;
let url;
//  fetch get country names
const getCountries = () => {
  const countries = fetch("https://api.covid19api.com/countries")
    .then((request) => request.json())
    .then((data) => {
      console.log("obj from fetch 1 =>", data);
      return data;
    })
    .catch((error) => console.log("error in 1-st fetch =>", error));
  return countries;
};
// call fetch get country names
function addCountriesList() {
  getCountries()
    .then((countries) =>
      countries.forEach((obj) => {
        const option = document.createElement("option");
        option.value = obj.Slug;
        option.textContent = obj.Country;
        select.appendChild(option);
      })
    ) // searching option.selected to call startCreateContent(country)
    // (alternative -> for...in)
    .then(() => {
      select.addEventListener("click", () => {
        let selected = Array.from(select.options)
          .filter((option) => option.selected)
          .map((option) => option.value);
        startCreateContent(selected[0]);
      });
    });
}
// check loading window
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addCountriesList());
} else {
  addCountriesList(); //  <----= START
}
//????????????????????????????????????????
function getCovidInf() {
  console.log("in fetch 2 url looks like-> ", url);
  const covidInf = fetch(url)
    .then((request) => request.json())
    .then((covidInf) => {
      console.log("obj from fetch 2 =>", covidInf);
      return covidInf[0];
    })
    .catch((error) => console.log("error in 2-nd fetch =>", error));
  return covidInf;
}

function startCreateContent(country) {
  // for ignore first click
  if (country == ignoreFirstClick) {
    return undefined;
  }
  ignoreFirstClick = country;
  url = "https://api.covid19api.com/country/" + country;
  //
  getCovidInf().then((objInf) => {
    const content = document.getElementById("content");
    content.removeChild(content.firstChild);
    // create content with
    const h2 = document.createElement("h2");
    h2.textContent = "Country - " + objInf.Country;
    const p1 = document.createElement("p");
    p1.textContent = "DEADTH";
    const p2 = document.createElement("p");

    content.appendChild(h2);
    content.appendChild(p1);
    content.appendChild(p2);
  });
}
