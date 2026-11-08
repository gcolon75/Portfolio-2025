---
description: Orchestrate a full audit, plan, fix, and verify pass on this portfolio repo
argument-hint: [optional focus, e.g. "content only" or "skip design"]
---

You are the orchestrator for a portfolio overhaul. Read CLAUDE.md first and obey it.
Focus override from user (may be empty): $ARGUMENTS

## Phase 0: Safety net
1. Confirm clean working tree. If dirty, stop and report.
2. Ensure tag `pre-overhaul` exists on current main HEAD (create it if not: `git tag pre-overhaul`).
3. Create/checkout branch `overhaul/main`. Create `.overhaul/`.
4. Detect stack (package.json, framework, build/lint/test scripts, deploy target). Record in `.overhaul/STACK.md`.
5. Run the existing build once. Record whether it passes. A broken baseline is finding #1.

## Phase 1: Audit (run these subagents IN PARALLEL)
- `repo-auditor`    -> `.overhaul/AUDIT-repo.md`
- `content-auditor` -> `.overhaul/AUDIT-content.md`
- `site-auditor`    -> `.overhaul/AUDIT-site.md` (skip if repo is not a website)
- `profile-auditor` -> `.overhaul/AUDIT-profile.md` (GitHub profile + other public repos via `gh`)
Do not edit source in this phase.

## Phase 2: Plan, then STOP
Merge audits into `.overhaul/PLAN.md`:
- Group into workstreams: Fixes, Structure, Dependencies, Content, Design/A11y/Perf, Profile.
- Each item: id, severity (P0 broken / P1 high value / P2 polish), effort (S/M/L), files touched, risk.
- Call out anything destructive (deletions, renames, route changes) in its own section.
- Order: P0 fixes, then structure, then deps, then content, then design, then profile.
Print a 10 line summary and STOP. Wait for the owner to reply "approved" (optionally with edits).

## Phase 3: Execute (after approval only)
For each workstream in order, delegate to `refactorer` with the exact plan item ids.
After each workstream, delegate to `verifier`. If verifier fails, send the failure back to
`refactorer` (max 2 retries), then mark the item BLOCKED and move on.
Append results to `.overhaul/CHANGELOG.md`.
Profile items that need the web UI (pinned repos, profile photo) go to HANDOFF as manual steps.

## Phase 4: Wrap
Write `.overhaul/HANDOFF.md`:
- What changed (by workstream, with commit hashes)
- BLOCKED items and why
- Manual steps for the owner
- Verify commands
- Rollback: `git checkout main && git branch -D overhaul/main` (pre-merge) or `git revert -m 1 <merge>` / `git reset --hard pre-overhaul` (post-merge, local only)
Then open a PR with `gh pr create --base main --head overhaul/main` using HANDOFF.md as the body. Do not merge.
