# Vanilla Extract → Tailwind CSS Migration Plan

## Overview
This document outlines the incremental migration strategy from Vanilla Extract to Tailwind CSS for the blumnai-design-system project.

## Current State
- **Styling System**: Vanilla Extract (`@vanilla-extract/css`)
- **Components with CSS Files**:
  - `src/components/avatar/Avatar/Avatar.css.ts` (633 lines)
  - `src/components/accordion/AccordionItem/AccordionItem.css.ts`
  - `src/components/avatar/AvatarGroup/AvatarGroup.css.ts`
- **Design Tokens**: Color, spacing, radius, typography, effects tokens
- **Total CSS Files**: 3 files discovered

## Migration Strategy

### Phase 1: Setup & Foundation ✅
- [x] Install Tailwind CSS, PostCSS, Autoprefixer
- [x] Create `tailwind.config.js`
- [x] Create `postcss.config.js`
- [x] Add Tailwind directives to `src/index.css`
- [ ] Configure Tailwind with design tokens
- [ ] Update Vite config if needed
- [ ] Test Tailwind is working

### Phase 2: Design Tokens Integration
- [ ] Map color tokens to Tailwind theme (incremental - as needed per component)
- [ ] Map spacing tokens to Tailwind theme (spacing.ts is currently empty)
- [ ] Map radius tokens to Tailwind theme
- [ ] Map typography tokens to Tailwind theme
- [ ] Map effects tokens to Tailwind theme
- [ ] Create custom Tailwind utilities for complex patterns
- **Note**: We'll integrate tokens incrementally as we migrate components, using Tailwind's arbitrary values initially, then optimizing with theme extensions

### Phase 3: Component Migration (Incremental)

#### Priority Order:
1. **Avatar Component** (Proof of Concept)
   - Most complex component
   - Will establish patterns for others
   - Status: In Progress

2. **Accordion Component**
   - Simpler structure
   - Good for validating patterns

3. **Icon Components**
   - Mostly utility classes
   - Straightforward conversion

4. **Other Components** (as discovered)

### Phase 4: Cleanup
- [ ] Remove Vanilla Extract dependencies
- [ ] Remove all `.css.ts` files
- [ ] Update documentation
- [ ] Update Storybook configuration if needed

## Migration Patterns

### Pattern 1: Static Styles → Tailwind Classes
**Before (Vanilla Extract):**
```typescript
export const container = style({
  position: 'relative',
  display: 'inline-flex',
  flexShrink: 0,
  padding: '2px',
});
```

**After (Tailwind):**
```tsx
<div className="relative inline-flex shrink-0 p-0.5">
```

### Pattern 2: Dynamic Styles → Conditional Classes
**Before (Vanilla Extract):**
```typescript
const className = useMemo(() => {
  const classes = [styles.container];
  if (darkMode) classes.push(styles.dark);
  return classes.join(' ');
}, [darkMode]);
```

**After (Tailwind):**
```tsx
<div className={cn("base-classes", darkMode && "dark-mode-classes")}>
```

### Pattern 3: Size Variants → Tailwind Arbitrary Values or Config
**Before (Vanilla Extract):**
```typescript
export const sizeMd = style({
  width: `${sizes.md.ring}px`,
  height: `${sizes.md.ring}px`,
});
```

**After (Tailwind):**
```tsx
// Option 1: Arbitrary values
<div className="w-[36px] h-[36px]">

// Option 2: Custom Tailwind config
// In tailwind.config.js, extend theme with sizes
<div className="w-md-ring h-md-ring">
```

### Pattern 4: Complex Calculations → Tailwind Utilities or Custom Classes
**Before (Vanilla Extract):**
```typescript
export const ring = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});
```

**After (Tailwind):**
```tsx
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
```

## Design Tokens Mapping

### Colors
- Map `color.palette.*` to Tailwind color palette
- Map `color.text.*` to Tailwind text colors
- Map `color.bg.*` to Tailwind background colors
- Map `color.border.*` to Tailwind border colors

### Spacing
- Map spacing tokens to Tailwind spacing scale
- Use arbitrary values for non-standard spacing

### Radius
- Map radius tokens to Tailwind border radius utilities

### Typography
- Map font sizes to Tailwind text sizes
- Map font weights to Tailwind font weights
- Map line heights to Tailwind leading utilities

## Tools & Utilities Needed

### 1. `cn()` utility (clsx + tailwind-merge)
For conditional class names:
```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 2. Custom Tailwind Plugins (if needed)
For complex patterns that don't map well to utilities.

## Testing Strategy

1. **Visual Regression**: Compare before/after in Storybook
2. **Component Tests**: Ensure functionality unchanged
3. **Token Verification**: Ensure design tokens are correctly applied
4. **Performance**: Monitor bundle size impact

## Progress Tracking

### Completed
- [x] Phase 1: Setup & Foundation
  - [x] Install Tailwind CSS, PostCSS, Autoprefixer
  - [x] Create `tailwind.config.js`
  - [x] Create `postcss.config.js`
  - [x] Add Tailwind directives to `src/index.css`
  - [x] Install `clsx` and `tailwind-merge` for `cn()` utility
  - [x] Create `src/utils/cn.ts` utility function

### In Progress
- [ ] Phase 2: Design Tokens Integration (incremental)
- [x] Phase 3: Avatar Component Migration (Proof of Concept) ✅ COMPLETED
  - See `src/components/avatar/Avatar/MIGRATION_SUMMARY.md` for details

### Pending
- [ ] Accordion Component Migration
- [ ] AvatarGroup Component Migration
- [ ] Design tokens full integration
- [ ] Phase 4: Cleanup

## Notes
- Keep Vanilla Extract files until migration is complete
- Test each component thoroughly before moving to next
- Document any patterns or gotchas discovered
- Update this plan as we learn from the migration
