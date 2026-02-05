import { forwardRef, useMemo } from 'react';

import { cn } from '../../../utils/cn';

import type { BaseChartProps } from './Chart.types';

/**
 * 기본 Chart 컴포넌트
 *
 * 모든 차트 유형에 대한 공통 스타일링과 컨테이너를 제공합니다.
 * Figma 디자인에 맞는 흰색 배경, 그림자, 적절한 간격을 적용합니다.
 */
export const Chart = forwardRef<HTMLDivElement, Omit<BaseChartProps, 'data'> & { children?: React.ReactNode }>(
  (
    {
      width,
      height,
      className,
      children,
      ariaLabel,
      ...props
    },
    ref
  ) => {
  const containerStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    if (width) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height) {
      style.minHeight = typeof height === 'number' ? `${height}px` : height;
      style.height = 'auto';
    }
    return style;
  }, [width, height]);

  const containerClassName = cn(
    'relative',
    'bg-card',
    'rounded-lg',
    'shadow-[0_0_1px_rgba(39,39,42,0.1),0_12px_12px_-6px_rgba(0,0,0,0.04),0_6px_6px_-3px_rgba(0,0,0,0.04),0_3px_3px_-1.5px_rgba(0,0,0,0.04),0_1px_1px_-0.5px_rgba(0,0,0,0.04)]',
    className
  );

  return (
    <div
      ref={ref}
      className={containerClassName}
      style={containerStyle}
      role="img"
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </div>
  );
  }
);

Chart.displayName = 'Chart';
