---
name: blumnai-design-system
description: Blumnai Design System — React component library with 40+ components, 4 themes, and accessibility support
globs:
  - "**/*.tsx"
  - "**/*.ts"
  - "**/*.jsx"
  - "**/*.js"
---

# Blumnai Design System

Package: `@mlbghoon/blumnai-design-system`

## Install

```bash
npm install @mlbghoon/blumnai-design-system --legacy-peer-deps
```

## Setup

```tsx
// 1. Import CSS once in your app entry point
import '@mlbghoon/blumnai-design-system/styles';

// 2. Import components
import { Button, Input, Select } from '@mlbghoon/blumnai-design-system';

// Or use subpath imports for tree-shaking
import { Button } from '@mlbghoon/blumnai-design-system/button';
import { Input } from '@mlbghoon/blumnai-design-system/input';
```

## Quick Examples

```tsx
// Button
<Button buttonStyle="primary" size="md">Save</Button>
<Button buttonStyle="destructive" leadIcon={['system', 'delete']}>Delete</Button>

// Input
<Input variant="default" label="Email" placeholder="you@example.com" />
<Input variant="password" label="Password" showStrength />

// Select
<Select variant="default" label="Country" options={[
  { id: 'us', label: 'United States' },
  { id: 'kr', label: 'South Korea' },
]} />

// Dialog
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader>
    <p>Content here</p>
    <DialogFooter>
      <Button buttonStyle="primary" onClick={() => setOpen(false)}>OK</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Toast
toast.success('Saved!');
```

## Themes

Set `data-theme` on `<html>` or any container:

| Theme | Attribute |
|-------|-----------|
| Light (default) | — |
| Dark | `data-theme="dark"` |
| Theme-B Light | `data-theme="theme-b-light"` |
| Theme-B Dark | `data-theme="theme-b-dark"` |

## References

- `AI.md` (package root) — Single source of truth for all component props, patterns, and documentation. Read the Section Index at the top, then search `### ComponentName` to jump to any section.
