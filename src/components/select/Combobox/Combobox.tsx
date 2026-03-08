import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '@/lib/utils';
import { InputWrapper } from '../../input/shared/InputWrapper';
import { Icon, parseIconTypeWithFill } from '../../icons/Icon';
import { Avatar } from '../../avatar/Avatar';
import { Badge } from '../../badge/Badge';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  MENU_ITEM_SIZE_CONFIG,
} from '@/constants/select/Select/Select.constants';
import type {
  ComboboxProps,
  ComboboxOption,
  DefaultComboboxProps,
  AvatarComboboxProps,
  TagsComboboxProps,
} from './Combobox.types';

// ============================================================================
// highlightText helper
// ============================================================================

const highlightText = (text: string, searchTerm: string): React.ReactNode => {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} className="bg-transparent font-bold text-default">{part}</mark>
      : part
  );
};

// ============================================================================
// ComboboxItem (internal)
// ============================================================================

interface ComboboxItemProps {
  option: ComboboxOption;
  selected: boolean;
  variant: 'default' | 'avatar' | 'tags';
  onSelect: () => void;
  searchTerm?: string;
  highlightSearch?: boolean;
}

const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  ({ option, selected, variant, onSelect, searchTerm, highlightSearch = true }, ref) => {
    const sizeConfig = option.description
      ? MENU_ITEM_SIZE_CONFIG.large
      : MENU_ITEM_SIZE_CONFIG.default;

    const iconColor = option.iconColor
      ?? (option.disabled ? 'var(--icon-default-disabled)' : 'var(--icon-default)');

    const renderCheckbox = () => {
      if (variant !== 'tags') return null;

      return (
        <div
          className={cn(
            'relative width-16 height-16 rounded-default overflow-hidden flex-shrink-0 transition-colors',
            option.disabled
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
                  stroke={option.disabled ? 'var(--icon-default-disabled)' : '#FFFFFF'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      );
    };

    const renderCheckIcon = () => {
      if (variant === 'tags') return null;

      return (
        <span className="flex width-20 height-20 items-center justify-center flex-shrink-0">
          {selected && (
            <Icon
              iconType={['system', 'check']}
              size={16}
              color="var(--icon-primary)"
            />
          )}
        </span>
      );
    };

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
      <CommandPrimitive.Item
        ref={ref}
        value={option.id}
        disabled={option.disabled}
        onSelect={onSelect}
        className={cn(
          'flex w-full padding-x-4 outline-none',
          !option.disabled && [
            'cursor-pointer',
            'hover:bg-[var(--bg-state-ghost-hover)]',
            'aria-selected:bg-[var(--bg-state-ghost-hover)]',
          ]
        )}
      >
        <div
          className={cn(
            'flex items-center w-full rounded-xs transition-colors duration-150',
            sizeConfig.height,
            sizeConfig.padding,
            sizeConfig.gap,
            option.disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {renderCheckbox()}
          {renderCheckIcon()}
          {renderLeadContent()}

          {option.description ? (
            <div className="flex flex-col flex-1 min-w-0 padding-x-4 ds-gap-1">
              <span
                className={cn(
                  'font-body',
                  sizeConfig.text,
                  option.disabled ? 'text-hint' : 'text-default',
                  'flex-1 truncate'
                )}
              >
                {highlightSearch && searchTerm ? highlightText(option.label, searchTerm) : option.label}
              </span>
              <span
                className={cn(
                  'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight truncate',
                  option.disabled ? 'text-hint' : 'text-muted'
                )}
              >
                {highlightSearch && searchTerm && option.description
                  ? highlightText(option.description, searchTerm)
                  : option.description}
              </span>
            </div>
          ) : (
            <div className="flex-1 min-w-0 padding-x-4">
              <span
                className={cn(
                  'font-body block',
                  sizeConfig.text,
                  option.disabled ? 'text-hint' : 'text-default',
                  'truncate'
                )}
              >
                {highlightSearch && searchTerm ? highlightText(option.label, searchTerm) : option.label}
              </span>
            </div>
          )}

          {option.badge && (
            <Badge size="sm" color="neutral" border label={option.badge} />
          )}
        </div>
      </CommandPrimitive.Item>
    );
  }
);
ComboboxItem.displayName = 'ComboboxItem';

// ============================================================================
// Combobox Component
// ============================================================================

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (props, ref) => {
    const {
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
      placeholder = 'Search...',
      options,
      noResultsText,
      emptyStateTitle = 'No search results',
      emptyStateDescription = 'Your search did not match any results.',
      creatable = false,
      createText,
      open: controlledOpen,
      onOpenChange,
      maxHeight = 300,
      width,
      className,
      highlightSearch = true,
      filterFunction,
      tailIcon,
    } = props;

    const comboboxId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isEditing, setIsEditing] = React.useState(false);
    const [canScrollUp, setCanScrollUp] = React.useState(false);
    const [canScrollDown, setCanScrollDown] = React.useState(false);

    const isControlledOpen = controlledOpen !== undefined;
    const isOpen = isControlledOpen ? controlledOpen : internalOpen;

    const isTagsVariant = variant === 'tags';
    const tagsProps = props as TagsComboboxProps;
    const singleProps = props as DefaultComboboxProps | AvatarComboboxProps;

    const selectedValues: string[] = React.useMemo(() => {
      if (isTagsVariant) {
        return tagsProps.value ?? [];
      }
      return singleProps.value ? [singleProps.value] : [];
    }, [isTagsVariant, tagsProps.value, singleProps.value]);

    const selectedOptions = React.useMemo(() => {
      return options.filter((opt) => selectedValues.includes(opt.id));
    }, [options, selectedValues]);

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

    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        if (disabled) return;

        if (!isControlledOpen) {
          setInternalOpen(newOpen);
        }
        if (!newOpen) {
          setInputValue('');
          setIsEditing(false);
        }
        onOpenChange?.(newOpen);
      },
      [disabled, isControlledOpen, onOpenChange]
    );

    const handleSelect = React.useCallback(
      (optionId: string) => {
        if (disabled) return;

        const option = options.find((o) => o.id === optionId);
        if (!option || option.disabled) return;

        if (isTagsVariant) {
          const currentValues = tagsProps.value ?? [];
          let newValues: string[];

          if (currentValues.includes(optionId)) {
            newValues = currentValues.filter((v) => v !== optionId);
          } else {
            if (tagsProps.maxSelections && currentValues.length >= tagsProps.maxSelections) {
              return;
            }
            newValues = [...currentValues, optionId];
          }

          tagsProps.onChange?.(newValues);
        } else {
          singleProps.onChange?.(optionId);
          setOpen(false);
        }

        setInputValue('');
      },
      [disabled, options, isTagsVariant, tagsProps, singleProps, setOpen]
    );

    const handleCreate = React.useCallback(() => {
      if (!creatable || !inputValue.trim()) return;

      if (isTagsVariant) {
        tagsProps.onCreate?.(inputValue.trim());
      } else {
        singleProps.onCreate?.(inputValue.trim());
      }

      setInputValue('');
      if (!isTagsVariant) {
        setOpen(false);
      }
    }, [creatable, inputValue, isTagsVariant, tagsProps, singleProps, setOpen]);

    const removeTag = React.useCallback(
      (id: string) => {
        if (disabled || !isTagsVariant) return;

        const currentValues = tagsProps.value ?? [];
        const newValues = currentValues.filter((v) => v !== id);
        tagsProps.onChange?.(newValues);
      },
      [disabled, isTagsVariant, tagsProps]
    );

    const getCreateText = () => {
      if (typeof createText === 'function') {
        return createText(inputValue);
      }
      if (typeof createText === 'string') {
        return createText.replace('{value}', inputValue);
      }
      return `Add "${inputValue}"`;
    };

    const filteredOptions = React.useMemo(() => {
      if (!inputValue.trim()) {
        return options;
      }
      if (filterFunction) {
        return options.filter((option) => filterFunction(option, inputValue));
      }
      const searchLower = inputValue.toLowerCase().trim();
      return options.filter((option) => {
        const label = option.label.toLowerCase();
        const desc = option.description?.toLowerCase() ?? '';
        return label.includes(searchLower) || desc.includes(searchLower);
      });
    }, [options, inputValue, filterFunction]);

    const updateScrollButtons = React.useCallback(() => {
      const el = listRef.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 1);
    }, []);

    React.useEffect(() => {
      if (isOpen) {
        requestAnimationFrame(updateScrollButtons);
      }
    }, [isOpen, filteredOptions, updateScrollButtons]);

    const handleScrollUp = () => {
      const el = listRef.current;
      if (el) {
        el.scrollBy({ top: -100, behavior: 'smooth' });
      }
    };

    const handleScrollDown = () => {
      const el = listRef.current;
      if (el) {
        el.scrollBy({ top: 100, behavior: 'smooth' });
      }
    };

    const showCreateOption = creatable && inputValue.trim() && !options.some(
      (opt) => opt.label.toLowerCase() === inputValue.trim().toLowerCase()
    );

    const renderSelectedValue = () => {
      if (isTagsVariant) {
        if (selectedOptions.length === 0) {
          return null;
        }

        const maxVisibleTags = tagsProps.maxVisibleTags;
        const overflowText = tagsProps.overflowText;
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
                onClose={disabled ? undefined : () => removeTag(option.id)}
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

      return null;
    };

    const triggerClassName = cn(
      'flex w-full items-center justify-between whitespace-nowrap transition-colors duration-150',
      sizeConfig.minHeight,
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
      disabled ? 'cursor-not-allowed' : 'cursor-text',
      'focus-within:outline-none',
      isTagsVariant && 'flex-wrap min-h-auto'
    );

    const handleTriggerClick = () => {
      if (disabled) return;

      setIsEditing(true);
      if (!isOpen) {
        setOpen(true);
      }
      inputRef.current?.focus();
    };

    const renderEmptyState = () => {
      if (noResultsText !== undefined) {
        return (
          <div className="flex items-center justify-center padding-y-24 text-muted size-sm font-body">
            {noResultsText}
          </div>
        );
      }

      return (
        <div className="flex flex-col items-center padding-24 ds-gap-12">
          <Icon
            iconType={['system', 'search']}
            size={40}
            color="default-muted"
          />
          <div className="flex flex-col items-center ds-gap-4 text-center">
            <span className="font-body size-sm line-height-leading-5 font-medium text-subtle">
              {emptyStateTitle}
            </span>
            <span className="font-body size-xs line-height-leading-4 text-muted">
              {emptyStateDescription}
            </span>
          </div>
        </div>
      );
    };

    return (
      <InputWrapper
        label={label}
        inputId={comboboxId}
        required={required}
        supportText={supportText}
        caption={caption}
        error={error}
        success={success}
        width={width}
        className={className}
      >
        <div ref={ref}>
          <CommandPrimitive
            shouldFilter={false}
            onKeyDown={(e) => {
              if (disabled) return;

              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                if (!isOpen) {
                  e.preventDefault();
                  setOpen(true);
                }
              } else if (e.key === 'Escape') {
                if (isOpen) {
                  e.preventDefault();
                  setOpen(false);
                }
              }
            }}
          >
            <PopoverPrimitive.Root open={isOpen} onOpenChange={setOpen}>
              <PopoverPrimitive.Anchor asChild>
                <div
                  ref={triggerRef}
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-haspopup="listbox"
                  aria-disabled={disabled}
                  className={triggerClassName}
                  onClick={handleTriggerClick}
                >
                  {!isTagsVariant && selectedOptions.length === 0 && (
                    <div className="flex items-center ds-gap-6 flex-shrink-0">
                      <Icon
                        iconType={['system', 'search']}
                        size={16}
                        color="default-muted"
                      />
                    </div>
                  )}

                  {renderSelectedValue()}

                  {!isTagsVariant && selectedOptions.length === 1 && !isEditing && (
                    <div className="flex items-center ds-gap-6 flex-1 min-w-0">
                      {variant === 'avatar' && selectedOptions[0].avatarSrc && (
                        <Avatar
                          variant="userpic"
                          size="2xs"
                          src={selectedOptions[0].avatarSrc}
                          alt={selectedOptions[0].label}
                        />
                      )}
                      <span className={cn('truncate', disabled ? 'text-hint' : 'text-default')}>
                        {selectedOptions[0].label}
                      </span>
                    </div>
                  )}

                  <CommandPrimitive.Input
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={(value) => {
                      setInputValue(value);
                      if (!isOpen) {
                        setOpen(true);
                      }
                    }}
                    onFocus={() => {
                      if (!disabled) {
                        setIsEditing(true);
                        if (!isOpen) {
                          setOpen(true);
                        }
                      }
                    }}
                    placeholder={selectedOptions.length === 0 || isEditing ? placeholder : ''}
                    disabled={disabled}
                    className={cn(
                      'bg-transparent border-none outline-none',
                      sizeConfig.text,
                      'font-body text-default placeholder:text-hint',
                      disabled && 'cursor-not-allowed',
                      !isTagsVariant && selectedOptions.length === 1 && !isEditing
                        ? 'absolute opacity-0 [width:0] [height:0]'
                        : 'flex-1 min-w-[60px]'
                    )}
                    id={comboboxId}
                  />

                  {tailIcon && (() => {
                    const { iconType, isFill } = parseIconTypeWithFill(tailIcon);
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

                  <Icon
                    iconType={['arrows', 'expand-up-down']}
                    size={sizeConfig.iconSize}
                    color={iconColor}
                    className="flex-shrink-0"
                  />
                </div>
              </PopoverPrimitive.Anchor>

              <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                  align="start"
                  sideOffset={4}
                  collisionPadding={8}
                  onOpenAutoFocus={(e) => {
                    e.preventDefault();
                    inputRef.current?.focus();
                  }}
                  onInteractOutside={(e) => {
                    const target = e.target as Node;
                    if (triggerRef.current?.contains(target)) {
                      e.preventDefault();
                    }
                  }}
                  onFocusOutside={(e) => {
                    const target = e.target as Node;
                    if (triggerRef.current?.contains(target)) {
                      e.preventDefault();
                    }
                  }}
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
                  {filteredOptions.length === 0 ? (
                    renderEmptyState()
                  ) : (
                    <div
                      ref={listRef}
                      className="overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden"
                      style={{
                        maxHeight,
                        scrollbarWidth: 'none',
                      }}
                      onScroll={updateScrollButtons}
                    >
                      {canScrollUp && (
                        <button
                          type="button"
                          onClick={handleScrollUp}
                          className="sticky top-0 z-10 flex w-full cursor-default items-center justify-center padding-y-4 bg-card"
                        >
                          <Icon iconType={['arrows', 'arrow-drop-up']} size={16} color="default-muted" />
                        </button>
                      )}
                      <div className="padding-4">
                        <CommandPrimitive.List>
                          {filteredOptions.map((option) => (
                            <ComboboxItem
                              key={option.id}
                              option={option}
                              selected={selectedValues.includes(option.id)}
                              variant={variant}
                              onSelect={() => handleSelect(option.id)}
                              searchTerm={inputValue}
                              highlightSearch={highlightSearch}
                            />
                          ))}
                        </CommandPrimitive.List>
                      </div>
                      {canScrollDown && (
                        <button
                          type="button"
                          onClick={handleScrollDown}
                          className="sticky bottom-0 z-10 flex w-full cursor-default items-center justify-center padding-y-4 bg-card"
                        >
                          <Icon iconType={['arrows', 'arrow-drop-down']} size={16} color="default-muted" />
                        </button>
                      )}
                    </div>
                  )}

                  {showCreateOption && (
                    <div className="border-t border-default">
                      <button
                        type="button"
                        onClick={handleCreate}
                        className={cn(
                          'flex items-center w-full height-36 padding-x-8 ds-gap-6',
                          'bg-transparent hover:bg-state-ghost-hover transition-colors cursor-pointer',
                          'outline-none focus:bg-state-ghost-hover'
                        )}
                      >
                        <Icon iconType={['system', 'add']} size={16} color="default-muted" />
                        <span className="flex-1 text-left size-sm font-body text-default">
                          {getCreateText()}
                        </span>
                        <Icon iconType={['arrows', 'arrow-drop-right']} size={16} color="default-muted" />
                      </button>
                    </div>
                  )}
                </PopoverPrimitive.Content>
              </PopoverPrimitive.Portal>
            </PopoverPrimitive.Root>
          </CommandPrimitive>
        </div>
      </InputWrapper>
    );
  }
);

Combobox.displayName = 'Combobox';
