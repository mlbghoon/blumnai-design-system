import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import type { PaginationItemProps } from '../Pagination.types';

export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, isActive, variant = 'numbered', disabled, href, children, onClick, ...props }, ref) => {
    const baseStyles =
      variant === 'numbered'
        ? cn(
            'width-32 height-32 rounded-sm',
            'flex items-center justify-center',
            'font-body size-sm font-medium line-height-leading-5',
            'transition-colors',
            isActive
              ? 'border-solid border-[1px] border-[color:var(--bg-basic-blue-accent)] text-basic-blue-strong'
              : 'text-hint hover:bg-state-ghost-hover hover:text-muted',
            disabled
              ? 'cursor-not-allowed opacity-40'
              : 'cursor-pointer',
            className
          )
        : cn(
            'width-10 height-10 rounded-full',
            'transition-colors',
            isActive
              ? 'bg-basic-blue-accent'
              : 'bg-state-soft hover:bg-state-soft-hover',
            disabled
              ? 'cursor-not-allowed opacity-40'
              : 'cursor-pointer',
            className
          );

    const ariaLabel = (typeof children === 'string' || typeof children === 'number')
      ? (isActive ? `${children} 페이지, 현재 페이지` : `${children} 페이지로 이동`)
      : undefined;

    if (href && !disabled) {
      return (
        <a
          href={href}
          className={baseStyles}
          aria-current={isActive ? 'page' : undefined}
          aria-label={ariaLabel}
          onClick={onClick}
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
        aria-label={variant === 'dot'
          ? (isActive ? `Slide ${children}, current` : `Go to slide ${children}`)
          : ariaLabel
        }
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PaginationItem.displayName = 'PaginationItem';
