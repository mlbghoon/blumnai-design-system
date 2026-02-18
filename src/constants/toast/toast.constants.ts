export const TOAST_BASE = 'flex items-center ds-gap-12 rounded-card-sm border-default shadow-card padding-x-12 padding-y-10';

export const TOAST_VARIANT = {
  default: 'bg-basic-gray-subtle',
  info: 'bg-basic-blue-subtle',
  success: 'bg-basic-green-subtle',
  warning: 'bg-basic-orange-subtle',
  error: 'bg-basic-red-subtle',
} as const;

export const TOAST_INDICATOR = {
  default: 'bg-basic-gray-accent',
  info: 'bg-basic-blue-accent',
  success: 'bg-basic-green-accent',
  warning: 'bg-basic-orange-accent',
  error: 'bg-basic-red-accent',
} as const;

export const TOAST_INDICATOR_BASE = 'width-4 rounded-full flex-shrink-0 self-stretch min-height-20';

export const TOAST_LABEL = {
  default: '',
  info: 'Info:',
  success: 'Success:',
  warning: 'Warning:',
  error: 'Error:',
} as const;

export const TOAST_LABEL_STYLE = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal text-subtle font-semibold';

export const TOAST_MESSAGE_STYLE = 'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal text-subtle';
