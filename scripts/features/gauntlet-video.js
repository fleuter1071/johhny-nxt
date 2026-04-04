export function initGauntletVideo() {
  const shell = document.getElementById("gauntletVideoShell");
  const launch = document.getElementById("gauntletVideoLaunch");

  if (!shell || !launch) {
    return;
  }

  function loadVideo() {
    if (shell.dataset.videoLoaded === "true") {
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.className = "gauntlet-video-frame";
    iframe.src = shell.dataset.videoSrc || "";
    iframe.title = "Johnny Gargano gauntlet finish video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    shell.dataset.videoLoaded = "true";
    shell.innerHTML = "";
    shell.appendChild(iframe);
  }

  launch.addEventListener("click", loadVideo);
}
