export * from "./1-timer.js";

// Описаний в документації https://flatpickr.js.org/
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("button[data-start]");
startBtn.classList.add("button");
const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor(ms % day / hour);
  // Remaining minutes
  const minutes = Math.floor(ms % day % hour / minute);
  // Remaining seconds
  const seconds = Math.floor(ms % day % hour % minute / second);

  return { days, hours, minutes, seconds };
}
function addZero(value) {
  return String(value).padStart(2, "0");
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: "today",   //я ще таке знайшла!!)
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  }
};

options.onClose = function(selectedDates, dateStr, instance) {
  let userSelectedDate = selectedDates[0];
  let currentDate = new Date();
  const p = new Promise((resolve, reject) => {
    if (userSelectedDate < currentDate) {
      reject("error");
      iziToast.error({
        title: "ooops!",
        message: "Thats a timer, not a time machine!"
      });
    }
    resolve("ok thats more optimistic", userSelectedDate);
  });

  p
    .then(result => {
      console.log(result);
    })
    .catch(() => {
      console.log("Error");
    });
};
options.onOpen = function(selectedDates, dateStr, instance) {
  iziToast.info({
    title: "Hey!",
    message: "Please, select a future date"
  });
};

const fp = flatpickr("#datetime-picker", options);

function startTimer() {
  const targetDate = new Date(fp.selectedDates[0]);
  const currentDate = new Date();
  const deltaTime = targetDate - currentDate;
  const timerId = setInterval(() => {
    const currentDate = new Date();
    const deltaTime = targetDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysEl.textContent = addZero(days);
    hoursEl.textContent = addZero(hours);
    minutesEl.textContent = addZero(minutes);
    secondsEl.textContent = addZero(seconds);
    if (deltaTime <= 999) {
      clearInterval(timerId);
    }
  }, 1000);
  
  startBtn.disabled = true;
}




startBtn.addEventListener("click", () => {
  if(fp.selectedDates[0]){
    startTimer();
  }else{
    iziToast.error({
      title: "ooops!",
      message: "Please, select a valid date"
    });
  }
 
});

