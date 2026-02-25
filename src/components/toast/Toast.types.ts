import type { ComponentProps } from 'react';
import type { Toaster } from 'sonner';

export type ToastVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface ToastAction {
  /** 액션 버튼 라벨 */
  label: string;
  /** 액션 버튼 클릭 핸들러 */
  onClick: () => void;
}

export interface ToastContentProps {
  variant?: ToastVariant;
  message: string;
  label?: string;
  toastId?: string | number;
  action?: ToastAction;
}

export interface ToastOptions {
  /** 자동 닫힘까지 시간 (ms). 미설정 시 variant별 기본값 사용 */
  duration?: number;
  /** 토스트 라벨 텍스트 */
  label?: string;
  /** 액션 버튼 */
  action?: ToastAction;
  /** 사용자가 토스트를 닫았을 때 호출되는 콜백 */
  onDismiss?: () => void;
  /** 자동 닫힘 시 호출되는 콜백 */
  onAutoClose?: () => void;
}

export type BlumnaiToasterProps = Omit<ComponentProps<typeof Toaster>, 'toastOptions'> & {
  /** 동시에 표시할 최대 토스트 수
   * @default 3
   */
  visibleToasts?: number;
};
