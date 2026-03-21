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
  orientation = 'horizontal',
  height = 200,
  ...props
}, ref) => {
  const labelId = React.useId();
  const [trackedValue, setTrackedValue] = React.useState(value ?? defaultValue ?? min);
  const internalValue = value ?? trackedValue;
  const displayValue = formatValue
    ? formatValue(internalValue)
    : String(internalValue);
  const isVertical = orientation === 'vertical';

  const handleValueChange = React.useCallback((values: number[]) => {
    setTrackedValue(values[0]);
    onChange?.(values[0]);
  }, [onChange]);

  return (
    <div className={cn(isVertical ? 'inline-flex flex-col' : 'w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between margin-b-8">
          {label && (
            <label id={labelId} className="font-body size-sm line-height-leading-5 font-medium text-default">
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
      <div className={cn(isVertical && 'flex flex-row')}>
        <SliderPrimitive.Root
          ref={ref}
          aria-labelledby={label ? labelId : undefined}
          className={cn(
            'relative flex touch-none select-none',
            isVertical
              ? 'flex-col items-center justify-center w-[16px] padding-y-8'
              : 'w-full items-center h-[16px] padding-x-8',
            disabled && 'cursor-not-allowed'
          )}
          value={value !== undefined ? [value] : undefined}
          defaultValue={defaultValue !== undefined ? [defaultValue] : [min]}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          orientation={orientation}
          onValueChange={handleValueChange}
          {...(isVertical ? { style: { height } } : {})}
          {...props}
        >
          <SliderTrack orientation={orientation}>
            <SliderRangeFilled color={color} orientation={orientation} />
          </SliderTrack>
          <SliderThumb
            disabled={disabled}
            showTooltip
            tooltipValue={displayValue}
            orientation={orientation}
          />
        </SliderPrimitive.Root>
        {showTicks && (
          <SliderTicks
            min={min}
            max={max}
            step={step}
            tickCount={tickCount}
            formatTick={formatTick}
            orientation={orientation}
            height={isVertical ? height : undefined}
          />
        )}
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';

export { Slider };
