import { forwardRef, useMemo, useState, useEffect, useRef, useCallback } from 'react';

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
      responsive,
      onDataPointClick: _onDataPointClick,
      ...props
    },
    ref
  ) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [responsiveSize, setResponsiveSize] = useState<{ width: number; height: number } | null>(null);

  const mergedRef = useCallback((node: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  }, [ref]);

  useEffect(() => {
    if (!responsive || !containerRef.current) return;
    const el = containerRef.current;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setResponsiveSize({
          width: Math.round(entry.contentRect.width),
          height: Math.round(entry.contentRect.height),
        });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [responsive]);

  const effectiveWidth = responsive && responsiveSize ? responsiveSize.width : width;
  const effectiveHeight = responsive && responsiveSize ? responsiveSize.height : height;

  const containerStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    if (responsive) {
      style.width = '100%';
      style.height = height ? (typeof height === 'number' ? `${height}px` : height) : '100%';
    } else {
      if (width) {
        style.width = typeof width === 'number' ? `${width}px` : width;
      }
      if (height) {
        style.minHeight = typeof height === 'number' ? `${height}px` : height;
        style.height = 'auto';
      }
    }
    return style;
  }, [width, height, responsive]);

  const containerClassName = cn(
    'relative',
    'bg-state-ghost',
    'rounded-lg',
    'shadow-[0_0_1px_rgba(39,39,42,0.1),0_12px_12px_-6px_rgba(0,0,0,0.04),0_6px_6px_-3px_rgba(0,0,0,0.04),0_3px_3px_-1.5px_rgba(0,0,0,0.04),0_1px_1px_-0.5px_rgba(0,0,0,0.04)]',
    className
  );

  return (
    <div
      ref={mergedRef}
      className={containerClassName}
      style={containerStyle}
      role="img"
      aria-label={ariaLabel}
      data-responsive-width={effectiveWidth}
      data-responsive-height={effectiveHeight}
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
