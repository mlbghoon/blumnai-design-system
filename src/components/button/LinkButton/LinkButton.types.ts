import type { ButtonHTMLAttributes } from 'react';

export type LinkButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface LinkButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * The size of the link button.
   * @default 'md'
   */
  size?: LinkButtonSize;
  /**
   * The label text for the link button.
   */
  label: string;
  /**
   * The URL to navigate to (optional, if provided renders as anchor tag).
   */
  href?: string;
  /**
   * If true, opens the link in a new tab.
   * @default false
   */
  openInNewTab?: boolean;
  /**
   * Icon name for the external link icon (optional, defaults to external-link icon).
   */
  icon?: string;
  /**
   * Position of the icon relative to the label.
   * @default 'right'
   */
  iconPosition?: 'left' | 'right';
  /**
   * If true, the button is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, applies dark mode styles.
   * @default false
   */
  darkMode?: boolean;
}
