import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';
import type { SliderRangeInputProps } from './Slider.types';
import { SliderThumb, SliderTrack, SliderRangeFilled, SliderTicks } from './shared';

const SliderRangeInput = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderRangeInputProps
>(({
  className,
  color = 'gray',
  formatValue,
  label,
  suffix,
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
  const [internalValue, setInternalValue] = React.useState<[number, number]>(
    value ?? defaultValue ?? [min, max]
  );
  const [minInputValue, setMinInputValue] = React.useState(String(internalValue[0]));
  const [maxInputValue, setMaxInputValue] = React.useState(String(internalValue[1]));

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
      setMinInputValue(String(value[0]));
      setMaxInputValue(String(value[1]));
    }
  }, [value]);

  const handleSliderChange = React.useCallback((values: number[]) => {
    const newValue: [number, number] = [values[0], values[1]];
    setInternalValue(newValue);
    setMinInputValue(String(values[0]));
    setMaxInputValue(String(values[1]));
    onChange?.(newValue);
  }, [onChange]);

  const handleMinInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMinInputValue(e.target.value);
  }, []);

  const handleMaxInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxInputValue(e.target.value);
  }, []);

  const handleMinInputBlur = React.useCallback(() => {
    let parsed = parseFloat(minInputValue);
    if (isNaN(parsed)) {
      parsed = min;
    }
    parsed = Math.max(min, Math.min(internalValue[1], parsed));
    const newValue: [number, number] = [parsed, internalValue[1]];
    setInternalValue(newValue);
    setMinInputValue(String(parsed));
    onChange?.(newValue);
  }, [minInputValue, min, internalValue, onChange]);

  const handleMaxInputBlur = React.useCallback(() => {
    let parsed = parseFloat(maxInputValue);
    if (isNaN(parsed)) {
      parsed = max;
    }
    parsed = Math.max(internalValue[0], Math.min(max, parsed));
    const newValue: [number, number] = [internalValue[0], parsed];
    setInternalValue(newValue);
    setMaxInputValue(String(parsed));
    onChange?.(newValue);
  }, [maxInputValue, max, internalValue, onChange]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>, type: 'min' | 'max') => {
    if (e.key === 'Enter') {
      if (type === 'min') {
        handleMinInputBlur();
      } else {
        handleMaxInputBlur();
      }
    }
  }, [handleMinInputBlur, handleMaxInputBlur]);

  const formatFn = formatValue ?? String;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block font-body size-sm line-height-leading-5 font-medium text-default margin-b-8">
          {label}
        </label>
      )}
      <div className="flex items-end ds-gap-12">
        <div className="relative flex items-center">
          <input
            type="text"
            aria-label="Minimum value"
            value={minInputValue}
            onChange={handleMinInputChange}
            onBlur={handleMinInputBlur}
            onKeyDown={(e) => handleKeyDown(e, 'min')}
            disabled={disabled}
            className={cn(
              'w-[72px] height-32 padding-x-8',
              'font-body size-sm line-height-leading-5 text-center text-default',
              'bg-card border-default rounded-md',
              'focus:outline-none focus:shadow-component-input-focus',
              disabled && 'bg-input-disabled text-muted cursor-not-allowed',
              suffix && 'padding-r-24'
            )}
          />
          {suffix && (
            <span className="absolute right-8 font-body size-sm text-muted pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <SliderPrimitive.Root
            ref={ref}
            className={cn(
              'relative flex w-full touch-none select-none items-center',
              'height-16 padding-x-8',
              disabled && 'cursor-not-allowed'
            )}
            value={internalValue}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onValueChange={handleSliderChange}
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
        <div className="relative flex items-center">
          <input
            type="text"
            aria-label="Maximum value"
            value={maxInputValue}
            onChange={handleMaxInputChange}
            onBlur={handleMaxInputBlur}
            onKeyDown={(e) => handleKeyDown(e, 'max')}
            disabled={disabled}
            className={cn(
              'w-[72px] height-32 padding-x-8',
              'font-body size-sm line-height-leading-5 text-center text-default',
              'bg-card border-default rounded-md',
              'focus:outline-none focus:shadow-component-input-focus',
              disabled && 'bg-input-disabled text-muted cursor-not-allowed',
              suffix && 'padding-r-24'
            )}
          />
          {suffix && (
            <span className="absolute right-8 font-body size-sm text-muted pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

SliderRangeInput.displayName = 'SliderRangeInput';

export { SliderRangeInput };
