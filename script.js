// Stopwatch functionality
class Stopwatch {
  constructor() {
    this.totalMilliseconds = 0;
    this.isRunning = false;
    this.startTime = 0;
    this.intervalId = null;
    this.laps = [];
    this.setupElements();
    this.attachEventListeners();
  }

  setupElements() {
    this.display = document.getElementById("stopwatch-display");
    this.startBtn = document.getElementById("stopwatch-start");
    this.pauseBtn = document.getElementById("stopwatch-pause");
    this.resetBtn = document.getElementById("stopwatch-reset");
    this.lapsList = document.getElementById("stopwatch-laps");
  }

  attachEventListeners() {
    this.startBtn.addEventListener("click", () => this.start());
    this.pauseBtn.addEventListener("click", () => this.pause());
    this.resetBtn.addEventListener("click", () => this.reset());
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = Date.now() - this.totalMilliseconds;

    this.startBtn.disabled = true;
    this.pauseBtn.disabled = false;

    this.intervalId = setInterval(() => {
      this.totalMilliseconds = Date.now() - this.startTime;
      this.updateDisplay();
    }, 10);
  }

  pause() {
    if (!this.isRunning) return;

    this.isRunning = false;
    clearInterval(this.intervalId);

    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;

    // Add lap time
    const lapTime = this.formatTime(this.totalMilliseconds);
    this.laps.push(lapTime);
    this.addLapToUI(lapTime, this.laps.length);
  }

  reset() {
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.totalMilliseconds = 0;
    this.laps = [];
    this.display.textContent = "00:00:00";
    this.lapsList.innerHTML = "";

    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
  }

  updateDisplay() {
    this.display.textContent = this.formatTime(this.totalMilliseconds);
  }

  formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(seconds);
  }

  pad(num) {
    return String(num).padStart(2, "0");
  }

  addLapToUI(lapTime, lapNumber) {
    const lapItem = document.createElement("li");
    lapItem.className = "lap-item";
    lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapNumber}</span>
            <span class="lap-time">${lapTime}</span>
        `;
    this.lapsList.appendChild(lapItem);
    this.lapsList.scrollTop = this.lapsList.scrollHeight;
  }
}

// Countdown Timer functionality
class CountdownTimer {
  constructor() {
    this.totalMilliseconds = 0;
    this.remainingMilliseconds = 0;
    this.isRunning = false;
    this.startTime = 0;
    this.intervalId = null;
    this.setupElements();
    this.attachEventListeners();
    this.updateDisplay();
  }

  setupElements() {
    this.display = document.getElementById("countdown-display");
    this.hoursInput = document.getElementById("countdown-hours");
    this.minutesInput = document.getElementById("countdown-minutes");
    this.secondsInput = document.getElementById("countdown-seconds");
    this.startBtn = document.getElementById("countdown-start");
    this.pauseBtn = document.getElementById("countdown-pause");
    this.resetBtn = document.getElementById("countdown-reset");
  }

  attachEventListeners() {
    this.startBtn.addEventListener("click", () => this.start());
    this.pauseBtn.addEventListener("click", () => this.pause());
    this.resetBtn.addEventListener("click", () => this.reset());

    this.hoursInput.addEventListener("change", () => this.updateDisplay());
    this.minutesInput.addEventListener("change", () => this.updateDisplay());
    this.secondsInput.addEventListener("change", () => this.updateDisplay());
  }

  start() {
    if (this.isRunning) return;

    if (this.remainingMilliseconds === 0) {
      // First time starting - get values from inputs
      const hours = parseInt(this.hoursInput.value) || 0;
      const minutes = parseInt(this.minutesInput.value) || 0;
      const seconds = parseInt(this.secondsInput.value) || 0;

      this.totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
      this.remainingMilliseconds = this.totalMilliseconds;

      if (this.remainingMilliseconds <= 0) {
        alert("Please enter a valid time");
        return;
      }
    }

    this.isRunning = true;
    this.startTime = Date.now();

    this.startBtn.disabled = true;
    this.pauseBtn.disabled = false;
    this.hoursInput.disabled = true;
    this.minutesInput.disabled = true;
    this.secondsInput.disabled = true;

    this.intervalId = setInterval(() => {
      this.remainingMilliseconds -= Date.now() - this.startTime;
      this.startTime = Date.now();

      if (this.remainingMilliseconds <= 0) {
        this.remainingMilliseconds = 0;
        this.pause();
        this.playAlarm();
        alert("Time's up!");
      }

      this.updateDisplay();
    }, 10);
  }

  pause() {
    if (!this.isRunning) return;

    this.isRunning = false;
    clearInterval(this.intervalId);

    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    this.hoursInput.disabled = false;
    this.minutesInput.disabled = false;
    this.secondsInput.disabled = false;
  }

  reset() {
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.totalMilliseconds = 0;
    this.remainingMilliseconds = 0;

    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    this.hoursInput.disabled = false;
    this.minutesInput.disabled = false;
    this.secondsInput.disabled = false;

    this.updateDisplay();
  }

  updateDisplay() {
    if (!this.isRunning) {
      const hours = parseInt(this.hoursInput.value) || 0;
      const minutes = parseInt(this.minutesInput.value) || 0;
      const seconds = parseInt(this.secondsInput.value) || 0;
      this.display.textContent =
        this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(seconds);
    } else {
      this.display.textContent = this.formatTime(this.remainingMilliseconds);
    }
  }

  formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(seconds);
  }

  pad(num) {
    return String(num).padStart(2, "0");
  }

  playAlarm() {
    // Create a simple beep sound
    const audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }
}

// Tab navigation
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const tabName = e.target.dataset.tab;

    // Remove active class from all tabs and contents
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked tab and corresponding content
    e.target.classList.add("active");
    document.getElementById(tabName).classList.add("active");
  });
});

// Initialize
const stopwatch = new Stopwatch();
const countdown = new CountdownTimer();
