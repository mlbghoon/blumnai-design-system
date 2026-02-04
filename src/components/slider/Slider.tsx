import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';
import type { SliderProps, SliderSize, SliderColor } from './Slider.types';

const SIZE_CONFIG: Record<SliderSize, { track: string; thumb: string; root: string }> = {
  sm: {
    track: 'h-[4px]',
    thumb: 'width-12 height-12',
    root: 'h-[12px]',
  },
  md: {
    track: 'h-[6px]',
    thumb: 'width-16 height-16',
    root: 'h-[16px]',
  },
  lg: {
    track: 'h-[8px]',
    thumb: 'width-20 height-20',
    root: 'h-[20px]',
  },
};

const COLOR_CONFIG: Record<SliderColor, { range: string; thumb: string }> = {
  primary: {
    range: 'bg-state-brand',
    thumb: 'border-state-brand focus-visible:ring-state-brand/30',
  },
  secondary: {
    range: 'bg-state-secondary',
    thumb: 'border-state-secondary focus-visible:ring-state-secondary/30',
  },
  success: {
    range: 'bg-state-success',
    thumb: 'border-state-success focus-visible:ring-state-success/30',
  },
  destructive: {
    range: 'bg-state-destructive',
    thumb: 'border-state-destructive focus-visible:ring-state-destructive/30',
  },
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({
  className,
  size = 'md',
  color = 'primary',
  showValue = false,
  formatValue,
  showTicks = false,
  tickCount = 5,
  label,
  onChange,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  ...props
}, ref) => {
  const sizeConfig = SIZE_CONFIG[size];
  const colorConfig = COLOR_CONFIG[color];

  const currentValue = value ?? defaultValue ?? [min];
  const displayValue = formatValue
    ? formatValue(currentValue[0])
    : String(currentValue[0]);

  const ticks = React.useMemo(() => {
    if (!showTicks) return [];
    const tickPositions: number[] = [];
    for (let i = 0; i < tickCount; i++) {
      tickPositions.push(min + (max - min) * (i / (tickCount - 1)));
    }
    return tickPositions;
  }, [showTicks, tickCount, min, max]);

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between margin-b-8">
          {label && (
            <label className="font-body size-sm font-medium text-default">
              {label}
            </label>
          )}
          {showValue && (
            <span className="font-body size-sm text-muted">
              {displayValue}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            'relative flex w-full touch-none select-none items-center',
            sizeConfig.root,
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onValueChange={onChange}
          {...props}
        >
          <SliderPrimitive.Track
            className={cn(
              'relative w-full grow overflow-hidden rounded-full bg-muted',
              sizeConfig.track
            )}
          >
            <SliderPrimitive.Range
              className={cn('absolute h-full', colorConfig.range)}
            />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(
              'block rounded-full border-2 bg-card shadow-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2',
              'disabled:pointer-events-none',
              sizeConfig.thumb,
              colorConfig.thumb
            )}
          />
        </SliderPrimitive.Root>
        {showTicks && (
          <div className="relative w-full margin-t-4">
            {ticks.map((tick, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${((tick - min) / (max - min)) * 100}%` }}
              >
                <div className="width-2 height-8 bg-muted rounded-full" />
                <span className="font-body size-xs text-hint margin-t-2 block text-center">
                  {formatValue ? formatValue(tick) : tick}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';

export { Slider };
