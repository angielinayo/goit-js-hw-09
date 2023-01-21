// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// Елементи інтерфейсу
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися.
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let intervalId = null;
startBtn.disabled = true;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};
flatpickr(input, options);

function startTimer() {
  // input.disabled = true;
  // startBtn.disabled = true;
  intervalId = setInterval(() => {
    const deltaTime = selectedDate - Date.now();

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      return;
    }

    let { days, hours, minutes, seconds } = convertMs(deltaTime);

    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
  }, 1000);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

startBtn.addEventListener('click', startTimer);
