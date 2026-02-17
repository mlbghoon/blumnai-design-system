/* eslint-disable react-refresh/only-export-components */
import type * as React from 'react';
import { forwardRef, isValidElement, useRef, useCallback } from 'react';
import { cva } from 'class-variance-authority';

import { useKeyboardShortcut } from '../../hooks/use-keyboard-shortcut';

import { Icon } from '../icons/Icon';
import type { IconType } from '../icons/Icon/Icon.types';
import { Avatar } from '../avatar/Avatar/Avatar';
import { Badge } from '../badge/Badge/Badge';
import { cn } from '../../lib/utils';
import {
  SidebarMenuItem as ShadcnSidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from './SidebarPrimitives';

import type {
  SidebarMenuItemProps,
  SidebarMenuItemDefaultProps,
  SidebarMenuItemLabelProps,
  SidebarMenuItemCaptionProps,
  SidebarMenuItemButtonsProps,
  SidebarMenuItemDividerProps,
  SidebarMenuItemAvatarProps,
  SidebarMenuItemChildrenProps,
  SidebarMenuItemIconType,
  SidebarMenuItemBadge,
} from './Sidebar.types';

const ICON_SIZE = 18;

// Shortcut styling (matching Button component)
const SHORTCUT_CLASSES = 'min-width-16 height-16 size-xs padding-x-4 rounded-xs';
const SHORTCUT_STYLE = 'bg-muted border border-default text-subtle';

// Helper to render badge
const renderBadge = (badge: SidebarMenuItemBadge) => {
  if (typeof badge === 'string' || typeof badge === 'number') {
    return <Badge label={String(badge)} size="sm" color="neutral" />;
  }
  // Full BadgeProps object
  return <Badge size="sm" color="neutral" {...badge} />;
};

const menuItemVariants = cva(
  'flex w-full items-center rounded-sm font-body size-sm line-height-leading-5 text-default transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        default: 'height-32 padding-6 gap-6',
        label: 'height-24 padding-x-8 padding-y-4 gap-4',
        caption: 'min-height-40 padding-x-10 padding-y-6 gap-2',
        buttons: 'height-32 gap-4',
        divider: 'height-8 padding-x-0 padding-y-0',
        avatar: 'height-32 padding-6 gap-6',
        children: 'height-32 padding-6 gap-6',
      },
      state: {
        default: '',
        hover: 'bg-state-ghost-hover',
        active: 'bg-state-soft',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'default',
    },
  }
);

const renderIcon = (icon: SidebarMenuItemIconType | React.ReactNode, size: number = ICON_SIZE) => {
  if (!icon) return null;
  if (typeof icon === 'object' && !Array.isArray(icon) && Object.keys(icon as object).length === 0) return null;

  if (Array.isArray(icon) && (icon.length === 2 || icon.length === 3) && typeof icon[0] === 'string' && typeof icon[1] === 'string') {
    const fillValue = icon[2] as boolean | string | undefined;
    const isFill = icon.length === 3 && (fillValue === true || fillValue === 'true');
    return (
      <Icon
        iconType={[icon[0], icon[1]] as IconType}
        isFill={isFill}
        size={size}
        color="var(--icon-default-muted)"
      />
    );
  }

  if (!isValidElement(icon)) return null;
  return <span className="inline-flex items-center">{icon}</span>;
};

// Default variant component
const DefaultMenuItem = forwardRef<HTMLButtonElement, SidebarMenuItemDefaultProps>(
  ({ icon, label, badge, shortcut, isActive, disabled, collapsed, tooltip, className, ...props }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const mergeRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref],
    );

    useKeyboardShortcut(
      shortcut,
      () => { internalRef.current?.click(); },
      { enabled: !disabled },
    );

    const { state } = useSidebar();
    const isCollapsed = collapsed ?? state === 'collapsed';

    return (
      <ShadcnSidebarMenuItem>
        <SidebarMenuButton
          ref={mergeRefs}
          isActive={isActive}
          disabled={disabled}
          tooltip={tooltip || label}
          className={cn(
            menuItemVariants({ variant: 'default', state: isActive ? 'active' : disabled ? 'disabled' : 'default' }),
            className
          )}
          {...props}
        >
          {icon && (
            <span className="flex items-center justify-center width-20 height-20 shrink-0">
              {renderIcon(icon)}
            </span>
          )}
          {!isCollapsed && (
            <>
              <span className="flex-1 truncate">{label}</span>
              {shortcut && (
                <span className={cn('inline-flex items-center justify-center leading-none', SHORTCUT_CLASSES, SHORTCUT_STYLE)}>
                  {shortcut}
                </span>
              )}
              {badge && renderBadge(badge)}
            </>
          )}
        </SidebarMenuButton>
      </ShadcnSidebarMenuItem>
    );
  }
);
DefaultMenuItem.displayName = 'DefaultMenuItem';

// Label variant component
const LabelMenuItem = forwardRef<HTMLDivElement, SidebarMenuItemLabelProps>(
  ({ label, icon, action, collapsed, className, ...props }, ref) => {
    const { state } = useSidebar();
    const isCollapsed = collapsed ?? state === 'collapsed';

    if (isCollapsed) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          menuItemVariants({ variant: 'label' }),
          'text-muted size-xs font-medium select-none',
          className
        )}
        {...props}
      >
        {icon && (
          <span className="flex items-center justify-center width-16 height-16 shrink-0">
            {renderIcon(icon, 16)}
          </span>
        )}
        <span className="flex-1 truncate uppercase letter-spacing-tracking-wide">{label}</span>
        {action && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            {action}
          </span>
        )}
      </div>
    );
  }
);
LabelMenuItem.displayName = 'LabelMenuItem';

// Caption variant component
const CaptionMenuItem = forwardRef<HTMLButtonElement, SidebarMenuItemCaptionProps>(
  ({ label, caption, isActive, disabled, collapsed, tooltip, className, variant: _variant, ...props }, ref) => {
    const { state } = useSidebar();
    const isCollapsed = collapsed ?? state === 'collapsed';

    return (
      <ShadcnSidebarMenuItem>
        <SidebarMenuButton
          ref={ref}
          isActive={isActive}
          disabled={disabled}
          tooltip={tooltip || label}
          className={cn(
            menuItemVariants({ variant: 'caption', state: isActive ? 'active' : disabled ? 'disabled' : 'default' }),
            '!h-auto flex-col items-start justify-center !overflow-visible',
            className
          )}
          {...props}
        >
          {!isCollapsed && (
            <>
              <span className="font-body size-sm font-medium w-full">{label}</span>
              <span className="font-body size-xs text-muted w-full">{caption}</span>
            </>
          )}
        </SidebarMenuButton>
      </ShadcnSidebarMenuItem>
    );
  }
);
CaptionMenuItem.displayName = 'CaptionMenuItem';

// Buttons variant component
const ButtonsMenuItem = forwardRef<HTMLButtonElement, SidebarMenuItemButtonsProps>(
  ({ icon, label, actions, isActive, disabled, collapsed, tooltip: _tooltip, className, variant: _variant, ...props }, ref) => {
    const { state } = useSidebar();
    const isCollapsed = collapsed ?? state === 'collapsed';

    return (
      <ShadcnSidebarMenuItem>
        <div className={cn(
          'group/buttons flex items-center w-full rounded-sm transition-colors',
          isActive ? 'bg-state-soft' : 'hover:bg-state-ghost-hover',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}>
          <button
            ref={ref}
            disabled={disabled}
            className={cn(
              'flex-1 flex items-center height-32 padding-x-10 gap-6 font-body size-sm text-default',
              'bg-transparent border-none cursor-pointer text-left',
              disabled && 'cursor-not-allowed'
            )}
            {...props}
          >
            {icon && (
              <span className="flex items-center justify-center width-16 height-16 shrink-0">
                {renderIcon(icon, 16)}
              </span>
            )}
            {!isCollapsed && <span className="flex-1 truncate">{label}</span>}
          </button>
          {actions && !isCollapsed && (
            <div className="flex items-center gap-6 padding-r-8 opacity-0 group-hover/buttons:opacity-100 transition-opacity">
              {actions}
            </div>
          )}
        </div>
      </ShadcnSidebarMenuItem>
    );
  }
);
ButtonsMenuItem.displayName = 'ButtonsMenuItem';

// Divider variant component
const DividerMenuItem = forwardRef<HTMLDivElement, SidebarMenuItemDividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          menuItemVariants({ variant: 'divider' }),
          'my-4',
          className
        )}
        {...props}
      >
        <div className="w-full height-2 bg-divider" />
      </div>
    );
  }
);
DividerMenuItem.displayName = 'DividerMenuItem';

// Avatar variant component
const AvatarMenuItem = forwardRef<HTMLButtonElement, SidebarMenuItemAvatarProps>(
  ({ avatarSrc, avatarAlt, avatarInitials, label, badge, isActive, disabled, collapsed, tooltip, className, variant: _variant, ...props }, ref) => {
    const { state } = useSidebar();
    const isCollapsed = collapsed ?? state === 'collapsed';

    return (
      <ShadcnSidebarMenuItem>
        <SidebarMenuButton
          ref={ref}
          isActive={isActive}
          disabled={disabled}
          tooltip={tooltip || label}
          className={cn(
            menuItemVariants({ variant: 'avatar', state: isActive ? 'active' : disabled ? 'disabled' : 'default' }),
            className
          )}
          {...props}
        >
          <Avatar
            size="xs"
            shape="circular"
            variant={avatarSrc ? 'userpic' : avatarInitials ? 'initials' : 'empty'}
            src={avatarSrc}
            alt={avatarAlt}
            initials={avatarInitials}
          />
          {!isCollapsed && (
            <>
              <span className="flex-1 truncate">{label}</span>
              {badge && renderBadge(badge)}
            </>
          )}
        </SidebarMenuButton>
      </ShadcnSidebarMenuItem>
    );
  }
);
AvatarMenuItem.displayName = 'AvatarMenuItem';

// Children variant component
const ChildrenMenuItem = forwardRef<HTMLButtonElement, SidebarMenuItemChildrenProps>(
  ({ label, nested = true, isActive, disabled, collapsed, tooltip, className, variant: _variant, ...props }, ref) => {
    const { state } = useSidebar();
    const isCollapsed = collapsed ?? state === 'collapsed';

    if (isCollapsed) {
      return null;
    }

    return (
      <ShadcnSidebarMenuItem>
        <SidebarMenuButton
          ref={ref}
          isActive={isActive}
          disabled={disabled}
          tooltip={tooltip || label}
          className={cn(
            menuItemVariants({ variant: 'children', state: isActive ? 'active' : disabled ? 'disabled' : 'default' }),
            nested && 'padding-l-12',
            className
          )}
          {...props}
        >
          <span className="flex-1 truncate">{label}</span>
        </SidebarMenuButton>
      </ShadcnSidebarMenuItem>
    );
  }
);
ChildrenMenuItem.displayName = 'ChildrenMenuItem';

// Type guards
const isDefaultVariant = (props: SidebarMenuItemProps): props is SidebarMenuItemDefaultProps =>
  !('variant' in props) || props.variant === 'default';
const isLabelVariant = (props: SidebarMenuItemProps): props is SidebarMenuItemLabelProps =>
  'variant' in props && props.variant === 'label';
const isCaptionVariant = (props: SidebarMenuItemProps): props is SidebarMenuItemCaptionProps =>
  'variant' in props && props.variant === 'caption';
const isButtonsVariant = (props: SidebarMenuItemProps): props is SidebarMenuItemButtonsProps =>
  'variant' in props && props.variant === 'buttons';
const isDividerVariant = (props: SidebarMenuItemProps): props is SidebarMenuItemDividerProps =>
  'variant' in props && props.variant === 'divider';
const isAvatarVariant = (props: SidebarMenuItemProps): props is SidebarMenuItemAvatarProps =>
  'variant' in props && props.variant === 'avatar';
const isChildrenVariant = (props: SidebarMenuItemProps): props is SidebarMenuItemChildrenProps =>
  'variant' in props && props.variant === 'children';

// Main SidebarMenuItem component
export const SidebarMenuItem = forwardRef<HTMLButtonElement | HTMLDivElement, SidebarMenuItemProps>(
  (props, ref) => {
    if (isLabelVariant(props)) {
      return <LabelMenuItem ref={ref as React.Ref<HTMLDivElement>} {...props} />;
    }
    if (isDividerVariant(props)) {
      return <DividerMenuItem ref={ref as React.Ref<HTMLDivElement>} {...props} />;
    }
    if (isCaptionVariant(props)) {
      return <CaptionMenuItem ref={ref as React.Ref<HTMLButtonElement>} {...props} />;
    }
    if (isButtonsVariant(props)) {
      return <ButtonsMenuItem ref={ref as React.Ref<HTMLButtonElement>} {...props} />;
    }
    if (isAvatarVariant(props)) {
      return <AvatarMenuItem ref={ref as React.Ref<HTMLButtonElement>} {...props} />;
    }
    if (isChildrenVariant(props)) {
      return <ChildrenMenuItem ref={ref as React.Ref<HTMLButtonElement>} {...props} />;
    }
    if (isDefaultVariant(props)) {
      return <DefaultMenuItem ref={ref as React.Ref<HTMLButtonElement>} {...props} />;
    }
    return null;
  }
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

export { menuItemVariants };
