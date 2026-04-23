---
name: ux-guidelines
description: UX design foundations — spacing decisions, color system, interaction patterns, component usage, elevation, border-radius, typography weight. Auto-invoke when implementing new UI layouts, choosing components, making spacing/color/shadow decisions, or working with ux-guideline/ files.
user-invocable: true
---

# UX Design Foundations

Quick decision tables below are an **index only** — they do NOT contain all the rules.

**MANDATORY:** After loading this skill, you MUST read the relevant source files from `ux-guideline/foundations/`. Use the tables below to identify which files apply to your current work, then read those files with the Read tool. Do NOT rely on the tables alone — they are summaries, not complete rules.

**Which files to read:**
- Editing spacing/gap/padding → read `spacing.md`
- Adding shadow/elevation → read `elevation.md`
- Adding hover/focus/transition → read `interaction.md`
- Choosing colors/backgrounds → read `color.md`
- Deciding which component to use → read `components.md`
- Setting border-radius → read `border-radius.md`
- Choosing font size/weight → read `typography.md`
- Building data tables → read `table.md`
- **Unsure?** Read `spacing.md` + `components.md` + `interaction.md` (covers most cases)

**Reporting violations:** When you find guideline violations, present them as a table:

| 위치 | 현재 코드 | 가이드라인 규칙 | 수정 방향 |
|------|----------|---------------|----------|
| `Button.tsx:45` | `gap-8` | spacing.md: DS gap 클래스 사용 | `ds-gap-8` |
| `Card.tsx:12` | `shadow-md` | elevation.md: DS shadow만 허용 | `shadow-card` |
| `List.tsx:30` | `transition-all` | interaction.md: 변경 속성만 지정 | `transition-colors` |

Then ask: "위 항목을 가이드라인에 맞게 수정할까요?"

## Spacing Decisions

> Full rules: `ux-guideline/foundations/spacing.md`

### Gap between elements

| Relationship | Default | Range |
|---|---|---|
| Same group (icon + label, badges) | `ds-gap-8` | 4–8px |
| Related groups (form fields, list items) | `ds-gap-16` | 12–16px |
| Independent sections | `ds-gap-24` | 20–32px |
| Page-level top blocks | `ds-gap-32` | — |

### Component padding

| Density | Default | Use for |
|---|---|---|
| Compact (sm) | `padding-4` | Inline badges, icon buttons |
| Default (md) | `padding-10` | Cards, list items, filter tabs |
| Comfortable (lg) | `padding-16` | Modals, form sections, panels |

## Elevation & Shadow

> Full rules: `ux-guideline/foundations/elevation.md`

**Most UI has NO shadow.** Only use shadow for hierarchy/floating.

| DS Class | When to use |
|---|---|
| (none) | Default — cards, panels, lists |
| `shadow-card` | Emphasis within a flat page (optional card highlight) |
| `shadow-modal-sm` | Floating — dropdowns, popovers, FAB |
| `shadow-modal-md` | Overlay — modals, dialogs |
| `shadow-modal-lg` | Top-level — large modals, near-fullscreen overlay |

**Rules:**
- Only DS shadows allowed — no `shadow-sm`, `shadow-md`, `shadow-lg`, no custom `box-shadow`
- Card depth uses shadow, not border (border is for layout dividers only)
- Modal shadows include `border-default` ring — no separate border needed

## Interaction Patterns

> Full rules: `ux-guideline/foundations/interaction.md`

### Hover patterns

| Element | Pattern |
|---|---|
| List item | `hover:bg-subtle transition-colors` |
| Ghost button | `hover:bg-muted transition-colors` |
| Icon button | `hover:bg-muted rounded-md transition-colors` |
| Card | `hover:shadow-card transition-shadow` |

### Transition rules

- **Always** specify the changing property: `transition-colors`, `transition-shadow`, `transition-transform`
- **NEVER** use `transition-all` (performance + unintended animations)
- Default duration: `duration-150` (implicit)
- Press feedback: `active:scale-[0.96]` (optional, not required on all buttons)

## Color System

> Full rules: `ux-guideline/foundations/color.md`

### Priority

1. DS semantic tokens (`bg-default`, `text-subtle`, `border-darker`)
2. Tailwind chromatic colors (`bg-blue-500`, `text-red-600`)

**Forbidden:** Tailwind grays (`bg-white`, `bg-gray-*`, `text-gray-*`) and arbitrary colors (`bg-[#437DFC]`)

### Background defaults

| Need | Use |
|---|---|
| Default background | `bg-default` |
| Slightly darker | `bg-subtle` |
| Muted/section | `bg-muted` |
| Card surface | `bg-card` |
| Inverted (tooltip, dark header) | `bg-inverted` |
| Disabled | `bg-state-disabled` |

### Icon colors

Use `color` prop tokens: `default`, `default-subtle`, `default-muted`, `destructive`, `informative`, `success`, `warning`. Match text hierarchy (text-default ↔ default icon, text-subtle ↔ default-subtle icon).

## Component Usage

> Full rules: `ux-guideline/foundations/components.md`

**Always use DS components first.** Custom implementation only when DS doesn't have it.

### Key principles

- Info display → **flat** layout. Click/emphasis → **card** (`shadow-card`)
- If text label is sufficient, **don't add tooltip**
- List separation: use **gap OR divider**, never both
- Modals: `fit-content` height, internal scroll on overflow

### Card emphasis (2 levels)

| Mode | Style | When |
|---|---|---|
| Emphasized | `shadow-card` + `border-default` + `rounded-lg` | Important, clickable, standalone |
| Flat | No shadow/border, or `border-b-default` dividers | Info listing, settings, continuous content |

### Tooltip rules

- Use DS `TooltipTrigger` (not HTML `title`)
- Required on: icon-only buttons, truncated text, shortcut actions
- Not needed when: text label is sufficient
- Content: verb form ("저장", not "저장 버튼"), max 1-2 lines

## Border & Radius

> Full rules: `ux-guideline/foundations/border-radius.md`

### 3-tier radius rule

| Element type | Class | Value |
|---|---|---|
| Terminal (button, chip, input) | `rounded-sm` | 6px |
| Container (wrapper) | `rounded-md` | 8px |
| Content block (card, panel, modal) | `rounded-lg` | 12px |
| Avatar, pill | `rounded-full` | 9999px |

**Concentric rule:** outer radius = inner radius + padding

### Button shape

All buttons use `rounded` (default). `pill` only for intentional exceptions.

## Typography

> Full rules: `ux-guideline/foundations/typography.md`

### Size by use

| Use | Class | px |
|---|---|---|
| Caption, badge, metadata | `size-xs` | 12 |
| Body, label, list item | `size-sm` | 14 (default) |
| Section title, emphasis | `size-md` | 16 |
| Page/panel title | `size-lg` | 18 |

### Weight (3 levels only)

| Use | Class | Weight |
|---|---|---|
| Body text, lists | `font-normal` | 400 |
| Button text, input labels | `font-medium` | 500 |
| Section/panel titles | `font-semibold` | 600 |

**Forbidden:** `font-light` (300), `font-bold` (700), `font-extrabold`

## Data Table

> Full rules: `ux-guideline/foundations/table.md`

- Use DS `DataGrid` for column-based data
- Row height: `min-height: 32px` (variable, not fixed)
- Cell text: wrap by default (truncate only for short/predictable data like IDs, dates)
- Horizontal lines: always. Vertical lines: off by default
