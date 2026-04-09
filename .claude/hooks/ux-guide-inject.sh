#!/usr/bin/env bash
# PreToolUse hook: UX guidelines enforcement on component edits
# Reads from hook-checklist.txt — update that file when guidelines change
# Fires ONCE per session (matches CLAUDE.md documentation). Stale flags in /tmp
# are cleaned up by inject-rules.sh on SessionStart (older than 24h).
INPUT=$(cat)

FILE=$(echo "$INPUT" | /usr/bin/python3 -c "
import sys,json
print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))
" 2>/dev/null || echo "")

# Only for component source files (not stories, not types, not shadcn ui/)
# Matches: .tsx, .css, .scss, .module.css
IS_COMPONENT=false
if [[ "$FILE" == *"/src/components/"* ]] && \
   [[ "$FILE" != *".stories."* ]] && \
   [[ "$FILE" != *".types."* ]] && \
   [[ "$FILE" != *"/ui/"* ]]; then
  if [[ "$FILE" == *".tsx" ]] || [[ "$FILE" == *".css" ]] || [[ "$FILE" == *".scss" ]]; then
    IS_COMPONENT=true
  fi
fi
if [ "$IS_COMPONENT" = false ]; then
  exit 0
fi

# Session-flag guard — fire only once per session per CLAUDE.md docs.
# Fallback to 'unknown' if session_id is absent (degenerates to "once per machine
# until flag is cleaned up" which is still better than "every edit").
SESSION_ID=$(echo "$INPUT" | /usr/bin/python3 -c \
  "import sys,json; print(json.load(sys.stdin).get('session_id','unknown'))" 2>/dev/null)
FLAG="/tmp/.ux-injected-${SESSION_ID}"
if [ -f "$FLAG" ]; then
  exit 0
fi

CHECKLIST_FILE="${CLAUDE_PROJECT_DIR:-.}/ux-guideline/foundations/hook-checklist.txt"

RULES=""
if [ -f "$CHECKLIST_FILE" ]; then
  RULES=$(cat "$CHECKLIST_FILE" | tr '\n' ' ')
else
  RULES="UX guidelines checklist file not found. Invoke ux-guidelines skill to verify."
fi

ESCAPED=$(echo "$RULES" | /usr/bin/python3 -c "import sys,json; print(json.dumps(sys.stdin.read().strip())[1:-1])" 2>/dev/null)
cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "additionalContext": "UX RULES CHECK — verify this edit: ${ESCAPED}. If any violation: report in table (위치|현재코드|규칙|수정방향) and ask user: '위 항목을 가이드라인에 맞게 수정할까요?'"
  }
}
EOF

# Mark session as injected — subsequent component edits in the same session skip.
touch "$FLAG"
exit 0
