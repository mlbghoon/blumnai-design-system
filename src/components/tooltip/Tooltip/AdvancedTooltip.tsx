import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

import { TooltipItem } from './TooltipItem';
import type { AdvancedTooltipProps } from './Tooltip.types';

/**
 * AdvancedTooltip component
 *
 * A tooltip that displays multiple items including dividers, labels, items with indicators, and text.
 */
export const AdvancedTooltip = forwardRef<HTMLDivElement, AdvancedTooltipProps>(({
  className,
  items,
  minWidth,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-card-xs',
        'padding-4',
        'bg-card',
        'shadow-modal-sm',
        'flex flex-col items-center justify-center gap-4',
        className
      )}
      style={minWidth ? { minWidth: `${minWidth}px` } : undefined}
      role="tooltip"
      {...props}
    >
      {items.map((item, index) => (
        <TooltipItem key={index} {...item} />
      ))}
    </div>
  );
});

AdvancedTooltip.displayName = 'AdvancedTooltip';
