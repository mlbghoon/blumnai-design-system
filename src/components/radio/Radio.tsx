import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';
import type { RadioGroupProps, RadioProps } from './Radio.types';

const RADIO_SIZE_CONFIG = {
  sm: { box: 'width-16 height-16', indicatorSize: 8, labelLineHeight: 'height-20' },
  md: { box: 'width-20 height-20', indicatorSize: 10, labelLineHeight: 'height-24' },
  lg: { box: 'width-24 height-24', indicatorSize: 12, labelLineHeight: 'height-28' },
} as const;

export const RadioIndicator = ({ color = 'currentColor', size = 8 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
  </svg>
);

type RadioContextValue = {
  value: string | undefined;
};

const RadioContext = React.createContext<RadioContextValue>({ value: undefined });

/**
 * RadioGroup 컴포넌트
 *
 * 라디오 버튼 그룹입니다. Radio 컴포넌트와 함께 사용하여 단일 선택을 구현합니다.
 *
 * @example
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <Radio value="a" label="옵션 A" />
 *   <Radio value="b" label="옵션 B" />
 * </RadioGroup>
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, value, onValueChange, defaultValue, orientation, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value !== undefined ? (value ?? undefined) : internalValue;

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <RadioContext.Provider value={{ value: currentValue }}>
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn(
          'flex ds-gap-12',
          orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
          className
        )}
        value={currentValue}
        onValueChange={handleValueChange}
        orientation={orientation}
        {...props}
      />
    </RadioContext.Provider>
  );
});

RadioGroup.displayName = 'RadioGroup';

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(({ className, label, description, radioPosition = 'left', radioStyle = 'default', align = 'start', labelWeight = 'medium', size = 'sm', disabled, value, ...props }, ref) => {
  const context = React.useContext(RadioContext);
  const isChecked = context.value === value;
  const sizeConfig = RADIO_SIZE_CONFIG[size];

  const shadowEffects = radioStyle === 'with-shadow' && !isChecked && !disabled
    ? 'shadow-component-default'
    : '';

  const checkedInnerShadow = radioStyle === 'with-shadow' && isChecked && !disabled;

  const iconColor = disabled ? 'var(--icon-default-disabled)' : 'var(--icon-white-default, #FFF)';

  const radioElement = (
    <RadioGroupPrimitive.Item
      ref={ref}
      value={value}
      disabled={disabled}
      className={cn(
        'peer relative shrink-0 group',
        sizeConfig.box,
        'rounded-full',
        'overflow-hidden',
        'transition-colors',
        'focus-visible:outline-none focus-visible:shadow-component-focus',
        disabled
          ? 'bg-checkbox-disabled border-default cursor-not-allowed'
          : isChecked
            ? 'border-none bg-checkbox-active cursor-pointer hover:bg-checkbox-active-hover'
            : 'border-darker bg-checkbox-default cursor-pointer hover:border-strong',
        shadowEffects,
        className
      )}
      {...props}
    >
      {checkedInnerShadow && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ inset: '1px', boxShadow: '0px 1px 0px rgba(255, 255, 255, 0.25) inset' }}
        />
      )}
      <RadioGroupPrimitive.Indicator className="absolute flex items-center justify-center" style={{ inset: '1px' }}>
        <RadioIndicator color={iconColor} size={sizeConfig.indicatorSize} />
      </RadioGroupPrimitive.Indicator>
      {!disabled && !isChecked && (
        <div
          className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ inset: '1px' }}
        >
          <RadioIndicator color="var(--icon-default-disabled)" size={sizeConfig.indicatorSize} />
        </div>
      )}
    </RadioGroupPrimitive.Item>
  );

  if (!label && !description) {
    return radioElement;
  }

  return (
    <label
      className={cn(
        'inline-flex ds-gap-10',
        align === 'center' ? 'items-center' : 'items-start',
        radioPosition === 'right' && 'flex-row-reverse',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <div className={cn(sizeConfig.labelLineHeight, 'flex items-center shrink-0')}>
        {radioElement}
      </div>
      <div className="flex flex-col ds-gap-4">
        {label && (
          <span
            className={cn(
              'font-body size-sm line-height-leading-5 letter-spacing-tracking-normal select-none',
              labelWeight === 'normal' ? 'font-normal' : 'font-medium',
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

Radio.displayName = 'Radio';

export { Radio, RadioGroup, RadioContext };
