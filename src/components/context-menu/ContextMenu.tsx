import * as React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

import { cn } from '@/lib/utils';
import { Icon } from '../icons/Icon';
import { Badge } from '../badge/Badge';
import { useKeyboardShortcut } from '../../hooks/use-keyboard-shortcut';
import { usePortalContainer } from '../../utils/PortalContainerContext';
import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuCheckboxItemProps,
  ContextMenuRadioItemProps,
  ContextMenuLabelProps,
  ContextMenuSeparatorProps,
  ContextMenuShortcutProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
  ContextMenuCaptionProps,
} from './ContextMenu.types';

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(({ className, width, style, container, ...props }, ref) => {
  const contextContainer = usePortalContainer();
  const widthStyle = width !== undefined && width !== ''
    ? { width: typeof width === 'number' ? `${width}px` : width }
    : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  return (
    <ContextMenuPrimitive.Portal container={container ?? contextContainer ?? undefined}>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 max-h-[var(--radix-context-menu-content-available-height)] min-w-[128px] overflow-y-auto overflow-x-hidden scrollbar-thin rounded-lg border-default bg-card padding-4 text-default shadow-modal-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "origin-[--radix-context-menu-content-transform-origin]",
          width && 'w-auto',
          className
        )}
        style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuContent.displayName = 'ContextMenuContent';

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
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
  const internalRef = React.useRef<HTMLDivElement>(null);
  const mergeRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  useKeyboardShortcut(
    shortcut,
    () => { internalRef.current?.click(); },
    { enabled: !props.disabled },
  );

  const isLarge = size === 'large';
  const effectiveIconColor = props.disabled
    ? 'default-disabled'
    : destructive
      ? 'destructive'
      : iconColor ?? 'default-subtle';

  return (
    <ContextMenuPrimitive.Item
      ref={mergeRefs}
      className={cn(
        "relative flex cursor-default select-none items-center ds-gap-8 rounded-sm padding-x-8 size-sm font-body line-height-leading-5 outline-none transition-colors",
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
            size={16}
            color={effectiveIconColor}
            isFill={leadIconFill}
          />
        </div>
      )}

      {isLarge && description ? (
        <div className="flex flex-col flex-1 min-w-0 ds-gap-2">
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
    </ContextMenuPrimitive.Item>
  );
});
ContextMenuItem.displayName = 'ContextMenuItem';

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(({ className, children, checked, inset, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm padding-y-6 padding-r-8 size-sm font-body line-height-leading-5 outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    style={{ paddingLeft: inset ? '56px' : '32px' }}
    checked={checked}
    {...props}
  >
    <span
      className="absolute flex height-16 width-16 items-center justify-center"
      style={{ left: '8px' }}
    >
      <ContextMenuPrimitive.ItemIndicator>
        <Icon iconType={['system', 'check']} size={16} color="default" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  ContextMenuRadioItemProps
>(({ className, children, inset, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm padding-y-6 padding-r-8 size-sm font-body line-height-leading-5 outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    style={{ paddingLeft: inset ? '56px' : '32px' }}
    {...props}
  >
    <span
      className="absolute flex height-16 width-16 items-center justify-center"
      style={{ left: '8px' }}
    >
      <ContextMenuPrimitive.ItemIndicator>
        <div className="width-8 height-8 rounded-full bg-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  ContextMenuLabelProps
>(({ className, inset, caption, children, ...props }, ref) => (
  <ContextMenuPrimitive.Label
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
  </ContextMenuPrimitive.Label>
));
ContextMenuLabel.displayName = 'ContextMenuLabel';

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  ContextMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-margin-x-4 margin-y-4 height-1 bg-muted", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

const ContextMenuShortcut: React.FC<ContextMenuShortcutProps> = ({
  className,
  ...props
}) => (
  <span
    className={cn("ml-auto size-xs font-body letter-spacing-tracking-wide text-muted", className)}
    {...props}
  />
);
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  ContextMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center ds-gap-8 rounded-sm padding-x-8 padding-y-6 size-sm font-body line-height-leading-5 text-default outline-none",
      "focus:bg-accent data-[state=open]:bg-accent",
      className
    )}
    style={inset ? { paddingLeft: '32px' } : undefined}
    {...props}
  >
    {children}
    <ChevronRightIcon />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  ContextMenuSubContentProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[128px] overflow-hidden rounded-lg border-default bg-card padding-4 text-default shadow-modal-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      "origin-[--radix-context-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = 'ContextMenuSubContent';

const ContextMenuCaption = React.forwardRef<HTMLDivElement, ContextMenuCaptionProps>(
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
ContextMenuCaption.displayName = 'ContextMenuCaption';

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ml-auto width-16 height-16"
    aria-hidden="true"
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
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
  ContextMenuCaption,
};
