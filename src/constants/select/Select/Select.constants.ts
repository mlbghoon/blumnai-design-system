/**
 * Select component constants
 *
 * Based on Figma design specifications and Input component patterns
 */

export const SIZE_CONFIG = {
  sm: {
    container: 'height-32',
    padding: 'padding-x-8 padding-y-6',
    paddingWithLeadIcon: 'padding-x-8 padding-y-6',
    text: 'size-sm line-height-leading-5',
    iconSize: 16,
    gap: 'gap-6',
  },
  lg: {
    container: 'height-36',
    padding: 'padding-x-8 padding-y-8',
    paddingWithLeadIcon: 'padding-x-8 padding-y-8',
    text: 'size-sm line-height-leading-5',
    iconSize: 16,
    gap: 'gap-6',
  },
} as const;

export const STYLE_CONFIG = {
  default: {
    base: 'bg-input border-darker rounded-md',
    focus: 'focus-within:border-strong focus-within:shadow-component-input-focus',
  },
  shadow: {
    base: 'bg-input border-darker rounded-md shadow-component-default',
    focus: 'focus-within:border-strong focus-within:shadow-component-input-focus',
  },
  soft: {
    base: 'bg-input-soft-focusable border-transparent rounded-md',
    focus: 'focus-within:shadow-component-input-focus',
  },
} as const;

export const STATE_CONFIG = {
  default: {
    border: 'border-darker',
    text: 'text-default',
    placeholder: 'text-hint',
  },
  disabled: {
    border: 'border-default',
    text: 'text-hint',
    placeholder: 'text-hint',
    bg: 'bg-input-disabled',
  },
  error: {
    border: 'border-destructive',
    text: 'text-default',
    placeholder: 'text-hint',
  },
  success: {
    border: 'border-success',
    text: 'text-default',
    placeholder: 'text-hint',
  },
} as const;

export const TRIGGER_BASE = 'flex items-center w-full transition-colors duration-150 cursor-pointer' as const;

export const SELECT_CONTAINER_BASE = 'flex flex-col' as const;

export const MENU_CONTAINER_BASE = 'flex flex-col bg-card rounded-lg shadow-modal-sm' as const;

export const MENU_SIZE_CONFIG = {
  minWidth: 'min-w-[200px]',
  maxWidth: 'max-w-[320px]',
  padding: 'padding-y-4',
} as const;

export const MENU_ITEM_CONTAINER_BASE = 'flex w-full padding-x-4' as const;

export const MENU_ITEM_INNER_BASE = 'flex items-center w-full rounded-xs transition-colors duration-150' as const;

export const MENU_ITEM_SIZE_CONFIG = {
  default: {
    height: 'height-32',
    padding: 'padding-6',
    gap: 'gap-6',
    iconSize: 16 as const,
    iconFrame: 'width-20 height-20',
    text: 'size-sm line-height-leading-5 letter-spacing-tracking-tight',
  },
  large: {
    height: 'min-h-[54px]',
    padding: 'padding-x-8 padding-y-6',
    gap: 'gap-6',
    iconSize: 20 as const,
    iconFrame: 'width-36 height-36',
    text: 'size-sm line-height-leading-5 letter-spacing-tracking-tight',
  },
} as const;

export const MENU_ITEM_STATE_CONFIG = {
  default: {
    bg: 'bg-transparent',
    text: 'text-default',
    iconColor: 'var(--icon-default)',
  },
  hover: {
    bg: 'hover:bg-state-ghost-hover',
  },
  active: {
    bg: 'active:bg-state-ghost-hover',
  },
  disabled: {
    bg: 'bg-transparent',
    text: 'text-hint',
    iconColor: 'var(--icon-default-disabled)',
  },
  selected: {
    bg: 'bg-state-ghost-hover',
    text: 'text-default',
  },
} as const;
