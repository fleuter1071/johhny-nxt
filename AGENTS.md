# AGENTS.md

## Repo Context
- Repo root: `C:\Users\dougs\johnny-g-nxt`
- App type: static multi-file web microsite
- Primary entrypoint: `index.html`
- Current structure:
  - `styles/` for CSS layers
  - `data/` for feature content/config
  - `scripts/lib/` for shared utilities
  - `scripts/features/` for page features
  - `assets/` for images

## Working Expectations
- Preserve the current static-site architecture unless the user asks for a larger platform shift.
- Prefer incremental changes that keep the site easy to host without a build step.
- Keep content/config in `data/` when a feature is data-driven.
- Keep shared browser utilities in `scripts/lib/`.
- Keep feature-specific behavior isolated to `scripts/features/`.
- Preserve the current visual language unless the user asks for redesign work.

## Shortcut Behavior
These repo-local shortcuts mirror the active global defaults for this project.

### `append!`
- Append a new project/session memory entry using the repo's standard memory format.
- Use the latest completed work from the current session by default.
- If scope is ambiguous, briefly state the assumed scope and let the user confirm or correct it before writing.

### `qa!`
- Run a QA pass on the current local diff by default unless the user specifies a different scope.
- Explicitly use the `qa` skill when available.
- Follow this output format:
  - `Scope tested`
  - `Test cases executed`
  - `Findings`
  - `Repro steps for each finding`
  - `Regression results`
  - `Release recommendation`
- Prioritize the highest-risk changed flows first.
- Call out residual risk if coverage is incomplete.

### `shorts!`
- List all shortcut phrases currently defined in this repo `AGENTS.md` and the global `AGENTS.md`.
- Briefly explain what each shortcut does.
- Include important default assumptions tied to each shortcut.
- If a repo-local shortcut overrides a global one, note that clearly.

### `uptospeed!`
- Get fully up to speed on the current repository before doing other substantive work.
- Read this `AGENTS.md` and `PROJECT_MEMORY.md` first when they exist.
- Then scan the main product docs and core implementation files needed to understand current behavior, architecture, and recent changes.
- Return a concise summary of the current product, architecture, recent notable work, constraints, and obvious follow-ups.
- Treat this as a read-and-summarize workflow only; do not make code changes unless the user asks separately.
