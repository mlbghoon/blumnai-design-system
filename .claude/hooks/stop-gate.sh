#!/usr/bin/env bash
set -uo pipefail

if [ -z "${CLAUDE_PROJECT_DIR:-}" ]; then
  exit 0
fi

TASK_FILE="$CLAUDE_PROJECT_DIR/.claude/active-task"
COUNTER_FILE="$TASK_FILE.count"
MAX_CONTINUATIONS=50

INPUT=$(cat)

# No active task → allow stop
if [ ! -f "$TASK_FILE" ]; then
  rm -f "$COUNTER_FILE"
  exit 0
fi

# Safety valve: too many continuations → allow stop
COUNT=0
if [ -f "$COUNTER_FILE" ]; then
  RAW=$(cat "$COUNTER_FILE" 2>/dev/null || echo "0")
  [[ "$RAW" =~ ^[0-9]+$ ]] && COUNT=$RAW || COUNT=0
fi

if [ "$COUNT" -ge "$MAX_CONTINUATIONS" ]; then
  rm -f "$COUNTER_FILE"
  exit 0
fi

# Read what Claude just said (for smarter decisions)
LAST_MSG=$(echo "$INPUT" | /usr/bin/python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('last_assistant_message', '')[:200])
" 2>/dev/null || echo "")

# If Claude explicitly says it's done, allow stop
if echo "$LAST_MSG" | grep -qiE "(all (tasks?|work|items?) (are )?(done|complete)|finished all|nothing (left|remaining))"; then
  rm -f "$TASK_FILE" "$COUNTER_FILE"
  exit 0
fi

# Block stop — tell Claude what to continue doing
echo $((COUNT + 1)) > "$COUNTER_FILE"

TASK_DESC=$(cat "$TASK_FILE")
ESCAPED_DESC=$(echo "$TASK_DESC" | /usr/bin/python3 -c "import json,sys; print(json.dumps(sys.stdin.read().strip())[1:-1])" 2>/dev/null || echo "$TASK_DESC")
cat <<EOF
{"decision": "block", "reason": "ACTIVE TASK — do not stop.\n\nTask: ${ESCAPED_DESC}\n\nContinuation ${COUNT}/${MAX_CONTINUATIONS}. Continue working. When ALL work is complete, delete .claude/active-task and stop."}
EOF

exit 0
