import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

import type { TooltipProps } from './Tooltip.types';

/**
 * Tooltip component
 *
 * A simple tooltip that displays contextual information with optional badge.
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
  className,
  children,
  badge,
  maxWidth = 240,
  style,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-card-xs',
        'padding-y-2 padding-x-4',
        'bg-card',
        'shadow-modal-sm',
        'inline-flex items-center justify-center gap-2',
        className
      )}
      style={{ maxWidth, ...style }}
      role="tooltip"
      {...props}
    >
      <div className={cn('flex', 'min-height-20', 'padding-x-4', 'items-center')}>
        <span className="font-body size-xs line-height-leading-4 font-medium letter-spacing-tracking-normal text-default whitespace-pre-line">
          {children}
        </span>
      </div>
      {badge && (
        <div
          className={cn(
            'h-4 min-w-4',
            'px-1',
            'rounded',
            'inline-flex items-center justify-center',
            'bg-state-soft',
            'border border-darker'
          )}
        >
          <span className="text-xs leading-4 font-medium tracking-tight text-subtle">
            {badge}
          </span>
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';
