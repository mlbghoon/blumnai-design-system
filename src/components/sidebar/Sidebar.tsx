/* eslint-disable react-refresh/only-export-components */
/**
 * Sidebar Component System
 *
 * Re-exports shadcn/ui sidebar components with SortUI styling applied.
 * The base shadcn sidebar (src/components/ui/sidebar.tsx) has been customized
 * with design system tokens.
 *
 * This file provides additional wrapper components and custom SortUI components:
 * - SidebarMenuItem: Custom menu item with multiple variants
 * - SidebarUserbar: Custom userbar/header component
 *
 * Width constants (defined in ui/sidebar.tsx):
 * - Expanded: 16rem (256px) - customizable via CSS variable --sidebar-width
 * - Collapsed: 3rem (48px) - customizable via CSS variable --sidebar-width-icon
 * - Mobile: 18rem (288px)
 *
 * For the SortUI design (280px expanded, 48px collapsed), set in SidebarProvider:
 * style={{ '--sidebar-width': '17.5rem' }}
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
} from '../ui/sidebar';

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
