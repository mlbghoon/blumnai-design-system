import { useState, useCallback, useMemo, useId, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverAnchor } from '../../popover';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { TimeInput } from './TimeInput';
import { TimePickerPanel } from '../shared/TimePickerPanel';
import { formatTimeValue, isTimeEqual } from '../shared/time-utils';
import type { TimePickerProps, TimeValue, QuickSelectOption } from '../time-picker.types';

const getDefaultQuickOptions = (): QuickSelectOption[] => {
  const now = new Date();
  return [
  { label: '현재', value: { hour: now.getHours(), minute: now.getMinutes() } },
  { label: '오전 9:00', value: { hour: 9, minute: 0 } },
  { label: '오후 12:00', value: { hour: 12, minute: 0 } },
  { label: '오후 5:00', value: { hour: 17, minute: 0 } },
];
};

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(({
  value,
  onChange,
  name,
  label,
  labelPosition,
      labelWidth,
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
  showActions = false,
  minuteStep,
  secondStep,
  className,
  onFocus,
  onBlur,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<TimeValue | undefined>(value);
  const inputId = useId();

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const handleClockClick = useCallback(() => {
    if (!disabled) {
      setDraft(value);
      setIsOpen(prev => !prev);
    }
  }, [disabled, value]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!disabled) {
      setIsOpen(open);
    }
  }, [disabled]);

  const handleQuickSelect = useCallback((option: QuickSelectOption) => {
    if (showActions) {
      setDraft(option.value);
    } else {
      onChange?.(option.value);
      setIsOpen(false);
    }
  }, [onChange, showActions]);

  const handleInputChange = useCallback((newValue: TimeValue | undefined) => {
    onChange?.(newValue);
  }, [onChange]);

  const handlePanelChange = useCallback((newValue: TimeValue) => {
    if (showActions) {
      setDraft(newValue);
    } else {
      onChange?.(newValue);
    }
  }, [onChange, showActions]);

  const handleApply = useCallback(() => {
    onChange?.(draft);
    setIsOpen(false);
  }, [onChange, draft]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const options = useMemo(
    () => quickSelectOptions || getDefaultQuickOptions(),
    [quickSelectOptions]
  );

  const panelValue = showActions ? draft : value;

  return (
    <InputWrapper
      label={label}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
      inputId={inputId}
      required={required}
      supportText={supportText}
      caption={caption}
      error={error}
      success={success}
      width={width}
      className={className}
    >
      {name && (
        <input type="hidden" name={name} value={formatTimeValue(value, showSeconds)} />
      )}
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
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

        <PopoverContent
          align={align}
          sideOffset={4}
          className="w-auto ![padding:0] overflow-hidden"
        >
          <div className="flex">
            {showQuickSelect && (
              <div className="flex flex-col ds-gap-4 padding-8 border-r-default">
                {options.map((option, index) => {
                  const compareValue = showActions ? draft : value;
                  const isSelected = isTimeEqual(compareValue, option.value);
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleQuickSelect(option)}
                      aria-pressed={isSelected}
                      className={cn(
                        'padding-x-8 padding-y-4 rounded-xs text-left whitespace-nowrap',
                        'font-body size-sm line-height-leading-5 font-medium',
                        'transition-colors',
                        isSelected
                          ? 'bg-state-brand text-white-default hover:bg-state-brand-hover cursor-pointer'
                          : 'text-subtle hover:bg-state-ghost-hover cursor-pointer',
                        'border-0'
                      )}
                      style={{ height: '28px' }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
            <div className="flex flex-col ds-gap-8 padding-8">
              <TimePickerPanel
                value={panelValue}
                onChange={handlePanelChange}
                timeFormat={timeFormat}
                showSeconds={showSeconds}
                disabled={disabled}
                minuteStep={minuteStep}
                secondStep={secondStep}
              />
              {showActions && (
                <div className="flex justify-end ds-gap-8 padding-t-8">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={cn(
                      'padding-x-12 padding-y-6 rounded-md',
                      'font-body size-sm line-height-leading-5 font-medium',
                      'text-default hover:bg-state-ghost-hover',
                      'transition-colors duration-150',
                      'cursor-pointer border-0'
                    )}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleApply}
                    className={cn(
                      'padding-x-12 padding-y-6 rounded-md',
                      'font-body size-sm line-height-leading-5 font-medium',
                      'bg-state-primary text-white-default hover:bg-state-primary-hover',
                      'transition-colors duration-150',
                      'cursor-pointer border-0'
                    )}
                  >
                    적용
                  </button>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
});

TimePicker.displayName = 'TimePicker';
