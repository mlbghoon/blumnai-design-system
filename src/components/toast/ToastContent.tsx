import { toast as sonnerToast } from 'sonner';

import { cn } from '../../utils/cn';
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

export const ToastContent = ({ variant = 'default', message, label, toastId }: ToastContentProps) => {
  const displayLabel = label ?? TOAST_LABEL[variant];

  return (
    <div className={cn(TOAST_BASE, TOAST_VARIANT[variant])}>
      <div className={cn(TOAST_INDICATOR_BASE, TOAST_INDICATOR[variant])} />
      <p className={cn(TOAST_MESSAGE_STYLE, 'flex-1')}>
        {displayLabel && <span className={TOAST_LABEL_STYLE}>{displayLabel} </span>}
        {message}
      </p>
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
