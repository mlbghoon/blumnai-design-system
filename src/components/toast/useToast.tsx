import { toast as sonnerToast } from 'sonner';

import { ToastContent } from './ToastContent';

import type { ToastOptions, ToastVariant } from './Toast.types';

const VARIANT_DURATION: Record<ToastVariant, number> = {
  default: 4000,
  info: 4000,
  success: 3000,
  warning: 6000,
  error: 8000,
};

const createToast = (variant: ToastVariant, message: string, options?: ToastOptions) => {
  const duration = options?.duration ?? VARIANT_DURATION[variant];

  return sonnerToast.custom(
    (id) => (
      <ToastContent
        variant={variant}
        message={message}
        label={options?.label}
        toastId={id}
        action={options?.action}
      />
    ),
    {
      duration,
      onDismiss: options?.onDismiss ? () => options.onDismiss?.() : undefined,
      onAutoClose: options?.onAutoClose ? () => options.onAutoClose?.() : undefined,
    }
  );
};

export const toast = {
  default: (message: string, options?: ToastOptions) => createToast('default', message, options),
  info: (message: string, options?: ToastOptions) => createToast('info', message, options),
  success: (message: string, options?: ToastOptions) => createToast('success', message, options),
  warning: (message: string, options?: ToastOptions) => createToast('warning', message, options),
  error: (message: string, options?: ToastOptions) => createToast('error', message, options),
  dismiss: sonnerToast.dismiss,
  dismissAll: () => sonnerToast.dismiss(),
};
