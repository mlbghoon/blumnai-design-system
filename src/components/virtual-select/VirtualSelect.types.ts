import type { ReactNode } from 'react';

import type {
  SelectOption,
  SelectStyle,
  SelectSize,
  SelectType,
} from '../select/Select.types';
import type { IconTypeWithFill } from '../icons/Icon/Icon.types';

export type VirtualSelectVariant = 'single' | 'multi';

export interface VirtualSelectBaseProps {
  selectStyle?: SelectStyle;
  size?: SelectSize;
  label?: string;
  required?: boolean;
  supportText?: string;
  caption?: string;
  error?: boolean | string;
  success?: boolean | string;
  width?: string | number;
  minWidth?: string | number;
  disabled?: boolean;
  placeholder?: string;
  leadIcon?: IconTypeWithFill;
  options: SelectOption[];
  searchable?: boolean;
  searchPlaceholder?: string;
  noResultsText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  maxHeight?: number | string;
  className?: string;
  clearable?: boolean;
  loading?: boolean;
  renderOption?: (option: SelectOption, isSelected: boolean) => ReactNode;
  itemHeight?: number;
  overscan?: number;
}

export interface SingleVirtualSelectProps extends VirtualSelectBaseProps {
  variant?: 'single';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  selectType?: SelectType;
}

export interface MultiVirtualSelectProps extends VirtualSelectBaseProps {
  variant: 'multi';
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  maxSelections?: number;
  selectedText?: string | ((count: number) => string);
  showSelectAll?: boolean;
  selectAllLabel?: string;
}

export type VirtualSelectProps =
  | SingleVirtualSelectProps
  | MultiVirtualSelectProps;
