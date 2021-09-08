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
