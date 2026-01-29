import { useCallback } from 'react';

import type { SelectOption } from '../Select.types';

export interface UseSelectKeyboardOptions {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  navigableOptions: SelectOption[];
  onSelect: (id: string) => void;
  multiple?: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export interface UseSelectKeyboardReturn {
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

export const useSelectKeyboard = ({
  isOpen,
  setIsOpen,
  focusedIndex,
  setFocusedIndex,
  navigableOptions,
  onSelect,
  multiple = false,
  triggerRef,
}: UseSelectKeyboardOptions): UseSelectKeyboardReturn => {
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(
          focusedIndex + 1 >= navigableOptions.length ? 0 : focusedIndex + 1
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(
          focusedIndex - 1 < 0 ? navigableOptions.length - 1 : focusedIndex - 1
        );
        break;

      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;

      case 'End':
        event.preventDefault();
        setFocusedIndex(navigableOptions.length - 1);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < navigableOptions.length) {
          const option = navigableOptions[focusedIndex];
          onSelect(option.id);
        }
        break;

      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        triggerRef?.current?.focus();
        break;

      case 'Tab':
        if (!multiple) {
          setIsOpen(false);
        }
        break;
    }
  }, [isOpen, setIsOpen, focusedIndex, setFocusedIndex, navigableOptions, onSelect, multiple, triggerRef]);

  return { handleKeyDown };
};
