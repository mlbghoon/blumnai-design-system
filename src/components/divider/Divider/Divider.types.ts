import type { HTMLAttributes, ReactNode } from 'react';

import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';
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
 * Divider 컴포넌트 Props
 */
export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * 디바이더 타입
   * @default 'default'
   */
  type?: DividerType;
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
   * 아이콘 타입 (icon-* 타입에서 사용)
   * @example icon={['system', 'add']}
   * @example icon={['system', 'add', true]} - 채워진 아이콘
   */
  icon?: IconTypeWithFill;
  /**
   * 버튼 라벨 (button-* 타입에서 사용)
   */
  buttonLabel?: string;
  /**
   * 버튼 앞에 표시되는 아이콘 (button-* 타입에서 사용)
   * @example buttonLeadIcon={['system', 'add']}
   */
  buttonLeadIcon?: ButtonIconType | ReactNode;
  /**
   * 버튼 뒤에 표시되는 아이콘 (button-* 타입에서 사용)
   * @example buttonTailIcon={['arrows', 'chevron-down']}
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
   * 커스텀 콘텐츠 (label, icon, button 대신 사용)
   */
  children?: ReactNode;
}
