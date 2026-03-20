import type { ReactNode } from 'react';
/**
 * MonthRange 값 타입
 */
export interface MonthRange {
  from?: Date;
  to?: Date;
}

/**
 * MonthRangePreset 타입
 */
export interface MonthRangePreset {
  label: string;
  getValue: () => MonthRange;
}

/**
 * MonthRangePicker 컴포넌트 Props
 */
export interface MonthRangePickerProps {
  /**
   * 선택된 월 범위
   */
  value?: MonthRange;
  /**
   * 월 범위 변경 시 호출되는 콜백
   */
  onChange?: (range: MonthRange) => void;
  /**
   * 선택 가능한 최소 날짜
   */
  minDate?: Date;
  /**
   * 선택 가능한 최대 날짜
   */
  maxDate?: Date;
  /**
   * 미래 월 비활성화
   * @default false
   */
  disabledFuture?: boolean;
  /**
   * 로케일 문자열 (예: 'ko', 'en')
   * @default 'ko'
   */
  locale?: string;
  /**
   * 입력 필드 위에 표시되는 라벨 텍스트
   */
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  labelWidth?: string | number;
  /**
   * 에러 상태 - true면 에러 스타일 적용, 문자열이면 캡션으로 에러 메시지 표시
   */
  error?: boolean | string;
  /**
   * 입력 필드 아래에 표시되는 보조 텍스트
   */
  supportText?: string;
  /**
   * 외부 컨테이너에 적용할 추가 className
   */
  className?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 플레이스홀더 텍스트
   * @default 'YYYY.MM ~ YYYY.MM'
   */
  placeholder?: string;
  /**
   * 빠른 선택 프리셋 표시 여부
   * @default false
   */
  showQuickPresets?: boolean;
  /**
   * 빠른 선택 프리셋 목록
   */
  presets?: MonthRangePreset[];
}
