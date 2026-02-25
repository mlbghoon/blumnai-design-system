export const INFOBOX_VARIANT_BG = {
  default: 'bg-basic-gray-subtle',
  info: 'bg-basic-blue-subtle',
  success: 'bg-basic-green-subtle',
  warning: 'bg-basic-orange-subtle',
  error: 'bg-basic-red-subtle',
} as const;

export const INFOBOX_INDICATOR = {
  default: 'bg-basic-gray-accent',
  info: 'bg-basic-blue-accent',
  success: 'bg-basic-green-accent',
  warning: 'bg-basic-orange-accent',
  error: 'bg-basic-red-accent',
} as const;

export const INFOBOX_ICON_COLOR = {
  default: 'text-basic-gray-accent',
  info: 'text-basic-blue-accent',
  success: 'text-basic-green-accent',
  warning: 'text-basic-orange-accent',
  error: 'text-basic-red-accent',
} as const;

export const INFOBOX_DEFAULT_ICON: Record<string, [string, string]> = {
  default: ['system', 'information'],
  info: ['system', 'information'],
  success: ['system', 'checkbox-circle'],
  warning: ['system', 'error-warning'],
  error: ['system', 'close-circle'],
};
