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
   * @default false
   */
  loading?: boolean;
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
   * The button label text.
   * Optional when variant is 'iconOnly'.
   */
  children?: ReactNode;
}
