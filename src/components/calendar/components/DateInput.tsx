import { useState, useRef, useCallback, useEffect, forwardRef, useMemo } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../icons/Icon/Icon';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
} from 'constants/input/Input/Input.constants';
import type { DateInputProps, DateSegment, DateSegmentOrder, DateFormat } from '../DatePicker.types';

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

export const DateInput = forwardRef<HTMLDivElement, DateInputProps>(({
  value,
  onChange,
  placeholder,
  disabled = false,
  hasError = false,
  hasSuccess = false,
  isOpen = false,
  datePickerStyle = 'default',
  size = 'sm',
  dateFormat = 'yyyy.MM.dd',
  onFocus,
  onBlur,
  onCalendarClick,
  className,
}, ref) => {
  const segmentOrder = getSegmentOrderFromFormat(dateFormat);
  const separator = getSeparatorFromFormat(dateFormat);
  const [segments, setSegments] = useState<Record<DateSegment, string>>({
    day: '',
    month: '',
    year: '',
  });
  const segmentsRef = useRef(segments);
  // Sync ref with current segments for use in callbacks
  useEffect(() => {
    segmentsRef.current = segments;
  }, [segments]);

  const [activeSegment, setActiveSegment] = useState<DateSegment | null>(null);
  const [_isFocused, setIsFocused] = useState(false);
  const [hasInvalidDate, setHasInvalidDate] = useState(false);

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const segmentRefs = useMemo<Record<DateSegment, React.RefObject<HTMLInputElement | null>>>(() => ({
    day: dayRef,
    month: monthRef,
    year: yearRef,
  }), []);

  useEffect(() => {
    if (value) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSegments({
        day: padSegment('day', String(value.getDate())),
        month: padSegment('month', String(value.getMonth() + 1)),
        year: String(value.getFullYear()),
      });
    } else {
      setSegments({ day: '', month: '', year: '' });
    }
  }, [value]);

  const updateDateFromSegments = useCallback((newSegments: Record<DateSegment, string>) => {
    const { day, month, year } = newSegments;

    if (day && month && year && year.length === 4 && day.length === 2 && month.length === 2) {
      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);

      if (
        validateSegment('day', day) &&
        validateSegment('month', month) &&
        validateSegment('year', year)
      ) {
        const newDate = new Date(yearNum, monthNum - 1, dayNum);
        if (
          newDate.getDate() === dayNum &&
          newDate.getMonth() === monthNum - 1 &&
          newDate.getFullYear() === yearNum
        ) {
          setHasInvalidDate(false);
          onChange?.(newDate);
          return;
        }
      }
      setHasInvalidDate(true);
      return;
    }

    setHasInvalidDate(false);
    if (!day && !month && !year) {
      onChange?.(undefined);
    }
  }, [onChange]);

  const handleSegmentChange = useCallback((segment: DateSegment, inputValue: string) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const maxLen = SEGMENT_MAX_LENGTH[segment];
    const truncatedValue = numericValue.slice(0, maxLen);

    const newSegments = { ...segments, [segment]: truncatedValue };
    setSegments(newSegments);

    if (truncatedValue.length === maxLen) {
      const currentIndex = segmentOrder.indexOf(segment);
      if (currentIndex < segmentOrder.length - 1) {
        const nextSegment = segmentOrder[currentIndex + 1];
        setTimeout(() => {
          segmentRefs[nextSegment].current?.focus();
          segmentRefs[nextSegment].current?.select();
        }, 0);
      }
    }

    updateDateFromSegments(newSegments);
  }, [segments, segmentOrder, updateDateFromSegments, segmentRefs]);

  const handleSegmentKeyDown = useCallback((segment: DateSegment, e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentIndex = segmentOrder.indexOf(segment);

    if (e.key === 'ArrowRight') {
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
  }, [segments, segmentOrder, segmentRefs]);

  const handleSegmentFocus = useCallback((segment: DateSegment) => {
    setActiveSegment(segment);
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleSegmentBlur = useCallback((segment: DateSegment) => {
    setTimeout(() => {
      const currentSegments = segmentsRef.current;
      const paddedValue = padSegment(segment, currentSegments[segment]);
      if (paddedValue !== currentSegments[segment]) {
        const newSegments = { ...currentSegments, [segment]: paddedValue };
        setSegments(newSegments);
        updateDateFromSegments(newSegments);
      }

      const isAnySegmentFocused = segmentOrder.some(
        s => segmentRefs[s].current === document.activeElement
      );
      if (!isAnySegmentFocused) {
        setActiveSegment(null);
        setIsFocused(false);
        onBlur?.();
      }
    }, 0);
  }, [segmentOrder, segmentRefs, updateDateFromSegments, onBlur]);

  const handleInputAreaClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && !activeSegment) {
      const firstSegment = segmentOrder[0];
      segmentRefs[firstSegment].current?.focus();
      segmentRefs[firstSegment].current?.select();
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
    disabled ? 'cursor-not-allowed' : 'cursor-text',
    className
  );

  const renderSegment = (segment: DateSegment) => {
    const segmentValue = segments[segment];
    const placeholderText = placeholder?.[segment] || SEGMENT_PLACEHOLDERS[segment];
    const isActive = activeSegment === segment;

    return (
      <input
        key={segment}
        ref={segmentRefs[segment] as React.RefObject<HTMLInputElement>}
        type="text"
        inputMode="numeric"
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
          width: segment === 'year' ? '40px' : '24px',
          height: '20px',
        }}
      />
    );
  };

  return (
    <div
      ref={ref}
      className={wrapperClassName}
    >
      <div
        className="flex items-center ds-gap-2 flex-1 min-w-0"
        onClick={handleInputAreaClick}
      >
        {renderSegment(segmentOrder[0])}
        <span className="text-hint size-sm">{separator}</span>
        {renderSegment(segmentOrder[1])}
        <span className="text-hint size-sm">{separator}</span>
        {renderSegment(segmentOrder[2])}
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={handleCalendarIconClick}
        className={cn(
          'flex-shrink-0 flex items-center justify-center',
          'hover:bg-state-ghost-hover rounded-xs transition-colors',
          disabled && 'cursor-not-allowed'
        )}
      >
        <Icon
          iconType={['business', 'calendar']}
          size={sizeConfig.iconSize}
          color={iconColor}
        />
      </button>
    </div>
  );
});

DateInput.displayName = 'DateInput';
