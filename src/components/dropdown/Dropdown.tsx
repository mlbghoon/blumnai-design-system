import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/utils';
import { Icon } from '../icons/Icon';
import { Avatar } from '../avatar/Avatar';
import { Badge } from '../badge/Badge';
import { Button } from '../button';
import type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuCaptionProps,
  DropdownMenuAvatarProps,
  DropdownMenuUserbarProps,
  DropdownMenuButtonProps,
  DropdownMenuButtonGroupProps,
  MenuButtonProps,
  DropdownMenuSearchProps,
} from './Dropdown.types';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, width, style, container, ...props }, ref) => {
  const widthStyle = width !== undefined && width !== ''
    ? { width: typeof width === 'number' ? `${width}px` : width }
    : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  return (
    <DropdownMenuPrimitive.Portal container={container}>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[128px] overflow-y-auto overflow-x-hidden rounded-lg border-default bg-card padding-4 text-default shadow-modal-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "origin-[--radix-dropdown-menu-content-transform-origin]",
          width && 'w-auto',
          className
        )}
        style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({
  className,
  inset,
  destructive,
  leadIcon,
  leadIconFill = false,
  tailIcon,
  tailIconFill = false,
  iconColor,
  caption,
  description,
  shortcut,
  size = 'default',
  children,
  onClick,
  ...props
}, ref) => {
  const isLarge = size === 'large';
  const effectiveIconColor = props.disabled
    ? 'default-disabled'
    : destructive
      ? 'destructive'
      : iconColor ?? 'default-subtle';

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-8 rounded-sm padding-x-8 size-sm font-body line-height-leading-5 outline-none transition-colors",
        isLarge ? "padding-y-8" : "padding-y-6",
        destructive
          ? "text-destructive focus:bg-state-destructive-soft focus:text-destructive"
          : "text-default focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      style={inset ? { paddingLeft: '32px' } : undefined}
      onClick={onClick}
      {...props}
    >
      {leadIcon && (
        <div className={cn(
          "flex items-center justify-center flex-shrink-0",
          isLarge ? "width-28 height-28 rounded-sm bg-muted" : "width-20 height-20"
        )}>
          <Icon
            iconType={leadIcon}
            size={isLarge ? 16 : 16}
            color={effectiveIconColor}
            isFill={leadIconFill}
          />
        </div>
      )}

      {isLarge && description ? (
        <div className="flex flex-col flex-1 min-w-0 gap-1">
          <span className="truncate">{children}</span>
          <span className="font-body size-xs line-height-leading-4 text-muted truncate">
            {description}
          </span>
        </div>
      ) : (
        <span className="flex-1 min-w-0 truncate">{children}</span>
      )}

      {caption && (
        <span className="font-body size-xs text-muted flex-shrink-0">{caption}</span>
      )}

      {shortcut && (
        <Badge size="sm" color="neutral" border label={shortcut} />
      )}

      {tailIcon && (
        <div className="flex items-center justify-center flex-shrink-0 width-20 height-20">
          <Icon
            iconType={tailIcon}
            size={16}
            color={effectiveIconColor}
            isFill={tailIconFill}
          />
        </div>
      )}
    </DropdownMenuPrimitive.Item>
  );
});
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, caption, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "flex items-center justify-between padding-x-8 padding-y-6 size-xs font-body font-semibold text-muted",
      className
    )}
    style={inset ? { paddingLeft: '32px' } : undefined}
    {...props}
  >
    <span>{children}</span>
    {caption && (
      <span className="font-normal text-hint">{caption}</span>
    )}
  </DropdownMenuPrimitive.Label>
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-margin-x-4 margin-y-4 height-1 bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuShortcut: React.FC<DropdownMenuShortcutProps> = ({
  className,
  ...props
}) => (
  <span
    className={cn("ml-auto size-xs font-body letter-spacing-tracking-wide text-muted", className)}
    {...props}
  />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-8 rounded-sm padding-x-8 padding-y-6 size-sm font-body line-height-leading-5 text-default outline-none",
      "focus:bg-accent data-[state=open]:bg-accent",
      "[&_svg]:pointer-events-none [&_svg]:width-16 [&_svg]:height-16 [&_svg]:shrink-0",
      className
    )}
    style={inset ? { paddingLeft: '32px' } : undefined}
    {...props}
  >
    {children}
    <ChevronRightIcon />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[128px] overflow-hidden rounded-lg border-default bg-card padding-4 text-default shadow-modal-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      "origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

const DropdownMenuCaption = React.forwardRef<HTMLDivElement, DropdownMenuCaptionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "padding-x-8 padding-y-6 font-body size-xs line-height-leading-4 text-muted",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DropdownMenuCaption.displayName = 'DropdownMenuCaption';

const DropdownMenuAvatar = React.forwardRef<HTMLDivElement, DropdownMenuAvatarProps>(
  ({
    className,
    label,
    avatarSrc,
    avatarAlt,
    tailIcon,
    caption,
    shortcut,
    disabled = false,
    iconColor,
    onClick,
    ...props
  }, ref) => {
    const handleClick = () => {
      if (!disabled && onClick) {
        onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClick) {
        e.preventDefault();
        onClick();
      }
    };

    const effectiveIconColor = disabled ? 'default-disabled' : iconColor ?? 'default-subtle';

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex items-center gap-8 rounded-sm padding-x-8 padding-y-6 outline-none transition-colors",
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-accent focus:bg-accent",
          className
        )}
        {...props}
      >
        <Avatar
          variant={avatarSrc ? 'userpic' : 'initials'}
          size="xs"
          shape="rounded"
          src={avatarSrc}
          alt={avatarAlt || label}
          initials={avatarAlt || label}
        />

        <span className={cn(
          "flex-1 min-w-0 truncate font-body size-sm line-height-leading-5",
          disabled ? "text-hint" : "text-default"
        )}>
          {label}
        </span>

        {caption && (
          <span className={cn(
            "font-body size-xs flex-shrink-0",
            disabled ? "text-hint" : "text-muted"
          )}>
            {caption}
          </span>
        )}

        {shortcut && (
          <Badge size="sm" color="neutral" border label={shortcut} />
        )}

        {tailIcon && (
          <div className="flex items-center justify-center flex-shrink-0 width-20 height-20">
            <Icon
              iconType={tailIcon}
              size={16}
              color={effectiveIconColor}
            />
          </div>
        )}
      </div>
    );
  }
);
DropdownMenuAvatar.displayName = 'DropdownMenuAvatar';

const DropdownMenuUserbar = React.forwardRef<HTMLDivElement, DropdownMenuUserbarProps>(
  ({
    className,
    name,
    description,
    avatarSrc,
    avatarAlt,
    badge,
    badgeColor = 'neutral',
    ...props
  }, ref) => (
    <div
      ref={ref}
      role="presentation"
      className={cn(
        "flex items-center gap-12 padding-x-8 padding-y-8",
        className
      )}
      {...props}
    >
      <Avatar
        variant={avatarSrc ? 'userpic' : 'initials'}
        size="md"
        shape="rounded"
        src={avatarSrc}
        alt={avatarAlt || name}
        initials={avatarAlt || name}
      />

      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <span className="font-body size-sm font-medium line-height-leading-5 text-default truncate">
          {name}
        </span>
        {description && (
          <span className="font-body size-xs line-height-leading-4 text-muted truncate">
            {description}
          </span>
        )}
      </div>

      {badge && (
        <Badge size="sm" color={badgeColor} border label={badge} />
      )}
    </div>
  )
);
DropdownMenuUserbar.displayName = 'DropdownMenuUserbar';

const DropdownMenuButton = React.forwardRef<HTMLDivElement, DropdownMenuButtonProps>(
  ({
    className,
    label,
    buttonStyle = 'secondary',
    leadIcon,
    tailIcon,
    disabled = false,
    onClick,
    ...props
  }, ref) => (
    <div
      ref={ref}
      className={cn("padding-x-4 padding-y-4", className)}
      {...props}
    >
      <Button
        buttonStyle={buttonStyle}
        size="sm"
        fullWidth
        leadIcon={leadIcon}
        tailIcon={tailIcon}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  )
);
DropdownMenuButton.displayName = 'DropdownMenuButton';

const DropdownMenuButtonGroup = React.forwardRef<HTMLDivElement, DropdownMenuButtonGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-4 padding-x-4 padding-y-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DropdownMenuButtonGroup.displayName = 'DropdownMenuButtonGroup';

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ className, label, disabled = false, onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex-1 padding-x-8 padding-y-4 rounded-sm font-body size-sm line-height-leading-5 text-default",
        "bg-transparent border border-default",
        "hover:bg-accent focus:outline-none focus:shadow-component-focus",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {label}
    </button>
  )
);
MenuButton.displayName = 'MenuButton';

const DropdownMenuSearch = React.forwardRef<HTMLInputElement, DropdownMenuSearchProps>(
  ({
    className,
    value,
    onChange,
    placeholder = 'Search...',
    autoFocus = true,
    ...props
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={cn("padding-x-4 padding-y-4", className)}>
        <div className="relative">
          <Icon
            iconType={['system', 'search']}
            size={16}
            color="default-muted"
            className="absolute left-8 top-1/2 -translate-y-1/2"
          />
          <input
            ref={(node) => {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn(
              "w-full padding-l-32 padding-r-8 padding-y-6 rounded-sm",
              "font-body size-sm line-height-leading-5 text-default",
              "bg-subtle border-default",
              "placeholder:text-hint",
              "focus:outline-none focus:shadow-component-focus"
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);
DropdownMenuSearch.displayName = 'DropdownMenuSearch';

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ml-auto width-16 height-16"
  >
    <path
      d="M6 12L10 8L6 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCaption,
  DropdownMenuAvatar,
  DropdownMenuUserbar,
  DropdownMenuButton,
  DropdownMenuButtonGroup,
  MenuButton,
  DropdownMenuSearch,
};
