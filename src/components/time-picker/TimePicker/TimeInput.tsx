import { useState, useRef, useCallback, useEffect, forwardRef, useMemo } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon/Icon';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
} from 'constants/input/Input/Input.constants';
import {
  SEGMENT_PLACEHOLDERS,
  SEGMENT_MAX_LENGTH,
  getSegmentMax,
  getSegmentMin,
  validateSegment,
  padSegment,
  convert24To12Hour,
  convert12To24Hour,
} from '../shared/time-utils';
import type { TimeInputProps, TimeSegment, TimeValue } from '../time-picker.types';

export const TimeInput = forwardRef<HTMLDivElement, TimeInputProps>(({
  value,
  onChange,
  placeholder,
  disabled = false,
  hasError = false,
  hasSuccess = false,
  isOpen = false,
  timePickerStyle = 'default',
  size = 'sm',
  timeFormat = '24h',
  showSeconds = false,
  hideClockIcon = false,
  onFocus,
  onBlur,
  onClockClick,
  className,
}, ref) => {
  const segmentOrder = useMemo<TimeSegment[]>(() =>
    showSeconds ? ['hour', 'minute', 'second'] : ['hour', 'minute'],
  [showSeconds]);

  const [segments, setSegments] = useState<Record<TimeSegment, string>>({
    hour: '',
    minute: '',
    second: '',
  });
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const segmentsRef = useRef(segments);

  useEffect(() => {
    segmentsRef.current = segments;
  }, [segments]);

  const [activeSegment, setActiveSegment] = useState<TimeSegment | null>(null);
  const [hasInvalidTime, setHasInvalidTime] = useState(false);

  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  const segmentRefs = useMemo<Record<TimeSegment, React.RefObject<HTMLInputElement | null>>>(() => ({
    hour: hourRef,
    minute: minuteRef,
    second: secondRef,
  }), []);

  useEffect(() => {
    if (value) {
      let displayHour = value.hour;
      let newPeriod: 'AM' | 'PM' = 'AM';

      if (timeFormat === '12h') {
        const converted = convert24To12Hour(value.hour);
        displayHour = converted.hour12;
        newPeriod = converted.period;
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSegments({
        hour: padSegment(String(displayHour)),
        minute: padSegment(String(value.minute)),
        second: value.second !== undefined ? padSegment(String(value.second)) : '',
      });
      setPeriod(newPeriod);
    } else {
      setSegments({ hour: '', minute: '', second: '' });
    }
  }, [value, timeFormat]);

  const updateTimeFromSegments = useCallback((newSegments: Record<TimeSegment, string>, newPeriod: 'AM' | 'PM') => {
    const { hour, minute, second } = newSegments;

    const hasHour = hour && hour.length === 2;
    const hasMinute = minute && minute.length === 2;
    const hasSecond = !showSeconds || (second && second.length === 2);

    if (hasHour && hasMinute && hasSecond) {
      const hourNum = parseInt(hour, 10);
      const minuteNum = parseInt(minute, 10);
      const secondNum = showSeconds ? parseInt(second, 10) : undefined;

      const isHourValid = validateSegment('hour', hour, timeFormat);
      const isMinuteValid = validateSegment('minute', minute, timeFormat);
      const isSecondValid = !showSeconds || validateSegment('second', second, timeFormat);

      if (isHourValid && isMinuteValid && isSecondValid) {
        let hour24 = hourNum;
        if (timeFormat === '12h') {
          hour24 = convert12To24Hour(hourNum, newPeriod);
        }

        setHasInvalidTime(false);
        const newValue: TimeValue = {
          hour: hour24,
          minute: minuteNum,
        };
        if (showSeconds && secondNum !== undefined) {
          newValue.second = secondNum;
        }
        onChange?.(newValue);
        return;
      }
      setHasInvalidTime(true);
      return;
    }

    setHasInvalidTime(false);
    if (!hour && !minute && (!showSeconds || !second)) {
      onChange?.(undefined);
    }
  }, [onChange, timeFormat, showSeconds]);

  const handleSegmentChange = useCallback((segment: TimeSegment, inputValue: string) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, SEGMENT_MAX_LENGTH[segment]);

    const newSegments = { ...segments, [segment]: truncatedValue };
    setSegments(newSegments);

    if (truncatedValue.length === SEGMENT_MAX_LENGTH[segment]) {
      const currentIndex = segmentOrder.indexOf(segment);
      if (currentIndex < segmentOrder.length - 1) {
        const nextSegment = segmentOrder[currentIndex + 1];
        setTimeout(() => {
          segmentRefs[nextSegment].current?.focus();
          segmentRefs[nextSegment].current?.select();
        }, 0);
      }
    }

    updateTimeFromSegments(newSegments, period);
  }, [segments, segmentOrder, updateTimeFromSegments, segmentRefs, period]);

  const handleSegmentKeyDown = useCallback((segment: TimeSegment, e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentIndex = segmentOrder.indexOf(segment);

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const currentValue = parseInt(segments[segment] || '0', 10);
      const min = getSegmentMin(segment, timeFormat);
      const max = getSegmentMax(segment, timeFormat);
      let newValue: number;

      if (e.key === 'ArrowUp') {
        newValue = currentValue >= max ? min : currentValue + 1;
      } else {
        newValue = currentValue <= min ? max : currentValue - 1;
      }

      const paddedValue = padSegment(String(newValue));
      const newSegments = { ...segments, [segment]: paddedValue };
      setSegments(newSegments);
      updateTimeFromSegments(newSegments, period);
    } else if (e.key === 'ArrowRight') {
      const input = e.currentTarget;
      if (input.selectionStart === input.value.length && currentIndex < segmentOrder.length - 1) {
        e.preventDefault();
        const nextSegment = segmentOrder[currentIndex + 1];
        segmentRefs[nextSegment].current?.focus();
        segmentRefs[nextSegment].current?.setSelectionRange(0, 0);
      }
    } else if (e.key === 'ArrowLeft') {
      const input = e.currentTarget;
      if (input.selectionStart === 0 && currentIndex > 0) {
        e.preventDefault();
        const prevSegment = segmentOrder[currentIndex - 1];
        const prevRef = segmentRefs[prevSegment].current;
        prevRef?.focus();
        prevRef?.setSelectionRange(prevRef.value.length, prevRef.value.length);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      const min = getSegmentMin(segment, timeFormat);
      const paddedValue = padSegment(String(min));
      const newSegments = { ...segments, [segment]: paddedValue };
      setSegments(newSegments);
      updateTimeFromSegments(newSegments, period);
    } else if (e.key === 'End') {
      e.preventDefault();
      const max = getSegmentMax(segment, timeFormat);
      const paddedValue = padSegment(String(max));
      const newSegments = { ...segments, [segment]: paddedValue };
      setSegments(newSegments);
      updateTimeFromSegments(newSegments, period);
    } else if (e.key === 'PageUp' || e.key === 'PageDown') {
      e.preventDefault();
      const currentValue = parseInt(segments[segment] || '0', 10);
      const min = getSegmentMin(segment, timeFormat);
      const max = getSegmentMax(segment, timeFormat);
      const step = segment === 'hour' ? 1 : 5;
      let newValue: number;
      if (e.key === 'PageUp') {
        newValue = currentValue + step;
        if (newValue > max) newValue = max;
      } else {
        newValue = currentValue - step;
        if (newValue < min) newValue = min;
      }
      const paddedValue = padSegment(String(newValue));
      const newSegments = { ...segments, [segment]: paddedValue };
      setSegments(newSegments);
      updateTimeFromSegments(newSegments, period);
    } else if (e.key === 'Backspace' && !segments[segment] && currentIndex > 0) {
      e.preventDefault();
      const prevSegment = segmentOrder[currentIndex - 1];
      segmentRefs[prevSegment].current?.focus();
      segmentRefs[prevSegment].current?.select();
    } else if (e.key === 'Tab' && !e.shiftKey && currentIndex < segmentOrder.length - 1) {
      e.preventDefault();
      const nextSegment = segmentOrder[currentIndex + 1];
      segmentRefs[nextSegment].current?.focus();
      segmentRefs[nextSegment].current?.select();
    } else if (e.key === 'Tab' && e.shiftKey && currentIndex > 0) {
      e.preventDefault();
      const prevSegment = segmentOrder[currentIndex - 1];
      segmentRefs[prevSegment].current?.focus();
      segmentRefs[prevSegment].current?.select();
    }
  }, [segments, segmentOrder, segmentRefs, timeFormat, updateTimeFromSegments, period]);

  const handleSegmentFocus = useCallback((segment: TimeSegment) => {
    setActiveSegment(segment);
    onFocus?.();
  }, [onFocus]);

  const handleSegmentBlur = useCallback((segment: TimeSegment) => {
    setTimeout(() => {
      const currentSegments = segmentsRef.current;
      const paddedValue = padSegment(currentSegments[segment]);
      if (paddedValue !== currentSegments[segment]) {
        const newSegments = { ...currentSegments, [segment]: paddedValue };
        setSegments(newSegments);
        updateTimeFromSegments(newSegments, period);
      }

      const isAnySegmentFocused = segmentOrder.some(
        s => segmentRefs[s].current === document.activeElement
      );
      if (!isAnySegmentFocused) {
        setActiveSegment(null);
        onBlur?.();
      }
    }, 0);
  }, [segmentOrder, segmentRefs, updateTimeFromSegments, onBlur, period]);

  const handleInputAreaClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && !activeSegment) {
      const firstSegment = segmentOrder[0];
      segmentRefs[firstSegment].current?.focus();
      segmentRefs[firstSegment].current?.select();
    }
  }, [disabled, activeSegment, segmentOrder, segmentRefs]);

  const handleClockIconClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onClockClick?.();
    }
  }, [disabled, onClockClick]);

  const handlePeriodToggle = useCallback(() => {
    if (disabled) return;
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    updateTimeFromSegments(segments, newPeriod);
  }, [disabled, period, segments, updateTimeFromSegments]);

  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[timePickerStyle];
  const showError = hasError || hasInvalidTime;
  const state = disabled ? 'disabled' : showError ? 'error' : hasSuccess ? 'success' : 'default';
  const stateConfig = STATE_CONFIG[state];

  const iconColor = disabled ? 'default-disabled' : showError ? 'destructive' : hasSuccess ? 'success' : 'default-subtle';

  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    sizeConfig.container,
    hideClockIcon ? sizeConfig.padding : sizeConfig.paddingWithTailIcon,
    sizeConfig.gap,
    styleConfig.base,
    !disabled && !showError && !isOpen && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    isOpen && !showError && 'border-strong shadow-component-input-focus',
    disabled ? 'cursor-not-allowed' : 'cursor-text',
    className
  );

  const renderSegment = (segment: TimeSegment) => {
    const segmentValue = segments[segment];
    const placeholderText = placeholder?.[segment] || SEGMENT_PLACEHOLDERS[segment];
    const isActive = activeSegment === segment;

    return (
      <input
        key={segment}
        ref={segmentRefs[segment] as React.RefObject<HTMLInputElement>}
        type="text"
        inputMode="numeric"
        role="spinbutton"
        aria-label={segment}
        aria-valuenow={segmentValue ? parseInt(segmentValue, 10) : undefined}
        aria-valuemin={getSegmentMin(segment, timeFormat)}
        aria-valuemax={getSegmentMax(segment, timeFormat)}
        value={segmentValue}
        placeholder={placeholderText}
        disabled={disabled}
        onChange={(e) => handleSegmentChange(segment, e.target.value)}
        onKeyDown={(e) => handleSegmentKeyDown(segment, e)}
        onFocus={() => handleSegmentFocus(segment)}
        onBlur={() => handleSegmentBlur(segment)}
        className={cn(
          'bg-transparent border-0 outline-none text-center font-body',
          sizeConfig.text,
          'letter-spacing-tracking-tight',
          segmentValue ? stateConfig.text : 'text-hint',
          'rounded-2xs padding-x-2',
          isActive && 'bg-state-ghost-hover',
          disabled && 'cursor-not-allowed'
        )}
        style={{
          width: '24px',
          height: '20px',
        }}
      />
    );
  };

  return (
    <div
      ref={ref}
      className={wrapperClassName}
      aria-invalid={showError || undefined}
    >
      <div
        className="flex items-center ds-gap-2 flex-1 min-w-0"
        onClick={handleInputAreaClick}
      >
        {renderSegment('hour')}
        <span className="text-hint size-sm">:</span>
        {renderSegment('minute')}
        {showSeconds && (
          <>
            <span className="text-hint size-sm">:</span>
            {renderSegment('second')}
          </>
        )}
        {timeFormat === '12h' && (
          <button
            type="button"
            disabled={disabled}
            onClick={handlePeriodToggle}
            aria-label={`Toggle AM/PM, current: ${period}`}
            className={cn(
              'padding-x-4 padding-y-2 rounded-xs',
              'ml-[4px]',
              'font-body size-sm line-height-leading-5 font-medium',
              'transition-colors duration-150',
              disabled
                ? 'text-hint cursor-not-allowed'
                : 'text-default hover:bg-state-ghost-hover cursor-pointer'
            )}
          >
            {period}
          </button>
        )}
      </div>
      {!hideClockIcon && (
        <button
          type="button"
          disabled={disabled}
          onClick={handleClockIconClick}
          aria-label="Open time picker"
          className={cn(
            'flex-shrink-0 flex items-center justify-center',
            'hover:bg-state-ghost-hover rounded-xs transition-colors',
            disabled && 'cursor-not-allowed'
          )}
        >
          <Icon
            iconType={['system', 'time']}
            size={sizeConfig.iconSize}
            color={iconColor}
          />
        </button>
      )}
    </div>
  );
});

TimeInput.displayName = 'TimeInput';
