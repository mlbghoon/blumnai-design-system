import type { ButtonHTMLAttributes } from 'react';

import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';

/**
 * Chip 크기
 * - sm: 작은 크기
 * - md: 중간 크기 (기본값)
 * - lg: 큰 크기
 */
export type ChipSize = 'sm' | 'md' | 'lg';

/**
 * Chip 변형
 * - default: 아이콘과 텍스트를 함께 표시
 * - iconOnly: 아이콘만 표시
 */
export type ChipVariant = 'default' | 'iconOnly';

/**
 * Chip 스타일
 * - default: 흰색 배경에 테두리
 * - soft: 연한 회색 배경
 * - ghost: 투명 배경
 * - ghostMuted: 투명 배경, 더 연한 텍스트 색상
 */
export type ChipStyle = 'default' | 'soft' | 'ghost' | 'ghostMuted';

/**
 * Chip 모양
 * - rounded: 둥근 모서리
 * - pill: 완전히 둥근 모양
 */
export type ChipShape = 'rounded' | 'pill';

/**
 * Chip 색상
 */
export type ChipColor =
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'neutral';

/**
 * Chip 컴포넌트 Props
 */
export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'style' | 'onToggle'> {
  /**
   * Chip에 표시할 텍스트
   */
  label?: string;
  /**
   * 아이콘 타입 [카테고리, 이름] 또는 [카테고리, 이름, isFill] 형식
   * @example icon={['system', 'add']}
   * @example icon={['system', 'star', true]} - 채워진 아이콘
   */
  icon?: IconTypeWithFill;
  /**
   * Chip 변형
   * @default 'default'
   */
  variant?: ChipVariant;
  /**
   * Chip 스타일
   * @default 'default'
   */
  style?: ChipStyle;
  /**
   * Chip 모양
   * @default 'rounded'
   */
  shape?: ChipShape;
  /**
   * Chip 크기
   * @default 'md'
   */
  size?: ChipSize;
  /**
   * 선택된 상태 여부
   * @default false
   */
  selected?: boolean;
  /**
   * 칩 색상
   */
  color?: ChipColor;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 선택 상태가 토글될 때 호출되는 콜백.
   * `selected`의 반전된 값을 인자로 전달합니다.
   */
  onToggle?: (selected: boolean) => void;
}