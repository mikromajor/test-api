const card = document.getElementById('card');
const ul = document.createElement('ul');
ul.classList.add('ulUserCard');
card.appendChild(ul);

const loader = document.querySelector('#loader');
const buttons = document.getElementsByTagName('button');
const whenLoading = document.getElementById('whenLoading');

const arrSavedImg = [['smallImgUrls'], ['middleImgUrls'], ['largeImgUrls']];
// {smallImgUrls: [], middleImgUrls:[], largeImgUrls:[]}

// for ... in

const arrButtonNames = [];
let numBtn;

// fetch
const getArrObjUsers = () => {
  const arrObjUsers = fetch('https://randomuser.me/api/?results=20')
    .then((requestOrAnswer) => requestOrAnswer.json())
    .then((obj) => obj.results)
    .catch((error) => console.log('I catched error =>', error));
  console.log('arrObjUsers -> ', arrObjUsers);

  return arrObjUsers;
};

//
//creating access to button
// starting asinch when button clicked
//
let but3 = buttons[3].addEventListener('click', () => changeImg('L'));
let but4 = buttons[4].addEventListener('click', () => changeImg('M'));
let but5 = buttons[5].addEventListener('click', () => changeImg('S'));
let but6 = buttons[6].addEventListener('click', () => addColorInCard());

//create button  -0 -1 and call results fetch
for (let i = 0; i < 3; i++) {

  buttons[i].addEventListener('click', (e) => {
    // numBtn = i;

    // e.target.dataset('gender')//same
    // e.target.getAttribute('data-gender')// какая кнп нажата

    const userGender = e.target.dataset.gender; // <button data-gender="female">...</button>
    loadUsersData(userGender);
  });
}
function loadUsersData(userGender) {
  clearingContent();
  // if comming response from server -> starting processing
  getArrObjUsers()
    .then((arrObjUsers) => filterUsers(arrObjUsers, userGender))
    // .then(filteredUsers => ul.append(...filteredUsers.map(user => creatingUserCard(user)))) //пока проходят здесь процедуры
    .then((filteredUsers) =>
      filteredUsers.forEach((user) => ul.appendChild(creatingUserCard(user)))
    )
    .then(() => loader.classList.add('loader__hidden')); //запускается это
}
function filterUsers(arrObjUsers, userGender) {
  if (userGender === 'all') return arrObjUsers;

  return arrObjUsers.filter((user) => user.gender === userGender);
}

function clearingContent() {
  // clearingImgUrls();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

// function clearingImgUrls() {
//   for (let i = arrSavedImg.length - 1; i >= 0; i--) {
//     while (arrSavedImg[i].length >= 1) {
//       arrSavedImg[i].pop();
//     }
//   }
// }


// function iteratingArrObjUsers(arrObjUsers) {
//   // for (let i = 0; i < arrObjUsers.length; i++) {
//   //   filterGenderAndSameImg(arrObjUsers[i]);
//   // }


//   arrObjUsers.forEach((element) => filterGenderAndSameImg(element));

//   console.log(' Amound kard =--> ', ul.childElementCount);
//   console.log('arr S FOTO -> ', arrSavedImg[2].length);
//   console.log('arr S FOTO URL-> ', arrSavedImg[2]);
// }

// let comparing = (str1, str2) => {
//   return str1.replace(/\D*/gi, '') == str2.replace(/\D*/gi, '');
// };

// function saveImg(s, m, l) {
//   arrSavedImg[0].push(s);
//   arrSavedImg[1].push(m);
//   arrSavedImg[2].push(l);
// }

// function filterGenderAndSameImg(objUser) {
//   switch (numBtn) {
//     case 0:
//       if (
//         objUser.gender == 'female' &&
//         !arrSavedImg[2].some((ImgUserUrl) => {
//           return comparing(ImgUserUrl, objUser.picture.large);
//         })
//       ) {
//         saveImg(objUser.picture.thumbnail, objUser.picture.medium, objUser.picture.large);
//         ul.appendChild(creatingUserCard(objUser));
//       }
//       break;
//     case 1:
//       if (
//         objUser.gender == 'male' &&
//         !arrSavedImg[2].some((ImgUserUrl) => {
//           return comparing(ImgUserUrl, objUser.picture.large);
//         })
//       ) {
//         saveImg(objUser.picture.small, objUser.picture.midle, objUser.picture.large); // chack -> small, midle
//         ul.appendChild(creatingUserCard(objUser));
//       }
//       break;
//     case 2:
//       if (
//         !arrSavedImg[2].some((ImgUserUrl) => {
//           return comparing(ImgUserUrl, objUser.picture.large);
//         })
//       ) {
//         saveImg(objUser.picture.small, objUser.picture.midle, objUser.picture.large); // chack -> small, midle
//         ul.appendChild(creatingUserCard(objUser));
//       }
//       break;
//   }
// }

function creatingUserCard(user) {
  const imgL = document.createElement('img');
  imgL.src = user.picture.large;
  imgL.classList.add('L');

  const imgM = document.createElement('img');
  imgM.src = user.picture.medium;
  imgM.classList.add('M');
  imgM.classList.add('hidden');

  const imgS = document.createElement('img');
  imgS.src = user.picture.thumbnail;
  imgS.classList.add('S');
  imgS.classList.add('hidden');

  const h3 = document.createElement('h3');
  h3.textContent = user.name.first + ' ' + user.name.last; // `${user.name.first} ${user.name.last}`
  const p = document.createElement('p');
  p.textContent = user.location.country;
  const p1 = document.createElement('p');
  p1.textContent = user.gender;

  const div_content = document.createElement('div');
  div_content.appendChild(h3);
  div_content.appendChild(p);
  div_content.appendChild(p1);
  div_content.classList.add('cardContent');

  const div = document.createElement('div');
  div.appendChild(imgL);
  div.appendChild(imgM);
  div.appendChild(imgS);
  div.appendChild(div_content);
  div.classList.add('cardBox');
  div.classList.add(`cardBox--${user.gender}`); // BEM

  const li = document.createElement('li');
  li.appendChild(div);
  li.classList.add('liCard');
  return li;
}
// testing  Timeout on Style Top
const nav__ul = document.getElementById('nav__ul');
let timerID = setTimeout(() => {
  nav__ul.classList.add('nav__ul'), 3000;
});

function changeImg(size) {
  const images = document.querySelectorAll('.cardBox img');
  switch (size) {
    case 'L':
      for (let i = 0; i < images.length; i++) {
        if (!images[i].classList.contains('L')) {
          images[i].classList.add('hidden');
        } else {
          images[i].classList.remove('hidden');
        }
      }
  }
}

// function changeImg(size) {
//   const imgs = document.getElementsByTagName('img');
//   console.log(imgs);

//   let urlImg;
//   let style;
//   switch (size) {
//     case 'S':
//       urlImg = arrSavedImg[0];
//       style = 'S';
//       break;
//     case 'M':
//       urlImg = arrSavedImg[1];
//       style = 'M';
//       break;
//     case 'L':
//       urlImg = arrSavedImg[2];
//       style = 'L';
//       break;
//   }
//   console.log(urlImg);
//   for (let i = 0; i < imgs.length; i++) {
//     imgs[i].src = urlImg[i];

//     imgs[i].classList.remove('L');
//     imgs[i].classList.remove('M');
//     imgs[i].classList.remove('S');
//     imgs[i].classList.add(style);
//   }
// }

function addColorInCard() {
  const divs_cardBox = document.querySelectorAll('div.cardBox');
  for (let i = 0; i < divs_cardBox.length; i++) {
    divs_cardBox[i].classList.add('colored');
  }
  // let i;
  // const arr2arrsM_F = findGender();
  // for (i = 0; i < arr2arrsM_F[0].length; i++) {
  //   arr2arrsM_F[0][i].classList.add('male');
  // }
  // for (i = 0; i < arr2arrsM_F[1].length; i++) {
  //   arr2arrsM_F[1][i].classList.add('female');
  // }
}

// function findGender(gender) {
//   const arrMales = [];
//   const arrFemales = [];
//   const arrMalesAndFemales = [];
//   const divs_cardBox = document.querySelectorAll('div.cardBox');

//   for (let i = 0; i < divs_cardBox.length; i++) {
//     if (divs_cardBox[i].classList.contains('cardBox--male')) {
//       arrMales.push(divs_cardBox[i]);
//     } else if (divs_cardBox[i].classList.contains('cardBox--female')) {
//       arrFemales.push(divs_cardBox[i]);
//     }
//   }
//   if (gender == 'X') {
//     return arrMales;
//   } else if (gender == 'Y') {
//     return arrFemales;
//   } else {
//     arrMalesAndFemales.push(arrMales);
//     arrMalesAndFemales.push(arrFemales);
//     return arrMalesAndFemales;
//   }
// }
