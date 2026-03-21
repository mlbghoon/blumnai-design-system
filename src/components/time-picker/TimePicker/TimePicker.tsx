import { useState, useCallback, useMemo, useId, forwardRef } from 'react';
import { Popover, PopoverContent, PopoverAnchor } from '../../popover';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { TimeInput } from './TimeInput';
import { TimePickerPanel } from '../shared/TimePickerPanel';
import { formatTimeValue } from '../shared/time-utils';
import type { TimePickerProps, TimeValue, QuickSelectOption } from '../time-picker.types';

const getDefaultQuickOptions = (): QuickSelectOption[] => {
  const now = new Date();
  return [
  { label: 'Now', value: { hour: now.getHours(), minute: now.getMinutes() } },
  { label: '9:00 AM', value: { hour: 9, minute: 0 } },
  { label: '12:00 PM', value: { hour: 12, minute: 0 } },
  { label: '5:00 PM', value: { hour: 17, minute: 0 } },
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
  className,
  onFocus,
  onBlur,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputId = useId();

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const handleClockClick = useCallback(() => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  }, [disabled]);

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

  const handlePanelChange = useCallback((newValue: TimeValue) => {
    onChange?.(newValue);
  }, [onChange]);

  const options = useMemo(
    () => quickSelectOptions || getDefaultQuickOptions(),
    [quickSelectOptions]
  );

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
          className="w-auto padding-8"
        >
          <TimePickerPanel
            value={value}
            onChange={handlePanelChange}
            timeFormat={timeFormat}
            showSeconds={showSeconds}
            showQuickSelect={showQuickSelect}
            quickSelectOptions={options}
            onQuickSelect={handleQuickSelect}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
});

TimePicker.displayName = 'TimePicker';
