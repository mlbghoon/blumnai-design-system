import * as React from 'react';

import { cn } from '@/lib/utils';
import type { SliderColor } from '../Slider.types';

const CHART_SELECTED_COLOR_MAP: Record<SliderColor, string> = {
  gray: 'var(--bg-basic-gray-alpha-15)',
  brand: 'var(--bg-basic-blue-alpha-15)',
  red: 'var(--bg-basic-red-alpha-15)',
  orange: 'var(--bg-basic-orange-alpha-15)',
  amber: 'var(--bg-basic-amber-alpha-15)',
  yellow: 'var(--bg-basic-yellow-alpha-15)',
  lime: 'var(--bg-basic-lime-alpha-15)',
  green: 'var(--bg-basic-green-alpha-15)',
  emerald: 'var(--bg-basic-emerald-alpha-15)',
  teal: 'var(--bg-basic-teal-alpha-15)',
  cyan: 'var(--bg-basic-cyan-alpha-15)',
  sky: 'var(--bg-basic-sky-alpha-15)',
  blue: 'var(--bg-basic-blue-alpha-15)',
  indigo: 'var(--bg-basic-indigo-alpha-15)',
  violet: 'var(--bg-basic-violet-alpha-15)',
  purple: 'var(--bg-basic-purple-alpha-15)',
  fuchsia: 'var(--bg-basic-fuchsia-alpha-15)',
  pink: 'var(--bg-basic-pink-alpha-15)',
  rose: 'var(--bg-basic-rose-alpha-15)',
};

export interface SliderChartProps {
  data: number[];
  min: number;
  max: number;
  value: [number, number];
  color?: SliderColor;
  disabled?: boolean;
  className?: string;
}

const SliderChart = React.forwardRef<HTMLDivElement, SliderChartProps>(
  ({ data, min, max, value, color = 'gray', disabled, className }, ref) => {
    const id = React.useId();
    const pointCount = data.length;
    if (pointCount === 0) return null;

    const height = 32;
    const range = max - min;
    const startPercent = ((value[0] - min) / range) * 100;
    const endPercent = ((value[1] - min) / range) * 100;

    const createPath = (dataPoints: number[]): string => {
      if (dataPoints.length === 0) return '';

      const points = dataPoints.map((val, index) => {
        const x = (index / (dataPoints.length - 1)) * 100;
        const y = height - Math.max(0, Math.min(1, val)) * height;
        return { x, y };
      });

      let path = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpX = (prev.x + curr.x) / 2;
        path += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
      }

      path += ` L 100 ${height} L 0 ${height} Z`;

      return path;
    };

    const fullPath = createPath(data);

    return (
      <div
        ref={ref}
        className={cn('relative w-full h-[32px] padding-x-8', disabled && 'opacity-50', className)}
      >
        <svg
          viewBox={`0 0 100 ${height}`}
          preserveAspectRatio="none"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <clipPath id={`${id}-selected`}>
              <rect
                x={startPercent}
                y="0"
                width={endPercent - startPercent}
                height={height}
              />
            </clipPath>
            <clipPath id={`${id}-left`}>
              <rect x="0" y="0" width={startPercent} height={height} />
            </clipPath>
            <clipPath id={`${id}-right`}>
              <rect x={endPercent} y="0" width={100 - endPercent} height={height} />
            </clipPath>
          </defs>

          <path
            d={fullPath}
            fill="var(--bg-basic-gray-alpha-10)"
            clipPath={`url(#${id}-left)`}
          />
          <path
            d={fullPath}
            fill={CHART_SELECTED_COLOR_MAP[color]}
            clipPath={`url(#${id}-selected)`}
          />
          <path
            d={fullPath}
            fill="var(--bg-basic-gray-alpha-10)"
            clipPath={`url(#${id}-right)`}
          />
        </svg>
      </div>
    );
  }
);

SliderChart.displayName = 'SliderChart';

export { SliderChart };
