import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as SwitchPrimitive from '@radix-ui/react-switch';

/**
 * Switch 위치
 */
export type SwitchPosition = 'left' | 'right';

/**
 * Switch 색상
 */
export type SwitchColor =
  | 'green'
  | 'blue'
  | 'red'
  | 'orange'
  | 'violet'
  | 'cyan'
  | 'pink';

/**
 * Switch 크기
 */
export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * Switch Props
 */
export interface SwitchProps
  extends Omit<ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'children'> {
  /**
   * Switch 라벨 텍스트 (Title)
   */
  label?: ReactNode;
  /**
   * 라벨 아래 설명 텍스트
   */
  description?: ReactNode;
  /**
   * 스위치 위치 (라벨 기준)
   * @default 'left'
   */
  switchPosition?: SwitchPosition;
  /**
   * 활성화 시 스위치 색상
   * @default 'green'
   */
  color?: SwitchColor;
  /**
   * 스위치 크기
   * @default 'sm'
   */
  size?: SwitchSize;
  /**
   * 로딩 상태 — 스피너를 표시하고 인터랙션을 비활성화합니다
   * @default false
   */
  loading?: boolean;
}
