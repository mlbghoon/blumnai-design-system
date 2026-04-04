---
name: component-audit
description: Audit existing components for DS guideline violations. Invoke when user says "audit", "check violations", "scan component", or wants to review DS compliance of existing code.
allowed-tools: Bash, Read, Glob, Grep
---

# Component Audit

Scan existing component code for DS guideline violations and produce a structured report.

## When to Invoke

- User asks to "audit" a component or set of components
- User wants to check DS compliance of existing code
- User asks to "scan for violations" or "find violations"
- Before a release, to verify DS consistency

## Input

Component name (e.g., `dialog`, `select`, `tooltip`) or `all` for full codebase scan.

## Execution

### Step 1: Locate Files

```bash
find src/components/{name}/ -type f \( -name "*.tsx" -o -name "*.ts" \) | sort
```

Separate into:
- **Component files**: `.tsx` (not `.stories.tsx`)
- **Type files**: `.types.ts`
- **Story files**: `.stories.tsx`
- **Other**: `index.ts`, hooks, utils

### Step 2: Run Violation Scans

Run these greps against **component files** (not stories). Use `grep -n` to get line numbers.

#### Typography (CRITICAL)
```bash
# Tailwind text-size classes (should be size-sm, size-md, etc.)
grep -nE '\btext-(xs|sm|base|lg|xl|2xl)\b' FILE
# Exception: text-default, text-subtle, text-muted, text-hint are OK (color classes)
# Exception: text-destructive, text-primary, text-state-* are OK (semantic)

# Undefined DS size classes
grep -nE '\bsize-2xs\b' FILE
```

#### Spacing (CRITICAL)
```bash
# Tailwind default spacing (should be padding-*, ds-gap-*, width-*, height-*)
grep -nE '\b(p|px|py|pt|pb|pl|pr)-[0-9]+\b' FILE
grep -nE '\bgap-[0-9]+\b' FILE
grep -nE '\b(w|h)-[0-9]+\b' FILE
grep -nE '\b(mt|mb|ml|mr|mx|my)-[0-9]+\b' FILE
# Exception: w-full, h-full, w-0, h-0, h-px are layout utilities (OK)
# Exception: w-auto, h-auto are OK
```

#### Colors (CRITICAL)
```bash
# Tailwind gray scale (should be bg-default, bg-subtle, text-default, etc.)
grep -nE '\b(bg|text|border)-gray-[0-9]+\b' FILE
grep -nE '\bbg-white\b' FILE
# Arbitrary hex colors
grep -nE '\b(bg|text|border)-\[#[0-9a-fA-F]+\]\b' FILE
```

#### Shadow (CRITICAL)
```bash
# Tailwind default shadows (should be shadow-card, shadow-modal-sm/md/lg)
grep -nE '\bshadow-(sm|md|lg|xl|2xl)\b' FILE
# Arbitrary shadow values
grep -nE '\bshadow-\[' FILE
```

#### Border Radius
```bash
# Arbitrary radius values
grep -nE '\brounded-\[[0-9]+px\]\b' FILE
```

#### Interaction
```bash
# transition-all (should be transition-colors or specific)
grep -nE '\btransition-all\b' FILE
```

#### Font Weight
```bash
# Forbidden weights (only font-normal, font-medium, font-semibold allowed)
grep -nE '\bfont-(bold|light|thin|extrabold|extralight|black)\b' FILE
```

#### Comments
```bash
# English inline comments (not JSDoc, not eslint-disable)
grep -nE '^\s*//\s*[A-Z][a-z]' FILE
# Filter out: eslint-disable, @ts-, TODO/FIXME (acceptable)
```

### Step 3: Run Story-Specific Scans

Against **story files** only:

```bash
# Args spreading in render (should set props explicitly)
grep -nE '\{\.\.\.args\}' FILE

# Arbitrary hex colors in inline styles
grep -nE "color:\s*'#[0-9a-fA-F]+" FILE

# font-bold in stories
grep -nE '\bfont-bold\b' FILE
```

### Step 4: Check Structure

- [ ] `.types.ts` file exists with Korean JSDoc
- [ ] `index.ts` exports component and types
- [ ] Story file exists with controls disabled at meta, enabled on Default
- [ ] If floating component: uses `usePortalContainer()`

### Step 5: Produce Report

Output in this format:

```
## Audit: {ComponentName}

### Component Code Violations
| # | File:Line | Code | Rule | Severity | Fix |
|---|-----------|------|------|----------|-----|
| 1 | Dialog.tsx:261 | font-bold | font-normal/medium/semibold only | High | → font-semibold |

### Story Violations
| # | File:Line | Code | Rule | Severity |
|---|-----------|------|------|----------|

### Structure
- Types: ✅/❌
- Exports: ✅/❌
- Stories: ✅/❌
- PortalContainer: ✅/❌/N/A

### Grade: A/B/C/D/F

### Summary
(1-2 sentences)
```

## Severity Levels

| Severity | Meaning | Examples |
|----------|---------|---------|
| **High** | DS class violation in component code | `font-bold`, `text-sm`, `p-4`, `shadow-md` |
| **Medium** | Arbitrary values, missing patterns | `shadow-[...]`, missing PortalContainer |
| **Low** | Story-only issues, English comments | `font-bold` in stories, `{...args}` |

## Grading

| Grade | Criteria |
|-------|----------|
| A | 0 High, ≤2 Low violations |
| A- | 0 High, ≤5 Low or ≤2 Medium |
| B+ | ≤1 High or ≤3 Medium |
| B | ≤2 High or ≤5 Medium |
| C | 3+ High violations |
| D/F | Pervasive violations across multiple categories |

## Batch Mode

When auditing multiple components or `all`:

1. Loop through each component directory in `src/components/`
2. Run all scans per component
3. Append to a summary table:

```
## Batch Audit Summary

| Component | Grade | High | Med | Low | Top Issue |
|-----------|-------|------|-----|-----|-----------|
| dialog | B+ | 1 | 1 | 3 | font-bold in TITLE_WEIGHT |
| select | B+ | 1 | 0 | 30 | font-bold + English comments |
```

4. End with a cross-reference of most common violation types
