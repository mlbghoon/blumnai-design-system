export const LINE_BASE = 'flex-1 h-0 border-t-default';
export const LINE_VERTICAL = 'flex-1 w-0 border-l-default';
export const LINE_DASHED = 'border-dashed';
export const CONTENT_BASE = 'flex items-center shrink-0';
export const CONTENT_TEXT = 'font-body size-sm line-height-leading-5 font-medium text-muted';
export const ICON_CONTAINER = 'flex items-center shrink-0';
export const ICON_SIZE = 20;
export const ICON_COLOR = 'var(--icon-muted)';
export const CONTAINER_BASE = 'flex items-center w-full';
export const CONTAINER_VERTICAL = 'flex flex-col items-center h-full';
export const CONTAINER_WITH_CONTENT = 'flex items-center w-full ds-gap-8';
export const CONTAINER_VERTICAL_WITH_CONTENT = 'flex flex-col items-center h-full ds-gap-8';

export const SPACING_HORIZONTAL = {
  sm: 'padding-y-8',
  md: 'padding-y-12',
  lg: 'padding-y-16',
  xl: 'padding-y-24',
} as const;

export const SPACING_VERTICAL = {
  sm: 'padding-x-8',
  md: 'padding-x-12',
  lg: 'padding-x-16',
  xl: 'padding-x-24',
} as const;
