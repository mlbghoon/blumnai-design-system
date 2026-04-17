/**
 * Select component constants
 */

export const SIZE_CONFIG = {
  xs: {
    container: 'height-24',
    minHeight: 'min-height-24',
    padding: 'padding-x-6 padding-y-4',
    paddingWithLeadIcon: 'padding-x-6 padding-y-4',
    text: 'size-xs line-height-leading-4',
    iconSize: 14,
    gap: 'ds-gap-0',
  },
  sm: {
    container: 'height-32',
    minHeight: 'min-height-32',
    padding: 'padding-x-8 padding-y-6',
    paddingWithLeadIcon: 'padding-x-8 padding-y-6',
    text: 'size-sm line-height-leading-5',
    iconSize: 16,
    gap: 'ds-gap-0',
  },
  lg: {
    container: 'height-36',
    minHeight: 'min-height-36',
    padding: 'padding-x-8 padding-y-8',
    paddingWithLeadIcon: 'padding-x-8 padding-y-8',
    text: 'size-sm line-height-leading-5',
    iconSize: 16,
    gap: 'ds-gap-0',
  },
} as const;

export const STYLE_CONFIG = {
  default: {
    base: 'bg-input border-darker rounded-md',
    focus: 'focus-within:border-strong focus-within:shadow-component-input-focus data-[state=open]:border-strong data-[state=open]:shadow-component-input-focus',
  },
  shadow: {
    base: 'bg-input rounded-md shadow-components-default',
    focus: 'focus-within:shadow-component-input-focus data-[state=open]:shadow-component-input-focus',
  },
  soft: {
    base: 'bg-input-soft-focusable border-transparent rounded-md',
    focus: 'focus-within:shadow-component-input-focus data-[state=open]:shadow-component-input-focus',
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

export const MENU_ITEM_SIZE_CONFIG = {
  default: {
    height: 'height-32',
    padding: 'padding-6',
    gap: 'ds-gap-6',
    iconSize: 16 as const,
    iconFrame: 'width-20 height-20',
    text: 'size-sm line-height-leading-5 letter-spacing-tracking-tight',
  },
  large: {
    height: 'min-height-50',
    padding: 'padding-x-8 padding-y-6',
    gap: 'ds-gap-6',
    iconSize: 20 as const,
    iconFrame: 'width-36 height-36',
    text: 'size-sm line-height-leading-5 letter-spacing-tracking-tight',
  },
} as const;
