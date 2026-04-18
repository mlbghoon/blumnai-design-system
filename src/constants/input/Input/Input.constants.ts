/**
 * Input component constants
 *
 * Based on Figma design specifications
 */

// Size configurations (based on Figma)
// Figma uses consistent padding regardless of icon presence
export const SIZE_CONFIG = {
  xs: {
    container: 'height-28',
    padding: 'padding-x-6 padding-y-4',
    paddingWithLeadIcon: 'padding-x-6 padding-y-4',
    paddingWithTailIcon: 'padding-x-6 padding-y-4',
    paddingWithBothIcons: 'padding-x-6 padding-y-4',
    text: 'size-xs line-height-leading-4',
    iconSize: 14,
    gap: 'ds-gap-4',
  },
  sm: {
    container: 'height-32',
    padding: 'padding-x-8 padding-y-6',
    paddingWithLeadIcon: 'padding-x-8 padding-y-6',
    paddingWithTailIcon: 'padding-x-8 padding-y-6',
    paddingWithBothIcons: 'padding-x-8 padding-y-6',
    text: 'size-sm line-height-leading-5',
    iconSize: 16,
    gap: 'ds-gap-6',
  },
  lg: {
    container: 'height-36',
    padding: 'padding-x-10 padding-y-8',
    paddingWithLeadIcon: 'padding-x-10 padding-y-8',
    paddingWithTailIcon: 'padding-x-10 padding-y-8',
    paddingWithBothIcons: 'padding-x-10 padding-y-8',
    text: 'size-sm line-height-leading-5',
    iconSize: 16,
    gap: 'ds-gap-6',
  },
} as const;

// Style configurations
export const STYLE_CONFIG = {
  default: {
    base: 'bg-input border-darker rounded-sm',
    focus: 'focus-within:border-strong focus-within:shadow-component-input-focus',
  },
  shadow: {
    base: 'bg-input rounded-sm shadow-components-default',
    focus: 'focus-within:shadow-component-input-focus',
  },
  soft: {
    base: 'bg-input-soft-focusable border-transparent rounded-sm',
    focus: 'focus-within:shadow-component-input-focus',
  },
} as const;

// State configurations
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

// Label styles (from Figma: fontSize 14, fontWeight 500, lineHeight 20, letterSpacing -0.6)
export const LABEL_STYLE = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight font-medium text-default' as const;

// Support text styles (next to label)
export const SUPPORT_TEXT_STYLE = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight text-muted' as const;

// Caption styles (from Figma: fontSize 12, lineHeight 16)
export const CAPTION_STYLE = 'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-muted' as const;

// Error caption style
export const ERROR_CAPTION_STYLE = 'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-destructive' as const;

// Success caption style
export const SUCCESS_CAPTION_STYLE = 'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-success' as const;

// Required asterisk style
export const REQUIRED_STYLE = 'text-destructive' as const;

// Shortcut badge style
export const SHORTCUT_STYLE = {
  container: 'inline-flex items-center justify-center bg-card border-default rounded-sm padding-2',
  text: 'font-code size-xs line-height-leading-4 letter-spacing-tracking-normal text-muted',
} as const;

// Input container base styles
export const INPUT_CONTAINER_BASE = 'flex flex-col min-w-0' as const;

// Input wrapper base styles (the actual input container with border)
export const INPUT_WRAPPER_BASE = 'flex items-center w-full min-w-0 transition-colors duration-150' as const;

// Character count style (matches Textarea COUNT_STYLE)
export const INPUT_COUNT_STYLE = 'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-muted' as const;

// Input field base styles
export const INPUT_FIELD_BASE = 'flex-1 min-w-0 bg-transparent outline-none font-body' as const;
