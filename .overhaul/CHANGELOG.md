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
