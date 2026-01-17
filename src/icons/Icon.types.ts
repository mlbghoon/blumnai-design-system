import type { CSSProperties, SVGProps } from 'react';

import { color } from '../tokens';

export type IconCursor = 'default' | 'pointer' | 'not-allowed' | 'wait' | 'text' | 'move' | 'grab' | 'grabbing';

/**
 * TypeScript 자동완성 및 디자인 시스템 일관성을 위한 공통 아이콘 색상 토큰.
 * 
 * 이 타입은 아이콘에 가장 많이 사용되는 색상 토큰을 포함합니다.
 * 최대한의 유연성을 위해 유효한 CSS 색상 문자열(hex, rgb, named colors 등)도 사용할 수 있습니다.
 * 
 * @example
 * // 권장: 디자인 토큰 사용
 * <Icon color={color.text.muted} />
 * <Icon color={color.bg.state.primary} />
 * 
 * // 지원됨: 유효한 CSS 색상
 * <Icon color="#6F6F77" />
 * <Icon color="currentColor" />
 */
export type IconColorToken =
  // Text colors (most common for icons)
  | typeof color.text.default
  | typeof color.text.subtle
  | typeof color.text.muted
  | typeof color.text.hint
  | typeof color.text.inverted.default
  | typeof color.text.inverted.subtle
  | typeof color.text.inverted.muted
  | typeof color.text.white.default
  | typeof color.text.dark.default
  // Semantic text colors
  | typeof color.text.destructive
  | typeof color.text.success
  | typeof color.text.warning
  | typeof color.text.informative
  // State colors
  | typeof color.bg.state.primary
  | typeof color.bg.state['primary-hover']
  | typeof color.bg.state.destructive
  | typeof color.bg.state['destructive-hover']
  // Palette colors (common shades)
  | typeof color.palette.zinc[500]
  | typeof color.palette.zinc[600]
  | typeof color.palette.zinc[700]
  | typeof color.palette.blue[500]
  | typeof color.palette.blue[600]
  | typeof color.palette.red[500]
  | typeof color.palette.red[600]
  | typeof color.palette.green[500]
  | typeof color.palette.green[600]
  | typeof color.palette.orange[500]
  | typeof color.palette.orange[600];

export interface Props extends Omit<SVGProps<SVGSVGElement>, 'children' | 'style'> {
  /** 스크린 리더를 위한 접근성 레이블. 생략하면 아이콘은 aria-hidden으로 설정됩니다. */
  title?: string;
  /** 아이콘 크기(px). `width`/`height`에 적용됩니다(덮어쓰지 않는 한). */
  size?: number;
  /** 
   * 아이콘 색상 (`fill` 또는 `color` CSS 속성에 적용).
   * 
   * @example
   * // 권장: 일관성을 위해 디자인 토큰 사용
   * <Icon color={color.text.muted} />
   * <Icon color={color.bg.state.primary} />
   * 
   * // 지원됨: 유효한 CSS 색상 값
   * <Icon color="#6F6F77" />
   * <Icon color="rgb(111, 111, 119)" />
   * <Icon color="currentColor" />
   */
  color?: string | IconColorToken;
  /** 아이콘의 커서 스타일 */
  cursor?: IconCursor;
  /** 
   * 키보드 포커스 가능 여부.
   * 기본값은 false입니다. true로 설정하면 탭으로 포커스할 수 있습니다.
   * 
   * @example
   * <Icon focusable={true} title="Clickable icon" onClick={handleClick} />
   */
  focusable?: boolean;
  /** 추가 CSS 클래스 이름 */
  className?: string;
  /** 추가 인라인 스타일 */
  style?: CSSProperties;
}

