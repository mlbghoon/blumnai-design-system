import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import type { PaginationEllipsisProps } from '../Pagination.types';

export const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, onClick, ...props }, ref) => {
    const isClickable = !!onClick;

    return (
      <span
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-hidden={isClickable ? undefined : true}
        aria-label={isClickable ? '페이지 건너뛰기' : undefined}
        className={cn(
          'width-32 height-32',
          'flex items-center justify-center',
          'font-body size-sm font-medium line-height-leading-5',
          'text-hint',
          isClickable && 'cursor-pointer hover:bg-state-ghost-hover hover:text-muted rounded-sm transition-colors',
          className
        )}
        onClick={onClick}
        onKeyDown={isClickable ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
          }
        } : undefined}
        {...props}
      >
        ...
        {!isClickable && <span className="sr-only">더 많은 페이지</span>}
      </span>
    );
  }
);

PaginationEllipsis.displayName = 'PaginationEllipsis';
