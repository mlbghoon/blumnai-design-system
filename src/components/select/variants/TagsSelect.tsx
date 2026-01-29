import { forwardRef, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../../utils/cn';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { DropdownMenuSearch } from '../../dropdown/DropdownMenu/DropdownMenuSearch';
import { Icon } from '../../icons/Icon';

import { SelectValue } from '../Select/SelectValue';
import { SelectMenu } from '../SelectMenu/SelectMenu';
import { SelectMenuItem } from '../SelectMenu/SelectMenuItem';
import { useSelect } from '../shared/useSelect';
import { useSelectKeyboard } from '../shared/useSelectKeyboard';
import { usePortalPosition } from '../shared/usePortalPosition';
import { SIZE_CONFIG, STYLE_CONFIG, STATE_CONFIG, TRIGGER_BASE } from 'constants/select/Select/Select.constants';
import type { TagsSelectProps } from '../Select.types';

export const TagsSelect = forwardRef<HTMLDivElement, TagsSelectProps>(({
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
  placeholder = 'Select tags...',
  leadIcon,
  options,
  value,
  onChange,
  maxSelections,
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
    deselectOption,
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
  const hasSelectedOptions = selectedOptions.length > 0;

  const sizeConfig = SIZE_CONFIG[size];
  const styleConfig = STYLE_CONFIG[selectStyle];

  const iconColor = disabled
    ? 'default-disabled'
    : state === 'error'
      ? 'destructive'
      : state === 'success'
        ? 'success'
        : 'default-subtle';

  const triggerClassName = cn(
    TRIGGER_BASE,
    'min-h-[32px]',
    size === 'lg' && 'min-h-[36px]',
    sizeConfig.padding,
    sizeConfig.gap,
    sizeConfig.text,
    styleConfig.base,
    !disabled && styleConfig.focus,
    state === 'error' && 'border-destructive',
    state === 'success' && 'border-success',
    state === 'disabled' && STATE_CONFIG.disabled.bg,
    state === 'disabled' && STATE_CONFIG.disabled.border,
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    'flex-wrap'
  );

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
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          disabled={disabled}
          onClick={toggle}
          className={triggerClassName}
        >
          {leadIcon && (
            <Icon
              iconType={leadIcon}
              size={sizeConfig.iconSize}
              color={iconColor}
              className="flex-shrink-0"
              isFill
            />
          )}

          <div className="flex-1 min-w-0 text-left flex items-center min-h-[24px]">
            {hasSelectedOptions ? (
              <SelectValue
                selectedOptions={selectedOptions}
                placeholder={placeholder}
                variant="tags"
                disabled={disabled}
                onRemoveTag={(id) => {
                  deselectOption(id);
                }}
              />
            ) : (
              <span className="text-hint">{placeholder}</span>
            )}
          </div>

          <Icon
            iconType={['arrows', 'expand-up-down']}
            size={sizeConfig.iconSize}
            color={iconColor}
            className="flex-shrink-0"
          />
        </button>

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

TagsSelect.displayName = 'TagsSelect';
