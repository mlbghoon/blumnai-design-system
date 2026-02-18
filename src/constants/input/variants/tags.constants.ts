/**
 * InputTags component constants
 *
 * Based on Figma design specifications
 */

// Tag base styles (shared)
export const TAG_BASE = 'inline-flex items-center rounded-xs transition-colors backdrop-blur-sm' as const;

// Tag size configurations
// 태그 크기는 입력 필드 크기와 관계없이 동일 (Figma 기준: height 20px, fontSize 12px)
export const TAG_SIZE_CONFIG = {
  sm: {
    container: 'height-20 padding-x-2 ds-gap-0',
    text: 'size-xs line-height-leading-4 padding-x-4',
    closeButton: 'width-16 height-16',
    iconSize: 14,
  },
  lg: {
    container: 'height-20 padding-x-2 ds-gap-0',
    text: 'size-xs line-height-leading-4 padding-x-4',
    closeButton: 'width-16 height-16',
    iconSize: 14,
  },
} as const;

// Tag text style
export const TAG_TEXT_STYLE = 'font-body letter-spacing-tracking-tight text-subtle font-medium whitespace-nowrap' as const;

// Tag close button style
export const TAG_CLOSE_BUTTON = 'flex items-center justify-center rounded-2xs hover:bg-state-ghost-hover transition-colors cursor-pointer' as const;

// Tags container (for non-inline display - tags below input)
export const TAGS_CONTAINER = 'flex flex-wrap ds-gap-4 margin-t-8' as const;

// Inline tags container (inside the input wrapper)
export const INLINE_TAGS_CONTAINER = 'flex flex-wrap ds-gap-4 items-center' as const;

// Tag variant styles (inline = inside input, non-inline = below input)
export const TAG_VARIANT_STYLES = {
  // Tags inside input
  inline: {
    default: 'bg-card border-default hover:border-darker',
    disabled: 'bg-card border-default opacity-50',
  },
  // Tags below input
  stacked: {
    default: 'bg-card border-darker hover:border-strong',
    disabled: 'bg-card border-darker opacity-50',
  },
} as const;

// Legacy tag states (for backwards compatibility)
export const TAG_STATES = {
  default: 'bg-card border-default hover:border-darker',
  disabled: 'bg-card border-default opacity-50',
} as const;
