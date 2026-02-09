/* eslint-disable react-refresh/only-export-components */
/**
 * Sidebar Component System
 *
 * Re-exports shadcn/ui sidebar components with SortUI styling applied.
 * The base shadcn sidebar (SidebarPrimitives.tsx) has been customized
 * with design system tokens.
 *
 * This file provides additional wrapper components and custom SortUI components:
 * - SidebarMenuItem: Custom menu item with multiple variants
 * - SidebarUserbar: Custom userbar/header component
 *
 * Width constants (defined in SidebarPrimitives.tsx):
 * - Expanded: 256px - customizable via CSS variable --sidebar-width
 * - Collapsed: 48px - customizable via CSS variable --sidebar-width-icon
 * - Mobile: 288px
 *
 * For the SortUI design (280px expanded, 48px collapsed), set in SidebarProvider:
 * style={{ '--sidebar-width': '280px' }}
 */

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarToggleButton,
  SidebarTrigger,
  useSidebar,
} from './SidebarPrimitives';

export { ScrollArea, ScrollBar } from '../scroll-area/ScrollArea';

export { SidebarMenuItem, menuItemVariants } from './SidebarMenuItem';
export { SidebarUserbar, userbarVariants, collapsedUserbarVariants } from './SidebarUserbar';

export type {
  SidebarMenuItemProps,
  SidebarMenuItemVariant,
  SidebarMenuItemIconType,
  SidebarMenuItemDefaultProps,
  SidebarMenuItemLabelProps,
  SidebarMenuItemCaptionProps,
  SidebarMenuItemButtonsProps,
  SidebarMenuItemDividerProps,
  SidebarMenuItemAvatarProps,
  SidebarMenuItemChildrenProps,
  SidebarUserbarProps,
  SidebarUserbarVariant,
  SidebarUserbarState,
  SidebarWrapperProps,
} from './Sidebar.types';
