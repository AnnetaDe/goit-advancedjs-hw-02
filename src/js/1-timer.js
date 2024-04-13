export * from "./1-timer.js";


import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import iconError from '../img/icon-error.svg'


const inputElement = document.getElementById('datetime-picker')
const startBtnEl = document.querySelector('[data-start]')
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')

let userSelectedDate = null;

startBtnEl.setAttribute('disabled', 'true')

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            startBtnEl.setAttribute('disabled', 'true')

            iziToast.show({
                message: 'Please choose a date in the future',
                backgroundColor: 'red',
                theme: 'dark',
                iconUrl: iconError,
                position: 'topRight',
            })

        } else {
            userSelectedDate = selectedDates[0]
            startBtnEl.removeAttribute('disabled')

        }
    },
};
flatpickr(inputElement, options);

startBtnEl.addEventListener('click', () => {
    startBtnEl.setAttribute('disabled', 'true');
    inputElement.disabled = true;
    
    const timer = setInterval(() => {
        const differenceTime = userSelectedDate - Date.now()
        const { days, hours, minutes, seconds } = convertMs(differenceTime);
        
        daysEl.textContent = addStatZero(days)
        hoursEl.textContent = addStatZero(hours)
        minutesEl.textContent = addStatZero(minutes)
        secondsEl.textContent = addStatZero(seconds)

        if (differenceTime <= 0) {
            clearInterval(timer)
            startBtnEl.removeAttribute('disabled')
            inputElement.disabled = false

            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
        }
    }, 1000)
})

function addStatZero(num) {
    if (num >= 0 && num <= 9) {
        return '0' + num
    } else {
        return num
    }
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}