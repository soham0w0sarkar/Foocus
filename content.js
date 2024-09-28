function render() {
  const container = document.createElement("div");

  container.classList.add("progress-bar-container");

  container.style.position = "fixed";
  container.style.top = "0";
  container.style.width = "100%";
  container.style.padding = "5px 0";
  container.style.backgroundColor = "#ffff";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.zIndex = "9999";
  container.style.border = "1px solid black";

  const shadowRoot = container.attachShadow({ mode: "open" });

  shadowRoot.innerHTML = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      input {
        background: inherit;
        border: none;
        color: #1c1c1c;
        font-size: 18px;
        outline: none;
      }

      .progress-bar {
        position: absolute;
        width: 100%;
        z-index: -2;
        height: 20px;
        background-color: #f4f4f4     ;
        overflow: hidden;
      }

      .dark-mode .progress-bar {
        background-color: #3a3a3a;
      }

      .progress {
        height: 100%;
        width: 0;
        background-color: #4caf50;
        transition: all 1s ease;
      }

      .dark-mode .progress {
        background-color: #00b22d;
      }

      .progress-text {
        margin-left: auto;
        color: #1c1c1c;
        font-size: 18px;
        display: flex;
        align-items: center;
      }

      .dark-mode .progress-text {
        color: white;
      }

      .progress-text > input {
        width: 430px;
      }

      .timer {
        color: #1c1c1c;
        display: flex;
        margin-left: auto;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }

      .dark-mode .timer,
      .dark-mode .play-btn,
      .dark-mode .reset-btn,
      .dark-mode .options-btn {
        color: white;
      }

      .timer > input {
        font-size: 14px;
        width: 20px;
      }

      .play-btn,
      .reset-btn {
        margin-left: 3px;
        background: none;
        border: none;
        color: inherit;
        font-size: 16px;
        cursor: pointer;
      }

      .collapsed {
        height: 4px;
        padding: 0;
        transition: all 1ms ease;
      }

      .collapsed.progress-bar {
        height: 4px;
      }

      .collapsed.progress {
        height: 100%;
      }

      .collapsed.progress-text,
      .collapsed.timer {
        display: none;
      }

      .notch {
        position: absolute;
        width: 50px;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 8px solid #1c1c1c;
        top: 32px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
      }

      .collapsed.notch {
        top: 4px;
        border-top: 8px solid #3a3a3a;
      }

      .input-error {
        border: 2px solid red;
      }

      .options-btn {
        background: none;
        border: none;
        color: #1c1c1c;
        font-size: 18px;
        cursor: pointer;
        margin-right: 5px;
      }

      .dark-mode .options-btn {
        color: white;
      }

      .dropdown-menu {
        position: absolute;
        right: 10px;
        top: 30px;
        background-color: white;
        border: 1px solid #ccc;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 200px;
        z-index: 1000;
        padding: 10px;
        border-radius: 5px;
      }

      .dropdown-item {
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .links {
        justify-content: space-around;
      }

      a {
        color: rgba(0, 0, 0, 0.4);
        font-size: 12px;
      }

      .row {
        flex-direction: row;
      }

      .heading {
        margin: 30px 0 30px 0;
        justify-content: center;
        gap: 5px;
      }

      .heading > a {
        text-decoration: none;
        font-size: 15px;
      }

      .dropdown-item:last-child {
        margin-bottom: 0;
      }

      .color-options {
        display: flex;
        width: 100%;
        height: 60px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }

      .color-option {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
      }

      .hidden {
        display: none;
      }

      button#theme-toggle {
        background: none;
        border: none;
        cursor: pointer;
      }

      svg {
        transition: transform 0.3s ease;
      }

      svg.sun,
      svg.moon {
        width: 24px;
        height: 24px;
      }
    </style>

    <div class="progress-bar">
      <div class="progress"></div>
    </div>

    <div class="progress-text">
      <input
        type="text"
        id="focus-input"
        value="What's the one thing you want to focus on right now?"
      />
    </div>

    <div class="timer">
      <input type="text" id="timer-min" value="00" />
      :
      <input type="text" id="timer-sec" value="00" />
      <button class="play-btn">▶️</button>
      <button class="reset-btn" style="display: none;">🔄</button>
    </div>
    <button class="options-btn">⋮</button>
    <span class="notch"></span>
    <div class="dropdown-menu hidden">
      <div class="dropdown-item row">
        <span>Light Mode</span>
        <button id="theme-toggle" aria-label="Light mode">
          <svg
            class="sun hidden"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg
            class="moon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="black"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            />
          </svg>
        </button>
      </div>
      <div class="dropdown-item row">
        <span>Progress Animation</span>
        <input type="checkbox" id="progress-animation-toggle" />
      </div>
      <div class="dropdown-item">
        <span>Progress Bar Color</span>
        <div class="color-options">
          <span class="color-option" style="background-color: #f44336"></span>
          <span class="color-option" style="background-color: #e91e63"></span>
          <span class="color-option" style="background-color: #9c27b0"></span>
          <span class="color-option" style="background-color: #673ab7"></span>
          <span class="color-option" style="background-color: #3f51b5"></span>
        </div>
      </div>
      <div class="dropdown-item row heading">
        <h4>ULTRA FOCUS</h4>
        <a href="https://example.com/" target="_blank">🔗</a>
      </div>
      <div class="dropdown-item row links">
        <a href="https://example.com/" target="_blank">About</a>
        <a href="https://example.com/" target="_blank">Guide</a>
        <a href="https://example.com/" target="_blank">Feedback</a>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  let countdownInterval = null;
  let isRunning = false;
  let totalInitialTime = 0;
  let remainingTime = 0;

  const validateTimerInput = () => {
    const minInput = shadowRoot.getElementById("timer-min");
    const secInput = shadowRoot.getElementById("timer-sec");

    const isNumber = /^\d+$/;

    if (
      !isNumber.test(minInput.value.trim()) ||
      parseInt(minInput.value) > 59
    ) {
      minInput.classList.add("input-error");
      minInput.setAttribute("aria-invalid", "true");
    } else {
      minInput.classList.remove("input-error");
      minInput.removeAttribute("aria-invalid");
    }

    if (
      !isNumber.test(secInput.value.trim()) ||
      parseInt(secInput.value) > 59
    ) {
      secInput.classList.add("input-error");
      secInput.setAttribute("aria-invalid", "true");
    } else {
      secInput.classList.remove("input-error");
      secInput.removeAttribute("aria-invalid");
    }
  };

  const startTimer = () => {
    const minInput = shadowRoot.getElementById("timer-min");
    const secInput = shadowRoot.getElementById("timer-sec");
    const resetBtn = shadowRoot.querySelector(".reset-btn");
    const playBtn = shadowRoot.querySelector(".play-btn");

    if (!isRunning) {
      const minutes = parseInt(minInput.value) || 0;
      const seconds = parseInt(secInput.value) || 0;

      totalInitialTime = minutes * 60 + seconds;
      remainingTime = totalInitialTime;

      if (remainingTime <= 0) return;

      isRunning = true;
      resetBtn.style.display = "inline-block";
      playBtn.textContent = "⏸️";

      countdownInterval = setInterval(() => {
        if (remainingTime <= 0) {
          updateProgress(0);
          clearInterval(countdownInterval);
          isRunning = false;

          resetBtn.style.display = "none";
          playBtn.textContent = "▶️";
          return;
        }

        remainingTime--;

        const currentMinutes = Math.floor(remainingTime / 60);
        const currentSeconds = remainingTime % 60;

        minInput.value = String(currentMinutes).padStart(2, "0");
        secInput.value = String(currentSeconds).padStart(2, "0");

        const progressPercentage =
          ((totalInitialTime - remainingTime) / totalInitialTime) * 100;
        updateProgress(progressPercentage);
      }, 1000);
    }
  };

  const updateProgress = (percentage) => {
    const progressBar = shadowRoot.querySelector(".progress");
    progressBar.style.width = `${percentage}%`;
  };

  const stopTimer = () => {
    clearInterval(countdownInterval);
    isRunning = false;

    const resetBtn = shadowRoot.querySelector(".reset-btn");
    resetBtn.style.display = "none";
  };

  const resetTimer = () => {
    stopTimer();
    resetInputs();
    const playBtn = shadowRoot.querySelector(".play-btn");
    playBtn.textContent = "▶️";
  };

  const resetInputs = () => {
    shadowRoot.getElementById("timer-min").value = "00";
    shadowRoot.getElementById("timer-sec").value = "00";
    updateProgress(0);

    const resetBtn = shadowRoot.querySelector(".reset-btn");
    resetBtn.style.display = "none";
  };

  const toggleTimer = () => {
    const playBtn = shadowRoot.querySelector(".play-btn");

    if (!isRunning) {
      startTimer();
    } else {
      stopTimer();
      playBtn.textContent = "▶️";
    }
  };

  shadowRoot
    .getElementById("timer-min")
    .addEventListener("input", validateTimerInput);
  shadowRoot
    .getElementById("timer-sec")
    .addEventListener("input", validateTimerInput);
  shadowRoot.querySelector(".play-btn").addEventListener("click", toggleTimer);
  shadowRoot.querySelector(".reset-btn").addEventListener("click", resetTimer);

  const notch = shadowRoot.querySelector(".notch");

  notch.addEventListener("click", () => {
    container.classList.toggle("collapsed");
    shadowRoot.querySelectorAll("*").forEach((el) => {
      el.classList.toggle("collapsed");
    });
  });

  const optionsBtn = shadowRoot.querySelector(".options-btn");
  const dropdownMenu = shadowRoot.querySelector(".dropdown-menu");
  const progressAnimationToggle = shadowRoot.getElementById(
    "progress-animation-toggle",
  );
  const colorOptions = shadowRoot.querySelectorAll(".color-option");

  optionsBtn.addEventListener("click", () => {
    console.log("clicked");
    dropdownMenu.classList.add("hidden");
  });

  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".options-btn") &&
      !event.target.closest(".dropdown-menu")
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });

  const themeToggleBtn = shadowRoot.getElementById("theme-toggle");
  const body = document.body;

  themeToggleBtn.addEventListener("click", () => {
    themeToggleBtn.querySelectorAll("svg").forEach((el) => {
      el.classList.toggle("hidden");
    });

    body.classList.toggle("dark-mode");
  });
}

render();
