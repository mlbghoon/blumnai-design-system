import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import type { PaginationEllipsisProps } from '../Pagination.types';

export const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          'width-32 height-32',
          'flex items-center justify-center',
          'font-body size-sm font-medium line-height-leading-5',
          'text-hint',
          className
        )}
        {...props}
      >
        ...
        <span className="sr-only">더 많은 페이지</span>
      </span>
    );
  }
);

PaginationEllipsis.displayName = 'PaginationEllipsis';
