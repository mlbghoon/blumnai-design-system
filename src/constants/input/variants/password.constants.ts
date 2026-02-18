/**
 * InputPassword component constants
 *
 * Based on Figma design specifications
 */

// Password strength indicator container
export const STRENGTH_INDICATOR_CONTAINER = 'flex items-center ds-gap-4 margin-t-8' as const;

// Password strength bar base styles
export const STRENGTH_BAR_BASE = 'height-2 rounded-full flex-1 transition-colors' as const;

// Password strength bar colors by level
export const STRENGTH_BAR_COLORS = {
  none: 'bg-state-ghost',
  low: 'bg-basic-red-strong',
  medium: 'bg-basic-amber-strong',
  high: 'bg-basic-green-strong',
} as const;

// Password strength bar inactive color
export const STRENGTH_BAR_INACTIVE = 'bg-state-ghost' as const;

// Password strength label styles
export const STRENGTH_LABEL_STYLE = 'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight' as const;

// Password strength label colors
export const STRENGTH_LABEL_COLORS = {
  none: 'text-muted',
  low: 'text-basic-red-strong',
  medium: 'text-basic-amber-strong',
  high: 'text-basic-green-strong',
} as const;

// Password strength labels text
export const STRENGTH_LABELS = {
  none: '',
  low: 'Weak',
  medium: 'Medium',
  high: 'Strong',
} as const;

// Toggle button styles
export const TOGGLE_BUTTON_STYLE = 'flex-shrink-0 flex items-center justify-center hover:bg-state-ghost-hover rounded-xs transition-colors padding-2' as const;
