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

JSON.parse()
JSON.stringify()

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

const getUsers = () => {
  const users = fetch('https://randomuser.me/api/?results=10')
    .then((serverSpeak) => serverSpeak.json()) // json => {}
    .then((obj) => obj.results) // {} => {}.results
    .then((users) => {
      const box = document.getElementById('content');
      const ul = document.createElement('ol');

      users.forEach((element) => {
        const li = document.createElement('li');
        console.log('element: ', element);
        li.textContent = element.name.first + ' ' + element.name.last;
        ul.appendChild(li);
      });

      box.appendChild(ul);
    })
    .catch((error) => console.log('error: ', error));
  return users;
};

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

getUsers();

/* 
TODO:
  - split code to logical parts (separate functions)
  - change output of user's info to a card view (name, avatar, gender, age, etc.)
  - add styles to card on your own (possible to use external libraries as Bootstrap, etc.)
  - add filtering functionality:
    - add section with filter buttons to tha page
    - create filtering functionality
*/
