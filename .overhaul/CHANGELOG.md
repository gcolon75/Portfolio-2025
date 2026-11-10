# Changelog

All commits are on `overhaul/main`, rebased onto `main` at 4601911.

## Workstream: VI agent (owner request: "my own agent that acts as a VI of myself")
- 8bb6b4a refactor(data): `src/data/profile.js` as single source of truth (from resume on file, Nov 2026)
- c75452d feat(vi): knowledge base, offline engine, client, tests
- 42c05f8 feat(vi-worker): Cloudflare Worker calling Claude (origin lock, rate limit, input caps, prompt caching, refusal fallback)
- 3366a0d fix(vi): third-person answers, better topic ranking
- 4a7a98d feat(vi): G.A.B.E. chat widget on every page
- 1e235f1 feat(vi): answers use project role, problem, and result; em dashes stripped from VI output
- 049cf12 fix(vi-worker): prebuild system prompt so image and PDF imports in `writing.js` do not break the Worker bundle
- Verify: `CI=true npm run build` PASS, `npm test` 11/11 PASS, `wrangler deploy --dry-run` PASS,
  worker guard paths tested locally, desktop and mobile layouts and project detail pages checked in browser

## Workstream: Content and fixes
- 9acd908 feat(content): hero roles, About bio from `profile.js`, meta and Open Graph tags (kept the GitHub Pages
  SPA redirect script), dynamic footer year
- bb37c70 fix(contact): kept main's reworked Contact page; the form now falls back to a prefilled email while the
  Formspree endpoint is still the `XXXX` placeholder, instead of showing an error on every submit
- ba2954f docs: kept main's README and added the VI, Claude mode, and structure sections
- `profile.js` now uses main's education line (HCI) and full LinkedIn URL

## Tooling
- 6bb1370 chore: `.claude/agents`, `/overhaul` command, `CLAUDE.md`, `.overhaul/STACK.md`

## Workstream: PCI page and current-focus retune (owner request, 2026-11-08)
- cefb234 feat(projects): PCI QA Data Migration Automation page at `/projects/pci-qa-automation`.
  Owner choices: name PCI, keep generic; cover reconciliation, bulk rename/migration, findings reports, tracker cleanup.
  No metrics supplied, so none shown. Cover is a generic SVG diagram.
- dc3edd6 feat(content): About stats now AI Automation 90, Data Migration & QA 90, Full-Stack 85, PM 85, UX 80 (self-rated, owner approved).
  Skill tree: new Data Migration & QA class, AI Builder adds AI Agents, LLM APIs, Spec-Driven; Frontend becomes Full-Stack.
- 4c44c89 feat(vi): VI describes the PCI tooling; fixed doubled periods in project answers
- Verify: build PASS, tests 13/13 PASS, PCI page, project order, stats, skill tree, and VI answer checked in browser

## Workstream: Claude mode (owner request, 2026-11-08)
- Worker `gabriel-vi` deployed to https://gabriel-vi.gabriel-vi-worker.workers.dev; owner set `ANTHROPIC_API_KEY` as a Cloudflare secret
- feat(vi): `viClient.js` defaults to the live worker; `REACT_APP_VI_ENDPOINT` overrides it, `off` forces local mode
- Verify: worker returns a grounded Claude answer (HTTP 200), build PASS, tests 13/13 PASS, site redeployed

## Workstream: Performance (owner request, 2026-11-09: "running fairly slow")
- db672a8 fix(perf): hero stars generated once and twinkled in CSS; typewriter isolated in its own component;
  leaked pause timeout fixed. DOM changes on the home page dropped from about 11,600 to 12 per 3 seconds.
- ce5dc3a fix(perf): header scroll tracking measures at most once per frame from a passive listener
- efcfc7d fix(perf): card backdrop blur removed (cards are 80% opaque), Contact glow no longer floats, card orbits
  spin on hover only, OS reduce-motion setting honored
- 13948f3 perf: 13 detail pages lazy-loaded as separate chunks; framer-motion follows reduce-motion
- 403c20a perf: seven multi-MB images served as resized WebP (about 17 MB to under 1 MB). Originals kept.
- Lighthouse, old vs new build on the same local server: mobile 19 to 50, desktop 55 to 90,
  layout shift 9.5 to 0.03 (mobile) and 2.2 to 0.002 (desktop), page weight 10.5 MB to 1.2 MB (desktop)
- Verify: `npm test` 15/15 PASS, eslint PASS, `craco build` PASS, home page, cards, and a lazy detail route checked in browser

## Workstream: Card images (owner request, 2026-11-09: "do all projects have card images")
- 0c3efc2 fix: all 9 projects now set cardImage. 8 new hand-cropped 224px square WebP thumbnails (4 to 17 KB)
  replace first-screenshot fallbacks that cropped out logos. Cards render as 56px squares, so the 16:10
  card standard from the overhaul kit does not apply to this layout. Detail hero prefers full-size images over cardImage.
- Still open: Job Search Automation, ACE, Valine, Fate, and Tape and Wire have no project entries yet, so no cards.
  Most projects have 1 detail image (target 2 to 4); Joint has 9 screenshots on disk but shows 1.
- Verify: `npm test` 15/15 PASS, eslint PASS, `craco build` PASS, all 9 card images load in browser, Axle detail hero unchanged
- 340db65 feat: Joint detail page shows 4 screenshots (landing, features, feed, Create Post) as WebP, 17 to 40 KB.
  Excluded for privacy: Search and Notifications (other users' names and photos), sign-in screen (email address).
- 1a0e005 perf: 9 remaining gallery JPGs (Axle, GoaLee, 3 Kingdoms, TritonGo+, Volleyball) served as WebP, 624 KB to 355 KB
- ea31149 feat: Volleyball and Tower of Greed galleries go from 1 image to 4, rendered from PDFs already in the repo.
  Skipped Volleyball profile and chat screens (a person's photo).
- Image count per detail page now: Tower 4, Joint 4, Axle 4, Volleyball 4, GoaLee 3, 3 Kingdoms 2,
  TritonGo+ 1, Amadeus 1, PCI 1 (generic diagram by design). TritonGo+ and Amadeus have no other source images in the repo.
- Verify: `npm test` 15/15 PASS, eslint PASS, `craco build` PASS, every image on 6 detail pages returns 200 as WebP

## Workstream: Job Search Automation project (owner request, 2026-11-09)
- 64a950f feat: new project page at /projects/job-search-automation, card shown second after Joint.
  Pipeline and adoption diagrams (SVG), tracker screenshot on sample data, square card icon.
  Friends listed by background only. Copy states Claude wrote the code; Gabriel owned workflow, guardrails, rollout.
- e48aa22 fix(vi): project Problem and Result sentences now end with a period in VI answers
- Still open: [NEED] results to publish (roles surfaced, applications, interviews) and the public repo URL
- Verify: `npm test` 15/15 PASS, eslint PASS, `craco build` PASS, page and card checked in browser, no console errors
