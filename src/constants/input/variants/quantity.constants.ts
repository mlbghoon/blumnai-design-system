/**
 * InputQuantity component constants
 *
 * Based on Figma design specifications
 */

// Quantity button base styles
export const QUANTITY_BUTTON_BASE = 'flex items-center justify-center transition-colors select-none' as const;

// Quantity button sizes
export const QUANTITY_BUTTON_SIZE = {
  xs: 'width-20 height-20',
  sm: 'width-24 height-24',
  lg: 'width-28 height-28',
} as const;

// Compact variant button sizes (stacked buttons are smaller)
export const QUANTITY_BUTTON_COMPACT_SIZE = {
  xs: 'width-14 height-14',
  sm: 'width-16 height-14',
  lg: 'width-20 height-16',
} as const;

// Quantity button states
export const QUANTITY_BUTTON_STATES = {
  default: 'bg-state-ghost hover:bg-state-ghost-hover active:bg-state-ghost-press rounded-xs',
  disabled: 'bg-state-ghost opacity-50 cursor-not-allowed rounded-xs',
} as const;

// Input field styles for quantity (center-aligned numbers)
export const QUANTITY_INPUT_STYLE = 'text-center font-body font-medium tabular-nums' as const;

// Compact variant container (buttons stacked on right)
export const COMPACT_BUTTONS_CONTAINER = 'flex flex-col items-center justify-center' as const;

// Size-specific compact button styles
export const COMPACT_BUTTON_STYLE = {
  xs: {
    container: 'flex flex-col border-l border-l-default',
    button: 'width-20 flex items-center justify-center hover:bg-state-ghost-hover transition-colors',
    buttonTop: 'border-b border-b-default',
    iconSize: 10,
  },
  sm: {
    container: 'flex flex-col border-l border-l-default',
    button: 'width-24 flex items-center justify-center hover:bg-state-ghost-hover transition-colors',
    buttonTop: 'border-b border-b-default',
    iconSize: 12,
  },
  lg: {
    container: 'flex flex-col border-l border-l-default',
    button: 'width-28 flex items-center justify-center hover:bg-state-ghost-hover transition-colors',
    buttonTop: 'border-b border-b-default',
    iconSize: 12,
  },
} as const;
