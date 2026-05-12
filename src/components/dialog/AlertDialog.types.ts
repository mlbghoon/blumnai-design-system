import type { HTMLAttributes } from 'react';
import type {
  AlertDialogProps as RadixAlertDialogProps,
  AlertDialogTriggerProps as RadixAlertDialogTriggerProps,
  AlertDialogPortalProps as RadixAlertDialogPortalProps,
  AlertDialogOverlayProps as RadixAlertDialogOverlayProps,
  AlertDialogContentProps as RadixAlertDialogContentProps,
  AlertDialogTitleProps as RadixAlertDialogTitleProps,
  AlertDialogDescriptionProps as RadixAlertDialogDescriptionProps,
  AlertDialogActionProps as RadixAlertDialogActionProps,
  AlertDialogCancelProps as RadixAlertDialogCancelProps,
} from '@radix-ui/react-alert-dialog';

export type AlertDialogProps = RadixAlertDialogProps;

export type AlertDialogTriggerProps = RadixAlertDialogTriggerProps;

export type AlertDialogPortalProps = RadixAlertDialogPortalProps;

export type AlertDialogOverlayProps = RadixAlertDialogOverlayProps;

export interface AlertDialogContentProps
  extends RadixAlertDialogContentProps {
  /**
   * 다이얼로그의 커스텀 너비
   * @example width={400} - 400px
   * @example width="500px" - 500px
   * @example width="80%" - 80%
   */
  width?: string | number;
}

export type AlertDialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement>;

export type AlertDialogTitleProps = RadixAlertDialogTitleProps;

export type AlertDialogDescriptionProps = RadixAlertDialogDescriptionProps;

export interface AlertDialogActionProps
  extends RadixAlertDialogActionProps {
  asChild?: boolean;
}

export interface AlertDialogCancelProps
  extends RadixAlertDialogCancelProps {
  asChild?: boolean;
}

export interface SimpleAlertDialogProps {
  /** 다이얼로그 열림 상태 */
  open: boolean;
  /** 열림 상태 변경 핸들러 */
  onOpenChange: (open: boolean) => void;
  /** 다이얼로그 제목 */
  title: string;
  /** 다이얼로그 설명 (선택) */
  description?: string;
  /** 확인 버튼 텍스트 @default '확인' */
  confirmLabel?: string;
  /** 확인 버튼 클릭 핸들러 */
  onConfirm?: () => void;
  /** 다이얼로그 너비 */
  width?: string | number;
}

export interface AlertDialogScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 스크롤 영역의 최대 높이
   * @example maxHeight={300} - 300px
   * @example maxHeight="50vh" - 뷰포트 높이의 50%
   */
  maxHeight?: string | number;
}
