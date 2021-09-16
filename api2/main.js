const card = document.getElementById("card");
const ul = document.createElement("ul");
ul.classList.add("ulUserCard");
card.appendChild(ul);

const loader = document.querySelector("#loader");
const button = document.getElementsByTagName("button");
const whenLoading = document.getElementById("whenLoading");

const arrSavedImg = [["smallImgUrls"], ["middleImgUrls"], ["largeImgUrls"]];

const arrButtonNames = [];
let numBtn;
// fetch
const getArrObjUsers = () => {
  const arrObjUsers = fetch("https://randomuser.me/api/?results=20")
    .then((requestOrAnswer) => requestOrAnswer.json())
    .then((obj) => obj.results)
    .catch((error) => console.log("I catched error =>", error));
  console.log("arrObjUsers -> ", arrObjUsers);

  return arrObjUsers;
};

//
//creating access to button
// starting asinch when button clicked
//
let but3 = button[3].addEventListener("click", () => changeImg("L"));
let but4 = button[4].addEventListener("click", () => changeImg("M"));
let but5 = button[5].addEventListener("click", () => changeImg("S"));
let but6 = button[6].addEventListener("click", () => addColorInCard());

//create button  -0 -1

for (let i = 0; i < 3; i++) {
  button[i].addEventListener("click", () => {
    numBtn = i;
    clearingContent();
    // if comming response from server -> starting processing
    getArrObjUsers()
      .then(
        (arrObjUsers) => iteratingAarrObjUsers(arrObjUsers) //пока проходят здесь процедуры
      )
      .then(() => loader.classList.add("loader__hidden")); //запускается это
  });
}
function clearingContent() {
  clearingImgUrls();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

function clearingImgUrls() {
  for (let i = arrSavedImg.length - 1; i >= 0; i--) {
    while (arrSavedImg[i].length >= 1) {
      arrSavedImg[i].pop();
    }
  }
}

function iteratingAarrObjUsers(arrObjUsers) {
  for (let i = 0; i < arrObjUsers.length; i++) {
    filteringGenderAndSameImg(arrObjUsers[i]);
  }
  console.log(" Amound kard =--> ", ul.childElementCount);
  console.log("arr S FOTO -> ", arrSavedImg[2].length);
  console.log("arr S FOTO URL-> ", arrSavedImg[2]);
}

let comparing = (str1, str2) => {
  return str1.replace(/\D*/gi, "") == str2.replace(/\D*/gi, "");
};

function saveImg(s, m, l) {
  arrSavedImg[0].push(s);
  arrSavedImg[1].push(m);
  arrSavedImg[2].push(l);
}

function filteringGenderAndSameImg(objUser) {
  switch (numBtn) {
    case 0:
      if (
        objUser.gender == "female" &&
        !arrSavedImg[2].some((ImgUserUrl) => {
          return comparing(ImgUserUrl, objUser.picture.large);
        })
      ) {
        saveImg(
          objUser.picture.thumbnail,
          objUser.picture.medium,
          objUser.picture.large
        );
        ul.appendChild(creatingUserCard(objUser));
      }
      break;
    case 1:
      if (
        objUser.gender == "male" &&
        !arrSavedImg[2].some((ImgUserUrl) => {
          return comparing(ImgUserUrl, objUser.picture.large);
        })
      ) {
        saveImg(
          objUser.picture.small,
          objUser.picture.midle,
          objUser.picture.large
        ); // chack -> small, midle
        ul.appendChild(creatingUserCard(objUser));
      }
      break;
    case 2:
      if (
        !arrSavedImg[2].some((ImgUserUrl) => {
          return comparing(ImgUserUrl, objUser.picture.large);
        })
      ) {
        saveImg(
          objUser.picture.small,
          objUser.picture.midle,
          objUser.picture.large
        ); // chack -> small, midle
        ul.appendChild(creatingUserCard(objUser));
      }
      break;
  }
}

function creatingUserCard(user) {
  const img = document.createElement("img");
  img.src = user.picture.large;
  img.classList.add("L");

  const h3 = document.createElement("h3");
  h3.textContent = user.name.first + " " + user.name.last;
  const p = document.createElement("p");
  p.textContent = user.location.country;
  const p1 = document.createElement("p");
  p1.textContent = user.gender;

  const div_content = document.createElement("div");
  div_content.appendChild(h3);
  div_content.appendChild(p);
  div_content.appendChild(p1);
  div_content.classList.add("cardContent");

  const div = document.createElement("div");
  div.appendChild(img);
  div.appendChild(div_content);
  div.classList.add("cardBox");

  const li = document.createElement("li");
  li.appendChild(div);
  li.classList.add("liCard");
  return li;
}
// testing  Timeout on Style Top
const nav__ul = document.getElementById("nav__ul");
let timerID = setTimeout(() => {
  nav__ul.classList.add("nav__ul"), 3000;
});

function changeImg(size) {
  const imgs = document.getElementsByTagName("img");
  console.log(imgs);

  let urlImg;
  let style;
  switch (size) {
    case "S":
      urlImg = arrSavedImg[0];
      style = "S";
      break;
    case "M":
      urlImg = arrSavedImg[1];
      style = "M";
      break;
    case "L":
      urlImg = arrSavedImg[2];
      style = "L";
      break;
  }
  console.log(urlImg);
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].src = urlImg[i];

    imgs[i].classList.remove("L");
    imgs[i].classList.remove("M");
    imgs[i].classList.remove("S");
    imgs[i].classList.add(style);
  }
}

function addColorInCard() {
  let i;
  const arr2arrsM_F = findGender();
  for (i = 0; i < arr2arrsM_F[0].length; i++) {
    arr2arrsM_F[0][i].classList.add("male");
  }
  for (i = 0; i < arr2arrsM_F[1].length; i++) {
    arr2arrsM_F[1][i].classList.add("female");
  }
}

function findGender(gender) {
  const arrMales = [];
  const arrFemales = [];
  const arrMalesAndFemales = [];
  const divs_cardContent = document.querySelectorAll("div.cardContent");

  for (let i = 0; i < divs_cardContent.length; i++) {
    if (divs_cardContent[i].lastChild.textContent == "male") {
      arrMales.push(divs_cardContent[i].parentElement);
    } else if (divs_cardContent[i].lastChild.textContent == "female") {
      arrFemales.push(divs_cardContent[i].parentElement);
    }
  }
  if (gender == "X") {
    return arrMales;
  } else if (gender == "Y") {
    return arrFemales;
  } else {
    arrMalesAndFemales.push(arrMales);
    arrMalesAndFemales.push(arrFemales);
    return arrMalesAndFemales;
  }
}
