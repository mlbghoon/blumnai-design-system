import type { TextareaHTMLAttributes, ReactNode } from 'react';

import type { IconTypeWithFill } from '../icons/Icon/Icon.types';

/**
 * 텍스트 영역 스타일 변형
 */
export type TextareaStyle = 'default' | 'shadow' | 'soft';

/**
 * 텍스트 영역 크기 변형
 */
export type TextareaSize = 'sm' | 'lg';

/**
 * 리사이즈 옵션
 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * 툴바 액션 아이템
 */
export interface TextareaToolbarAction {
  /**
   * 아이콘
   */
  icon?: IconTypeWithFill;
  /**
   * 라벨 텍스트 (없으면 아이콘만 표시)
   */
  label?: string;
  /**
   * 클릭 핸들러
   */
  onClick?: () => void;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 고유 키
   */
  key: string;
}

/**
 * Textarea 컴포넌트 Props
 */
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  /**
   * 텍스트 영역 스타일 변형
   * @default 'default'
   */
  textareaStyle?: TextareaStyle;
  /**
   * 텍스트 영역 크기
   * @default 'sm'
   */
  size?: TextareaSize;
  /**
   * 텍스트 영역 위에 표시되는 라벨 텍스트
   */
  label?: string;
  /**
   * 필수 입력 여부 (별표 표시)
   * @default false
   */
  required?: boolean;
  /**
   * 라벨 옆에 표시되는 보조 텍스트
   */
  supportText?: string;
  /**
   * 텍스트 영역 아래에 표시되는 설명 텍스트
   */
  caption?: string;
  /**
   * 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시
   */
  error?: boolean | string;
  /**
   * 성공 상태 - true면 성공 스타일 적용, 문자열이면 캡션으로 성공 메시지 표시
   */
  success?: boolean | string;
  /**
   * 텍스트 영역 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 전체 너비 사용
   */
  width?: string | number;
  /**
   * 최소 행 수
   * @default 3
   */
  minRows?: number;
  /**
   * 최대 행 수
   */
  maxRows?: number;
  /**
   * 글자 수 표시 여부
   * @default false
   */
  showCount?: boolean;
  /**
   * 리사이즈 가능 여부
   * @default 'vertical'
   */
  resize?: TextareaResize;
  /**
   * 툴바 표시 여부
   * @default false
   */
  showToolbar?: boolean;
  /**
   * 툴바 왼쪽 액션 아이템 목록
   */
  toolbarActions?: TextareaToolbarAction[];
  /**
   * 첨부 버튼 클릭 핸들러 (제공시 첨부 버튼 표시)
   */
  onAttach?: () => void;
  /**
   * 제출 버튼 클릭 핸들러 (제공시 제출 버튼 표시)
   */
  onSubmit?: () => void;
  /**
   * 제출 버튼 비활성화 여부
   */
  submitDisabled?: boolean;
  /**
   * 음성 입력 버튼 클릭 핸들러 (제공시 마이크 버튼 표시)
   */
  onVoiceInput?: () => void;
  /**
   * 툴바 오른쪽 영역에 표시할 커스텀 컨텐츠
   */
  toolbarTrailing?: ReactNode;
}
