import { useState, useRef, useCallback, useEffect, forwardRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
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
  padSegment,
  timeToSegments,
  segmentsToTime,
} from '../shared/time-utils';
import type { TimeSegment, TimeFormat, TimeRange, TimePickerSize, TimePickerStyle, TimeSegmentPlaceholder } from '../time-picker.types';

export interface TimeRangeInputProps {
  value?: TimeRange;
  onChange?: (value: TimeRange | undefined) => void;
  timeFormat?: TimeFormat;
  showSeconds?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  hasSuccess?: boolean;
  isOpen?: boolean;
  size?: TimePickerSize;
  timePickerStyle?: TimePickerStyle;
  placeholder?: TimeSegmentPlaceholder;
  pickerOnly?: boolean;
  hideClockIcon?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onClockClick?: () => void;
  className?: string;
}

type TimePart = 'start' | 'end';

export const TimeRangeInput = forwardRef<HTMLDivElement, TimeRangeInputProps>(({
  value,
  onChange,
  placeholder,
  disabled = false,
  hasError = false,
  hasSuccess = false,
  isOpen = false,
  pickerOnly = false,
  hideClockIcon = false,
  timePickerStyle = 'default',
  size = 'sm',
  timeFormat = '24h',
  showSeconds = false,
  onFocus,
  onBlur,
  onClockClick,
  className,
}, ref) => {
  const segmentOrder = useMemo<TimeSegment[]>(() =>
    showSeconds ? ['hour', 'minute', 'second'] : ['hour', 'minute'],
  [showSeconds]);

  const [startSegments, setStartSegments] = useState<Record<TimeSegment, string>>({ hour: '', minute: '', second: '' });
  const [endSegments, setEndSegments] = useState<Record<TimeSegment, string>>({ hour: '', minute: '', second: '' });
  const [startPeriod, setStartPeriod] = useState<'AM' | 'PM'>('AM');
  const [endPeriod, setEndPeriod] = useState<'AM' | 'PM'>('AM');

  const startSegmentsRef = useRef(startSegments);
  const endSegmentsRef = useRef(endSegments);
  const startPeriodRef = useRef(startPeriod);
  const endPeriodRef = useRef(endPeriod);

  useEffect(() => { startSegmentsRef.current = startSegments; }, [startSegments]);
  useEffect(() => { endSegmentsRef.current = endSegments; }, [endSegments]);
  useEffect(() => { startPeriodRef.current = startPeriod; }, [startPeriod]);
  useEffect(() => { endPeriodRef.current = endPeriod; }, [endPeriod]);

  const [activeSegment, setActiveSegment] = useState<{ part: TimePart; segment: TimeSegment } | null>(null);
  const [hasInvalidTime, setHasInvalidTime] = useState(false);
  const isInputFocused = useRef(false);

  useEffect(() => {
    if (!isInputFocused.current) {
      const startData = timeToSegments(value?.start, timeFormat);
      const endData = timeToSegments(value?.end, timeFormat);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStartSegments(startData.segments);
      setStartPeriod(startData.period);
      setEndSegments(endData.segments);
      setEndPeriod(endData.period);
      setHasInvalidTime(false);
    }
  }, [value, timeFormat]);

  const startHourRef = useRef<HTMLInputElement>(null);
  const startMinuteRef = useRef<HTMLInputElement>(null);
  const startSecondRef = useRef<HTMLInputElement>(null);
  const endHourRef = useRef<HTMLInputElement>(null);
  const endMinuteRef = useRef<HTMLInputElement>(null);
  const endSecondRef = useRef<HTMLInputElement>(null);

  const segmentRefs = useMemo<Record<TimePart, Record<TimeSegment, React.RefObject<HTMLInputElement | null>>>>(() => ({
    start: { hour: startHourRef, minute: startMinuteRef, second: startSecondRef },
    end: { hour: endHourRef, minute: endMinuteRef, second: endSecondRef },
  }), []);

  const getAllSegments = useCallback((): Array<{ part: TimePart; segment: TimeSegment }> => {
    const result: Array<{ part: TimePart; segment: TimeSegment }> = [];
    for (const segment of segmentOrder) {
      result.push({ part: 'start', segment });
    }
    for (const segment of segmentOrder) {
      result.push({ part: 'end', segment });
    }
    return result;
  }, [segmentOrder]);

  const updateRange = useCallback((
    newStart: Record<TimeSegment, string>,
    newEnd: Record<TimeSegment, string>,
    newStartPeriod: 'AM' | 'PM',
    newEndPeriod: 'AM' | 'PM'
  ) => {
    const startTime = segmentsToTime(newStart, newStartPeriod, timeFormat, showSeconds);
    const endTime = segmentsToTime(newEnd, newEndPeriod, timeFormat, showSeconds);

    const isEmpty = !newStart.hour && !newStart.minute && (!showSeconds || !newStart.second) &&
      !newEnd.hour && !newEnd.minute && (!showSeconds || !newEnd.second);

    const isStartComplete = newStart.hour.length === 2 && newStart.minute.length === 2 && (!showSeconds || newStart.second.length === 2);
    const isEndComplete = newEnd.hour.length === 2 && newEnd.minute.length === 2 && (!showSeconds || newEnd.second.length === 2);

    const hasInvalid = (isStartComplete && !startTime) || (isEndComplete && !endTime);
    setHasInvalidTime(hasInvalid);

    if (isEmpty) {
      onChange?.(undefined);
    } else {
      onChange?.({ start: startTime, end: endTime });
    }
  }, [onChange, timeFormat, showSeconds]);

  const handleSegmentChange = useCallback((part: TimePart, segment: TimeSegment, inputValue: string) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, SEGMENT_MAX_LENGTH[segment]);

    const setSegments = part === 'start' ? setStartSegments : setEndSegments;
    const currentSegments = part === 'start' ? startSegments : endSegments;
    const newSegments = { ...currentSegments, [segment]: truncatedValue };
    setSegments(newSegments);

    if (truncatedValue.length === SEGMENT_MAX_LENGTH[segment]) {
      const allSegments = getAllSegments();
      const currentIndex = allSegments.findIndex(s => s.part === part && s.segment === segment);
      if (currentIndex < allSegments.length - 1) {
        const next = allSegments[currentIndex + 1];
        setTimeout(() => {
          segmentRefs[next.part][next.segment].current?.focus();
          segmentRefs[next.part][next.segment].current?.select();
        }, 0);
      }
    }

    if (part === 'start') {
      updateRange(newSegments, endSegments, startPeriod, endPeriod);
    } else {
      updateRange(startSegments, newSegments, startPeriod, endPeriod);
    }
  }, [startSegments, endSegments, startPeriod, endPeriod, segmentRefs, updateRange, getAllSegments]);

  const handleSegmentKeyDown = useCallback((part: TimePart, segment: TimeSegment, e: React.KeyboardEvent<HTMLInputElement>) => {
    const allSegments = getAllSegments();
    const currentIndex = allSegments.findIndex(s => s.part === part && s.segment === segment);
    const currentSegments = part === 'start' ? startSegments : endSegments;

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const currentValue = parseInt(currentSegments[segment] || '0', 10);
      const min = getSegmentMin(segment, timeFormat);
      const max = getSegmentMax(segment, timeFormat);
      let newValue: number;

      if (e.key === 'ArrowUp') {
        newValue = currentValue >= max ? min : currentValue + 1;
      } else {
        newValue = currentValue <= min ? max : currentValue - 1;
      }

      const paddedValue = padSegment(String(newValue));
      const setSegments = part === 'start' ? setStartSegments : setEndSegments;
      const newSegments = { ...currentSegments, [segment]: paddedValue };
      setSegments(newSegments);

      if (part === 'start') {
        updateRange(newSegments, endSegments, startPeriod, endPeriod);
      } else {
        updateRange(startSegments, newSegments, startPeriod, endPeriod);
      }
    } else if (e.key === 'ArrowRight') {
      const input = e.currentTarget;
      if (input.selectionStart === input.value.length && currentIndex < allSegments.length - 1) {
        e.preventDefault();
        const next = allSegments[currentIndex + 1];
        segmentRefs[next.part][next.segment].current?.focus();
        segmentRefs[next.part][next.segment].current?.setSelectionRange(0, 0);
      }
    } else if (e.key === 'ArrowLeft') {
      const input = e.currentTarget;
      if (input.selectionStart === 0 && currentIndex > 0) {
        e.preventDefault();
        const prev = allSegments[currentIndex - 1];
        const prevRef = segmentRefs[prev.part][prev.segment].current;
        prevRef?.focus();
        prevRef?.setSelectionRange(prevRef.value.length, prevRef.value.length);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      const min = getSegmentMin(segment, timeFormat);
      const paddedValue = padSegment(String(min));
      const setSegmentsForPart = part === 'start' ? setStartSegments : setEndSegments;
      const newSegments = { ...currentSegments, [segment]: paddedValue };
      setSegmentsForPart(newSegments);
      if (part === 'start') {
        updateRange(newSegments, endSegments, startPeriod, endPeriod);
      } else {
        updateRange(startSegments, newSegments, startPeriod, endPeriod);
      }
    } else if (e.key === 'End') {
      e.preventDefault();
      const max = getSegmentMax(segment, timeFormat);
      const paddedValue = padSegment(String(max));
      const setSegmentsForPart = part === 'start' ? setStartSegments : setEndSegments;
      const newSegments = { ...currentSegments, [segment]: paddedValue };
      setSegmentsForPart(newSegments);
      if (part === 'start') {
        updateRange(newSegments, endSegments, startPeriod, endPeriod);
      } else {
        updateRange(startSegments, newSegments, startPeriod, endPeriod);
      }
    } else if (e.key === 'PageUp' || e.key === 'PageDown') {
      e.preventDefault();
      const currentValue = parseInt(currentSegments[segment] || '0', 10);
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
      const setSegmentsForPart = part === 'start' ? setStartSegments : setEndSegments;
      const newSegments = { ...currentSegments, [segment]: paddedValue };
      setSegmentsForPart(newSegments);
      if (part === 'start') {
        updateRange(newSegments, endSegments, startPeriod, endPeriod);
      } else {
        updateRange(startSegments, newSegments, startPeriod, endPeriod);
      }
    } else if (e.key === 'Backspace' && !currentSegments[segment] && currentIndex > 0) {
      e.preventDefault();
      const prev = allSegments[currentIndex - 1];
      segmentRefs[prev.part][prev.segment].current?.focus();
      segmentRefs[prev.part][prev.segment].current?.select();
    } else if (e.key === 'Tab' && !e.shiftKey && currentIndex < allSegments.length - 1) {
      e.preventDefault();
      const next = allSegments[currentIndex + 1];
      segmentRefs[next.part][next.segment].current?.focus();
      segmentRefs[next.part][next.segment].current?.select();
    } else if (e.key === 'Tab' && e.shiftKey && currentIndex > 0) {
      e.preventDefault();
      const prev = allSegments[currentIndex - 1];
      segmentRefs[prev.part][prev.segment].current?.focus();
      segmentRefs[prev.part][prev.segment].current?.select();
    }
  }, [startSegments, endSegments, startPeriod, endPeriod, segmentRefs, getAllSegments, updateRange, timeFormat]);

  const handleSegmentFocus = useCallback((part: TimePart, segment: TimeSegment) => {
    isInputFocused.current = true;
    setActiveSegment({ part, segment });
    onFocus?.();
  }, [onFocus]);

  const handleSegmentBlur = useCallback((part: TimePart, segment: TimeSegment) => {
    setTimeout(() => {
      const currentSegments = part === 'start' ? startSegmentsRef.current : endSegmentsRef.current;
      const setSegments = part === 'start' ? setStartSegments : setEndSegments;
      const paddedValue = padSegment(currentSegments[segment]);

      if (paddedValue !== currentSegments[segment]) {
        const newSegments = { ...currentSegments, [segment]: paddedValue };
        setSegments(newSegments);
        if (part === 'start') {
          updateRange(newSegments, endSegmentsRef.current, startPeriodRef.current, endPeriodRef.current);
        } else {
          updateRange(startSegmentsRef.current, newSegments, startPeriodRef.current, endPeriodRef.current);
        }
      }

      const allSegments = getAllSegments();
      const isAnySegmentFocused = allSegments.some(
        s => segmentRefs[s.part][s.segment].current === document.activeElement
      );
      if (!isAnySegmentFocused) {
        isInputFocused.current = false;
        setActiveSegment(null);
        onBlur?.();
      }
    }, 0);
  }, [segmentRefs, updateRange, onBlur, getAllSegments]);

  const handleInputAreaClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && !activeSegment) {
      const firstSegment = segmentOrder[0];
      segmentRefs.start[firstSegment].current?.focus();
      segmentRefs.start[firstSegment].current?.select();
    }
  }, [disabled, activeSegment, segmentOrder, segmentRefs]);

  const handleClockIconClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onClockClick?.();
    }
  }, [disabled, onClockClick]);

  const handlePeriodToggle = useCallback((part: TimePart) => {
    if (disabled) return;

    if (part === 'start') {
      const newPeriod = startPeriod === 'AM' ? 'PM' : 'AM';
      setStartPeriod(newPeriod);
      updateRange(startSegments, endSegments, newPeriod, endPeriod);
    } else {
      const newPeriod = endPeriod === 'AM' ? 'PM' : 'AM';
      setEndPeriod(newPeriod);
      updateRange(startSegments, endSegments, startPeriod, newPeriod);
    }
  }, [disabled, startPeriod, endPeriod, startSegments, endSegments, updateRange]);

  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[timePickerStyle];
  const showError = hasError || hasInvalidTime;
  const state = disabled ? 'disabled' : showError ? 'error' : hasSuccess ? 'success' : 'default';
  const stateConfig = STATE_CONFIG[state];
  const isXs = size === 'xs';
  const segmentWidth = isXs ? '20px' : '28px';
  const segmentHeight = isXs ? '16px' : '20px';

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
    disabled ? 'cursor-not-allowed' : pickerOnly ? 'cursor-pointer' : 'cursor-text',
    className
  );

  const renderSegment = (part: TimePart, segment: TimeSegment) => {
    const segments = part === 'start' ? startSegments : endSegments;
    const segmentValue = segments[segment];
    const placeholderText = placeholder?.[segment] || SEGMENT_PLACEHOLDERS[segment];
    const isActive = activeSegment?.part === part && activeSegment?.segment === segment;

    return (
      <input
        key={`${part}-${segment}`}
        ref={segmentRefs[part][segment] as React.RefObject<HTMLInputElement>}
        type="text"
        inputMode={pickerOnly ? 'none' : 'numeric'}
        value={segmentValue}
        placeholder={placeholderText}
        disabled={disabled}
        readOnly={pickerOnly}
        onChange={pickerOnly ? undefined : (e) => handleSegmentChange(part, segment, e.target.value)}
        onKeyDown={pickerOnly ? undefined : (e) => handleSegmentKeyDown(part, segment, e)}
        onFocus={pickerOnly ? undefined : () => handleSegmentFocus(part, segment)}
        onBlur={pickerOnly ? undefined : () => handleSegmentBlur(part, segment)}
        className={cn(
          'bg-transparent border-0 outline-none text-center font-body',
          sizeConfig.text,
          'letter-spacing-tracking-tight',
          segmentValue ? stateConfig.text : 'text-hint',
          'rounded-2xs padding-x-2',
          !pickerOnly && isActive && 'bg-state-ghost-hover',
          disabled && 'cursor-not-allowed',
          pickerOnly && 'cursor-pointer caret-transparent'
        )}
        style={{
          width: segmentWidth,
          height: segmentHeight,
        }}
      />
    );
  };

  const renderTimePart = (part: TimePart) => {
    const period = part === 'start' ? startPeriod : endPeriod;

    return (
      <div className="flex items-center ds-gap-2">
        {renderSegment(part, 'hour')}
        <span className={cn('text-hint', isXs ? 'size-xs' : 'size-sm')}>:</span>
        {renderSegment(part, 'minute')}
        {showSeconds && (
          <>
            <span className={cn('text-hint', isXs ? 'size-xs' : 'size-sm')}>:</span>
            {renderSegment(part, 'second')}
          </>
        )}
        {timeFormat === '12h' && (
          <button
            type="button"
            disabled={disabled}
            onClick={pickerOnly ? undefined : () => handlePeriodToggle(part)}
            aria-label={`Toggle AM/PM, current: ${period}`}
            className={cn(
              'padding-x-4 padding-y-2 rounded-xs',
              'margin-l-4',
              'font-body font-medium',
              isXs ? 'size-xs line-height-leading-4' : 'size-sm line-height-leading-5',
              'transition-colors duration-150',
              disabled
                ? 'text-hint cursor-not-allowed'
                : pickerOnly
                  ? 'text-default cursor-pointer'
                  : 'text-default hover:bg-state-ghost-hover cursor-pointer'
            )}
          >
            {period}
          </button>
        )}
      </div>
    );
  };

  const defaultWidth = (hideClockIcon ? 170 : 190) + (showSeconds ? 70 : 0);

  return (
    <div
      ref={ref}
      className={wrapperClassName}
      style={{ minWidth: `${defaultWidth}px` }}
    >
      <div
        className="flex items-center ds-gap-8 flex-1 min-w-0"
        onClick={pickerOnly ? handleClockIconClick : handleInputAreaClick}
      >
        {renderTimePart('start')}
        <span className={cn('text-hint', isXs ? 'size-xs' : 'size-sm')}>-</span>
        {renderTimePart('end')}
      </div>
      {!hideClockIcon && (
        <button
          type="button"
          disabled={disabled}
          onClick={handleClockIconClick}
          className={cn(
            'flex-shrink-0 flex items-center justify-center',
            'hover:bg-state-ghost-hover rounded-xs transition-colors',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
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

TimeRangeInput.displayName = 'TimeRangeInput';
