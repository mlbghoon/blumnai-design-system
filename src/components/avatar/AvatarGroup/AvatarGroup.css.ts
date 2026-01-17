import { style } from '@vanilla-extract/css';

import { color } from '../../../tokens/color';

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

// Overlap values in pixels for each avatar size
// 3 smallest sizes: 4px, then 6px, 8px, 8px, 10px, 12px
export const overlaps = {
  '2xs': 4, // 4px for 3 smallest sizes
  xs: 4,    // 4px for 3 smallest sizes
  sm: 4,    // 4px for 3 smallest sizes
  md: 6,    // 6px
  lg: 8,    // 8px
  xl: 8,    // 8px
  '2xl': 10, // 10px
  '3xl': 12, // 12px
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
  color: color.text.default,
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

export const overlayXl = style({
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

// Dark mode overlay
export const overlayDark = style({
  backgroundColor: color.bg.state.soft,
  borderColor: color.border.inverted,
  color: color.text.white.default,
});

// Note: Functions cannot be exported from .css.ts files in Vanilla Extract
// Use the exported `overlaps` and `avatarRingSizes` objects directly in components
