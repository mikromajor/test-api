const card = document.getElementById('card');
const ul = document.createElement('ul');
ul.classList.add('ulUserCard');
card.appendChild(ul);

const loader = document.querySelector('#loader');
const buttons = document.getElementsByTagName('button');
const whenLoading = document.getElementById('whenLoading');
const arrButtonNames = [];

// fetch
const getArrObjUsers = () => {
  const arrObjUsers = fetch('https://randomuser.me/api/?results=20')
    .then((request) => request.json())
    .then((obj) => obj.results)
    .catch((error) => console.log('fetch error =>', error));
  console.log('arrObjUsers -> ', arrObjUsers);
  return arrObjUsers;
};

let but3 = buttons[3].addEventListener('click', () => changeImg('L'));
let but4 = buttons[4].addEventListener('click', () => changeImg('M'));
let but5 = buttons[5].addEventListener('click', () => changeImg('S'));
let but6 = buttons[6].addEventListener('click', () => addColorInCard());

for (let i = 0; i < 3; i++) {
  buttons[i].addEventListener('click', (e) => {
    const userGender = e.target.dataset.gender; // <button data-gender="female">...</button>
    loadUsersData(userGender);
  });
}

function loadUsersData(userGender) {
  clearingContent();
  getArrObjUsers()
    .then((arrObjUsers) => filterUsers(arrObjUsers, userGender))
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
function addColorInCard() {
  const divs_cardBox = document.querySelectorAll('div.cardBox');
  for (let i = 0; i < divs_cardBox.length; i++) {
    divs_cardBox[i].classList.add('colored');
  }
}
