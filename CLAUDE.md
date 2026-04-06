# Blumnai Design System - Development Guidelines

## Documentation Architecture

| Layer | Location | When loaded | Purpose |
|-------|----------|-------------|---------|
| **CLAUDE.md** | (this file) | Always | Core rules: styling, spacing, colors, patterns |
| **Skills** | `.claude/skills/` | On demand | Detailed guides for specific tasks |
| **UX Guidelines** | `ux-guideline/foundations/` | Via skill | Layout decisions, component usage, interaction |
| **AI.md** | `AI.md` | By consumers | Component reference for downstream projects |

### Available Skills

| Skill | Trigger |
|-------|---------|
| `ux-guidelines` | Layout/spacing/shadow decisions, new UI |
| `storybook-story` | Creating or modifying story files |
| `design-system-rules` | Detailed DS class reference |
| `new-component` | Scaffolding a new component |
| `component-checklist` | Verifying implementation is complete |
| `figma-save` | Fetching Figma node data |
| `visual-test` | Running Playwright visual regression tests |
| `component-audit` | Scanning existing components for DS violations |

### Hooks (auto-triggered)

- **PreToolUse** (Edit/Write on components): UX guidelines reminder (once per session)
- **UserPromptSubmit**: Skill suggestions based on keywords
- **Stop**: Verification check when component work appears done
- **SessionStart**: Autonomy rules + stale flag cleanup

---

## Publishing to GitHub Packages (CRITICAL)

- **Package scope**: `@blumnai-studio/blumnai-design-system`
- **Registry**: `https://npm.pkg.github.com`
- **Auth env var**: `GITHUB_TOKEN_BLUMNAI`

```bash
source ~/.zshrc 2>/dev/null; npm publish
```

## Code Quality Verification (CRITICAL)

**ALWAYS run after making code changes, before telling user work is done:**

```bash
npm run typecheck && npm run lint
```

## Communication Rules

- During long operations, output brief status updates every few tool calls.
- When spawning a team, narrate who was spawned and relay results.
- If blocked or waiting, say so explicitly.

---

## Typography Classes (CRITICAL)

**NEVER use default Tailwind typography classes.**

| Category | DS Class | NOT |
|----------|----------|-----|
| Font size | `size-xs`, `size-sm`, `size-md`, `size-lg`, `size-xl`, `size-2xl` | `text-xs`, `text-sm`, `text-base`, `text-lg` |
| Line height | `line-height-leading-3` thru `leading-6` | `leading-3`, `leading-4` |
| Letter spacing | `letter-spacing-tracking-{tighter,tight,normal,wide}` | `tracking-tight`, `tracking-normal` |
| Font family | `font-body`, `font-headline`, `font-quote`, `font-code` | — |
| Font weight | `font-normal`(400), `font-medium`(500), `font-semibold`(600) only | `font-light`, `font-bold`, `font-extrabold` |

```tsx
// CORRECT
cn("font-body", "size-sm line-height-leading-5 letter-spacing-tracking-normal", "font-medium", "text-default")

// WRONG
cn("text-sm leading-5 tracking-normal", "font-medium", "text-gray-700")
```

## Spacing & Sizing (CRITICAL)

**NEVER use arbitrary values (`w-[14px]`) or Tailwind defaults (`w-16`, `p-4`, `gap-8`, `mt-4`).**

| Category | DS Classes | NOT |
|----------|-----------|-----|
| Padding | `padding-{0,1,2,4,6,8,10,12,16,20,24}`, `padding-x-*`, `padding-y-*` | `p-4`, `px-2`, `py-1` |
| Width | `width-{2,8,10,14,16,24,28,32,36,40}` | `w-16`, `w-[14px]` |
| Height | `height-{2,8,14,16,24,28,32,36,40}` | `h-16`, `h-[10px]` |
| Gap | `ds-gap-{0,1,2,4,6,8,10,12,16,20,24,32}` | `gap-4`, `gap-8`, `gap-[6px]` |
| Margin | `margin-0`, `margin-x-*`, `margin-y-*`, `margin-t-*`, `margin-r-*`, `margin-l-*` | `mt-4`, `mx-2` |

Available padding-x: 0,1,2,4,6,8,10,12,14,16,24. Available padding-y: 0,1,2,4,6,8,10,12,16.
Available padding-t: 4,16. Available padding-b: 4,16.

### Border Radius

DS scale: `rounded-none`, `rounded-2xs`(2), `rounded-xs`(4), `rounded-sm`(6), `rounded-md`(8), `rounded-lg`(12), `rounded-xl`(16), `rounded-2xl`(24), `rounded-3xl`(28), `rounded-full`. NOT `rounded-[5px]`.

## Color Classes (CRITICAL)

**NEVER use arbitrary colors (`bg-[#437DFC]`) or Tailwind grays (`bg-white`, `bg-gray-*`).**

| Category | DS Classes |
|----------|-----------|
| Text | `text-default`, `text-subtle`, `text-muted`, `text-hint` |
| Background | `bg-default`, `bg-subtle`, `bg-muted`, `bg-card`, `bg-inverted`, `bg-overlay` |
| Border | `border-default`(10%), `border-darker`(15%), `border-strong`(25%) |
| Checkbox bg | `bg-checkbox-default`, `bg-checkbox-active`, `bg-checkbox-active-hover`, `bg-checkbox-disabled` |

Border classes are self-contained (width + style + color). For dashed borders, add `border-dashed`.

**Note:** Tailwind chromatic colors (`bg-blue-500`, `text-red-600`) ARE allowed for semantic states.

---

## Component Patterns

### No darkMode prop

Dark mode is handled automatically via CSS variables and themes.

### PortalContainerContext (Floating Components in Dialog)

Floating components (Select, Popover, DatePicker) inside Dialog must portal into Dialog's content element:

```tsx
import { PortalContainerProvider, usePortalContainer } from "../../utils/PortalContainerContext";
// Dialog provides: <PortalContainerProvider value={contentEl}>
// Floating consumes: const contextContainer = usePortalContainer()
// Portal: <Portal container={contextContainer ?? undefined}>
```

### Form Component Label Props

All form components share via `InputWrapper`:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | 라벨 |
| `labelPosition` | `'top' \| 'left'` | `'top'` | 라벨 위치 |
| `required` | `boolean` | `false` | 필수 표시 |
| `supportText` | `string` | — | 라벨 옆 보조 텍스트 |
| `caption` | `string` | — | 입력 필드 아래 설명 |

### Tabs animatedIndicator

`TabsList` supports `animatedIndicator` prop — uses `MutationObserver` on `data-state` + `ResizeObserver`.

### AspectRatio Usage

Use `<AspectRatio>` instead of `aspect-[...]` CSS. Common ratios: `1` (square), `16/9` (video), `4/3` (photo). Always pair with `object-cover w-full h-full` on `<img>`.

---

## Code Comments (CRITICAL)

- **Minimize comments** — code should be self-documenting
- **No English comments** in component code (Korean only if truly needed)
- Exception: JSDoc for public API

## Storybook Stories (CRITICAL)

**Invoke the `storybook-story` skill for full conventions.** Key rules:

1. Controls: disabled globally at meta level, enabled ONLY on Default story
2. argTypes: every prop needs Korean description + `table.type.summary`
3. Three Places Rule: every argType must be in argTypes + args + render
4. Never spread `args` in render functions — set props explicitly
5. Use unified component with `variant` prop, not individual variant components

---

## Tailwind `--spacing` Override (CRITICAL)

DS sets `--spacing: initial` in `@theme` (`src/index.css`), disabling Tailwind multiplicative spacing. DS provides own utilities (`ds-gap-*`, `padding-*`, etc.) mapping 1:1 to pixels. Consuming projects keep their own `--spacing`.

## CSS Layers — Intentionally Unlayered (CRITICAL)

Built CSS (`dist/index.css`) is unlayered (post-build strips `@layer`). Unlayered CSS beats layered CSS per spec, preventing consumer overrides.

## CSS/Styling Guidelines

Analyze existing styles before proposing changes. Never remove styles unless explicitly requested.

## Planning Workflow (CRITICAL)

1. Write plan → 2. Spawn review agent → 3. Present to user only after review confirms

## Quality Assurance

After implementing fixes, verify related functionality still works.

---

## DS ↔ Consumer Bridge (Automated Cross-Project Workflow)

Bridge는 **양방향** — 어느 쪽이든 요청/응답 가능.
This DS serves `happytalk-front` at `/Users/ml/Documents/GitHub/MBI/happytalk-front`.

### Bridge Directory

- `~/.claude/ds-bridge/requests/` — 변경 요청
- `~/.claude/ds-bridge/completed/` — 완료 통지
- `~/.claude/ds-bridge/consumed/` — 소비 마커
- `~/.claude/ds-bridge/PROTOCOL.md` — Full protocol
- `~/.claude/ds-bridge/orchestrator-prompt.md` — Orchestrator prompt

### How to Create Requests (outgoing)

1. Write request to `~/.claude/ds-bridge/requests/YYYY-MM-DD-<title>.md` (set `to: happytalk-front`, `from: blumnai-design-system`)
2. Continue working — don't block
3. When completion arrives in `completed/`, apply and write consumed marker

### How to Process Requests (incoming)

1. Read request → 2. Implement → 3. `npm run typecheck && npm run lint` → 4. `npm version patch --no-git-tag-version` → 5. Update CHANGELOG → 6. Commit, push, `source ~/.zshrc 2>/dev/null; npm publish` → 7. Write completion file

### Completion File Format

```markdown
# Completed: {title}
- **version**: {version}
- **request**: {filename}

## What Changed
(summary)

## New/Changed Props
| Prop | Component | Type | Default | Description |

## Migration Steps for Consumer
1. `npm install @blumnai-studio/blumnai-design-system@{version} --legacy-peer-deps`
2. (code changes)

## Breaking Changes
(if any, otherwise "None")
```

---

## Reference Files

- Typography utilities: `src/styles/utilities.css`
- Tailwind config: `tailwind.config.js`
- Design tokens: `src/tokens/`
- Figma fetch script: `scripts/fetch-figma.mjs`
- shadcn bridge CSS: `src/styles/tokens/shadcn-bridge.css`
