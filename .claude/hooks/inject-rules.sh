#!/usr/bin/env bash
set -uo pipefail

TASK_FILE="$CLAUDE_PROJECT_DIR/.claude/active-task"

# Inject autonomy rules
cat <<'RULES'
MANDATORY BEHAVIORAL RULES — ALWAYS FOLLOW:
- NEVER stop, pause, or ask for confirmation between steps, batches, or phases.
- When told to "continue", complete ALL remaining work without pausing.
- Make decisions autonomously. Do not present options and ask the user to pick.
- Output brief status updates every few tool calls. Do not go silent for long stretches.
- When a task marker exists at .claude/active-task, you MUST keep working until the task described in that file is complete, then delete the file.
RULES

# Warn about stale task marker
if [ -f "$TASK_FILE" ]; then
  if [ "$(uname)" = "Darwin" ]; then
    AGE_SEC=$(( $(date +%s) - $(stat -f %m "$TASK_FILE") ))
  else
    AGE_SEC=$(( $(date +%s) - $(stat -c %Y "$TASK_FILE") ))
  fi

  if [ "$AGE_SEC" -gt 21600 ]; then
    echo ""
    echo "STALE TASK MARKER DETECTED (.claude/active-task is $(( AGE_SEC / 3600 )) hours old)."
    echo "This may be from a previous crashed session. Contents:"
    cat "$TASK_FILE"
    echo ""
    echo "If this task is no longer relevant, delete .claude/active-task to clear it."
  else
    echo ""
    echo "Active task marker found. Current task:"
    cat "$TASK_FILE"
  fi
fi
