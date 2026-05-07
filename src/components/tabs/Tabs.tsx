import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';
import { ScrollArea } from '../scroll-area/ScrollArea';
import { Icon, RiArrowLeftSLine, RiArrowRightSLine } from '../icons/Icon';
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
import type { BadgeColor } from '../badge/Badge/Badge.types';

interface TabsContextValue {
  variant: TabsVariant;
  shape: TabsShape;
  size: TabsSize;
  type: TabsType;
  activeColor?: string;
  activeTextColor?: string;
  activeUnderlineColor?: string;
  animatedIndicator?: boolean;
  gap?: number;
}

function useTabIndicator(listRef: React.RefObject<HTMLElement | null>, animatedIndicator: boolean) {
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const [ready, setReady] = React.useState(false);
  const initialRef = React.useRef(true);

  const update = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>('[data-state="active"]');
    if (!active) {
      setReady(false);
      return;
    }

    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    setStyle({
      left: activeRect.left - listRect.left + list.scrollLeft,
      top: activeRect.top - listRect.top + list.scrollTop,
      width: activeRect.width,
      height: activeRect.height,
    });

    if (initialRef.current) {
      requestAnimationFrame(() => {
        setReady(true);
        initialRef.current = false;
      });
    }
  }, [listRef]);

  React.useEffect(() => {
    if (!animatedIndicator) return;
    const list = listRef.current;
    if (!list) return;

    update();

    let rafId = 0;
    const debouncedUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const observer = new MutationObserver(update);
    observer.observe(list, { attributes: true, subtree: true, attributeFilter: ['data-state'] });

    const resizeObserver = new ResizeObserver(debouncedUpdate);
    resizeObserver.observe(list);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [animatedIndicator, update, listRef]);

  return { style, ready };
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
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList><TabsTrigger value="tab1">탭 1</TabsTrigger></TabsList>
 *   <TabsContent value="tab1">내용</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = TabsPrimitive.Root;

const UNDERLINE_LIST_SIZE_STYLES = {
  sm: 'ds-gap-12',
  lg: 'ds-gap-16',
} as const;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ variant = 'segmented', shape = 'rounded', size = 'sm', type = 'default', scrollable = false, gap, activeColor, activeTextColor, activeUnderlineColor, animatedIndicator = false, className, children, ...props }, ref) => {
  const contextValue = React.useMemo(() => ({ variant, shape, size, type, activeColor, activeTextColor, activeUnderlineColor, animatedIndicator, gap }), [variant, shape, size, type, activeColor, activeTextColor, activeUnderlineColor, animatedIndicator, gap]);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const internalListRef = React.useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const composedListRef = React.useCallback(
    (node: React.ElementRef<typeof TabsPrimitive.List> | null) => {
      (internalListRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<React.ElementRef<typeof TabsPrimitive.List> | null>).current = node;
    },
    [ref],
  );

  const { style: indicatorStyle, ready: indicatorReady } = useTabIndicator(internalListRef, animatedIndicator);

  const checkScroll = React.useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  React.useEffect(() => {
    if (!scrollable) return;
    const el = viewportRef.current;
    if (!el) return;
    checkScroll();
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => { observer.disconnect(); };
  }, [scrollable, checkScroll]);

  const scrollBy = React.useCallback((dir: number) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 120, behavior: 'smooth' });
  }, []);

  const containerRadiusClass = shape === 'pill' ? 'rounded-full' : 'rounded-md';

  const indicatorElement = animatedIndicator ? (
    <div
      aria-hidden
      className={cn(
        'absolute pointer-events-none',
        variant === 'underline' && [
          '[height:1.5px] bottom-0',
          (activeUnderlineColor || activeColor) ? undefined : '[background-color:var(--border-accent)]',
        ],
        (variant === 'pill' || variant === 'segmented') && [
          shape === 'pill' ? 'rounded-full' : 'rounded-sm',
          '[background-color:var(--bg-state-secondary)]',
          'shadow-components-default',
        ],
      )}
      style={{
        ...(!indicatorReady ? { opacity: 0 } : {}),
        ...(indicatorReady ? { transition: 'left 0.3s ease, top 0.3s ease, width 0.3s ease, height 0.3s ease' } : {}),
        ...(variant === 'underline'
          ? { left: indicatorStyle.left, width: indicatorStyle.width }
          : { left: indicatorStyle.left, top: indicatorStyle.top, width: indicatorStyle.width, height: indicatorStyle.height }
        ),
        ...(variant === 'underline' && (activeUnderlineColor || activeColor) ? { backgroundColor: activeUnderlineColor ?? activeColor } : {}),
      }}
    />
  ) : null;

  const listStyle = variant === 'underline' && gap !== undefined
    ? { ...props.style, gap: `${gap}px` }
    : props.style;

  const listElement = (
    <TabsPrimitive.List
      ref={composedListRef}
      className={cn(
        'inline-flex items-center relative',
        variant === 'pill' && 'ds-gap-8',
        variant === 'segmented' && ['ds-gap-2 padding-2', containerRadiusClass, 'bg-state-soft'],
        variant === 'underline' && ['border-b-default', gap === undefined && UNDERLINE_LIST_SIZE_STYLES[size]],
        type === 'fixed' && 'w-full',
        'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start',
        variant === 'underline' && 'data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r-default',
        scrollable && 'flex-nowrap',
        className
      )}
      {...props}
      style={listStyle}
    >
      {children}
      {indicatorElement}
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
              <Icon icon={RiArrowLeftSLine} size={14} />
            </button>
          )}
          <ScrollArea
            orientation="horizontal"
            viewportRef={viewportRef}
            onScrollPositionChange={checkScroll}
            className="flex-1 min-w-0"
          >
            {listElement}
          </ScrollArea>
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="다음 탭"
              className="flex-shrink-0 flex items-center justify-center width-24 height-24 rounded-sm bg-default border-default cursor-pointer hover:bg-subtle transition-colors z-[1]"
            >
              <Icon icon={RiArrowRightSLine} size={14} />
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

const PILL_SEGMENTED_TRIGGER_SIZE_STYLES = {
  sm: 'height-28 padding-x-8 padding-y-4 ds-gap-4',
  lg: 'height-40 padding-x-12 padding-y-8 ds-gap-6',
} as const;

const UNDERLINE_TRIGGER_SIZE_STYLES = {
  sm: 'height-40 padding-y-6 ds-gap-4',
  lg: 'height-48 padding-y-6 ds-gap-4',
} as const;

const ICON_SIZE = {
  sm: 14,
  lg: 16,
} as const;

const getBadgeBgClass = (color: BadgeColor): string => {
  if (color === 'white') return '';
  if (color === 'neutral') return 'bg-badge-gray';
  return `bg-badge-${color}`;
};

const getBadgeTextColor = (color: BadgeColor): string => {
  if (color === 'white') return 'var(--text-dark-subtle)';
  if (color === 'neutral') return 'var(--text-subtle)';
  return `var(--bg-basic-${color}-strong)`;
};

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ leadIcon, tailIcon, badge, badgeColor, closable = false, onClose, className, children, value, style, ...props }, ref) => {
  const { variant, shape, size, type, activeColor, activeTextColor, activeUnderlineColor, animatedIndicator } = useTabsContext();
  const iconSize = ICON_SIZE[size];

  const badgeElement = badge !== undefined ? (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'min-width-16 height-16 padding-x-4',
        'size-xs font-medium rounded-full',
        badgeColor ? getBadgeBgClass(badgeColor) : 'bg-muted text-muted',
        badgeColor === 'white' && 'border-solid border-[1px] border-default',
      )}
      style={badgeColor ? { color: getBadgeTextColor(badgeColor) } : undefined}
    >
      {badge}
    </span>
  ) : null;

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

  const handleCloseKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (value) onClose?.(value);
    }
  };

  // Use a non-button element here because TabsTrigger renders a parent <button>;
  // nested <button> is invalid HTML and triggers SSR hydration warnings.
  const closeButton = closable ? (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClose}
      onKeyDown={handleCloseKey}
      aria-label="탭 닫기"
      className="inline-flex items-center justify-center width-14 height-14 rounded-xs text-muted hover:text-default transition-colors cursor-pointer shrink-0"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ) : null;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      style={(activeColor || activeTextColor || activeUnderlineColor) ? {
        ...style,
        '--tabs-active-text-color': activeTextColor ?? activeColor,
        '--tabs-active-underline-color': activeUnderlineColor ?? activeColor,
      } as React.CSSProperties : style}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap cursor-pointer',
        'font-body font-medium',
        size === 'lg'
          ? 'size-md line-height-leading-6'
          : 'size-sm line-height-leading-5',
        'transition-colors duration-150',
        'focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        type === 'fixed' && 'flex-1',
        (variant === 'pill' || variant === 'segmented') && [
          PILL_SEGMENTED_TRIGGER_SIZE_STYLES[size],
          shapeClass,
          'text-muted',
          'hover:text-subtle',
          'focus-visible:[box-shadow:0_0_0_2px_var(--border-highlight-accent)]',
          'data-[state=active]:![color:var(--text-default)]',
          animatedIndicator
            ? 'relative z-[1]'
            : [
              'data-[state=active]:[background-color:var(--bg-state-secondary)]',
              'data-[state=active]:shadow-components-default',
              'data-[state=active]:focus-visible:[box-shadow:var(--shadow-components-default),0_0_0_2px_var(--border-highlight-accent)]',
            ],
        ],
        variant === 'underline' && [
          UNDERLINE_TRIGGER_SIZE_STYLES[size],
          'group',
          'text-muted',
          'hover:text-subtle',
          'relative',
          '[margin-bottom:-1px]',
          (activeTextColor || activeColor)
            ? 'data-[state=active]:![color:var(--tabs-active-text-color)]'
            : 'data-[state=active]:![color:var(--text-default)]',
          !animatedIndicator && [
            'after:absolute after:bottom-0 after:left-0 after:right-0 after:[height:1.5px]',
            'after:bg-transparent',
            (activeUnderlineColor || activeColor)
              ? 'data-[state=active]:after:[background-color:var(--tabs-active-underline-color)]'
              : 'data-[state=active]:after:[background-color:var(--border-accent)]',
          ],
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
          {badgeElement}
          {closeButton}
        </span>
      ) : (
        <>
          {leadIcon && renderIcon(leadIcon)}
          {children}
          {tailIcon && renderIcon(tailIcon)}
          {badgeElement}
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
