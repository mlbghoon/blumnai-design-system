# CodeRabbit Review Skill

This skill is designed for the **coderabbit-reviewer** agent. The agent does NOT modify code — it handles infrastructure (push, PR, polling) and reports findings back to the caller.

When used by the main agent directly, follow the same report-only pattern — do NOT apply fixes inline.

---

## Overview

This skill pushes the current branch to the remote, creates a PR, waits for CodeRabbit to review, collects actionable findings, and reports them. When there are 0 actionable comments, it merges and syncs locally.

The agent detects the project from CWD and sets environment variables in its Phase 0 (project detection): `$GH_REPO` (e.g. `BlumnAI-Studio/blumnai-design-system`), `$PR_REMOTE` (e.g. `origin`), `$BASE_BRANCH` (e.g. `main`), `$QUALITY_CMD` (e.g. `npm run typecheck && npm run lint`). All commands below use these variables.

---

## Phase 1 — Pre-flight

### 1.1 Dirty working tree
```bash
git status --porcelain
```
If there are uncommitted changes, report back and stop. Do NOT proceed with a dirty tree.

### 1.2 Remote setup
Verify `origin` exists: `git remote get-url origin 2>/dev/null`.

### 1.3 Branch check
```bash
git rev-parse --abbrev-ref HEAD
```
If on the base branch, create a new branch:
```bash
git checkout -b feat/YYYY-MM-DD-description
```
Use the date and a short description derived from recent commit subjects.

### 1.4 Fetch base
```bash
git fetch $PR_REMOTE $BASE_BRANCH
```

### 1.5 Quality verification
```bash
$QUALITY_CMD
```
Should already be clean from the quality gate, but verify. Report errors and stop if it fails.

---

## Phase 2 — Push + PR

### 2.1 Push to remote
```bash
git push $PR_REMOTE HEAD
```

### 2.2 Check for existing PR
```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
gh pr list --repo $GH_REPO --head "$BRANCH" --json number,url --jq '.[0]'
```

### 2.3 Create or reuse PR
If no existing PR:
```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
PR_TITLE=$(git log -1 --pretty=%s 2>/dev/null || echo "feat: ${BRANCH}")
gh pr create --repo $GH_REPO --base $BASE_BRANCH --head "$BRANCH" --title "$PR_TITLE" --body "$(cat <<'EOF'
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

Report the PR URL.

---

## Phase 3 — Poll + Report

### 3.1 Poll for review
Poll every 30 seconds for up to 30 minutes for CodeRabbit's review (exit early once review appears):
```bash
for i in $(seq 1 60); do
  REVIEW=$(gh api repos/$GH_REPO/pulls/$PR_NUMBER/reviews \
    --jq '[.[] | select(.user.login=="coderabbitai[bot]")] | last' 2>/dev/null)
  [ -n "$REVIEW" ] && [ "$REVIEW" != "null" ] && break
  sleep 30
done

if [ -z "$REVIEW" ] || [ "$REVIEW" = "null" ]; then
  echo "Timeout: CodeRabbit review not received within 30 minutes."
  exit 1
fi
```

Also check issue comments (CodeRabbit sometimes posts the full review as a comment):
```bash
gh api repos/$GH_REPO/issues/$PR_NUMBER/comments \
  --jq '[.[] | select(.user.login=="coderabbitai[bot]")] | last | .body' 2>/dev/null
```

### 3.2 Parse actionable comments
From the review body, look for the pattern: `Actionable comments posted: N`

- If `N = 0` → PASS. Report to caller, proceed to Phase 4.
- If `N > 0` → collect comments and report to caller.

### 3.3 Collect review comments
Get inline comments:
```bash
gh api repos/$GH_REPO/pulls/$PR_NUMBER/comments \
  --jq '[.[] | select(.user.login=="coderabbitai[bot]")] | .[] | {path: .path, line: .line, body: .body}'
```

Also parse the review body for:
- `Outside diff range` sections
- `Prompt for AI Agents` blocks (these are HIGH PRIORITY)
- `제안 수정` (suggested fixes) diffs

### 3.4 Report findings

Report in this exact structure:

```markdown
## CodeRabbit Review Results
- Project: {ds|ht}
- PR: {url}
- Actionable comments: {count}

### Comment 1
- File: {path}:{line}
- Issue: {summary}
- Suggestion: {CodeRabbit's suggestion}
- AI Agent Prompt: {if present}

### Comment 2
...
```

**Do NOT modify any code files. Report and stop.**

### 3.5 Stop conditions
Stop and report if ANY of these occur:
- **Clean review**: 0 actionable comments → proceed to Phase 4
- **Timeout**: 30 minutes of polling with no review appearing
- **Conflict**: Merge conflict detected
- **CI failure**: CI checks are failing
- **Ambiguous feedback**: CodeRabbit comment is unclear and requires human judgment

---

## Phase 4 — Merge + Sync (only when 0 actionable comments)

### 4.1 Merge the PR
```bash
gh pr merge $PR_NUMBER --repo $GH_REPO --squash --delete-branch
```

### 4.2 Sync base branch locally
```bash
git fetch $PR_REMOTE $BASE_BRANCH
git checkout $BASE_BRANCH
git merge $PR_REMOTE/$BASE_BRANCH --ff-only
```
If `--ff-only` fails (local base has diverged):
```bash
git branch backup-$(date +%s) $BASE_BRANCH 2>/dev/null || true
git reset --hard $PR_REMOTE/$BASE_BRANCH
```

### 4.3 Report final status
Report:
- PR URL
- Number of CodeRabbit rounds
- Whether all actionable items were resolved

---

## Re-review Mode

When re-spawned after the main agent has applied fixes:

1. Capture the latest review ID **before** requesting re-review:
   ```bash
   OLD_REVIEW_ID=$(gh api repos/$GH_REPO/pulls/$PR_NUMBER/reviews \
     --jq '[.[] | select(.user.login=="coderabbitai[bot]")] | last | .id' 2>/dev/null)
   OLD_REVIEW_ID=${OLD_REVIEW_ID:-0}
   ```
2. Push latest changes:
   ```bash
   git push $PR_REMOTE HEAD
   ```
3. Post re-review request:
   ```bash
   gh api repos/$GH_REPO/issues/$PR_NUMBER/comments \
     -f body="@coderabbitai review"
   ```
4. Poll for a **new** review by comparing IDs (NOT timestamps — macOS `date` can't parse ISO 8601):
   ```bash
   for i in $(seq 1 60); do
     NEW_REVIEW_ID=$(gh api repos/$GH_REPO/pulls/$PR_NUMBER/reviews \
       --jq '[.[] | select(.user.login=="coderabbitai[bot]")] | last | .id' 2>/dev/null)
     [ -n "$NEW_REVIEW_ID" ] && [ "$NEW_REVIEW_ID" != "null" ] && \
       [ "$NEW_REVIEW_ID" != "$OLD_REVIEW_ID" ] && break
     sleep 30
   done

   if [ -z "$NEW_REVIEW_ID" ] || [ "$NEW_REVIEW_ID" = "null" ] || [ "$NEW_REVIEW_ID" = "$OLD_REVIEW_ID" ]; then
     echo "Timeout: no new CodeRabbit review within 30 minutes."
     exit 1
   fi
   ```
5. Parse and report (same as Phase 3.2 onward), then report findings or proceed to merge

---

## Important Notes

- **No code modification**: This skill/agent does NOT modify code files. It reports findings for the main agent to fix.
- **Publishing**: This skill does NOT publish to npm. That is a separate step the user handles.
- **Tokens (DS)**: `origin` uses `${GITHUB_TOKEN_BLUMNAI}` (BlumnAI-Studio).
- **Tokens (HT)**: `origin` uses `${GITHUB_TOKEN}` (mbisolution).
- **Never force push**: Always use regular `git push`, never `--force`.
- **File staging (main agent)**: The main agent should stage specific files with `git add <file>`. This skill does not stage or modify files.
