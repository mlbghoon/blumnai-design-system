import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';
import { Icon } from '../icons/Icon';
import { parseIconTypeWithFill } from '../icons/Icon/Icon.types';
import type { IconTypeWithFill } from '../icons/Icon/Icon.types';
import type {
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsVariant,
  TabsShape,
  TabsSize,
  TabsType,
} from './Tabs.types';

interface TabsContextValue {
  variant: TabsVariant;
  shape: TabsShape;
  size: TabsSize;
  type: TabsType;
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: 'segmented',
  shape: 'rounded',
  size: 'sm',
  type: 'default',
});

const useTabsContext = () => React.useContext(TabsContext);

/**
 * Tabs 컴포넌트
 *
 * 탭 기반 콘텐츠 전환 컴포넌트입니다. TabsList, TabsTrigger, TabsContent와 함께 사용합니다.
 *
 * @example
 * <Tabs defaultValue="tab1">
 *   <TabsList><TabsTrigger value="tab1">탭 1</TabsTrigger></TabsList>
 *   <TabsContent value="tab1">내용</TabsContent>
 * </Tabs>
 */
const Tabs = TabsPrimitive.Root;

const UNDERLINE_LIST_SIZE_STYLES = {
  sm: 'ds-gap-12',
  lg: 'ds-gap-16',
} as const;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ variant = 'segmented', shape = 'rounded', size = 'sm', type = 'default', className, children, ...props }, ref) => {
  const contextValue = React.useMemo(() => ({ variant, shape, size, type }), [variant, shape, size, type]);

  const containerRadiusClass = shape === 'pill' ? 'rounded-full' : 'rounded-md';

  return (
    <TabsContext.Provider value={contextValue}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          'inline-flex items-center',
          variant === 'pill' && 'ds-gap-8',
          variant === 'segmented' && ['ds-gap-2 padding-2', containerRadiusClass, 'bg-state-soft'],
          variant === 'underline' && ['border-b-default', UNDERLINE_LIST_SIZE_STYLES[size]],
          type === 'fixed' && 'w-full',
          'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start',
          variant === 'underline' && 'data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r-default',
          className
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </TabsContext.Provider>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const PILL_SEGMENTED_TRIGGER_STYLES = 'height-28 padding-x-8 padding-y-4 ds-gap-4';

const UNDERLINE_TRIGGER_SIZE_STYLES = {
  sm: 'height-40 padding-y-6 ds-gap-4',
  lg: 'height-48 padding-y-6 ds-gap-4',
} as const;

const ICON_SIZE = {
  sm: 14,
  lg: 16,
} as const;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ leadIcon, tailIcon, badge, className, children, ...props }, ref) => {
  const { variant, shape, size, type } = useTabsContext();
  const iconSize = variant === 'underline' ? ICON_SIZE[size] : 14;

  const renderIcon = (icon: IconTypeWithFill | React.ReactNode) => {
    if (!icon) return null;

    if (Array.isArray(icon) && icon.length >= 2 && typeof icon[0] === 'string' && typeof icon[1] === 'string') {
      const { iconType, isFill } = parseIconTypeWithFill(icon as IconTypeWithFill);
      return <Icon iconType={iconType} isFill={isFill} size={iconSize} className="shrink-0" />;
    }

    if (React.isValidElement(icon)) {
      return <span className="inline-flex items-center shrink-0">{icon}</span>;
    }

    return null;
  };

  const shapeClass = shape === 'pill' ? 'rounded-full' : 'rounded-sm';

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap',
        'font-body size-sm font-medium line-height-leading-5',
        'transition-all duration-150',
        'focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        type === 'fixed' && 'flex-1',
        (variant === 'pill' || variant === 'segmented') && [
          PILL_SEGMENTED_TRIGGER_STYLES,
          shapeClass,
          'border-solid border-transparent',
          'border-[1px]',
          'text-muted',
          'hover:text-subtle',
          // Focus state (inactive)
          'focus-visible:[box-shadow:0_0_0_2px_var(--border-highlight-accent)]',
          // Active state
          'data-[state=active]:![color:var(--text-default)]',
          'data-[state=active]:[border-color:var(--border-darker)]',
          'data-[state=active]:[background-color:var(--bg-state-secondary)]',
          'data-[state=active]:[box-shadow:0_-1px_0_0_rgba(0,0,0,0.08)_inset,0_1px_2px_0_rgba(0,0,0,0.05)]',
          // Focus + Active state (combined shadows)
          'data-[state=active]:focus-visible:[box-shadow:0_-1px_0_0_rgba(0,0,0,0.08)_inset,0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_2px_var(--border-highlight-accent)]',
        ],
        variant === 'underline' && [
          UNDERLINE_TRIGGER_SIZE_STYLES[size],
          'group',
          'text-muted',
          'hover:text-subtle',
          'relative',
          '[margin-bottom:-1px]',
          'after:absolute after:bottom-0 after:left-0 after:right-0 after:[height:1.5px]',
          'after:bg-transparent',
          'data-[state=active]:![color:var(--text-default)]',
          'data-[state=active]:after:[background-color:var(--border-accent)]',
        ],
        className
      )}
      {...props}
    >
      {variant === 'underline' ? (
        <span
          className={cn(
            'inline-flex items-center justify-center ds-gap-4',
            'height-28 padding-x-6 rounded-md',
            'group-focus-visible:[box-shadow:0_0_0_2px_var(--border-highlight-accent)]'
          )}
        >
          {leadIcon && renderIcon(leadIcon)}
          {children}
          {tailIcon && renderIcon(tailIcon)}
          {badge !== undefined && (
            <span
              className={cn(
                'inline-flex items-center justify-center',
                'min-width-16 height-16 padding-x-4',
                'size-xs font-medium rounded-full',
                'bg-muted text-muted'
              )}
            >
              {badge}
            </span>
          )}
        </span>
      ) : (
        <>
          {leadIcon && renderIcon(leadIcon)}
          {children}
          {tailIcon && renderIcon(tailIcon)}
          {badge !== undefined && (
            <span
              className={cn(
                'inline-flex items-center justify-center',
                'min-width-16 height-16 padding-x-4',
                'size-xs font-medium rounded-full',
                'bg-muted text-muted'
              )}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'margin-t-8',
      'focus-visible:outline-none focus-visible:shadow-component-misc-focus',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
