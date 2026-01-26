import type { SVGProps } from 'react';

/** 사용 가능한 커서 아이콘 타입 */
export type CursorType =
  | 'arrow'
  | 'hand-closed'
  | 'hand-open'
  | 'not-allowed'
  | 'pointer'
  | 'text';

export interface CursorIconProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'cursor' | 'focusable'> {
  /** 표시할 커서 타입 */
  cursorType: CursorType;
  /** 아이콘 크기 (픽셀) @default 24 */
  size?: number;
  /** 추가 CSS 클래스명 */
  className?: string;
}
