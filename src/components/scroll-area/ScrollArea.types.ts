import type { ReactNode, Ref } from 'react';
import type {
  ScrollAreaProps as RadixScrollAreaProps,
  ScrollAreaScrollbarProps as RadixScrollAreaScrollbarProps,
} from '@radix-ui/react-scroll-area';

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps extends RadixScrollAreaProps {
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
   * 스크롤 위치가 변경될 때 호출되는 콜백 (rAF로 쓰로틀링됨).
   * @example onScrollPositionChange={({ x, y }) => console.log(x, y)}
   */
  onScrollPositionChange?: (position: { x: number; y: number }) => void;
  /**
   * 스크롤바 표시 방식 (Radix ScrollArea.Root `type` prop).
   * - `"hover"` — 포인터 호버 시 표시
   * - `"scroll"` — 스크롤 중 표시
   * - `"auto"` — 콘텐츠 오버플로 시 표시
   * - `"always"` — 항상 표시
   * @default 'hover'
   */
  type?: 'hover' | 'scroll' | 'auto' | 'always';
  /**
   * 스크롤바 트랙 두께 (px 단위)
   */
  scrollbarSize?: number;
  /**
   * 스크롤바 영역만큼 콘텐츠를 안쪽으로 들여쓰기.
   * 스크롤바가 콘텐츠 위에 겹치는 것을 방지합니다.
   */
  offsetScrollbars?: boolean;
  /**
   * 텍스트 방향. `"rtl"` 설정 시 수평 스크롤이 오른쪽에서 왼쪽으로 동작합니다.
   */
  dir?: 'ltr' | 'rtl';
  /**
   * 뷰포트 내부 래퍼에 `height: 100%`를 적용하여
   * 자식 요소가 `min-height: 100%`로 뷰포트를 채울 수 있게 합니다.
   */
  fillViewport?: boolean;
  /**
   * 스크롤 영역 내용
   */
  children?: ReactNode;
}

export interface ScrollBarProps
  extends RadixScrollAreaScrollbarProps {
  /**
   * 스크롤바 방향
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
}
