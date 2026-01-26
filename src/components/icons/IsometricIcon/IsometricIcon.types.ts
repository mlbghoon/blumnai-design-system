import type { SVGProps } from 'react';

import type { IsometricFillColor, IsometricStrokeColor } from './icons/isometric.types';
import type { IsometricIconType } from './isometric-icon-data';

export type { IsometricFillColor, IsometricStrokeColor, IsometricIconType };

/** 아이소메트릭 아이콘 뷰 시점 */
export type IsometricView = 'top' | 'left';

export interface IsometricIconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** 아이콘 타입 */
  iconType: IsometricIconType;
  /** 뷰 시점 @default 'top' */
  view?: IsometricView;
  /** 아이콘 크기 (픽셀) @default 24 */
  size?: number;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 채우기 색상 토큰 (--bg-{token}으로 매핑) @default 'default' */
  fillColor?: IsometricFillColor;
  /** 선 색상 토큰 (--border-{token}으로 매핑) @default 'accent' */
  strokeColor?: IsometricStrokeColor;
}
