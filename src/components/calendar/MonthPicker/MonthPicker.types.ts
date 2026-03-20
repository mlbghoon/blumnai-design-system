import type { ReactNode } from 'react';
export interface MonthPickerPreset {
  label: string;
  getValue: () => Date;
}

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
  disabled?: boolean;
  placeholder?: string;
  showQuickPresets?: boolean;
  presets?: MonthPickerPreset[];
}
