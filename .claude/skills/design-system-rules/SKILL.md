---
name: design-system-rules
description: Core rules for Blumnai design system. Auto-reference when styling components or using CSS classes.
user-invocable: false
---

# Blumnai Design System Rules

Mandatory rules when writing code in this project.

## Typography (Absolute Rules)

**Must use these classes:**
- Font size: `size-xs`, `size-sm`, `size-md`, `size-lg`, `size-xl`, `size-2xl`
- Line height: `line-height-leading-3`, `line-height-leading-4`, `line-height-leading-5`, `line-height-leading-6`
- Letter spacing: `letter-spacing-tracking-tighter`, `letter-spacing-tracking-tight`, `letter-spacing-tracking-normal`
- Font family: `font-body`, `font-headline`, `font-quote`, `font-code`

**Never use (Tailwind defaults):**
- ❌ `text-xs`, `text-sm`, `text-base`, `text-lg`
- ❌ `leading-3`, `leading-4`, `leading-5`
- ❌ `tracking-tight`, `tracking-normal`

## Spacing (Absolute Rules)

**Must use these classes:**
- Padding: `padding-0`, `padding-1`, `padding-2`, `padding-4`, `padding-6`, `padding-8`, `padding-10`, `padding-12`, `padding-16`, `padding-20`, `padding-24`
- Padding X/Y: `padding-x-*`, `padding-y-*`
- Width: `width-2`, `width-8`, `width-10`, `width-14`, `width-16`, `width-24`, `width-28`, `width-32`, `width-36`, `width-40`
- Height: `height-2`, `height-8`, `height-14`, `height-16`, `height-24`, `height-28`, `height-32`, `height-36`, `height-40`
- Gap: `gap-0`, `gap-1`, `gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-10`, `gap-12`, `gap-16`, `gap-20`, `gap-24`

**Never use:**
- ❌ `p-4`, `px-2`, `py-1` (Tailwind defaults)
- ❌ `w-16`, `h-16` (Tailwind defaults)
- ❌ `w-[14px]`, `h-[10px]` (arbitrary values)
- ❌ `gap-[6px]` (arbitrary values)

## Colors (Absolute Rules)

**Must use these classes:**
- Text: `text-default`, `text-subtle`, `text-muted`, `text-hint`, `text-informative`, `text-destructive`
- Background: `bg-default`, `bg-subtle`, `bg-muted`, `bg-card`, `bg-state-primary`, `bg-state-soft`, `bg-state-destructive`
- Border: `border-default`, `border-darker`, `border-strong`

**Never use:**
- ❌ `bg-[#437DFC]`, `text-[#4E4E55]` (hardcoded colors)
- ❌ `bg-white`, `bg-gray-100` (Tailwind defaults)
- ❌ `border-[rgba(39,39,42,0.15)]` (hardcoded colors)

## Border Radius

**Must use these classes:**
- `rounded-none`, `rounded-2xs`, `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`

**Never use:**
- ❌ `rounded-[5px]` (arbitrary values)

## Code Comments

- No unnecessary comments (self-documenting code preferred)
- If needed, write in Korean
- No English comments (except JSDoc)

## Code Verification (MANDATORY)

**ALWAYS run after making code changes:**
```bash
npm run typecheck && npm run lint
```

This catches TypeScript errors, ESLint issues, and React hooks violations.

## Reference Files

- Typography utilities: `src/styles/utilities.css`
- Design tokens: `src/tokens/`
- Full rules: `CLAUDE.md`
