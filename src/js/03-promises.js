// HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах,
// 	крок збільшення затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.
// 	Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount.
// 	Під час кожного виклику передай їй номер промісу(position), що створюється, і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).
// 	Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу.Значенням промісу повинен бути
// 	об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів.
// 	Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');

function onSubmit(event) {
  event.preventDefault();
  const formEls = event.currentTarget.elements;
  let delay = Number(formEls.delay.value);
  const step = Number(formEls.step.value);
  const amount = Number(formEls.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    if (i > 1) {
      delay += step;
    }
    createPromise(i, delay)
      .then(result => {
        Notify.success(result);
      })
      .catch(error => {
        Notify.failure(error);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmit);
