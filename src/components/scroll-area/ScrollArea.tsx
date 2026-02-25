import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';
import { getPixelValue } from '@/lib/css-utils';
import type { ScrollAreaProps, ScrollBarProps } from './ScrollArea.types';

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({
  className,
  children,
  orientation = 'vertical',
  maxHeight,
  maxWidth,
  viewportRef: viewportRefProp,
  onScrollPositionChange,
  type,
  scrollbarSize,
  offsetScrollbars,
  dir,
  style,
  ...props
}, ref) => {
  const internalViewportRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(0);

  const assignRef = React.useCallback((ref: React.Ref<HTMLDivElement | null> | undefined, node: HTMLDivElement | null) => {
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref && typeof ref === 'object') {
      Object.assign(ref, { current: node });
    }
  }, []);

  const mergedViewportRef = React.useCallback((node: HTMLDivElement | null) => {
    (internalViewportRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    assignRef(viewportRefProp, node);
  }, [viewportRefProp, assignRef]);

  React.useEffect(() => {
    if (!onScrollPositionChange) return;
    const viewport = internalViewportRef.current;
    if (!viewport) return;

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        onScrollPositionChange({
          x: viewport.scrollLeft,
          y: viewport.scrollTop,
        });
      });
    };

    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScrollPositionChange]);

  const rootStyle: React.CSSProperties = {
    ...(style || {}),
    ...(maxHeight !== undefined && maxHeight !== '' ? { maxHeight: getPixelValue(maxHeight) } : {}),
    ...(maxWidth !== undefined && maxWidth !== '' ? { maxWidth: getPixelValue(maxWidth) } : {}),
  };

  const viewportStyle: React.CSSProperties = {
    ...(maxHeight !== undefined && maxHeight !== '' ? { maxHeight: getPixelValue(maxHeight) } : {}),
    ...(maxWidth !== undefined && maxWidth !== '' ? { maxWidth: getPixelValue(maxWidth) } : {}),
  };

  const offsetPadding = offsetScrollbars ? (scrollbarSize ?? 10) : 0;
  const viewportPaddingStyle: React.CSSProperties = offsetScrollbars
    ? {
        ...(orientation === 'vertical' || orientation === 'both' ? { paddingRight: `${offsetPadding}px` } : {}),
        ...(orientation === 'horizontal' || orientation === 'both' ? { paddingBottom: `${offsetPadding}px` } : {}),
      }
    : {};

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden min-h-0', className)}
      style={Object.keys(rootStyle).length > 0 ? rootStyle : undefined}
      type={type}
      dir={dir}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={mergedViewportRef}
        className="h-full w-full max-w-full rounded-[inherit]"
        tabIndex={0}
        style={{
          ...(Object.keys(viewportStyle).length > 0 ? viewportStyle : {}),
          ...viewportPaddingStyle,
        }}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(orientation === 'vertical' || orientation === 'both') && (
        <ScrollBar orientation="vertical" size={scrollbarSize} />
      )}
      {(orientation === 'horizontal' || orientation === 'both') && (
        <ScrollBar orientation="horizontal" size={scrollbarSize} />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = 'ScrollArea';

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps & { size?: number }
>(({ className, orientation = 'vertical', size, style, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors z-50 cursor-pointer',
      orientation === 'vertical' &&
        'h-full border-l border-l-transparent padding-1',
      orientation === 'horizontal' &&
        'flex-col border-t border-t-transparent padding-1',
      !size && orientation === 'vertical' && 'width-10',
      !size && orientation === 'horizontal' && 'height-10',
      className
    )}
    style={{
      ...style,
      ...(size && orientation === 'vertical' ? { width: `${size}px` } : {}),
      ...(size && orientation === 'horizontal' ? { height: `${size}px` } : {}),
    }}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border cursor-pointer" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = 'ScrollBar';

export { ScrollArea, ScrollBar };
