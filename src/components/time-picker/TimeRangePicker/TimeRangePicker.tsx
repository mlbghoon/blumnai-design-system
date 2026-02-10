import { useState, useCallback, useId, forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { Popover, PopoverContent, PopoverAnchor } from '../../popover';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { TimeRangeInput } from './TimeRangeInput';
import type { TimeRangePickerProps, TimeRange, QuickRangeSelectOption } from '../time-picker.types';

const DEFAULT_QUICK_OPTIONS: QuickRangeSelectOption[] = [
  {
    label: 'Morning',
    value: { start: { hour: 9, minute: 0 }, end: { hour: 12, minute: 0 } },
  },
  {
    label: 'Afternoon',
    value: { start: { hour: 13, minute: 0 }, end: { hour: 17, minute: 0 } },
  },
  {
    label: 'Business Hours',
    value: { start: { hour: 9, minute: 0 }, end: { hour: 18, minute: 0 } },
  },
  {
    label: 'Full Day',
    value: { start: { hour: 0, minute: 0 }, end: { hour: 23, minute: 59 } },
  },
];

/**
 * TimeRangePicker 컴포넌트
 *
 * 시작~종료 시간 범위를 선택하는 컴포넌트입니다. 빠른 선택 옵션을 지원합니다.
 *
 * @example
 * <TimeRangePicker value={range} onChange={setRange} showQuickSelect />
 */
export const TimeRangePicker = forwardRef<HTMLDivElement, TimeRangePickerProps>(({
  value,
  onChange,
  label,
  required = false,
  supportText,
  caption,
  error,
  success,
  width,
  disabled = false,
  timeFormat = '24h',
  showSeconds = false,
  size = 'sm',
  timePickerStyle = 'default',
  placeholder,
  showQuickSelect = false,
  quickSelectOptions,
  align = 'start',
  className,
  onFocus,
  onBlur,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputId = useId();

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const handleClockClick = useCallback(() => {
    if (!disabled && showQuickSelect) {
      setIsOpen(prev => !prev);
    }
  }, [disabled, showQuickSelect]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!disabled) {
      setIsOpen(open);
    }
  }, [disabled]);

  const handleQuickSelect = useCallback((option: QuickRangeSelectOption) => {
    onChange?.(option.value);
    setIsOpen(false);
  }, [onChange]);

  const handleInputChange = useCallback((newValue: TimeRange | undefined) => {
    onChange?.(newValue);
  }, [onChange]);

  const options = quickSelectOptions || DEFAULT_QUICK_OPTIONS;

  return (
    <InputWrapper
      label={label}
      inputId={inputId}
      required={required}
      supportText={supportText}
      caption={caption}
      error={error}
      success={success}
      width={width}
      className={className}
    >
      <Popover open={isOpen && showQuickSelect} onOpenChange={handleOpenChange}>
        <PopoverAnchor asChild>
          <TimeRangeInput
            ref={ref}
            value={value}
            onChange={handleInputChange}
            timeFormat={timeFormat}
            showSeconds={showSeconds}
            disabled={disabled}
            hasError={hasError}
            hasSuccess={hasSuccess}
            isOpen={isOpen}
            size={size}
            timePickerStyle={timePickerStyle}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onClockClick={handleClockClick}
          />
        </PopoverAnchor>

        {showQuickSelect && (
          <PopoverContent
            align={align}
            sideOffset={4}
            className="w-auto padding-8"
          >
            <div className="flex flex-wrap gap-6">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleQuickSelect(option)}
                  className={cn(
                    'padding-x-10 padding-y-6 rounded-md',
                    'font-body size-sm line-height-leading-5',
                    'bg-state-ghost hover:bg-state-ghost-hover',
                    'text-default transition-colors duration-150',
                    'cursor-pointer border-0'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </PopoverContent>
        )}
      </Popover>
    </InputWrapper>
  );
});

TimeRangePicker.displayName = 'TimeRangePicker';
