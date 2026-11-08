# Portfolio Overhaul: Ground Rules

Owner: Gabriel Colon (Ghawk75). This repo was originally built with an older Claude model.
Goal: fix, modernize, and restructure. Not a rewrite for its own sake.

## Hard rules
- Work ONLY on branch `overhaul/main`. Never commit to `main`. Never force-push.
- Tag `pre-overhaul` must exist before any change. If missing, stop and say so.
- One logical change per commit. Conventional commits (`fix:`, `refactor:`, `chore:`, `docs:`, `feat:`).
- Do not delete a project, page, or repo content without listing it in PLAN.md and getting approval.
- Never touch secrets, `.env*`, deploy keys, or CI secrets. Flag them if committed.
- No em dashes in any copy, README, or comment. Use commas, colons, or periods.
- Build, lint, and typecheck must pass before a workstream is marked done.

## Voice for public copy
Direct, confident, specific. Lead with outcomes and numbers. No buzzword soup.
Positioning: AI automation, AI enablement, data migration, full-stack builder.

## Artifacts (all in `.overhaul/`)
- `AUDIT-*.md`  findings from auditors
- `PLAN.md`     prioritized plan, approved by owner before execution
- `CHANGELOG.md` what changed, per workstream
- `HANDOFF.md`  final summary, manual steps, rollback
