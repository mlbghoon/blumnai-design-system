import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';

import { cn } from '@/lib/utils';
import { Icon } from '../icons/Icon';
import { Badge } from '../badge/Badge';
import type {
  MenubarContentProps,
  MenubarItemProps,
  MenubarCheckboxItemProps,
  MenubarRadioItemProps,
  MenubarLabelProps,
  MenubarSeparatorProps,
  MenubarShortcutProps,
  MenubarSubTriggerProps,
  MenubarSubContentProps,
  MenubarCaptionProps,
} from './Menubar.types';

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex height-36 items-center gap-4 rounded-lg border-default bg-card padding-4",
      className
    )}
    {...props}
  />
));
Menubar.displayName = 'Menubar';

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />;
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub {...props} />;
}

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm padding-x-12 padding-y-6 size-sm font-body font-medium line-height-leading-5 text-default outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = 'MenubarTrigger';

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  width,
  style,
  container,
  ...props
}, ref) => {
  const widthStyle = width !== undefined && width !== ''
    ? { width: typeof width === 'number' ? `${width}px` : width }
    : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  return (
    <MenubarPrimitive.Portal container={container}>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-lg border-default bg-card padding-4 text-default shadow-modal-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "origin-[--radix-menubar-content-transform-origin]",
          width && 'w-auto',
          className
        )}
        style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
});
MenubarContent.displayName = 'MenubarContent';

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  MenubarSubContentProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-lg border-default bg-card padding-4 text-default shadow-modal-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      "origin-[--radix-menubar-content-transform-origin]",
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = 'MenubarSubContent';

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-8 rounded-sm padding-x-8 padding-y-6 size-sm font-body line-height-leading-5 text-default outline-none",
      "focus:bg-accent data-[state=open]:bg-accent",
      inset && "padding-l-32",
      className
    )}
    {...props}
  >
    {children}
    <Icon iconType={['arrows', 'arrow-right-s']} size={16} color="default-subtle" className="ml-auto" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = 'MenubarSubTrigger';

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
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
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-8 rounded-sm padding-x-8 size-sm font-body line-height-leading-5 outline-none transition-colors",
        isLarge ? "padding-y-8" : "padding-y-6",
        destructive
          ? "text-destructive focus:bg-state-destructive-soft focus:text-destructive"
          : "text-default focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "padding-l-32",
        className
      )}
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
        <span className="font-body size-xs line-height-leading-4 text-muted flex-shrink-0">{caption}</span>
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
    </MenubarPrimitive.Item>
  );
});
MenubarItem.displayName = 'MenubarItem';

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  MenubarCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm padding-y-6 padding-r-8 padding-l-32 size-sm font-body line-height-leading-5 outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-8 flex height-16 width-16 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Icon iconType={['system', 'check']} size={16} color="default" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  MenubarRadioItemProps
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm padding-y-6 padding-r-8 padding-l-32 size-sm font-body line-height-leading-5 outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-8 flex height-16 width-16 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <div className="width-8 height-8 rounded-full bg-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = 'MenubarRadioItem';

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  MenubarLabelProps
>(({ className, inset, caption, children, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "flex items-center justify-between padding-x-8 padding-y-6 size-xs font-body font-semibold line-height-leading-4 text-muted",
      inset && "padding-l-32",
      className
    )}
    {...props}
  >
    <span>{children}</span>
    {caption && (
      <span className="font-normal text-hint">{caption}</span>
    )}
  </MenubarPrimitive.Label>
));
MenubarLabel.displayName = 'MenubarLabel';

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  MenubarSeparatorProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-margin-x-4 margin-y-4 height-1 bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = 'MenubarSeparator';

const MenubarShortcut: React.FC<MenubarShortcutProps> = ({
  className,
  ...props
}) => (
  <span
    className={cn("ml-auto size-xs font-body letter-spacing-tracking-wide text-muted", className)}
    {...props}
  />
);
MenubarShortcut.displayName = 'MenubarShortcut';

const MenubarCaption = React.forwardRef<HTMLDivElement, MenubarCaptionProps>(
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
MenubarCaption.displayName = 'MenubarCaption';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarRadioGroup,
  MenubarCaption,
};
