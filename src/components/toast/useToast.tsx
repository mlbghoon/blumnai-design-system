import { toast as sonnerToast } from 'sonner';

import { ToastContent } from './ToastContent';

import type { ToastOptions, ToastVariant } from './Toast.types';

const createToast = (variant: ToastVariant, message: string, options?: ToastOptions) => {
  return sonnerToast.custom(
    (id) => <ToastContent variant={variant} message={message} label={options?.label} toastId={id} />,
    {
      duration: options?.duration,
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
