import type { HTMLAttributes, ReactNode } from 'react';
import type { IconTypeWithFill } from '../../icons/Icon/Icon.types';

/**
 * EmptyState 크기
 */
export type EmptyStateSize = 'sm' | 'md';

/**
 * EmptyState 컴포넌트 Props
 */
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  /**
   * 아이콘 (IconTypeWithFill 형식)
   */
  icon?: IconTypeWithFill;
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
   * 컴포넌트 크기
   * @default 'md'
   */
  size?: EmptyStateSize;
}
