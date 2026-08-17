# AGENTS.md

## Current state

- React + Vite (JavaScript) app. Product requirements live in **`Celestia Card — README.md`** (note the em-dash); it is a spec, not a description of current code.
- Currently implemented: scaffold, full 78-card deck in `src/data/tarot.json`, and the **Daily Card** reading flow (choose → flip → interpret) with upright/reversed meanings and the disclaimer footer.
- Not yet built (all README "Future Features"): 3-card, 5-card, Lucky Draw modes, Tarot encyclopedia, reading history, favorites, sharing, theming, PWA.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built output
- No lint/typecheck configured (plain JSX).

## Architecture

- `src/data/tarot.json` — 78-card deck. Each card has `id`, `name`, `number`, `arcana` (`major`/`minor`), `suit`, `element`, `keywords`, `upright`, `reversed`, `general`. Add fields (love/career/finance/advice/symbolism) here for the encyclopedia feature.
- `src/utils/reading.js` — `drawCards`, `randomOrientation`, `suitGlyph`, `suitLabel`, `arcanaLabel`. Deck import and reading logic live here.
- `src/components/` — `TarotCard` (card face presentation), `CardReveal` (3D flip), `CardDeck` (face-down selection grid), `ReadingResult` (interpretation).
- `src/App.jsx` — phase state machine (`intro` → `choose` → `result`). Add new reading modes by extending these phases.
- All styling is in `src/index.css` (no Tailwind). Dark celestial theme, gold accent (`--gold`), starfield background, responsive card grid.

## Gotchas

- On Windows, `npm.ps1` is blocked by execution policy — use `npm.cmd`.
- `git` has no commits yet; README and app files are untracked. Don't commit unless asked.
