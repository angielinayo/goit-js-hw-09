// HTML містить кнопки «Start» і «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.
const body = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId = null;

buttonStart.addEventListener('click', onButtonStartClick);
buttonStop.addEventListener('click', onButtonStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onButtonStartClick() {
  body.style.backgroundColor = getRandomHexColor();

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  buttonStart.disabled = true;
  buttonStop.disabled = false;
}

function onButtonStopClick() {
  clearInterval(timerId);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
}
