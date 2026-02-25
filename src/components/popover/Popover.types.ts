import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import type * as PopoverPrimitive from '@radix-ui/react-popover';

export type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

export type PopoverTriggerProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
>;

export type PopoverAnchorProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Anchor
>;

export type PopoverPortalProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Portal
>;

export interface PopoverContentProps
  extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /**
   * 팝오버의 커스텀 너비
   * @example width={400} - 400px
   * @example width="500px" - 500px
   * @example width="80%" - 80%
   */
  width?: string | number;
  /**
   * Portal의 타겟 컨테이너 엘리먼트.
   * 지정하지 않으면 `document.body`에 포탈됩니다.
   */
  container?: HTMLElement | null;
}

export interface PopoverScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 스크롤 영역의 최대 높이
   * @example maxHeight={200} - 200px
   * @example maxHeight="30vh" - 뷰포트 높이의 30%
   */
  maxHeight?: string | number;
}

export type PopoverCloseProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Close
>;

export type PopoverArrowProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Arrow
>;
