/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Icon, renderIconProp, RiArrowDownSLine } from '../icons/Icon';
import type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
  NavigationMenuViewportProps,
  NavigationMenuIndicatorProps,
  NavigationMenuListItemProps,
} from './NavigationMenu.types';

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-10 flex max-w-max flex-1 items-center justify-center',
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = 'NavigationMenu';

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  NavigationMenuListProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'group flex flex-1 list-none items-center justify-center ds-gap-4',
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = 'NavigationMenuList';

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  cn(
    'group inline-flex height-36 w-max items-center justify-center rounded-md bg-transparent',
    'padding-x-16 padding-y-8 size-sm font-body font-medium line-height-leading-5 text-default',
    'transition-colors hover:bg-accent hover:text-accent-foreground',
    'focus:bg-accent focus:text-accent-foreground focus:outline-none',
    'focus-visible:shadow-component-misc-focus focus-visible:rounded-sm',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50',
    'data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent'
  )
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}{' '}
    <Icon
      icon={RiArrowDownSLine}
      size={16}
      color="default-subtle"
      className="relative transition duration-300 group-data-[state=open]:rotate-180"
      style={{ marginLeft: '4px', top: '1px' }}
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(({ className, width, style, ...props }, ref) => {
  const widthStyle =
    width !== undefined && width !== ''
      ? { width: typeof width === 'number' ? `${width}px` : width }
      : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        'left-0 top-0 w-full md:absolute md:w-auto',
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out',
        'data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
        'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52',
        'data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52',
        width && 'w-auto',
        className
      )}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
      {...props}
    />
  );
});
NavigationMenuContent.displayName = 'NavigationMenuContent';

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(({ className, active, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn(
      navigationMenuTriggerStyle(),
      active && 'bg-accent/50 text-accent-foreground',
      className
    )}
    {...props}
  />
));
NavigationMenuLink.displayName = 'NavigationMenuLink';

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center" style={{ marginTop: '6px' }}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'origin-top-center relative h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden',
        'rounded-lg bg-card text-default shadow-modal-sm',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
        'md:w-[var(--radix-navigation-menu-viewport-width)]',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'top-full z-[1] flex height-6 items-end justify-center overflow-hidden',
      'data-[state=visible]:animate-in data-[state=hidden]:animate-out',
      'data-[state=hidden]:fade-out data-[state=visible]:fade-in',
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] height-8 width-8 rotate-45 rounded-tl-sm bg-card border-default shadow-card" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

const NavigationMenuListItem = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuListItemProps
>(({ className, title, description, href, icon, iconFill = false, active, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuPrimitive.Link asChild active={active}>
        <a
          ref={ref}
          href={href}
          className={cn(
            'block rounded-md padding-12 no-underline outline-none transition-colors',
            'hover:bg-accent focus:bg-accent',
            'focus-visible:shadow-component-misc-focus',
            className
          )}
          {...props}
        >
          {children || (
            <div className="flex items-start ds-gap-12">
              {icon && (
                <div className="flex items-center justify-center width-24 height-24 flex-shrink-0" style={{ marginTop: '1px' }}>
                  {renderIconProp(icon, { size: 20, color: 'default-subtle', isFill: iconFill })}
                </div>
              )}
              <div className="flex flex-col ds-gap-2">
                <div className="size-sm font-body font-medium line-height-leading-5 text-default">
                  {title}
                </div>
                {description && (
                  <p className="size-sm font-body line-height-leading-5 text-muted">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}
        </a>
      </NavigationMenuPrimitive.Link>
    </li>
  );
});
NavigationMenuListItem.displayName = 'NavigationMenuListItem';

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavigationMenuListItem,
  navigationMenuTriggerStyle,
};
