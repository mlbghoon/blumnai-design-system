/**
 * Radius tokens extracted from Figma REST API
 * Source: https://www.figma.com/design/hNwky49HL9rYtxWb5smgqZ/Sort-UI-%E2%80%94-1.3-Source?node-id=4245-142373
 * Fetched: 2026-01-18
 * 
 * Structure matches Figma Variable Modes:
 * Each size has four modes (style variants) that correspond to Figma's variable modes:
 * - default: "Default" mode in Figma - Base radius value
 * - rounded: "Rounded" mode in Figma - More rounded variant
 * - full: "Full" mode in Figma - Full circle (9999px)
 * - none: "None" mode in Figma - No radius (0px)
 * 
 * Usage:
 * - radius.sm.default → Uses "Default" mode value
 * - radius.sm.rounded → Uses "Rounded" mode value
 * - radius.sm.full → Uses "Full" mode value
 * - radius.sm.none → Uses "None" mode value
 */
export const radius = {
  none: {
    default: '0px',
    rounded: '0px',
    full: '0px',
    none: '0px',
  },
  '2xs': {
    default: '2px',
    rounded: '4px',
    full: '9999px',
    none: '0px',
  },
  xs: {
    default: '4px',
    rounded: '6px',
    full: '9999px',
    none: '0px',
  },
  sm: {
    default: '6px',
    rounded: '8px',
    full: '9999px',
    none: '0px',
  },
  md: {
    default: '8px',
    rounded: '12px',
    full: '9999px',
    none: '0px',
  },
  lg: {
    default: '12px',
    rounded: '16px',
    full: '9999px',
    none: '0px',
  },
  xl: {
    default: '16px',
    rounded: '20px',
    full: '9999px',
    none: '0px',
  },
  '2xl': {
    default: '24px',
    rounded: '28px',
    full: '9999px',
    none: '0px',
  },
  '3xl': {
    default: '28px',
    rounded: '36px',
    full: '9999px',
    none: '0px',
  },
  full: {
    default: '9999px',
    rounded: '9999px',
    full: '9999px',
    none: '0px',
  },
  // Card radius tokens - different values for card components
  card: {
    none: {
      default: '0px',
      rounded: '0px',
      full: '0px',
      none: '0px',
    },
    xs: {
      default: '4px',
      rounded: '8px',
      full: '10px',
      none: '0px',
    },
    sm: {
      default: '8px',
      rounded: '12px',
      full: '16px',
      none: '0px',
    },
    md: {
      default: '12px',
      rounded: '16px',
      full: '24px',
      none: '0px',
    },
    lg: {
      default: '16px',
      rounded: '20px',
      full: '32px',
      none: '0px',
    },
  },
} as const;
