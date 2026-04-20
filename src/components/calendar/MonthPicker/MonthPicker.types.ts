import type { ReactElement, ReactNode } from 'react';
export interface MonthPickerPreset {
  label: string;
  getValue: () => Date;
}

export type MonthPickerSize = 'sm' | 'lg';

export interface MonthPickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledFuture?: boolean;
  locale?: string;
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  labelWidth?: string | number;
  error?: boolean | string;
  supportText?: string;
  className?: string;
  /**
   * 컴포넌트 전체 너비
   */
  width?: string | number;
  disabled?: boolean;
  placeholder?: string;
  showQuickPresets?: boolean;
  presets?: MonthPickerPreset[];
  /**
   * 입력 필드 크기
   * @default 'sm'
   */
  size?: MonthPickerSize;
  /**
   * true일 때 입력 비활성화, 클릭 시 캘린더만 열림
   * @default false
   */
  pickerOnly?: boolean;
  /**
   * true일 때 팝오버 하단에 적용/취소 버튼이 표시되며, `onChange`는 "적용" 클릭 시에만 발생합니다.
   * 취소, 외부 클릭, ESC 등으로 닫으면 드래프트가 폐기되고 `onChange`는 발생하지 않습니다.
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
   * 팝오버 오픈 상태 변경 콜백. 모든 닫기 경로(트리거 클릭, Apply/Cancel, 외부 클릭, ESC, 자동 닫기)에서 호출됩니다.
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
   * 캘린더 팝오버가 처음 열릴 때 포커스할 월. 선택된 `value`가 있으면 `value`가 우선합니다.
   * @default 현재 월
   */
  defaultMonth?: Date;
}
