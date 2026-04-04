import { forwardRef, useMemo } from 'react';

import { cn } from '../../../utils/cn';
import { Skeleton } from '../../skeleton/Skeleton';

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
      isLoading,
      responsive: _responsive,
      onDataPointClick: _onDataPointClick,
      renderTooltip: _renderTooltip,
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
    'bg-state-ghost',
    'rounded-lg',
    'shadow-modal-sm',
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
      {isLoading ? (
        <div className="flex flex-col ds-gap-8 padding-16 w-full h-full">
          <Skeleton variant="text" className="height-16 w-1/3" />
          <Skeleton variant="default" className="flex-1 w-full" height={height ? (typeof height === 'number' ? height - 60 : undefined) : 200} />
        </div>
      ) : (
        children
      )}
    </div>
  );
  }
);

Chart.displayName = 'Chart';
