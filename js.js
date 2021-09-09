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
const buttonGetFemale = document.querySelector("#buttonGetFemale");
const buttonGetGirl = document.querySelector("#buttonGetGirl");

// 1 fetch data
const getUsers = () => {
  const users = fetch("https://randomuser.me/api/?results=200")
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

const generateFilteredUsersList = (users, numBtn) => {
  const arrImg = [];
  let imgRepeatTest;
  let counter = 0;
  const ul = document.createElement("ul");
  ul.classList.add("users-list");
  for (let i = 0, z; i < users.length; i++) {
    if (counter == 5) {
      break;
    }
    z = users[i].picture.large.replace(/\D*/gi, "");
    if (
      arrImg.some((el) => {
        el == z;
      })
    ) {
      imgRepeatTest = false;
    } else {
      imgRepeatTest = true;
    }
    //  user(random) send age  [start 23; end - 77]
    //GIRL
    if (
      imgRepeatTest &&
      numBtn == 3 &&
      users[i].dob.age < 30 &&
      users[i].gender == "female"
    ) {
      console.log(numBtn);
      arrImg.push(z);
      console.log(arrImg);
      counter++;
      ul.appendChild(createUserCard(users[i]));
      //WOMAN
    } else if (numBtn == 2 && users[i].gender == "female") {
      console.log(numBtn);
      arrImg.push(z);
      console.log(arrImg);
      counter++;
      ul.appendChild(createUserCard(users[i]));
      //REST
    } else if (numBtn == 1) {
      console.log(numBtn);
      arrImg.push(z);
      console.log(arrImg);
      counter++;
      ul.appendChild(createUserCard(users[i]));
    }
  }
  return ul;
};

function launchin__creation__functions(NumBtn) {
  content.innerHTML = null;
  loader.classList.remove("loader--hidden");
  getUsers()
    .then((users) =>
      content.appendChild(generateFilteredUsersList(users, NumBtn))
    )
    .then(() => loader.classList.add("loader--hidden"));
}

buttonGetUsers.addEventListener("click", () => {
  launchin__creation__functions(1);
});

buttonGetFemale.addEventListener("click", () => {
  launchin__creation__functions(2);
});

buttonGetGirl.addEventListener("click", () => {
  launchin__creation__functions(3);
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
