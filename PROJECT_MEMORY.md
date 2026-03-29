# Project Memory

## 2026-03-29

### Summary
- Analyzed the Johnny Gargano fan microsite, which started as a single-file app with inline HTML, CSS, and JavaScript.
- Refactored the site into a modular static architecture with separate `styles/`, `data/`, and `scripts/` directories.
- Replaced `index.html.html` with a proper root [index.html](/C:/Users/dougs/johnny-g-nxt/index.html).
- Preserved the original user-facing functionality: countdown, fan-type quiz, book-the-finish flow, belief meter, chant generator, and move spotlight.
- Added practical maintainability/accessibility improvements including externalized data/config, shared utility modules, `:focus-visible` styling, and `prefers-reduced-motion` handling.

### Architecture Changes
- Created shared style layers:
  - `styles/tokens.css`
  - `styles/base.css`
  - `styles/features.css`
- Created data modules:
  - `data/fan-types.data.js`
  - `data/book-finish.data.js`
- Created shared script utilities:
  - `scripts/lib/storage.js`
  - `scripts/lib/share.js`
  - `scripts/lib/canvas-card.js`
- Created feature modules:
  - `scripts/features/reveal.js`
  - `scripts/features/countdown.js`
  - `scripts/features/nav-active.js`
  - `scripts/features/belief-meter.js`
  - `scripts/features/chant-generator.js`
  - `scripts/features/move-spotlight.js`
  - `scripts/features/fan-type.js`
  - `scripts/features/book-finish.js`
- Added the main bootstrap file:
  - `scripts/main.js`

### QA
- Performed a static QA pass on the refactor.
- Verified:
  - HTML wiring for styles and module entrypoint
  - DOM selector/ID consistency between `index.html` and feature modules
  - CSS coverage for key refactored classes
  - JavaScript syntax via `node --check` across the main entrypoint, feature modules, helpers, and data modules
- Result: no confirmed defects found in static QA, with residual risk noted for live browser/manual interaction testing.

### Deployment
- Confirmed the working folder was not a git repo.
- Cloned the GitHub repo `https://github.com/fleuter1071/johhny-nxt` into a temporary `_upstream_check` folder.
- Copied the refactored site into the clone, committed on `main`, and pushed successfully.
- Production push details:
  - Branch: `main`
  - Commit: `b60ebd0`
  - Commit message: `Refactor site into modular static architecture`
- Removed the temporary `_upstream_check` folder after push.

### Notes
- The repo currently remains a static site, but it is now organized for safer iteration and future expansion.
- Additional image assets exist under `assets/` beyond the current hero image usage.
