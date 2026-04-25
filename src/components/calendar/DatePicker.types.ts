import type { ReactElement, ReactNode } from 'react';
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
 * 트리거 변형
 * - 'default': 세그먼트 입력 (직접 편집 가능)
 * - 'compact': 텍스트 표시 (좁은 컨테이너용, 말줄임 지원)
 */
export type DatePickerTriggerVariant = 'default' | 'compact';

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
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  /**
   * 라벨 너비 (labelPosition='left'일 때 사용, 여러 필드 정렬용)
   * 숫자는 px, 문자열은 그대로 사용
   */
  labelWidth?: string | number;
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
   * 캘린더 팝오버가 처음 열릴 때 포커스할 월. 선택된 `value`가 있으면 `value`가 우선합니다.
   * 과거 데이터 조회용 필터(`maxDate={new Date()}`)에서 `defaultMonth={startOfMonth(subMonths(new Date(), 1))}`를 전달하면 이전달/이번달 2패널을 표시해 panel 낭비를 피할 수 있습니다.
   * @default 현재 월
   */
  defaultMonth?: Date;
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
  /**
   * 확인/취소 버튼 표시 여부
   * @default false
   */
  showActions?: boolean;
  /**
   * 확인 버튼 라벨
   * @default '확인'
   */
  confirmLabel?: string;
  /**
   * 취소 버튼 라벨
   * @default '취소'
   */
  cancelLabel?: string;
  /**
   * 트리거 변형
   * - 'default': 세그먼트 입력 (직접 편집 가능)
   * - 'compact': 텍스트 표시 (좁은 컨테이너용, 말줄임 지원)
   * @default 'default'
   */
  triggerVariant?: DatePickerTriggerVariant;
  /**
   * true일 때 입력 비활성화, 클릭 시 캘린더만 열림
   * @default false
   */
  pickerOnly?: boolean;
  /**
   * 제어 모드 팝오버 오픈 상태. 전달 시 내부 상태 대신 이 값을 사용합니다.
   * 반드시 `onOpenChange`와 함께 사용하세요 (단독 사용 시 dev console.warn 발생, 팝오버가 닫히지 않음).
   */
  open?: boolean;
  /**
   * 팝오버 오픈 상태 변경 콜백. 다음 모든 경로에서 호출됩니다:
   * - 트리거 클릭 (열기)
   * - Apply / Cancel 버튼 (`showActions=true`일 때)
   * - 외부 클릭 / ESC / 자동 닫기 (단일 선택 후)
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 소비자가 제공하는 트리거 엘리먼트. 전달 시 DS는 자체 입력 필드를 렌더링하지 않고
   * 주어진 엘리먼트를 `PopoverAnchor`로 감싼 뒤 onClick + ref를 병합합니다.
   *
   * **주의:** `trigger` 제공 시 `InputWrapper`가 렌더링되지 않으므로
   * `label`, `labelPosition`, `supportText`, `caption`, `error`, `success`, `width`, `className`,
   * `pickerOnly` prop은 무시됩니다. 라벨/레이아웃은 소비자가 직접 구성하세요.
   *
   * @example
   * <DateRangePicker
   *   open={isOpen}
   *   onOpenChange={setIsOpen}
   *   trigger={<Button>{range.from} ~ {range.to}</Button>}
   *   value={range}
   *   onChange={setRange}
   * />
   */
  trigger?: ReactElement;
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
  /**
   * 완성된 범위(`from`+`to` 모두 선택됨) 상태에서 사용자가 새 날짜를 클릭했을 때
   * 그 날짜를 새 시작일(`from`)로 삼고 `to` 를 비워서 새 범위를 시작합니다.
   *
   * `false` 면 react-day-picker 의 기본 동작(가까운 끝점 확장 / 같은 날 클릭 시 collapse)
   * 을 따릅니다 — 시작일을 앞으로 옮기려면 같은 날을 두 번 클릭해야 하는 RDP 기본 UX.
   *
   * React Aria / Mantine 등이 채택한 "3번째 클릭 = 새 범위 시작" UX 패턴.
   * @default true
   */
  resetOnSelect?: boolean;
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
  pickerOnly?: boolean;
  datePickerStyle?: DatePickerStyle;
  size?: DatePickerSize;
  dateFormat?: DateFormat;
  /** 타이핑된 날짜가 이 값보다 이전이면 경계 밖으로 판정 (error state, onChange 호출 안 함) */
  minDate?: Date;
  /** 타이핑된 날짜가 이 값보다 이후면 경계 밖으로 판정 (error state, onChange 호출 안 함) */
  maxDate?: Date;
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
  pickerOnly?: boolean;
  datePickerStyle?: DatePickerStyle;
  size?: DatePickerSize;
  dateFormat?: DateFormat;
  /** 타이핑된 날짜(from/to 각각)가 이 값보다 이전이면 경계 밖으로 판정 */
  minDate?: Date;
  /** 타이핑된 날짜(from/to 각각)가 이 값보다 이후면 경계 밖으로 판정 */
  maxDate?: Date;
  onFocus?: () => void;
  onBlur?: () => void;
  onCalendarClick?: () => void;
  className?: string;
}

export type { DateRange };
