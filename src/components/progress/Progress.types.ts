import type { HTMLAttributes } from 'react';

/**
 * 진행 바 색상
 */
export type ProgressColor =
  | 'gray'
  | 'brand'
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
  | 'rose';

/**
 * 선형 진행 바 변형
 */
export type ProgressVariant = 'linear' | 'dashed';

/**
 * 원형 진행 바 변형
 */
export type ProgressCircularVariant = 'default' | 'success' | 'failed';

/**
 * 원형 진행 바 모양
 */
export type ProgressCircularShape = 'full' | 'half';

/**
 * Progress (선형 진행 바) Props
 */
export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /**
   * 현재 진행률 (0-100)
   * undefined면 불확정 상태 (indeterminate)
   */
  value?: number;
  /**
   * 최대값
   * @default 100
   */
  max?: number;
  /**
   * 진행 바 변형
   * @default 'linear'
   */
  variant?: ProgressVariant;
  /**
   * 진행 바 색상
   * @default 'gray'
   */
  color?: ProgressColor;
  /**
   * 라벨 텍스트
   */
  label?: string;
  /**
   * 진행률 표시 여부
   * @default false
   */
  showValue?: boolean;
  /**
   * 값 포맷 함수
   * @default (v) => `${v}%`
   */
  formatValue?: (value: number) => string;
  /**
   * 캡션 텍스트 (진행 바 아래)
   */
  caption?: string;
  /**
   * 에러 상태 또는 메시지
   */
  error?: boolean | string;
  /**
   * 성공 상태 또는 메시지
   */
  success?: boolean | string;
}

/**
 * ProgressCircular (원형 진행 바) Props
 */
export interface ProgressCircularProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /**
   * 현재 진행률 (0-100)
   */
  value?: number;
  /**
   * 최대값
   * @default 100
   */
  max?: number;
  /**
   * 원형 진행 바 변형 (색상 상태)
   * @default 'default'
   */
  variant?: ProgressCircularVariant;
  /**
   * 원형 진행 바 색상 (variant가 'default'일 때만 적용)
   * @default 'gray'
   */
  color?: ProgressColor;
  /**
   * 진행 바 모양
   * @default 'full'
   */
  shape?: ProgressCircularShape;
  /**
   * 중앙 라벨 표시 여부
   * @default true
   */
  showLabel?: boolean;
  /**
   * 값 포맷 함수
   * @default (v) => `${v}%`
   */
  formatValue?: (value: number) => string;
  /**
   * 진행 바 크기 (px)
   * @default 96
   */
  size?: number;
  /**
   * 트랙 두께 (px)
   * @default 8
   */
  strokeWidth?: number;
  /**
   * 캡션 텍스트 (진행 바 아래)
   */
  caption?: string;
  /**
   * 에러 상태 또는 메시지
   */
  error?: boolean | string;
  /**
   * 성공 상태 또는 메시지
   */
  success?: boolean | string;
}
