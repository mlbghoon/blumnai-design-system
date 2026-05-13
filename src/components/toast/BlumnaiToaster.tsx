import { Toaster } from 'sonner';

import { cn } from '@/lib/utils';

import type { BlumnaiToasterProps } from './Toast.types';

/**
 * BlumnaiToaster
 *
 * 토스트 알림을 표시하기 위한 Toaster 컴포넌트입니다.
 * 앱 루트에 한 번만 마운트하세요.
 *
 * @example
 * ```tsx
 * <BlumnaiToaster />
 * ```
 */
export const BlumnaiToaster = ({
  visibleToasts = 3,
  position = 'bottom-right',
  className,
  ...props
}: BlumnaiToasterProps) => {
  return (
    <Toaster
      position={position}
      visibleToasts={visibleToasts}
      className={cn('blumnai-toast-viewport', className)}
      toastOptions={{ className: 'blumnai-toast' }}
      {...props}
    />
  );
};

BlumnaiToaster.displayName = 'BlumnaiToaster';
