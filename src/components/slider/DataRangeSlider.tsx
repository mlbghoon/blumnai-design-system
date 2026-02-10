import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';
import type { DataRangeSliderProps } from './Slider.types';
import { SliderThumb, SliderTrack, SliderRangeFilled, SliderChart, SliderTicks } from './shared';

/**
 * DataRangeSlider 컴포넌트
 *
 * 데이터 분포 차트가 포함된 범위 슬라이더입니다.
 *
 * @example
 * <DataRangeSlider chartData={[10, 30, 50, 40, 20]} value={[20, 80]} onChange={setRange} />
 */
const DataRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DataRangeSliderProps
>(({
  className,
  color = 'gray',
  formatValue,
  label,
  separator = '~',
  chartData,
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
  const internalValue = value ?? defaultValue ?? [min, max];
  const formatFn = formatValue ?? ((v: number) => `${v}%`);

  const handleValueChange = React.useCallback((values: number[]) => {
    onChange?.([values[0], values[1]]);
  }, [onChange]);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between margin-b-8">
        {label && (
          <label className="font-body size-sm line-height-leading-5 font-medium text-default">
            {label}
          </label>
        )}
        <span className="font-body size-sm line-height-leading-5 text-muted">
          {formatFn(internalValue[0])} {separator} {formatFn(internalValue[1])}
        </span>
      </div>
      {chartData && chartData.length > 0 && (
        <SliderChart
          data={chartData}
          min={min}
          max={max}
          value={internalValue}
          color={color}
          disabled={disabled}
        />
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          'h-[16px] padding-x-8',
          chartData && chartData.length > 0 && '-mt-[6px]',
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

DataRangeSlider.displayName = 'DataRangeSlider';

export { DataRangeSlider };
