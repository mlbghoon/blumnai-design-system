import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';
import type { SliderRangeProps } from './Slider.types';
import { SliderThumb, SliderTrack, SliderRangeFilled, SliderTicks } from './shared';

/**
 * SliderRange 컴포넌트
 *
 * 두 개의 핸들로 최솟값과 최댓값 범위를 선택하는 슬라이더입니다.
 *
 * @example
 * <SliderRange value={[20, 80]} onChange={setRange} min={0} max={100} />
 */
const SliderRange = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderRangeProps
>(({
  className,
  color = 'gray',
  showValue = false,
  formatValue,
  label,
  onChange,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  showTicks = false,
  tickCount = 11,
  formatTick,
  ...props
}, ref) => {
  const [trackedValue, setTrackedValue] = React.useState<[number, number]>(
    value ?? defaultValue ?? [min, max]
  );
  const internalValue = value ?? trackedValue;
  const formatFn = formatValue ?? String;

  const handleValueChange = React.useCallback((values: number[]) => {
    setTrackedValue([values[0], values[1]]);
    onChange?.([values[0], values[1]]);
  }, [onChange]);

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between margin-b-8">
          {label && (
            <label className="font-body size-sm line-height-leading-5 font-medium text-default">
              {label}
            </label>
          )}
          {showValue && (
            <span className="font-body size-sm line-height-leading-5 text-muted">
              {formatFn(internalValue[0])} - {formatFn(internalValue[1])}
            </span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          'h-[16px] padding-x-8',
          disabled && 'cursor-not-allowed'
        )}
        value={value}
        defaultValue={defaultValue ?? [min, max]}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderTrack>
          <SliderRangeFilled color={color} />
        </SliderTrack>
        <SliderThumb
          disabled={disabled}
          showTooltip
          tooltipValue={formatFn(internalValue[0])}
        />
        <SliderThumb
          disabled={disabled}
          showTooltip
          tooltipValue={formatFn(internalValue[1])}
        />
      </SliderPrimitive.Root>
      {showTicks && (
        <SliderTicks
          min={min}
          max={max}
          step={step}
          tickCount={tickCount}
          formatTick={formatTick}
        />
      )}
    </div>
  );
});

SliderRange.displayName = 'SliderRange';

export { SliderRange };
