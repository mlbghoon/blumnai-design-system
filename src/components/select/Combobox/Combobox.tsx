import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '@/lib/utils';
import { InputWrapper } from '../../input/shared/InputWrapper';
import {
  Icon,
  renderIconProp,
  RiAddLine,
  RiArrowDropDownLine,
  RiArrowDropRightLine,
  RiArrowDropUpLine,
  RiCheckLine,
  RiCloseLine,
  RiSearchLine,
} from '../../icons/Icon';
import { Avatar } from '../../avatar/Avatar';
import { Badge } from '../../badge/Badge';
import { Button } from '../../button/Button';
import { ScrollArea } from '../../scroll-area/ScrollArea';
import { TooltipTrigger } from '../../tooltip/Tooltip/TooltipTrigger';
import { usePortalContainer, PortalContainerProvider } from '../../../utils/PortalContainerContext';
import {
  SIZE_CONFIG,
  STYLE_CONFIG,
  STATE_CONFIG,
  MENU_ITEM_SIZE_CONFIG,
} from '@/constants/select/Select/Select.constants';
import type {
  ComboboxProps,
  ComboboxOption,
  ComboboxType,
  DefaultComboboxProps,
  AvatarComboboxProps,
  MultiSelectComboboxProps,
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
      ? <mark key={i} className="bg-transparent font-semibold text-default">{part}</mark>
      : part
  );
};

// ============================================================================
// ComboboxItem (internal)
// ============================================================================

interface ComboboxItemProps {
  option: ComboboxOption;
  selected: boolean;
  variant: 'default' | 'avatar' | 'multi-select' | 'tags';
  /**
   * default variant에서 선택 표시 방식. 'tags' / 'multi-select' 는 항상 checkbox.
   */
  selectType?: ComboboxType;
  onSelect: () => void;
  searchTerm?: string;
  highlightSearch?: boolean;
  renderOption?: (option: ComboboxOption, isSelected: boolean) => React.ReactNode;
}

const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  ({ option, selected, variant, selectType = 'default', onSelect, searchTerm, highlightSearch = true, renderOption }, ref) => {
    const sizeConfig = option.description
      ? MENU_ITEM_SIZE_CONFIG.large
      : MENU_ITEM_SIZE_CONFIG.default;

    const iconColor = option.iconColor
      ?? (option.disabled ? 'var(--icon-default-disabled)' : 'var(--icon-default)');

    const useCheckbox = variant === 'tags' || variant === 'multi-select' || selectType === 'checkbox';
    const useRadio = variant !== 'tags' && variant !== 'multi-select' && selectType === 'radio';

    const renderCheckbox = () => {
      if (!useCheckbox) return null;
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

    const renderRadio = () => {
      if (!useRadio) return null;
      return (
        <div
          className={cn(
            'relative width-16 height-16 rounded-full overflow-hidden flex-shrink-0 transition-colors',
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
              style={{ inset: 0 }}
            >
              <div
                className={cn(
                  'width-8 height-8 rounded-full',
                  option.disabled ? 'bg-default' : 'bg-default'
                )}
                style={{ background: option.disabled ? 'var(--icon-default-disabled)' : '#FFFFFF' }}
              />
            </div>
          )}
        </div>
      );
    };

    const renderCheckIcon = () => {
      if (useCheckbox || useRadio) return null;
      return (
        <span className="flex width-20 height-20 items-center justify-center flex-shrink-0">
          {selected && (
            <Icon
              icon={RiCheckLine}
              size={16}
              color="default"
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
        return (
          <div
            className={cn(
              'flex items-center justify-center flex-shrink-0',
              sizeConfig.iconFrame
            )}
          >
            {renderIconProp(option.leadIcon, { size: sizeConfig.iconSize, color: iconColor })}
          </div>
        );
      }

      return null;
    };

    const itemNode = (
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
        {renderOption ? (
          <div className="flex items-center w-full">
            {renderOption(option, selected)}
          </div>
        ) : (
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
            {renderRadio()}
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
        )}
      </CommandPrimitive.Item>
    );

    if (option.tooltip) {
      return (
        <TooltipTrigger
          content={option.tooltip}
          placement={option.tooltipPlacement ?? 'right'}
        >
          {itemNode}
        </TooltipTrigger>
      );
    }

    return itemNode;
  }
);
ComboboxItem.displayName = 'ComboboxItem';

// ============================================================================
// Combobox Component
// ============================================================================

/**
 * Combobox — 타이핑이 주 상호작용인 editable 입력 + 자동완성
 *
 * 트리거 자체가 편집 가능한 입력 필드이며, 타이핑하면 옵션 목록이 실시간으로 필터링됩니다.
 * WAI-ARIA "Editable Combobox with List Autocomplete" 패턴에 해당합니다.
 *
 * **언제 Combobox를 쓸까 (vs Select)**
 * - ✅ 사용자가 타이핑해서 빠르게 찾는 게 주 용도 (검색 바, 큰 옵션 목록)
 * - ✅ 새 항목 생성이 필요함 — `creatable`, `onCreate`
 * - ✅ 하이라이트된 검색 결과(`highlightSearch`)나 커스텀 필터(`filterFunction`) 필요
 * - ✅ 입력 필드가 항상 보이는 필터 바 UX
 * - ❌ 일반적인 폼 셀렉트 필드 → {@link Select}
 * - ❌ 옵션이 적고(~10개 이하) 검색이 불필요 → {@link Select}
 * - ❌ 옵션이 1000개 이상 → `VirtualSelect`
 *
 * `variant`:
 * - `default`: 단일 선택
 * - `avatar`: 아바타가 있는 단일 선택
 * - `multi-select`: 컴팩트한 "N selected" 표시의 다중 선택
 * - `tags`: 태그로 표시되는 다중 선택
 *
 * @example
 * ```tsx
 * <Combobox variant="default" label="프레임워크" options={options}
 *   creatable onCreate={(v) => addOption(v)} />
 * ```
 */
export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (props, ref) => {
    const {
      variant = 'default',
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
      placeholder = '검색...',
      searchPlaceholder,
      leadIcon,
      options,
      optionGroups,
      noResultsText,
      emptyStateTitle = '검색 결과 없음',
      emptyStateDescription = '검색 결과와 일치하는 항목이 없습니다.',
      creatable = false,
      createText,
      open: controlledOpen,
      onOpenChange,
      maxHeight = 300,
      contentWidth,
      width,
      minWidth,
      className,
      highlightSearch = true,
      filterFunction,
      tailIcon,
      clearable = false,
      loading = false,
      renderOption,
      renderValue,
    } = props;

    const contextContainer = usePortalContainer();
    const comboboxId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    const [contentEl, setContentEl] = React.useState<HTMLDivElement | null>(null);
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isEditing, setIsEditing] = React.useState(false);
    const [canScrollUp, setCanScrollUp] = React.useState(false);
    const [canScrollDown, setCanScrollDown] = React.useState(false);

    const isControlledOpen = controlledOpen !== undefined;
    const isOpen = isControlledOpen ? controlledOpen : internalOpen;

    const isTagsVariant = variant === 'tags';
    const isMultiSelect = variant === 'multi-select';
    const isMultiMode = isTagsVariant || isMultiSelect;
    const tagsProps = props as TagsComboboxProps;
    const multiProps = props as MultiSelectComboboxProps;
    const singleProps = props as DefaultComboboxProps | AvatarComboboxProps;
    const defaultProps = props as DefaultComboboxProps;

    // Uncontrolled (defaultValue) support — track internal value when consumer doesn't pass `value`.
    const singleControlled = singleProps.value !== undefined;
    const multiControlled = isMultiMode
      ? (isTagsVariant ? tagsProps.value : multiProps.value) !== undefined
      : true;
    const [internalSingleValue, setInternalSingleValue] = React.useState<string | undefined>(
      !singleControlled && !isMultiMode ? singleProps.defaultValue : undefined,
    );
    const [internalMultiValue, setInternalMultiValue] = React.useState<string[]>(
      () => {
        if (isMultiMode && !multiControlled) {
          return (isTagsVariant ? tagsProps.defaultValue : multiProps.defaultValue) ?? [];
        }
        return [];
      },
    );

    // Multi-select: pending values when `showActions` is true (apply/cancel mode).
    const useActions = isMultiSelect && multiProps.showActions === true;
    const committedMultiValue = React.useMemo(() => {
      if (!isMultiMode) return [];
      const source = isTagsVariant ? tagsProps.value : multiProps.value;
      return multiControlled ? (source ?? []) : internalMultiValue;
    }, [isMultiMode, isTagsVariant, tagsProps.value, multiProps.value, multiControlled, internalMultiValue]);
    const [pendingMultiValue, setPendingMultiValue] = React.useState<string[]>(committedMultiValue);

    React.useEffect(() => {
      if (useActions) {
        setPendingMultiValue(committedMultiValue);
      }
    }, [useActions, committedMultiValue]);

    const selectedValues: string[] = React.useMemo(() => {
      if (isMultiMode) {
        if (useActions) return pendingMultiValue;
        return committedMultiValue;
      }
      if (singleControlled) return singleProps.value ? [singleProps.value] : [];
      return internalSingleValue ? [internalSingleValue] : [];
    }, [
      isMultiMode, useActions, pendingMultiValue, committedMultiValue,
      singleControlled, singleProps.value, internalSingleValue,
    ]);

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
          // showActions: revert pending on close without apply
          if (useActions) {
            setPendingMultiValue(committedMultiValue);
          }
        }
        onOpenChange?.(newOpen);
      },
      [disabled, isControlledOpen, onOpenChange, useActions, committedMultiValue]
    );

    const commitMulti = React.useCallback(
      (next: string[]) => {
        if (multiControlled) {
          if (isTagsVariant) tagsProps.onChange?.(next);
          else multiProps.onChange?.(next);
        } else {
          setInternalMultiValue(next);
          if (isTagsVariant) tagsProps.onChange?.(next);
          else multiProps.onChange?.(next);
        }
      },
      [multiControlled, isTagsVariant, tagsProps, multiProps],
    );

    const commitSingle = React.useCallback(
      (next: string) => {
        if (singleControlled) {
          singleProps.onChange?.(next);
        } else {
          setInternalSingleValue(next);
          singleProps.onChange?.(next);
        }
      },
      [singleControlled, singleProps],
    );

    const handleSelect = React.useCallback(
      (optionId: string) => {
        if (disabled) return;

        const option = options.find((o) => o.id === optionId);
        if (!option || option.disabled) return;

        if (isMultiMode) {
          const currentValues = useActions ? pendingMultiValue : committedMultiValue;
          let newValues: string[];

          if (currentValues.includes(optionId)) {
            newValues = currentValues.filter((v) => v !== optionId);
          } else {
            const cap = isTagsVariant ? tagsProps.maxSelections : multiProps.maxSelections;
            if (cap && currentValues.length >= cap) {
              return;
            }
            newValues = [...currentValues, optionId];
          }

          if (useActions) {
            setPendingMultiValue(newValues);
          } else {
            commitMulti(newValues);
          }
        } else {
          commitSingle(optionId);
          setOpen(false);
        }

        setInputValue('');
      },
      [
        disabled, options, isMultiMode, isTagsVariant, useActions,
        pendingMultiValue, committedMultiValue, tagsProps.maxSelections, multiProps.maxSelections,
        commitMulti, commitSingle, setOpen,
      ],
    );

    const handleCreate = React.useCallback(() => {
      if (!creatable || !inputValue.trim()) return;

      if (isTagsVariant) {
        tagsProps.onCreate?.(inputValue.trim());
      } else if (isMultiSelect) {
        multiProps.onCreate?.(inputValue.trim());
      } else {
        singleProps.onCreate?.(inputValue.trim());
      }

      setInputValue('');
      if (!isMultiMode) {
        setOpen(false);
      }
    }, [creatable, inputValue, isTagsVariant, isMultiSelect, isMultiMode, tagsProps, multiProps, singleProps, setOpen]);

    const removeTag = React.useCallback(
      (id: string) => {
        if (disabled || !isTagsVariant) return;

        const currentValues = committedMultiValue;
        const newValues = currentValues.filter((v) => v !== id);
        commitMulti(newValues);
      },
      [disabled, isTagsVariant, committedMultiValue, commitMulti],
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        if (isMultiMode) {
          if (useActions) {
            setPendingMultiValue([]);
          } else {
            commitMulti([]);
          }
        } else {
          commitSingle('');
        }
        setInputValue('');
      },
      [disabled, isMultiMode, useActions, commitMulti, commitSingle],
    );

    const handleApply = React.useCallback(() => {
      commitMulti(pendingMultiValue);
      setOpen(false);
    }, [commitMulti, pendingMultiValue, setOpen]);

    const handleCancel = React.useCallback(() => {
      setPendingMultiValue(committedMultiValue);
      setOpen(false);
    }, [committedMultiValue, setOpen]);

    const getCreateText = () => {
      if (typeof createText === 'function') {
        return createText(inputValue);
      }
      if (typeof createText === 'string') {
        return createText.replace('{value}', inputValue);
      }
      return `"${inputValue}" 추가`;
    };

    const filteredOptions = React.useMemo(() => {
      if (!inputValue.trim()) {
        return options;
      }
      if (filterFunction) {
        return options.filter((option) => filterFunction(option, inputValue));
      }
      const searchLower = inputValue.toLowerCase().trim();
      const selectedSet = new Set(selectedValues);
      return options.filter((option) => {
        if (selectedSet.has(option.id)) return true;
        const label = option.label.toLowerCase();
        const desc = option.description?.toLowerCase() ?? '';
        return label.includes(searchLower) || desc.includes(searchLower);
      });
    }, [options, inputValue, filterFunction, selectedValues]);

    const updateScrollButtons = React.useCallback((_pos?: { x: number; y: number }) => {
      const el = listRef.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 1);
    }, []);

    React.useEffect(() => {
      if (isOpen) {
        requestAnimationFrame(() => updateScrollButtons());
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

    // ---- Select-All handling (multi-select) ----
    const showSelectAll = isMultiSelect && multiProps.showSelectAll === true && !multiProps.maxSelections;
    const selectableOptionIds = React.useMemo(
      () => filteredOptions.filter((o) => !o.disabled).map((o) => o.id),
      [filteredOptions],
    );
    const currentMultiValues = React.useMemo(
      () => (isMultiMode ? (useActions ? pendingMultiValue : committedMultiValue) : []),
      [isMultiMode, useActions, pendingMultiValue, committedMultiValue],
    );
    const allSelected = selectableOptionIds.length > 0 && selectableOptionIds.every((id) => currentMultiValues.includes(id));
    const someSelected = selectableOptionIds.some((id) => currentMultiValues.includes(id));
    const handleToggleAll = React.useCallback(() => {
      if (disabled || !isMultiSelect) return;
      const currentSet = new Set(currentMultiValues);
      let next: string[];
      if (allSelected) {
        next = currentMultiValues.filter((v) => !selectableOptionIds.includes(v));
      } else {
        selectableOptionIds.forEach((id) => currentSet.add(id));
        next = Array.from(currentSet);
      }
      if (useActions) setPendingMultiValue(next);
      else commitMulti(next);
    }, [disabled, isMultiSelect, allSelected, currentMultiValues, selectableOptionIds, useActions, commitMulti]);

    // ---- Trigger selected-value render ----
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
          return `+${hiddenCount}개 더`;
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

      if (isMultiSelect) {
        const count = committedMultiValue.length;
        if (count === 0) return null;
        const text = multiProps.selectedText;
        let label: React.ReactNode;
        if (typeof text === 'function') label = text(count);
        else if (typeof text === 'string') label = text.replace('{count}', String(count));
        else label = `${count} selected`;
        return (
          <span className={cn('truncate flex-1 min-w-0', disabled ? 'text-hint' : 'text-default')}>
            {label}
          </span>
        );
      }

      return null;
    };

    // ---- Trigger className ----
    const triggerClassName = React.useMemo(() => cn(
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
    ), [sizeConfig, styleConfig, disabled, state, isTagsVariant]);

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
            icon={RiSearchLine}
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

    const renderLoading = () => (
      <div
        role="status"
        className="flex items-center justify-center padding-y-24 ds-gap-8"
      >
        <div className="width-20 height-20 border-2 border-state-primary border-t-transparent rounded-full animate-spin" />
        <span className="font-body size-sm text-subtle">로딩 중...</span>
      </div>
    );

    const currentPlaceholder =
      isEditing && searchPlaceholder ? searchPlaceholder : placeholder;

    // ---- Rendering of list content (groups vs flat) ----
    const renderOptionsList = () => {
      if (loading) return renderLoading();
      if (filteredOptions.length === 0) return renderEmptyState();

      const idSet = new Set(filteredOptions.map((o) => o.id));

      const renderItem = (option: ComboboxOption) => (
        <ComboboxItem
          key={option.id}
          option={option}
          selected={selectedValues.includes(option.id)}
          variant={variant}
          selectType={defaultProps.selectType}
          onSelect={() => handleSelect(option.id)}
          searchTerm={inputValue}
          highlightSearch={highlightSearch}
          renderOption={renderOption}
        />
      );

      if (optionGroups && optionGroups.length > 0) {
        const grouped: React.ReactNode[] = [];
        const groupedIds = new Set<string>();

        optionGroups.forEach((group, idx) => {
          const groupOptions = group.optionIds
            .map((id) => filteredOptions.find((o) => o.id === id))
            .filter((o): o is ComboboxOption => !!o && idSet.has(o.id));
          if (groupOptions.length === 0) return;

          groupOptions.forEach((o) => groupedIds.add(o.id));

          grouped.push(
            <div key={`group-${idx}`} className="padding-y-4">
              <div className="padding-x-10 padding-y-4 font-body size-xs font-medium text-muted uppercase letter-spacing-tracking-wide">
                {group.label}
              </div>
              <CommandPrimitive.List>
                {groupOptions.map(renderItem)}
              </CommandPrimitive.List>
            </div>,
          );
        });

        const ungrouped = filteredOptions.filter((o) => !groupedIds.has(o.id));
        if (ungrouped.length > 0) {
          grouped.push(
            <div key="ungrouped" className="padding-y-4">
              <CommandPrimitive.List>
                {ungrouped.map(renderItem)}
              </CommandPrimitive.List>
            </div>,
          );
        }

        return <div className="padding-4">{grouped}</div>;
      }

      return (
        <div className="padding-4">
          <CommandPrimitive.List>
            {filteredOptions.map(renderItem)}
          </CommandPrimitive.List>
        </div>
      );
    };

    const applyEnabled = React.useMemo(() => {
      if (!useActions) return false;
      if (multiProps.canApply) return multiProps.canApply(pendingMultiValue, committedMultiValue);
      // default: enabled only when changed
      if (pendingMultiValue.length !== committedMultiValue.length) return true;
      const committedSet = new Set(committedMultiValue);
      return pendingMultiValue.some((v) => !committedSet.has(v));
    }, [useActions, multiProps, pendingMultiValue, committedMultiValue]);

    // ---- InputWrapper extra width/minWidth style passthrough ----
    const widthStyle: React.CSSProperties = {};
    if (minWidth !== undefined) {
      widthStyle.minWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    }

    return (
      <InputWrapper
        label={label}
        labelPosition={labelPosition}
        labelWidth={labelWidth}
        inputId={comboboxId}
        required={required}
        supportText={supportText}
        caption={caption}
        error={error}
        success={success}
        width={width}
        className={className}
      >
        <div ref={ref} style={Object.keys(widthStyle).length > 0 ? widthStyle : undefined}>
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
                  {leadIcon && renderIconProp(leadIcon, {
                    size: sizeConfig.iconSize,
                    color: iconColor,
                    className: 'flex-shrink-0',
                  })}

                  {!isMultiMode && selectedOptions.length === 0 && !leadIcon && (
                    <div className="flex items-center ds-gap-6 flex-shrink-0">
                      <Icon
                        icon={RiSearchLine}
                        size={16}
                        color="default-muted"
                      />
                    </div>
                  )}

                  {renderSelectedValue()}

                  {!isMultiMode && selectedOptions.length === 1 && !isEditing && (
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
                        {renderValue
                          ? renderValue(selectedOptions[0])
                          : selectedOptions[0].label}
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
                    placeholder={
                      selectedOptions.length === 0 || isEditing
                        ? currentPlaceholder
                        : ''
                    }
                    disabled={disabled}
                    className={cn(
                      'bg-transparent border-none outline-none',
                      sizeConfig.text,
                      'font-body text-default placeholder:text-hint',
                      disabled && 'cursor-not-allowed',
                      !isMultiMode && selectedOptions.length === 1 && !isEditing
                        ? 'absolute opacity-0 [width:0] [height:0]'
                        : isMultiSelect && committedMultiValue.length > 0 && !isEditing
                          ? 'absolute opacity-0 [width:0] [height:0]'
                          : 'flex-1 min-w-[60px]'
                    )}
                    id={comboboxId}
                  />

                  {clearable && selectedOptions.length > 0 && !disabled && (
                    <button
                      type="button"
                      aria-label="Clear selection"
                      className={cn(
                        'flex items-center justify-center flex-shrink-0 rounded-full',
                        'width-16 height-16 hover:bg-state-ghost-hover cursor-pointer',
                      )}
                      onClick={handleClear}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Icon
                        icon={RiCloseLine}
                        size={12}
                        color={iconColor}
                      />
                    </button>
                  )}

                  {tailIcon && renderIconProp(tailIcon, {
                    size: sizeConfig.iconSize,
                    color: iconColor,
                    className: 'flex-shrink-0',
                  })}

                  <Icon
                    iconType={['arrows', isOpen ? 'arrow-up-s' : 'arrow-down-s']}
                    size={sizeConfig.iconSize}
                    color={iconColor}
                    className="flex-shrink-0"
                  />
                </div>
              </PopoverPrimitive.Anchor>

              <PopoverPrimitive.Portal container={contextContainer ?? undefined}>
                <PopoverPrimitive.Content
                  ref={setContentEl}
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
                    width: contentWidth
                      ? typeof contentWidth === 'number' ? `${contentWidth}px` : contentWidth
                      : 'var(--radix-popover-trigger-width)',
                  }}
                >
                <PortalContainerProvider value={contentEl}>
                  <ScrollArea
                    maxHeight={maxHeight}
                    viewportRef={listRef}
                    onScrollPositionChange={updateScrollButtons}
                  >
                    {canScrollUp && (
                      <button
                        type="button"
                        onClick={handleScrollUp}
                        className="sticky top-0 z-10 flex w-full cursor-default items-center justify-center padding-y-4 bg-card"
                      >
                        <Icon icon={RiArrowDropUpLine} size={16} color="default-muted" />
                      </button>
                    )}

                    {showSelectAll && !loading && filteredOptions.length > 0 && (
                      <div className="padding-x-4 padding-t-4">
                        <button
                          type="button"
                          onClick={handleToggleAll}
                          className={cn(
                            'flex items-center w-full height-32 padding-x-6 ds-gap-6 rounded-xs',
                            'cursor-pointer hover:bg-[var(--bg-state-ghost-hover)] outline-none',
                          )}
                        >
                          <div
                            className={cn(
                              'relative width-16 height-16 rounded-default overflow-hidden flex-shrink-0 transition-colors',
                              allSelected
                                ? 'border-none bg-checkbox-active'
                                : someSelected
                                  ? 'border-none bg-checkbox-active'
                                  : 'border-darker bg-checkbox-default',
                            )}
                          >
                            {allSelected && (
                              <div className="absolute flex items-center justify-center" style={{ inset: '1px' }}>
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1 4L3 6L7 2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                            {!allSelected && someSelected && (
                              <div className="absolute flex items-center justify-center" style={{ inset: 0 }}>
                                <div className="width-8 height-2 rounded-full" style={{ background: '#FFFFFF' }} />
                              </div>
                            )}
                          </div>
                          <span className="flex-1 text-left size-sm font-body text-default">
                            {multiProps.selectAllLabel ?? '전체 선택'}
                          </span>
                        </button>
                      </div>
                    )}

                    {renderOptionsList()}

                    {canScrollDown && (
                      <button
                        type="button"
                        onClick={handleScrollDown}
                        className="sticky bottom-0 z-10 flex w-full cursor-default items-center justify-center padding-y-4 bg-card"
                      >
                        <Icon icon={RiArrowDropDownLine} size={16} color="default-muted" />
                      </button>
                    )}
                  </ScrollArea>

                  {showCreateOption && !loading && (
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
                        <Icon icon={RiAddLine} size={16} color="default-muted" />
                        <span className="flex-1 text-left size-sm font-body text-default">
                          {getCreateText()}
                        </span>
                        <Icon icon={RiArrowDropRightLine} size={16} color="default-muted" />
                      </button>
                    </div>
                  )}

                  {useActions && (
                    <div className="flex items-center justify-end ds-gap-6 padding-8 border-t border-default">
                      <Button
                        size="sm"
                        buttonStyle="ghost"
                        onClick={handleCancel}
                      >
                        {multiProps.cancelLabel ?? '취소'}
                      </Button>
                      <Button
                        size="sm"
                        buttonStyle="primary"
                        disabled={!applyEnabled}
                        onClick={handleApply}
                      >
                        {multiProps.applyLabel ?? '적용'}
                      </Button>
                    </div>
                  )}
                </PortalContainerProvider>
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
