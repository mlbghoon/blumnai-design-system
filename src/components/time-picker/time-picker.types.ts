import type { ReactNode } from 'react';
/**
 * 시간 포맷 타입
 */
export type TimeFormat = '12h' | '24h';

/**
 * 시간 세그먼트 타입
 */
export type TimeSegment = 'hour' | 'minute' | 'second';

/**
 * 시간 세그먼트 순서 타입
 */
export type TimeSegmentOrder = TimeSegment[];

/**
 * 시간 값 타입
 */
export interface TimeValue {
  /** 시간 (0-23) */
  hour: number;
  /** 분 (0-59) */
  minute: number;
  /** 초 (0-59, optional) */
  second?: number;
}

/**
 * 시간 범위 타입
 */
export interface TimeRange {
  /** 시작 시간 */
  start?: TimeValue;
  /** 종료 시간 */
  end?: TimeValue;
}

/**
 * 세그먼트별 플레이스홀더
 */
export interface TimeSegmentPlaceholder {
  hour?: string;
  minute?: string;
  second?: string;
}

/**
 * TimePicker 스타일 변형
 */
export type TimePickerStyle = 'default' | 'shadow' | 'soft';

/**
 * TimePicker 크기 변형
 */
export type TimePickerSize = 'sm' | 'lg';

/**
 * 빠른 선택 옵션
 */
export interface QuickSelectOption {
  label: string;
  value: TimeValue;
}

/**
 * 빠른 범위 선택 옵션
 */
export interface QuickRangeSelectOption {
  label: string;
  value: TimeRange;
}

/**
 * TimePickerPanel 컴포넌트 Props
 */
export interface TimePickerPanelProps {
  value?: TimeValue;
  onChange: (value: TimeValue) => void;
  timeFormat?: TimeFormat;
  showSeconds?: boolean;
  showQuickSelect?: boolean;
  quickSelectOptions?: QuickSelectOption[];
  onQuickSelect?: (option: QuickSelectOption) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * TimeInput 컴포넌트 Props
 */
export interface TimeInputProps {
  /**
   * 현재 시간 값
   */
  value?: TimeValue;
  /**
   * 시간 변경 시 호출되는 콜백
   */
  onChange?: (value: TimeValue | undefined) => void;
  /**
   * 시간 포맷
   * @default '24h'
   */
  timeFormat?: TimeFormat;
  /**
   * 초 표시 여부
   * @default false
   */
  showSeconds?: boolean;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 에러 상태
   * @default false
   */
  hasError?: boolean;
  /**
   * 성공 상태
   * @default false
   */
  hasSuccess?: boolean;
  /**
   * 팝업 열림 상태 (내부용)
   */
  isOpen?: boolean;
  /**
   * 크기
   * @default 'sm'
   */
  size?: TimePickerSize;
  /**
   * 스타일 변형
   * @default 'default'
   */
  timePickerStyle?: TimePickerStyle;
  /**
   * 세그먼트별 플레이스홀더
   */
  placeholder?: TimeSegmentPlaceholder;
  /**
   * 포커스 시 호출되는 콜백
   */
  onFocus?: () => void;
  /**
   * 블러 시 호출되는 콜백
   */
  onBlur?: () => void;
  /**
   * 시계 아이콘 클릭 시 호출되는 콜백
   */
  onClockClick?: () => void;
  /**
   * 시계 아이콘 숨기기
   * @default false
   */
  hideClockIcon?: boolean;
  /**
   * 추가 className
   */
  className?: string;
}

/**
 * TimePicker 컴포넌트 Props
 */
export interface TimePickerProps extends Omit<TimeInputProps, 'isOpen' | 'onClockClick' | 'hideClockIcon'> {
  /**
   * form 전송 시 사용할 name 속성 (설정 시 hidden input 렌더링)
   */
  name?: string;
  /**
   * 라벨 텍스트
   */
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  labelWidth?: string | number;
  /**
   * 필수 입력 여부
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
   * 컨테이너 너비 (숫자는 px, 문자열은 그대로 사용)
   */
  width?: string | number;
  /**
   * 빠른 선택 표시 여부
   * @default false
   */
  showQuickSelect?: boolean;
  /**
   * 빠른 선택 옵션 목록
   */
  quickSelectOptions?: QuickSelectOption[];
  /**
   * Popover 정렬
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
}

/**
 * TimeRangePicker 컴포넌트 Props
 */
export interface TimeRangePickerProps {
  /**
   * form 전송 시 사용할 name 속성 (설정 시 hidden input 렌더링)
   * start는 `{name}-start`, end는 `{name}-end`로 전송됩니다
   */
  name?: string;
  /**
   * 범위 유효성 검사 실패 시 호출되는 콜백 (start >= end일 때)
   */
  onValidationError?: (error: 'invalid-range' | null) => void;
  /**
   * 현재 시간 범위 값
   */
  value?: TimeRange;
  /**
   * 시간 범위 변경 시 호출되는 콜백
   */
  onChange?: (value: TimeRange | undefined) => void;
  /**
   * 시간 포맷
   * @default '24h'
   */
  timeFormat?: TimeFormat;
  /**
   * 초 표시 여부
   * @default false
   */
  showSeconds?: boolean;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 크기
   * @default 'sm'
   */
  size?: TimePickerSize;
  /**
   * 스타일 변형
   * @default 'default'
   */
  timePickerStyle?: TimePickerStyle;
  /**
   * 라벨 텍스트
   */
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  labelWidth?: string | number;
  /**
   * 필수 입력 여부
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
   * 컨테이너 너비 (숫자는 px, 문자열은 그대로 사용)
   */
  width?: string | number;
  /**
   * 빠른 선택 표시 여부
   * @default false
   */
  showQuickSelect?: boolean;
  /**
   * 빠른 범위 선택 옵션 목록
   */
  quickSelectOptions?: QuickRangeSelectOption[];
  /**
   * Popover 정렬
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * 시작/종료 플레이스홀더
   */
  placeholder?: TimeSegmentPlaceholder;
  /**
   * 포커스 시 호출되는 콜백
   */
  onFocus?: () => void;
  /**
   * 블러 시 호출되는 콜백
   */
  onBlur?: () => void;
  /**
   * 추가 className
   */
  className?: string;
}
