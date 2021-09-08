/* 
TODO:
  - split code to logical parts (separate functions)
  - change output of user's info to a card view (name, avatar, gender, age, etc.)
  - add styles to card on your own (possible to use external libraries as Bootstrap, etc.)
  - add filtering functionality:
    - add section with filter buttons to tha page
    - create filtering functionality
  - page loading state
*/

// init data
const content = document.getElementById("content");
const loader = document.querySelector("#loader");
const buttonGetUsers = document.querySelector("#buttonGetUsers");

// 1 fetch data
const getUsers = () => {
  const users = fetch("https://randomuser.me/api/?results=10")
    .then((serverSpeak) => serverSpeak.json()) // json => {}
    .then((obj) => obj.results) // {} => {}.results => objUsers
    .catch((error) => console.log("error: ", error));
  return users;
};

const createUserCard = (user) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  li.classList.add("card");
  div.classList.add("card__content");
  li.innerHTML = `<img class="card__img" src="${user.picture.large}"/>`;
  div.innerHTML = `
  <h3 class="card__name">${user.name.first} ${user.name.last}</h3>
  <p><strong> Gender: ${user.gender}</strong></p>
  <p><strong> Country : ${user.location.country}</strong></p>
  <p><strong> Age is Random: ${user.dob.age}</strong></p>
`;
  li.appendChild(div);
  return li;
};

const generateUsersList = (users) => {
  const ul = document.createElement("ul");
  ul.classList.add("users-list");

  users.forEach((user) => {
    console.log(user);
    return ul.appendChild(createUserCard(user));
  });

  return ul;
};

buttonGetUsers.addEventListener("click", () => {
  content.innerHTML = null;
  loader.classList.remove("loader--hidden");

  getUsers()
    .then((users) => content.appendChild(generateUsersList(users)))
    .then(() => loader.classList.add("loader--hidden"));
});

//init

// promise 3 режима : ожид успех возраж

/*
Async:
- AJAX
- Promise
- setTimeout, setInterval
- Web-workers
*/

// const myPromise = new Promise((resolve, reject) => {
//   try {
//     // let i = 0;
//     // while (i < 5000) {
//     //   i++;
//     //   console.log(i);
//     // }
// // resolve('timer');

//     setTimeout(() => {
//       resolve('timer');
//     }, 3000);
//   } catch (e) {
//     reject(e);
//   }
// });

// myPromise
//   .then((data) => console.log('promise data: ', data))
//   .catch((e) => console.log('promise error: ', e));
