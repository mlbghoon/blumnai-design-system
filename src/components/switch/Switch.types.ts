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
  /**
   * 활성화 시 트랙 내 표시 텍스트
   */
  onLabel?: ReactNode;
  /**
   * 비활성화 시 트랙 내 표시 텍스트
   */
  offLabel?: ReactNode;
  /**
   * 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시
   */
  error?: boolean | string;
  /**
   * 성공 상태 - true면 성공 스타일 적용, 문자열이면 캡션으로 성공 메시지 표시
   */
  success?: boolean | string;
  /**
   * 입력 필드 아래에 표시되는 설명 텍스트
   */
  caption?: string;
  /**
   * 필수 입력 여부 (별표 표시)
   * @default false
   */
  required?: boolean;
}
