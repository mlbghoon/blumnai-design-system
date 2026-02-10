import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import type { PaginationItemProps } from '../Pagination.types';

export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, isActive, variant = 'numbered', disabled, href, children, ...props }, ref) => {
    const baseStyles =
      variant === 'numbered'
        ? cn(
            'width-32 height-32 rounded-sm',
            'flex items-center justify-center',
            'font-body size-sm font-medium line-height-leading-5',
            'transition-colors',
            isActive
              ? 'border-solid border-[1px] border-[color:var(--border-highlight-accent)] text-basic-blue-strong'
              : 'text-hint hover:bg-state-soft hover:text-subtle',
            disabled
              ? 'cursor-not-allowed opacity-40'
              : 'cursor-pointer',
            className
          )
        : cn(
            'width-10 height-10 rounded-full',
            'transition-colors',
            isActive
              ? 'bg-state-primary'
              : 'bg-state-soft hover:bg-state-soft-hover',
            disabled
              ? 'cursor-not-allowed opacity-40'
              : 'cursor-pointer',
            className
          );

    if (href && !disabled) {
      return (
        <a
          href={href}
          className={baseStyles}
          aria-current={isActive ? 'page' : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={baseStyles}
        disabled={disabled}
        aria-current={isActive ? 'page' : undefined}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PaginationItem.displayName = 'PaginationItem';
