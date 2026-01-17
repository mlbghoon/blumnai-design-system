import { forwardRef, useMemo } from 'react';

import { Avatar } from '../../avatar/Avatar';
import { cn } from '../../../utils/cn';

import type { AvatarButtonProps } from './AvatarButton.types';

/**
 * AvatarButton component
 *
 * A specialized button with an avatar image and label text.
 */
export const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(({
  size = 'md',
  avatar,
  alt,
  label,
  disabled = false,
  darkMode = false,
  className,
  ...props
}, ref) => {
  // Size classes
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'text-xs leading-4 px-1 py-0.5 gap-1';
      case 'sm':
        return 'text-sm leading-5 px-1.5 py-1.5 gap-1.5';
      case 'md':
        return 'text-sm leading-5 px-2.5 py-2.5 gap-2';
      case 'lg':
        return 'text-base leading-6 px-3.5 py-3.5 gap-2';
      default:
        return 'text-sm leading-5 px-2.5 py-2.5 gap-2';
    }
  }, [size]);

  // Map AvatarButton size to Avatar size
  const avatarSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'xs';
      case 'sm':
        return 'sm';
      case 'md':
        return 'md';
      case 'lg':
        return 'lg';
      default:
        return 'md';
    }
  }, [size]);

  const containerClassName = cn(
    'inline-flex items-center justify-center',
    'font-medium tracking-[-0.6px]',
    'rounded-full',
    'bg-transparent',
    darkMode ? 'text-[#6f6f77] hover:bg-[#27272a0f]' : 'text-[#6f6f77] hover:bg-[#27272a0f]',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-[#65a0fd66] focus:ring-offset-2',
    sizeClasses,
    disabled && 'bg-[#27272a14] text-[#27272a4d] cursor-not-allowed hover:bg-[#27272a14]',
    className
  );

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={containerClassName}
      {...props}
    >
      <Avatar
        variant="userpic"
        size={avatarSize}
        shape="circular"
        src={avatar}
        alt={alt}
        ring={false}
        darkMode={darkMode}
      />
      <span>{label}</span>
    </button>
  );
});

AvatarButton.displayName = 'AvatarButton';
