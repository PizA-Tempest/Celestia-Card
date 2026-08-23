# AGENTS.md

## Current state

- React + Vite (JavaScript) app. Product requirements live in **`Celestia Card — README.md`** (note the em-dash); it is a spec, not a description of current code.
- Currently implemented: scaffold, full 78-card deck in `src/data/tarot.json`, real Rider-Waite-Smith card artwork (public-domain scans in `public/cards/<id>.jpg`, fetched via `scripts/fetch-rws-artwork.ps1`, rendered by `TarotCard` with graceful text-only fallback), and four reading modes — **Daily Card** (choose → flip → interpret), **Three Card Reading**, **Five Card Reading** (Past/Present/Future and Situation/Challenge/Energy/Advice/Outcome spreads via a shared generic `CardSpread`/`SpreadResult`, each with per-position meanings and a combined interpretation), and **Lucky Draw** (single press-to-draw flip) — plus a searchable/filterable **Tarot Encyclopedia** (with favorites), a localStorage-backed **Reading History** (view/reopen past readings), **Share** buttons on results (Web Share API + clipboard fallback), an **English/Thai language toggle** (Thai default), a **Dark/Light theme toggle** (persisted in `localStorage` `celestia-theme`), and **multiple visual deck palettes** (Celestial/Ember/Emerald/Moonlight, persisted in `localStorage` `celestia-deck`), all with upright/reversed meanings, animated cosmos background, and the disclaimer footer.
- Not yet built (all README "Future Features"): PWA.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built output
- No lint/typecheck configured (plain JSX).

## Architecture

- `src/data/tarot.json` — 78-card deck. Each card has `id`, `name`, `number`, `arcana` (`major`/`minor`), `suit`, `element`, `keywords`, `upright`, `reversed`, `general`. Add fields (love/career/finance/advice/symbolism) here for the encyclopedia feature.
- `src/data/tarot-th.json` — Thai card names/keywords keyed by card `id`. UI switches via the header toggle; **Thai is the default language** (stored in `localStorage` `celestia-lang`). Card meanings (upright/reversed/general) are English-only.
- `src/i18n.jsx` — `LangContext`/`useLang` (`lang`, `setLang`, `t`) and `localizeCard(card, lang)`.
- `src/translations.js` — UI strings for `en`/`th` (flat dot-key map, e.g. `mode.daily.name`).
- `src/utils/reading.js` — `drawCards`, `randomOrientation`, `suitGlyph`, `suitLabel`, `arcanaLabel`, `combineReading` (takes a `lang` param), `POSITION_3`/`POSITION_5`. Deck import and reading logic live here.
- `src/utils/decks.js` — `DECKS`/`DECK_STYLES` (visual card palettes applied as CSS custom props on the app root, persisted in `localStorage` `celestia-deck`), `loadDeck`/`storeDeck`.
- `src/utils/history.js` — localStorage-backed history (`loadHistory`, `addHistoryEntry`, `clearHistory`, `MODE_LABELS`).
- `src/utils/favorites.js` — localStorage-backed favorites (`loadFavorites`, `toggleFavorite`).
- `src/utils/share.js` — `buildShareText`/`shareText` (Web Share API with clipboard fallback).
- `src/components/` — `TarotCard` (card face presentation), `CardReveal` (3D flip), `CardDeck` (face-down selection grid), `ReadingResult` (interpretation), `CardSpread` (generic multi-slot spread picker), `SpreadResult` (per-position + combined reading), `LuckyDraw` (single press-to-draw flip), `Encyclopedia` (search/filter grid + card detail view, favorite toggle + Favorites filter), `HistoryView` (localStorage history list + re-open past readings).
- `src/App.jsx` — phase state machine (`intro` → `choose` → `result`). Add new reading modes by extending these phases.
- All styling is in `src/index.css` (no Tailwind). Dark celestial theme by default with a light variant switched via `html[data-theme='light']` (set by the header toggle, persisted in `localStorage` `celestia-theme`). Colors are CSS custom properties on `:root` — keep theme surfaces using variables (`--panel`, `--face-bg-*`, `--input-bg`, etc.), not hardcoded colors.

## Gotchas

- On Windows, `npm.ps1` is blocked by execution policy — use `npm.cmd`.
- `git` has no commits yet; README and app files are untracked. Don't commit unless asked.
