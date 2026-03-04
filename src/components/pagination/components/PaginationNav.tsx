import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon';
import type { IconType } from '../../icons/Icon/Icon.types';
import type { PaginationNavProps } from '../Pagination.types';

export const PaginationNav = forwardRef<HTMLButtonElement, PaginationNavProps>(
  ({ className, direction, size = 'lg', disabled, href, onClick, iconOverride, ...props }, ref) => {
    const iconType: IconType = iconOverride
      ? (iconOverride as IconType)
      : direction === 'prev'
        ? ['arrows', 'arrow-left-s']
        : ['arrows', 'arrow-right-s'];

    const ariaLabel = direction === 'prev' ? '이전 페이지' : '다음 페이지';
    const navSize = size === 'sm' ? 'width-28 height-28' : 'width-32 height-32';
    const iconSize = size === 'sm' ? 16 : 20;

    const baseStyles = cn(
      navSize, 'rounded-sm',
      'flex items-center justify-center',
      'transition-colors',
      disabled
        ? 'bg-state-disabled cursor-not-allowed'
        : 'bg-state-soft hover:bg-state-soft-hover cursor-pointer',
      className
    );

    const iconElement = (
      <Icon
        iconType={iconType}
        size={iconSize}
        className={cn(disabled ? 'text-hint pointer-events-none' : 'text-subtle')}
      />
    );

    if (href && !disabled) {
      return (
        <a
          href={href}
          className={baseStyles}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {iconElement}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={baseStyles}
        disabled={disabled}
        aria-label={ariaLabel}
        onClick={onClick}
        {...props}
      >
        {iconElement}
      </button>
    );
  }
);

PaginationNav.displayName = 'PaginationNav';
