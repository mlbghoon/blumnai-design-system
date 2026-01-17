# Icon Code Generation Plan

## 📋 Overview

This plan outlines the migration from manually maintained TSX icon files to a code generation approach where SVG assets serve as the source of truth, and TSX components are automatically generated.

## 🎯 Goals

1. **Maintain current benefits**: Type safety, tree-shaking, IDE autocomplete, lazy loading
2. **Improve maintainability**: Single source of truth (SVG files), easier to add/update icons
3. **Align with Figma workflow**: Export SVGs from Figma → Run script → Generate components
4. **Reduce manual work**: Eliminate 3,792 manually maintained TSX wrapper files
5. **Enable future automation**: Potential for Figma plugin integration

## 📊 Current State Analysis

### Current Structure

```
src/icons/
├── Icon.tsx              # Base wrapper component
├── Icon.types.ts         # Type definitions
├── index.ts              # Main exports
├── arrows/               # 178 icons
│   ├── ArrowDownIcon.tsx
│   ├── ArrowUpIcon.tsx
│   └── index.ts
├── brands/               # 119 icons
├── buildings/            # 62 icons
├── ...                   # 24 categories total
└── source/               # Existing source data (JSON files from Figma)
```

### Current Icon File Pattern

```typescript
// src/icons/arrows/ArrowDownIcon.tsx
import type { Props } from "../Icon.types";
import { Icon } from "../Icon";

export const ArrowDownIcon = (props: Props) => {
  return (
    <Icon {...props}>
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="..." />
      </svg>
    </Icon>
  );
};
```

### Statistics

- **Total icon files**: ~3,792 TSX files
- **Total lines**: ~51,890 lines (mostly boilerplate)
- **Categories**: 24 categories
- **Average file size**: ~14 lines per file
- **Boilerplate overhead**: ~8 lines per file (60% overhead)

## 🏗️ Proposed Architecture

### New Structure

```
src/icons/
├── Icon.tsx              # Base wrapper (unchanged)
├── Icon.types.ts         # Type definitions (unchanged)
├── index.ts              # Generated exports
├── svg-source/           # SVG source files (NEW - source of truth)
│   │                     # Note: Using svg-source/ instead of source/ to avoid conflict with existing JSON files
│   ├── arrows/
│   │   ├── arrow-down.svg
│   │   ├── arrow-down-circle.svg
│   │   └── ...
│   ├── brands/
│   │   ├── brand-apple.svg
│   │   └── ...
│   └── ...               # All 24 categories
├── source/               # Existing JSON metadata (preserved)
├── arrows/               # Generated TSX files
│   ├── ArrowDownIcon.tsx (GENERATED)
│   ├── ArrowUpIcon.tsx   (GENERATED)
│   └── index.ts          (GENERATED)
├── brands/               # Generated TSX files
└── ...                   # All 24 categories (GENERATED)
```

### Workflow

```
1. Design in Figma
2. Export SVGs to src/icons/svg-source/{category}/
3. Run: npm run generate:icons
4. Generated files appear in src/icons/{category}/
5. TypeScript/React compilation picks up changes
```

## 📝 Implementation Phases

### Phase 1: Setup & Preparation (1-2 days)

#### 1.1 Create Source Directory Structure

- [ ] Create `src/icons/svg-source/` directory
  - **Note**: Using `svg-source/` instead of `source/` to avoid conflict with existing `source/` directory containing JSON files
- [ ] Create category subdirectories matching current structure
- [ ] Document naming conventions:
  - Figma names: `arrow-down` (kebab-case)
  - Component names: `ArrowDownIcon` (PascalCase)
  - File names: `ArrowDownIcon.tsx`

#### 1.2 Create Extraction Script

- [ ] Create `scripts/extract-icons-to-svg.mjs`
- [ ] Script reads existing TSX files
- [ ] Extracts SVG content from each file
- [ ] Saves to `src/icons/svg-source/{category}/{kebab-name}.svg`
- [ ] Handles special cases (viewBox, xmlns, fill attributes)
- [ ] Preserves Figma metadata comments if present

**Script Logic:**

```javascript
// Pseudo-code
for each category folder:
  for each .tsx file:
    1. Read file content
    2. Extract SVG element (regex or AST parsing)
    3. Clean SVG (remove inline styles if needed, normalize)
    4. Convert component name → kebab-case (remove "Icon" suffix first)
       - `ArrowDownIcon` → `arrow-down` (not `arrow-down-icon`)
       - `BrandAppleIcon` → `brand-apple` (not `brand-apple-icon`)
    5. Save as SVG file in svg-source/{category}/
    6. Log extracted icons
```

#### 1.3 Run Initial Extraction

- [ ] Run extraction script on all existing icons
- [ ] Verify all 3,792 icons extracted correctly
- [ ] Validate SVG files are valid XML
- [ ] Verify extracted filenames match expected kebab-case (without "Icon" suffix)
- [ ] Check for edge cases:
  - Multi-line SVGs
  - SVGs with comments
  - SVGs with width/height attributes
  - SVGs with various fill attributes
  - Component names with numbers or special patterns

### Phase 2: Generation Script Development (2-3 days)

#### 2.1 Core Generation Script

- [ ] Create `scripts/generate-icons.mjs`
- [ ] Read all SVG files from `src/icons/svg-source/`
- [ ] For each SVG:
  - Parse SVG content
  - Convert kebab-case filename → PascalCase component name
  - Generate TSX component following current pattern
  - Write to `src/icons/{category}/{ComponentName}.tsx`

**Generation Template:**

```typescript
import type { Props } from "../Icon.types";
import { Icon } from "../Icon";

export const ComponentName = (props: Props) => {
  return <Icon {...props}>{SVG_CONTENT}</Icon>;
};
```

#### 2.2 Name Conversion Logic

- [ ] Implement kebab-case → PascalCase conversion
  - `arrow-down` → `ArrowDownIcon`
  - `arrow-down-circle` → `ArrowDownCircleIcon`
  - `brand-apple` → `BrandAppleIcon`
  - `user & faces` category → handle spaces/special chars (use exact folder name)
- [ ] Handle edge cases:
  - Numbers in names (e.g., `Arrow2Icon` → `arrow-2`)
  - Special characters in category names (e.g., `user & faces`, `health & medical`)
  - Reserved keywords (convert to safe names)
  - Component names ending with "Icon" (already handled, but document it)

#### 2.3 SVG Processing

- [ ] Normalize SVG attributes:
  - Ensure `viewBox` is present (if missing, extract from width/height or report error)
  - Ensure `xmlns="http://www.w3.org/2000/svg"` is present
  - Remove `width`/`height` attributes (handled by Icon component via `size` prop)
  - Handle `fill` attributes carefully:
    - **Root SVG element**: The `Icon` component will override `fill` on the root `<svg>` element, so root-level `fill` attributes can be removed (they're redundant)
    - **Child elements** (paths, circles, etc.):
      - **Preserve** `fill="none"` (required for outline icons)
      - **Preserve** specific colors like `fill="black"` (required for brands/fixed-color icons)
      - Remove `fill="currentColor"` from child elements only if it's truly redundant
- [ ] Preserve important attributes:
  - `viewBox`
  - `xmlns`
  - Path data
- [ ] Format SVG for readability (optional, but helpful)

#### 2.4 Index File Generation

- [ ] Generate `index.ts` for each category
- [ ] Export all components from category
- [ ] Update main `src/icons/index.ts` to re-export all categories
- [ ] **Important**: Use quotes for category names with spaces in export statements:
  - `export * from './health & medical';` (quotes required)
  - `export * from './user & faces';` (quotes required)

**Generated index.ts pattern:**

```typescript
export { ArrowDownIcon } from "./ArrowDownIcon";
export { ArrowUpIcon } from "./ArrowUpIcon";
// ... all icons in category
```

#### 2.5 Type Generation (Optional Enhancement)

- [ ] Generate `IconName` union type for type-safe icon names
- [ ] Can be used for future dynamic icon component
- [ ] Stored in `Icon.types.ts` or separate file

### Phase 3: Migration & Validation (2-3 days)

#### 3.1 Test Generation

- [ ] Run generation script on subset of icons (one category)
- [ ] Compare generated files with original files
- [ ] Verify:
  - File structure matches
  - SVG content is identical
  - Component exports work
  - TypeScript compilation succeeds
  - Storybook still works
  - Tree-shaking still works

#### 3.2 Full Generation

- [ ] Run generation for all categories
- [ ] Verify all 3,792 icons generated
- [ ] Check for errors/warnings
- [ ] Validate file counts match

#### 3.3 Testing

- [ ] Run TypeScript compilation: `npm run typecheck`
- [ ] Run Storybook: `npm run storybook`
- [ ] Test lazy loading still works
- [ ] Verify tree-shaking (check bundle sizes)
- [ ] Test in consuming apps (if any)

#### 3.4 Cleanup

- [ ] Mark old TSX files as deprecated (optional, or delete immediately)
- [ ] Update `.gitignore` to exclude generated files (if desired)
- [ ] Or commit generated files (recommended for reliability)

### Phase 4: Automation & Documentation (1 day)

#### 4.1 npm Scripts

- [ ] Add to `package.json`:
  ```json
  {
    "scripts": {
      "generate:icons": "node scripts/generate-icons.mjs",
      "extract:icons": "node scripts/extract-icons-to-svg.mjs",
      "prebuild": "npm run generate:icons",
      "prestorybook": "npm run generate:icons"
    }
  }
  ```

#### 4.2 Documentation

- [ ] Update `README.md` with:
  - New workflow for adding icons
  - Script usage instructions
  - Figma export guidelines
- [ ] Create `ICON_CONTRIBUTING.md`:
  - How to add new icons
  - How to update existing icons
  - Naming conventions
  - Troubleshooting

#### 4.3 CI/CD Integration (Optional)

- [ ] Add pre-commit hook to ensure icons are generated
- [ ] Or add CI check to verify icons are up to date
- [ ] Ensure generated files are committed (or ensure generation runs before build)

## 🔧 Script Design Details

### Script 1: `extract-icons-to-svg.mjs`

**Purpose**: Extract SVGs from existing TSX files to create source files

**Input**:

- `src/icons/**/*.tsx` (excluding `Icon.tsx`, `Icon.types.ts`, `index.ts`, `Icons.stories.tsx`, and root-level re-export files like `ArrowDownCircleFillIcon.tsx`)

**Output**:

- `src/icons/svg-source/{category}/{kebab-name}.svg`

**Logic**:

1. Scan all category directories
2. For each `.tsx` file:
   - Read file content
   - Extract component name (`export const ComponentName`)
   - Remove "Icon" suffix: `ArrowDownIcon` → `ArrowDown`
   - Convert to kebab-case (`ArrowDown` → `arrow-down`)
   - Extract SVG element (use proper XML/HTML parser, not simple regex)
     - Simple regex `<svg[^>]*>.*?</svg>` won't work for nested structures
     - Need to handle multi-line SVGs, comments, etc.
   - Clean SVG (remove inline styles, normalize attributes)
   - Write to `svg-source/{category}/{kebab-name}.svg`
3. Generate manifest/count of extracted icons
4. Report any issues (missing SVGs, parsing errors)

**Edge Cases**:

- Multi-line SVGs (need proper parser, not regex)
- SVGs with comments (preserve or strip?)
- SVGs with complex nested structures
- Missing viewBox (extract from width/height or require it)
- Invalid SVG structure (report errors)
- SVGs with `width`/`height` attributes (remove, handled by Icon)
- Root SVG with `fill` attributes (can be removed - Icon component overrides)
- Child elements with `fill="none"` (preserve - important for outline icons)
- Child elements with specific fill colors like `fill="black"` (preserve - brands/icons need fixed colors)
- Component names with numbers (e.g., `Arrow2Icon` → `arrow-2`)

### Script 2: `generate-icons.mjs`

**Purpose**: Generate TSX component files from SVG source files

**Input**:

- `src/icons/svg-source/**/*.svg`

**Output**:

- `src/icons/{category}/{ComponentName}.tsx`
- `src/icons/{category}/index.ts`
- Updated `src/icons/index.ts`

**Logic**:

1. Scan `src/icons/svg-source/` directory
2. For each category:
   - Read all `.svg` files
   - For each SVG:
     - Parse filename (kebab-case)
     - Convert to component name (PascalCase + "Icon")
     - Read SVG content
     - Generate TSX component using template
     - Write to `src/icons/{category}/{ComponentName}.tsx`
   - Generate `index.ts` with all exports
3. Update main `src/icons/index.ts` with category exports
   - **Important**: Use quotes for category names with spaces:
     - `export * from './health & medical';`
     - `export * from './user & faces';`
4. Generate summary report

**Name Conversion Examples**:

```javascript
arrow-down.svg           → ArrowDownIcon.tsx
arrow-down-circle.svg    → ArrowDownCircleIcon.tsx
arrow-2.svg              → Arrow2Icon.tsx  (numbers preserved)
brand-apple.svg          → BrandAppleIcon.tsx
user-add.svg             → UserAddIcon.tsx
arrow-down-s.svg         → ArrowDownSIcon.tsx  (single letter suffixes)
```

**Important**: The conversion adds "Icon" suffix, so kebab-case names should NOT include "icon" suffix.

**SVG Processing**:

- Read SVG content
- Normalize:
  - Ensure `viewBox` attribute
  - Ensure `xmlns="http://www.w3.org/2000/svg"`
  - Remove `width`/`height` (handled by Icon component)
  - Handle `fill` attributes carefully:
    - **Root SVG element**: The `Icon` component overrides `fill` on root `<svg>`, so root-level `fill` can be removed
    - **Child elements** (paths, circles, etc.):
      - **Preserve** `fill="none"` (important for outline icons)
      - **Preserve** specific colors like `fill="black"` (brands/icons with fixed colors)
      - Remove `fill="currentColor"` from child elements only if truly redundant
  - Preserve important attributes
- Format for readability (optional)

## 📦 File Structure Details

### Source Directory (`src/icons/svg-source/`)

**Note**: Using `svg-source/` instead of `source/` to avoid conflict with existing `source/` directory that contains JSON metadata files.

```
source/
├── arrows/
│   ├── arrow-down.svg
│   ├── arrow-down-circle.svg
│   └── ... (178 SVG files)
├── brands/
│   ├── brand-apple.svg
│   └── ... (119 SVG files)
└── ... (all 24 categories)
```

**Naming Convention**:

- Use kebab-case matching Figma names
- Filename should match Figma component name
- Example: `arrow-down-circle.svg` for Figma's "arrow-down-circle"

### Generated Directory (`src/icons/{category}/`)

**Structure matches current structure exactly**:

- TSX files: `ComponentNameIcon.tsx`
- Index file: `index.ts` (auto-generated)
- All files marked with comment: `// This file is auto-generated. Do not edit manually.`

## 🔄 Migration Strategy

### Option A: Big Bang Migration (Recommended)

1. Run extraction script → creates source files
2. Run generation script → generates all TSX files
3. Delete old TSX files
4. Commit everything
5. Update scripts/documentation

**Pros**: Clean break, easier to verify
**Cons**: Large PR, need thorough testing

### Option B: Gradual Migration

1. Run extraction script
2. For each category (one at a time):
   - Generate new files
   - Test category
   - Delete old files
   - Commit
3. Continue until all migrated

**Pros**: Smaller, incremental changes
**Cons**: Longer process, more commits

**Recommendation**: Option A with thorough testing in a feature branch

## ✅ Testing Strategy

### Unit Tests

- [ ] Test name conversion (kebab → PascalCase)
- [ ] Test SVG parsing/normalization
- [ ] Test file generation
- [ ] Test index file generation

### Integration Tests

- [ ] Generated files compile with TypeScript
- [ ] All icons import correctly
- [ ] Exports work as expected
- [ ] Tree-shaking still works (check bundle sizes)

### Manual Testing

- [ ] Storybook loads all icons
- [ ] Lazy loading still works
- [ ] Icons render correctly
- [ ] No visual regressions
- [ ] Performance is maintained

### Validation Script

Create `scripts/validate-icons.mjs`:

- Count generated files vs source files
- Verify all categories are generated
- Check for missing exports
- Validate SVG syntax in generated files

## 📚 Documentation Requirements

### README Updates

- New workflow section
- Script usage
- Icon contribution guidelines

### Contributing Guide

- How to add new icons from Figma
- How to update existing icons
- Naming conventions
- Troubleshooting common issues

### Script Documentation

- JSDoc comments in scripts
- Command-line help
- Example usage

## 🚀 Rollout Plan

### Pre-rollout

1. Create feature branch: `feat/icon-code-generation`
2. Complete all phases
3. Test thoroughly
4. Get code review

### Rollout

1. Merge to main
2. Run extraction + generation
3. Verify everything works
4. Update documentation
5. Announce to team

### Post-rollout

1. Monitor for issues
2. Gather feedback
3. Iterate on scripts if needed
4. Consider automation improvements (Figma plugin, etc.)

## 🎯 Success Criteria

- [ ] All 3,792 icons successfully extracted to source
- [ ] All icons successfully generated as TSX files
- [ ] Generated files are functionally identical to originals
- [ ] TypeScript compilation succeeds
- [ ] Storybook works with generated icons
- [ ] Lazy loading still works
- [ ] Tree-shaking still works
- [ ] Bundle sizes remain similar or improve
- [ ] Documentation is complete
- [ ] Team can easily add/update icons

## 🔮 Future Enhancements

### Potential Improvements

1. **Figma Plugin Integration**: Auto-export SVGs from Figma
2. **Watch Mode**: Auto-regenerate on SVG changes
3. **Type Generation**: Generate `IconName` union type
4. **SVG Optimization**: Minify/optimize SVGs during generation
5. **Validation**: Validate SVG files for common issues
6. **Hot Reload**: Auto-refresh Storybook on regeneration

### Alternative Approaches to Consider Later

1. **Single Dynamic Component**: Use generated `IconName` type with dynamic imports
2. **SVG Sprite**: Generate SVG sprite sheet
3. **Icon Font**: Generate icon font from SVGs

## 📝 Implementation Checklist

### Phase 1: Setup

- [ ] Create source directory structure
- [ ] Write extraction script
- [ ] Test extraction on one category
- [ ] Run full extraction
- [ ] Verify extracted SVGs

### Phase 2: Generation

- [ ] Write generation script
- [ ] Implement name conversion
- [ ] Implement SVG processing
- [ ] Implement index generation
- [ ] Test on one category

### Phase 3: Migration

- [ ] Generate all icons
- [ ] Verify file counts
- [ ] Run TypeScript compilation
- [ ] Test Storybook
- [ ] Test lazy loading
- [ ] Validate tree-shaking

### Phase 4: Automation

- [ ] Add npm scripts
- [ ] Update documentation
- [ ] Create contributing guide
- [ ] Test full workflow

### Phase 5: Cleanup

- [ ] Remove old files (if doing big bang)
- [ ] Update .gitignore if needed
- [ ] Final verification
- [ ] Merge to main

## 🐛 Risk Mitigation

### Potential Issues & Solutions

1. **SVG Parsing Errors**

   - Solution: Robust regex/AST parsing, handle edge cases
   - Fallback: Manual fixes for problematic icons

2. **Name Conversion Issues**

   - Solution: Comprehensive test cases, handle edge cases
   - Fallback: Manual mapping file for special cases

3. **Generated Files Don't Match Originals**

   - Solution: Diff comparison script, manual review
   - Fallback: Keep old files as backup initially

4. **Performance Regression**

   - Solution: Compare bundle sizes, test lazy loading
   - Fallback: Optimize generation script

5. **Breaking Changes for Consumers**
   - Solution: Maintain exact same exports/API
   - Fallback: Version documentation

## 📞 Questions to Resolve

1. **Should generated files be committed?**

   - ✅ Yes (recommended): Ensures consistent builds, easier for consumers
   - ❌ No: Requires generation in build process

2. **Should we delete old TSX files immediately?**

   - ✅ Yes: Clean break, easier maintenance
   - ❌ No: Keep as backup initially

3. **Should we add pre-commit hooks?**

   - ✅ Yes: Ensure icons are always generated
   - ❌ No: Manual generation (simpler)

4. **Should we optimize SVGs during generation?**
   - ✅ Yes: Smaller bundle sizes
   - ❌ No: Preserve original SVGs exactly

---

**Next Steps**: Review this plan, provide feedback, then begin Phase 1 implementation.
