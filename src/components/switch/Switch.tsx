import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';
import type { SwitchColor, SwitchProps } from './Switch.types';

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
>(({ className, label, description, switchPosition = 'left', color = 'green', disabled, checked, onCheckedChange, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isGreen = color === 'green';

  const getTrackStyle = (): React.CSSProperties | undefined => {
    if (!checked) return undefined;
    if (isGreen) return undefined;
    if (disabled) return getActiveStyle(color, true);
    if (isHovered) return getActiveHoverStyle(color);
    return getActiveStyle(color, false);
  };

  const switchElement = (
    <SwitchPrimitive.Root
      ref={ref}
      checked={checked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'peer relative inline-flex items-center shrink-0',
        'width-32 height-20',
        'rounded-full cursor-pointer transition-colors',
        'focus-visible:outline-none focus-visible:shadow-component-misc-focus',
        disabled
          ? !checked && 'bg-switch-disabled cursor-not-allowed'
          : !checked && 'bg-switch-default hover:bg-switch-default-hover',
        disabled && 'cursor-not-allowed',
        isGreen && checked && disabled && 'bg-switch-active-disabled',
        isGreen && checked && !disabled && 'bg-switch-active hover:bg-switch-active-hover',
        className
      )}
      style={getTrackStyle()}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block width-14 height-14 rounded-full',
          'transition-transform duration-200',
          disabled ? 'bg-switch-handle-disabled' : 'bg-switch-handle',
          !disabled && 'shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.08)]',
          'translate-x-[3px] data-[state=checked]:translate-x-[15px]'
        )}
      />
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
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <div className="height-20 flex items-center shrink-0">
        {switchElement}
      </div>
      <div className="flex flex-col ds-gap-4">
        {label && (
          <span
            className={cn(
              'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal font-medium select-none',
              disabled ? 'text-hint' : 'text-default'
            )}
          >
            {label}
          </span>
        )}
        {description && (
          <span
            className={cn(
              'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal select-none',
              disabled ? 'text-hint' : 'text-subtle'
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
