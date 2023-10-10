let isRunning = false;
let startTime;
let interval;
let pauseTime;
let lapStartTime;

const display = document.getElementById("display");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lapList");

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const time = new Date(elapsedTime);
    
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    const milliseconds = time.getUTCMilliseconds();
    
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("milliseconds").textContent = milliseconds;
}

startPauseButton.addEventListener("click", function () {
    if (isRunning) {
        clearInterval(interval);
        startPauseButton.textContent = "Resume";
        pauseTime = new Date().getTime();
    } else {
        startTime = startTime ? startTime + (new Date().getTime() - pauseTime) : new Date().getTime();
        interval = setInterval(updateDisplay, 10); // Update every 10 milliseconds
        startPauseButton.textContent = "Pause";
    }
    isRunning = !isRunning;
});

resetButton.addEventListener("click", function () {
    clearInterval(interval);
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
    document.getElementById("milliseconds").textContent = "0";
    isRunning = false;
    startPauseButton.textContent = "Start";
    lapList.innerHTML = "";
    startTime = null;
    lapStartTime = 0;
    pauseTime = 0;
});

lapButton.addEventListener("click", function () {
    if (isRunning) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement("li");
        lapItem.innerHTML = lapTime;
        lapList.appendChild(lapItem);
    }
});

resetButton.click();