import type { HTMLAttributes, ReactNode } from 'react';

import type { IconType } from '../../icons/Icon/Icon.types';
import type { DropdownMenuItemSize } from '../DropdownMenu/DropdownMenu.types';

/**
 * Dropdown menu item data
 */
export interface DropdownItemData {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Item label text
   */
  label: string;
  /**
   * Item size
   * @default 'default'
   */
  size?: DropdownMenuItemSize;
  /**
   * Icon displayed before the label
   */
  leadIcon?: IconType;
  /**
   * Icon displayed after the label
   */
  tailIcon?: IconType;
  /**
   * Caption text (displayed next to label)
   */
  caption?: string;
  /**
   * Description text (displayed below label, only for large size)
   */
  description?: string;
  /**
   * Keyboard shortcut display
   */
  shortcut?: string;
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Dropdown menu section (group of items with optional label)
 */
export interface DropdownSection {
  /**
   * Optional section label
   */
  label?: string;
  /**
   * Items in this section
   */
  items: DropdownItemData[];
}

/**
 * Dropdown placement options
 */
export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'bottom';

/**
 * Dropdown component props
 */
export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Button label text
   */
  label: string;
  /**
   * Menu items or sections
   */
  items: DropdownItemData[] | DropdownSection[];
  /**
   * Currently selected item id
   */
  value?: string;
  /**
   * Callback when an item is selected
   */
  onChange?: (item: DropdownItemData) => void;
  /**
   * Icon displayed before the button label
   */
  leadIcon?: IconType;
  /**
   * Icon displayed after the button label (default: chevron-down)
   * @default ['arrows', 'chevron-down']
   */
  tailIcon?: IconType;
  /**
   * Keyboard shortcut display on button
   */
  shortcut?: string;
  /**
   * Menu placement relative to button
   * @default 'bottom-start'
   */
  placement?: DropdownPlacement;
  /**
   * Menu width (number for pixels, string for CSS value, 'trigger' to match button width)
   */
  menuWidth?: number | string | 'trigger';
  /**
   * Whether the dropdown is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Custom trigger element (overrides default DropdownButton)
   */
  trigger?: ReactNode;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
}
