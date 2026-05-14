import type { HTMLAttributes, ReactNode } from 'react';

import type { IconProp } from '../../icons/Icon';
import type { ButtonIconType } from '../../button/Button.types';

/**
 * Divider 타입
 * - default: 라인만 표시
 * - text-left, text-center, text-right: 텍스트 라벨과 라인
 * - icon-left, icon-center, icon-right: 아이콘과 라인
 * - button-left, button-center, button-right: 버튼과 라인
 */
export type DividerType =
  | 'default'
  | 'text-left'
  | 'text-center'
  | 'text-right'
  | 'icon-left'
  | 'icon-center'
  | 'icon-right'
  | 'button-left'
  | 'button-center'
  | 'button-right';

/**
 * Divider 스타일
 * - default: 실선
 * - dashed: 점선
 */
export type DividerStyle = 'default' | 'dashed';

/**
 * Divider 방향
 * - horizontal: 수평 구분선 (기본값)
 * - vertical: 수직 구분선
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider 여백 크기
 * - sm: 8px
 * - md: 12px
 * - lg: 16px (기본값)
 * - xl: 24px
 */
export type DividerSpacing = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Divider 컴포넌트 Props
 */
export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * 디바이더 타입
   * @default 'default'
   */
  type?: DividerType;
  /**
   * 디바이더 방향.
   * `vertical`일 때 구분선이 수직으로 표시됩니다.
   * 수직 모드에서는 부모 요소에 높이가 설정되어 있어야 합니다.
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;
  /**
   * 디바이더 스타일
   * @default 'default'
   */
  lineStyle?: DividerStyle;
  /**
   * 텍스트 라벨 (text-* 타입에서 사용)
   */
  label?: string;
  /**
   * 아이콘 컴포넌트 참조 (icon-* 타입에서 사용, v2.0+ — direct-import only)
   * @example icon={RiAddLine}
   * @example icon={RiAddFill} - 채워진 아이콘
   */
  icon?: IconProp;
  /**
   * 버튼 라벨 (button-* 타입에서 사용)
   */
  buttonLabel?: string;
  /**
   * 버튼 앞에 표시되는 아이콘 (button-* 타입에서 사용)
   * @example buttonLeadIcon={RiAddLine}
   */
  buttonLeadIcon?: ButtonIconType | ReactNode;
  /**
   * 버튼 뒤에 표시되는 아이콘 (button-* 타입에서 사용)
   * @example buttonTailIcon={RiArrowDownSLine}
   */
  buttonTailIcon?: ButtonIconType | ReactNode;
  /**
   * 버튼 내 뱃지/단축키 텍스트 (button-* 타입에서 사용)
   * @example buttonBadge="⌘K"
   */
  buttonBadge?: string;
  /**
   * 버튼 클릭 핸들러 (button-* 타입에서 사용)
   */
  onButtonClick?: () => void;
  /**
   * 구분선 주변 여백 크기
   * @default 'lg'
   */
  spacing?: DividerSpacing;
  /**
   * 여백을 px 단위로 직접 지정. 설정 시 spacing 값은 무시됩니다
   */
  spacingOverride?: number;
  /**
   * 커스텀 콘텐츠 (label, icon, button 대신 사용)
   */
  children?: ReactNode;
}
