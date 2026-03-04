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
  activeColor?: string;
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
>(({ variant = 'segmented', shape = 'rounded', size = 'sm', type = 'default', scrollable = false, activeColor, className, children, ...props }, ref) => {
  const contextValue = React.useMemo(() => ({ variant, shape, size, type, activeColor }), [variant, shape, size, type, activeColor]);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  React.useEffect(() => {
    if (!scrollable) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      observer.disconnect();
    };
  }, [scrollable, checkScroll]);

  const scrollBy = React.useCallback((dir: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 120, behavior: 'smooth' });
  }, []);

  const containerRadiusClass = shape === 'pill' ? 'rounded-full' : 'rounded-md';

  const listElement = (
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
        scrollable && 'flex-nowrap',
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  );

  if (scrollable) {
    return (
      <TabsContext.Provider value={contextValue}>
        <div className="relative flex items-center">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="이전 탭"
              className="flex-shrink-0 flex items-center justify-center width-24 height-24 rounded-sm bg-default border-default cursor-pointer hover:bg-subtle transition-colors z-[1]"
            >
              <Icon iconType={['arrows', 'arrow-left-s']} size={14} />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-none flex-1 min-w-0"
          >
            {listElement}
          </div>
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="다음 탭"
              className="flex-shrink-0 flex items-center justify-center width-24 height-24 rounded-sm bg-default border-default cursor-pointer hover:bg-subtle transition-colors z-[1]"
            >
              <Icon iconType={['arrows', 'arrow-right-s']} size={14} />
            </button>
          )}
        </div>
      </TabsContext.Provider>
    );
  }

  return (
    <TabsContext.Provider value={contextValue}>
      {listElement}
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
>(({ leadIcon, tailIcon, badge, closable = false, onClose, className, children, value, style, ...props }, ref) => {
  const { variant, shape, size, type, activeColor } = useTabsContext();
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

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (value) onClose?.(value);
  };

  const shapeClass = shape === 'pill' ? 'rounded-full' : 'rounded-sm';

  const closeButton = closable ? (
    <button
      type="button"
      onClick={handleClose}
      aria-label="탭 닫기"
      className="inline-flex items-center justify-center width-14 height-14 rounded-xs text-muted hover:text-default transition-colors cursor-pointer shrink-0"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  ) : null;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      style={activeColor ? { ...style, '--tabs-active-color': activeColor } as React.CSSProperties : style}
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
          'focus-visible:[box-shadow:0_0_0_2px_var(--border-highlight-accent)]',
          'data-[state=active]:![color:var(--text-default)]',
          'data-[state=active]:[border-color:var(--border-darker)]',
          'data-[state=active]:[background-color:var(--bg-state-secondary)]',
          'data-[state=active]:[box-shadow:0_-1px_0_0_rgba(0,0,0,0.08)_inset,0_1px_2px_0_rgba(0,0,0,0.05)]',
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
          activeColor
            ? 'data-[state=active]:![color:var(--tabs-active-color)]'
            : 'data-[state=active]:![color:var(--text-default)]',
          activeColor
            ? 'data-[state=active]:after:[background-color:var(--tabs-active-color)]'
            : 'data-[state=active]:after:[background-color:var(--border-accent)]',
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
          {closeButton}
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
          {closeButton}
        </>
      )}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, animated = false, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'margin-t-8',
      'focus-visible:outline-none focus-visible:shadow-component-misc-focus',
      animated && [
        'data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:duration-200',
        'motion-reduce:data-[state=active]:animate-none',
      ],
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
