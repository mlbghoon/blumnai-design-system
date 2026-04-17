/**
 * InputDropdown component constants
 *
 * Based on Figma design specifications
 */

// Dropdown trigger base styles
export const DROPDOWN_TRIGGER_BASE = 'flex items-center ds-gap-4 cursor-pointer select-none' as const;

// Dropdown trigger text styles
export const DROPDOWN_TRIGGER_TEXT_BASE = 'font-body letter-spacing-tracking-tight text-default whitespace-nowrap' as const;

// Dropdown trigger placeholder text styles
export const DROPDOWN_TRIGGER_PLACEHOLDER_BASE = 'font-body letter-spacing-tracking-tight text-hint whitespace-nowrap' as const;

// Dropdown menu styles (positioning handled by component - supports portal)
export const DROPDOWN_MENU_BASE = 'z-50 bg-card rounded-md shadow-modal-sm padding-4' as const;

// Dropdown option styles
export const DROPDOWN_OPTION_BASE = 'flex items-center ds-gap-6 rounded-xs cursor-pointer hover:bg-state-ghost-hover transition-colors' as const;

export const DROPDOWN_OPTION_TEXT_BASE = 'font-body letter-spacing-tracking-tight text-default' as const;

export const DROPDOWN_OPTION_SELECTED = 'bg-state-soft' as const;

// Size-specific configurations
export const DROPDOWN_SIZE_CONFIG = {
  xs: {
    triggerPadding: 'padding-x-6 padding-y-4',
    iconSize: 14,
    optionText: 'size-xs line-height-leading-4',
    optionPadding: 'padding-x-6 padding-y-4',
  },
  sm: {
    triggerPadding: 'padding-x-8 padding-y-6',
    iconSize: 16,
    optionText: 'size-sm line-height-leading-5',
    optionPadding: 'padding-x-8 padding-y-6',
  },
  lg: {
    triggerPadding: 'padding-x-10 padding-y-8',
    iconSize: 16,
    optionText: 'size-sm line-height-leading-5',
    optionPadding: 'padding-x-10 padding-y-8',
  },
} as const;

// Divider between dropdown and input (visual separator)
export const DROPDOWN_DIVIDER = 'w-px bg-divider self-stretch flex-shrink-0' as const;
