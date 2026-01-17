import type { ButtonHTMLAttributes } from 'react';

export type FilterButtonSize = 'xs' | 'md' | 'lg';

export type FilterButtonShape = 'rounded' | 'pill';

export interface FilterButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * The size of the filter button.
   * @default 'md'
   */
  size?: FilterButtonSize;
  /**
   * The shape of the filter button.
   * @default 'rounded'
   */
  shape?: FilterButtonShape;
  /**
   * If true, the button is selected.
   * @default false
   */
  selected?: boolean;
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
  /**
   * The label text for the filter button.
   */
  label: string;
  /**
   * Icon name for the filter icon (optional, defaults to filter icon).
   */
  icon?: string;
}
