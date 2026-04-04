import * as React from 'react';
import { cn } from '@/lib/utils';
import type {
  ProgressCircularProps,
  ProgressCircularVariant,
  ProgressColor,
} from './Progress.types';

const STROKE_COLOR_MAP: Record<ProgressColor, string> = {
  gray: 'var(--bg-basic-gray-accent)',
  brand: 'var(--bg-state-brand)',
  red: 'var(--bg-basic-red-accent)',
  orange: 'var(--bg-basic-orange-accent)',
  amber: 'var(--bg-basic-amber-accent)',
  yellow: 'var(--bg-basic-yellow-accent)',
  lime: 'var(--bg-basic-lime-accent)',
  green: 'var(--bg-basic-green-accent)',
  emerald: 'var(--bg-basic-emerald-accent)',
  teal: 'var(--bg-basic-teal-accent)',
  cyan: 'var(--bg-basic-cyan-accent)',
  sky: 'var(--bg-basic-sky-accent)',
  blue: 'var(--bg-basic-blue-accent)',
  indigo: 'var(--bg-basic-indigo-accent)',
  violet: 'var(--bg-basic-violet-accent)',
  purple: 'var(--bg-basic-purple-accent)',
  fuchsia: 'var(--bg-basic-fuchsia-accent)',
  pink: 'var(--bg-basic-pink-accent)',
  rose: 'var(--bg-basic-rose-accent)',
};

const VARIANT_STROKE_MAP: Record<ProgressCircularVariant, string | null> = {
  default: null,
  success: 'var(--bg-basic-green-accent)',
  failed: 'var(--bg-basic-red-accent)',
};

const TEXT_COLOR_MAP: Record<ProgressColor, string> = {
  gray: 'text-default',
  brand: 'text-informative',
  red: 'text-destructive',
  orange: 'text-warning',
  amber: 'text-warning',
  yellow: 'text-warning',
  lime: 'text-success',
  green: 'text-success',
  emerald: 'text-success',
  teal: 'text-success',
  cyan: 'text-informative',
  sky: 'text-informative',
  blue: 'text-informative',
  indigo: 'text-informative',
  violet: 'text-informative',
  purple: 'text-informative',
  fuchsia: 'text-informative',
  pink: 'text-destructive',
  rose: 'text-destructive',
};

const VARIANT_TEXT_MAP: Record<ProgressCircularVariant, string | null> = {
  default: null,
  success: 'text-success',
  failed: 'text-destructive',
};

/**
 * ProgressCircular 컴포넌트
 *
 * 원형 프로그레스 인디케이터입니다. 크기, 색상, 퍼센트 텍스트를 지원합니다.
 *
 * @example
 * <ProgressCircular value={75} size={60} showValue />
 */
const ProgressCircular = React.forwardRef<HTMLDivElement, ProgressCircularProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = 'default',
      color = 'gray',
      shape = 'full',
      showLabel = true,
      formatValue,
      size = 96,
      strokeWidth = 8,
      caption,
      error,
      success,
      ...props
    },
    ref
  ) => {
    const hasError = error === true || (typeof error === 'string' && error.length > 0);
    const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);
    const errorText = typeof error === 'string' && error.length > 0 ? error : undefined;
    const successText = typeof success === 'string' && success.length > 0 ? success : undefined;
    const captionText = errorText || successText || caption;
    const captionColorClass = hasError ? 'text-destructive' : hasSuccess ? 'text-success' : 'text-muted';
    const isIndeterminate = value === undefined;
    const percentage = isIndeterminate
      ? 0
      : Math.min(100, Math.max(0, (value / max) * 100));
    const displayValue = formatValue
      ? formatValue(Math.round(percentage))
      : `${Math.round(percentage)}%`;

    const isHalf = shape === 'half';
    const radius = (size - strokeWidth) / 2;
    const circumference = isHalf ? Math.PI * radius : 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const strokeColor =
      variant === 'default'
        ? STROKE_COLOR_MAP[color]
        : VARIANT_STROKE_MAP[variant];

    const textColorClass =
      variant === 'default'
        ? TEXT_COLOR_MAP[color]
        : VARIANT_TEXT_MAP[variant];

    const center = size / 2;
    const viewBoxHeight = isHalf ? center + strokeWidth / 2 : size;

    const halfCirclePath = isHalf
      ? `M ${strokeWidth / 2},${viewBoxHeight} A ${radius},${radius} 0 0 1 ${size - strokeWidth / 2},${viewBoxHeight}`
      : '';

    return (
      <div
        ref={ref}
        className={cn('inline-flex flex-col items-center', className)}
        {...props}
      >
        <div
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-busy={isIndeterminate}
          className="relative inline-flex items-center justify-center"
          style={{
            width: size,
            height: viewBoxHeight,
          }}
        >
          <svg
            width={size}
            height={viewBoxHeight}
            viewBox={`0 0 ${size} ${viewBoxHeight}`}
            className={cn(isIndeterminate && 'animate-progress-circular-spin')}
            style={!isHalf ? { transform: 'rotate(-90deg)' } : undefined}
          >
            {isHalf ? (
              <>
                <path
                  d={halfCirclePath}
                  fill="none"
                  stroke="var(--bg-basic-gray-alpha-10)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <path
                  d={halfCirclePath}
                  fill="none"
                  stroke={strokeColor ?? STROKE_COLOR_MAP.gray}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-[stroke-dashoffset] duration-300"
                />
              </>
            ) : (
              <>
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="var(--bg-basic-gray-alpha-10)"
                  strokeWidth={strokeWidth}
                />
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={strokeColor ?? STROKE_COLOR_MAP.gray}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-[stroke-dashoffset] duration-300"
                />
              </>
            )}
          </svg>
          {showLabel && !isIndeterminate && (
            <span
              className={cn(
                'absolute font-body font-medium',
                size < 64
                  ? 'size-xs line-height-leading-4'
                  : size < 96
                    ? 'size-sm line-height-leading-5'
                    : 'size-md line-height-leading-6',
                textColorClass,
                isHalf && 'bottom-0'
              )}
            >
              {displayValue}
            </span>
          )}
        </div>
        {captionText && (
          <span className={cn('block font-body size-xs line-height-leading-4 margin-t-8', captionColorClass)}>
            {captionText}
          </span>
        )}
      </div>
    );
  }
);

ProgressCircular.displayName = 'ProgressCircular';

export { ProgressCircular };
