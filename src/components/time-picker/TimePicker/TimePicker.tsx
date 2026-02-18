import { useState, useCallback, useId, forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { Popover, PopoverContent, PopoverAnchor } from '../../popover';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { TimeInput } from './TimeInput';
import type { TimePickerProps, TimeValue, QuickSelectOption } from '../time-picker.types';

const DEFAULT_QUICK_OPTIONS: QuickSelectOption[] = [
  { label: 'Now', value: { hour: new Date().getHours(), minute: new Date().getMinutes() } },
  { label: '9:00 AM', value: { hour: 9, minute: 0 } },
  { label: '12:00 PM', value: { hour: 12, minute: 0 } },
  { label: '5:00 PM', value: { hour: 17, minute: 0 } },
];

/**
 * TimePicker 컴포넌트
 *
 * 12시간/24시간 형식을 지원하는 시간 선택 컴포넌트입니다.
 *
 * @example
 * <TimePicker value={time} onChange={setTime} timeFormat="24h" label="시간 선택" />
 */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(({
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

  const handleQuickSelect = useCallback((option: QuickSelectOption) => {
    onChange?.(option.value);
    setIsOpen(false);
  }, [onChange]);

  const handleInputChange = useCallback((newValue: TimeValue | undefined) => {
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
          <TimeInput
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
            <div className="flex flex-wrap ds-gap-6">
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

TimePicker.displayName = 'TimePicker';
