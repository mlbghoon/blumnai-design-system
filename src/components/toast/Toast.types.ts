export type ToastVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface ToastContentProps {
  variant?: ToastVariant;
  message: string;
  label?: string;
}

export interface ToastOptions {
  duration?: number;
  label?: string;
}
