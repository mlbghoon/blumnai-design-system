import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';
import { InputWrapper } from '../input/shared/InputWrapper';
import { Icon, parseIconTypeWithFill } from '../icons/Icon';
import { Avatar } from '../avatar/Avatar';
import { Badge } from '../badge/Badge';
import type {
  RadixMultiSelectProps,
  MultiSelectItemProps,
} from './Select.types';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  MENU_ITEM_SIZE_CONFIG,
} from '@/constants/select/Select/Select.constants';

// ============================================================================
// MultiSelectItem (internal)
// ============================================================================

const MultiSelectItem = React.forwardRef<HTMLDivElement, MultiSelectItemProps>(
  ({ option, selected, focused, disabled = false, variant, onToggle }, ref) => {
    const internalRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (focused && internalRef.current) {
        internalRef.current.scrollIntoView({ block: 'nearest' });
      }
    }, [focused]);

    const mergeRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    const sizeConfig = option.description
      ? MENU_ITEM_SIZE_CONFIG.large
      : MENU_ITEM_SIZE_CONFIG.default;

    const iconColor = option.iconColor
      ?? (disabled ? 'var(--icon-default-disabled)' : 'var(--icon-default)');

    const handleClick = () => {
      if (!disabled) {
        onToggle();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault();
        onToggle();
      }
    };

    const renderCheckbox = () => (
      <div
        className={cn(
          'relative width-16 height-16 rounded-default overflow-hidden flex-shrink-0 transition-colors',
          disabled
            ? 'bg-checkbox-disabled border-default'
            : selected
              ? 'border-none bg-checkbox-active'
              : 'border-darker bg-checkbox-default'
        )}
      >
        {selected && (
          <div
            className="absolute flex items-center justify-center"
            style={{ inset: '1px' }}
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4L3 6L7 2"
                stroke={disabled ? 'var(--icon-default-disabled)' : '#FFFFFF'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    );

    const renderLeadContent = () => {
      if (variant === 'avatar' && option.avatarSrc) {
        return (
          <Avatar
            variant="userpic"
            size={option.description ? 'sm' : '2xs'}
            src={option.avatarSrc}
            alt={option.label}
            className="flex-shrink-0"
          />
        );
      }

      if (option.leadIcon) {
        const { iconType, isFill } = parseIconTypeWithFill(option.leadIcon);
        return (
          <div
            className={cn(
              'flex items-center justify-center flex-shrink-0',
              sizeConfig.iconFrame
            )}
          >
            <Icon
              iconType={iconType}
              size={sizeConfig.iconSize}
              color={iconColor}
              isFill={isFill}
            />
          </div>
        );
      }

      return null;
    };

    return (
      <div
        ref={mergeRefs}
        role="option"
        aria-selected={selected}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="flex w-full padding-x-4"
      >
        <div
          className={cn(
            'flex items-center w-full rounded-xs transition-colors duration-150',
            sizeConfig.height,
            sizeConfig.padding,
            sizeConfig.gap,
            disabled
              ? 'bg-transparent cursor-not-allowed'
              : 'bg-transparent hover:bg-state-ghost-hover active:bg-state-ghost-hover cursor-pointer',
            !disabled && focused && 'shadow-component-focus'
          )}
        >
          {renderCheckbox()}
          {renderLeadContent()}

          {option.description ? (
            <div className="flex flex-col flex-1 min-w-0 padding-x-4 ds-gap-1">
              <span
                className={cn(
                  'font-body',
                  sizeConfig.text,
                  disabled ? 'text-hint' : 'text-default',
                  'flex-1 truncate'
                )}
              >
                {option.label}
              </span>
              <span
                className={cn(
                  'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight truncate',
                  disabled ? 'text-hint' : 'text-muted'
                )}
              >
                {option.description}
              </span>
            </div>
          ) : (
            <div className="flex-1 min-w-0 padding-x-4">
              <span
                className={cn(
                  'font-body',
                  sizeConfig.text,
                  disabled ? 'text-hint' : 'text-default',
                  'truncate'
                )}
              >
                {option.label}
              </span>
            </div>
          )}

          {option.badge && (
            <Badge size="sm" color="neutral" border label={option.badge} />
          )}
        </div>
      </div>
    );
  }
);
MultiSelectItem.displayName = 'MultiSelectItem';

// ============================================================================
// MultiSelect Component
// ============================================================================

const MultiSelect = React.forwardRef<HTMLDivElement, RadixMultiSelectProps>(
  (
    {
      variant = 'default',
      selectStyle = 'default',
      size = 'sm',
      label,
      required = false,
      supportText,
      caption,
      error,
      success,
      disabled = false,
      placeholder = 'Select...',
      leadIcon,
      options,
      value: controlledValue,
      onChange,
      defaultValue,
      open: controlledOpen,
      onOpenChange,
      searchable = false,
      searchPlaceholder = 'Search...',
      noResultsText = 'No results found',
      maxSelections,
      selectedText,
      maxVisibleTags,
      overflowText,
      width,
      maxHeight = 300,
      className,
      showSelectAll = false,
      selectAllLabel = '전체 선택',
    },
    ref
  ) => {
    const selectId = React.useId();
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<string[]>(
      defaultValue || []
    );
    const [searchQuery, setSearchQuery] = React.useState('');
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    const isControlledOpen = controlledOpen !== undefined;
    const isOpen = isControlledOpen ? controlledOpen : internalOpen;

    const isControlledValue = controlledValue !== undefined;
    const selectedValues = isControlledValue ? controlledValue : internalValue;

    const hasError =
      error === true || (typeof error === 'string' && error.length > 0);
    const hasSuccess =
      success === true || (typeof success === 'string' && success.length > 0);
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
      if (!searchable || !searchQuery.trim()) {
        return options;
      }
      const query = searchQuery.toLowerCase().trim();
      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(query) ||
          option.description?.toLowerCase().includes(query)
      );
    }, [options, searchQuery, searchable]);

    const navigableOptions = React.useMemo(() => {
      return filteredOptions.filter((option) => !option.disabled);
    }, [filteredOptions]);

    const effectiveShowSelectAll = showSelectAll && !maxSelections;

    const selectableOptions = React.useMemo(() => {
      return filteredOptions.filter((o) => !o.disabled);
    }, [filteredOptions]);

    const allSelected = effectiveShowSelectAll
      && selectableOptions.length > 0
      && selectableOptions.every((o) => selectedValues.includes(o.id));

    const someSelected = effectiveShowSelectAll
      && !allSelected
      && selectableOptions.some((o) => selectedValues.includes(o.id));

    const selectedOptions = React.useMemo(() => {
      return options.filter((opt) => selectedValues.includes(opt.id));
    }, [options, selectedValues]);

    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        if (disabled) return;

        if (!isControlledOpen) {
          setInternalOpen(newOpen);
        }
        if (!newOpen) {
          setSearchQuery('');
          setFocusedIndex(-1);
        }
        onOpenChange?.(newOpen);
      },
      [disabled, isControlledOpen, onOpenChange]
    );

    const toggleValue = React.useCallback(
      (id: string) => {
        if (disabled) return;

        const option = options.find((o) => o.id === id);
        if (!option || option.disabled) return;

        let newValue: string[];
        if (selectedValues.includes(id)) {
          newValue = selectedValues.filter((v) => v !== id);
        } else {
          if (maxSelections && selectedValues.length >= maxSelections) return;
          newValue = [...selectedValues, id];
        }

        if (!isControlledValue) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [disabled, options, selectedValues, maxSelections, isControlledValue, onChange]
    );

    const removeValue = React.useCallback(
      (id: string) => {
        if (disabled) return;

        const newValue = selectedValues.filter((v) => v !== id);
        if (!isControlledValue) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [disabled, selectedValues, isControlledValue, onChange]
    );

    const toggleAll = React.useCallback(() => {
      if (disabled) return;
      const selectableIds = selectableOptions.map((o) => o.id);
      let newValue: string[];
      if (allSelected) {
        newValue = selectedValues.filter((v) => !selectableIds.includes(v));
      } else {
        const set = new Set([...selectedValues, ...selectableIds]);
        newValue = Array.from(set);
      }
      if (!isControlledValue) setInternalValue(newValue);
      onChange?.(newValue);
    }, [disabled, selectableOptions, allSelected, selectedValues, isControlledValue, onChange]);

    const totalNavigableCount = (effectiveShowSelectAll ? 1 : 0) + navigableOptions.length;

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

        const offset = effectiveShowSelectAll ? 1 : 0;

        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            setFocusedIndex((prev) =>
              prev + 1 >= totalNavigableCount ? 0 : prev + 1
            );
            break;

          case 'ArrowUp':
            event.preventDefault();
            setFocusedIndex((prev) =>
              prev - 1 < 0 ? totalNavigableCount - 1 : prev - 1
            );
            break;

          case 'Home':
            event.preventDefault();
            setFocusedIndex(0);
            break;

          case 'End':
            event.preventDefault();
            setFocusedIndex(totalNavigableCount - 1);
            break;

          case 'Enter':
          case ' ':
            event.preventDefault();
            if (effectiveShowSelectAll && focusedIndex === 0) {
              toggleAll();
            } else if (focusedIndex >= offset && focusedIndex < totalNavigableCount) {
              const option = navigableOptions[focusedIndex - offset];
              toggleValue(option.id);
            }
            break;

          case 'Escape':
            event.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
            break;
        }
      },
      [isOpen, navigableOptions, focusedIndex, toggleValue, toggleAll, setOpen, effectiveShowSelectAll, totalNavigableCount]
    );

    const renderSelectedValue = () => {
      if (selectedOptions.length === 0) {
        return <span className="text-hint">{placeholder}</span>;
      }

      if (variant === 'tags') {
        const shouldCollapse = maxVisibleTags !== undefined && selectedOptions.length > maxVisibleTags;
        const visibleOptions = shouldCollapse ? selectedOptions.slice(0, maxVisibleTags) : selectedOptions;
        const hiddenCount = selectedOptions.length - visibleOptions.length;

        const getOverflowLabel = () => {
          if (typeof overflowText === 'function') {
            return overflowText(hiddenCount, selectedOptions.length);
          }
          if (typeof overflowText === 'string') {
            return overflowText.replace('{hiddenCount}', String(hiddenCount)).replace('{totalCount}', String(selectedOptions.length));
          }
          return `+${hiddenCount} more`;
        };

        return (
          <div className="flex flex-wrap ds-gap-4 items-center">
            {visibleOptions.map((option) => (
              <Badge
                key={option.id}
                size="sm"
                color="neutral"
                border
                label={option.label}
                closeIcon={!disabled}
                onClose={disabled ? undefined : () => removeValue(option.id)}
              />
            ))}
            {shouldCollapse && hiddenCount > 0 && (
              <span className={cn('size-sm font-body', disabled ? 'text-hint' : 'text-muted')}>
                {getOverflowLabel()}
              </span>
            )}
          </div>
        );
      }

      if (selectedOptions.length === 1) {
        const option = selectedOptions[0];
        if (variant === 'avatar' && option.avatarSrc) {
          return (
            <div className="flex items-center ds-gap-6">
              <Avatar variant="userpic" size="2xs" src={option.avatarSrc} alt={option.label} />
              <span
                className={cn('truncate', disabled ? 'text-hint' : 'text-default')}
              >
                {option.label}
              </span>
            </div>
          );
        }
        return (
          <span
            className={cn('truncate', disabled ? 'text-hint' : 'text-default')}
          >
            {option.label}
          </span>
        );
      }

      const displayText =
        typeof selectedText === 'function'
          ? selectedText(selectedOptions.length)
          : selectedText ?? `${selectedOptions.length} selected`;

      return (
        <span className={cn('truncate', disabled ? 'text-hint' : 'text-default')}>
          {displayText}
        </span>
      );
    };

    const triggerClassName = cn(
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
      'focus:outline-none',
      variant === 'tags' && 'overflow-hidden'
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
        <div ref={ref} onKeyDown={handleKeyDown}>
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

                <div
                  className={cn(
                    'flex-1 min-w-0 text-left',
                    variant === 'tags' && 'flex items-center'
                  )}
                >
                  {renderSelectedValue()}
                </div>

                <Icon
                  iconType={['arrows', 'expand-up-down']}
                  size={sizeConfig.iconSize}
                  color={iconColor}
                  className="flex-shrink-0"
                />
              </button>
            </PopoverPrimitive.Trigger>

            <PopoverPrimitive.Portal>
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
                style={{
                  width: 'var(--radix-popover-trigger-width)',
                }}
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
                          setSearchQuery(e.target.value);
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

                <div
                  role="listbox"
                  aria-multiselectable="true"
                  aria-label={label || 'Options'}
                  className="padding-y-4 overflow-y-auto overflow-x-hidden"
                  style={{
                    maxHeight:
                      typeof maxHeight === 'number'
                        ? `${maxHeight}px`
                        : maxHeight,
                  }}
                >
                  {filteredOptions.length > 0 ? (
                    <>
                      {effectiveShowSelectAll && (
                        <>
                          <div className="flex w-full padding-x-4">
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
                                  <div
                                    className="absolute flex items-center justify-center"
                                    style={{ inset: '1px' }}
                                  >
                                    <svg
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      {allSelected ? (
                                        <path
                                          d="M1 4L3 6L7 2"
                                          stroke="#FFFFFF"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      ) : (
                                        <path
                                          d="M1.5 4H6.5"
                                          stroke="#FFFFFF"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                        />
                                      )}
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0 padding-x-4">
                                <span
                                  className={cn(
                                    'font-body',
                                    MENU_ITEM_SIZE_CONFIG.default.text,
                                    'text-default truncate'
                                  )}
                                >
                                  {selectAllLabel}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="margin-x-4 margin-y-4 height-1 bg-muted" />
                        </>
                      )}
                      {filteredOptions.map((option) => {
                        const navIndex = navigableOptions.findIndex(
                          (nav) => nav.id === option.id
                        );
                        const adjustedFocusedIndex = effectiveShowSelectAll
                          ? navIndex + 1 === focusedIndex
                          : navIndex === focusedIndex;
                        return (
                          <MultiSelectItem
                            key={option.id}
                            option={option}
                            selected={selectedValues.includes(option.id)}
                            focused={adjustedFocusedIndex}
                            disabled={option.disabled}
                            variant={variant}
                            onToggle={() => toggleValue(option.id)}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <div className="flex items-center justify-center padding-y-8 text-muted size-sm font-body">
                      {noResultsText}
                    </div>
                  )}
                </div>
              </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
          </PopoverPrimitive.Root>
        </div>
      </InputWrapper>
    );
  }
);
MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
