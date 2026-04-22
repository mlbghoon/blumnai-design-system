import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '@/lib/utils';
import { InputWrapper } from '../input/shared/InputWrapper';
import { Icon, parseIconTypeWithFill } from '../icons/Icon';
import { Avatar } from '../avatar/Avatar';
import { Badge } from '../badge/Badge';
import { TooltipTrigger } from '../tooltip/Tooltip/TooltipTrigger';
import { ScrollArea } from '../scroll-area/ScrollArea';
import { usePortalContainer, PortalContainerProvider } from '../../utils/PortalContainerContext';
import type {
  SelectTriggerProps,
  SelectContentProps,
  ExtendedSelectItemProps,
  ExtendedSelectProps,
  SelectOption,
  SelectType,
  SelectVariant,
} from './Select.types';
import { TruncatedText } from './TruncatedText';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  MENU_ITEM_SIZE_CONFIG,
} from '@/constants/select/Select/Select.constants';

// Radix Select는 value=""를 허용하지 않으므로 내부적으로 sentinel 값으로 매핑
const EMPTY_SENTINEL = '__ds_empty__';

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
  SelectTriggerProps & { onClear?: (e: React.MouseEvent) => void; showClear?: boolean }
>(
  (
    {
      className,
      children,
      size = 'sm',
      selectStyle = 'default',
      state = 'default',
      leadIcon,
      tailIcon,
      onClear,
      showClear,
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
          '[&>span]:min-w-0 [&>span]:truncate [&>span]:text-left',
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
        <span className="flex-1 min-w-0 truncate">{children}</span>
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
        {showClear && (
          <button
            type="button"
            aria-label="선택 초기화"
            onClick={onClear}
            className="flex items-center justify-center width-16 height-16 flex-shrink-0 text-muted hover:text-default cursor-pointer"
          >
            <Icon iconType={['system', 'close']} size={12} />
          </button>
        )}
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
>(({ className, children, position = 'popper', sideOffset = 4, maxHeight, header, contentWidth, ...props }, ref) => {
  const contextContainer = usePortalContainer();
  const [contentEl, setContentEl] = React.useState<HTMLElement | null>(null);

  type ContentElement = React.ElementRef<typeof SelectPrimitive.Content>;
  const composedRef = React.useCallback(
    (node: ContentElement | null) => {
      setContentEl(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<ContentElement | null>).current = node;
    },
    [ref]
  );

  const maxHeightValue = maxHeight
    ? typeof maxHeight === 'number'
      ? `${maxHeight}px`
      : maxHeight
    : 'var(--radix-select-content-available-height)';

  const contentWidthValue = contentWidth
    ? typeof contentWidth === 'number'
      ? `${contentWidth}px`
      : contentWidth
    : undefined;

  return (
    <SelectPrimitive.Portal container={contextContainer ?? undefined}>
      <SelectPrimitive.Content
        ref={composedRef}
        sideOffset={sideOffset}
        collisionPadding={8}
        className={cn(
          'relative z-[100] min-w-[128px] overflow-y-auto overflow-x-hidden scrollbar-thin',
          'bg-card rounded-lg shadow-modal-sm',
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
        style={{
          maxHeight: maxHeightValue,
          ...(contentWidthValue ? { width: contentWidthValue, minWidth: contentWidthValue } : {}),
        }}
        {...props}
      >
        <PortalContainerProvider value={contentEl}>
        {header && (
          <div className="sticky top-0 z-20 bg-card">
            {header}
          </div>
        )}
        <SelectScrollUpButton className={header ? 'top-[37px]' : undefined} />
        <SelectPrimitive.Viewport
          className={cn(
            'padding-4',
            position === 'popper' && !contentWidthValue && 'w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
        </PortalContainerProvider>
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
      disableLabelTooltip,
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
        <SelectPrimitive.ItemText className="flex-1 min-w-0 overflow-hidden">
          {description ? (
            <div className="flex flex-col ds-gap-1">
              <TruncatedText
                disableTooltip={disableLabelTooltip}
                tooltipContent={typeof children === 'string' ? children : undefined}
              >
                {children}
              </TruncatedText>
              <TruncatedText
                className={cn(
                  'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight',
                  disabled ? 'text-hint' : 'text-muted'
                )}
                disableTooltip={disableLabelTooltip}
                tooltipContent={description}
              >
                {description}
              </TruncatedText>
            </div>
          ) : (
            <TruncatedText
              disableTooltip={disableLabelTooltip}
              tooltipContent={typeof children === 'string' ? children : undefined}
            >
              {children}
            </TruncatedText>
          )}
        </SelectPrimitive.ItemText>
        {renderTrailContent()}
      </SelectPrimitive.Item>
    );
  }
);
ExtendedSelectItem.displayName = 'ExtendedSelectItem';

// ============================================================================
// SearchableSelectItem — cmdk-based item for searchable mode
// ============================================================================

interface SearchableSelectItemProps {
  option: SelectOption;
  isSelected: boolean;
  selectType: SelectType;
  variant: SelectVariant;
  onSelect: () => void;
  disableLabelTooltip?: boolean;
  className?: string;
}

const SearchableSelectItem = React.forwardRef<HTMLDivElement, SearchableSelectItemProps>(
  (
    {
      option,
      isSelected,
      selectType,
      variant,
      onSelect,
      disableLabelTooltip,
      className,
    },
    ref
  ) => {
    const sizeConfig = option.description
      ? MENU_ITEM_SIZE_CONFIG.large
      : MENU_ITEM_SIZE_CONFIG.default;

    const iconColor = option.iconColor
      ?? (option.disabled ? 'var(--icon-default-disabled)' : 'var(--icon-default)');

    const renderIndicator = () => {
      const checkIconColor = option.disabled
        ? 'var(--icon-default-disabled)'
        : 'var(--icon-white-default, #FFF)';

      if (selectType === 'checkbox') {
        return (
          <span className="flex width-20 height-20 items-center justify-center flex-shrink-0">
            <span
              className={cn(
                'flex items-center justify-center width-16 height-16 rounded-default transition-colors',
                option.disabled
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
                option.disabled
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
          {isSelected && (
            <Icon
              iconType={['system', 'check']}
              size={16}
              color={option.disabled ? 'default-disabled' : 'primary'}
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

    const renderTrailContent = () => {
      if (option.badge) {
        return <Badge size="sm" color="neutral" border label={option.badge} />;
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
          'group flex w-full select-none items-center rounded-sm outline-none',
          sizeConfig.height,
          sizeConfig.padding,
          sizeConfig.gap,
          'font-body',
          sizeConfig.text,
          option.disabled ? 'text-hint cursor-not-allowed' : 'text-default cursor-pointer',
          'hover:bg-[var(--bg-state-ghost-hover)]',
          'aria-selected:bg-[var(--bg-state-ghost-hover)]',
          'data-[disabled]:pointer-events-none data-[disabled]:text-hint',
          isSelected && (selectType === 'checkbox' || selectType === 'radio') && 'bg-[var(--bg-state-ghost-hover)]',
          className
        )}
      >
        {renderIndicator()}
        {renderLeadContent()}
        <div className="flex-1 min-w-0 overflow-hidden">
          {option.description ? (
            <div className="flex flex-col ds-gap-1">
              <TruncatedText
                disableTooltip={disableLabelTooltip}
                tooltipContent={option.label}
              >
                {option.label}
              </TruncatedText>
              <TruncatedText
                className={cn(
                  'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight',
                  option.disabled ? 'text-hint' : 'text-muted'
                )}
                disableTooltip={disableLabelTooltip}
                tooltipContent={option.description}
              >
                {option.description}
              </TruncatedText>
            </div>
          ) : (
            <TruncatedText
              disableTooltip={disableLabelTooltip}
              tooltipContent={option.label}
            >
              {option.label}
            </TruncatedText>
          )}
        </div>
        {renderTrailContent()}
      </CommandPrimitive.Item>
    );
  }
);
SearchableSelectItem.displayName = 'SearchableSelectItem';

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
      tailIcon,
      options,
      value,
      onChange,
      defaultValue,
      open,
      onOpenChange,
      searchable = false,
      searchPlaceholder = '검색...',
      noResultsText = '검색 결과 없음',
      maxHeight = 300,
      contentWidth,
      width,
      minWidth,
      className,
      clearable = false,
      loading = false,
      optionGroups,
      renderOption,
      renderValue,
    },
    ref
  ) => {
    const selectId = React.useId();
    const [searchQuery, setSearchQuery] = React.useState('');
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isOpen = open !== undefined ? open : internalOpen;
    const [contentEl, setContentEl] = React.useState<HTMLElement | null>(null);
    const contextContainer = usePortalContainer();

    // Radix는 value=""를 허용하지 않으므로 sentinel로 매핑
    const safeOptions = React.useMemo(() =>
      options.map((opt) => opt.id === '' ? { ...opt, id: EMPTY_SENTINEL } : opt),
      [options]
    );
    const normalizedValue = value === '' ? EMPTY_SENTINEL : value;
    const handleValueChange = React.useCallback((v: string) => {
      onChange?.(v === EMPTY_SENTINEL ? '' : v);
    }, [onChange]);

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
        return safeOptions;
      }
      const query = searchQuery.toLowerCase().trim();
      return safeOptions.filter(
        (option) =>
          option.id === normalizedValue ||
          option.label.toLowerCase().includes(query) ||
          option.description?.toLowerCase().includes(query)
      );
    }, [safeOptions, searchQuery, searchable, normalizedValue]);

    const pinnedSelectedOptions = React.useMemo(() => {
      if (!searchable || !searchQuery.trim()) return [];
      const query = searchQuery.toLowerCase().trim();
      return filteredOptions.filter((option) => {
        if (option.id !== normalizedValue) return false;
        const labelMatches = option.label.toLowerCase().includes(query);
        const descMatches = option.description?.toLowerCase().includes(query) ?? false;
        return !labelMatches && !descMatches;
      });
    }, [filteredOptions, searchable, searchQuery, normalizedValue]);

    const pinnedIds = React.useMemo(
      () => new Set(pinnedSelectedOptions.map((o) => o.id)),
      [pinnedSelectedOptions]
    );

    const unpinnedOptions = React.useMemo(
      () => filteredOptions.filter((o) => !pinnedIds.has(o.id)),
      [filteredOptions, pinnedIds]
    );

    const selectedOption = React.useMemo(() => {
      return safeOptions.find((opt) => opt.id === normalizedValue);
    }, [safeOptions, normalizedValue]);

    const handleOpenChange = React.useCallback(
      (isOpenNew: boolean) => {
        if (!isOpenNew) {
          setSearchQuery('');
        }
        if (open === undefined) {
          setInternalOpen(isOpenNew);
        }
        onOpenChange?.(isOpenNew);
      },
      [open, onOpenChange]
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
      const isSelected = option.id === normalizedValue;
      // renderOption 콜백에는 원본 id를 전달
      const originalOption = option.id === EMPTY_SENTINEL ? { ...option, id: '' } : option;
      let itemNode: React.ReactNode;

      if (searchable) {
        // cmdk-based item (no focus-trap — DOM focus stays on input, Korean IME-safe)
        const handleItemSelect = () => {
          handleValueChange(option.id);
          handleOpenChange(false);
        };
        if (renderOption) {
          itemNode = (
            <CommandPrimitive.Item
              key={option.id}
              value={option.id}
              disabled={option.disabled}
              onSelect={handleItemSelect}
              className={cn(
                'flex w-full select-none items-center rounded-sm outline-none',
                'padding-6 ds-gap-6',
                'font-body size-sm line-height-leading-5 text-default',
                'hover:bg-[var(--bg-state-ghost-hover)]',
                'aria-selected:bg-[var(--bg-state-ghost-hover)]',
                option.disabled && 'pointer-events-none opacity-50 cursor-not-allowed',
                !option.disabled && 'cursor-pointer'
              )}
            >
              <span className="flex width-20 height-20 items-center justify-center flex-shrink-0">
                {isSelected && (
                  <Icon
                    iconType={['system', 'check']}
                    size={16}
                    color={option.disabled ? 'default-disabled' : 'primary'}
                  />
                )}
              </span>
              {renderOption(originalOption, isSelected)}
            </CommandPrimitive.Item>
          );
        } else {
          itemNode = (
            <SearchableSelectItem
              key={option.id}
              option={option}
              isSelected={isSelected}
              selectType={selectType}
              variant={variant}
              onSelect={handleItemSelect}
              disableLabelTooltip={!!option.tooltip}
            />
          );
        }
      } else if (renderOption) {
        itemNode = (
          <SelectPrimitive.Item
            key={option.id}
            value={option.id}
            textValue={option.label}
            className={cn(
              'flex w-full select-none items-center rounded-sm outline-none',
              'padding-6 ds-gap-6',
              'font-body size-sm line-height-leading-5 text-default',
              'hover:bg-[var(--bg-state-ghost-hover)]',
              'data-[highlighted]:bg-[var(--bg-state-ghost-hover)]',
              option.disabled && 'pointer-events-none opacity-50 cursor-not-allowed',
              !option.disabled && 'cursor-pointer'
            )}
            disabled={option.disabled}
          >
            <span className="flex width-20 height-20 items-center justify-center flex-shrink-0">
              <SelectPrimitive.ItemIndicator>
                <Icon
                  iconType={['system', 'check']}
                  size={16}
                  color={option.disabled ? 'default-disabled' : 'primary'}
                />
              </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0,0,0,0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            >
              {option.label}
            </SelectPrimitive.ItemText>
            {renderOption(originalOption, isSelected)}
          </SelectPrimitive.Item>
        );
      } else {
        itemNode = (
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
            disableLabelTooltip={!!option.tooltip}
          >
            {option.label}
          </ExtendedSelectItem>
        );
      }

      if (option.tooltip) {
        return (
          <TooltipTrigger
            key={option.id}
            asChild
            content={option.tooltip}
            placement={option.tooltipPlacement ?? 'right'}
            container={null}
            zIndex={101}
          >
            {itemNode as React.ReactElement}
          </TooltipTrigger>
        );
      }
      return itemNode;
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

      const Group = searchable ? CommandPrimitive.Group : SelectPrimitive.Group;
      const renderGroupLabel = (label: React.ReactNode) =>
        searchable ? (
          <div className="padding-x-8 padding-y-6 size-sm font-body font-semibold">
            {label}
          </div>
        ) : (
          <SelectLabel>{label}</SelectLabel>
        );
      const separatorNode = searchable ? (
        <div className="margin-y-4 height-1 bg-muted" />
      ) : (
        <SelectSeparator />
      );

      const pinnedHeader = pinnedSelectedOptions.length > 0 ? (
        <Group key="__pinned_selected__">
          {renderGroupLabel('선택됨')}
          {pinnedSelectedOptions.map(renderSingleOption)}
          {separatorNode}
        </Group>
      ) : null;

      if (optionGroups && optionGroups.length > 0) {
        const mapId = (id: string) => id === '' ? EMPTY_SENTINEL : id;
        const ungroupedOptionIds = new Set(
          optionGroups.flatMap((g) => g.optionIds.map(mapId))
        );
        const ungroupedOptions = unpinnedOptions.filter(
          (opt) => !ungroupedOptionIds.has(opt.id)
        );

        return (
          <>
            {pinnedHeader}
            {optionGroups.map((group) => {
              const mappedIds = group.optionIds.map(mapId);
              const groupOptions = unpinnedOptions.filter((opt) =>
                mappedIds.includes(opt.id)
              );
              if (groupOptions.length === 0) return null;
              return (
                <Group key={group.label}>
                  {renderGroupLabel(group.label)}
                  {groupOptions.map(renderSingleOption)}
                </Group>
              );
            })}
            {ungroupedOptions.map(renderSingleOption)}
          </>
        );
      }

      return (
        <>
          {pinnedHeader}
          {unpinnedOptions.map(renderSingleOption)}
        </>
      );
    };

    const renderSelectedValue = () => {
      if (!selectedOption) {
        return placeholder;
      }

      // renderValue 콜백에는 원본 id를 전달
      const originalSelectedOption = selectedOption.id === EMPTY_SENTINEL
        ? { ...selectedOption, id: '' }
        : selectedOption;

      if (renderValue) {
        return renderValue(originalSelectedOption);
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
              className={cn('min-w-0 truncate', disabled ? 'text-hint' : 'text-default')}
            >
              {selectedOption.label}
            </span>
          </div>
        );
      }

      return (
        <span className={cn('block truncate', disabled ? 'text-hint' : 'text-default')}>
          {selectedOption.label}
        </span>
      );
    };

    const radixTriggerContent = (
      <>
        {normalizedValue ? renderSelectedValue() : <SelectValue placeholder={placeholder} />}
      </>
    );

    const popoverTriggerContent = (
      <>
        {normalizedValue ? renderSelectedValue() : <span className="text-hint">{placeholder}</span>}
      </>
    );

    const sizeConfig = SIZE_CONFIG[size];
    const styleConfig = STYLE_CONFIG[selectStyle];
    const isDisabled = state === 'disabled';
    const triggerIconColor = isDisabled
      ? 'default-disabled'
      : state === 'error'
        ? 'destructive'
        : state === 'success'
          ? 'success'
          : 'default-subtle';

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
        width={width}
        className={className}
      >
        <div ref={ref} className="relative min-w-0" style={minWidth ? { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth } : undefined}>
          {searchable ? (
            <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
              <PopoverPrimitive.Anchor asChild>
                <button
                  type="button"
                  id={selectId}
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-haspopup="listbox"
                  aria-describedby={caption || error || success ? `${selectId}-caption` : undefined}
                  aria-required={required || undefined}
                  disabled={disabled}
                  onClick={() => handleOpenChange(!isOpen)}
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
                    'focus:outline-none',
                  )}
                >
                  {leadIcon && (() => {
                    const { iconType, isFill } = parseIconTypeWithFill(leadIcon);
                    return (
                      <Icon
                        iconType={iconType}
                        size={sizeConfig.iconSize}
                        color={triggerIconColor}
                        className="flex-shrink-0"
                        isFill={isFill}
                      />
                    );
                  })()}
                  <span className={cn('flex-1 min-w-0 truncate text-left', !normalizedValue && 'text-hint')}>
                    {popoverTriggerContent}
                  </span>
                  {tailIcon && (() => {
                    const { iconType, isFill } = parseIconTypeWithFill(tailIcon);
                    return (
                      <Icon
                        iconType={iconType}
                        size={sizeConfig.iconSize}
                        color={triggerIconColor}
                        className="flex-shrink-0"
                        isFill={isFill}
                      />
                    );
                  })()}
                  {clearable && !!normalizedValue && !isDisabled && (
                    <span
                      role="button"
                      aria-label="선택 초기화"
                      onClick={(e) => { e.stopPropagation(); handleClear(e); }}
                      className="flex items-center justify-center width-16 height-16 flex-shrink-0 text-muted hover:text-default cursor-pointer"
                    >
                      <Icon iconType={['system', 'close']} size={12} />
                    </span>
                  )}
                  <Icon
                    iconType={['arrows', 'expand-up-down']}
                    size={sizeConfig.iconSize}
                    color={triggerIconColor}
                    className="flex-shrink-0"
                  />
                </button>
              </PopoverPrimitive.Anchor>
              <PopoverPrimitive.Portal container={contextContainer ?? undefined}>
                <PopoverPrimitive.Content
                  ref={setContentEl}
                  align="start"
                  sideOffset={4}
                  collisionPadding={8}
                  onOpenAutoFocus={(e) => {
                    e.preventDefault();
                    searchInputRef.current?.focus();
                  }}
                  className={cn(
                    'z-[100] min-w-[128px] overflow-hidden',
                    'bg-card rounded-lg shadow-modal-sm',
                    'data-[state=open]:animate-in data-[state=closed]:animate-out',
                    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                    'origin-[--radix-popover-content-transform-origin]',
                  )}
                  style={{
                    width: contentWidth
                      ? typeof contentWidth === 'number' ? `${contentWidth}px` : contentWidth
                      : 'var(--radix-popover-trigger-width)',
                  }}
                >
                  <PortalContainerProvider value={contentEl}>
                    <CommandPrimitive shouldFilter={false}>
                      <div className="border-b-default">
                        <div className="flex items-center ds-gap-2 padding-x-8 height-36">
                          <div className="flex items-center justify-center width-20 height-20 flex-shrink-0">
                            <Icon iconType={['system', 'search']} size={16} color="default-muted" />
                          </div>
                          <CommandPrimitive.Input
                            ref={searchInputRef}
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            placeholder={searchPlaceholder}
                            className="flex-1 bg-transparent border-none outline-none size-sm line-height-leading-5 letter-spacing-tracking-tight font-body text-default placeholder:text-hint"
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery('');
                                searchInputRef.current?.focus();
                              }}
                              className="flex items-center justify-center width-20 height-20 flex-shrink-0 text-muted hover:text-default"
                            >
                              <Icon iconType={['system', 'close']} size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                      <ScrollArea maxHeight={maxHeight}>
                        <div className="padding-4">
                          <CommandPrimitive.List>
                            {renderOptions()}
                          </CommandPrimitive.List>
                        </div>
                      </ScrollArea>
                    </CommandPrimitive>
                  </PortalContainerProvider>
                </PopoverPrimitive.Content>
              </PopoverPrimitive.Portal>
            </PopoverPrimitive.Root>
          ) : (
            <Select
              value={normalizedValue}
              onValueChange={handleValueChange}
              defaultValue={defaultValue === '' ? EMPTY_SENTINEL : defaultValue}
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
                tailIcon={tailIcon}
                showClear={clearable && !!normalizedValue && !disabled}
                onClear={handleClear}
                aria-describedby={caption || error || success ? `${selectId}-caption` : undefined}
                aria-required={required || undefined}
              >
                {radixTriggerContent}
              </SelectTrigger>
              <SelectContent
                maxHeight={maxHeight}
                contentWidth={contentWidth}
              >
                {renderOptions()}
              </SelectContent>
            </Select>
          )}
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
