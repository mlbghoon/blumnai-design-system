import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

import { TooltipItem } from './TooltipItem';
import type { AdvancedTooltipProps } from './Tooltip.types';

/**
 * AdvancedTooltip 컴포넌트
 *
 * 구분선, 라벨, 인디케이터가 있는 아이템, 텍스트 등 다양한 항목을 표시하는 툴팁입니다.
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
        'flex flex-col items-center justify-center ds-gap-4',
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
