import { forwardRef, useMemo } from 'react';

import { cn } from '../../../utils/cn';

import { TooltipItem } from './TooltipItem';
import type { TooltipProps } from './Tooltip.types';

/**
 * Tooltip 컴포넌트
 *
 * 컨텍스트 정보를 표시하는 툴팁 컴포넌트입니다.
 * 기본 및 고급 변형을 지원하며 라이트 모드와 다크 모드를 지원합니다.
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
  variant = 'default',
  darkMode = false,
  className,
  children,
  badge,
  items,
  ...props
}, ref) => {
  const baseClasses = useMemo(() => {
    const paddingClasses = variant === 'advanced' ? 'p-1' : 'px-1 py-0.5';

    return cn(
      'rounded-[4px]',
      paddingClasses,
      darkMode ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.1)]' : 'shadow-[0_0_0_1px_rgba(39,39,42,0.1)]',
      darkMode ? 'bg-[#222225]' : 'bg-white',
      variant === 'default' ? 'flex items-center justify-center gap-0.5' : 'flex flex-col gap-1',
      className
    );
  }, [variant, darkMode, className]);

  const content = useMemo(() => {
    if (variant === 'advanced' && items) {
      return (
        <>
          {items.map((item, index) => (
            <TooltipItem key={index} {...item} darkMode={darkMode} />
          ))}
        </>
      );
    }

    if (variant === 'default') {
      const textColor = darkMode ? 'text-white' : 'text-[#111115]';

      return (
        <>
          <div className={cn('min-h-5', 'px-1', 'flex items-center justify-start')}>
            <span className={cn('text-xs leading-4 font-medium', 'break-words', textColor)}>
              {children}
            </span>
          </div>
          {badge && (
            <div
              className={cn(
                'h-4 min-w-4',
                'px-1',
                'rounded-[4px]',
                'flex items-center justify-center',
                darkMode ? 'bg-[rgba(255,255,255,0.08)]' : 'bg-[rgba(39,39,42,0.06)]',
                darkMode ? 'outline outline-1 outline-[rgba(255,255,255,0.15)]' : 'outline outline-1 outline-[rgba(39,39,42,0.15)]',
                'outline-offset-[-1px]'
              )}
            >
              <span
                className={cn(
                  'text-xs leading-4 font-medium',
                  'break-words',
                  darkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[#4E4E55]'
                )}
              >
                {badge}
              </span>
            </div>
          )}
        </>
      );
    }

    return children;
  }, [variant, items, children, badge, darkMode]);

  return (
    <div
      ref={ref}
      className={baseClasses}
      role="tooltip"
      {...props}
    >
      {content}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';
