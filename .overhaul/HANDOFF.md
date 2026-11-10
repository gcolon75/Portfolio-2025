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
5. **Redeploy the VI worker** (`npx wrangler deploy` in `vi-worker`). Project data changed on 2026-11-09
   (Job Search Automation added, copy edits), so Claude mode will not know about it until you do.
6. **Add Job Search Automation results if you can share them** (roles surfaced, applications sent, interviews).
   Edit `result` for `job-search-automation` in `src/data/projects.js`; the `[NEED]` comment above it lists what is missing.
7. **Keep the real job tracker artifact private.** The project page links a separate demo on sample data.

## Not done (needs the full /overhaul audit and your approval)
- Repo, content, site, and GitHub profile audits (`/overhaul` in Claude Code runs them).
- Em dashes are gone from all site copy. Some older project copy still leans on buzzwords.
- Projects from the owner's list with no page yet: ACE, Valine, Fate, Tape and Wire. Each needs a one-liner and visuals from Gabriel.
- TritonGo+ and Amadeus have one image each; no other source images exist in the repo.
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
