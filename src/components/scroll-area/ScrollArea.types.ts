import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import type * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /**
   * 스크롤 방향
   * @default 'vertical'
   */
  orientation?: ScrollAreaOrientation;
  /**
   * 스크롤 영역의 최대 높이
   * @example maxHeight={300} - 300px
   * @example maxHeight="50vh" - 뷰포트 높이의 50%
   */
  maxHeight?: string | number;
  /**
   * 스크롤 영역의 최대 너비
   * @example maxWidth={400} - 400px
   * @example maxWidth="80%" - 80%
   */
  maxWidth?: string | number;
  /**
   * 스크롤 가능한 뷰포트 요소에 대한 ref (programmatic scroll 제어용)
   * @example const viewportRef = useRef<HTMLDivElement>(null);
   * viewportRef.current?.scrollTo({ top: 0 });
   */
  viewportRef?: Ref<HTMLDivElement>;
  /**
   * 스크롤 영역 내용
   */
  children?: ReactNode;
}

export interface ScrollBarProps
  extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  /**
   * 스크롤바 방향
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
}
