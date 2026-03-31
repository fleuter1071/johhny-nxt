import { initBookFinish } from "./features/book-finish.js";
import { initBeliefMeter } from "./features/belief-meter.js";
import { initChantGenerator } from "./features/chant-generator.js";
import { initCountdown } from "./features/countdown.js";
import { initFanTypeQuiz } from "./features/fan-type.js";
import { initMoveSpotlight } from "./features/move-spotlight.js";
import { initMatchLab } from "./features/match-lab.js";
import { initActiveNav } from "./features/nav-active.js";
import { initReveal } from "./features/reveal.js";

initReveal();
initCountdown();
initBeliefMeter();
initMoveSpotlight();
initMatchLab();
initActiveNav();

const chantController = initChantGenerator();
initFanTypeQuiz({ chantController });
initBookFinish();
