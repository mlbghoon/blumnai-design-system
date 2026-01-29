import { forwardRef, useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../../utils/cn';
import { DropdownButton } from '../DropdownButton';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '../DropdownMenu/DropdownMenuItem';
import { DropdownMenuLabel } from '../DropdownMenu/DropdownMenuLabel';
import { DropdownMenuDivider } from '../DropdownMenu/DropdownMenuDivider';
import { DropdownMenuSearch } from '../DropdownMenu/DropdownMenuSearch';

import type { DropdownProps, DropdownItemData, DropdownSection } from './Dropdown.types';

function isSectionArray(items: DropdownItemData[] | DropdownSection[]): items is DropdownSection[] {
  return items.length > 0 && 'items' in items[0];
}

/**
 * Dropdown 컴포넌트
 *
 * 트리거 버튼과 드롭다운 메뉴를 결합한 컴포넌트입니다.
 * 열기/닫기 상태, 외부 클릭, 키보드 네비게이션, 아이템 선택을 처리합니다.
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
  label,
  items,
  value,
  onChange,
  leadIcon,
  tailIcon,
  shortcut,
  placement = 'bottom-start',
  menuWidth,
  disabled = false,
  align,
  buttonWidth,
  trigger,
  open: controlledOpen,
  onOpenChange,
  portal = true,
  searchable = false,
  onSearch,
  searchPlaceholder = 'Search...',
  filterItems = true,
  noResultsText = 'No results found',
  className,
  ...props
}, forwardedRef) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  }, [forwardedRef]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    // Reset search query and focused index when closing
    if (!newOpen) {
      setSearchQuery('');
      setFocusedIndex(-1);
    }
    onOpenChange?.(newOpen);
  }, [isControlled, onOpenChange]);

  // Handle search query change
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  }, [onSearch]);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setOpen(!isOpen);
    }
  }, [disabled, isOpen, setOpen]);

  const handleItemClick = useCallback((item: DropdownItemData) => {
    if (!item.disabled) {
      onChange?.(item);
      setOpen(false);
    }
  }, [onChange, setOpen]);

  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideContainer = containerRef.current && !containerRef.current.contains(target);
      const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);

      if (isOutsideContainer && isOutsideMenu) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen]);

  // ESC 키 감지
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, setOpen]);

  // 포탈 모드에서 메뉴 위치 계산
  const getMenuPosition = useCallback(() => {
    if (!containerRef.current) return null;

    const rect = containerRef.current.getBoundingClientRect();
    const gap = 4;
    let top = 0;
    let left = 0;

    if (placement.startsWith('top')) {
      top = rect.top + window.scrollY - gap;
    } else {
      top = rect.bottom + window.scrollY + gap;
    }

    if (placement.endsWith('end')) {
      left = rect.right + window.scrollX;
    } else if (placement === 'top' || placement === 'bottom') {
      left = rect.left + window.scrollX + rect.width / 2;
    } else {
      left = rect.left + window.scrollX;
    }

    return { top, left };
  }, [placement]);

  useLayoutEffect(() => {
    if (!isOpen || !portal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMenuPosition(null);
      return;
    }
    setMenuPosition(getMenuPosition());
  }, [isOpen, portal, getMenuPosition]);

  // 스크롤/리사이즈 이벤트 구독
  useEffect(() => {
    if (!isOpen || !portal) return;

    const handlePositionUpdate = () => {
      setMenuPosition(getMenuPosition());
    };

    window.addEventListener('scroll', handlePositionUpdate, true);
    window.addEventListener('resize', handlePositionUpdate);

    return () => {
      window.removeEventListener('scroll', handlePositionUpdate, true);
      window.removeEventListener('resize', handlePositionUpdate);
    };
  }, [isOpen, portal, getMenuPosition]);

  const placementClasses = useMemo(() => {
    switch (placement) {
      case 'bottom-end':
        return 'top-full mt-1 right-0';
      case 'bottom':
        return 'top-full mt-1 left-1/2 -translate-x-1/2';
      case 'top-start':
        return 'bottom-full mb-1 left-0';
      case 'top':
        return 'bottom-full mb-1 left-1/2 -translate-x-1/2';
      case 'top-end':
        return 'bottom-full mb-1 right-0';
      case 'bottom-start':
      default:
        return 'top-full mt-1 left-0';
    }
  }, [placement]);

  const portalTransformStyle = useMemo(() => {
    if (placement.endsWith('end')) {
      return 'translateX(-100%)';
    } else if (placement === 'top' || placement === 'bottom') {
      return 'translateX(-50%)';
    }
    return undefined;
  }, [placement]);

  const portalOriginStyle = useMemo(() => {
    if (placement.startsWith('top')) {
      return 'translateY(-100%)';
    }
    return undefined;
  }, [placement]);

  const flatItems = useMemo(() => {
    if (isSectionArray(items)) {
      return items.flatMap(section => section.items);
    }
    return items;
  }, [items]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchable || !filterItems || !searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase().trim();

    if (isSectionArray(items)) {
      // Filter sections and their items
      return items
        .map(section => ({
          ...section,
          items: section.items.filter(item =>
            item.label.toLowerCase().includes(query) ||
            item.caption?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
          ),
        }))
        .filter(section => section.items.length > 0);
    }

    // Filter flat items
    return items.filter(item =>
      item.label.toLowerCase().includes(query) ||
      item.caption?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    );
  }, [items, searchQuery, searchable, filterItems]);

  // Get navigable items (filtered and non-disabled)
  const navigableItems = useMemo(() => {
    const getItems = () => {
      if (isSectionArray(filteredItems)) {
        return filteredItems.flatMap(section => section.items);
      }
      return filteredItems as DropdownItemData[];
    };
    return getItems().filter(item => !item.disabled);
  }, [filteredItems]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isOpen) {
      // Open dropdown on ArrowDown, ArrowUp, Enter, or Space when closed
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        setOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev + 1;
          return nextIndex >= navigableItems.length ? 0 : nextIndex;
        });
        break;

      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev - 1;
          return nextIndex < 0 ? navigableItems.length - 1 : nextIndex;
        });
        break;

      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;

      case 'End':
        event.preventDefault();
        setFocusedIndex(navigableItems.length - 1);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < navigableItems.length) {
          const item = navigableItems[focusedIndex];
          handleItemClick(item);
        }
        break;

      case 'Tab':
        // Close dropdown on Tab
        setOpen(false);
        break;
    }
  }, [isOpen, setOpen, navigableItems, focusedIndex, handleItemClick]);

  const renderItems = () => {
    // Helper to check if an item is focused
    const isItemFocused = (item: DropdownItemData) => {
      if (item.disabled) return false;
      const navIndex = navigableItems.findIndex(navItem => navItem.id === item.id);
      return navIndex === focusedIndex;
    };

    if (isSectionArray(filteredItems)) {
      return filteredItems.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {sectionIndex > 0 && <DropdownMenuDivider />}
          {section.label && <DropdownMenuLabel>{section.label}</DropdownMenuLabel>}
          {section.items.map((item) => (
            <DropdownMenuItem
              key={item.id}
              label={item.label}
              size={item.size}
              leadIcon={item.leadIcon}
              tailIcon={item.tailIcon}
              caption={item.caption}
              description={item.description}
              shortcut={item.shortcut}
              disabled={item.disabled}
              focused={isItemFocused(item)}
              iconColor={item.iconColor}
              onClick={() => handleItemClick(item)}
              aria-selected={value === item.id}
            />
          ))}
        </div>
      ));
    }

    return (filteredItems as DropdownItemData[]).map((item) => (
      <DropdownMenuItem
        key={item.id}
        label={item.label}
        size={item.size}
        leadIcon={item.leadIcon}
        tailIcon={item.tailIcon}
        caption={item.caption}
        description={item.description}
        shortcut={item.shortcut}
        disabled={item.disabled}
        focused={isItemFocused(item)}
        iconColor={item.iconColor}
        onClick={() => handleItemClick(item)}
        aria-selected={value === item.id}
      />
    ));
  };

  // Check if there are any items to show
  const hasFilteredItems = useMemo(() => {
    if (isSectionArray(filteredItems)) {
      return filteredItems.some(section => section.items.length > 0);
    }
    return filteredItems.length > 0;
  }, [filteredItems]);

  // Render search and items
  const renderMenuContent = () => (
    <>
      {searchable && (
        <DropdownMenuSearch
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          autoFocus
        />
      )}
      {hasFilteredItems ? (
        renderItems()
      ) : (
        <div className="flex items-center justify-center padding-y-8 text-muted size-sm">
          {noResultsText}
        </div>
      )}
    </>
  );

  const selectedItem = flatItems.find(item => item.id === value);
  const displayLabel = selectedItem?.label || label;

  return (
    <div
      ref={setContainerRef}
      className={cn('relative inline-block', className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {trigger ? (
        <div onClick={handleToggle}>{trigger}</div>
      ) : (
        <DropdownButton
          ref={buttonRef}
          label={displayLabel}
          isOpen={isOpen}
          align={align}
          leadIcon={leadIcon}
          tailIcon={tailIcon}
          shortcut={shortcut}
          disabled={disabled}
          width={buttonWidth}
          onClick={handleToggle}
        />
      )}

      {isOpen && !portal && (
        <div
          className={cn(
            'absolute z-50',
            placementClasses
          )}
        >
          <DropdownMenu
            ref={menuRef}
            width={menuWidth}
          >
            {renderMenuContent()}
          </DropdownMenu>
        </div>
      )}

      {isOpen && portal && menuPosition && createPortal(
        <div
          style={{
            position: 'absolute',
            top: menuPosition.top,
            left: menuPosition.left,
            transform: [portalOriginStyle, portalTransformStyle].filter(Boolean).join(' ') || undefined,
            zIndex: 9999,
          }}
        >
          <DropdownMenu
            ref={menuRef}
            width={menuWidth}
          >
            {renderMenuContent()}
          </DropdownMenu>
        </div>,
        document.body
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';
