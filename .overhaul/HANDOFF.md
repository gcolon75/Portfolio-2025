# Handoff

Branch `overhaul/main`, rebased onto `main` at 4601911 (tag `pre-overhaul`, local only). Merged to `main` as PR #22 (f8d5f73) and deployed.
Details per commit in `CHANGELOG.md`.

## What changed
- New VI, **G.A.B.E.**, on every page. Answers only from `src/data/`. Claude mode is live through the
  `gabriel-vi` Cloudflare Worker (https://gabriel-vi.gabriel-vi-worker.workers.dev); falls back to offline answers if it is down.
- Site repositioned around AI automation, AI enablement, data migration, full-stack.
- New PCI QA Data Migration Automation project page; stats and skill tree retuned to current focus.
- Contact form opens a prefilled email until a Formspree endpoint is configured.

## Manual steps for Gabriel
1. **Claude mode is on.** Worker `gabriel-vi`, key stored as the `ANTHROPIC_API_KEY` Cloudflare secret.
   - Watch API spend at console.anthropic.com. Default model is `claude-opus-5-5` at `low` effort; for a cheaper bot set `MODEL = "claude-haiku-5-5"` in `vi-worker/wrangler.toml` and redeploy.
   - After any change to `src/data`, run `npx wrangler deploy` in `vi-worker` so the prompt picks it up.
   - To rotate the key: `npx wrangler secret put ANTHROPIC_API_KEY` in `vi-worker`.
   - To turn Claude mode off: build with `REACT_APP_VI_ENDPOINT=off`, or `npx wrangler delete` the worker (the site falls back to offline).
2. **Review facts in `src/data/profile.js`.** Pulled from your resume on file. Check the PCI Pharma and
   Joint Theatrical Ventures summaries.
3. **Add PCI metrics if you can share them** (records reconciled, time saved, mismatches caught). Edit the `result` and `impact` fields of `pci-qa-automation` in `src/data/projects.js`. Check skill levels in `src/data/skills.js` too.
4. **Optional:** set a real Formspree endpoint in `src/components/Contact.jsx` so the form sends directly.

## Not done (needs the full /overhaul audit and your approval)
- Repo, content, site, and GitHub profile audits (`/overhaul` in Claude Code runs them).
- Some existing project and writing copy still has em dashes and buzzwords (the VI strips em dashes from what it says).
- `npm audit` and dependency upgrades.
- A live Claude call has not been tested: no API key was available.

## Verify
```bash
npm ci && CI=true npm run build && CI=true npm test -- --watchAll=false
cd vi-worker && npm ci && npx wrangler deploy --dry-run --outdir dist
```

## Rollback
- Before merge: `git checkout main && git branch -D overhaul/main`
- After merge: `git revert -m 1 <merge-commit>`, or locally `git reset --hard pre-overhaul`
