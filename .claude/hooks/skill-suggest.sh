#!/usr/bin/env bash
# UserPromptSubmit hook: suggest relevant skills based on user prompt keywords
INPUT=$(cat)

# Skip in plan mode — skills cannot be invoked there
PERMISSION_MODE=$(echo "$INPUT" | /usr/bin/python3 -c "import sys,json; print(json.load(sys.stdin).get('permission_mode',''))" 2>/dev/null)
if [ "$PERMISSION_MODE" = "plan" ]; then
  exit 0
fi

PROMPT=$(echo "$INPUT" | /usr/bin/python3 -c "import sys,json; print(json.load(sys.stdin).get('prompt','').lower())" 2>/dev/null)

SUGGESTIONS=""

# new-component skill
if echo "$PROMPT" | grep -qE "((new|create|add|scaffold|build)\s+(\S+\s+)*component|component\s+(\S+\s+)*(만들|생성|추가)|scaffold\s+\S+|만들어.*컴포넌트|새 컴포넌트|컴포넌트 생성)"; then
  SUGGESTIONS="${SUGGESTIONS}Use the 'new-component' skill to scaffold the component with correct file structure.\n"
fi

# storybook-story skill
if echo "$PROMPT" | grep -qE "(story|storybook|stories|스토리)"; then
  SUGGESTIONS="${SUGGESTIONS}Use the 'storybook-story' skill for story creation conventions.\n"
fi

# figma-save skill
if echo "$PROMPT" | grep -qE "(figma|피그마|save spec|fetch spec|node-id=)"; then
  SUGGESTIONS="${SUGGESTIONS}Use the 'figma-save' skill to fetch and save Figma node data.\n"
fi

# visual-test skill
if echo "$PROMPT" | grep -qE "(visual test|screenshot|check screenshot|visual regression|비주얼 테스트)"; then
  SUGGESTIONS="${SUGGESTIONS}Use the 'visual-test' skill to run Playwright visual regression tests.\n"
fi

# component-checklist skill
if echo "$PROMPT" | grep -qE "(component.*check|run checklist|verify.*component|완료.*확인|체크리스트|done\?)"; then
  SUGGESTIONS="${SUGGESTIONS}Use the 'component-checklist' skill to verify the implementation.\n"
fi

# ux-guidelines skill
if echo "$PROMPT" | grep -qE "(layout.*decision|choose.*spacing|shadow.*decision|ux guideline|레이아웃.*결정|간격.*결정|ux 가이드)"; then
  SUGGESTIONS="${SUGGESTIONS}Use the 'ux-guidelines' skill for UX design foundation decisions.\n"
fi

# design-system-rules skill
if echo "$PROMPT" | grep -qE "(ds rule|ds class|design system rule|styling rule|클래스 규칙|스타일 규칙|ds 규칙)"; then
  SUGGESTIONS="${SUGGESTIONS}Use the 'design-system-rules' skill for DS class reference (typography, spacing, colors).\n"
fi

# coderabbit-review skill
if echo "$PROMPT" | grep -qE "(coderabbit|code review|PR review|리뷰.*요청)"; then
  SUGGESTIONS="${SUGGESTIONS}Use the 'coderabbit-review' skill for automated PR review via CodeRabbit.\n"
fi

if [ -n "$SUGGESTIONS" ]; then
  ESCAPED=$(echo -e "$SUGGESTIONS" | /usr/bin/python3 -c "import sys,json; print(json.dumps(sys.stdin.read().strip())[1:-1])" 2>/dev/null)
  cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "Skill suggestions based on your request:\\n${ESCAPED}"
  }
}
EOF
fi
exit 0
