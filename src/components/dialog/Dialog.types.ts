import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';
import type * as DialogPrimitive from '@radix-ui/react-dialog';

export interface DialogProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  children?: ReactNode;
}

export type DialogTriggerProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
>;

export type DialogPortalProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Portal
>;

export type DialogCloseProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
>;

export type DialogOverlayProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
>;

export interface DialogContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  hideCloseButton?: boolean;
  disableEscapeClose?: boolean;
  disableOutsideClose?: boolean;
  /**
   * 다이얼로그의 커스텀 너비
   * @example width={400} - 400px
   * @example width="500px" - 500px
   * @example width="80%" - 80%
   */
  width?: string | number;
  /**
   * 전체 화면 모드
   * @default false
   */
  fullScreen?: boolean;
  /**
   * 오버레이(배경)에 적용할 추가 className
   * @example overlayClassName="bg-black/50"
   */
  overlayClassName?: string;
}

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

export interface DialogScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 스크롤 영역의 최대 높이
   * @example maxHeight={300} - 300px
   * @example maxHeight="50vh" - 뷰포트 높이의 50%
   */
  maxHeight?: string | number;
}

export interface DialogTitleProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  /**
   * 타이틀 font-weight
   * @default 'semibold'
   */
  weight?: 'medium' | 'semibold' | 'bold';
}

export type DialogDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;

export interface DialogActionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 액션 콜백. Promise를 반환하면 완료될 때까지 대기 후 다이얼로그를 닫습니다.
   */
  onAction?: () => void | Promise<void>;
  /**
   * true일 경우 자식 요소를 버튼으로 렌더링 (Radix Slot 패턴)
   */
  asChild?: boolean;
}
