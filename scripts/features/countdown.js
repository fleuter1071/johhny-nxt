export function initCountdown() {
  const ids = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  if (!ids.days || !ids.hours || !ids.minutes || !ids.seconds) {
    return;
  }

  const targetDate = new Date("2026-04-04T19:00:00");

  function updateCountdown() {
    const now = new Date();
    let diff = targetDate - now;
    if (diff < 0) {
      diff = 0;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    ids.days.textContent = String(days).padStart(2, "0");
    ids.hours.textContent = String(hours).padStart(2, "0");
    ids.minutes.textContent = String(minutes).padStart(2, "0");
    ids.seconds.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}
