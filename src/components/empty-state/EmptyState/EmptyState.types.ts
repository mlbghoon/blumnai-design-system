import type { HTMLAttributes, ReactNode } from 'react';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';

/**
 * EmptyState 크기
 */
export type EmptyStateSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * EmptyState 레이아웃 변형
 */
export type EmptyStateVariant = 'default' | 'inline' | 'fill';

/**
 * EmptyState 컴포넌트 Props
 */
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  /**
   * 아이콘 (IconTypeWithFill 형식)
   */
  icon?: IconTypeWithFill;
  /**
   * 커스텀 일러스트레이션 (SVG, img, 애니메이션 등). icon 대신 렌더링됩니다
   */
  illustration?: ReactNode;
  /**
   * 제목
   */
  title: string;
  /**
   * 설명 텍스트
   */
  description?: string;
  /**
   * 액션 영역 (보통 Button)
   */
  action?: ReactNode;
  /**
   * 레이아웃 프리셋
   * @default 'default'
   */
  variant?: EmptyStateVariant;
  /**
   * 컴포넌트 크기
   * @default 'md'
   */
  size?: EmptyStateSize;
}
