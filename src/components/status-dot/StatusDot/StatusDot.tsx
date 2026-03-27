import { forwardRef, memo } from 'react';

import { cn } from '../../../utils/cn';
import type { StatusDotProps, StatusDotColor, StatusDotSize } from './StatusDot.types';

const COLOR_MAP: Record<StatusDotColor, string> = {
  green: 'bg-basic-green-accent',
  red: 'bg-basic-red-accent',
  orange: 'bg-basic-orange-accent',
  gray: 'bg-basic-gray-accent',
};

const SIZE_MAP: Record<StatusDotSize, string> = {
  sm: 'width-8 height-8',
  md: 'width-10 height-10',
};

export const StatusDot = memo(forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ color = 'green', label, size = 'md', onClick, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center ds-gap-6', onClick && 'cursor-pointer', className)}
        onClick={onClick}
        {...props}
      >
        <span
          className={cn(
            'rounded-full flex-shrink-0',
            COLOR_MAP[color],
            SIZE_MAP[size]
          )}
          aria-hidden="true"
        />
        {label && (
          <span className="font-body size-sm line-height-leading-5 text-default">
            {label}
          </span>
        )}
      </span>
    );
  }
));

StatusDot.displayName = 'StatusDot';
