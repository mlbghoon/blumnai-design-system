import type { ComponentPropsWithoutRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

/**
 * 슬라이더 크기
 */
export type SliderSize = 'sm' | 'md' | 'lg';

/**
 * 슬라이더 색상
 */
export type SliderColor = 'primary' | 'secondary' | 'success' | 'destructive';

/**
 * Slider 컴포넌트 Props
 */
export interface SliderProps
  extends Omit<ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'onChange'> {
  /**
   * 슬라이더 크기
   * @default 'md'
   */
  size?: SliderSize;
  /**
   * 슬라이더 색상
   * @default 'primary'
   */
  color?: SliderColor;
  /**
   * 현재 값 표시 여부
   * @default false
   */
  showValue?: boolean;
  /**
   * 값 포맷 함수
   */
  formatValue?: (value: number) => string;
  /**
   * 눈금 표시 여부
   * @default false
   */
  showTicks?: boolean;
  /**
   * 눈금 개수 (showTicks가 true일 때)
   * @default 5
   */
  tickCount?: number;
  /**
   * 라벨
   */
  label?: string;
  /**
   * 값 변경 콜백
   */
  onChange?: (value: number[]) => void;
}
