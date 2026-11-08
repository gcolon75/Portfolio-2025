# Stack

- Framework: React 19 via Create React App (`react-scripts` 5)
- Routing: react-router-dom 7, basename `/Portfolio-2025`
- Animation: framer-motion 12; icons: react-icons 5; PDF: react-pdf / pdfjs-dist
- Scripts: `npm start`, `npm run build`, `npm test`, `npm run deploy` (gh-pages)
- Lint: CRA built-in ESLint (`react-app` config), runs during build (CI=true treats warnings as errors)
- Typecheck: none (plain JS)
- Deploy target: GitHub Pages at https://gcolon75.github.io/Portfolio-2025
- New: `vi-worker/` Cloudflare Worker that proxies the VI chat to the Claude API

## Baseline (pre-overhaul, 4946660)
- `CI=true npm run build`: PASS, main.js 123.79 kB gzip
