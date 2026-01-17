// Size dimensions (from Figma)
export const sizes = {
  '2xs': { image: 16, ring: 20, statusBadge: 8 },
  xs: { image: 20, ring: 24, statusBadge: 10 },
  sm: { image: 24, ring: 28, statusBadge: 12 },
  md: { image: 32, ring: 36, statusBadge: 12 },
  lg: { image: 40, ring: 44, statusBadge: 16 },
  xl: { image: 48, ring: 52, statusBadge: 16 },
  '2xl': { image: 56, ring: 60, statusBadge: 18 },
  '3xl': { image: 64, ring: 68, statusBadge: 20 },
} as const;

// Status Badge positions (from Figma verification data)
// x: right position (negative = overflow beyond container edge, 0 = aligned with edge)
// y: top position (negative = upward overflow, 0 = aligned with edge)
// Note: Badge is positioned at top-right or bottom-right corner
export const statusBadgePositions = {
  '2xs': { circular: { x: -2, y: -2 }, rounded: { x: -2, y: -2 } },
  xs: { circular: { x: -3, y: -3 }, rounded: { x: -3, y: -3 } },
  sm: { circular: { x: -3, y: -3 }, rounded: { x: -3, y: -3 } },
  md: { circular: { x: -2, y: -2 }, rounded: { x: -2, y: -2 } },
  lg: { circular: { x: -2, y: -2 }, rounded: { x: -2, y: -2 } },
  xl: { circular: { x: -2, y: -2 }, rounded: { x: -2, y: -2 } },
  '2xl': { circular: { x: -1, y: -1 }, rounded: { x: -1, y: -1 } },
  '3xl': { circular: { x: 0, y: 0 }, rounded: { x: 0, y: 0 } },
} as const;

// Font sizes for initials (by avatar size)
export const initialsFontSizes = {
  '2xs': '10px',
  xs: '11px',
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '18px',
  '2xl': '20px',
  '3xl': '22px',
} as const;
