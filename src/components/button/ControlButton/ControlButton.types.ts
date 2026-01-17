import type { ButtonHTMLAttributes } from 'react';

export type ControlButtonSize = 'md' | 'lg';

export type ControlButtonShape = 'rounded' | 'circle';

export interface ControlButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * The size of the control button.
   * @default 'md'
   */
  size?: ControlButtonSize;
  /**
   * The shape of the control button.
   * @default 'rounded'
   */
  shape?: ControlButtonShape;
  /**
   * Icon name for the control button (required).
   */
  icon: string;
  /**
   * If true, the button is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, applies dark mode (inverted) styles.
   * @default false
   */
  darkMode?: boolean;
  /**
   * Accessibility label for the button (required for icon-only buttons).
   */
  'aria-label': string;
}
