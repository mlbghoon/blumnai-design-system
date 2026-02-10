import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

import type { TooltipProps } from './Tooltip.types';

/**
 * Tooltip 컴포넌트
 *
 * 선택적 배지와 함께 컨텍스트 정보를 표시하는 간단한 툴팁입니다.
 *
 * @example
 * <Tooltip badge="Ctrl+S">저장 단축키</Tooltip>
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
            'height-16 min-width-16',
            'padding-x-4',
            'rounded',
            'inline-flex items-center justify-center',
            'bg-state-soft',
            'border-darker'
          )}
        >
          <span className="size-xs line-height-leading-4 font-medium letter-spacing-tracking-tight text-subtle">
            {badge}
          </span>
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';
