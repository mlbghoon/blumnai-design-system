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

export const ToastContent = ({ variant = 'default', message, label }: ToastContentProps) => {
  const displayLabel = label ?? TOAST_LABEL[variant];

  return (
    <div className={cn(TOAST_BASE, TOAST_VARIANT[variant])}>
      <div className={cn(TOAST_INDICATOR_BASE, TOAST_INDICATOR[variant])} />
      <p className={TOAST_MESSAGE_STYLE}>
        {displayLabel && <span className={TOAST_LABEL_STYLE}>{displayLabel} </span>}
        {message}
      </p>
    </div>
  );
};

ToastContent.displayName = 'ToastContent';
