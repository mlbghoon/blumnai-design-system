import { toast as sonnerToast } from 'sonner';

import { cn } from '@/lib/utils';
import {
  TOAST_BASE,
  TOAST_INDICATOR,
  TOAST_INDICATOR_BASE,
  TOAST_LABEL,
  TOAST_LABEL_STYLE,
  TOAST_MESSAGE_STYLE,
  TOAST_VARIANT,
} from '../../constants/toast/toast.constants';

import type { ToastContentProps } from './Toast.types';

export const ToastContent = ({ variant = 'default', message, label, toastId, action }: ToastContentProps) => {
  const displayLabel = label ?? TOAST_LABEL[variant];

  return (
    <div
      className={cn(TOAST_BASE, TOAST_VARIANT[variant])}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      <div className={cn(TOAST_INDICATOR_BASE, TOAST_INDICATOR[variant])} />
      <p className={cn(TOAST_MESSAGE_STYLE, 'flex-1')}>
        {displayLabel && <span className={TOAST_LABEL_STYLE}>{displayLabel} </span>}
        {message}
      </p>
      {action && (
        <button
          type="button"
          onClick={() => {
            action.onClick();
            if (toastId !== undefined) sonnerToast.dismiss(toastId);
          }}
          className="flex-shrink-0 font-body size-sm line-height-leading-5 font-medium text-basic-blue-strong hover:text-basic-blue-accent transition-colors cursor-pointer border-0 bg-transparent padding-x-4 padding-y-2 rounded-xs focus:outline-none focus-visible:shadow-component-misc-focus"
        >
          {action.label}
        </button>
      )}
      {toastId !== undefined && (
        <button
          type="button"
          onClick={() => sonnerToast.dismiss(toastId)}
          className="flex-shrink-0 inline-flex items-center justify-center width-20 height-20 rounded-xs text-muted hover:text-default transition-colors cursor-pointer focus:outline-none focus-visible:shadow-component-misc-focus"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

ToastContent.displayName = 'ToastContent';
