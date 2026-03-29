export function initBeliefMeter() {
  const beliefBtn = document.getElementById("believeBtn");
  const meterFill = document.getElementById("meterFill");
  const meterValue = document.getElementById("meterValue");

  if (!beliefBtn || !meterFill || !meterValue) {
    return;
  }

  const meterLines = [
    "Belief level: fired up",
    "Belief level: getting louder",
    "Belief level: title-night energy",
    "Belief level: full Johnny Wrestling faith",
    "Belief level: absolute eruption"
  ];

  let meter = 18;
  let meterIndex = 0;

  beliefBtn.addEventListener("click", () => {
    meter = Math.min(100, meter + 17);
    meterIndex = Math.min(meterLines.length - 1, meterIndex + 1);
    meterFill.style.width = `${meter}%`;
    meterValue.textContent = meter >= 100 ? "Belief level: MAXED OUT - JOHNNY WRESTLING!" : meterLines[meterIndex];
  });
}
