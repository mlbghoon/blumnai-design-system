import { useMemo } from 'react';

import { cn } from '../../../utils/cn';

import type { BaseChartProps } from './Chart.types';

/**
 * Base Chart component
 *
 * Provides common styling and container for all chart types.
 * Matches Figma design with white background, shadows, and proper spacing.
 */
export const Chart = ({
  width,
  height,
  darkMode = false,
  className,
  children,
  ...props
}: Omit<BaseChartProps, 'data'> & { children?: React.ReactNode }) => {
  const containerStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    if (width) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height) {
      style.minHeight = typeof height === 'number' ? `${height}px` : height;
      // Allow content to expand beyond height for legends
      style.height = 'auto';
    }
    return style;
  }, [width, height]);

  const containerClassName = cn(
    'relative',
    'bg-white',
    'rounded-lg',
    'shadow-[0_0_1px_rgba(39,39,42,0.1),0_12px_12px_-6px_rgba(0,0,0,0.04),0_6px_6px_-3px_rgba(0,0,0,0.04),0_3px_3px_-1.5px_rgba(0,0,0,0.04),0_1px_1px_-0.5px_rgba(0,0,0,0.04)]',
    darkMode && 'bg-[#111115]',
    className
  );

  return (
    <div className={containerClassName} style={containerStyle} {...props}>
      {children}
    </div>
  );
};

Chart.displayName = 'Chart';
