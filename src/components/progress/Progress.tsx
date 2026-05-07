import * as React from 'react';
import { cn } from '@/lib/utils';
import type { ProgressProps, ProgressColor } from './Progress.types';

const FILL_COLOR_MAP: Record<ProgressColor, string> = {
  gray: 'bg-basic-gray-accent',
  brand: 'bg-state-brand',
  red: 'bg-basic-red-accent',
  orange: 'bg-basic-orange-accent',
  amber: 'bg-basic-amber-accent',
  yellow: 'bg-basic-yellow-accent',
  lime: 'bg-basic-lime-accent',
  green: 'bg-basic-green-accent',
  emerald: 'bg-basic-emerald-accent',
  teal: 'bg-basic-teal-accent',
  cyan: 'bg-basic-cyan-accent',
  sky: 'bg-basic-sky-accent',
  blue: 'bg-basic-blue-accent',
  indigo: 'bg-basic-indigo-accent',
  violet: 'bg-basic-violet-accent',
  purple: 'bg-basic-purple-accent',
  fuchsia: 'bg-basic-fuchsia-accent',
  pink: 'bg-basic-pink-accent',
  rose: 'bg-basic-rose-accent',
};

/**
 * Progress 컴포넌트
 *
 * 선형 및 원형 프로그레스 바입니다. 다양한 색상과 라벨을 지원합니다.
 *
 * @example
 * ```tsx
 * <Progress value={50} max={100} />
 * ```
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = 'linear',
      color = 'gray',
      gradient,
      label,
      showValue = false,
      formatValue,
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

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between margin-b-8">
            {label && (
              <span className="font-body size-sm line-height-leading-5 font-medium text-default">
                {label}
              </span>
            )}
            {showValue && !isIndeterminate && (
              <span className="font-body size-sm line-height-leading-5 text-muted">
                {displayValue}
              </span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-busy={isIndeterminate}
          aria-label={label}
          className={cn(
            'relative w-full height-4 rounded-full overflow-hidden',
            variant === 'dashed' ? 'bg-transparent' : 'bg-basic-gray-alpha-10'
          )}
        >
          {variant === 'dashed' ? (
            <DashedTrack
              percentage={percentage}
              color={color}
              isIndeterminate={isIndeterminate}
            />
          ) : (
            <div
              className={cn(
                'h-full rounded-full transition-[width] duration-300',
                !gradient && FILL_COLOR_MAP[color],
                isIndeterminate && 'animate-progress-indeterminate'
              )}
              style={{
                width: isIndeterminate ? '40%' : `${percentage}%`,
                ...(gradient ? { background: gradient } : {}),
              }}
            />
          )}
        </div>
        {captionText && (
          <span className={cn('block font-body size-xs line-height-leading-4 margin-t-4', captionColorClass)}>
            {captionText}
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

interface DashedTrackProps {
  percentage: number;
  color: ProgressColor;
  isIndeterminate: boolean;
}

function DashedTrack({ percentage, color, isIndeterminate }: DashedTrackProps) {
  const segmentCount = 10;
  const filledSegments = isIndeterminate
    ? 0
    : Math.round((percentage / 100) * segmentCount);

  return (
    <div className="flex ds-gap-2 h-full">
      {Array.from({ length: segmentCount }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'flex-1 h-full rounded-full',
            isIndeterminate
              ? cn(FILL_COLOR_MAP[color], 'animate-progress-dashed-sweep')
              : cn(
                  'transition-colors duration-200',
                  index < filledSegments
                    ? FILL_COLOR_MAP[color]
                    : 'bg-basic-gray-alpha-10'
                )
          )}
          style={isIndeterminate ? { animationDelay: `${index * 0.15}s` } : undefined}
        />
      ))}
    </div>
  );
}

export { Progress };
