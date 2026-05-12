import type { HTMLAttributes } from 'react';
import type {
  PopoverProps as RadixPopoverProps,
  PopoverTriggerProps as RadixPopoverTriggerProps,
  PopoverAnchorProps as RadixPopoverAnchorProps,
  PopoverPortalProps as RadixPopoverPortalProps,
  PopoverContentProps as RadixPopoverContentProps,
  PopoverCloseProps as RadixPopoverCloseProps,
  PopoverArrowProps as RadixPopoverArrowProps,
} from '@radix-ui/react-popover';

export type PopoverProps = RadixPopoverProps;

export type PopoverTriggerProps = RadixPopoverTriggerProps;

export type PopoverAnchorProps = RadixPopoverAnchorProps;

export type PopoverPortalProps = RadixPopoverPortalProps;

/** 애니메이션 프리셋 */
export type PopoverAnimation = 'default' | 'fade' | 'scale' | 'slide' | 'none';

export interface PopoverContentProps
  extends RadixPopoverContentProps {
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
  /**
   * 애니메이션 프리셋
   * @default 'default'
   */
  animation?: PopoverAnimation;
  /**
   * 애니메이션 지속 시간 (ms). 미지정 시 tw-animate-css 기본 150ms
   */
  animationDuration?: number;
}

export interface PopoverScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 스크롤 영역의 최대 높이
   * @example maxHeight={200} - 200px
   * @example maxHeight="30vh" - 뷰포트 높이의 30%
   */
  maxHeight?: string | number;
}

export type PopoverCloseProps = RadixPopoverCloseProps;

export type PopoverArrowProps = RadixPopoverArrowProps;
