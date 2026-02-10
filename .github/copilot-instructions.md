# Blumnai Design System — Copilot Instructions

> For full details see `CLAUDE.md` (development rules) and `AI.md` (component reference).

## Critical: Custom Utility Classes

This design system uses **custom CSS utility classes**. Never use default Tailwind classes for typography, spacing, or colors.

### Typography

| Category | Use | NOT |
|----------|-----|-----|
| Font size | `size-xs`, `size-sm`, `size-md`, `size-lg` | `text-xs`, `text-sm`, `text-base`, `text-lg` |
| Line height | `line-height-leading-3`, `line-height-leading-5` | `leading-3`, `leading-5` |
| Letter spacing | `letter-spacing-tracking-tight` | `tracking-tight` |
| Font family | `font-body`, `font-headline`, `font-code` | — |

### Spacing

| Category | Use | NOT |
|----------|-----|-----|
| Padding | `padding-4`, `padding-x-12`, `padding-y-8` | `p-4`, `px-3`, `py-2` |
| Width | `width-16`, `width-24` | `w-16`, `w-[14px]` |
| Height | `height-16`, `height-36` | `h-16`, `h-[36px]` |
| Gap | `gap-8`, `gap-12` | `gap-[8px]` |

### Colors

| Category | Use | NOT |
|----------|-----|-----|
| Text | `text-default`, `text-subtle`, `text-muted` | `text-gray-700`, `text-[#4E4E55]` |
| Background | `bg-default`, `bg-subtle`, `bg-muted` | `bg-white`, `bg-[#437DFC]` |
| Border | `border-default`, `border-darker`, `border-strong` | `border-gray-200`, `border-[rgba(...)]` |

### Border Radius

Use: `rounded-none`, `rounded-2xs`, `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`

NOT: `rounded-[5px]` or other arbitrary values.

## Component Patterns

- **No `darkMode` prop** — dark mode is handled via CSS variables and `data-theme` attribute
- **Use `<AspectRatio>`** for images/media instead of `aspect-[...]` CSS classes
- **Use `font-body`** on all text elements

## Code Comments

- Minimize comments; code should be self-documenting
- If a comment is truly necessary, write it in Korean (not English)
- Exception: JSDoc for public API can be in English

## After Making Changes

Always run:
```bash
npm run typecheck && npm run lint
```
