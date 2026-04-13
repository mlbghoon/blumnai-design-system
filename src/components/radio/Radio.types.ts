import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

/**
 * Radio 크기
 */
export type RadioSize = 'sm' | 'md' | 'lg';

/**
 * Radio 스타일
 */
export type RadioStyle = 'default' | 'with-shadow';

/**
 * Radio 위치
 */
export type RadioPosition = 'left' | 'right' | 'off';

/**
 * RadioGroup Props
 */
export interface RadioGroupProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /**
   * 추가 클래스명
   */
  className?: string;
  /**
   * 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시
   */
  error?: boolean | string;
  /**
   * 성공 상태 - true면 성공 스타일 적용, 문자열이면 캡션으로 성공 메시지 표시
   */
  success?: boolean | string;
  /**
   * 라디오 그룹 아래에 표시되는 설명 텍스트
   */
  caption?: string;
  /**
   * 필수 입력 여부
   * @default false
   */
  required?: boolean;
}

/**
 * Radio Props
 */
export interface RadioProps
  extends Omit<ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'children'> {
  /**
   * Radio 크기
   * @default 'sm'
   */
  size?: RadioSize;
  /**
   * Radio value (RadioGroup 내에서 고유해야 함)
   */
  value: string;
  /**
   * Radio 라벨 텍스트 (Title)
   */
  label?: ReactNode;
  /**
   * 라벨 아래 설명 텍스트
   */
  description?: ReactNode;
  /**
   * 라디오 버튼 위치 (라벨 기준)
   * @default 'left'
   */
  radioPosition?: RadioPosition;
  /**
   * 스타일 변형
   * @default 'default'
   */
  radioStyle?: RadioStyle;
  /**
   * 라벨과 라디오 버튼의 수직 정렬
   * @default 'start'
   */
  align?: 'start' | 'center';
  /**
   * 라벨 텍스트의 font-weight
   * @default 'medium'
   */
  labelWeight?: 'normal' | 'medium';
}
