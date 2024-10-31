"use strict";

// ! Declare variables
const container = document.querySelector(".content");
const btnClock = document.querySelector(".btn--clock");
const btnTimer = document.querySelector(".btn--timer");
const btnStopwatch = document.querySelector(".btn--stopwatch");

let clock, countDown, stopTimer;

// ! BG Colors
const color = [
  "#a5d8ff",
  "#dbe4ff",
  "#fcc2d7",
  "#ffdeeb",
  "#ffc9c9",
  "#c5f6fa",
  "#c3fae8",
  "#d3f9d8",
  "#e9fac8",
  "#fff3bf",
];

// ! Create Clock function
const setClock = function () {
  container.innerHTML = "";

  container.insertAdjacentHTML(
    `afterbegin`,
    `<h1 class="primary-heading">09:30:51 AM</h1>
  `
  );
  const heading = document.querySelector(".primary-heading");
  const tick = function () {
    const time = new Date();
    let hours = String(time.getHours()).padStart(2, 0);
    const mins = String(time.getMinutes()).padStart(2, 0);
    const secs = String(time.getSeconds()).padStart(2, 0);
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    heading.textContent = `${hours}:${mins}:${secs} ${amPm}`;
  };
  tick();
  clock = setInterval(tick, 1000);
};
// ! Initialize the clock
setClock();

// ! Create Random Number
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// ! Setting the Background Color
const bgChanger = setInterval(() => {
  document.querySelector("body").style.backgroundColor =
    color[randomNumber(0, color.length - 1)];
}, 5000);

// ! Convert Millisecond to time
const millisecondToTime = function (timerInSec) {
  const hours = Math.floor(timerInSec / (1000 * 60 * 60));
  const mins = Math.floor((timerInSec % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((timerInSec % (1000 * 60)) / 1000);
  return { hours, mins, secs };
};

// !  setting Initial State

// ! Events
// ! --------------------- Clock ---------------------
btnClock.addEventListener("click", function () {
  if (!clock) setClock();
});

// ! ------------- Timer -----------------
btnTimer.addEventListener("click", function () {
  container.innerHTML = "";
  if (clock) {
    clearInterval(clock);
    clock = null;
  }
  if (countDown) {
    clearInterval(countDown);
    countDown = null;
  }

  container.insertAdjacentHTML(
    `afterbegin`,
    `<div class="timer">
        <input type="number" class="input hours" placeholder="00" />
        <label for="">h :</label>
        <input type="number" class="input mins" placeholder="00" />
        <label for="">m :</label>
        <input type="number" class="input sec" placeholder="00" />
        <label for="">s</label>

        <div class="play-pause">
          <ion-icon
            name="caret-forward-circle-outline"
            class="s-btn play"
          ></ion-icon>
          <ion-icon name="pause-circle-outline" class="s-btn pause"></ion-icon>
          <ion-icon
            name="refresh-circle-outline"
            class="s-btn reset"
          ></ion-icon>
        </div>`
  );

  const play = document.querySelector(".play");
  const pause = document.querySelector(".pause");
  const reset = document.querySelector(".reset");
  const hoursEL = document.querySelector(".hours");
  const minsEL = document.querySelector(".mins");
  const secEL = document.querySelector(".sec");

  function setInputAcc(value) {
    hoursEL.readOnly = value;
    minsEL.readOnly = value;
    secEL.readOnly = value;
  }

  setInputAcc(false);

  play.addEventListener("click", function () {
    let timerInSec =
      (Number(hoursEL.value) * 3600 +
        Number(minsEL.value) * 60 +
        Number(secEL.value)) *
      1000;

    const countDownStarter = function () {
      const hours = Math.floor(timerInSec / (1000 * 60 * 60));
      const mins = Math.floor((timerInSec % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((timerInSec % (1000 * 60)) / 1000);

      hoursEL.value = `${hours}`.padStart(2, 0);
      minsEL.value = `${mins}`.padStart(2, 0);
      secEL.value = `${secs}`.padStart(2, 0);

      if (timerInSec === 0) {
        clearInterval(countDown);
      }

      timerInSec -= 1000;
    };
    countDown = setInterval(countDownStarter, 1000);
    countDownStarter();
    setInputAcc(true);
  });

  // ! Pause button stops the timer
  pause.addEventListener("click", function () {
    if (countDown) {
      clearInterval(countDown);
    }
    setInputAcc(false);
  });

  // ! reset the timer
  reset.addEventListener("click", function () {
    if (countDown) {
      clearInterval(countDown);
    }
    hoursEL.value = "";
    minsEL.value = "";
    secEL.value = "";
    setInputAcc(false);
  });
});

// ! --------------- stopwatch ----------------------
btnStopwatch.addEventListener("click", function () {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  container.innerHTML = "";
  if (clock) {
    clearInterval(clock);
    clock = null;
  }
  if (countDown) {
    clearInterval(countDown);
    countDown = null;
  }

  container.insertAdjacentHTML(
    `afterbegin`,
    `<div class="timer">
        <input type="number" class="input hours" placeholder="00" />
        <label for="">h :</label>
        <input type="number" class="input mins" placeholder="00" />
        <label for="">m :</label>
        <input type="number" class="input sec" placeholder="00" />
        <label for="">s</label>

        <div class="play-pause">
          <ion-icon
            name="caret-forward-circle-outline"
            class="s-btn play"
          ></ion-icon>
          <ion-icon name="pause-circle-outline" class="s-btn pause"></ion-icon>
          <ion-icon
            name="refresh-circle-outline"
            class="s-btn reset"
          ></ion-icon>
        </div>`
  );

  const play = document.querySelector(".play");
  const pause = document.querySelector(".pause");
  const reset = document.querySelector(".reset");
  const hoursEL = document.querySelector(".hours");
  const minsEL = document.querySelector(".mins");
  const secEL = document.querySelector(".sec");

  function setInputAcc(value) {
    hoursEL.readOnly = value;
    minsEL.readOnly = value;
    secEL.readOnly = value;
  }

  setInputAcc(true);
  play.addEventListener("click", function () {
    stopTimer = setInterval(function () {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      hoursEL.value = `${hours}`.padStart(2, 0);
      minsEL.value = `${minutes}`.padStart(2, 0);
      secEL.value = `${seconds}`.padStart(2, 0);
    }, 1000);
  });

  pause.addEventListener("click", function () {
    if (stopTimer) {
      clearInterval(stopTimer);
    }
    reset.addEventListener("click", function () {
      if (stopTimer) {
        clearInterval(stopTimer);
      }
      hoursEL.value = "";
      minsEL.value = "";
      secEL.value = "";
      seconds = 0;
      minutes = 0;
      hours = 0;
    });
  });
});
