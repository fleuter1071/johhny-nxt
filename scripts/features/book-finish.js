import { finishSteps } from "../../data/book-finish.data.js";
import { createCardCanvas, downloadCanvas, wrapText } from "../lib/canvas-card.js";
import { copyText } from "../lib/share.js";
import { readJSON, writeJSON } from "../lib/storage.js";

const bookFinishStorageKey = "johnny-book-finish-mvp";

function emptyState() {
  return {
    spark: null,
    stress: null,
    move: null,
    image: null
  };
}

export function initBookFinish() {
  const bfShell = document.getElementById("bfShell");
  if (!bfShell) {
    return;
  }

  const bfStartBtn = document.getElementById("bfStartBtn");
  const bfQuestion = document.getElementById("bfQuestion");
  const bfOptions = document.getElementById("bfOptions");
  const bfProgressCopy = document.getElementById("bfProgressCopy");
  const bfProgressFill = document.getElementById("bfProgressFill");
  const bfResultTitle = document.getElementById("bfResultTitle");
  const bfResultSubtitle = document.getElementById("bfResultSubtitle");
  const bfResultSummary = document.getElementById("bfResultSummary");
  const bfResultTags = document.getElementById("bfResultTags");
  const bfShareBtn = document.getElementById("bfShareBtn");
  const bfCopyTextBtn = document.getElementById("bfCopyTextBtn");
  const bfCopyLinkBtn = document.getElementById("bfCopyLinkBtn");
  const bfDownloadBtn = document.getElementById("bfDownloadBtn");
  const bfRetakeBtn = document.getElementById("bfRetakeBtn");
  const bfStatus = document.getElementById("bfStatus");
  const bfLastLine = document.getElementById("bfLastLine");
  const bfSharePreview = document.getElementById("bfSharePreview");

  let bfStepIndex = 0;
  let bfState = emptyState();
  let bfResult = null;

  function bfSetState(state) {
    bfShell.dataset.state = state;
  }

  function bfFindOption(stepKey, optionId) {
    const step = finishSteps.find((item) => item.key === stepKey);
    return step ? step.options.find((option) => option.id === optionId) : null;
  }

  function bfGetToneCounts() {
    const tones = {};

    Object.entries(bfState).forEach(([key, value]) => {
      const option = bfFindOption(key, value);
      if (!option) {
        return;
      }

      option.tones.forEach((tone) => {
        tones[tone] = (tones[tone] || 0) + 1;
      });
    });

    return tones;
  }

  function bfDominantTone() {
    const entries = Object.entries(bfGetToneCounts()).sort((a, b) => b[1] - a[1]);
    return entries.length ? entries[0][0] : "heart";
  }

  function bfResolveTitle() {
    if (bfState.spark === "candice-spark" && bfState.image === "redemption") return "The Redemption Finish";
    if (bfState.stress === "near-fall" && bfState.move === "one-final-beat") return "The Heart-Stopping Finish";
    if (bfState.stress === "outside-chaos" && bfState.move === "flash-pin") return "The Chaos Survivor Finish";
    if (bfState.move === "gargano-escape" && bfState.image === "crowd-chant") return "The Johnny Wrestling Finish";
    if (bfState.spark === "crowd-surge") return "The Arena Revival Finish";
    if (bfState.image === "candice-present") return "The Full-Circle Finish";
    if (bfState.move === "statement-counter") return "The Statement Finish";

    const tone = bfDominantTone();
    if (tone === "redemption") return "The Redemption Finish";
    if (tone === "crowd") return "The Crowd Surge Finish";
    if (tone === "chaos") return "The Chaos Finish";
    if (tone === "destiny") return "The One More Run Finish";
    return "The Heart Revival Finish";
  }

  function bfResolveSubtitle() {
    const tone = bfDominantTone();
    if (tone === "redemption") return "You booked an emotional comeback built on belief, release, and full-circle energy.";
    if (tone === "crowd") return "You booked the version where the whole building would absolutely lose its mind.";
    if (tone === "chaos") return "You booked panic, timing, and just enough madness to make the payoff hit harder.";
    if (tone === "statement") return "You booked a finish meant to end debate and make the moment feel undeniable.";
    if (tone === "destiny") return "You booked the kind of ending that feels like title-night fate finally cashing in.";
    return "You booked a Johnny ending made of heart, stress, and payoff.";
  }

  function bfResolveSummary() {
    const spark = bfFindOption("spark", bfState.spark);
    const stress = bfFindOption("stress", bfState.stress);
    const move = bfFindOption("move", bfState.move);
    const image = bfFindOption("image", bfState.image);

    const sentenceOne = `You booked a comeback sparked by ${spark.opener}, pushed to the edge by ${stress.stressLine}, and finished with ${move.finishLine} before ${image.endingLine}.`;

    const tone = bfDominantTone();
    let sentenceTwo = "In your version, this is not just a win - it is a release.";
    if (tone === "chaos") sentenceTwo = "In your version, the match has to survive chaos before Johnny can survive it too.";
    if (tone === "crowd") sentenceTwo = "In your version, the crowd is not background noise - it becomes part of the finish itself.";
    if (tone === "statement") sentenceTwo = "In your version, the ending lands like punctuation, not possibility.";
    if (tone === "destiny") sentenceTwo = "In your version, the whole thing feels less like luck and more like a chapter arriving exactly when it was supposed to.";
    if (tone === "heart") sentenceTwo = "In your version, heart is what carries the finish before the move ever does.";

    return `${sentenceOne} ${sentenceTwo}`;
  }

  function bfBuildTags() {
    return [
      { label: "Comeback spark", value: bfFindOption("spark", bfState.spark).shortLabel },
      { label: "Stress point", value: bfFindOption("stress", bfState.stress).shortLabel },
      { label: "Finish move", value: bfFindOption("move", bfState.move).shortLabel },
      { label: "Final note", value: bfFindOption("image", bfState.image).shortLabel }
    ];
  }

  function bfBuildShareText() {
    const tags = bfBuildTags().map((tag) => tag.value).join(" → ");
    const url = `${location.origin}${location.pathname}#book-finish`;
    return `I booked Johnny's perfect finish:\n${tags}\n\nMy result: ${bfResult.title}\nBuild yours: ${url}`;
  }

  function bfReadSavedData() {
    return readJSON(bookFinishStorageKey);
  }

  function bfUpdateLastLine() {
    const saved = bfReadSavedData();
    bfLastLine.textContent = saved && saved.title
      ? `Last booked finish: ${saved.title}`
      : "No saved finish yet. Book one and see how dramatic you really are.";
  }

  function bfSaveLastResult() {
    if (!bfResult) {
      return;
    }

    writeJSON(bookFinishStorageKey, {
      version: 1,
      title: bfResult.title,
      savedAt: Date.now(),
      choices: { ...bfState },
      completions: (bfReadSavedData()?.completions || 0) + 1
    }, "Could not save booked finish");

    bfUpdateLastLine();
  }

  function bfRenderResult() {
    bfResult = {
      title: bfResolveTitle(),
      subtitle: bfResolveSubtitle(),
      summary: bfResolveSummary(),
      tags: bfBuildTags()
    };

    bfResultTitle.textContent = bfResult.title;
    bfResultSubtitle.textContent = bfResult.subtitle;
    bfResultSummary.textContent = bfResult.summary;
    bfResultTags.innerHTML = "";

    bfResult.tags.forEach((tag) => {
      const element = document.createElement("div");
      element.className = "bf-tag";
      element.innerHTML = `
        <div class="bf-tag-label">${tag.label}</div>
        <div class="bf-tag-value">${tag.value}</div>
      `;
      bfResultTags.appendChild(element);
    });

    bfSharePreview.textContent = bfBuildShareText();
    bfStatus.textContent = "Your finish is ready to share.";
    bfSetState("result");
    bfSaveLastResult();
  }

  function bfRenderStep() {
    const step = finishSteps[bfStepIndex];
    bfProgressCopy.textContent = `Step ${bfStepIndex + 1} of ${finishSteps.length}`;
    bfProgressFill.style.width = `${((bfStepIndex + 1) / finishSteps.length) * 100}%`;
    bfQuestion.textContent = step.prompt;
    bfOptions.innerHTML = "";

    step.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "bf-option";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        bfState[step.key] = option.id;

        if (bfStepIndex < finishSteps.length - 1) {
          bfStepIndex += 1;
          bfRenderStep();
          return;
        }

        bfSetState("loading");
        window.setTimeout(() => bfRenderResult(), 800);
      });

      bfOptions.appendChild(button);
    });
  }

  function bfReset() {
    bfStepIndex = 0;
    bfState = emptyState();
    bfResult = null;
    bfStatus.textContent = "";
    bfSharePreview.textContent = "";
    bfSetState("intro");
    bfUpdateLastLine();
  }

  function bfDownloadCard() {
    if (!bfResult) {
      return;
    }

    const accent = getComputedStyle(document.body).getPropertyValue("--fan-accent").trim() || "#f6d34e";
    const { canvas, ctx } = createCardCanvas(accent);

    ctx.fillStyle = accent;
    ctx.font = "800 34px Inter, Arial, sans-serif";
    ctx.fillText("BOOK JOHNNY'S FINISH", 90, 130);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "900 86px Inter, Arial, sans-serif";
    wrapText(ctx, bfResult.title.toUpperCase(), 90, 250, 900, 90);

    ctx.fillStyle = "#dbe5f6";
    ctx.font = "700 34px Inter, Arial, sans-serif";
    const subY = wrapText(ctx, bfResult.subtitle, 90, 390, 900, 46);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(90, subY + 55, 900, 2);

    ctx.fillStyle = "#b8c2d6";
    ctx.font = "500 32px Inter, Arial, sans-serif";
    const summaryY = wrapText(ctx, bfResult.summary, 90, subY + 125, 900, 46);

    ctx.fillStyle = accent;
    ctx.font = "800 30px Inter, Arial, sans-serif";
    ctx.fillText(`SPARK: ${bfResult.tags[0].value}`, 90, summaryY + 110);
    ctx.fillText(`STRESS: ${bfResult.tags[1].value}`, 90, summaryY + 165);
    ctx.fillText(`FINISH: ${bfResult.tags[2].value}`, 90, summaryY + 220);
    ctx.fillText(`FINAL NOTE: ${bfResult.tags[3].value}`, 90, summaryY + 275);

    ctx.fillStyle = "#dce5f5";
    ctx.font = "700 28px Inter, Arial, sans-serif";
    ctx.fillText("Build your version on the Johnny Wrestling fan page", 90, 1210);

    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "600 24px Inter, Arial, sans-serif";
    ctx.fillText(`${location.origin}${location.pathname}#book-finish`, 90, 1260);

    downloadCanvas(canvas, `${bfResult.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`);
  }

  bfStartBtn.addEventListener("click", () => {
    bfStepIndex = 0;
    bfState = emptyState();
    bfResult = null;
    bfStatus.textContent = "";
    bfSharePreview.textContent = "";
    bfSetState("question");
    bfRenderStep();
  });

  bfRetakeBtn.addEventListener("click", bfReset);

  bfShareBtn.addEventListener("click", async () => {
    if (!bfResult) {
      return;
    }

    const shareText = bfBuildShareText();
    const shareUrl = `${location.origin}${location.pathname}#book-finish`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: bfResult.title,
          text: shareText,
          url: shareUrl
        });
        bfStatus.textContent = "Shared. Time to compare finishes.";
        return;
      } catch (error) {
        if (error && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await copyText(shareText);
      bfStatus.textContent = "Native share is unavailable here, so the result text was copied instead.";
    } catch (error) {
      bfStatus.textContent = "Share failed on this device.";
    }
  });

  bfCopyTextBtn.addEventListener("click", async () => {
    if (!bfResult) {
      return;
    }

    try {
      await copyText(bfBuildShareText());
      bfStatus.textContent = "Result text copied.";
    } catch (error) {
      bfStatus.textContent = "Could not copy the result text.";
    }
  });

  bfCopyLinkBtn.addEventListener("click", async () => {
    try {
      await copyText(`${location.origin}${location.pathname}#book-finish`);
      bfStatus.textContent = "Link copied.";
    } catch (error) {
      bfStatus.textContent = "Could not copy the link.";
    }
  });

  bfDownloadBtn.addEventListener("click", () => {
    if (!bfResult) {
      return;
    }

    bfDownloadCard();
    bfStatus.textContent = "Finish card downloaded.";
  });

  bfUpdateLastLine();
}
