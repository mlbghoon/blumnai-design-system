import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { IconType } from '../icons/Icon/Icon.types';

/**
 * Extended icon type for Button that supports isFill option.
 * Can be a standard IconType tuple or a 3-element tuple with isFill.
 * @example ['system', 'add'] - regular icon
 * @example ['system', 'add', true] - filled icon
 */
export type ButtonIconType = IconType | [...IconType, boolean];

export type ButtonStyle =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'ghost'
  | 'ghostMuted'
  | 'soft'
  | 'dashed';

export type ButtonVariant = 'default' | 'iconOnly';

export type ButtonSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';

export type ButtonShape = 'rounded' | 'pill';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonColor =
  | 'gray' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime'
  | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue'
  | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * The visual style of the button.
   * @default 'primary'
   */
  buttonStyle?: ButtonStyle;
  /**
   * The button variant.
   * @default 'default'
   */
  variant?: ButtonVariant;
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * The shape of the button.
   * @default 'rounded'
   */
  shape?: ButtonShape;
  /**
   * The button type attribute.
   * @default 'button'
   */
  type?: ButtonType;
  /**
   * Icon to display before the label (or as the icon for iconOnly variant).
   * Can be a ButtonIconType tuple or a ReactNode.
   * @example leadIcon={['system', 'add']} - regular icon
   * @example leadIcon={['system', 'add', true]} - filled icon
   */
  leadIcon?: ButtonIconType | ReactNode;
  /**
   * Icon to display after the label.
   * Can be a ButtonIconType tuple or a ReactNode.
   * @example tailIcon={['arrows', 'arrow-right']} - regular icon
   * @example tailIcon={['arrows', 'arrow-right', true]} - filled icon
   */
  tailIcon?: ButtonIconType | ReactNode;
  /**
   * Keyboard shortcut indicator (e.g., "/", "⌘K", etc.).
   */
  shortcut?: string;
  /**
   * If true, the button shows a loading state.
   * When using `loading`, also set the `width` prop to prevent the button
   * from shrinking when the label is replaced by a spinner.
   * @default false
   * @example
   * <Button loading width={120}>Save</Button>
   */
  loading?: boolean;
  /**
   * Override the button color while preserving the style pattern.
   * Changes the hue of the button using design system color tokens.
   *
   * This is the canonical way to override a button's color. Prefer this over
   * `colorOverride` (deprecated).
   */
  color?: ButtonColor;
  /**
   * @deprecated Use `color` instead. Both props work identically; `color` is
   * the canonical form aligned with other DS components (Badge, Switch, etc.).
   */
  colorOverride?: ButtonColor;
  /**
   * If true, the button is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the button takes full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Custom width for the button (e.g., '200px', '100%', 'auto').
   * Overrides default width behavior.
   */
  width?: string | number;
  /**
   * If true, renders the component as its child element using Radix Slot.
   * @default false
   */
  asChild?: boolean;
  /**
   * 호버 시 표시되는 툴팁 텍스트
   */
  tooltip?: string;
  /**
   * 툴팁 위치
   * @default 'top'
   */
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * The button label text.
   * Optional when variant is 'iconOnly'.
   */
  children?: ReactNode;
}
