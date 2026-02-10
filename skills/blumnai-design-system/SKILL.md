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

Package: `@mbisolution/blumnai-design-system`

## Install

```bash
npm install @mbisolution/blumnai-design-system
```

## Setup

```tsx
// 1. Import CSS once in your app entry point
import '@mbisolution/blumnai-design-system/styles';

// 2. Import components
import { Button, Input, Select } from '@mbisolution/blumnai-design-system';

// Or use subpath imports for tree-shaking
import { Button } from '@mbisolution/blumnai-design-system/button';
import { Input } from '@mbisolution/blumnai-design-system/input';
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
toast({ title: 'Saved!', variant: 'success' });
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

- `references/components.md` — Full component catalog with props
- `references/patterns.md` — Common copy-paste patterns (forms, dialogs, tables)
