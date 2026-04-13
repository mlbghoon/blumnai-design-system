import type { ReactNode } from 'react';
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
}
