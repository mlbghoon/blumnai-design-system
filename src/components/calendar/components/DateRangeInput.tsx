import { useState, useRef, useCallback, useEffect, forwardRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Icon, RiCalendarLine } from '../../icons/Icon/Icon';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
} from 'constants/input/Input/Input.constants';
import { isOutOfBounds } from '../utils/bounds';
import type { DateRangeInputProps, DateSegment, DateSegmentOrder, DateFormat } from '../DatePicker.types';

const SEGMENT_PLACEHOLDERS: Record<DateSegment, string> = {
  day: 'dd',
  month: 'mm',
  year: 'yyyy',
};

const SEGMENT_MAX_LENGTH: Record<DateSegment, number> = {
  day: 2,
  month: 2,
  year: 4,
};

const getSegmentOrderFromFormat = (dateFormat: DateFormat): DateSegmentOrder => {
  switch (dateFormat) {
    case 'yyyy.MM.dd':
    case 'yyyy-MM-dd':
    case 'yyyy/MM/dd':
      return ['year', 'month', 'day'];
    case 'MM/dd/yyyy':
      return ['month', 'day', 'year'];
    case 'dd/MM/yyyy':
      return ['day', 'month', 'year'];
    default:
      return ['year', 'month', 'day'];
  }
};

const getSeparatorFromFormat = (dateFormat: DateFormat): string => {
  if (dateFormat.includes('.')) return '.';
  if (dateFormat.includes('-')) return '-';
  return '/';
};

type DatePart = 'from' | 'to';

const validateSegment = (segment: DateSegment, value: string): boolean => {
  const num = parseInt(value, 10);
  if (isNaN(num)) return false;

  switch (segment) {
    case 'day':
      return num >= 1 && num <= 31;
    case 'month':
      return num >= 1 && num <= 12;
    case 'year':
      return num >= 1 && num <= 9999;
    default:
      return false;
  }
};

const padSegment = (segment: DateSegment, value: string): string => {
  if (!value) return '';
  const maxLen = SEGMENT_MAX_LENGTH[segment];
  return value.padStart(maxLen, '0');
};

const dateToSegments = (date: Date | undefined): Record<DateSegment, string> => {
  if (!date) return { day: '', month: '', year: '' };
  return {
    day: padSegment('day', String(date.getDate())),
    month: padSegment('month', String(date.getMonth() + 1)),
    year: String(date.getFullYear()),
  };
};

const segmentsToDate = (segments: Record<DateSegment, string>): Date | undefined => {
  const { day, month, year } = segments;
  if (!day || !month || !year || year.length < 4) return undefined;

  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  if (
    !validateSegment('day', day) ||
    !validateSegment('month', month) ||
    !validateSegment('year', year)
  ) {
    return undefined;
  }

  const newDate = new Date(yearNum, monthNum - 1, dayNum);
  if (
    newDate.getDate() !== dayNum ||
    newDate.getMonth() !== monthNum - 1 ||
    newDate.getFullYear() !== yearNum
  ) {
    return undefined;
  }

  return newDate;
};

export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(({
  value,
  onChange,
  placeholder,
  disabled = false,
  hasError = false,
  hasSuccess = false,
  isOpen = false,
  pickerOnly = false,
  datePickerStyle = 'default',
  size = 'sm',
  dateFormat = 'yyyy.MM.dd',
  minDate,
  maxDate,
  onFocus,
  onBlur,
  onCalendarClick,
  className,
  hideCalendarIcon = false,
}, ref) => {
  const segmentOrder = getSegmentOrderFromFormat(dateFormat);
  const separator = getSeparatorFromFormat(dateFormat);
  const [fromSegments, setFromSegments] = useState<Record<DateSegment, string>>({
    day: '', month: '', year: ''
  });
  const [toSegments, setToSegments] = useState<Record<DateSegment, string>>({
    day: '', month: '', year: ''
  });
  const fromSegmentsRef = useRef(fromSegments);
  const toSegmentsRef = useRef(toSegments);
  // Sync refs with current segments for use in callbacks
  useEffect(() => {
    fromSegmentsRef.current = fromSegments;
  }, [fromSegments]);
  useEffect(() => {
    toSegmentsRef.current = toSegments;
  }, [toSegments]);

  const [activeSegment, setActiveSegment] = useState<{ part: DatePart; segment: DateSegment } | null>(null);
  // invalid = 포맷 오류 OR min/max 경계 밖 — 둘 다 onChange 호출되지 않는 상태
  const [hasInvalidDate, setHasInvalidDate] = useState(false);
  const hasInvalidDateRef = useRef(false);
  useEffect(() => { hasInvalidDateRef.current = hasInvalidDate; }, [hasInvalidDate]);
  const isInputFocused = useRef(false);

  useEffect(() => {
    if (!isInputFocused.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFromSegments(dateToSegments(value?.from));
      setToSegments(dateToSegments(value?.to));
      setHasInvalidDate(false);
    }
  }, [value]);

  const fromDayRef = useRef<HTMLInputElement>(null);
  const fromMonthRef = useRef<HTMLInputElement>(null);
  const fromYearRef = useRef<HTMLInputElement>(null);
  const toDayRef = useRef<HTMLInputElement>(null);
  const toMonthRef = useRef<HTMLInputElement>(null);
  const toYearRef = useRef<HTMLInputElement>(null);

  const segmentRefs = useMemo<Record<DatePart, Record<DateSegment, React.RefObject<HTMLInputElement | null>>>>(() => ({
    from: { day: fromDayRef, month: fromMonthRef, year: fromYearRef },
    to: { day: toDayRef, month: toMonthRef, year: toYearRef },
  }), []);

  const getAllSegments = useCallback((): Array<{ part: DatePart; segment: DateSegment }> => {
    return [
      { part: 'from' as DatePart, segment: segmentOrder[0] },
      { part: 'from' as DatePart, segment: segmentOrder[1] },
      { part: 'from' as DatePart, segment: segmentOrder[2] },
      { part: 'to' as DatePart, segment: segmentOrder[0] },
      { part: 'to' as DatePart, segment: segmentOrder[1] },
      { part: 'to' as DatePart, segment: segmentOrder[2] },
    ];
  }, [segmentOrder]);

  const updateRange = useCallback((newFrom: Record<DateSegment, string>, newTo: Record<DateSegment, string>) => {
    let fromDate = segmentsToDate(newFrom);
    let toDate = segmentsToDate(newTo);

    const isEmpty = !newFrom.day && !newFrom.month && !newFrom.year &&
      !newTo.day && !newTo.month && !newTo.year;

    const isFromComplete = newFrom.day.length === 2 && newFrom.month.length === 2 && newFrom.year.length === 4;
    const isToComplete = newTo.day.length === 2 && newTo.month.length === 2 && newTo.year.length === 4;

    const hasFormatInvalid = (isFromComplete && !fromDate) || (isToComplete && !toDate);
    // 각 side 독립 경계 검증 — 완성된 side만 판정
    const fromOutOfBounds = !!(fromDate && isOutOfBounds(fromDate, minDate, maxDate));
    const toOutOfBounds = !!(toDate && isOutOfBounds(toDate, minDate, maxDate));

    const hasInvalid = hasFormatInvalid || fromOutOfBounds || toOutOfBounds;
    setHasInvalidDate(hasInvalid);

    if (hasInvalid) return;

    if (fromDate && toDate && fromDate > toDate) {
      [fromDate, toDate] = [toDate, fromDate];
      const normalizedFrom = dateToSegments(fromDate);
      const normalizedTo = dateToSegments(toDate);
      setFromSegments(normalizedFrom);
      setToSegments(normalizedTo);
    }

    if (isEmpty) {
      onChange?.(undefined);
    } else {
      onChange?.({ from: fromDate, to: toDate });
    }
  }, [onChange, minDate, maxDate]);

  const handleSegmentChange = useCallback((part: DatePart, segment: DateSegment, inputValue: string) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const maxLen = SEGMENT_MAX_LENGTH[segment];
    const truncatedValue = numericValue.slice(0, maxLen);

    const setSegments = part === 'from' ? setFromSegments : setToSegments;
    const currentSegments = part === 'from' ? fromSegments : toSegments;
    const newSegments = { ...currentSegments, [segment]: truncatedValue };
    setSegments(newSegments);

    if (truncatedValue.length === maxLen) {
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

    if (part === 'from') {
      updateRange(newSegments, toSegments);
    } else {
      updateRange(fromSegments, newSegments);
    }
  }, [fromSegments, toSegments, segmentRefs, updateRange, getAllSegments]);

  const handleSegmentKeyDown = useCallback((part: DatePart, segment: DateSegment, e: React.KeyboardEvent<HTMLInputElement>) => {
    const allSegments = getAllSegments();
    const currentIndex = allSegments.findIndex(s => s.part === part && s.segment === segment);
    const currentSegments = part === 'from' ? fromSegments : toSegments;

    if (e.key === 'ArrowRight') {
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
  }, [fromSegments, toSegments, segmentRefs, getAllSegments]);

  const handleSegmentFocus = useCallback((part: DatePart, segment: DateSegment) => {
    isInputFocused.current = true;
    setActiveSegment({ part, segment });
    onFocus?.();
  }, [onFocus]);

  const handleSegmentBlur = useCallback((part: DatePart, segment: DateSegment) => {
    setTimeout(() => {
      const currentSegments = part === 'from' ? fromSegmentsRef.current : toSegmentsRef.current;
      const setSegments = part === 'from' ? setFromSegments : setToSegments;
      const paddedValue = padSegment(segment, currentSegments[segment]);

      if (paddedValue !== currentSegments[segment]) {
        const newSegments = { ...currentSegments, [segment]: paddedValue };
        setSegments(newSegments);
        if (part === 'from') {
          updateRange(newSegments, toSegmentsRef.current);
        } else {
          updateRange(fromSegmentsRef.current, newSegments);
        }
      }

      const allSegments = getAllSegments();
      const isAnySegmentFocused = allSegments.some(
        s => segmentRefs[s.part][s.segment].current === document.activeElement
      );
      if (!isAnySegmentFocused) {
        // invalid(포맷 오류 or 경계 밖) 상태로 포커스가 완전 이탈하면 value prop 기준으로 양 side 모두 리셋
        if (hasInvalidDateRef.current) {
          setFromSegments(dateToSegments(value?.from));
          setToSegments(dateToSegments(value?.to));
          setHasInvalidDate(false);
        }
        isInputFocused.current = false;
        setActiveSegment(null);
        onBlur?.();
      }
    }, 0);
  }, [segmentRefs, updateRange, onBlur, getAllSegments, value]);

  const handleInputAreaClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && !activeSegment) {
      const firstSegment = segmentOrder[0];
      segmentRefs.from[firstSegment].current?.focus();
      segmentRefs.from[firstSegment].current?.select();
    }
  }, [disabled, activeSegment, segmentOrder, segmentRefs]);

  const handleCalendarIconClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onCalendarClick?.();
    }
  }, [disabled, onCalendarClick]);

  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[datePickerStyle];
  const showError = hasError || hasInvalidDate;
  const state = disabled ? 'disabled' : showError ? 'error' : hasSuccess ? 'success' : 'default';
  const stateConfig = STATE_CONFIG[state];

  const iconColor = disabled ? 'default-disabled' : showError ? 'destructive' : hasSuccess ? 'success' : 'default-subtle';

  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    sizeConfig.container,
    sizeConfig.paddingWithTailIcon,
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

  const renderSegment = (part: DatePart, segment: DateSegment) => {
    const segments = part === 'from' ? fromSegments : toSegments;
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
          width: segment === 'year' ? '40px' : '24px',
          height: '20px',
        }}
      />
    );
  };

  const renderDatePart = (part: DatePart) => (
    <div className="flex items-center ds-gap-2">
      {renderSegment(part, segmentOrder[0])}
      <span className="text-hint size-sm">{separator}</span>
      {renderSegment(part, segmentOrder[1])}
      <span className="text-hint size-sm">{separator}</span>
      {renderSegment(part, segmentOrder[2])}
    </div>
  );

  return (
    <div
      ref={ref}
      className={wrapperClassName}
    >
      <div
        className="flex items-center ds-gap-8 flex-1 min-w-0"
        onClick={pickerOnly ? handleCalendarIconClick : handleInputAreaClick}
      >
        {renderDatePart('from')}
        <span className="text-hint size-sm">-</span>
        {renderDatePart('to')}
      </div>
      {!hideCalendarIcon && (
        <button
          type="button"
          aria-label="캘린더 열기"
          disabled={disabled}
          onClick={handleCalendarIconClick}
          className={cn(
            'shrink-0 flex items-center justify-center',
            'hover:bg-state-ghost-hover rounded-xs transition-colors',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <Icon
            icon={RiCalendarLine}
            size={sizeConfig.iconSize}
            color={iconColor}
          />
        </button>
      )}
    </div>
  );
});

DateRangeInput.displayName = 'DateRangeInput';
