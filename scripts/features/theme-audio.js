import { readJSON, writeJSON } from "../lib/storage.js";

const storageKey = "johnny-theme-audio-preference";
const clipDurationSeconds = 15;

function readPreference() {
  const saved = readJSON(storageKey);
  if (!saved || typeof saved.enabled !== "boolean") {
    return { enabled: true };
  }

  return { enabled: saved.enabled };
}

export function initThemeAudio() {
  const audio = document.getElementById("themeAudio");
  const toggle = document.getElementById("themeAudioToggle");
  const status = document.getElementById("themeAudioStatus");

  if (!audio || !toggle || !status) {
    return;
  }

  let enabled = readPreference().enabled;
  let autoplayBlocked = false;
  let canAutoplay = false;

  function persistPreference() {
    writeJSON(storageKey, { enabled }, "Could not save theme audio preference");
  }

  function updateUI() {
    toggle.classList.toggle("is-on", enabled);
    toggle.classList.toggle("is-blocked", enabled && autoplayBlocked);
    toggle.setAttribute("aria-pressed", String(enabled));

    if (!enabled) {
      status.textContent = "Theme: Off";
      return;
    }

    if (autoplayBlocked && !canAutoplay) {
      status.textContent = "Theme: Tap to play";
      return;
    }

    status.textContent = "Theme: On";
  }

  function stopPlayback() {
    audio.pause();
    audio.currentTime = 0;
    canAutoplay = false;
  }

  async function startPlayback() {
    audio.currentTime = 0;

    try {
      await audio.play();
      autoplayBlocked = false;
      canAutoplay = true;
      updateUI();
      return true;
    } catch (error) {
      autoplayBlocked = true;
      canAutoplay = false;
      updateUI();
      return false;
    }
  }

  async function syncPlayback({ userInitiated = false } = {}) {
    if (!enabled) {
      autoplayBlocked = false;
      stopPlayback();
      updateUI();
      return;
    }

    const started = await startPlayback();
    if (!started && userInitiated) {
      status.textContent = "Theme: Tap to play";
    }
  }

  toggle.addEventListener("click", async () => {
    enabled = !enabled;
    persistPreference();

    if (!enabled) {
      stopPlayback();
      updateUI();
      return;
    }

    await syncPlayback({ userInitiated: true });
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.currentTime >= clipDurationSeconds) {
      audio.currentTime = 0;
      if (!audio.paused) {
        audio.play().catch(() => {
          autoplayBlocked = true;
          canAutoplay = false;
          updateUI();
        });
      }
    }
  });

  audio.addEventListener("ended", () => {
    if (!enabled) {
      return;
    }

    audio.currentTime = 0;
    audio.play().catch(() => {
      autoplayBlocked = true;
      canAutoplay = false;
      updateUI();
    });
  });

  audio.addEventListener("pause", () => {
    if (enabled && audio.currentTime > 0 && audio.currentTime < clipDurationSeconds) {
      canAutoplay = false;
    }
  });

  updateUI();
  syncPlayback();
}
