const startBtn = document.getElementById("start-btn");
const minute = document.getElementById("min");
const second = document.getElementById("sec");
const inputSection = document.getElementById("input-section");
const timeSection = document.getElementById("time-section");
const header = document.getElementById("header");

//start button
startBtn.addEventListener("click", () => {
  const round = getRound();
  const time = getTime();

  if (round < 1 && time < 1) {
    return alert("Check your input!");
  } else if (round < 1 || isNaN(round)) {
    return alert("You must complete at least one round.");
  } else if (time < 1 || isNaN(time)) {
    return alert("A round must be at least one minute long.");
  } else {
    miniWindow();
    updateTime(time, round);
  }
});

//main timer
function updateTime(time, round) {
  changeHeader("Pomodoro Time");
  let min = time;
  let sec = 0;

  inputSection.classList.add("rm");
  timeSection.classList.remove("rm");

  const timer = setInterval(() => {
    if (min === 0 && sec === 0 && round === 1) {
      alertRound(`Finish`);
      clearInterval(timer);
      inputSection.classList.remove("rm");
      timeSection.classList.add("rm");
      changeHeader("It's Pomodoro time");
    } else if (min === 0 && sec === 0 && round > 1) {
      round--;
      alertRound(round);
      startBreak(time, round);
      clearInterval(timer);
    } else if (sec === 0) {
      min--;
      sec = 59;
    } else if (sec >= 1) {
      sec--;
    }

    minute.textContent = min.toString() + "m";
    second.textContent = sec.toString() + "s";
  }, 1000);
}

// break timer - default value for minutes = 5
function startBreak(time, round) {
  changeHeader("Break Time");
  let min = 1;
  let sec = 0;

  const breakTimer = setInterval(() => {
    if (min === 0 && sec === 0) {
      clearInterval(breakTimer);
      miniWindow();
      updateTime(time, round);
    } else if (sec === 0 && round) {
      min--;
      sec = 3;
    } else if (sec >= 1) {
      sec--;
    }

    minute.textContent = min.toString() + "m";
    second.textContent = sec.toString() + "s";
  }, 1000);
}

// return the user input - time
function getTime() {
  return parseInt(document.getElementById("time").value);
}

// return the pomodoro units
function getRound() {
  return parseInt(document.getElementById("rounds").value);
}

// minimze the default window
function miniWindow() {
  window.myAPI.minimizeWindow();
}
//alert the currently round
function alertRound(round) {
  if (round > 1) {
    alert(`There are still ${round} rounds left.`);
  } else if (round === 1) {
    alert(`There is ${round} round left.`);
  } else {
    alert(round);
  }
}

//change the header text
function changeHeader(text) {
  header.textContent = text;
}
