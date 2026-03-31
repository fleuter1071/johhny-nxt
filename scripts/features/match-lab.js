import { matchLabData } from "../../data/wwe2k-match-lab.data.js";

export function initMatchLab() {
  const section = document.getElementById("match-lab");
  if (!section) {
    return;
  }

  const fighterCards = Array.from(section.querySelectorAll(".fighter-card"));
  const tapeGrid = section.querySelector(".tape-grid");
  const movesGrid = section.querySelector(".moves-grid");
  const winnerOptions = section.querySelector(".outcome-winner-options");
  const finishOptions = section.querySelector(".outcome-finish-options");
  const resultCard = section.querySelector(".result-card");
  const closingStrip = section.querySelector(".match-lab-strip");
  const versusScores = Array.from(section.querySelectorAll("[data-ovr-target]"));

  if (!tapeGrid || !movesGrid || !winnerOptions || !finishOptions || !resultCard || !closingStrip || fighterCards.length !== 2) {
    return;
  }

  let selectedWinner = null;
  let selectedFinish = null;
  let ovrAnimated = false;

  function createFactList(fighter) {
    return [
      { label: "Brand", value: fighter.brand },
      { label: "Class", value: fighter.weightClass },
      { label: "Series status", value: fighter.seriesHistory },
      { label: "Game debut", value: fighter.debut }
    ];
  }

  function renderFighterCards() {
    fighterCards.forEach((card, index) => {
      const fighter = matchLabData.fighters[index];
      card.classList.add(`fighter-card-${fighter.key}`);
      card.innerHTML = `
        <div class="fighter-image-wrap">
          <img class="fighter-image" src="${fighter.image}" alt="${fighter.imageAlt}" />
        </div>
        <div class="fighter-card-body">
          <div class="fighter-card-topline">${fighter.brand}</div>
          <h3 class="fighter-name">${fighter.name}</h3>
          <div class="fighter-ovr-row">
            <div class="fighter-ovr-label">OVR</div>
            <div class="fighter-ovr-value" data-ovr-target="${fighter.ovr}">0</div>
          </div>
          <p class="fighter-summary">${fighter.summary}</p>
        </div>
      `;
    });
  }

  function renderTape() {
    tapeGrid.innerHTML = "";

    matchLabData.fighters.forEach((fighter) => {
      const card = document.createElement("article");
      card.className = `stat-card stat-card-${fighter.key}`;

      const facts = createFactList(fighter)
        .map((fact) => `<li><span>${fact.label}</span><strong>${fact.value}</strong></li>`)
        .join("");

      card.innerHTML = `
        <div class="stat-card-topline">${fighter.name}</div>
        <div class="stat-card-ovr">
          <span class="stat-card-ovr-label">OVR</span>
          <span class="stat-card-ovr-value" data-ovr-target="${fighter.ovr}">0</span>
        </div>
        <ul class="stat-list">${facts}</ul>
        <p class="stat-summary">${fighter.summary}</p>
      `;

      tapeGrid.appendChild(card);
    });
  }

  function buildMoveCard(fighterKey, type, move, index) {
    const buttonId = `${fighterKey}-${type}-${index}`;
    return `
      <button class="move-card" type="button" aria-expanded="false" aria-controls="${buttonId}-body">
        <span class="move-card-type">${type === "finishers" ? "Finisher" : "Signature"}</span>
        <span class="move-card-name">${move.name}</span>
        <span class="move-card-icon" aria-hidden="true">+</span>
      </button>
      <div class="move-card-body" id="${buttonId}-body" hidden>
        <p>${move.blurb}</p>
      </div>
    `;
  }

  function renderMoves() {
    movesGrid.innerHTML = "";

    Object.entries(matchLabData.moves).forEach(([fighterKey, moveSet]) => {
      const column = document.createElement("article");
      column.className = "moves-column";

      const signatures = moveSet.signatures.map((move, index) => buildMoveCard(fighterKey, "signatures", move, index)).join("");
      const finishers = moveSet.finishers.map((move, index) => buildMoveCard(fighterKey, "finishers", move, index)).join("");

      column.innerHTML = `
        <div class="moves-column-topline">${moveSet.label}</div>
        <div class="move-group">
          <div class="move-group-label">Signatures</div>
          <div class="move-group-list">${signatures}</div>
        </div>
        <div class="move-group">
          <div class="move-group-label">Finishers</div>
          <div class="move-group-list move-group-list-finishers">${finishers}</div>
        </div>
      `;

      movesGrid.appendChild(column);
    });
  }

  function renderOutcomePicker() {
    winnerOptions.innerHTML = "";
    finishOptions.innerHTML = "";

    matchLabData.outcomes.winners.forEach((winner) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "outcome-option";
      button.dataset.winner = winner.key;
      button.textContent = winner.label;
      button.addEventListener("click", () => {
        selectedWinner = winner.key;
        selectedFinish = null;
        updateWinnerSelection();
        renderFinishOptions();
        renderResultCard();
      });
      winnerOptions.appendChild(button);
    });

    renderFinishOptions();
    renderResultCard();
  }

  function renderFinishOptions() {
    finishOptions.innerHTML = "";

    const validFinishes = matchLabData.outcomes.finishes.filter((finish) => {
      if (!selectedWinner) {
        return finish.winner === "either";
      }

      return finish.winner === selectedWinner || finish.winner === "either";
    });

    validFinishes.forEach((finish) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "outcome-option outcome-option-finish";
      button.dataset.finish = finish.key;
      button.textContent = finish.label;
      button.disabled = !selectedWinner && finish.winner !== "either";
      button.addEventListener("click", () => {
        selectedFinish = finish.key;
        updateFinishSelection();
        renderResultCard();
      });
      finishOptions.appendChild(button);
    });

    updateFinishSelection();
  }

  function updateWinnerSelection() {
    winnerOptions.querySelectorAll(".outcome-option").forEach((button) => {
      const isSelected = button.dataset.winner === selectedWinner;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  }

  function updateFinishSelection() {
    finishOptions.querySelectorAll(".outcome-option").forEach((button) => {
      const isSelected = button.dataset.finish === selectedFinish;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  }

  function renderResultCard() {
    if (!selectedWinner) {
      resultCard.classList.remove("is-ready");
      resultCard.innerHTML = `
        <div class="result-card-placeholder">
          <div class="result-card-kicker">Step 1</div>
          <h4>Pick the winner first.</h4>
          <p>Johnny has the edge on paper. Borne is still one point behind and carrying the title. Choose the side you want to back.</p>
        </div>
      `;
      return;
    }

    if (!selectedFinish) {
      resultCard.classList.remove("is-ready");
      resultCard.innerHTML = `
        <div class="result-card-placeholder">
          <div class="result-card-kicker">Step 2</div>
          <h4>Now pick the finish.</h4>
          <p>Keep it sharp. This should feel like a fast game pick, not a long booking tree.</p>
        </div>
      `;
      return;
    }

    const result = matchLabData.outcomes.results[selectedFinish];
    resultCard.classList.add("is-ready");
    resultCard.innerHTML = `
      <div class="result-card-badge">${result.badge}</div>
      <div class="result-card-winner">${result.winner}</div>
      <h4 class="result-card-title">${result.headline}</h4>
      <p class="result-card-finish">${result.finish}</p>
      <p class="result-card-copy">${result.support}</p>
      <button class="btn btn-secondary btn-quiet result-reset" type="button">Reset pick</button>
    `;

    const resetButton = resultCard.querySelector(".result-reset");
    resetButton?.addEventListener("click", () => {
      selectedWinner = null;
      selectedFinish = null;
      updateWinnerSelection();
      renderFinishOptions();
      renderResultCard();
    });
  }

  function renderClosingStrip() {
    const tags = matchLabData.closing.tags
      .map((tag) => `<span class="mode-tag">${tag}</span>`)
      .join("");

    closingStrip.innerHTML = `
      <div class="match-lab-strip-kicker">${matchLabData.closing.title}</div>
      <p class="match-lab-strip-copy">${matchLabData.closing.copy}</p>
      <div class="mode-tags">${tags}</div>
    `;
  }

  function bindMoveToggles() {
    movesGrid.addEventListener("click", (event) => {
      const button = event.target.closest(".move-card");
      if (!button) {
        return;
      }

      const body = button.nextElementSibling;
      const expanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!expanded));
      button.classList.toggle("is-expanded", !expanded);
      if (body) {
        body.hidden = expanded;
      }
    });
  }

  function animateOvrNumbers() {
    if (ovrAnimated) {
      return;
    }

    ovrAnimated = true;
    const numbers = Array.from(section.querySelectorAll("[data-ovr-target]"));

    numbers.forEach((node) => {
      const target = Number(node.dataset.ovrTarget || 0);
      const start = performance.now();
      const duration = 900;

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        node.textContent = String(Math.round(target * progress));
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      }

      window.requestAnimationFrame(tick);
    });
  }

  function initOvrObserver() {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      versusScores.forEach((node) => {
        node.textContent = node.dataset.ovrTarget || "0";
      });
      Array.from(section.querySelectorAll(".stat-card-ovr-value, .fighter-ovr-value")).forEach((node) => {
        node.textContent = node.dataset.ovrTarget || "0";
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animateOvrNumbers();
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(section.querySelector(".match-lab-intro"));
  }

  renderFighterCards();
  renderTape();
  renderMoves();
  renderOutcomePicker();
  renderClosingStrip();
  bindMoveToggles();
  initOvrObserver();
}
