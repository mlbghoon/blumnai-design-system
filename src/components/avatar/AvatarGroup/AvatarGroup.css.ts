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

export const overlaps = {
  '2xs': 8,
  xs: 8,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 12,
  '2xl': 14,
  '3xl': 16,
} as const;

export const overlaySizes = {
  '2xs': { width: avatarRingSizes['2xs'], height: avatarRingSizes['2xs'], fontSize: '10px' },
  xs: { width: avatarRingSizes.xs, height: avatarRingSizes.xs, fontSize: '11px' },
  sm: { width: avatarRingSizes.sm, height: avatarRingSizes.sm, fontSize: '12px' },
  md: { width: avatarRingSizes.md, height: avatarRingSizes.md, fontSize: '14px' },
  lg: { width: avatarRingSizes.lg, height: avatarRingSizes.lg, fontSize: '16px' },
  xl: { width: avatarRingSizes.xl, height: avatarRingSizes.xl, fontSize: '18px' },
  '2xl': { width: avatarRingSizes['2xl'], height: avatarRingSizes['2xl'], fontSize: '20px' },
  '3xl': { width: avatarRingSizes['3xl'], height: avatarRingSizes['3xl'], fontSize: '22px' },
} as const;
