import { fanPriority, fanTypes, quizQuestions } from "../../data/fan-types.data.js";
import { createCardCanvas, downloadCanvas, wrapText } from "../lib/canvas-card.js";
import { copyText } from "../lib/share.js";
import { readJSON, writeJSON } from "../lib/storage.js";

const storageKey = "johnny-fan-type-phase-3";
const legacyStorageKeys = ["johnny-fan-type-phase-1", "johnny-fan-type-phase-2"];
const defaultDeclaration = "Give Johnny Gargano the stage, the pressure, and the possibility, and he will make the moment matter.";

function freshScores() {
  return {
    believer: 0,
    historian: 0,
    comeback: 0,
    prophet: 0,
    loyalist: 0
  };
}

function normalizeSavedData(data) {
  if (!data || !data.key || !fanTypes[data.key]) {
    return null;
  }

  return {
    key: data.key,
    savedAt: data.savedAt || Date.now(),
    completions: Number(data.completions || 0),
    secretChantUnlocked: Boolean(data.secretChantUnlocked || Number(data.completions || 0) >= 2)
  };
}

export function initFanTypeQuiz({ chantController }) {
  const quizShell = document.getElementById("quizShell");
  if (!quizShell) {
    return;
  }

  const startQuizBtn = document.getElementById("startQuizBtn");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");
  const quizProgressCopy = document.getElementById("quizProgressCopy");
  const quizProgressFill = document.getElementById("quizProgressFill");
  const resultTitle = document.getElementById("resultTitle");
  const resultSubtitle = document.getElementById("resultSubtitle");
  const resultDescription = document.getElementById("resultDescription");
  const resultQuote = document.getElementById("resultQuote");
  const nativeShareBtn = document.getElementById("nativeShareBtn");
  const copyResultBtn = document.getElementById("copyResultBtn");
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  const downloadCardBtn = document.getElementById("downloadCardBtn");
  const retakeQuizBtn = document.getElementById("retakeQuizBtn");
  const copyStatus = document.getElementById("copyStatus");
  const lastResultLine = document.getElementById("lastResultLine");
  const unlockNote = document.getElementById("unlockNote");
  const sharePreview = document.getElementById("sharePreview");
  const fanDeclaration = document.getElementById("fanDeclaration");

  let questionIndex = 0;
  let quizScores = freshScores();
  let currentFanType = null;
  let completionCount = 0;
  let secretChantUnlocked = false;

  function setQuizState(state) {
    quizShell.dataset.state = state;
  }

  function triggerResultReveal() {
    quizShell.classList.remove("result-reveal");
    void quizShell.offsetWidth;
    quizShell.classList.add("result-reveal");
    window.setTimeout(() => quizShell.classList.remove("result-reveal"), 1300);
  }

  function pickWinner() {
    return Object.entries(quizScores).sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }

      return fanPriority.indexOf(a[0]) - fanPriority.indexOf(b[0]);
    })[0][0];
  }

  function getShareUrl(key = currentFanType) {
    return `${location.origin}${location.pathname}?fan=${key}`;
  }

  function getShareText(key = currentFanType) {
    const type = fanTypes[key];
    return `${type.shareLine}\n\nMy chant: ${type.chant}\nQuote: "${type.quote}"\n\nTake the quiz: ${getShareUrl(key)}`;
  }

  function updateSharePreview(key = currentFanType) {
    sharePreview.textContent = key ? getShareText(key) : "";
  }

  function syncSecretChantUI() {
    chantController.syncSecretChantUI(secretChantUnlocked);
  }

  function applyFanTypeTheme(key) {
    document.body.dataset.fanType = key;
    const type = fanTypes[key];
    if (!type) {
      return;
    }

    fanDeclaration.textContent = type.declaration;
    chantController.setSuggestedChant(type.chant);
  }

  function clearFanTypeTheme() {
    delete document.body.dataset.fanType;
    fanDeclaration.textContent = defaultDeclaration;
    chantController.setSuggestedChant(null);
  }

  function readSavedState() {
    const current = normalizeSavedData(readJSON(storageKey));
    if (current) {
      return current;
    }

    for (const key of legacyStorageKeys) {
      const legacy = readJSON(key);
      if (legacy && legacy.key && fanTypes[legacy.key]) {
        return normalizeSavedData({
          key: legacy.key,
          savedAt: legacy.savedAt || Date.now(),
          completions: legacy.completions || 1,
          secretChantUnlocked: legacy.secretChantUnlocked || false
        });
      }
    }

    return null;
  }

  function updateLastResultLine() {
    const saved = readSavedState();
    if (!saved) {
      lastResultLine.textContent = "No fan type saved yet. Take the quiz and claim your side of the Johnny Wrestling psyche.";
      unlockNote.textContent = "";
      return;
    }

    completionCount = Number(saved.completions || 0);
    secretChantUnlocked = Boolean(saved.secretChantUnlocked || completionCount >= 2);
    lastResultLine.textContent = `Last saved fan type: ${fanTypes[saved.key].title}`;
    unlockNote.textContent = secretChantUnlocked
      ? "Repeat-fan bonus unlocked: secret crowd chant enabled."
      : "Take the quiz twice total to unlock a secret crowd chant.";
    syncSecretChantUI();
  }

  function saveState(key) {
    completionCount += 1;
    secretChantUnlocked = completionCount >= 2;

    writeJSON(storageKey, {
      version: 1,
      key,
      savedAt: Date.now(),
      completions: completionCount,
      secretChantUnlocked
    }, "Could not save fan type state");

    syncSecretChantUI();
    updateLastResultLine();
  }

  function renderQuestion() {
    const question = quizQuestions[questionIndex];
    quizProgressCopy.textContent = `Question ${questionIndex + 1} of ${quizQuestions.length}`;
    quizProgressFill.style.width = `${((questionIndex + 1) / quizQuestions.length) * 100}%`;
    quizQuestion.textContent = question.prompt;
    quizOptions.innerHTML = "";

    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        Object.entries(option.score).forEach(([key, value]) => {
          quizScores[key] += value;
        });

        if (questionIndex < quizQuestions.length - 1) {
          questionIndex += 1;
          renderQuestion();
          return;
        }

        setQuizState("loading");
        window.setTimeout(() => revealResult(pickWinner()), 900);
      });
      quizOptions.appendChild(button);
    });
  }

  function downloadFanCard() {
    if (!currentFanType) {
      return;
    }

    const type = fanTypes[currentFanType];
    const accent = getComputedStyle(document.body).getPropertyValue("--fan-accent").trim() || "#f6d34e";
    const { canvas, ctx } = createCardCanvas(accent);

    ctx.fillStyle = accent;
    ctx.font = "800 34px Inter, Arial, sans-serif";
    ctx.fillText("JOHNNY WRESTLING FAN TYPE", 90, 130);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "900 88px Inter, Arial, sans-serif";
    wrapText(ctx, type.title.toUpperCase(), 90, 255, 900, 92);

    ctx.fillStyle = "#d9e2f1";
    ctx.font = "700 34px Inter, Arial, sans-serif";
    const subY = wrapText(ctx, type.subtitle, 90, 395, 900, 48);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(90, subY + 55, 900, 2);

    ctx.fillStyle = "#b8c2d6";
    ctx.font = "500 34px Inter, Arial, sans-serif";
    const descY = wrapText(ctx, type.description, 90, subY + 130, 900, 48);

    ctx.fillStyle = accent;
    ctx.fillRect(90, descY + 55, 8, 190);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 46px Inter, Arial, sans-serif";
    wrapText(ctx, `“${type.quote}”`, 125, descY + 120, 830, 60);

    ctx.fillStyle = accent;
    ctx.font = "800 36px Inter, Arial, sans-serif";
    ctx.fillText(`CHANT: ${type.chant}`, 90, 1120);

    ctx.fillStyle = "#dce5f5";
    ctx.font = "700 28px Inter, Arial, sans-serif";
    ctx.fillText("Take the quiz at your Johnny Wrestling fan page", 90, 1185);

    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "600 24px Inter, Arial, sans-serif";
    ctx.fillText(location.origin + location.pathname, 90, 1240);

    downloadCanvas(canvas, `${type.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-fan-card.png`);
  }

  function revealResult(key, skipSave = false) {
    currentFanType = key;
    const type = fanTypes[key];
    resultTitle.textContent = type.title;
    resultSubtitle.textContent = type.subtitle;
    resultDescription.textContent = type.description;
    resultQuote.textContent = `“${type.quote}”`;
    setQuizState("result");
    applyFanTypeTheme(key);
    triggerResultReveal();
    updateSharePreview(key);
    copyStatus.textContent = "This result is ready to share.";
    history.replaceState({}, "", `${location.pathname}?fan=${key}`);
    document.title = `${type.title} | Johnny Wrestling Fan Type`;

    if (!skipSave) {
      saveState(key);
    } else {
      syncSecretChantUI();
    }
  }

  function resetQuiz() {
    questionIndex = 0;
    quizScores = freshScores();
    currentFanType = null;
    copyStatus.textContent = "";
    sharePreview.textContent = "";
    history.replaceState({}, "", location.pathname);
    document.title = "Johnny Wrestling | One More Run";
    clearFanTypeTheme();
    setQuizState("intro");
    updateLastResultLine();
  }

  startQuizBtn.addEventListener("click", () => {
    questionIndex = 0;
    quizScores = freshScores();
    copyStatus.textContent = "";
    sharePreview.textContent = "";
    setQuizState("question");
    renderQuestion();
  });

  retakeQuizBtn.addEventListener("click", resetQuiz);

  nativeShareBtn.addEventListener("click", async () => {
    if (!currentFanType) {
      return;
    }

    const type = fanTypes[currentFanType];
    const url = getShareUrl();
    const text = `${type.shareLine}\n\nTake the quiz: ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${type.title} | Johnny Wrestling Fan Type`,
          text,
          url
        });
        copyStatus.textContent = "Shared. Time to start a Gargano fan argument.";
        return;
      } catch (error) {
        if (error && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await copyText(getShareText());
      copyStatus.textContent = "Native share is not available here, so the full result text was copied instead.";
    } catch (error) {
      copyStatus.textContent = "Share failed on this device.";
    }
  });

  copyResultBtn.addEventListener("click", async () => {
    if (!currentFanType) {
      return;
    }

    try {
      await copyText(getShareText());
      copyStatus.textContent = "Copied. Time to send it into the group chat.";
    } catch (error) {
      copyStatus.textContent = "Copy failed on this device. You can still manually share the URL in your address bar.";
    }
  });

  copyLinkBtn.addEventListener("click", async () => {
    if (!currentFanType) {
      return;
    }

    try {
      await copyText(getShareUrl());
      copyStatus.textContent = "Link copied.";
    } catch (error) {
      copyStatus.textContent = "Could not copy the link on this device.";
    }
  });

  downloadCardBtn.addEventListener("click", () => {
    if (!currentFanType) {
      return;
    }

    downloadFanCard();
    copyStatus.textContent = "Fan card downloaded.";
  });

  nativeShareBtn.textContent = navigator.share ? "Share result" : "Quick share";
  updateLastResultLine();

  const params = new URLSearchParams(window.location.search);
  const sharedFanType = params.get("fan");
  if (sharedFanType && fanTypes[sharedFanType]) {
    revealResult(sharedFanType, true);
    copyStatus.textContent = "A fan shared this result with you. Retake the quiz to see what you get.";
    return;
  }

  const saved = readSavedState();
  if (saved) {
    completionCount = Number(saved.completions || 0);
    secretChantUnlocked = Boolean(saved.secretChantUnlocked || completionCount >= 2);
    syncSecretChantUI();
  }
}
