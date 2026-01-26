import { forwardRef, useState, useRef, useEffect, useCallback, useMemo } from 'react';

import { cn } from '../../../utils/cn';
import { DropdownButton } from '../DropdownButton';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '../DropdownMenu/DropdownMenuItem';
import { DropdownMenuLabel } from '../DropdownMenu/DropdownMenuLabel';
import { DropdownMenuDivider } from '../DropdownMenu/DropdownMenuDivider';

import type { DropdownProps, DropdownItemData, DropdownSection } from './Dropdown.types';

/**
 * Check if items array contains sections
 */
function isSectionArray(items: DropdownItemData[] | DropdownSection[]): items is DropdownSection[] {
  return items.length > 0 && 'items' in items[0];
}

/**
 * Dropdown component
 *
 * A complete dropdown component that combines a trigger button with a dropdown menu.
 * Handles open/close state, click outside, keyboard navigation, and item selection.
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
  trigger,
  open: controlledOpen,
  onOpenChange,
  className,
  ...props
}, forwardedRef) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Merge forwarded ref with container ref
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

  // Use controlled or internal state
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [isControlled, onOpenChange]);

  // Toggle dropdown
  const handleToggle = useCallback(() => {
    if (!disabled) {
      setOpen(!isOpen);
    }
  }, [disabled, isOpen, setOpen]);

  // Handle item selection
  const handleItemClick = useCallback((item: DropdownItemData) => {
    if (!item.disabled) {
      onChange?.(item);
      setOpen(false);
    }
  }, [onChange, setOpen]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen]);

  // Handle escape key
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

  // Get button width for menu sizing
  const [buttonWidth, setButtonWidth] = useState<number>(0);
  useEffect(() => {
    if (buttonRef.current && menuWidth === 'trigger') {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [menuWidth, isOpen]);

  // Calculate menu width
  const calculatedMenuWidth = useMemo(() => {
    if (menuWidth === 'trigger') {
      return buttonWidth || undefined;
    }
    return menuWidth;
  }, [menuWidth, buttonWidth]);

  // Placement classes
  const placementClasses = useMemo(() => {
    switch (placement) {
      case 'bottom-end':
        return 'right-0';
      case 'bottom':
        return 'left-1/2 -translate-x-1/2';
      case 'bottom-start':
      default:
        return 'left-0';
    }
  }, [placement]);

  // Flatten items for keyboard navigation
  const flatItems = useMemo(() => {
    if (isSectionArray(items)) {
      return items.flatMap(section => section.items);
    }
    return items;
  }, [items]);

  // Render menu items
  const renderItems = () => {
    if (isSectionArray(items)) {
      return items.map((section, sectionIndex) => (
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
              onClick={() => handleItemClick(item)}
              aria-selected={value === item.id}
            />
          ))}
        </div>
      ));
    }

    return items.map((item) => (
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
        onClick={() => handleItemClick(item)}
        aria-selected={value === item.id}
      />
    ));
  };

  // Get selected item label for button display
  const selectedItem = flatItems.find(item => item.id === value);
  const displayLabel = selectedItem?.label || label;

  return (
    <div
      ref={setContainerRef}
      className={cn('relative inline-block', className)}
      {...props}
    >
      {/* Trigger */}
      {trigger ? (
        <div onClick={handleToggle}>{trigger}</div>
      ) : (
        <DropdownButton
          ref={buttonRef}
          label={displayLabel}
          isOpen={isOpen}
          leadIcon={leadIcon}
          tailIcon={tailIcon}
          shortcut={shortcut}
          disabled={disabled}
          onClick={handleToggle}
        />
      )}

      {/* Menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-1',
            placementClasses
          )}
        >
          <DropdownMenu
            ref={menuRef}
            width={calculatedMenuWidth}
          >
            {renderItems()}
          </DropdownMenu>
        </div>
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';
