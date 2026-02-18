import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';
import type { SliderInputProps } from './Slider.types';
import { SliderThumb, SliderTrack, SliderRangeFilled, SliderTicks } from './shared';

/**
 * SliderInput 컴포넌트
 *
 * 숫자 입력 필드가 포함된 슬라이더입니다. 라벨과 접미사를 지원합니다.
 *
 * @example
 * <SliderInput label="볼륨" value={50} onChange={setValue} />
 */
const SliderInput = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderInputProps
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
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue ?? min);
  const [inputValue, setInputValue] = React.useState(String(internalValue));

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
      setInputValue(String(value));
    }
  }, [value]);

  const handleSliderChange = React.useCallback((values: number[]) => {
    const newValue = values[0];
    setInternalValue(newValue);
    setInputValue(String(newValue));
    onChange?.(newValue);
  }, [onChange]);

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    let parsed = parseFloat(inputValue);
    if (isNaN(parsed)) {
      parsed = min;
    }
    parsed = Math.max(min, Math.min(max, parsed));
    setInternalValue(parsed);
    setInputValue(String(parsed));
    onChange?.(parsed);
  }, [inputValue, min, max, onChange]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  }, [handleInputBlur]);

  const displayValue = formatValue ? formatValue(internalValue) : String(internalValue);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block font-body size-sm line-height-leading-5 font-medium text-default margin-b-8">
          {label}
        </label>
      )}
      <div className="flex items-center ds-gap-16">
        <div className="flex-1 flex flex-col">
          <SliderPrimitive.Root
            ref={ref}
            className={cn(
              'relative flex w-full touch-none select-none items-center',
              'h-[16px] padding-x-8',
              disabled && 'cursor-not-allowed'
            )}
            value={[internalValue]}
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
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
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

SliderInput.displayName = 'SliderInput';

export { SliderInput };
