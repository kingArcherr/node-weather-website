'use strict';

console.log('GOD IS THE GREATEST ALL THE TIME');

// const weatherDetails = fetch('http://localhost:3000/weather?address=toronto');
// weatherDetails.then((res) => {
//   res.json().then((data) => {
//     if (data.error) console.log(error);
//     else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  const weatherDetails = fetch(
    `http://localhost:3000/weather?address=${location}`
  );
  weatherDetails.then((res) => {
    res.json().then((data) => {
      if (data.error) messageOne.textContent = data.error;
      else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
