import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';

import { cn } from '@/lib/utils';
import { Icon } from '../icons/Icon';
import type {
  InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
} from './InputOTP.types';

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ containerClassName, className, ...props }, ref) => (
  <OTPInput
    ref={ref}
    aria-label={props['aria-label'] || 'One-time password'}
    containerClassName={cn(
      'flex items-center ds-gap-8 has-[:disabled]:opacity-50',
      containerClassName
    )}
    className={cn('disabled:cursor-not-allowed', className)}
    {...props}
  />
));
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
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex height-40 width-40 items-center justify-center',
        'border-y border-r border-default size-md font-body font-medium line-height-leading-5',
        'shadow-sm transition-all',
        'first:rounded-l-md first:border-l last:rounded-r-md',
        isActive && 'z-10 ring-2 ring-highlight',
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
    <Icon iconType={['system', 'subtract']} size={16} color="muted" />
  </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
