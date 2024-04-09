export * from "./2-snackbar.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
// `✅ Fulfilled promise in ${delay}ms`
// `❌ Rejected promise in ${delay}ms`

const delayInput = document.querySelector('input[type="number"]');
const form = document.querySelector("form");
const fieldSet = document.querySelector("fieldset");
const rejected = document.querySelector(
  'input[type="radio"][value="rejected"]'
);
const fulfilled = document.querySelector(
  'input[type="radio"][value="fulfilled"]'
);
iziToast.settings({
  timeout: 5000,
  resetOnHover: true,
  errorMessage: true,
  position: "topRight"
});

let status;
let delay;

function onFormSubmit(event) {
  event.preventDefault();
  delay = delayInput.value;
  status = rejected.checked ? "rejected" : "fulfilled";
  console.log(delay, status);
  if (delay && status) {
    const promise = new Promise((resolve, reject) => {
      if (status === "fulfilled") {
        resolve(
          setTimeout(() => {
            iziToast.success({
              backgroundColor: "#59A10D",
              title: "Success",
              message: `Promise resolved after ${delay}ms`
            });
          }, delay)
        );
      } else {
        resolve(
          setTimeout(() => {
            iziToast.error({
              title: "Error",
              message: `Promise rejected after ${delay}ms`,
              backgroundColor: "#EF4040",
              icon: "ico-error"
              
            
            });
          }, delay)
        );
      }
    });
  }
}

form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", onFormInput);
