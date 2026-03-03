# Performance Optimization TODO

## Problem
Consuming projects experience slow startup when importing the design system.

## Root Causes — RESOLVED in v0.2.0

### 1. CSS bundle — 1.3MB → ~0.8MB ✅
- Tailwind content scanning scoped to components/hooks/lib only
- `import './index.css'` removed from barrel (consumers import CSS separately)

### 2. Icons — 120MB in dist → ~40MB ✅
- Source maps excluded via .npmignore (-48MB)
- Icon .d.ts files excluded from generation (-18MB)
- Declaration maps disabled (-4,462 files)
- BrandIcon/FileIcon registries converted to React.lazy()
- Icon.tsx uses ui-icon-registry instead of glob imports (318KB → ~5KB)

### 3. Barrel export loads everything → Subpath exports added ✅
- Granular `exports` in package.json for subpath imports
- `import { Button } from '@blumnai-studio/blumnai-design-system/button'` now works
- Existing barrel import still supported for backward compatibility
