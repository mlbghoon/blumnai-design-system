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
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  labelWidth?: string | number;
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
  /** 스크롤이 목록 하단에 도달했을 때 호출되는 콜백 (무한 스크롤) */
  onLoadMore?: () => void;
  /** onLoadMore 발동 임계값 (하단에서 몇 개 항목 남았을 때, default: 5) */
  loadMoreThreshold?: number;
  /** 검색어 변경 콜백 (서버사이드 검색용, 설정 시 클라이언트 필터링 비활성화) */
  onSearchChange?: (query: string) => void;
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
