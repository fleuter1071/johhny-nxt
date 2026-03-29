export function initChantGenerator() {
  const chantBox = document.getElementById("chantBox");
  const chantBtn = document.getElementById("chantBtn");
  const secretChantLine = document.getElementById("secretChantLine");

  if (!chantBox || !chantBtn || !secretChantLine) {
    return {
      syncSecretChantUI() {},
      setSuggestedChant() {}
    };
  }

  const chants = [
    "JOHNNY WRESTLING 👏👏👏👏👏",
    "ONE MORE RUN",
    "TAKE THAT TITLE HOME",
    "HEART OVER DOUBT",
    "NXT STILL BELONGS TO JOHNNY"
  ];
  const secretChant = "THIS IS JOHNNY'S HOUSE";

  let chantIndex = 0;
  let secretChantUnlocked = false;

  function getAvailableChants() {
    return secretChantUnlocked ? [...chants, secretChant] : chants;
  }

  function syncSecretChantUI(unlocked = secretChantUnlocked) {
    secretChantUnlocked = Boolean(unlocked);
    secretChantLine.textContent = secretChantUnlocked ? `Secret chant unlocked: ${secretChant}` : "";

    if (!secretChantUnlocked && chantBox.textContent === secretChant) {
      chantBox.textContent = chants[0];
      chantIndex = 0;
    }
  }

  function setSuggestedChant(nextChant) {
    const available = getAvailableChants();
    const finalChant = available.includes(nextChant) ? nextChant : available[0];
    chantBox.textContent = finalChant;
    chantIndex = Math.max(0, available.indexOf(finalChant));
  }

  chantBtn.addEventListener("click", () => {
    const available = getAvailableChants();
    chantIndex = (chantIndex + 1) % available.length;
    chantBox.textContent = available[chantIndex];
  });

  return {
    syncSecretChantUI,
    setSuggestedChant
  };
}
