import { useState, useCallback, useMemo, useId } from 'react';

import type { SelectOption, SelectSize, SelectStyle } from '../Select.types';
import { SIZE_CONFIG, STYLE_CONFIG, STATE_CONFIG } from 'constants/select/Select/Select.constants';

export interface UseSelectOptions {
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  maxSelections?: number;
  searchable?: boolean;
  filterItems?: boolean;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  selectStyle?: SelectStyle;
  size?: SelectSize;
  error?: boolean | string;
  success?: boolean | string;
}

export interface UseSelectReturn {
  selectId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredOptions: SelectOption[];
  navigableOptions: SelectOption[];
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  selectedValues: string[];
  isSelected: (id: string) => boolean;
  selectOption: (id: string) => void;
  deselectOption: (id: string) => void;
  toggleOption: (id: string) => void;
  getSelectedOptions: () => SelectOption[];
  hasError: boolean;
  hasSuccess: boolean;
  state: 'default' | 'disabled' | 'error' | 'success';
  sizeConfig: (typeof SIZE_CONFIG)[SelectSize];
  styleConfig: (typeof STYLE_CONFIG)[SelectStyle];
  stateConfig: (typeof STATE_CONFIG)['default' | 'disabled' | 'error' | 'success'];
  iconColor: 'default-disabled' | 'destructive' | 'success' | 'default-subtle';
}

export const useSelect = ({
  options,
  value,
  onChange,
  multiple = false,
  maxSelections,
  searchable = false,
  filterItems = true,
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  selectStyle = 'default',
  size = 'sm',
  error,
  success,
}: UseSelectOptions): UseSelectReturn => {
  const selectId = useId();
  const [internalOpen, setInternalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setIsOpen = useCallback((newOpen: boolean) => {
    if (disabled) return;

    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    if (!newOpen) {
      setSearchQuery('');
      setFocusedIndex(-1);
    }
    onOpenChange?.(newOpen);
  }, [isControlled, onOpenChange, disabled]);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const selectedValues = useMemo(() => {
    if (value === undefined) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const isSelected = useCallback((id: string) => {
    return selectedValues.includes(id);
  }, [selectedValues]);

  const selectOption = useCallback((id: string) => {
    if (disabled) return;

    const option = options.find(o => o.id === id);
    if (!option || option.disabled) return;

    if (multiple) {
      if (maxSelections && selectedValues.length >= maxSelections) return;
      const newValue = [...selectedValues, id];
      (onChange as ((value: string[]) => void) | undefined)?.(newValue);
    } else {
      (onChange as ((value: string) => void) | undefined)?.(id);
      setIsOpen(false);
    }
  }, [disabled, options, multiple, maxSelections, selectedValues, onChange, setIsOpen]);

  const deselectOption = useCallback((id: string) => {
    if (disabled) return;

    if (multiple) {
      const newValue = selectedValues.filter(v => v !== id);
      (onChange as ((value: string[]) => void) | undefined)?.(newValue);
    }
  }, [disabled, multiple, selectedValues, onChange]);

  const toggleOption = useCallback((id: string) => {
    if (isSelected(id)) {
      deselectOption(id);
    } else {
      selectOption(id);
    }
  }, [isSelected, selectOption, deselectOption]);

  const getSelectedOptions = useCallback(() => {
    return options.filter(o => selectedValues.includes(o.id));
  }, [options, selectedValues]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !filterItems || !searchQuery.trim()) {
      return options;
    }

    const query = searchQuery.toLowerCase().trim();
    return options.filter(option =>
      option.label.toLowerCase().includes(query) ||
      option.description?.toLowerCase().includes(query)
    );
  }, [options, searchQuery, searchable, filterItems]);

  const navigableOptions = useMemo(() => {
    return filteredOptions.filter(option => !option.disabled);
  }, [filteredOptions]);

  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);
  const state = disabled ? 'disabled' : hasError ? 'error' : hasSuccess ? 'success' : 'default';

  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[selectStyle];
  const stateConfig = STATE_CONFIG[state];

  const iconColor = disabled ? 'default-disabled' : hasError ? 'destructive' : hasSuccess ? 'success' : 'default-subtle';

  return {
    selectId,
    isOpen,
    setIsOpen,
    toggle,
    searchQuery,
    setSearchQuery,
    filteredOptions,
    navigableOptions,
    focusedIndex,
    setFocusedIndex,
    selectedValues,
    isSelected,
    selectOption,
    deselectOption,
    toggleOption,
    getSelectedOptions,
    hasError,
    hasSuccess,
    state,
    sizeConfig,
    styleConfig,
    stateConfig,
    iconColor,
  };
};
