---
name: design-system-rules
description: Core rules for Blumnai design system. Auto-reference when styling components or using CSS classes.
user-invocable: true
---

# Blumnai Design System Rules

**Core typography, spacing, color, and radius rules are in CLAUDE.md (always loaded).** This skill covers additional details not in CLAUDE.md.

## shadcn-origin Class Replacements

Some DS components were built from shadcn/ui. If you encounter leftover Tailwind defaults, replace them:

| Tailwind default | DS class |
|--------|-------------|
| `text-sm` | `size-sm` |
| `text-lg` | `size-lg` |
| `leading-none` | `line-height-leading-3` |
| `leading-normal` | `line-height-leading-5` |
| `tracking-tight` | `letter-spacing-tracking-tight` |
| `p-4` | `padding-16` |
| `px-4` | `padding-x-16` |
| `py-2` | `padding-y-8` |
| `gap-2` | `ds-gap-8` |
| `gap-4` | `ds-gap-16` |
| `h-9` | `height-36` |
| `h-10` | `height-40` |

Always ensure `font-body` is on text elements.

### shadcn Color Variables (mapped via bridge)

| shadcn Variable | Maps to |
|----------------|---------|
| `--primary` | `--bg-state-primary` |
| `--secondary` | `--bg-state-secondary` |
| `--destructive` | `--bg-state-destructive` |
| `--muted` | `--bg-muted` |
| `--accent` | `--bg-state-soft` |
| `--border` | `--border-default` |
| `--ring` | `--border-highlight` |

## Reference Files

- Typography utilities: `src/styles/utilities.css`
- Design tokens: `src/tokens/`
- shadcn bridge CSS: `src/styles/tokens/shadcn-bridge.css`
