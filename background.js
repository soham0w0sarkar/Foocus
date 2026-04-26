const ALARM_NAME = "foocus_checker";
const ALARM_PERIOD_MINUTES = 1;

const DEFAULT_STATE = {
  // Timer
  remainingTime: 25 * 60,     // seconds
  totalInitialTime: 25 * 60,  // seconds
  startedAt: null,            // timestamp (ms) when timer last started/resumed
  status: "IDLE",             // IDLE | RUNNING | PAUSED | DONE

  // Display
  focusText: "",
  isCollapsed: false,
  isSnoozed: false,
  snoozeUntil: null,          // timestamp (ms)

  // Theming (all global)
  isDarkMode: false,
  progressColor: "#4f46e5",
  animationEnabled: true,
};

function getState() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("state", (data) => {
      resolve(data.state ?? { ...DEFAULT_STATE });
    });
  });
}

function setState(state) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ state }, resolve);
  });
}

function computeRemaining(state) {
  if (state.status !== "RUNNING") return state.remainingTime;
  const elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
  return Math.max(0, state.remainingTime - elapsed);
}

function forUi(state) {
  if (state.status !== "RUNNING") return state;
  return { ...state, remainingTime: computeRemaining(state) };
}

async function finalizeExpiredIfNeeded(state) {
  if (state.status !== "RUNNING") return false;
  if (computeRemaining(state) > 0) return false;

  const nextState = {
    ...state,
    status: "DONE",
    remainingTime: 0,
    startedAt: null,
  };
  await setState(nextState);
  await broadcast(nextState, { celebrate: true });
  stopAlarm();
  return true;
}

async function broadcast(state, extras = {}) {
  const tabs = await chrome.tabs.query({});
  const message = { action: "stateUpdate", state: forUi(state), ...extras };
  for (const tab of tabs) {
    chrome.tabs.sendMessage(tab.id, message).catch(() => {
      // Tab may not have content script — silently ignore
    });
  }
}

function startAlarm() {
  chrome.alarms.create(ALARM_NAME, { periodInMinutes: ALARM_PERIOD_MINUTES });
}

function stopAlarm() {
  chrome.alarms.clear(ALARM_NAME);
}

chrome.runtime.onInstalled.addListener(async () => {
  const existing = await getState();
  if (!existing || existing.status === undefined) {
    await setState({ ...DEFAULT_STATE });
  }
});

chrome.runtime.onStartup.addListener(async () => {
  const state = await getState();
  if (state.status === "RUNNING") {
    startAlarm();
  }
});



chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) return;

  let state = await getState();

  if (state.isSnoozed && state.snoozeUntil && Date.now() >= state.snoozeUntil) {
    const cleared = { ...state, isSnoozed: false, snoozeUntil: null };
    await setState(cleared);
    await broadcast(cleared);
  }

  state = await getState();
  await finalizeExpiredIfNeeded(state);
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  handleAction(request).then(sendResponse).catch((err) => {
    console.error("[Foocus] Action error:", err);
    sendResponse({ ok: false, error: err.message });
  });
  return true;
});

async function handleAction({ action, payload }) {
  let state = await getState();
  if (await finalizeExpiredIfNeeded(state)) {
    state = await getState();
  }

  switch (action) {

    case "play": {
      if (state.status === "RUNNING") break;
      if (state.status === "DONE") break;

      const nextState = {
        ...state,
        status: "RUNNING",
        startedAt: Date.now(),
      };
      await setState(nextState);
      await broadcast(nextState);
      startAlarm();
      break;
    }

    case "pause": {
      if (state.status !== "RUNNING") break;

      const remaining = computeRemaining(state);
      const nextState = {
        ...state,
        status: "PAUSED",
        remainingTime: remaining,
        startedAt: null,
      };
      await setState(nextState);
      await broadcast(nextState);
      stopAlarm();
      break;
    }

    case "reset": {
      const nextState = {
        ...state,
        status: "IDLE",
        remainingTime: state.totalInitialTime,
        startedAt: null,
      };
      await setState(nextState);
      await broadcast(nextState);
      stopAlarm();
      break;
    }

    case "setTimer": {
      const total = (payload.minutes * 60) + (payload.seconds ?? 0);
      const nextState = {
        ...state,
        status: "IDLE",
        totalInitialTime: total,
        remainingTime: total,
        startedAt: null,
      };
      await setState(nextState);
      await broadcast(nextState);
      stopAlarm();
      break;
    }

    case "updateFocus": {
      const nextState = { ...state, focusText: payload.focusText };
      await setState(nextState);
      await broadcast(nextState);
      break;
    }

    case "snooze": {
      const snoozeUntil = Date.now() + 60 * 60 * 1000; // 1 hour
      const nextState = { ...state, isSnoozed: true, snoozeUntil };
      await setState(nextState);
      await broadcast(nextState);
      break;
    }

    case "toggleCollapse": {
      const nextState = { ...state, isCollapsed: !state.isCollapsed };
      await setState(nextState);
      await broadcast(nextState);
      break;
    }

    case "toggleDarkMode": {
      const nextState = { ...state, isDarkMode: !state.isDarkMode };
      await setState(nextState);
      await broadcast(nextState);
      break;
    }

    case "toggleAnimation": {
      const nextState = { ...state, animationEnabled: !state.animationEnabled };
      await setState(nextState);
      await broadcast(nextState);
      break;
    }

    case "setProgressColor": {
      const nextState = { ...state, progressColor: payload.color };
      await setState(nextState);
      await broadcast(nextState);
      break;
    }

    case "getState": {
      if (state.status === "RUNNING") {
        state = { ...state, remainingTime: computeRemaining(state) };
      }
      return state;
    }

    case "render": {
      if (state.status === "RUNNING") {
        state = { ...state, remainingTime: computeRemaining(state) };
      }
      await broadcast(state);
      break;
    }

    default:
      console.warn("[Foocus] Unknown action:", action);
  }

  return { ok: true };
}

chrome.action.onClicked.addListener(async () => {
  await handleAction({ action: "render" });
});