import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'ghost'
  | 'soft'
  | 'gray'
  | 'linkedin'
  | 'google'
  | 'facebook'
  | 'twitter';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * The visual style variant of the button.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * The button type attribute.
   * @default 'button'
   */
  type?: ButtonType;
  /**
   * Icon to display. Can be an icon name string or a ReactNode.
   */
  icon?: string | ReactNode;
  /**
   * Position of the icon relative to the label.
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  /**
   * Avatar image URL for avatar button variant.
   */
  avatar?: string;
  /**
   * Keyboard shortcut indicator (e.g., "/", "⌘K", etc.).
   */
  shortcut?: string;
  /**
   * If true, renders as an icon-only button (square, no text).
   * @default false
   */
  iconOnly?: boolean;
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
   * If true, applies dark mode styles.
   * @default false
   */
  darkMode?: boolean;
  /**
   * The button label text.
   * Optional when iconOnly is true.
   */
  children?: ReactNode;
}
