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
let but2 = button[2].addEventListener("click", () => {});
let but3 = button[3].addEventListener("click", () => {});

//create button  -0 -1

for (let i = 0; i < button.length - 2; i++) {
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
  console.log("called 1 clearingContent()");
  clearingImgUrls();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}
//??????????????????????????????????????????????????
function clearingImgUrls() {
  console.log("called 2 clearingImgUrls()");

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
  console.log("arr L FOTO -> ", arrSavedImg[2].length);
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
          objUser.picture.small,
          objUser.picture.midle,
          objUser.picture.large
        ); // chack -> small, midle
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
  }
}

function creatingUserCard(user) {
  const img = document.createElement("img");
  img.src = user.picture.large;
  img.classList.add("cardFoto");

  const h3 = document.createElement("h3");
  h3.textContent = user.name.first + " " + user.name.last;
  const p = document.createElement("p");
  p.textContent = user.location.country;

  const div_content = document.createElement("div");
  div_content.appendChild(h3);
  div_content.appendChild(p);
  div_content.classList.add("cardContent");

  const div = document.createElement("div");
  div.appendChild(img);
  div.appendChild(div_content);
  div.classList.add("cardBox");
  //////////////////
  const li = document.createElement("li");
  li.appendChild(div);
  li.classList.add("liCard");

  return li;
}

const nav__ul = document.getElementById("nav__ul");
let timerID = setTimeout(() => {
  nav__ul.classList.add("nav__ul"), 3000;
});
