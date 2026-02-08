export type ConfirmDialogVariant = 'default' | 'destructive';

export interface ConfirmDialogProps {
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
  /** 취소 버튼 텍스트 @default '취소' */
  cancelLabel?: string;
  /** 확인 버튼 스타일 @default 'default' */
  variant?: ConfirmDialogVariant;
  /** 확인 버튼 클릭 핸들러 (Promise 지원) */
  onConfirm?: () => void | Promise<void>;
  /** 취소 버튼 클릭 핸들러 */
  onCancel?: () => void;
  /** 다이얼로그 너비 */
  width?: string | number;
  /** 로딩 상태 (확인 버튼 비활성화) */
  loading?: boolean;
  /** 확인 버튼 비활성화 */
  confirmDisabled?: boolean;
}
