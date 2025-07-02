// TIMER
const timeText = document.getElementById("time-text")

// const focusButton = document.getElementById("focus-button")
// const shortButton = document.getElementById("short-button")
// const longButton = document.getElementById("long-button")
// function clickButton(button) {
//   const buttonsList = [focusButton, shortButton, longButton]

//   if (button.classList.contains("active") == false) {
//     for (let index = 0; index < buttonsList.length; index++) {
//       if (buttonsList[index].classList.contains("active") == true) {
//         buttonsList[index].classList.toggle("active")
//       }
//     }
//     button.classList.toggle("active")
//     if (button.innerText == "Focus") {
//       timeText.innerText = "25:00";
//     }
//     if (button.innerText == "Short") {
//       timeText.innerText = "5:00";
//     }
//     if (button.innerText == "Long") {
//       timeText.innerText = "15:00"
//     }
//   }
// }
// focusButton.addEventListener("click", () => clickButton(focusButton))
// shortButton.addEventListener("click", () => clickButton(shortButton))
// longButton.addEventListener("click", () => clickButton(longButton))

focusTime = "25:00"
shortTime = "05:00"
longTime = "15:00"

function setTimeText(buttonText) {
  return buttonText == "Focus" ? focusTime : buttonText == "Short" ? shortTime : longTime;
}

// Timer status buttons
const buttonsList = document.querySelectorAll(".timer-status-button");
const timerStatusText = document.getElementById("timer-status-text")

buttonsList.forEach(button => {
  button.addEventListener("click", () => {
    // Quitar clase 'active' de todos
    buttonsList.forEach(b => b.classList.remove("active"));
    
    // Agregar clase 'activo' al botón clicado
    button.classList.add("active");
    timeText.innerText = setTimeText(button.innerText);
    timerStatusText.innerText = button.innerText == "Focus" ? "FOCUS TIME" : button.innerText == "Short" ? "SHORT TIME" : "LONG TIME";

    // Mostrar cuál está activo
    console.log("Botón activo:", button.id);
  });
});


// Play/Pause button
const playButton = document.getElementById("play-button");


function minuteConversion (time) {
  time = time.split(":")
  return 60*parseInt(time[0]) + parseFloat(time[1]);
}

function subtractOneSecond (time) {
  time = minuteConversion(time) - 1;
  let minutes = String(Math.floor(time/60));
  let seconds = String(time - 60*Math.floor(time/60));
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }
  if (seconds.length == 1) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds
}

let intervalId = null;
let sessionCounter = 0

function timerFunction () {
  let defaultTime;
  const button = document.querySelectorAll(".timer-status-button.active");
  defaultTime = setTimeText(button[0].innerText);
  playButton.classList.toggle("playStatus");
  if (playButton.classList.contains("playStatus")) {
    if (intervalId == null && minuteConversion(timeText.innerText) > 0) {
      intervalId = setInterval(() => {
        timeText.innerText = subtractOneSecond(timeText.innerText)
        console.log(timeText.innerText);
        if (minuteConversion(timeText.innerText) === 0){
          const audio = new Audio("./assets/audio/pomodoro_alert.wav");
          audio.play();
          clearInterval(intervalId);
          intervalId = null;
          timeText.innerText = defaultTime;
          playButton.classList.remove("playStatus");
          if (button[0].innerText == "Focus") {
            sessionCounter += 1;
            buttonsList[0].classList.remove("active");
            if (sessionCounter%4 == 0) {
              buttonsList[2].classList.add("active");
              timeText.innerText = longTime
            } else {
              buttonsList[1].classList.add("active");
              timeText.innerText = shortTime
            }
            console.log(sessionCounter)
          } else if (button[0].innerText == "Short") {
            buttonsList[1].classList.remove("active");
            buttonsList[0].classList.add("active");
            timeText.innerText = focusTime
          } else if (button[0].innerText == "Long") {
            buttonsList[2].classList.remove("active");
            buttonsList[0].classList.add("active");
            timeText.innerText = focusTime
          }
        }
      }, 1000);
    }
  } else {
    console.log('Stop');
    clearInterval(intervalId);
    intervalId = null;
  }
}

playButton.addEventListener("click", timerFunction);


// Restar button
const restartButton = document.getElementById("restart-button");

function restartFunction() {
  if (playButton.classList.contains("playStatus")) {
    const activeButton = document.querySelectorAll(".timer-status-button.active");
    timeText.innerText = setTimeText(activeButton[0].innerText);
    console.log(setTimeText(activeButton[0].innerText));
    timerFunction();
  }
}

restartButton.addEventListener("click", restartFunction);

// Pomodoro method
const focusButton = document.getElementById("focus-button")
const shortButton = document.getElementById("short-button")
const longButton = document.getElementById("long-button")
const activeButton = document.querySelector(".timer-status-button.active");




// TO DO LIST

const newTaskInput = document.getElementById("new-task-input")
const tasksList = document.getElementById("tasks-list")
const addNewTaskButton = document.getElementById("add-new-task-button")
// const deleteTaskButton = document.getElementById("")
const localStorageList = JSON.parse(localStorage.getItem("tasks")) || []

for (let i=0; i < localStorageList.length; i++) {
  let li = document.createElement("li");
  li.classList.add("task");
  li.innerHTML = localStorageList[i].title;
  tasksList.appendChild(li);
}

function addTask() {
  if (newTaskInput.value.replaceAll(" ", "") !== "") {
    let li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = newTaskInput.value;
    tasksList.appendChild(li);
    newTaskInput.value = ""
    // Add to local storage...
    localStorageList.push({"checked": false, "title": li.innerHTML})
    console.log(localStorageList)
    localStorage.setItem('tasks', JSON.stringify(localStorageList))
  }
}

addNewTaskButton.addEventListener("click", addTask)

newTaskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

tasksList.addEventListener("click", function(e){
  if (e.target.tagName == "LI") {
    e.target.classList.toggle("checked")
  }
})


