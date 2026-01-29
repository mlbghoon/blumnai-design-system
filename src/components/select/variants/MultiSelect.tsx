import { forwardRef, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { InputWrapper } from '../../input/shared/InputWrapper';
import { DropdownMenuSearch } from '../../dropdown/DropdownMenu/DropdownMenuSearch';

import { SelectTrigger } from '../Select/SelectTrigger';
import { SelectValue } from '../Select/SelectValue';
import { SelectMenu } from '../SelectMenu/SelectMenu';
import { SelectMenuItem } from '../SelectMenu/SelectMenuItem';
import { useSelect } from '../shared/useSelect';
import { useSelectKeyboard } from '../shared/useSelectKeyboard';
import { usePortalPosition } from '../shared/usePortalPosition';
import type { MultiSelectProps } from '../Select.types';

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(({
  variant: _variant,
  selectStyle = 'default',
  size = 'sm',
  label,
  required = false,
  supportText,
  caption,
  error,
  success,
  width,
  disabled = false,
  placeholder = 'Select options...',
  leadIcon,
  options,
  value,
  onChange,
  maxSelections,
  selectedText,
  searchable = false,
  searchPlaceholder = 'Search...',
  noResultsText = 'No results found',
  open,
  onOpenChange,
  portal = true,
  maxHeight = 300,
  className,
  ...props
}, forwardedRef) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  }, [forwardedRef]);

  const {
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
    isSelected,
    toggleOption,
    getSelectedOptions,
    state,
  } = useSelect({
    options,
    value,
    onChange: onChange as ((value: string | string[]) => void) | undefined,
    multiple: true,
    maxSelections,
    searchable,
    disabled,
    open,
    onOpenChange,
    selectStyle,
    size,
    error,
    success,
  });

  const { handleKeyDown } = useSelectKeyboard({
    isOpen,
    setIsOpen,
    focusedIndex,
    setFocusedIndex,
    navigableOptions,
    onSelect: toggleOption,
    multiple: true,
    triggerRef,
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideContainer = containerRef.current && !containerRef.current.contains(target);
      const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);

      if (isOutsideContainer && isOutsideMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  const portalRef = usePortalPosition(containerRef, isOpen, portal);

  const selectedOptions = getSelectedOptions();
  const hasFilteredItems = filteredOptions.length > 0;

  const renderMenuContent = () => (
    <>
      {searchable && (
        <DropdownMenuSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={searchPlaceholder}
          autoFocus
        />
      )}
      {hasFilteredItems ? (
        filteredOptions.map((option) => {
          const navIndex = navigableOptions.findIndex(nav => nav.id === option.id);
          return (
            <SelectMenuItem
              key={option.id}
              label={option.label}
              selectType="checkbox"
              leadIcon={option.leadIcon}
              description={option.description}
              badge={option.badge}
              disabled={option.disabled}
              selected={isSelected(option.id)}
              focused={navIndex === focusedIndex}
              onClick={() => toggleOption(option.id)}
            />
          );
        })
      ) : (
        <div className="flex items-center justify-center padding-y-8 text-muted size-sm">
          {noResultsText}
        </div>
      )}
    </>
  );

  const menuElement = (
    <SelectMenu ref={menuRef} hasSearch={searchable} maxHeight={maxHeight}>
      {renderMenuContent()}
    </SelectMenu>
  );

  return (
    <InputWrapper
      label={label}
      inputId={selectId}
      required={required}
      supportText={supportText}
      caption={caption}
      error={error}
      success={success}
      width={width}
      className={className}
    >
      <div
        ref={setContainerRef}
        className="relative"
        onKeyDown={handleKeyDown}
        {...props}
      >
        <SelectTrigger
          ref={triggerRef}
          size={size}
          selectStyle={selectStyle}
          state={state}
          leadIcon={leadIcon}
          isOpen={isOpen}
          disabled={disabled}
          onClick={toggle}
        >
          <SelectValue
            selectedOptions={selectedOptions}
            placeholder={placeholder}
            variant="multi-select"
            disabled={disabled}
            selectedText={selectedText}
          />
        </SelectTrigger>

        {isOpen && !portal && (
          <div className="absolute z-50 top-full mt-1 left-0 w-full">
            {menuElement}
          </div>
        )}

        {isOpen && portal && createPortal(
          <div
            ref={portalRef}
            style={{
              position: 'absolute',
              zIndex: 9999,
            }}
          >
            {menuElement}
          </div>,
          document.body
        )}
      </div>
    </InputWrapper>
  );
});

MultiSelect.displayName = 'MultiSelect';
