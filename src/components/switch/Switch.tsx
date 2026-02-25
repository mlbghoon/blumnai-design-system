import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';
import type { SwitchColor, SwitchProps } from './Switch.types';

const SWITCH_SIZE_CONFIG = {
  sm: {
    track: 'width-32 height-20',
    thumb: 'width-14 height-14',
    translateOff: 'translate-x-[3px]',
    translateOn: 'data-[state=checked]:translate-x-[15px]',
    spinnerSize: 'width-10 height-10',
    labelLineHeight: 'height-20',
  },
  md: {
    track: 'width-40 height-24',
    thumb: 'width-20 height-20',
    translateOff: 'translate-x-[2px]',
    translateOn: 'data-[state=checked]:translate-x-[18px]',
    spinnerSize: 'width-14 height-14',
    labelLineHeight: 'height-24',
  },
  lg: {
    track: 'width-48 height-28',
    thumb: 'width-24 height-24',
    translateOff: 'translate-x-[2px]',
    translateOn: 'data-[state=checked]:translate-x-[22px]',
    spinnerSize: 'width-16 height-16',
    labelLineHeight: 'height-28',
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
>(({ className, label, description, switchPosition = 'left', color = 'green', size = 'sm', disabled, loading = false, checked, onCheckedChange, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
  const descriptionId = React.useId();
  const [isHovered, setIsHovered] = React.useState(false);
  const isGreen = color === 'green';
  const isDisabled = disabled || loading;
  const sizeConfig = SWITCH_SIZE_CONFIG[size];

  const getTrackStyle = (): React.CSSProperties | undefined => {
    if (!checked) return undefined;
    if (isGreen) return undefined;
    if (isDisabled) return getActiveStyle(color, true);
    if (isHovered) return getActiveHoverStyle(color);
    return getActiveStyle(color, false);
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
      aria-describedby={[ariaDescribedBy, description ? descriptionId : undefined].filter(Boolean).join(' ') || undefined}
      aria-busy={loading || undefined}
      className={cn(
        'peer relative inline-flex items-center shrink-0',
        sizeConfig.track,
        'rounded-full cursor-pointer transition-colors',
        'focus-visible:outline-none focus-visible:shadow-component-misc-focus',
        isDisabled
          ? !checked && 'bg-switch-disabled cursor-not-allowed'
          : !checked && 'bg-switch-default hover:bg-switch-default-hover',
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
        <SwitchPrimitive.Thumb
          className={cn(
            'pointer-events-none block rounded-full',
            sizeConfig.thumb,
            'transition-transform duration-200',
            'motion-reduce:transition-none',
            isDisabled ? 'bg-switch-handle-disabled' : 'bg-switch-handle',
            !isDisabled && 'shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.08)]',
            sizeConfig.translateOff,
            sizeConfig.translateOn
          )}
        />
      )}
    </SwitchPrimitive.Root>
  );

  if (!label && !description) {
    return switchElement;
  }

  return (
    <label
      className={cn(
        'inline-flex items-start ds-gap-10',
        switchPosition === 'right' && 'flex-row-reverse',
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <div className={cn(sizeConfig.labelLineHeight, 'flex items-center shrink-0')}>
        {switchElement}
      </div>
      <div className="flex flex-col ds-gap-4">
        {label && (
          <span
            className={cn(
              'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal font-medium select-none',
              isDisabled ? 'text-hint' : 'text-default'
            )}
          >
            {label}
          </span>
        )}
        {description && (
          <span
            id={descriptionId}
            className={cn(
              'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal select-none',
              isDisabled ? 'text-hint' : 'text-subtle'
            )}
          >
            {description}
          </span>
        )}
      </div>
    </label>
  );
});

Switch.displayName = 'Switch';

export { Switch };
