# Stack

- Framework: React 19 via Create React App, run through CRACO 7 (`craco start/build/test`)
- Routing: react-router-dom 7, basename `/Portfolio-2025`, `public/404.html` SPA redirect for GitHub Pages
- Animation: framer-motion 12; icons: react-icons 5; documents: docx-preview, iframe PDF viewer
- Scripts: `npm start`, `npm run build`, `npm test`, `npm run deploy` (gh-pages)
- Lint: CRA built-in ESLint (`react-app` config), runs during build (`CI=true` treats warnings as errors)
- Typecheck: none (plain JS)
- Deploy target: GitHub Pages at https://gcolon75.github.io/Portfolio-2025
- New: `vi-worker/` Cloudflare Worker that answers VI chats with the Claude API.
  `scripts/build-prompt.mjs` prebuilds the system prompt from `src/data` (wrangler `[build]` hook).

## Baseline (pre-overhaul, tag `pre-overhaul` = 4601911, current origin/main)
- Overhaul branch was first cut from a stale local main (4946660) and rebased onto 4601911 on 2026-11-08.
