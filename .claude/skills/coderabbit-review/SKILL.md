# CodeRabbit Review Skill

Auto-invoke: before reporting all implementation work is done to the user. Do NOT wait for user request. When you see `[CODERABBIT REVIEW AUTO-TRIGGER]` in your context, invoke this skill immediately.

---

## Overview

This skill pushes the current branch to the company remote, creates a PR on `mbisolution/blumnai-design-system`, waits for CodeRabbit to review, fixes any actionable findings, and merges when clean. It ensures both remotes (`origin` = mlbghoon, `company` = mbisolution) stay in sync.

---

## Phase 1 — Pre-flight

### 1.1 Dirty working tree
```bash
git status --porcelain
```
If there are uncommitted changes, ask the user whether to commit them before proceeding. Do NOT proceed with a dirty tree.

### 1.2 Company remote
Check if the `company` remote exists:
```bash
git remote get-url company 2>/dev/null
```
If missing, add it:
```bash
source ~/.zshrc 2>/dev/null; git remote add company "https://${GITHUB_TOKEN}@github.com/mbisolution/blumnai-design-system.git"
```

### 1.3 Branch check
```bash
git rev-parse --abbrev-ref HEAD
```
If on `main`, create a new branch:
```bash
git checkout -b feat/YYYY-MM-DD-description
```
Use the date and a short description derived from recent commit subjects.

### 1.4 Fetch company/main
```bash
git fetch company main
```

### 1.5 Quality verification
```bash
npm run typecheck 2>&1 && npm run lint 2>&1
```
Should already be clean from the quality gate, but verify. Fix any issues before proceeding.

---

## Phase 2 — Push + PR

### 2.1 Push to both remotes
```bash
git push company HEAD
git push origin HEAD
```

### 2.2 Check for existing PR
```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
gh pr list --repo mbisolution/blumnai-design-system --head "$BRANCH" --json number,url --jq '.[0]'
```

### 2.3 Create or reuse PR
If no existing PR:
```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
gh pr create --repo mbisolution/blumnai-design-system --base main --head "$BRANCH" --title "PR_TITLE" --body "$(cat <<'EOF'
## Summary
- Brief description of changes

## Test plan
- [ ] typecheck passes
- [ ] lint passes

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Extract the PR number for subsequent phases.

Report the PR URL to the user.

---

## Phase 3 — CodeRabbit Review Loop (max 3 rounds)

### 3.1 Initial wait
Poll every 60 seconds for up to 5 minutes for CodeRabbit's initial review (exit early once review appears):
```bash
for i in $(seq 1 5); do
  REVIEW=$(gh api repos/mbisolution/blumnai-design-system/pulls/PR_NUMBER/reviews \
    --jq '[.[] | select(.user.login=="coderabbitai[bot]")] | last' 2>/dev/null)
  [ -n "$REVIEW" ] && [ "$REVIEW" != "null" ] && break
  sleep 60
done
```

### 3.2 Poll for review
If not found in 3.1, continue polling every 60 seconds (max 5 more polls):
```bash
gh api repos/mbisolution/blumnai-design-system/pulls/PR_NUMBER/reviews \
  --jq '[.[] | select(.user.login=="coderabbitai[bot]")] | last'
```

### 3.3 Parse actionable comments
From the review body, look for the pattern: `Actionable comments posted: N`

- If `N = 0` → PASS. Skip to Phase 4.
- If `N > 0` → collect comments and fix them.

### 3.4 Collect review comments
Get inline comments:
```bash
gh api repos/mbisolution/blumnai-design-system/pulls/PR_NUMBER/comments \
  --jq '[.[] | select(.user.login=="coderabbitai[bot]")] | .[] | {path: .path, line: .line, body: .body}'
```

Also parse the review body for:
- `Outside diff range` sections
- `Prompt for AI Agents` blocks (these are HIGH PRIORITY — follow them exactly)
- `제안 수정` (suggested fixes) diffs

### 3.5 Apply fixes
For each actionable comment:
1. Read the `Prompt for AI Agents` block if present — follow it as the primary instruction
2. Otherwise, apply the `제안 수정` diff if provided
3. Otherwise, implement the fix based on the comment description

### 3.6 Verify fixes
```bash
npm run typecheck 2>&1 && npm run lint 2>&1
```

### 3.7 Commit and push
Stage only the files you modified (never use `git add -A` which could stage secrets or unintended files):
```bash
git add <specific-files-you-changed>
git commit -m "$(cat <<'EOF'
fix: apply CodeRabbit round-N findings

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
git push company HEAD
git push origin HEAD
```

### 3.8 Request re-review
```bash
gh api repos/mbisolution/blumnai-design-system/issues/PR_NUMBER/comments \
  -f body="@coderabbitai review"
```

### 3.9 Wait for re-review
Poll every 60 seconds for up to 5 minutes (same early-exit pattern as 3.1), then poll as in 3.2 if needed.

### 3.10 Stop conditions
Stop the review loop if ANY of these occur:
- **Clean review**: 0 actionable comments → proceed to Phase 4
- **Max rounds reached**: 3 rounds completed (extend to 4 only if critical/breaking issues remain)
- **Conflict**: Merge conflict detected
- **CI failure**: CI checks are failing
- **Ambiguous feedback**: CodeRabbit comment is unclear and requires human judgment
- **Regression**: Fix introduces new issues

Report the reason for stopping to the user.

---

## Phase 4 — Merge + Dual Sync

### 4.1 Merge the PR
```bash
gh pr merge PR_NUMBER --repo mbisolution/blumnai-design-system --squash --delete-branch
```

### 4.2 Clean up stale branch on origin
The `--delete-branch` only removes the branch on `company`. Delete it on `origin` too:
```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
git push origin --delete "$BRANCH" 2>/dev/null || true
```

### 4.3 Sync main locally
```bash
git fetch company main
git checkout main
git merge company/main --ff-only
```
If `--ff-only` fails (local main has diverged), reset to company/main:
```bash
git reset --hard company/main
```

### 4.4 Push to origin
```bash
git push origin main
```

### 4.5 Report final status
Report to the user:
- PR URL
- Number of CodeRabbit rounds
- Whether all actionable items were resolved
- Both remotes are synced

---

## Important Notes

- **Publishing**: This skill does NOT publish to npm. That is a separate step the user handles.
- **Token**: The `company` remote uses `${GITHUB_TOKEN}` (mbisolution account). The `origin` remote uses `${GITHUB_TOKEN_MLBGHOON}`.
- **Never force push**: Always use regular `git push`, never `--force`.
- **Commit signing**: Follow the repository's existing commit conventions.
- **File staging**: Always stage specific files with `git add <file>`. Never use `git add -A` or `git add .`.
