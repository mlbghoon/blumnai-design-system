import type { ReactElement, ReactNode } from 'react';
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
   * 컴포넌트 전체 너비
   */
  width?: string | number;
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
  /**
   * 입력 필드 크기
   * @default 'sm'
   */
  size?: 'sm' | 'lg';
  /**
   * true일 때 입력 비활성화, 클릭 시 캘린더만 열림
   * @default false
   */
  pickerOnly?: boolean;
  /**
   * true일 때 팝오버 하단에 적용/취소 버튼이 표시되며, `onChange`는 "적용" 클릭 시에만 발생합니다.
   * 취소, 외부 클릭, ESC 등으로 닫으면 드래프트가 폐기되고 `onChange`는 발생하지 않습니다.
   * 중간 선택(from만 고른 상태) 후 취소하면 선택 상태도 함께 초기화됩니다.
   * GraphQL refetch, reactive-var write 등 commit-on-apply 시맨틱이 필요한 경우 사용하세요.
   * @default false
   */
  showActions?: boolean;
  /**
   * 제어 모드 팝오버 오픈 상태. 전달 시 내부 상태 대신 이 값을 사용합니다.
   * 반드시 `onOpenChange`와 함께 사용하세요.
   */
  open?: boolean;
  /**
   * 팝오버 오픈 상태 변경 콜백. 모든 닫기 경로에서 호출됩니다.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 소비자가 제공하는 트리거 엘리먼트. 전달 시 DS는 자체 입력 필드를 렌더링하지 않고
   * 주어진 엘리먼트를 `PopoverAnchor`로 감싼 뒤 onClick + ref를 병합합니다.
   *
   * **주의:** `trigger` 제공 시 `InputWrapper`가 렌더링되지 않으므로
   * `label`, `supportText`, `error`, `width`, `className`, `pickerOnly` prop은 무시됩니다.
   */
  trigger?: ReactElement;
  /**
   * 캘린더 팝오버가 처음 열릴 때 포커스할 월. 선택된 `value.from`이 있으면 그것이 우선합니다.
   * @default 현재 월
   */
  defaultMonth?: Date;
  /**
   * 완성된 범위(`from`+`to` 모두 선택됨) 상태에서 사용자가 새 월을 클릭했을 때
   * 그 월을 새 시작월(`from`)로 삼고 `to` 를 비워서 새 범위를 시작합니다.
   *
   * `false` 면 가장 가까운 끝점을 확장하는 동작을 따릅니다 — 시작월보다 뒤의 월을
   * 한 번 클릭하면 끝월(`to`)이 그 월로 이동하고, 시작월을 옮기려면 별도 단계가 필요합니다.
   *
   * `DateRangePicker.resetOnSelect` 와 동일한 의도. React Aria / Mantine 패턴.
   * @default true
   */
  resetOnSelect?: boolean;
}
