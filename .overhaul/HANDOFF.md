# Handoff

Branch `overhaul/main`, based on tag `pre-overhaul` (4946660). Not pushed, not merged.
Details per commit in `CHANGELOG.md`.

## What changed
- New VI, **G.A.B.E.**, on every page. Answers from `src/data/` only. Works offline today;
  switches to Claude once the worker is deployed.
- Site repositioned around AI automation, AI enablement, data migration, full-stack.
- Contact form no longer fakes a successful send. Resume links fixed for the GitHub Pages base path.

## Manual steps for Gabriel
1. **Add your resume:** put it at `public/resume.pdf`. Both "Download Resume" buttons 404 until then.
2. **Turn on Claude mode** (optional, costs API usage):
   - `cd vi-worker && npm install && npx wrangler login`
   - `npx wrangler secret put ANTHROPIC_API_KEY`
   - `npx wrangler deploy`, note the workers.dev URL
   - `REACT_APP_VI_ENDPOINT=<that URL> npm run deploy` from the repo root
   - Default model is `claude-opus-5-5` at `low` effort. For a cheaper bot, set `MODEL = "claude-haiku-5-5"` in `vi-worker/wrangler.toml`.
3. **Review facts in `src/data/profile.js`.** Pulled from your resume on file. Check the PCI Pharma and
   Joint Theatrical Ventures summaries, and the old project list in `projects.js` (several entries are vague).
4. Pin the repo and set its homepage on GitHub once merged.

## Not done (needs the full /overhaul audit and your approval)
- Repo, content, site, and GitHub profile audits (`/overhaul` in Claude Code runs them).
- Rewriting project descriptions and the "RPG Stats" percentages, which have no source.
- `npm audit` / dependency upgrades.
- Live Claude call is untested: no API key was available during the build.

## Verify
```bash
npm ci && CI=true npm run build && CI=true npm test -- --watchAll=false
cd vi-worker && npm ci && npx wrangler deploy --dry-run --outdir dist
```

## Rollback
- Before merge: `git checkout main && git branch -D overhaul/main`
- After merge: `git revert -m 1 <merge-commit>`, or locally `git reset --hard pre-overhaul`
