const card = document.getElementById("card");
const ul = document.createElement("ul");
ul.classList.add("ulUserCard");
card.appendChild(ul);

const loader = document.querySelector("#loader");
const buttons = document.getElementsByTagName("button");
const whenLoading = document.getElementById("whenLoading");
const arrButtonNames = [];

// fetch
const getArrObjUsers = () => {
  const arrObjUsers = fetch("https://randomuser.me/api/?results=20")
    .then((request) => request.json())
    .then((obj) => obj.results)
    .catch((error) => console.log("fetch error =>", error));
  console.log("arrObjUsers -> ", arrObjUsers);
  return arrObjUsers;
};

let but3 = buttons[3].addEventListener("click", () => changeImg("L"));
let but4 = buttons[4].addEventListener("click", () => changeImg("M"));
let but5 = buttons[5].addEventListener("click", () => changeImg("S"));
let but6 = buttons[6].addEventListener("click", () => addColorInCard());

for (let i = 0; i < 3; i++) {
  buttons[i].addEventListener("click", (e) => {
    const userGender = e.target.dataset.gender; // <button data-gender="female">...</button>
    loadUsersData(userGender);
  });
}

function loadUsersData(userGender) {
  clearingContent();
  getArrObjUsers()
    .then((arrObjUsers) => filterUsers(arrObjUsers, userGender))
    .then((filteredUsers) => {
      console.log("filteredUsers 2-> ", filteredUsers);

      filteredUsers.forEach((user) => ul.appendChild(creatingUserCard(user)));
    })
    .then(() => loader.classList.add("loader__hidden")); //запускается это
}
function filterUsers(arrObjUsers, userGender) {
  console.log(" 1 arrObjUsers 1.1 userGender -->", arrObjUsers, userGender);

  if (userGender === "all") return arrObjUsers;

  return arrObjUsers.filter((user) => user.gender === userGender);
}

function clearingContent() {
  // clearingImgUrls();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}
function creatingUserCard(user) {
  const imgL = document.createElement("img");
  imgL.addEventListener("click", lookBigCard);
  imgL.src = user.picture.large;
  imgL.classList.add("L");

  const imgM = document.createElement("img");
  imgM.addEventListener("click", lookBigCard);
  imgM.src = user.picture.medium;
  imgM.classList.add("M");
  imgM.classList.add("hidden");

  const imgS = document.createElement("img");
  imgS.addEventListener("click", lookBigCard);
  imgS.src = user.picture.thumbnail;
  imgS.classList.add("S");
  imgS.classList.add("hidden");

  const h3 = document.createElement("h3");
  h3.textContent = `${user.name.first} ${user.name.last}`;
  const p = document.createElement("p");
  p.textContent = user.location.country;
  const p1 = document.createElement("p");
  p1.textContent = user.gender;

  const div_content = document.createElement("div");
  div_content.appendChild(h3);
  div_content.appendChild(p);
  div_content.appendChild(p1);
  div_content.classList.add("cardContent");

  const div__hidden = document.createElement("div");
  div__hidden.classList.add("cardContent", "hidden");
  div__hidden.data = "additional";
  div__hidden.innerHTML = `
  <p> email: ${user.email}</p>
  <p> Phone: ${user.phone}</p>
  <p> State: ${user.state}</p>
  <p> Age: ${user.dob.age}</p>
   `;
  const dataAtr = document.createAttribute("data-atr");
  dataAtr.value = "no meter";
  div__hidden.setAttributeNode(dataAtr);

  const div = document.createElement("div");
  div.appendChild(imgL);
  div.appendChild(imgM);
  div.appendChild(imgS);
  div.appendChild(div_content);
  div.appendChild(div__hidden);
  div.classList.add("cardBox");
  div.classList.add(`cardBox--${user.gender}`); // BEM

  const li = document.createElement("li");
  li.appendChild(div);
  li.classList.add("liCard");
  return li;
}

function changeImg(size) {
  const images = document.querySelectorAll(".cardBox img");
  console.log("all img class list ->");

  switch (size) {
    case "L":
      for (let i = 0; i < images.length; i++) {
        if (!images[i].classList.contains("L")) {
          images[i].classList.add("hidden");
        } else {
          images[i].classList.remove("hidden");
        }
      }
      break;
    case "M":
      for (let i = 0; i < images.length; i++) {
        if (!images[i].classList.contains("M")) {
          images[i].classList.add("hidden");
        } else {
          images[i].classList.remove("hidden");
        }
      }
      break;
    case "S":
      for (let i = 0; i < images.length; i++) {
        if (!images[i].classList.contains("S")) {
          images[i].classList.add("hidden");
        } else {
          images[i].classList.remove("hidden");
        }
      }
      break;
  }
}
function addColorInCard() {
  const divs_cardBox = document.querySelectorAll("div.cardBox");
  for (let i = 0; i < divs_cardBox.length; i++) {
    divs_cardBox[i].classList.add("colored");
  }
}

function lookBigCard(e) {
  const img = e.target;
  const divsHidden = document.querySelectorAll("div[data-atr]");
  img.parentElement.classList.toggle("bigCard");

  if (img.parentElement.classList.contains("bigCard")) {
    divsHidden.forEach((divHidden) => {
      if (divHidden.parentElement === img.parentElement) {
        setTimeout(() => divHidden.classList.remove("hidden"), 500);
      }
    });
  } else {
    divsHidden.forEach((divHidden) => {
      if (divHidden.parentElement === img.parentElement) {
        divHidden.classList.add("hidden");
      }
    });
  }
}
