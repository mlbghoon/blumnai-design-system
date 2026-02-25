import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';
import type { SliderProps } from './Slider.types';
import { SliderThumb, SliderTrack, SliderRangeFilled, SliderTicks } from './shared';

/**
 * Slider 컴포넌트
 *
 * 단일 값 슬라이더입니다. 틱 마크, 라벨, 다양한 색상을 지원합니다.
 *
 * @example
 * <Slider value={50} onChange={setValue} min={0} max={100} />
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
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
  const [trackedValue, setTrackedValue] = React.useState(value ?? defaultValue ?? min);
  const internalValue = value ?? trackedValue;
  const displayValue = formatValue
    ? formatValue(internalValue)
    : String(internalValue);

  const handleValueChange = React.useCallback((values: number[]) => {
    setTrackedValue(values[0]);
    onChange?.(values[0]);
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
              {displayValue}
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
        value={value !== undefined ? [value] : undefined}
        defaultValue={defaultValue !== undefined ? [defaultValue] : [min]}
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
          tooltipValue={displayValue}
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

Slider.displayName = 'Slider';

export { Slider };
