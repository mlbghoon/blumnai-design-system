import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';
import { resolveCaption } from '../input/shared/resolveCaption';
import { InlineFieldWrapper } from '../input/shared/InlineFieldWrapper';
import type { SwitchColor, SwitchProps } from './Switch.types';

const SWITCH_SIZE_CONFIG = {
  sm: {
    track: 'width-32 height-20',
    thumb: 'width-14 height-14',
    translateOff: 'translate-x-[3px]',
    translateOn: 'data-[state=checked]:translate-x-[15px]',
    spinnerSize: 'width-10 height-10',
    labelLineHeight: 'height-20',
    labeledTrackWidth: 44,
    labeledTranslateOn: 'data-[state=checked]:translate-x-[27px]',
    labelWidth: 25,
    labelFontSize: 10 as number | undefined,
    labelFontClass: '',
  },
  md: {
    track: 'width-40 height-24',
    thumb: 'width-20 height-20',
    translateOff: 'translate-x-[2px]',
    translateOn: 'data-[state=checked]:translate-x-[18px]',
    spinnerSize: 'width-14 height-14',
    labelLineHeight: 'height-24',
    labeledTrackWidth: 52,
    labeledTranslateOn: 'data-[state=checked]:translate-x-[30px]',
    labelWidth: 30,
    labelFontSize: undefined as number | undefined,
    labelFontClass: 'size-xs',
  },
  lg: {
    track: 'width-48 height-28',
    thumb: 'width-24 height-24',
    translateOff: 'translate-x-[2px]',
    translateOn: 'data-[state=checked]:translate-x-[22px]',
    spinnerSize: 'width-16 height-16',
    labelLineHeight: 'height-28',
    labeledTrackWidth: 60,
    labeledTranslateOn: 'data-[state=checked]:translate-x-[34px]',
    labelWidth: 34,
    labelFontSize: undefined as number | undefined,
    labelFontClass: 'size-xs',
  },
} as const;

const getActiveStyle = (color: SwitchColor, disabled: boolean): React.CSSProperties | undefined => {
  if (color === 'green') {
    return undefined;
  }
  if (disabled) {
    return { backgroundColor: `var(--bg-basic-${color}-subtle)` };
  }
  return { backgroundColor: `var(--bg-basic-${color}-accent)` };
};

const getActiveHoverStyle = (color: SwitchColor): React.CSSProperties | undefined => {
  if (color === 'green') {
    return undefined;
  }
  return { backgroundColor: `var(--bg-basic-${color}-strong)` };
};

const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin text-muted', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

/**
 * Switch 컴포넌트
 *
 * 켜기/끄기 토글 스위치입니다. 라벨, 설명, 다양한 색상을 지원합니다.
 *
 * @example
 * <Switch label="알림 활성화" checked={enabled} onCheckedChange={setEnabled} />
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, description, switchPosition = 'left', color = 'green', size = 'sm', disabled, loading = false, checked, onCheckedChange, onLabel, offLabel, error, success, caption, required, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isGreen = color === 'green';
  const isDisabled = disabled || loading;
  const sizeConfig = SWITCH_SIZE_CONFIG[size];
  const hasTrackLabels = !!(onLabel || offLabel);
  const { hasError, hasSuccess } = resolveCaption(error, success, caption);

  const getTrackStyle = (): React.CSSProperties | undefined => {
    const base: React.CSSProperties = {};
    if (hasTrackLabels) base.width = sizeConfig.labeledTrackWidth;
    if (checked) {
      if (!isGreen) {
        const colorStyle = isDisabled
          ? getActiveStyle(color, true)
          : isHovered
            ? getActiveHoverStyle(color)
            : getActiveStyle(color, false);
        if (colorStyle) Object.assign(base, colorStyle);
      }
    }
    return Object.keys(base).length > 0 ? base : undefined;
  };

  const switchElement = (
    <SwitchPrimitive.Root
      ref={ref}
      checked={checked}
      disabled={isDisabled}
      onCheckedChange={onCheckedChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={!label && !props['aria-label'] ? 'Toggle' : props['aria-label']}
      aria-describedby={ariaDescribedBy || undefined}
      aria-busy={loading || undefined}
      aria-invalid={hasError || undefined}
      className={cn(
        'peer relative inline-flex items-center shrink-0 overflow-hidden',
        sizeConfig.track,
        'rounded-full cursor-pointer transition-colors',
        'focus-visible:outline-none focus-visible:shadow-component-misc-focus',
        isDisabled
          ? !checked && 'bg-switch-disabled cursor-not-allowed'
          : !checked && (
              hasError ? 'bg-switch-default outline-destructive'
                : hasSuccess ? 'bg-switch-default outline-success'
                : 'bg-switch-default hover:bg-switch-default-hover'
            ),
        isDisabled && 'cursor-not-allowed',
        isGreen && checked && isDisabled && 'bg-switch-active-disabled',
        isGreen && checked && !isDisabled && 'bg-switch-active hover:bg-switch-active-hover',
        className
      )}
      style={getTrackStyle()}
      {...props}
    >
      {loading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner className={sizeConfig.spinnerSize} />
        </span>
      ) : (
        <>
          <SwitchPrimitive.Thumb
            className={cn(
              'pointer-events-none block rounded-full',
              sizeConfig.thumb,
              'transition-transform duration-200',
              'motion-reduce:transition-none',
              isDisabled ? 'bg-switch-handle-disabled' : 'bg-switch-handle',
              !isDisabled && 'shadow-card',
              sizeConfig.translateOff,
              hasTrackLabels ? sizeConfig.labeledTranslateOn : sizeConfig.translateOn,
            )}
          />
          {onLabel && (
            <span
              className={cn(
                'absolute left-0 top-0 bottom-0 flex items-center justify-center select-none pointer-events-none',
                'font-body font-medium text-white transition-opacity duration-150',
                sizeConfig.labelFontClass,
                checked ? 'opacity-100' : 'opacity-0',
              )}
              style={{
                width: sizeConfig.labelWidth,
                fontSize: sizeConfig.labelFontSize,
                lineHeight: 1,
                marginTop: -1,
              }}
              aria-hidden="true"
            >
              {onLabel}
            </span>
          )}
          {offLabel && (
            <span
              className={cn(
                'absolute right-0 top-0 bottom-0 flex items-center justify-center select-none pointer-events-none',
                'font-body font-medium text-muted transition-opacity duration-150',
                sizeConfig.labelFontClass,
                !checked ? 'opacity-100' : 'opacity-0',
              )}
              style={{
                width: sizeConfig.labelWidth,
                fontSize: sizeConfig.labelFontSize,
                lineHeight: 1,
                marginTop: -1,
              }}
              aria-hidden="true"
            >
              {offLabel}
            </span>
          )}
        </>
      )}
    </SwitchPrimitive.Root>
  );

  return (
    <InlineFieldWrapper
      label={label}
      description={description}
      required={required}
      error={error}
      success={success}
      caption={caption}
      disabled={isDisabled}
      controlPosition={switchPosition === 'right' ? 'right' : 'left'}
      labelLineHeight={sizeConfig.labelLineHeight}
      labelTextClassName="size-sm line-height-leading-5"
      descTextClassName="size-sm line-height-leading-5"
    >
      {switchElement}
    </InlineFieldWrapper>
  );
});

Switch.displayName = 'Switch';

export { Switch };
