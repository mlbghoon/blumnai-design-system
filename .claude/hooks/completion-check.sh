#!/usr/bin/env bash
# Stop hook: remind to run typecheck/lint when component work is done
# Defers to stop-gate.sh when active-task exists (mutual exclusion)
set -uo pipefail
INPUT=$(cat)

# Defer to stop-gate.sh when active-task exists
TASK_FILE="${CLAUDE_PROJECT_DIR:-.}/.claude/active-task"
if [ -f "$TASK_FILE" ]; then
  exit 0
fi

SESSION_ID=$(echo "$INPUT" | /usr/bin/python3 -c "import sys,json; print(json.load(sys.stdin).get('session_id','unknown'))" 2>/dev/null)
VERIFY_FLAG="/tmp/.verify-reminded-${SESSION_ID}"

# Already reminded this session
if [ -f "$VERIFY_FLAG" ]; then
  exit 0
fi

LAST_MSG=$(echo "$INPUT" | /usr/bin/python3 -c "import sys,json; print(json.load(sys.stdin).get('last_assistant_message','')[:500])" 2>/dev/null || echo "")

# If agent completed component work without running verification
if echo "$LAST_MSG" | grep -qiE "(component.*(done|complete|finish)|구현.*(완료|끝)|implementation.*(done|complete))"; then
  if ! echo "$LAST_MSG" | grep -qiE "(typecheck|lint|npm run|verification|checklist)"; then
    touch "$VERIFY_FLAG"
    cat <<'EOF'
{"decision": "block", "reason": "Before completing: 1) Invoke the ux-guidelines skill and verify the component follows UX guidelines (spacing, elevation, interaction, color, radius, typography). Report any violations to the user. 2) Run 'npm run typecheck && npm run lint' to verify. 3) Consider invoking the component-checklist skill for full verification."}
EOF
    exit 0
  fi
fi
exit 0
