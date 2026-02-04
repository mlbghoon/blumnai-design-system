import type { Locale } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import type { CaptionLayout } from './Calendar.types';

/**
 * 날짜 선택기 스타일 변형
 */
export type DatePickerStyle = 'default' | 'shadow' | 'soft';

/**
 * 날짜 선택기 크기 변형
 */
export type DatePickerSize = 'sm' | 'lg';

/**
 * 날짜 포맷 타입
 */
export type DateFormat = 'yyyy.MM.dd' | 'yyyy-MM-dd' | 'yyyy/MM/dd' | 'MM/dd/yyyy' | 'dd/MM/yyyy';

/**
 * 빠른 프리셋 정의
 */
export interface QuickPreset {
  label: string;
  getValue: () => Date | DateRange;
}

/**
 * 모든 DatePicker 변형에서 공유되는 기본 Props
 */
export interface DatePickerBaseProps {
  /**
   * 날짜 선택기 스타일 변형
   * @default 'default'
   */
  datePickerStyle?: DatePickerStyle;
  /**
   * 날짜 선택기 크기
   * @default 'sm'
   */
  size?: DatePickerSize;
  /**
   * 입력 필드 위에 표시되는 라벨 텍스트
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
   * 입력 필드 아래에 표시되는 설명 텍스트
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
   * 입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)
   * 미지정 시 전체 너비 사용
   */
  width?: string | number;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 외부 컨테이너에 적용할 추가 className
   */
  className?: string;
  /**
   * 선택 가능한 최소 날짜
   */
  minDate?: Date;
  /**
   * 선택 가능한 최대 날짜
   */
  maxDate?: Date;
  /**
   * 선택 불가능한 날짜 목록
   */
  disabledDates?: Date[];
  /**
   * 로케일 (date-fns Locale)
   */
  locale?: Locale;
  /**
   * 날짜 포맷
   * @default 'yyyy.MM.dd'
   */
  dateFormat?: DateFormat;
  /**
   * 빠른 프리셋 표시 여부
   * @default false
   */
  showQuickPresets?: boolean;
  /**
   * Popover 정렬
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * 캘린더 캡션 레이아웃
   * @default 'month-centered'
   */
  captionLayout?: CaptionLayout;
}

/**
 * DatePicker 컴포넌트 Props
 */
export interface DatePickerProps extends DatePickerBaseProps {
  /**
   * 선택된 날짜
   */
  value?: Date;
  /**
   * 날짜 변경 시 호출되는 콜백
   */
  onChange?: (date: Date | undefined) => void;
  /**
   * 커스텀 빠른 프리셋 목록
   */
  presets?: QuickPreset[];
}

/**
 * DateRangePicker 컴포넌트 Props
 */
export interface DateRangePickerProps extends DatePickerBaseProps {
  /**
   * 선택된 날짜 범위
   */
  value?: DateRange;
  /**
   * 날짜 범위 변경 시 호출되는 콜백
   */
  onChange?: (range: DateRange | undefined) => void;
  /**
   * 커스텀 빠른 프리셋 목록
   */
  presets?: QuickPreset[];
  /**
   * 표시할 월 개수
   * @default 2
   */
  numberOfMonths?: number;
}

/**
 * DatePicker 내부 입력 컴포넌트 Props
 */
export interface DatePickerInputProps {
  datePickerStyle?: DatePickerStyle;
  size?: DatePickerSize;
  displayValue: string;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  hasSuccess?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

/**
 * 날짜 세그먼트 타입
 */
export type DateSegment = 'day' | 'month' | 'year';

/**
 * 날짜 세그먼트 순서 타입
 */
export type DateSegmentOrder = [DateSegment, DateSegment, DateSegment];

/**
 * 세그먼트별 플레이스홀더
 */
export interface DateSegmentPlaceholder {
  day?: string;
  month?: string;
  year?: string;
}

/**
 * DateInput 컴포넌트 Props
 */
export interface DateInputProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: DateSegmentPlaceholder;
  disabled?: boolean;
  hasError?: boolean;
  hasSuccess?: boolean;
  isOpen?: boolean;
  datePickerStyle?: DatePickerStyle;
  size?: DatePickerSize;
  dateFormat?: DateFormat;
  onFocus?: () => void;
  onBlur?: () => void;
  onCalendarClick?: () => void;
  className?: string;
}

/**
 * DateRangeInput 컴포넌트 Props
 */
export interface DateRangeInputProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: DateSegmentPlaceholder;
  disabled?: boolean;
  hasError?: boolean;
  hasSuccess?: boolean;
  isOpen?: boolean;
  datePickerStyle?: DatePickerStyle;
  size?: DatePickerSize;
  dateFormat?: DateFormat;
  onFocus?: () => void;
  onBlur?: () => void;
  onCalendarClick?: () => void;
  className?: string;
}

export type { DateRange };
