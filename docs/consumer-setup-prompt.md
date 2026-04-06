# Consumer UX Guideline Setup Prompt

> Paste this entire prompt into Claude Code running in the **happytalk-front** project.
> It creates CLAUDE.md, ds-audit + ux-guidelines skills, two hooks, and merges hook config into settings.local.json.

---

## Step 1: Pre-flight Check

Run these checks first:

```bash
# 1-a. Verify DS is installed
node -e "const p = require('@blumnai-studio/blumnai-design-system/package.json'); console.log('DS version:', p.version)"

# 1-b. Check if CLAUDE.md exists
test -f CLAUDE.md && echo "CLAUDE.md EXISTS — ask user before overwriting" || echo "No CLAUDE.md — safe to create"

# 1-c. Verify UX guidelines are shipped
ls node_modules/@blumnai-studio/blumnai-design-system/ux-guideline/foundations/spacing.md > /dev/null 2>&1 \
  && echo "UX guidelines: found" \
  || echo "UX guidelines: NOT FOUND — update DS package"
```

Read the existing `.claude/settings.local.json` (you'll merge into it in Step 5).

---

## Step 2: Create `CLAUDE.md` (~80 lines)

If CLAUDE.md already exists, ask the user: "CLAUDE.md already exists. Overwrite or append?" before proceeding.

Write this file at the project root:

```markdown
# happytalk-front — Claude Code Guidelines

## 1. DS Package Reference

This project uses `@blumnai-studio/blumnai-design-system`.

**Before building or modifying ANY UI**, read the component reference:
```
node_modules/@blumnai-studio/blumnai-design-system/AI.md
```

Check installed version:
```bash
node -e "console.log(require('@blumnai-studio/blumnai-design-system/package.json').version)"
```

For detailed component usage, invoke the `ds` skill.

## 2. Import Pattern

Always use **subpath imports** for smaller bundles:

```tsx
// CORRECT — subpath imports
import { Button } from '@blumnai-studio/blumnai-design-system/button';
import { Select } from '@blumnai-studio/blumnai-design-system/select';
import { Icon } from '@blumnai-studio/blumnai-design-system/icons/icon';

// AVOID — barrel import pulls everything
import { Button, Select } from '@blumnai-studio/blumnai-design-system';
```

Some components are **subpath-only** (not in root export):
- `@blumnai-studio/blumnai-design-system/form`
- `@blumnai-studio/blumnai-design-system/event-calendar`
- `@blumnai-studio/blumnai-design-system/table`

## 3. Component-First Rule

**Always check DS before building custom UI.** Before creating any button, select,
dialog, tooltip, tabs, badge, switch, table, or standard UI primitive:

1. Read `AI.md` in node_modules (Quick Reference Table)
2. If DS has it → use it
3. If DS doesn't have it → ask the user before building custom

## 4. Top 5 Gotchas

| # | Gotcha | Details |
|---|--------|---------|
| 1 | Select options format | Must be `{ id: string, label: string }` — not `{ value, text }` |
| 2 | Dialog portal | Floating components (Select, Popover, DatePicker) inside Dialog must use `PortalContainerContext` |
| 3 | Button loading width | Set explicit `width` when using `loading` prop to prevent layout shift |
| 4 | Tooltip on icon-only | Wrap icon-only `ControlButton` with `Tooltip` for accessibility |
| 5 | Toast for feedback | Use `toast()` from DS (re-exports sonner) — don't build custom snackbar/notification |

## 5. UX Design Foundations

UX guideline files are shipped in the DS package:
```
node_modules/@blumnai-studio/blumnai-design-system/ux-guideline/foundations/
```
Covers: spacing, color, elevation/shadow, border-radius, typography, interaction, components.
Invoke the `ux-guidelines` skill for guided access.
**Note:** These are design decision references, not CSS classes — translate values to Emotion.

## 6. Bridge Protocol

DS changes can be requested via the bridge:
- **Request**: write to `~/.claude/ds-bridge/requests/YYYY-MM-DD-title.md` (set `to: blumnai-design-system`, `from: happytalk-front`)
- **Completion**: DS writes to `~/.claude/ds-bridge/completed/`
- Don't block — continue working after writing a request

## Available Skills

| Skill | When |
|-------|------|
| `ds` | Building/modifying UI (auto-triggers on UI keywords) |
| `ds-audit` | Scanning for legacy HTML, old libraries, custom reimplementations |
| `ux-guidelines` | Spacing, shadow, color, radius, interaction design decisions |
| `component` | Creating a new component |
| `api` | API/GraphQL work |
| `redux` | Redux state management |
| `review` | PR review |
| `style` | CSS/Emotion styling |
```

After writing, verify: `wc -l CLAUDE.md` — must be ≤80 lines.

---

## Step 3: Create `ds-audit` Skill

Create directory and file: `.claude/skills/ds-audit/SKILL.md`

```markdown
---
name: ds-audit
description: >
  Scan project code for legacy UI patterns that should use DS components.
  Invoke when user says "ds audit", "scan ds", "check ds compliance",
  "find legacy components", or "DS 감사", "DS 점검".
allowed-tools: Bash, Read, Glob, Grep
---

# DS Audit — Legacy Pattern Scanner

Scan for UI patterns that should be replaced with DS components.

Default scope: `src/components/`. Accepts optional path argument.

## Scan Categories

### 1. Legacy HTML Detection
Find raw HTML elements that have DS equivalents:

```bash
# Raw HTML buttons (should be DS Button/ControlButton/LinkButton)
grep -rnE '<button\b' TARGET --include="*.tsx" | grep -v node_modules | grep -v '.stories.'

# Raw HTML selects (should be DS Select)
grep -rnE '<select\b' TARGET --include="*.tsx" | grep -v node_modules | grep -v '.stories.'

# Raw HTML inputs (should be DS Input/Checkbox/Radio/Switch)
grep -rnE '<input\s+type=' TARGET --include="*.tsx" | grep -v node_modules | grep -v '.stories.'

# Raw HTML textareas (should be DS Textarea)
grep -rnE '<textarea\b' TARGET --include="*.tsx" | grep -v node_modules | grep -v '.stories.'
```

### 2. Old Library Detection
Find imports from libraries with DS alternatives:

```bash
# react-select → DS Select
grep -rnE "from\s+['\"]react-select" TARGET --include="*.tsx" --include="*.ts" | grep -v node_modules

# react-modal / @reach/dialog → DS Dialog
grep -rnE "from\s+['\"]react-modal|from\s+['\"]@reach/dialog" TARGET --include="*.tsx" --include="*.ts" | grep -v node_modules

# @fortawesome / react-icons → DS Icon
grep -rnE "from\s+['\"]@fortawesome|from\s+['\"]react-icons" TARGET --include="*.tsx" --include="*.ts" | grep -v node_modules

# react-tooltip → DS Tooltip
grep -rnE "from\s+['\"]react-tooltip" TARGET --include="*.tsx" --include="*.ts" | grep -v node_modules

# react-tabs → DS Tabs
grep -rnE "from\s+['\"]react-tabs" TARGET --include="*.tsx" --include="*.ts" | grep -v node_modules
```

### 3. Custom Reimplementation Detection
Find Emotion styled components replicating DS patterns:

```bash
# Custom modal/dialog wrappers
grep -rnE "styled\..*(Modal|Dialog|Overlay|Backdrop)" TARGET --include="*.tsx" --include="*.ts" | grep -v node_modules

# Custom tooltip
grep -rnE "styled\..*(Tooltip|Popover)" TARGET --include="*.tsx" --include="*.ts" | grep -v node_modules

# Custom tabs
grep -rnE "styled\..*(Tab|TabList|TabPanel)" TARGET --include="*.tsx" --include="*.ts" | grep -v node_modules

# Custom badge/chip/tag
grep -rnE "styled\..*(Badge|Chip|Tag)" TARGET --include="*.tsx" --include="*.ts" | grep -v node_modules
```

### 4. Import Pattern Check
Verify subpath imports are used:

```bash
# Barrel imports (should be subpath)
grep -rnE "from\s+['\"]@blumnai-studio/blumnai-design-system['\"]" TARGET --include="*.tsx" --include="*.ts" | grep -v node_modules
```

## Output Format

```
## DS Audit Report: {target_path}

### Legacy HTML Elements
| # | File:Line | Element | DS Replacement | Severity |
|---|-----------|---------|----------------|----------|

### Third-Party Library Imports
| # | File:Line | Library | DS Replacement | Severity |
|---|-----------|---------|----------------|----------|

### Custom Reimplementations
| # | File:Line | Pattern | DS Replacement | Severity |
|---|-----------|---------|----------------|----------|

### Import Pattern Issues
| # | File:Line | Issue | Fix | Severity |
|---|-----------|-------|-----|----------|

### Summary
- Total findings: N
- High severity: N (legacy HTML, old libraries)
- Medium severity: N (custom reimplementations)
- Low severity: N (import patterns)
- Grade: A/B/C/D/F
```

## Severity

| Level | Meaning |
|-------|---------|
| High | Raw HTML or third-party library with direct DS equivalent |
| Medium | Custom styled component replicating DS functionality |
| Low | Import pattern issues (barrel vs subpath) |

## Grading

| Grade | Criteria |
|-------|----------|
| A | 0 findings |
| B | ≤5 Low or ≤2 Medium |
| C | ≤3 High or ≤5 Medium |
| D | 4+ High |
| F | 10+ High |
```

---

## Step 3b: Create `ux-guidelines` Skill

Create directory and file: `.claude/skills/ux-guidelines/SKILL.md`

```markdown
---
name: ux-guidelines
description: >
  UX design foundations — spacing, color, elevation, border-radius, typography,
  interaction patterns, component usage. Invoke when user mentions "spacing",
  "shadow", "elevation", "radius", "간격", "그림자", "ux guideline", "ux 가이드",
  "hover", "interaction", or "border radius".
allowed-tools: Read, Glob, Grep
---

# UX Design Foundations Index

This project uses Emotion (not Tailwind). Read the foundation files for design
values, then translate DS class references to CSS properties in Emotion.
E.g., spacing values → `gap`/`padding` in px, shadow tokens → `box-shadow` values.

## Foundation Files

All files are under `node_modules/@blumnai-studio/blumnai-design-system/ux-guideline/foundations/`.

| Decision | File | Key content |
|----------|------|-------------|
| Spacing (gap, padding, margin) | `spacing.md` | 4px grid, spacing scale, component internal spacing |
| Color system | `color.md` | Semantic tokens, state colors, contrast rules |
| Elevation / Shadow | `elevation.md` | Shadow levels, when to apply, layering |
| Border radius | `border-radius.md` | Radius scale, component-to-radius mapping |
| Typography weight & scale | `typography.md` | Font sizes, weights, line heights |
| Hover / Interaction | `interaction.md` | Hover states, transitions, focus, active |
| Component usage | `components.md` | Which component for which pattern |
| Table patterns | `table.md` | Table layout, column types, density |
| Overview | `README.md` | Foundation summary and cross-references |

## Workflow

1. Identify the design decision needed (spacing? shadow? color?)
2. Read the relevant foundation file from the table above
3. Extract the design values (px, hex, token names)
4. Translate to Emotion: `css={{ padding: '8px', boxShadow: '...' }}`
```

---

## Step 4: Create Hook Scripts

### 4-a. `.claude/hooks/skill-suggest.sh`

```bash
#!/usr/bin/env bash
INPUT=$(cat)
MSG=$(echo "$INPUT" | tr '[:upper:]' '[:lower:]')
WB='(^|[[:space:]])'
WE='([[:space:]]|$)'

if [[ "$MSG" =~ ds\ audit|scan\ ds|check\ ds|ds\ 감사|ds\ 점검 ]]; then
  echo "Skill suggestion: /ds-audit — DS 컴포넌트 감사를 실행합니다."
elif [[ "$MSG" =~ create\ component|new\ component|컴포넌트\ 생성 ]]; then
  echo "Skill suggestion: /component"
elif [[ "$MSG" =~ ${WB}(spacing|shadow|elevation|간격|그림자|hover|interaction|radius)${WE}|ux\ guideline|ux\ 가이드|border\ radius ]]; then
  echo "Skill suggestion: /ux-guidelines — UX 디자인 가이드라인을 참조합니다."
elif [[ "$MSG" =~ ${WB}ds${WE}|design\ system|디자인\ 시스템 ]]; then
  echo "Skill suggestion: /ds — DS 컴포넌트 가이드를 참조합니다."
elif [[ "$MSG" =~ ${WB}(api|graphql|query|mutation)${WE} ]]; then
  echo "Skill suggestion: /api"
elif [[ "$MSG" =~ ${WB}(redux|store|dispatch)${WE} ]]; then
  echo "Skill suggestion: /redux"
elif [[ "$MSG" =~ review|pr\ review|코드\ 리뷰 ]]; then
  echo "Skill suggestion: /review"
elif [[ "$MSG" =~ ${WB}(style|css|emotion|스타일)${WE} ]]; then
  echo "Skill suggestion: /style"
fi
exit 0
```

Make executable: `chmod +x .claude/hooks/skill-suggest.sh`

### 4-b. `.claude/hooks/ds-compliance-check.sh`

```bash
#!/usr/bin/env bash
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.file_path // .tool_input.file_path // empty' 2>/dev/null)
[[ "$FILE" != src/components/*.tsx ]] && exit 0
[[ "$FILE" == *.style.* ]] && exit 0
FLAG="/tmp/ds-compliance-reminded-$$"
[ -f "$FLAG" ] && exit 0
touch "$FLAG"
echo "DS 컴포넌트를 먼저 확인하세요. AI.md(컴포넌트 참조) 및 ux-guideline/foundations/(디자인 결정) 참조. 경로: node_modules/@blumnai-studio/blumnai-design-system/"
exit 0
```

Make executable: `chmod +x .claude/hooks/ds-compliance-check.sh`

---

## Step 5: Merge Hooks into `settings.local.json`

Read the existing `.claude/settings.local.json`. Add these entries to the `hooks` object, preserving all existing hooks:

Add to `hooks.UserPromptSubmit` (create array if missing):
```json
{
  "matcher": "",
  "hooks": [
    {
      "type": "command",
      "command": "bash .claude/hooks/skill-suggest.sh"
    }
  ]
}
```

Add to `hooks.PreToolUse` (append to existing array):
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "bash .claude/hooks/ds-compliance-check.sh"
    }
  ]
}
```

After writing, validate:
```bash
python3 -m json.tool .claude/settings.local.json > /dev/null && echo "Valid JSON" || echo "INVALID JSON — fix it"
```

---

## Step 6: Verification

Run all checks:

```bash
# Files exist
ls -la .claude/skills/ds-audit/SKILL.md .claude/skills/ux-guidelines/SKILL.md .claude/hooks/skill-suggest.sh .claude/hooks/ds-compliance-check.sh

# Verify skill frontmatter
head -1 .claude/skills/ux-guidelines/SKILL.md | grep -q '^---$' && echo "ux-guidelines frontmatter: OK" || echo "FAIL"
head -1 .claude/skills/ds-audit/SKILL.md | grep -q '^---$' && echo "ds-audit frontmatter: OK" || echo "FAIL"

# Verify skills have name field
grep -q '^name:' .claude/skills/ux-guidelines/SKILL.md && echo "ux-guidelines name: OK" || echo "FAIL"
grep -q '^name:' .claude/skills/ds-audit/SKILL.md && echo "ds-audit name: OK" || echo "FAIL"

# Syntax check
bash -n .claude/hooks/skill-suggest.sh && echo "skill-suggest.sh: OK" || echo "FAIL"
bash -n .claude/hooks/ds-compliance-check.sh && echo "ds-compliance-check.sh: OK" || echo "FAIL"

# CLAUDE.md line count
LINES=$(wc -l < CLAUDE.md)
echo "CLAUDE.md: $LINES lines"
[ "$LINES" -le 80 ] && echo "OK (≤80)" || echo "WARNING: exceeds 80 lines"

# settings.local.json valid
python3 -m json.tool .claude/settings.local.json > /dev/null && echo "settings.local.json: valid" || echo "FAIL"

# Smoke test skill-suggest
echo "ds audit 해줘" | bash .claude/hooks/skill-suggest.sh
echo "spacing 결정해줘" | bash .claude/hooks/skill-suggest.sh

# Verify ux-guidelines skill file
ls -la .claude/skills/ux-guidelines/SKILL.md
```

Report: "Setup complete. Files created: CLAUDE.md, .claude/skills/ds-audit/SKILL.md, .claude/skills/ux-guidelines/SKILL.md, .claude/hooks/skill-suggest.sh, .claude/hooks/ds-compliance-check.sh. Hooks registered in settings.local.json."

---

## Files Created/Modified

| File | Action | Lines |
|------|--------|-------|
| `CLAUDE.md` | Create (check first) | ~80 |
| `.claude/skills/ds-audit/SKILL.md` | Create | ~60 |
| `.claude/skills/ux-guidelines/SKILL.md` | Create | ~30 |
| `.claude/hooks/skill-suggest.sh` | Create + chmod +x | ~15 |
| `.claude/hooks/ds-compliance-check.sh` | Create + chmod +x | ~10 |
| `.claude/settings.local.json` | Merge (read→append→validate→write) | +15 |

## NOT Created (by design)

- No foundation file copy (AI.md + ux-guideline/ in node_modules are the source of truth)
- No Tailwind class rules (happytalk-front uses Emotion — translate DS values to Emotion)
- No ds-migration skill (existing ds.md covers this)
- No CLAUDE.md >80 lines (skills handle depth)
