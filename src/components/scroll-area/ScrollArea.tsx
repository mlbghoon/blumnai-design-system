import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';
import type { ScrollAreaProps, ScrollBarProps } from './ScrollArea.types';

const getPixelValue = (v: string | number): string => {
  if (typeof v === 'number') return `${v}px`;
  const numericValue = parseFloat(v);
  if (!isNaN(numericValue) && String(numericValue) === v.trim()) {
    return `${numericValue}px`;
  }
  return v;
};

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, orientation = 'vertical', maxHeight, maxWidth, style, ...props }, ref) => {
  const rootStyle: React.CSSProperties = {
    ...(style || {}),
    ...(maxHeight !== undefined && maxHeight !== '' ? { maxHeight: getPixelValue(maxHeight) } : {}),
    ...(maxWidth !== undefined && maxWidth !== '' ? { maxWidth: getPixelValue(maxWidth) } : {}),
  };

  const viewportStyle: React.CSSProperties = {
    ...(maxHeight !== undefined && maxHeight !== '' ? { maxHeight: getPixelValue(maxHeight) } : {}),
    ...(maxWidth !== undefined && maxWidth !== '' ? { maxWidth: getPixelValue(maxWidth) } : {}),
  };

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={Object.keys(rootStyle).length > 0 ? rootStyle : undefined}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className="w-full rounded-[inherit]"
        style={Object.keys(viewportStyle).length > 0 ? viewportStyle : undefined}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(orientation === 'vertical' || orientation === 'both') && (
        <ScrollBar orientation="vertical" />
      )}
      {(orientation === 'horizontal' || orientation === 'both') && (
        <ScrollBar orientation="horizontal" />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = 'ScrollArea';

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors z-50 cursor-pointer',
      orientation === 'vertical' &&
        'h-full width-10 border-l border-l-transparent padding-1',
      orientation === 'horizontal' &&
        'height-10 flex-col border-t border-t-transparent padding-1',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border cursor-pointer" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = 'ScrollBar';

export { ScrollArea, ScrollBar };
