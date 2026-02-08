import type { ComponentProps } from 'react';
import type { Drawer as DrawerPrimitive } from 'vaul';

/**
 * Drawer 방향
 */
export type DrawerDirection = 'top' | 'bottom' | 'left' | 'right';

/**
 * Drawer Root Props
 * vaul의 Drawer.Root 컴포넌트 props + direction
 */
export type DrawerProps = ComponentProps<typeof DrawerPrimitive.Root> & {
  direction?: DrawerDirection;
};

/**
 * DrawerContent Props
 * vaul의 Drawer.Content 컴포넌트 props
 */
export type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content>;

/**
 * DrawerTrigger Props
 * vaul의 Drawer.Trigger 컴포넌트 props
 */
export type DrawerTriggerProps = ComponentProps<typeof DrawerPrimitive.Trigger>;

/**
 * DrawerClose Props
 * vaul의 Drawer.Close 컴포넌트 props
 */
export type DrawerCloseProps = ComponentProps<typeof DrawerPrimitive.Close>;

/**
 * DrawerTitle Props
 * vaul의 Drawer.Title 컴포넌트 props
 */
export type DrawerTitleProps = ComponentProps<typeof DrawerPrimitive.Title>;

/**
 * DrawerDescription Props
 * vaul의 Drawer.Description 컴포넌트 props
 */
export type DrawerDescriptionProps = ComponentProps<typeof DrawerPrimitive.Description>;
