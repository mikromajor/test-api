//https://randomuser.me/api/

/*
Methods:
- GET
- POST
- PUT
- DELETE

Statuses:
- 200 - success
- 304 - redirect
- 403 - not authorized
- 404 - method not allowed
- 500 - server errors

JSON.parse()     // line => {}
JSON.stringify() // {} => line

- get users
- create list
- output users names


try {
  [].fakeMethod();
} catch (e) {
  console.log('catch error: ', e);
}
*/

// const myPromise = new Promise(resolve, reject);

// 0 start
let arrObjUsers;
let arrTransit = [];
const content = document.getElementById("content");

// 1 block fetch
const getUsers = () => {
  const users = fetch("https://randomuser.me/api/?results=10")
    .then((serverSpeak) => serverSpeak.json()) // json => {}
    .then((obj) => obj.results) // {} => {}.results => objUsers
    .then((objUsers) => {
      arrObjUsers = objUsers;
      console.log(arrObjUsers);
    })
    .catch((error) => console.log("error: ", error));
  return users;
};
getUsers();

// 2
const cleanContent = (element) => (element.innerHTML = null);

function serchInArrUsers(serchElement) {
  arrObjUsers.map((objUser) => {
    arrTransit.push(objUser.name[serchElement]);
  });
}

function writeInHTML(Arr) {
  const ol = document.createElement("ol");

  for (let i = 0; i < Arr.length; i++) {
    const li = document.createElement("li");
    li.textContent = Arr[i];
    ol.appendChild(li);
  }
  content.appendChild(ol);
}

function general(clean, serch) {
  //cleanContent(clean);
  serchInArrUsers(serch);
  console.log("must be [name,name] => ", arrTransit);
  writeInHTML(arrTransit);
}
// button NAME
const butUsersName = document.createElement("button");
butUsersName.textContent = "Print NAMES";
butUsersName.addEventListener("click", () => {
  general(content, "first");
});
content.appendChild(butUsersName);
// button LAST
const butUsersSERNAME = document.createElement("button");
butUsersSERNAME.textContent = "Print SERNAME";
butUsersSERNAME.addEventListener("click", () => {
  general(content, "last");
});
content.appendChild(butUsersSERNAME);
// getUsers().then((users) => {
//   const box = document.getElementById('content');
//   const ul = document.createElement('ol');

//   users.forEach((element) => {
//     const li = document.createElement('li');
//     // console.log('users: ', users);
//     li.textContent = element.name.first + ' ' + element.name.last;
//     ul.appendChild(li);
//   });

//   box.appendChild(ul);
// });

/* 
TODO:
  - split code to logical parts (separate functions)
  - change output of user's info to a card view (name, avatar, gender, age, etc.)
  - add styles to card on your own (possible to use external libraries as Bootstrap, etc.)
  - add filtering functionality:
    - add section with filter buttons to tha page
    - create filtering functionality
//-----------------------------------------------\\

const content = document.getElementById("content");
const h1Morning = document.createElement("h1");
h1Morning.textContent = "Morning";
content.appendChild(h1Morning);
const ul = document.createElement("ul");
const liFirst = document.createElement("li");
liFirst.textContent = "My Game - My Rulse";
ul.appendChild(liFirst);
content.appendChild(ul);
let i = 0;
const arrNumbers = [
  "first - I want get up at 9 o'clock",
  "second - Then I go shiu-shiu",
  "third - I brush teeth",
  "fourth - a Dress",
  "fifth - and go warming breakfast",
  "sixth - Then I am eat 'soup' with 'sandwich'",
  "seventh - ",
  "eigth - ",
  "nineth - ",
  "tenth - ",
];
while (i < 10) {
  const li = document.createElement("li");
  li.textContent = arrNumbers[i];
  ul.appendChild(li);
  i++;
}
content.appendChild(ul);
const h1WorkingDay = document.createElement("h1");
h1WorkingDay.textContent = "My working day";
const p1 = document.createElement("p");
p1.textContent = "10:00 - if it is = it's wrealy GOOD";
const p2 = document.createElement("p");
p2.textContent = "11:00 - not so bed";
content.appendChild(h1WorkingDay);
content.appendChild(p1);
content.appendChild(p2);
*/
