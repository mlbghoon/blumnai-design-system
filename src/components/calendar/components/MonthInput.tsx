import { useEffect, useCallback, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon/Icon';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  INPUT_WRAPPER_BASE,
} from 'constants/input/Input/Input.constants';
import { useSegmentInput } from '../hooks/useSegmentInput';
import type { SegmentConfig } from '../hooks/useSegmentInput';

interface MonthInputProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  hasError?: boolean;
  isOpen?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onCalendarClick?: () => void;
  className?: string;
}

const validateYear = (value: string): boolean => {
  const n = parseInt(value, 10);
  return n >= 1 && n <= 9999;
};

const validateMonth = (value: string): boolean => {
  const n = parseInt(value, 10);
  return n >= 1 && n <= 12;
};

const MONTH_SEGMENTS: SegmentConfig[] = [
  { name: 'year', maxLength: 4, placeholder: 'yyyy', validate: validateYear },
  { name: 'month', maxLength: 2, placeholder: 'mm', validate: validateMonth },
];

export const MonthInput = forwardRef<HTMLDivElement, MonthInputProps>(({
  value,
  onChange,
  disabled = false,
  hasError = false,
  isOpen = false,
  onFocus,
  onBlur,
  onCalendarClick,
  className,
}, ref) => {
  const handleComplete = useCallback((segValues: Record<string, string>) => {
    const year = parseInt(segValues.year, 10);
    const month = parseInt(segValues.month, 10);
    onChange?.(new Date(year, month - 1, 1));
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange?.(undefined);
  }, [onChange]);

  const {
    values,
    activeSegment,
    refs,
    setValues,
    handleChange,
    handleKeyDown,
    handleFocus: hookHandleFocus,
    handleBlur: hookHandleBlur,
    handleAreaClick,
    hasInvalidDate,
  } = useSegmentInput({
    segments: MONTH_SEGMENTS,
    onComplete: handleComplete,
    onClear: handleClear,
    onFocus,
    onBlur,
  });

  useEffect(() => {
    if (value) {
      setValues({
        year: String(value.getFullYear()),
        month: String(value.getMonth() + 1).padStart(2, '0'),
      });
    } else {
      setValues({ year: '', month: '' });
    }
  }, [value, setValues]);

  const sizeConfig = SIZE_CONFIG['sm'];
  const styleConfig = STYLE_CONFIG['default'];
  const showError = hasError || hasInvalidDate;
  const state = disabled ? 'disabled' : showError ? 'error' : 'default';
  const stateConfig = STATE_CONFIG[state];
  const iconColor = disabled ? 'default-disabled' : showError ? 'destructive' : 'default-subtle';

  const wrapperClassName = cn(
    INPUT_WRAPPER_BASE,
    sizeConfig.container,
    sizeConfig.paddingWithTailIcon,
    sizeConfig.gap,
    styleConfig.base,
    !disabled && !showError && !isOpen && styleConfig.focus,
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'error' && 'border-destructive',
    isOpen && !showError && 'border-strong shadow-component-input-focus',
    disabled ? 'cursor-not-allowed' : 'cursor-text',
    className
  );

  const handleCalendarIconClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onCalendarClick?.();
    }
  }, [disabled, onCalendarClick]);

  const renderSegment = (segmentName: string) => {
    const config = MONTH_SEGMENTS.find(s => s.name === segmentName)!;
    const segmentValue = values[segmentName];
    const isActive = activeSegment === segmentName;

    return (
      <input
        key={segmentName}
        ref={refs[segmentName] as React.RefObject<HTMLInputElement>}
        type="text"
        inputMode="numeric"
        value={segmentValue}
        placeholder={config.placeholder}
        disabled={disabled}
        onChange={(e) => handleChange(segmentName, e.target.value)}
        onKeyDown={(e) => handleKeyDown(segmentName, e)}
        onFocus={() => hookHandleFocus(segmentName)}
        onBlur={() => hookHandleBlur(segmentName)}
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
          width: config.maxLength === 4 ? '40px' : '24px',
          height: '20px',
        }}
      />
    );
  };

  return (
    <div ref={ref} className={wrapperClassName}>
      <div
        className="flex items-center ds-gap-2 flex-1 min-w-0"
        onClick={handleAreaClick}
      >
        {renderSegment('year')}
        <span className="text-hint size-sm">.</span>
        {renderSegment('month')}
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

MonthInput.displayName = 'MonthInput';
