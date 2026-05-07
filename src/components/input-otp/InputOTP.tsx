import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';

import { cn } from '@/lib/utils';
import { Icon, RiSubtractLine } from '../icons/Icon';
import type {
  InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
} from './InputOTP.types';

const InputOTPErrorContext = React.createContext(false);

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ containerClassName, className, error, label, 'aria-label': ariaLabel, ...restProps }, ref) => {
  const hasError = error === true || (typeof error === 'string' && error.length > 0);

  return (
    <InputOTPErrorContext.Provider value={hasError}>
      <div className="flex flex-col ds-gap-4">
        {label && (
          <span className="font-body size-sm line-height-leading-5 font-medium text-default">
            {label}
          </span>
        )}
        <OTPInput
          ref={ref}
          containerClassName={cn(
            'flex items-center ds-gap-8 has-[:disabled]:opacity-50',
            containerClassName
          )}
          className={cn('disabled:cursor-not-allowed', className)}
          {...restProps}
          aria-label={ariaLabel ?? label ?? 'One-time password'}
          aria-invalid={hasError || undefined}
        />
        {typeof error === 'string' && error.length > 0 && (
          <span className="font-body size-xs line-height-leading-4 text-destructive">
            {error}
          </span>
        )}
      </div>
    </InputOTPErrorContext.Provider>
  );
});
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<
  React.ElementRef<'div'>,
  InputOTPGroupProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
));
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<
  React.ElementRef<'div'>,
  InputOTPSlotProps
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const hasError = React.useContext(InputOTPErrorContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex height-40 width-40 items-center justify-center',
        'size-md font-body font-medium line-height-leading-5',
        'transition-[box-shadow]',
        'first:rounded-l-md last:rounded-r-md',
        '[&:not(:first-child)]:-ml-px',
        hasError ? 'shadow-components-default-destructive' : 'shadow-components-default',
        isActive && !hasError && 'z-10 shadow-component-input-focus',
        isActive && hasError && 'z-10 shadow-component-input-focus-error',
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="height-20 w-px animate-caret-blink bg-default duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<'div'>,
  InputOTPSeparatorProps
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Icon icon={RiSubtractLine} size={16} color="muted" />
  </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
