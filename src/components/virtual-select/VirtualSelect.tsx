import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useVirtualizer } from '@tanstack/react-virtual';

import { cn } from '@/lib/utils';
import { InputWrapper } from '../input/shared/InputWrapper';
import { Icon, parseIconTypeWithFill } from '../icons/Icon';
import { ScrollArea } from '../scroll-area/ScrollArea';
import { usePortalContainer } from '../../utils/PortalContainerContext';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  MENU_ITEM_SIZE_CONFIG,
} from '@/constants/select/Select/Select.constants';
import { VirtualSelectItem } from './VirtualSelectItem';
import type {
  VirtualSelectProps,
  MultiVirtualSelectProps,
} from './VirtualSelect.types';

const VirtualSelect = React.forwardRef<HTMLDivElement, VirtualSelectProps>(
  (props, ref) => {
    const {
      variant = 'single',
      selectStyle = 'default',
      size = 'sm',
      label,
      labelPosition,
      labelWidth,
      required = false,
      supportText,
      caption,
      error,
      success,
      disabled = false,
      placeholder = '선택...',
      leadIcon,
      options,
      searchable = false,
      searchPlaceholder = '검색...',
      noResultsText = '검색 결과 없음',
      open: controlledOpen,
      onOpenChange,
      maxHeight = 300,
      className,
      clearable = false,
      loading = false,
      renderOption,
      itemHeight = 32,
      overscan = 5,
      onLoadMore,
      loadMoreThreshold = 5,
      onSearchChange,
    } = props;

    const isMulti = variant === 'multi';
    const multiProps = isMulti ? (props as MultiVirtualSelectProps) : null;
    const selectType = !isMulti && 'selectType' in props ? props.selectType : undefined;

    const singlePropsValue = !isMulti && 'value' in props ? (props.value as string | undefined) : undefined;
    const singlePropsOnChange = !isMulti && 'onChange' in props ? (props.onChange as ((v: string) => void) | undefined) : undefined;
    const multiOnChange = multiProps?.onChange;
    const multiMaxSelections = multiProps?.maxSelections;
    const multiControlledValue = multiProps?.value;

    const contextContainer = usePortalContainer();
    const selectId = React.useId();
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const [scrollElement, setScrollElement] = React.useState<HTMLDivElement | null>(null);

    const [internalOpen, setInternalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    const [internalSingleValue, setInternalSingleValue] = React.useState<string>(
      (!isMulti && 'defaultValue' in props ? (props.defaultValue as string) : undefined) ?? ''
    );
    const [internalMultiValue, setInternalMultiValue] = React.useState<string[]>(
      multiProps?.defaultValue ?? []
    );

    const isControlledOpen = controlledOpen !== undefined;
    const isOpen = isControlledOpen ? controlledOpen : internalOpen;

    const singleValue = !isMulti
      ? (singlePropsValue !== undefined ? singlePropsValue : internalSingleValue)
      : '';
    const controlledMultiValue = isMulti ? multiControlledValue : undefined;
    const multiValue = React.useMemo(
      () => controlledMultiValue !== undefined ? controlledMultiValue : internalMultiValue,
      [controlledMultiValue, internalMultiValue]
    );

    const hasError = error === true || (typeof error === 'string' && error.length > 0);
    const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);
    const state = disabled
      ? 'disabled'
      : hasError
        ? 'error'
        : hasSuccess
          ? 'success'
          : 'default';

    const sizeConfig = SIZE_CONFIG[size];
    const styleConfig = STYLE_CONFIG[selectStyle];

    const iconColor = disabled
      ? 'default-disabled'
      : state === 'error'
        ? 'destructive'
        : state === 'success'
          ? 'success'
          : 'default-subtle';

    const filteredOptions = React.useMemo(() => {
      if (onSearchChange) return options;
      if (!searchable || !searchQuery.trim()) return options;
      const query = searchQuery.toLowerCase().trim();
      return options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(query) ||
          opt.description?.toLowerCase().includes(query)
      );
    }, [options, searchQuery, searchable, onSearchChange]);

    const navigableOptions = React.useMemo(
      () => filteredOptions.filter((o) => !o.disabled),
      [filteredOptions]
    );

    const effectiveShowSelectAll = isMulti && multiProps?.showSelectAll && !multiMaxSelections;

    const allSelected = effectiveShowSelectAll
      && navigableOptions.length > 0
      && navigableOptions.every((o) => multiValue.includes(o.id));

    const someSelected = effectiveShowSelectAll
      && !allSelected
      && navigableOptions.some((o) => multiValue.includes(o.id));

    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        if (disabled) return;
        if (!isControlledOpen) setInternalOpen(newOpen);
        if (!newOpen) {
          setSearchQuery('');
          setFocusedIndex(-1);
        }
        onOpenChange?.(newOpen);
      },
      [disabled, isControlledOpen, onOpenChange]
    );

    const optionsMap = React.useMemo(
      () => new Map(options.map((o) => [o.id, o])),
      [options],
    );

    const navigableIndexMap = React.useMemo(
      () => new Map(navigableOptions.map((o, i) => [o.id, i])),
      [navigableOptions],
    );

    const selectSingle = React.useCallback(
      (id: string) => {
        if (disabled) return;
        const option = optionsMap.get(id);
        if (!option || option.disabled) return;

        if (singlePropsValue === undefined) setInternalSingleValue(id);
        singlePropsOnChange?.(id);
        setOpen(false);
      },
      [disabled, optionsMap, singlePropsValue, singlePropsOnChange, setOpen]
    );

    const toggleMultiValue = React.useCallback(
      (id: string) => {
        if (disabled || !isMulti) return;
        const option = optionsMap.get(id);
        if (!option || option.disabled) return;

        let newValue: string[];
        if (multiValue.includes(id)) {
          newValue = multiValue.filter((v) => v !== id);
        } else {
          if (multiMaxSelections && multiValue.length >= multiMaxSelections) return;
          newValue = [...multiValue, id];
        }

        if (multiControlledValue === undefined) setInternalMultiValue(newValue);
        multiOnChange?.(newValue);
      },
      [disabled, isMulti, optionsMap, multiValue, multiMaxSelections, multiControlledValue, multiOnChange]
    );

    const toggleAll = React.useCallback(() => {
      if (disabled || !isMulti) return;
      const selectableIds = navigableOptions.map((o) => o.id);
      let newValue: string[];
      if (allSelected) {
        newValue = multiValue.filter((v) => !selectableIds.includes(v));
      } else {
        const set = new Set([...multiValue, ...selectableIds]);
        newValue = Array.from(set);
      }
      if (multiControlledValue === undefined) setInternalMultiValue(newValue);
      multiOnChange?.(newValue);
    }, [disabled, isMulti, navigableOptions, allSelected, multiValue, multiControlledValue, multiOnChange]);

    const handleClearAll = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (isMulti) {
          if (multiControlledValue === undefined) setInternalMultiValue([]);
          multiOnChange?.([]);
        } else {
          if (singlePropsValue === undefined) setInternalSingleValue('');
          singlePropsOnChange?.('');
        }
      },
      [isMulti, multiControlledValue, multiOnChange, singlePropsValue, singlePropsOnChange]
    );

    const handleSelect = React.useCallback(
      (id: string) => {
        if (isMulti) toggleMultiValue(id);
        else selectSingle(id);
      },
      [isMulti, toggleMultiValue, selectSingle]
    );

    const selectAllOffset = effectiveShowSelectAll ? 1 : 0;
    const totalNavigableCount = selectAllOffset + navigableOptions.length;

    // eslint-disable-next-line react-hooks/incompatible-library
    const rowVirtualizer = useVirtualizer({
      count: filteredOptions.length,
      getScrollElement: () => scrollElement,
      estimateSize: () => itemHeight,
      overscan,
    });

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (!isOpen) {
          if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
            event.preventDefault();
            setOpen(true);
            setFocusedIndex(0);
          }
          return;
        }

        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault();
            setFocusedIndex((prev) => {
              const next = prev + 1 >= totalNavigableCount ? 0 : prev + 1;
              const itemIdx = next - selectAllOffset;
              if (itemIdx >= 0) {
                const optionInFiltered = navigableOptions[itemIdx];
                const actualIdx = filteredOptions.findIndex((o) => o.id === optionInFiltered?.id);
                if (actualIdx >= 0) rowVirtualizer.scrollToIndex(actualIdx);
              }
              return next;
            });
            break;
          }

          case 'ArrowUp': {
            event.preventDefault();
            setFocusedIndex((prev) => {
              const next = prev - 1 < 0 ? totalNavigableCount - 1 : prev - 1;
              const itemIdx = next - selectAllOffset;
              if (itemIdx >= 0) {
                const optionInFiltered = navigableOptions[itemIdx];
                const actualIdx = filteredOptions.findIndex((o) => o.id === optionInFiltered?.id);
                if (actualIdx >= 0) rowVirtualizer.scrollToIndex(actualIdx);
              }
              return next;
            });
            break;
          }

          case 'Home':
            event.preventDefault();
            setFocusedIndex(0);
            rowVirtualizer.scrollToIndex(0);
            break;

          case 'End':
            event.preventDefault();
            setFocusedIndex(totalNavigableCount - 1);
            if (filteredOptions.length > 0) {
              rowVirtualizer.scrollToIndex(filteredOptions.length - 1);
            }
            break;

          case 'Enter':
          case ' ': {
            event.preventDefault();
            if (effectiveShowSelectAll && focusedIndex === 0) {
              toggleAll();
            } else if (focusedIndex >= selectAllOffset && focusedIndex < totalNavigableCount) {
              const option = navigableOptions[focusedIndex - selectAllOffset];
              handleSelect(option.id);
            }
            break;
          }

          case 'Escape':
            event.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
            break;
        }
      },
      [isOpen, navigableOptions, filteredOptions, focusedIndex, totalNavigableCount, selectAllOffset, effectiveShowSelectAll, handleSelect, toggleAll, setOpen, rowVirtualizer]
    );

    React.useEffect(() => {
      if (isOpen && searchable) {
        rowVirtualizer.scrollToIndex(0);
        setFocusedIndex(-1);
      }
    }, [searchQuery, isOpen, searchable, rowVirtualizer]);

    const hasClearableValue = isMulti ? multiValue.length > 0 : !!singleValue;

    const renderSelectedValue = () => {
      if (isMulti) {
        if (multiValue.length === 0) {
          return <span className="text-hint">{placeholder}</span>;
        }

        const displayText = typeof multiProps?.selectedText === 'function'
          ? multiProps.selectedText(multiValue.length)
          : multiProps?.selectedText ?? `${multiValue.length}개 선택됨`;

        return (
          <span className={cn('truncate', disabled ? 'text-hint' : 'text-default')}>
            {displayText}
          </span>
        );
      }

      if (!singleValue) {
        return <span className="text-hint">{placeholder}</span>;
      }

      const selectedOpt = optionsMap.get(singleValue);
      if (!selectedOpt) {
        return <span className="text-hint">{placeholder}</span>;
      }

      return (
        <span className={cn('truncate', disabled ? 'text-hint' : 'text-default')}>
          {selectedOpt.label}
        </span>
      );
    };

    const triggerClassName = React.useMemo(() => cn(
      'flex w-full items-center justify-between whitespace-nowrap transition-colors duration-150',
      sizeConfig.container,
      sizeConfig.padding,
      sizeConfig.gap,
      sizeConfig.text,
      'font-body',
      styleConfig.base,
      !disabled && styleConfig.focus,
      state === 'error' && 'border-destructive',
      state === 'success' && 'border-success',
      state === 'disabled' && STATE_CONFIG.disabled.bg,
      state === 'disabled' && STATE_CONFIG.disabled.border,
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      'focus:outline-none'
    ), [sizeConfig, styleConfig, disabled, state]);

    const focusedItemId = React.useMemo(() => {
      if (focusedIndex < selectAllOffset) return undefined;
      const navOpt = navigableOptions[focusedIndex - selectAllOffset];
      return navOpt ? `vs-item-${navOpt.id}` : undefined;
    }, [focusedIndex, selectAllOffset, navigableOptions]);

    const virtualItems = rowVirtualizer.getVirtualItems();
    const totalSize = rowVirtualizer.getTotalSize();

    const onLoadMoreRef = React.useRef(onLoadMore);
    onLoadMoreRef.current = onLoadMore;

    React.useEffect(() => {
      if (!onLoadMoreRef.current || virtualItems.length === 0 || filteredOptions.length === 0) return;
      const lastItem = virtualItems[virtualItems.length - 1];
      if (lastItem.index >= filteredOptions.length - loadMoreThreshold) {
        onLoadMoreRef.current();
      }
    }, [virtualItems, filteredOptions.length, loadMoreThreshold]);

    return (
      <InputWrapper
        label={label}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
        inputId={selectId}
        required={required}
        supportText={supportText}
        caption={caption}
        error={error}
        success={success}
        width={props.width}
        className={className}
      >
        <div
          ref={ref}
          onKeyDown={handleKeyDown}
          style={props.minWidth ? { minWidth: typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth } : undefined}
        >
          <PopoverPrimitive.Root open={isOpen} onOpenChange={setOpen}>
            <PopoverPrimitive.Trigger asChild disabled={disabled}>
              <button
                ref={triggerRef}
                type="button"
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                disabled={disabled}
                className={triggerClassName}
                id={selectId}
              >
                {leadIcon && (() => {
                  const { iconType, isFill } = parseIconTypeWithFill(leadIcon);
                  return (
                    <Icon
                      iconType={iconType}
                      size={sizeConfig.iconSize}
                      color={iconColor}
                      className="flex-shrink-0"
                      isFill={isFill}
                    />
                  );
                })()}

                <div className="flex-1 min-w-0 text-left">
                  {renderSelectedValue()}
                </div>

                {clearable && hasClearableValue && !disabled && (
                  <span
                    role="button"
                    tabIndex={-1}
                    aria-label="선택 초기화"
                    onClick={handleClearAll}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleClearAll(e as unknown as React.MouseEvent);
                      }
                    }}
                    className="flex items-center justify-center width-16 height-16 flex-shrink-0 text-muted hover:text-default cursor-pointer"
                  >
                    <Icon iconType={['system', 'close']} size={12} />
                  </span>
                )}

                <Icon
                  iconType={['arrows', 'expand-up-down']}
                  size={sizeConfig.iconSize}
                  color={iconColor}
                  className="flex-shrink-0"
                />
              </button>
            </PopoverPrimitive.Trigger>

            <PopoverPrimitive.Portal container={contextContainer ?? undefined}>
              <PopoverPrimitive.Content
                align="start"
                sideOffset={4}
                collisionPadding={8}
                className={cn(
                  'z-[100] min-w-[200px] max-w-[320px] overflow-hidden',
                  'bg-card border-default rounded-lg shadow-modal-sm',
                  'data-[state=open]:animate-in data-[state=closed]:animate-out',
                  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                  'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                  'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                  'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                  'origin-[--radix-popover-content-transform-origin]'
                )}
                style={{ width: 'var(--radix-popover-trigger-width)' }}
              >
                {searchable && (
                  <div className="border-b border-default">
                    <div className="flex items-center ds-gap-2 padding-x-8 height-36">
                      <div className="flex items-center justify-center width-20 height-20 flex-shrink-0">
                        <Icon iconType={['system', 'search']} size={16} color="default-muted" />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        role="searchbox"
                        aria-label={searchPlaceholder || '옵션'}
                        value={searchQuery}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSearchQuery(val);
                          onSearchChange?.(val);
                          setTimeout(() => searchInputRef.current?.focus(), 0);
                        }}
                        placeholder={searchPlaceholder}
                        className="flex-1 bg-transparent border-none outline-none size-sm line-height-leading-5 letter-spacing-tracking-tight font-body text-default placeholder:text-hint"
                        autoFocus
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            onSearchChange?.('');
                            setTimeout(() => searchInputRef.current?.focus(), 0);
                          }}
                          className="flex items-center justify-center width-20 height-20 flex-shrink-0 text-muted hover:text-default"
                        >
                          <Icon iconType={['system', 'close']} size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {loading ? (
                  <div className="flex items-center justify-center padding-y-16">
                    <div className="width-16 height-16 border-2 border-default border-t-transparent rounded-full motion-safe:animate-spin" />
                  </div>
                ) : filteredOptions.length > 0 ? (
                  <>
                    {effectiveShowSelectAll && (
                      <>
                        <div className="flex w-full padding-x-4 padding-t-4">
                          <div
                            role="option"
                            aria-selected={allSelected}
                            tabIndex={0}
                            onClick={toggleAll}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleAll();
                              }
                            }}
                            className={cn(
                              'flex items-center w-full rounded-xs transition-colors duration-150',
                              MENU_ITEM_SIZE_CONFIG.default.height,
                              MENU_ITEM_SIZE_CONFIG.default.padding,
                              MENU_ITEM_SIZE_CONFIG.default.gap,
                              'bg-transparent hover:bg-state-ghost-hover active:bg-state-ghost-hover cursor-pointer',
                              focusedIndex === 0 && 'shadow-component-focus'
                            )}
                          >
                            <div
                              className={cn(
                                'relative width-16 height-16 rounded-default overflow-hidden flex-shrink-0 transition-colors',
                                allSelected || someSelected
                                  ? 'border-none bg-checkbox-active'
                                  : 'border-darker bg-checkbox-default'
                              )}
                            >
                              {(allSelected || someSelected) && (
                                <div className="absolute flex items-center justify-center" style={{ inset: '1px' }}>
                                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {allSelected ? (
                                      <path d="M1 4L3 6L7 2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    ) : (
                                      <path d="M1.5 4H6.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                                    )}
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0 padding-x-4">
                              <span className={cn('font-body', MENU_ITEM_SIZE_CONFIG.default.text, 'text-default truncate')}>
                                {multiProps?.selectAllLabel ?? '전체 선택'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="margin-x-4 margin-y-4 height-1 bg-muted" />
                      </>
                    )}

                    <div
                      role="listbox"
                      aria-multiselectable={isMulti || undefined}
                      aria-label={typeof label === 'string' ? label : 'Options'}
                      aria-activedescendant={focusedItemId}
                      className="padding-y-4"
                    >
                      <ScrollArea
                        maxHeight={maxHeight}
                        viewportRef={setScrollElement}
                      >
                        <div
                          style={{
                            height: `${totalSize}px`,
                            width: '100%',
                            position: 'relative',
                          }}
                        >
                          {virtualItems.map((virtualRow) => {
                            const option = filteredOptions[virtualRow.index];
                            const isSelected = isMulti
                              ? multiValue.includes(option.id)
                              : singleValue === option.id;
                            const navIndex = navigableIndexMap.get(option.id) ?? -1;
                            const isFocused = navIndex >= 0 && navIndex + selectAllOffset === focusedIndex;

                            if (renderOption) {
                              return (
                                <div
                                  key={option.id}
                                  role="option"
                                  aria-selected={isSelected}
                                  aria-disabled={option.disabled}
                                  id={`vs-item-${option.id}`}
                                  data-focused={isFocused || undefined}
                                  onClick={() => !option.disabled && handleSelect(option.id)}
                                  className="flex w-full padding-x-4"
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                  }}
                                >
                                  <div
                                    className={cn(
                                      'flex items-center w-full rounded-xs transition-colors duration-150 padding-6',
                                      option.disabled
                                        ? 'cursor-not-allowed opacity-50'
                                        : 'hover:bg-state-ghost-hover cursor-pointer',
                                      !option.disabled && isFocused && 'shadow-component-focus'
                                    )}
                                  >
                                    {renderOption(option, isSelected)}
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <VirtualSelectItem
                                key={option.id}
                                option={option}
                                selected={isSelected}
                                focused={isFocused}
                                disabled={option.disabled}
                                isMulti={isMulti}
                                selectType={selectType}
                                onSelect={handleSelect}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: `${virtualRow.size}px`,
                                  transform: `translateY(${virtualRow.start}px)`,
                                }}
                              />
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center padding-y-8 text-muted size-sm font-body">
                    {noResultsText}
                  </div>
                )}
              </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
          </PopoverPrimitive.Root>
        </div>
      </InputWrapper>
    );
  }
);
VirtualSelect.displayName = 'VirtualSelect';

export { VirtualSelect };
