/**
 * Textarea component constants
 *
 * Based on Figma design specifications and Input component patterns
 */

export const SIZE_CONFIG = {
  sm: {
    padding: 'padding-x-12 padding-y-10',
    text: 'size-sm line-height-leading-5',
  },
  lg: {
    padding: 'padding-x-14 padding-y-12',
    text: 'size-sm line-height-leading-5',
  },
} as const;

export const STYLE_CONFIG = {
  default: {
    base: 'bg-input border-darker rounded-lg',
    focus: 'focus-within:border-strong focus-within:shadow-component-input-focus',
  },
  shadow: {
    base: 'bg-input border-darker rounded-lg shadow-component-default',
    focus: 'focus-within:border-strong focus-within:shadow-component-input-focus',
  },
  soft: {
    base: 'bg-input-soft-focusable border-transparent rounded-lg',
    focus: 'focus-within:shadow-component-input-focus',
  },
} as const;

export const STATE_CONFIG = {
  default: {
    border: 'border-darker',
    text: 'text-default',
    placeholder: 'placeholder:text-hint',
  },
  disabled: {
    border: 'border-default',
    text: 'text-hint',
    placeholder: 'placeholder:text-hint',
    bg: 'bg-input-disabled',
  },
  error: {
    border: 'border-destructive',
    text: 'text-default',
    placeholder: 'placeholder:text-hint',
  },
  success: {
    border: 'border-success',
    text: 'text-default',
    placeholder: 'placeholder:text-hint',
  },
} as const;

export const RESIZE_CONFIG = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
} as const;

export const TEXTAREA_BASE = 'w-full bg-transparent outline-none font-body' as const;

export const TEXTAREA_CONTAINER_BASE = 'flex flex-col' as const;

export const COUNT_STYLE = 'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-muted' as const;

export const TOOLBAR_CONTAINER = 'flex items-center justify-between ds-gap-8 margin-t-32' as const;

export const TOOLBAR_ACTIONS_CONTAINER = 'flex items-center ds-gap-4' as const;

export const TOOLBAR_BUTTON_BASE = 'flex items-center justify-center rounded-sm transition-colors duration-150 cursor-pointer' as const;

export const TOOLBAR_BUTTON_ICON_ONLY = 'width-28 height-28 bg-state-soft hover:bg-state-soft-hover active:bg-state-soft-press' as const;

export const TOOLBAR_CHIP_BASE = 'flex items-center ds-gap-4 padding-x-8 padding-y-4 height-28 rounded-sm bg-state-soft hover:bg-state-soft-hover active:bg-state-soft-press font-body size-sm line-height-leading-5 text-muted cursor-pointer transition-colors duration-150' as const;

export const TOOLBAR_SUBMIT_BUTTON = 'width-28 height-28 rounded-sm bg-state-primary hover:bg-state-primary-hover active:bg-state-primary-press flex items-center justify-center transition-colors duration-150' as const;

export const TOOLBAR_SUBMIT_BUTTON_DISABLED = 'width-28 height-28 rounded-sm bg-state-soft flex items-center justify-center cursor-not-allowed' as const;
