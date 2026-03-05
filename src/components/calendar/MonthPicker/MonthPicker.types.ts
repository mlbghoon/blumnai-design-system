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
  label?: string;
  error?: boolean | string;
  supportText?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  showQuickPresets?: boolean;
  presets?: MonthPickerPreset[];
}
