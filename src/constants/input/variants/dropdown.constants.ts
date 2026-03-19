/**
 * InputDropdown component constants
 *
 * Based on Figma design specifications
 */

// Dropdown trigger base styles
export const DROPDOWN_TRIGGER_BASE = 'flex items-center ds-gap-4 cursor-pointer select-none' as const;

// Dropdown trigger text styles
export const DROPDOWN_TRIGGER_TEXT = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight text-default whitespace-nowrap' as const;

// Dropdown trigger placeholder text styles
export const DROPDOWN_TRIGGER_PLACEHOLDER = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight text-hint whitespace-nowrap' as const;

// Dropdown menu styles (positioning handled by component - supports portal)
export const DROPDOWN_MENU_BASE = 'z-50 bg-card border-default rounded-md shadow-modal-sm' as const;

// Dropdown option styles
export const DROPDOWN_OPTION_BASE = 'flex items-center ds-gap-6 padding-x-8 padding-y-6 cursor-pointer hover:bg-state-ghost-hover transition-colors' as const;

export const DROPDOWN_OPTION_TEXT = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight text-default' as const;

export const DROPDOWN_OPTION_SELECTED = 'bg-state-soft' as const;

// Size-specific configurations
export const DROPDOWN_SIZE_CONFIG = {
  xs: {
    triggerPadding: 'padding-x-6 padding-y-4',
    iconSize: 14,
  },
  sm: {
    triggerPadding: 'padding-x-8 padding-y-6',
    iconSize: 16,
  },
  lg: {
    triggerPadding: 'padding-x-10 padding-y-8',
    iconSize: 16,
  },
} as const;

// Divider between dropdown and input (visual separator)
export const DROPDOWN_DIVIDER = 'w-px bg-divider self-stretch flex-shrink-0' as const;
