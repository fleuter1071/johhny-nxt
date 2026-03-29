export function initMoveSpotlight() {
  const moveCopy = document.getElementById("moveCopy");
  const tabs = document.querySelectorAll(".tab");
  if (!moveCopy || !tabs.length) {
    return;
  }

  const moveText = {
    escape: "The hold that says surviving Johnny Gargano is not the same thing as escaping him. When the pressure closes in, this is the kind of move that reminds everyone why he is one of the smartest closers in the game.",
    beat: "One Final Beat feels like the perfect Johnny move because it lands like punctuation. It is the exclamation point in a fight where endurance, emotion, and timing have already done the storytelling."
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      moveCopy.textContent = moveText[tab.dataset.move];
    });
  });
}
