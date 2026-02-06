import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';

import type { IconType } from '../icons/Icon/Icon.types';
import type { BadgeProps } from '../badge/Badge/Badge.types';

// ============================================
// SidebarMenuItem Types
// ============================================

/**
 * Menu item variants based on Figma designs.
 * - default: Standard menu item with icon + label
 * - label: Section label (group header)
 * - caption: Menu item with caption/description
 * - buttons: Menu item with action buttons
 * - divider: Horizontal separator
 * - avatar: Menu item with avatar
 * - children: Nested/child menu item
 */
export type SidebarMenuItemVariant =
  | 'default'
  | 'label'
  | 'caption'
  | 'buttons'
  | 'divider'
  | 'avatar'
  | 'children';

/**
 * Extended icon type for SidebarMenuItem that supports isFill option.
 */
export type SidebarMenuItemIconType = IconType | [...IconType, boolean];

export interface SidebarMenuItemBaseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Whether the menu item is in active state.
   * @default false
   */
  isActive?: boolean;
  /**
   * Whether the menu item is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the sidebar is collapsed (icon-only mode).
   * @default false
   */
  collapsed?: boolean;
  /**
   * Tooltip content to show when collapsed.
   */
  tooltip?: string | { children: ReactNode };
}

/**
 * Badge configuration for SidebarMenuItem.
 * Can be a simple string/number or full BadgeProps for customization.
 */
export type SidebarMenuItemBadge = string | number | Omit<BadgeProps, 'onClose' | 'closeIcon'>;

export interface SidebarMenuItemDefaultProps extends SidebarMenuItemBaseProps {
  variant?: 'default';
  /**
   * Icon to display before the label.
   */
  icon?: SidebarMenuItemIconType | ReactNode;
  /**
   * Menu item label text.
   */
  label: string;
  /**
   * Badge to display. Can be simple text/number or full BadgeProps for customization.
   * @example badge="5"
   * @example badge={{ label: "New", color: "blue", shape: "pill" }}
   */
  badge?: SidebarMenuItemBadge;
  /**
   * Shortcut indicator (e.g., "⌘K").
   */
  shortcut?: string;
}

export interface SidebarMenuItemLabelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  variant: 'label';
  /**
   * Section label text.
   */
  label: string;
  /**
   * Icon to display before the label (optional).
   */
  icon?: SidebarMenuItemIconType | ReactNode;
  /**
   * Action button to display on hover.
   */
  action?: ReactNode;
  /**
   * Whether the sidebar is collapsed.
   */
  collapsed?: boolean;
}

export interface SidebarMenuItemCaptionProps extends SidebarMenuItemBaseProps {
  variant: 'caption';
  /**
   * Menu item label text.
   */
  label: string;
  /**
   * Caption/description text.
   */
  caption: string;
}

export interface SidebarMenuItemButtonsProps extends SidebarMenuItemBaseProps {
  variant: 'buttons';
  /**
   * Icon to display.
   */
  icon?: SidebarMenuItemIconType | ReactNode;
  /**
   * Menu item label text.
   */
  label: string;
  /**
   * Action buttons to display.
   */
  actions?: ReactNode;
}

export interface SidebarMenuItemDividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  variant: 'divider';
}

export interface SidebarMenuItemAvatarProps extends SidebarMenuItemBaseProps {
  variant: 'avatar';
  /**
   * Avatar image source URL.
   */
  avatarSrc?: string;
  /**
   * Avatar alt text.
   */
  avatarAlt?: string;
  /**
   * Avatar initials (used when no src).
   */
  avatarInitials?: string;
  /**
   * Menu item label text.
   */
  label: string;
  /**
   * Badge to display. Can be simple text/number or full BadgeProps for customization.
   */
  badge?: SidebarMenuItemBadge;
}

export interface SidebarMenuItemChildrenProps extends SidebarMenuItemBaseProps {
  variant: 'children';
  /**
   * Menu item label text.
   */
  label: string;
  /**
   * Whether this is a nested item (indented).
   * @default true
   */
  nested?: boolean;
}

export type SidebarMenuItemProps =
  | SidebarMenuItemDefaultProps
  | SidebarMenuItemLabelProps
  | SidebarMenuItemCaptionProps
  | SidebarMenuItemButtonsProps
  | SidebarMenuItemDividerProps
  | SidebarMenuItemAvatarProps
  | SidebarMenuItemChildrenProps;

// ============================================
// SidebarUserbar Types
// ============================================

/**
 * Userbar variants based on Figma designs.
 * - variant1: Compact userbar (128x32 expanded, 32x32 collapsed)
 * - variant2: Full userbar with name (280x64 expanded, 48x48 collapsed)
 * - variant3: Medium userbar (280x48 expanded, 48x48 collapsed)
 */
export type SidebarUserbarVariant = 'variant1' | 'variant2' | 'variant3';

/**
 * Userbar state based on interaction.
 */
export type SidebarUserbarState = 'default' | 'hover' | 'opened';

export interface SidebarUserbarProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Userbar variant style.
   * @default 'variant3'
   */
  variant?: SidebarUserbarVariant;
  /**
   * Whether the sidebar is collapsed.
   * @default false
   */
  collapsed?: boolean;
  /**
   * Avatar image source URL.
   */
  avatarSrc?: string;
  /**
   * Avatar alt text.
   */
  avatarAlt?: string;
  /**
   * Avatar initials (used when no src).
   */
  avatarInitials?: string;
  /**
   * User name to display (variant2 and variant3).
   */
  name?: string;
  /**
   * User email or secondary text (variant2 only).
   */
  email?: string;
  /**
   * Whether the dropdown is open.
   * @default false
   */
  isOpen?: boolean;
  /**
   * Callback when clicked.
   */
  onClick?: () => void;
}

// ============================================
// Sidebar Wrapper Types
// ============================================

export interface SidebarWrapperProps {
  /**
   * Custom width when expanded.
   * @default '280px'
   */
  expandedWidth?: string;
  /**
   * Custom width when collapsed (icon-only mode).
   * @default '48px'
   */
  collapsedWidth?: string;
}
