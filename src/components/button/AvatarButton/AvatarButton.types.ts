import type { ButtonHTMLAttributes } from 'react';

export type AvatarButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface AvatarButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * The size of the avatar button.
   * @default 'md'
   */
  size?: AvatarButtonSize;
  /**
   * Avatar image URL.
   */
  avatar: string;
  /**
   * Alt text for the avatar image.
   */
  alt?: string;
  /**
   * The label text for the avatar button.
   */
  label: string;
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
