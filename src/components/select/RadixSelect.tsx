import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/lib/utils';
import { InputWrapper } from '../input/shared/InputWrapper';
import { Icon, parseIconTypeWithFill } from '../icons/Icon';
import { Avatar } from '../avatar/Avatar';
import { Badge } from '../badge/Badge';
import type {
  SelectTriggerProps,
  SelectContentProps,
  ExtendedSelectItemProps,
  ExtendedSelectProps,
  SelectOption,
} from './Select.types';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  MENU_ITEM_SIZE_CONFIG,
} from '@/constants/select/Select/Select.constants';

// ============================================================================
// SVG Icons for Checkbox/Radio indicators
// ============================================================================

const SelectCheckIcon = ({ color = 'currentColor' }: { color?: string }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 4L3 6L7 2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SelectRadioDot = ({ color = 'currentColor' }: { color?: string }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" fill={color} />
  </svg>
);

// ============================================================================
// Primitive Re-exports
// ============================================================================

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

// ============================================================================
// SelectTrigger
// ============================================================================

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    {
      className,
      children,
      size = 'sm',
      selectStyle = 'default',
      state = 'default',
      leadIcon,
      ...props
    },
    ref
  ) => {
    const sizeConfig = SIZE_CONFIG[size];
    const styleConfig = STYLE_CONFIG[selectStyle];
    const isDisabled = state === 'disabled';

    const iconColor = isDisabled
      ? 'default-disabled'
      : state === 'error'
        ? 'destructive'
        : state === 'success'
          ? 'success'
          : 'default-subtle';

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex w-full items-center justify-between whitespace-nowrap transition-colors duration-150',
          sizeConfig.container,
          leadIcon ? sizeConfig.paddingWithLeadIcon : sizeConfig.padding,
          sizeConfig.gap,
          sizeConfig.text,
          'font-body',
          styleConfig.base,
          !isDisabled && styleConfig.focus,
          state === 'error' && 'border-destructive',
          state === 'success' && 'border-success',
          isDisabled && STATE_CONFIG.disabled.bg,
          isDisabled && STATE_CONFIG.disabled.border,
          isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
          'data-[placeholder]:text-hint',
          'focus:outline-none',
          '[&>span]:line-clamp-1 [&>span]:text-left',
          className
        )}
        {...props}
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
        <span className="flex-1 min-w-0">{children}</span>
        <SelectPrimitive.Icon asChild>
          <Icon
            iconType={['arrows', 'expand-up-down']}
            size={sizeConfig.iconSize}
            color={iconColor}
            className="flex-shrink-0"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// ============================================================================
// SelectScrollUpButton
// ============================================================================

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'sticky top-0 z-10 flex cursor-default items-center justify-center padding-y-4 bg-card',
      className
    )}
    {...props}
  >
    <Icon iconType={['arrows', 'arrow-drop-up']} size={16} color="default-muted" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

// ============================================================================
// SelectScrollDownButton
// ============================================================================

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'sticky bottom-0 z-10 flex cursor-default items-center justify-center padding-y-4 bg-card',
      className
    )}
    {...props}
  >
    <Icon iconType={['arrows', 'arrow-drop-down']} size={16} color="default-muted" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

// ============================================================================
// SelectContent
// ============================================================================

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = 'popper', sideOffset = 4, maxHeight, header, ...props }, ref) => {
  const maxHeightValue = maxHeight
    ? typeof maxHeight === 'number'
      ? `${maxHeight}px`
      : maxHeight
    : 'var(--radix-select-content-available-height)';

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={8}
        className={cn(
          'relative z-[100] min-w-[128px] overflow-y-auto',
          'bg-card border-default rounded-lg shadow-modal-sm',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'origin-[--radix-select-content-transform-origin]',
          position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        style={{ maxHeight: maxHeightValue }}
        {...props}
      >
        {header && (
          <div className="sticky top-0 z-20 bg-card">
            {header}
          </div>
        )}
        <SelectScrollUpButton className={header ? 'top-[37px]' : undefined} />
        <SelectPrimitive.Viewport
          className={cn(
            'padding-4',
            position === 'popper' && 'w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

// ============================================================================
// SelectLabel
// ============================================================================

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'padding-x-8 padding-y-6 size-sm font-body font-semibold',
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

// ============================================================================
// SelectItem (Simple - matches shadcn structure for proper keyboard navigation)
// ============================================================================

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'flex w-full cursor-pointer select-none items-center rounded-sm',
      'padding-6 ds-gap-6',
      'size-sm font-body line-height-leading-5',
      'outline-none',
      'hover:bg-[var(--bg-state-ghost-hover)]',
      'data-[highlighted]:bg-[var(--bg-state-ghost-hover)]',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
      className
    )}
    {...props}
  >
    <span className="flex width-20 height-20 items-center justify-center flex-shrink-0">
      <SelectPrimitive.ItemIndicator>
        <Icon
          iconType={['system', 'check']}
          size={16}
          color="primary"
        />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// ============================================================================
// ExtendedSelectItem (With avatar, icons, descriptions, badges)
// ============================================================================

const ExtendedSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  ExtendedSelectItemProps
>(
  (
    {
      className,
      children,
      selectType = 'default',
      leadIcon,
      iconColor: iconColorProp,
      description,
      badge,
      avatarSrc,
      disabled,
      isSelected,
      ...props
    },
    ref
  ) => {
    const sizeConfig = description
      ? MENU_ITEM_SIZE_CONFIG.large
      : MENU_ITEM_SIZE_CONFIG.default;

    const iconColor = iconColorProp
      ?? (disabled ? 'var(--icon-default-disabled)' : 'var(--icon-default)');

    const renderIndicator = () => {
      const checkIconColor = disabled ? 'var(--icon-default-disabled)' : 'var(--icon-white-default, #FFF)';

      if (selectType === 'checkbox') {
        return (
          <span className="flex width-20 height-20 items-center justify-center flex-shrink-0">
            <span
              className={cn(
                'flex items-center justify-center width-16 height-16 rounded-default transition-colors',
                disabled
                  ? 'bg-checkbox-disabled border-default'
                  : isSelected
                    ? 'bg-checkbox-active border-none'
                    : 'bg-checkbox-default border-darker'
              )}
            >
              {isSelected && <SelectCheckIcon color={checkIconColor} />}
            </span>
          </span>
        );
      }

      if (selectType === 'radio') {
        return (
          <span className="flex width-20 height-20 items-center justify-center flex-shrink-0">
            <span
              className={cn(
                'flex items-center justify-center width-16 height-16 rounded-full transition-colors',
                disabled
                  ? 'bg-checkbox-disabled border-default'
                  : isSelected
                    ? 'bg-checkbox-active border-none'
                    : 'bg-checkbox-default border-darker'
              )}
            >
              {isSelected && <SelectRadioDot color={checkIconColor} />}
            </span>
          </span>
        );
      }

      return (
        <span className="flex width-20 height-20 items-center justify-center flex-shrink-0">
          <SelectPrimitive.ItemIndicator>
            <Icon
              iconType={['system', 'check']}
              size={16}
              color={disabled ? 'default-disabled' : 'primary'}
            />
          </SelectPrimitive.ItemIndicator>
        </span>
      );
    };

    const renderLeadContent = () => {
      if (avatarSrc) {
        return (
          <Avatar
            variant="userpic"
            size={description ? 'sm' : '2xs'}
            src={avatarSrc}
            alt={typeof children === 'string' ? children : ''}
            className="flex-shrink-0"
          />
        );
      }

      if (leadIcon) {
        const { iconType, isFill } = parseIconTypeWithFill(leadIcon);
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

    const renderTrailContent = () => {
      if (badge) {
        return (
          <Badge size="sm" color="neutral" border label={badge} />
        );
      }

      return null;
    };

    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          'group flex w-full select-none items-center rounded-sm outline-none',
          sizeConfig.height,
          sizeConfig.padding,
          sizeConfig.gap,
          'font-body',
          sizeConfig.text,
          disabled ? 'text-hint cursor-not-allowed' : 'text-default cursor-pointer',
          'hover:bg-[var(--bg-state-ghost-hover)]',
          'data-[highlighted]:bg-[var(--bg-state-ghost-hover)]',
          'data-[disabled]:pointer-events-none data-[disabled]:text-hint',
          isSelected && (selectType === 'checkbox' || selectType === 'radio') && 'bg-[var(--bg-state-ghost-hover)]',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {renderIndicator()}
        {renderLeadContent()}
        <SelectPrimitive.ItemText className="flex-1 min-w-0">
          {description ? (
            <div className="flex flex-col ds-gap-1">
              <span className="truncate">{children}</span>
              <span
                className={cn(
                  'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight truncate',
                  disabled ? 'text-hint' : 'text-muted'
                )}
              >
                {description}
              </span>
            </div>
          ) : (
            <span className="truncate">{children}</span>
          )}
        </SelectPrimitive.ItemText>
        {renderTrailContent()}
      </SelectPrimitive.Item>
    );
  }
);
ExtendedSelectItem.displayName = 'ExtendedSelectItem';

// ============================================================================
// SelectSeparator
// ============================================================================

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-margin-x-4 margin-y-4 height-1 bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// ============================================================================
// Extended Select Component (Unified with all custom features)
// ============================================================================

const ExtendedSelect = React.forwardRef<HTMLDivElement, ExtendedSelectProps>(
  (
    {
      variant = 'default',
      selectStyle = 'default',
      size = 'sm',
      selectType = 'default',
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
      value,
      onChange,
      defaultValue,
      open,
      onOpenChange,
      searchable = false,
      searchPlaceholder = 'Search...',
      noResultsText = 'No results found',
      maxHeight = 300,
      width,
      minWidth,
      className,
      clearable = false,
      loading = false,
      optionGroups,
      renderOption,
    },
    ref
  ) => {
    const selectId = React.useId();
    const [searchQuery, setSearchQuery] = React.useState('');
    const searchInputRef = React.useRef<HTMLInputElement>(null);

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

    const selectedOption = React.useMemo(() => {
      return options.find((opt) => opt.id === value);
    }, [options, value]);

    const handleOpenChange = React.useCallback(
      (isOpen: boolean) => {
        if (!isOpen) {
          setSearchQuery('');
        }
        onOpenChange?.(isOpen);
      },
      [onOpenChange]
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onChange?.('');
      },
      [onChange]
    );

    const renderSingleOption = (option: SelectOption) => {
      const isSelected = option.id === value;
      if (renderOption) {
        return (
          <SelectPrimitive.Item
            key={option.id}
            value={option.id}
            textValue={option.label}
            className={cn(
              'flex w-full select-none items-center rounded-sm outline-none',
              'padding-6',
              'hover:bg-[var(--bg-state-ghost-hover)]',
              'data-[highlighted]:bg-[var(--bg-state-ghost-hover)]',
              option.disabled && 'pointer-events-none opacity-50 cursor-not-allowed',
              !option.disabled && 'cursor-pointer'
            )}
            disabled={option.disabled}
          >
            <SelectPrimitive.ItemText className="sr-only">{option.label}</SelectPrimitive.ItemText>
            {renderOption(option, isSelected)}
          </SelectPrimitive.Item>
        );
      }
      return (
        <ExtendedSelectItem
          key={option.id}
          value={option.id}
          textValue={option.label}
          selectType={selectType}
          leadIcon={option.leadIcon}
          iconColor={option.iconColor}
          description={option.description}
          badge={option.badge}
          avatarSrc={variant === 'avatar' ? option.avatarSrc : undefined}
          disabled={option.disabled}
          isSelected={isSelected}
        >
          {option.label}
        </ExtendedSelectItem>
      );
    };

    const renderOptions = () => {
      if (loading) {
        return (
          <div className="flex items-center justify-center padding-y-16">
            <div className="width-16 height-16 border-2 border-default border-t-transparent rounded-full motion-safe:animate-spin" />
          </div>
        );
      }

      if (filteredOptions.length === 0) {
        return (
          <div className="flex items-center justify-center padding-y-8 text-muted size-sm font-body">
            {noResultsText}
          </div>
        );
      }

      if (optionGroups && optionGroups.length > 0) {
        const ungroupedOptionIds = new Set(
          optionGroups.flatMap((g) => g.optionIds)
        );
        const ungroupedOptions = filteredOptions.filter(
          (opt) => !ungroupedOptionIds.has(opt.id)
        );

        return (
          <>
            {optionGroups.map((group) => {
              const groupOptions = filteredOptions.filter((opt) =>
                group.optionIds.includes(opt.id)
              );
              if (groupOptions.length === 0) return null;
              return (
                <SelectPrimitive.Group key={group.label}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {groupOptions.map(renderSingleOption)}
                </SelectPrimitive.Group>
              );
            })}
            {ungroupedOptions.map(renderSingleOption)}
          </>
        );
      }

      return filteredOptions.map(renderSingleOption);
    };

    const renderSelectedValue = () => {
      if (!selectedOption) {
        return placeholder;
      }

      if (variant === 'avatar' && selectedOption.avatarSrc) {
        return (
          <div className="flex items-center ds-gap-6">
            <Avatar
              variant="userpic"
              size="2xs"
              src={selectedOption.avatarSrc}
              alt={selectedOption.label}
            />
            <span
              className={cn('truncate', disabled ? 'text-hint' : 'text-default')}
            >
              {selectedOption.label}
            </span>
          </div>
        );
      }

      return (
        <span className={cn('truncate', disabled ? 'text-hint' : 'text-default')}>
          {selectedOption.label}
        </span>
      );
    };

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
        <div ref={ref} className="relative" style={minWidth ? { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth } : undefined}>
          <Select
            value={value}
            onValueChange={onChange}
            defaultValue={defaultValue}
            open={open}
            onOpenChange={handleOpenChange}
            disabled={disabled}
          >
            <SelectTrigger
              id={selectId}
              size={size}
              selectStyle={selectStyle}
              state={state}
              leadIcon={leadIcon}
            >
              {value ? (
                renderSelectedValue()
              ) : (
                <SelectValue placeholder={placeholder} />
              )}
            </SelectTrigger>
            {clearable && value && !disabled && (
              <button
                type="button"
                aria-label="Clear selection"
                onClick={handleClear}
                className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center justify-center width-16 height-16 text-muted hover:text-default z-10"
              >
                <Icon iconType={['system', 'close']} size={12} />
              </button>
            )}
            <SelectContent
              maxHeight={maxHeight}
              header={
                searchable ? (
                  <div className="border-b border-default">
                    <div className="flex items-center ds-gap-2 padding-x-8 height-36">
                      <div className="flex items-center justify-center width-20 height-20 flex-shrink-0">
                        <Icon iconType={['system', 'search']} size={16} color="default-muted" />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        role="searchbox"
                        aria-label={searchPlaceholder || 'Search options'}
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setTimeout(() => searchInputRef.current?.focus(), 0);
                        }}
                        placeholder={searchPlaceholder}
                        className="flex-1 bg-transparent border-none outline-none size-sm line-height-leading-5 letter-spacing-tracking-tight font-body text-default placeholder:text-hint"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
                            return;
                          }
                          e.stopPropagation();
                        }}
                        autoFocus
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
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
                ) : undefined
              }
            >
              {renderOptions()}
            </SelectContent>
          </Select>
        </div>
      </InputWrapper>
    );
  }
);
ExtendedSelect.displayName = 'ExtendedSelect';

// ============================================================================
// Exports
// ============================================================================

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  ExtendedSelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  ExtendedSelect,
};
