# Changelog

## Workstream: VI agent (owner request: "my own agent that acts as a VI of myself")
- 7eeb0b0 refactor(data): `src/data/profile.js` as single source of truth (from resume on file, Nov 2026)
- 8c53237 feat(vi): knowledge base, offline engine, client, 8 Jest tests
- 3e48b2e feat(vi-worker): Cloudflare Worker calling Claude (origin lock, rate limit, input caps, prompt caching, refusal fallback)
- 93a91de fix(vi): third-person answers, better topic ranking
- 241e7b5 feat(vi): G.A.B.E. chat widget, desktop and mobile verified in browser
- Verify: `CI=true npm run build` PASS, `npm test` 8/8 PASS, worker `wrangler deploy --dry-run` PASS, worker guard paths curl-tested locally

## Workstream: Content and fixes
- 9a3b4e2 feat(content): hero roles, About bio, meta + Open Graph, dynamic footer year, hero resume path
- 6c911c8 fix(contact): form opens a prefilled email instead of a fake "sent" message; resume path fixed
- docs: README rewritten
- Verify: build PASS, no em dashes in src/public/README, no console errors in browser

## Tooling
- 200603a chore: `.claude/agents`, `/overhaul` command, `CLAUDE.md`, `.overhaul/STACK.md`
