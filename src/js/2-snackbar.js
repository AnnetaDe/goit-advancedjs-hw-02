export * from "./2-snackbar.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import iconSuccess from "../img/bi_check2-circle.svg";
import iconWarn from "../img/bi_exclamation-triangle.svg";
import iconError from "../img/icon-error.svg";

const form = document.querySelector("form");
const fieldSet = document.querySelector("fieldset");
const delay = document.querySelector("input[name='delay']");
const stateFullfilled = document.querySelectorAll("input[name='state'][value='fulfilled']")[0];
const stateRejected = document.querySelectorAll("input[name='state'][value='rejected']")[0];
const radioButtons = document.querySelectorAll("input[name='state']");



let userInput={
  delay: '',
  state: '',
}



form.addEventListener("input", (event) => {
  userInput.delay=delay.value;
  if(event.target===stateFullfilled){
    userInput.state=stateFullfilled.value;
  }
  if(event.target===stateRejected){
    userInput.state=stateRejected.value;
  }
})

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(userInput);
 
  if(userInput.delay==='' || userInput.state===''){
    iziToast.warning({
      title: 'Caution',
      message: `You forgot important data`,
      position: 'topRight',
      backgroundColor: '#FFA000',
      theme: 'dark',
      iconUrl:iconWarn,
      theme: 'dark',
      
    });
    form.focus();
  } else {
    makePromise(userInput.state, userInput.delay)
      .then(delay => {
        iziToast.success({
          title: 'OK',
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#59a10d',
          iconUrl:iconSuccess,
          theme: 'dark',
          
        });
      })
      .catch(() => {
        iziToast.error({
          title: "Error",
          message: `Promise rejected after ${userInput.delay}ms`,
          backgroundColor: "#EF4040",
          iconUrl:iconError,
          position: 'topRight',
          theme: 'dark',
       
        });
      });
    form.reset();
    fieldSet.classList.remove('focus');
  }
});


const makePromise = (state, delay) => {
  return new Promise((resolve, reject) => {
    if (state === "fulfilled") {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });
}

