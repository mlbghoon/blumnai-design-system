import { style } from '@vanilla-extract/css';

// Avatar ring sizes (from Avatar component)
export const avatarRingSizes = {
  '2xs': 20,
  xs: 24,
  sm: 28,
  md: 36,
  lg: 44,
  xl: 52,
  '2xl': 60,
  '3xl': 68,
} as const;

// Overlap values in pixels for each avatar size (with ring=true)
// Figma overlap + ring padding (4px) to maintain same visual overlap
export const overlaps = {
  '2xs': 8,  // Figma: 4px + 4px ring padding
  xs: 8,     // Figma: 4px + 4px ring padding
  sm: 8,     // Figma: 4px + 4px ring padding
  md: 10,    // Figma: 6px + 4px ring padding
  lg: 12,    // Figma: 8px + 4px ring padding
  xl: 12,    // Figma: 8px + 4px ring padding
  '2xl': 14, // Figma: 10px + 4px ring padding
  '3xl': 16, // Figma: 12px + 4px ring padding
} as const;

// Base container
export const container = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
});

// Avatar wrapper (for positioning and z-index)
export const avatarWrapper = style({
  position: 'relative',
  flexShrink: 0,
});

// Stacking: Last on top (z-index increases with index)
export const stackingLastOnTop = style({
  // z-index will be applied inline in component
});

// Stacking: First on top (z-index decreases with index)
export const stackingFirstOnTop = style({
  // z-index will be applied inline in component
});

// Size-specific styles
export const size2xs = style({
  // Overlap calculated dynamically
});

export const sizeXs = style({
  // Overlap calculated dynamically
});

export const sizeSm = style({
  // Overlap calculated dynamically
});

export const sizeMd = style({
  // Overlap calculated dynamically
});

export const sizeLg = style({
  // Overlap calculated dynamically
});

export const sizeXl = style({
  // Overlap calculated dynamically
});

export const size2xl = style({
  // Overlap calculated dynamically
});

export const size3xl = style({
  // Overlap calculated dynamically
});

// +N overlay (for remaining avatars)
export const overlay = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: '50%',
  fontFamily: 'Spoqa Han Sans Neo, sans-serif',
  fontWeight: 500,
  userSelect: 'none',
});

// Overlay size-specific styles
export const overlay2xs = style({
  width: `${avatarRingSizes['2xs']}px`,
  height: `${avatarRingSizes['2xs']}px`,
  fontSize: '10px',
});

export const overlayxs = style({
  width: `${avatarRingSizes.xs}px`,
  height: `${avatarRingSizes.xs}px`,
  fontSize: '11px',
});

export const overlaysm = style({
  width: `${avatarRingSizes.sm}px`,
  height: `${avatarRingSizes.sm}px`,
  fontSize: '12px',
});

export const overlaymd = style({
  width: `${avatarRingSizes.md}px`,
  height: `${avatarRingSizes.md}px`,
  fontSize: '14px',
});

export const overlaylg = style({
  width: `${avatarRingSizes.lg}px`,
  height: `${avatarRingSizes.lg}px`,
  fontSize: '16px',
});

export const overlayxl = style({
  width: `${avatarRingSizes.xl}px`,
  height: `${avatarRingSizes.xl}px`,
  fontSize: '18px',
});

export const overlay2xl = style({
  width: `${avatarRingSizes['2xl']}px`,
  height: `${avatarRingSizes['2xl']}px`,
  fontSize: '20px',
});

export const overlay3xl = style({
  width: `${avatarRingSizes['3xl']}px`,
  height: `${avatarRingSizes['3xl']}px`,
  fontSize: '22px',
});

// Note: Functions cannot be exported from .css.ts files in Vanilla Extract
// Use the exported `overlaps` and `avatarRingSizes` objects directly in components
