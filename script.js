let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("short-timer")
let long = document.getElementById("long-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")
let timerMsg = document.getElementById("timer-message")
let button = document.getElementById(".button")

let currentTimer = null
let myInterval = null

// show the default timer
function showDefaultTimer() {
    pomodoro.style.display = "block"
    short.style.display = "none"
    long.style.display = "none"
}

showDefaultTimer()

function hideALL() {
    pomodoro.style.display = "none"
    short.style.display = "none"
    long.style.display = "none"
}

session.addEventListener("click", () => {
    hideALL()

    pomodoro.style.display = "block"

    session.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")

    currentTimer = pomodoro

})

shortBreak.addEventListener("click", () => {
    hideALL()

    short.style.display = "block"

    session.classList.remove("active")
    shortBreak.classList.add("active")
    longBreak.classList.remove("active")

    currentTimer = short

})

longBreak.addEventListener("click", () => {
    hideALL()

   long.style.display = "block"

    session.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.add("active")

    currentTimer = long

})

// Start the timer on click
function startTimer(timerDisplay) {
    if(myInterval) {
        clearInterval(myInterval)
    }

    timerDuration = timerDisplay.getAttribute("data-duration").split(":")[0]

    let durationInMilliseconds = timerDuration * 60 * 1000
    let endTimestamp = Date.now() + durationInMilliseconds

    myInterval = setInterval(() => {
        const timeRemaining = endTimestamp - Date.now()

        if(timeRemaining <= 0) {
            clearInterval(myInterval)
            timerDisplay.querySelector('.time').textContent = "00:00"

            const alarm = new Audio('digital-alarm-2-151919-[AudioTrimmer.com].mp3')
            alarm.play()
        } else {
            const minutes = Math.floor(timeRemaining / 60000)
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0)
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`
            timerDisplay.querySelector('.time').textContent = formattedTime
        }
    }, 1000)
}

startBtn.addEventListener("click", () => {
    if(currentTimer) {
        startTimer(currentTimer)
        timerMsg.style.display = "none"
    } else {
        timerMsg.style.display = "block"
    }
})

stopBtn.addEventListener("click", () => {
    if(myInterval) {
        clearInterval(myInterval)
        myInterval = null
    }
})