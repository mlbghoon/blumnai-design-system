# Avatar Component Implementation Plan

## Overview

Complete rebuild of Avatar component following Figma structure exactly. All data has been collected from Figma using MCP tools.

---

## 1. Component Structure

### Hierarchy (from Figma):

```
Avatar Container (relative, size = sizes[size].ring)
  ├─ Ring (absolute, CENTERED using left: 50%, top: 50%, transform: translate(-50%, -50%), SVG image, white bg, size from sizes[size].ring)
  ├─ Image Container (absolute, inset-0, size from sizes[size].image, with border)
  │   └─ Content (varies by variant)
  │       ├─ Initials: text only (no Image wrapper)
  │       ├─ Empty: Image wrapper → placeholder icon
  │       └─ Userpic: Image wrapper → user image
  └─ Status Badge (absolute, variable size based on avatar size: 8px/10px/12px/16px/18px/20px, positioned by size/shape with variable offset)
```

---

## 2. TypeScript Types (Avatar.types.ts)

### New Props:

- **`color?: string`**: Color token for initials variant background
  - Type: `string` (accepts any color token value, e.g., `color.palette.red[500]`)
  - Default: `color.text.muted` (#6f6f77, gray)
  - Only used when `variant="initials"`

### Existing Props to Keep:

- `variant`: 'initials' | 'userpic' | 'empty'
- `size`: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
- `shape`: 'circular' | 'rounded'
- `initials`: string (for initials variant)
- `src`, `alt`: string (for userpic variant)
- `status`: 'online' | 'offline' | 'checkmark' | 'logo' | 'icon' | 'notification'
- `badgeLocation`: 'top' | 'bottom'
- `darkMode`: boolean

---

## 3. CSS Styles (Avatar.css.ts)

### A. Container Styles

- **`container`**:
  - `position: 'relative'`
  - `display: 'inline-flex'`
  - `flexShrink: 0`
  - `padding: '2px'` (for badge overflow)
  - Size: `sizes[size].ring` (use size classes)

### B. Ring Element (NEW)

- **`ring`**:
  - `position: 'absolute'`
  - **`left: '50%'`, `top: '50%'`, `transform: 'translate(-50%, -50%)'`** (CENTERED - NOT -2px offset)
  - `width: sizes[size].ring`, `height: sizes[size].ring`
  - Type: **SVG image** (not CSS shape)
  - Contains: `<img>` tag with SVG asset
  - Background color token: `bg/default` (white)
  - **Note: Ring is CENTERED using transform method - verified from Figma for all sizes**
  - Conditional: only render when needed (may need to check when)

### C. Image Container

- **`imageContainer`**:
  - `position: 'absolute'`
  - `inset: 0`
  - `width: sizes[size].image`, `height: sizes[size].image`
  - **`border: 1px solid ${color.border.default}`** (NEW - currently missing)
  - `borderWidth: '1px'`
  - `borderStyle: 'solid'`
  - `borderColor: color.border.default` (`rgba(39,39,42,0.1)` - semi-transparent, NOT solid `#27272a`)
  - `overflow: 'hidden'`
  - Border-radius: matches shape (circular = 9999px/50%, rounded = 6px)
  - Background: varies by variant
  - **Important**: Border uses token `color.border.default` with opacity, NOT solid `#27272a`

### D. Variant Backgrounds

- **`variantInitials`**: Uses `color` prop (default: `color.text.muted`)
- **`variantUserpic`**: `color.bg.muted`
- **`variantEmpty`**: `transparent` (or no background)

### E. Content Elements

- **`initials`**:

  - `position: 'absolute'`
  - `top: '50%'`, `transform: 'translateY(-50%)'`
  - `left: 'calc(0% - 1px)'`, `right: '-1px'`
  - `textAlign: 'center'`
  - `lineHeight: 0` (leading-0)
  - `color: color.text.white.default`
  - Font size: from `initialsSize{Size}` classes
  - `display: 'flex'`, `flexDirection: 'column'`, `justifyContent: 'center'`

- **`image`**:

  - `width: '100%'`, `height: '100%'`
  - `objectFit: 'cover'`

- **`imageWrapper`** (NEW for Empty/Userpic):
  - `position: 'absolute'`
  - `aspectRatio: '1/1'`
  - `top: '50%'`, `left: '50%'`, `transform: 'translate(-50%, -50%)'`
  - `width: '100%'` (with slight overflow for border)

### F. Status Badge

- **`statusBadge`**:
  - `position: 'absolute'`
  - `width: '16px'`, `height: '16px'` (fixed)
  - Position: from `statusBadgePositions[size][shape]`
  - `pointerEvents: 'none'`

#### Badge Variants:

1. **Online/Offline/Notification** (Ring + Dot pattern):

   - `statusBadgeRing`: `position: 'absolute'`, `inset: '12.5%'`
   - `statusBadgeRingSvg`: fills ring container
   - `statusBadgeDot`: `position: 'absolute'`, `inset: '20.83%'`, `zIndex: 1`
   - `statusBadgeDotSvg`: fills dot container

2. **Checkmark** (Outer + Inner pattern):

   - `statusBadgeCheckmarkOuter`: `position: 'absolute'`, `inset: 0`
   - `statusBadgeCheckmarkOuterSvg`: white wavy star shape
   - `statusBadgeCheckmarkVector`: `position: 'absolute'`, `inset: '8.33%'`, `zIndex: 1`
   - `statusBadgeCheckmarkVectorSvg`: blue checkmark

3. **Logo** (Outer + Inner pattern):

   - `statusBadgeLogoOuter`: `position: 'absolute'`, `inset: 0`
   - `statusBadgeLogoOuterSvg`: white circle
   - `statusBadgeLogoImage`: `position: 'absolute'`, `inset: '8.33%'`, `zIndex: 1`
   - Logo image passed as prop/child

4. **Icon** (Outer + Inner pattern):
   - `statusBadgeIconOuter`: `position: 'absolute'`, `inset: 0`
   - `statusBadgeIconOuterSvg`: white circle
   - `statusBadgeIconInner`: `position: 'absolute'`, `inset: '8.33%'`, `zIndex: 1`
   - Moon icon (can accept custom icon prop)

### G. Size Classes

- Container: `size{Size}` (uses `sizes[size].ring`)
- Image: `size{Size}Image` (uses `sizes[size].image`)
- Ring: `size{Size}Ring` (uses `sizes[size].ring`)
- Initials font size: `initialsSize{Size}` (already exists)

---

## 4. Component Logic (Avatar.tsx)

### A. Color Prop Handling

- Add `color?: string` to props
- Use for initials variant background: `backgroundColor: color || color.text.muted`
- Apply via inline style or dynamic CSS variable

### B. Ring Element

- Conditionally render Ring element (SVG image)
- **Position: `left: '50%'`, `top: '50%'`, `transform: 'translate(-50%, -50%)'`** (CENTERED - verified from Figma)
- Size: `sizes[size].ring` (20px for 2xs, 24px for xs, 28px for sm, 36px for md, 44px for lg, 52px for xl, 60px for 2xl, 68px for 3xl)
- Type: SVG image wrapper (`<img>` tag with SVG asset)
- Background: `color.bg.default` (white, applied to SVG)
- **Note: Ring is CENTERED - NOT positioned at -2px offset. This was verified from Figma for all 8 sizes.**

### C. Image Container Structure by Variant

#### Initials Variant:

```tsx
<div className={imageContainerClassName}>
  <span className={initialsClassName}>{initialsText}</span>
</div>
```

- NO Image wrapper element
- Text directly in image container

#### Empty Variant:

```tsx
<div className={imageContainerClassName}>
  <div className={styles.imageWrapper}>
    <img src={placeholderIcon} alt="" className={styles.image} />
  </div>
</div>
```

- HAS Image wrapper element
- Placeholder icon inside

#### Userpic Variant:

```tsx
<div className={imageContainerClassName}>
  <div className={styles.imageWrapper}>
    <img src={src} alt={alt} className={styles.image} />
  </div>
</div>
```

- HAS Image wrapper element
- User image inside

### D. Status Badge Implementation

- **Badge sizes are VARIABLE** based on avatar size: 8px (2xs), 10px (xs), 12px (sm, md), 16px (lg, xl), 18px (2xl), 20px (3xl)
- Badge size matches `sizes[size].statusBadge` values
- Position: use `statusBadgePositions[size][shape]` with variable offsets
- Implement 6 variants with correct layer structure
- **Note**: Badge structure examples below use 16×16 for illustration, but badges scale proportionally (internal elements scale with badge size via percentage-based insets)

#### Ring + Dot Pattern (Online, Offline, Notification):

**Badge Container (Variable size - example shown for 16px):**

```
<div className={statusBadge} style={{ width: sizes[size].statusBadge, height: sizes[size].statusBadge }}>
  {/* Note: Examples below use 16px calculations - percentages scale for all badge sizes */}
  {/* Ring at 12.5% inset = 12×12 container */}
  <div className={badgeRing}> {/* absolute, inset: 12.5% */}
    <div className={badgeRingInner}> {/* absolute, inset-0 */}
      <img src={ringSvg} width="12" height="12" alt="" />
    </div>
  </div>
  {/* Dot at 20.83% inset = 9.333×9.333 container */}
  <div className={badgeDot}> {/* absolute, inset: 20.83%, zIndex: 1 */}
    <div className={badgeDotInner}> {/* absolute, inset-0 */}
      <img src={dotSvg} width="9.333" height="9.333" alt="" />
    </div>
  </div>
</div>
```

**Detailed Structure:**

- **Badge Container**: `position: absolute`, `width: sizes[size].statusBadge`, `height: sizes[size].statusBadge` (variable: 8px/10px/12px/16px/18px/20px)
- **Note**: Examples show pixel values for 16px badge - percentages scale proportionally for all sizes
- **Ring Container**: `position: absolute`, `inset: 12.5%` (for 16px badge: creates 12×12 area, 2px from edges; scales proportionally)
- **Ring Inner**: `position: absolute`, `inset: 0`, `width: 100%`, `height: 100%` (fills 12×12)
- **Ring SVG**: `width: 12px`, `height: 12px`, white fill `rgba(255, 255, 255, 1)`
- **Dot Container**: `position: absolute`, `inset: 20.83%` (creates 9.333×9.333 area, 3.333px from edges), `zIndex: 1`
- **Dot Inner**: `position: absolute`, `inset: 0`, `width: 100%`, `height: 100%` (fills 9.333×9.333)
- **Dot SVG**: `width: 9.333px`, `height: 9.333px`, colored fill:
  - Online: `rgba(144, 205, 34, 1)` - green #90CD22
  - Offline: `rgba(39, 39, 42, 1)` - gray #27272a
  - Notification: `rgba(231, 67, 65, 1)` - red #e74341

**Inset Calculations (percentages scale for all badge sizes - example shown for 16px badge):**

- Ring: `inset: 12.5%` → For 16px badge: `16px × 12.5% = 2px` → Ring container: `top: 2px, left: 2px, width: 12px, height: 12px`
  - For 8px badge: `8px × 12.5% = 1px` → Ring container: `1px × 1px, width: 6px, height: 6px`
  - For 20px badge: `20px × 12.5% = 2.5px` → Ring container: `2.5px × 2.5px, width: 15px, height: 15px`
- Dot: `inset: 20.83%` → For 16px badge: `16px × 20.83% = 3.333px` → Dot container: `top: 3.333px, left: 3.333px, width: 9.333px, height: 9.333px`
  - Percentages scale proportionally for all badge sizes

#### Outer + Inner Pattern (Checkmark, Logo, Icon):

**Checkmark Badge Structure:**

**Badge Container (Variable size - example shown for 16px):**

```
<div className={statusBadge} style={{ width: sizes[size].statusBadge, height: sizes[size].statusBadge }}>
  {/* Note: Examples below use 16px calculations - percentages scale for all badge sizes */}
  {/* Ring (outer white wavy star) at inset-0 = 16×16 */}
  <div className={badgeCheckmarkRing}> {/* absolute, inset-0 */}
    <img src={ringSvg} width="16" height="16" alt="" />
  </div>
  {/* Vector (inner blue checkmark) at 8.33% inset = 13.333×13.333 */}
  <div className={badgeCheckmarkVector}> {/* absolute, inset-[8.33%], zIndex: 1 */}
    <div className={badgeCheckmarkVectorInner}> {/* absolute, inset-0 */}
      <img src={vectorSvg} width="13.333" height="13.333" alt="" />
    </div>
  </div>
</div>
```

**Detailed Structure:**

- **Badge Container**: `position: absolute`, `width: sizes[size].statusBadge`, `height: sizes[size].statusBadge` (variable: 8px/10px/12px/16px/18px/20px)
- **Note**: Examples show pixel values for 16px badge - percentages scale proportionally for all sizes
- **Ring Container**: `position: absolute`, `inset: 0` (fills entire badge container)
- **Ring SVG**: `width: 16px`, `height: 16px`, white fill `rgba(255, 255, 255, 1)`, **wavy star shape** (not circle)
- **Vector Container**: `position: absolute`, `inset: 8.33%` (creates 13.333×13.333 area, 1.333px from edges), `zIndex: 1`
- **Vector Inner**: `position: absolute`, `inset: 0`, `width: 100%`, `height: 100%` (fills 13.333×13.333)
- **Vector SVG**: `width: 13.333px`, `height: 13.333px`, blue fill `rgba(67, 125, 252, 1)` - checkmark shape

**Inset Calculations (percentages scale for all badge sizes - example shown for 16px badge):**

- Ring: `inset-0` → For 16px badge: Ring container: `top: 0, left: 0, width: 16px, height: 16px` (fills entire badge)
- Vector: `inset: 8.33%` → For 16px badge: `16px × 8.33% = 1.333px` → Vector container: `top: 1.333px, left: 1.333px, width: 13.333px, height: 13.333px`
  - Percentages scale proportionally for all badge sizes (e.g., 8px badge: 8px × 8.33% = 0.667px)

**Logo Badge Structure:**

**Badge Container (Variable size - example shown for 16px):**

```
<div className={statusBadge} style={{ width: sizes[size].statusBadge, height: sizes[size].statusBadge }}>
  {/* Note: Examples below use 16px calculations - percentages scale for all badge sizes */}
  {/* Ring (outer white circle) at inset-0 = 16×16 */}
  <div className={badgeLogoRing}> {/* absolute, inset-0 */}
    <img src={ringSvg} width="16" height="16" alt="" />
  </div>
  {/* Image (inner logo PNG) at 8.33% inset = 13.333×13.333 */}
  <div className={badgeLogoImage}> {/* absolute, inset-[8.33%], zIndex: 1 */}
    <img src={logoImage} width="13.333" height="13.333" alt="" />
  </div>
</div>
```

**Detailed Structure:**

- **Badge Container**: `position: absolute`, `width: sizes[size].statusBadge`, `height: sizes[size].statusBadge` (variable: 8px/10px/12px/16px/18px/20px)
- **Note**: Examples show pixel values for 16px badge - percentages scale proportionally for all sizes
- **Ring Container**: `position: absolute`, `inset: 0` (fills entire badge container)
- **Ring SVG**: `width: 16px`, `height: 16px`, white fill `rgba(255, 255, 255, 1)`, **circular ellipse shape**
- **Image Container**: `position: absolute`, `inset: 8.33%` (creates 13.333×13.333 area, 1.333px from edges), `zIndex: 1`
- **Logo Image**: `width: 13.333px`, `height: 13.333px`, **PNG image** (user-provided logo)

**Inset Calculations (percentages scale for all badge sizes - example shown for 16px badge):**

- Ring: `inset-0` → For 16px badge: Ring container: `top: 0, left: 0, width: 16px, height: 16px` (fills entire badge)
- Image: `inset: 8.33%` → For 16px badge: `16px × 8.33% = 1.333px` → Image container: `top: 1.333px, left: 1.333px, width: 13.333px, height: 13.333px`
  - Percentages scale proportionally for all badge sizes

**Icon Badge Structure:**

**Badge Container (Variable size - example shown for 16px):**

```
<div className={statusBadge} style={{ width: sizes[size].statusBadge, height: sizes[size].statusBadge }}>
  {/* Note: Examples below use 16px calculations - percentages scale for all badge sizes */}
  {/* Ring (outer white circle) at inset-0 = 16×16 */}
  <div className={badgeIconRing}> {/* absolute, inset-0 */}
    <img src={ringSvg} width="16" height="16" alt="" />
  </div>
  {/* Icon container at 8.33% inset = 13.333×13.333 */}
  <div className={badgeIconContainer}> {/* absolute, inset-[8.33%], overflow-clip, zIndex: 1 */}
    {iconComponent || <DefaultMoonIcon className={badgeIconVector} />}
  </div>
</div>
```

**Detailed Structure:**

- **Badge Container**: `position: absolute`, `width: sizes[size].statusBadge`, `height: sizes[size].statusBadge` (variable: 8px/10px/12px/16px/18px/20px)
- **Note**: Examples show pixel values for 16px badge - percentages scale proportionally for all sizes
- **Ring Container**: `position: absolute`, `inset: 0` (fills entire badge container)
- **Ring SVG**: `width: 16px`, `height: 16px`, white fill `rgba(255, 255, 255, 1)`, **circular ellipse shape**
- **Icon Container**: `position: absolute`, `inset: 8.33%` (creates 13.333×13.333 area, 1.333px from edges), `overflow-clip`, `zIndex: 1`
- **Default Moon Icon (Vector)**: `position: absolute`, `inset: 8.41%_8.41%_8.33%_8.33%` (asymmetric, slightly smaller), `width: 11.101px`, `height: 11.101px`, gray fill `rgba(111, 111, 119, 1)`
- **Custom Icon**: User can pass Icon component as prop or children, will be rendered inside icon container

**Inset Calculations (percentages scale for all badge sizes - example shown for 16px badge):**

- Ring: `inset-0` → For 16px badge: Ring container: `top: 0, left: 0, width: 16px, height: 16px` (fills entire badge)
- Icon Container: `inset: 8.33%` → For 16px badge: `16px × 8.33% = 1.333px` → Icon container: `top: 1.333px, left: 1.333px, width: 13.333px, height: 13.333px`
- Default Moon Icon: `inset: 8.41%_8.41%_8.33%_8.33%` → For 16px badge: Icon vector: `top: 1.111px, left: 1.121px, width: 11.101px, height: 11.101px` (slightly smaller and offset)
  - Percentages scale proportionally for all badge sizes

**Customization:**

- Icon badge accepts custom Icon component via `icon` prop or as children
- If no custom icon provided, uses default moon icon SVG
- Custom icon will be rendered inside `badgeIconContainer` (13.333×13.333 area with overflow-clip)

---

## 5. Size Dimensions (from sizes object)

```
2xs: image=16, ring=20
xs:  image=20, ring=24
sm:  image=24, ring=28
md:  image=32, ring=36
lg:  image=40, ring=44
xl:  image=48, ring=52
2xl: image=56, ring=60
3xl: image=64, ring=68
```

**Pattern**: Ring is always 4px larger than image (2px offset on each side)

---

## 6. Status Badge Positions

From `statusBadgePositions` object:

- Varies by both `size` and `shape`
- Format: `{size: {circular: {x, y}, rounded: {x, y}}}`
- Applied as: `right: xpx, top: ypx` (for top badge)
- Applied as: `right: xpx, bottom: ypx` (for bottom badge)

---

## 7. Color Tokens to Use

### Border:

- `color.border.default` = '#27272a1a' (rgba(39,39,42,0.1))

### Backgrounds:

- Ring: `color.bg.default` = '#ffffff'
- Initials: `color` prop (default: `color.text.muted` = '#6f6f77')
- Userpic: `color.bg.muted` = '#f4f4f5'
- Empty: `transparent`

### Status Badge Colors:

- Online dot: `#90CD22` (green)
- Offline dot: `#27272a` (gray)
- Notification dot: `#e74341` (red)
- Checkmark: `#437DFC` (blue)
- Icon: `#6f6f77` (gray)

---

## 8. Border Radius

### Circular Shape:

- Container/Ring: `50%` or `9999px`
- Image container: `50%`

### Rounded Shape:

- Container/Ring: `10px` (from Empty variant)
- Image container: `6px` (var(--sm,6px))

---

## 9. Implementation Steps

1. ✅ Collect all data from Figma (DONE)
2. Add `color` prop to `Avatar.types.ts`
3. Add Ring CSS styles to `Avatar.css.ts`
4. Add border to image container CSS
5. Add Image wrapper CSS for Empty/Userpic variants
6. Update Avatar.tsx:
   - Add color prop handling
   - Add Ring element rendering (conditional)
   - Fix variant structures (Initials/Empty/Userpic)
   - Update Status Badge implementations (all 6 variants)
7. Test all sizes, shapes, variants, and badge types
8. Verify border appears on all variants
9. Verify Ring appears correctly
10. Verify Status Badge positioning for all sizes/shapes

---

## 10. Questions to Resolve

1. **Ring Condition**: When should Ring be rendered?

   - Always visible?
   - Only for certain variants?
   - Controlled by prop?

2. **Placeholder Icon**: Where does the placeholder icon come from for Empty variant?

   - SVG asset?
   - Icon component?
   - Need to create/fetch?

3. **Logo Badge**: How is logo image passed for Logo status badge?

   - As prop?
   - As child?
   - Need to define API?

4. **Icon Badge**: Can custom icon be passed for Icon status badge?
   - Default: moon icon
   - Accept custom icon component?

---

## 11. Testing Checklist

- [ ] All 3 variants (Initials, Userpic, Empty)
- [ ] All 8 sizes (2xs through 3xl)
- [ ] Both shapes (Circular, Rounded)
- [ ] All 6 status badges (online, offline, notification, checkmark, logo, icon)
- [ ] Both badge locations (top, bottom)
- [ ] Border appears on all variants
- [ ] Ring appears correctly (if applicable)
- [ ] Color prop works for Initials variant
- [ ] Dark mode (if applicable)
- [ ] Status badge positioning for all size/shape combinations

---

## Notes

- Follow Figma structure exactly - no assumptions
- Use color tokens, not hardcoded values
- **Status badges are VARIABLE size**: 8px (2xs), 10px (xs), 12px (sm, md), 16px (lg, xl), 18px (2xl), 20px (3xl) - matches `sizes[size].statusBadge` values
- Badge structure examples use 16px for illustration - percentages scale proportionally for all sizes
- Ring is always 4px larger than image (extends 2px on every side when centered)
- Image container ALWAYS has border
- Initials variant: text only (no Image wrapper)
- Empty/Userpic variants: have Image wrapper element
- Ring is CENTERED using `left: 50%, top: 50%, transform: translate(-50%, -50%)` - verified from Figma for all 8 sizes
