import type { OTPInput } from 'input-otp';

export type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput> & {
  /**
   * Error state. When `true` or a non-empty string, slots display red
   * border styling and `aria-invalid` is set on the hidden input.
   * When a string is provided, it is rendered as an error message below the input.
   */
  error?: boolean | string;
  /**
   * Visible label rendered above the OTP input.
   * Also used as the accessible name via `aria-label` when no explicit
   * `aria-label` or `aria-labelledby` is provided.
   */
  label?: string;
};

export type InputOTPGroupProps = React.ComponentPropsWithoutRef<'div'>;

export interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<'div'> {
  index: number;
}

export type InputOTPSeparatorProps = React.ComponentPropsWithoutRef<'div'>;
