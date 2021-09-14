const card = document.getElementById("card");
const ul = document.createElement("ul");
ul.classList.add("ulUserCard");
card.appendChild(ul);
const loader = document.querySelector("#loader");
const button = document.getElementsByTagName("button");
const whenLoading = document.getElementById("whenLoading");
const [smallImgUrls, midleImgUrls, largeImgUrls] = [[1], [2], [3]];

console.log("midleImgUrls ", midleImgUrls);
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
//create but -0 -1
for (let i = 0; i < button.length - 2; i++) {
  button[i].addEventListener("click", () => {
    numBtn = i;
    clearingImgUrls(smallImgUrls, midleImgUrls, largeImgUrls);
    // if comming response from server -> starting processing
    getArrObjUsers()
      .then(
        (arrObjUsers) => iteratingAarrObjUsers(arrObjUsers) //пока проходят здесь процедуры
      )
      .then(() => loader.classList.add("loader__hidden")); //запускается это
  });
}

function clearingImgUrls() {
  for (let i = 0; i < arguments.length; i++) {
    do {
      console.log(arguments[i]);
      arguments[i].pop();
      console.log(arguments[i]);
    } while (arguments[i].length == 1);
  }
}

function iteratingAarrObjUsers(arrObjUsers) {
  console.log(typeof arrObjUsers);

  for (let i = 0; i < arrObjUsers.length; i++) {
    filteringGenderAndSameImg(arrObjUsers[i]);
  }
}
//

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

  return li;
}

let comparing = (str1, str2) => {
  return str1.replace(/\D*/gi, "") == str2.replace(/\D*/gi, "");
};
function saveImg(s, m, l) {
  smallImgUrls.push(s);
  midleImgUrls.push(m);
  largeImgUrls.push(l);
}

function filteringGenderAndSameImg(objUser) {
  switch (numBtn) {
    case 0:
      if (
        objUser.gender == "female" &&
        !largeImgUrls.some((ImgUserUrl) => {
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
        !largeImgUrls.some((ImgUserUrl) => {
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

let nav__ul = document.getElementById("nav__ul");
let timerID = setTimeout(() => nav__ul.classList.add("nav__ul"), 3000);
