import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';
import { getPixelValue } from '@/lib/css-utils';
import { useMergeRefs } from '@/hooks/use-merge-refs';
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
  fillViewport,
  style,
  ...props
}, ref) => {
  const internalViewportRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(0);

  const mergedViewportRef = useMergeRefs(internalViewportRef, viewportRefProp);

  React.useEffect(() => {
    if (!fillViewport) return;
    const viewport = internalViewportRef.current;
    if (!viewport) return;
    const wrapper = viewport.firstElementChild as HTMLElement | null;
    if (wrapper) {
      wrapper.style.height = '100%';
    }
  }, [fillViewport]);

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
        className={cn(
          'h-full w-full max-w-full rounded-[inherit]',
          // Radix Viewport 의 내부 wrapper 는 기본으로 `display: table` 이라 콘텐츠 너비가
          // children 의 intrinsic max 로 인플레이트됨 → 자식의 `truncate` 가 동작하지 않음.
          // 수직 전용 스크롤에서는 `block` 으로 오버라이드하여 자식이 viewport 너비에 맞춰지도록 함.
          // 수평 / 양방향 스크롤은 horizontal overflow 감지를 위해 `table` 동작을 유지.
          orientation === 'vertical' && '[&>div]:!block',
          // viewport 자체에는 focus ring 표시하지 않음. tabIndex=0 은 keyboard scroll 키
          // (PageUp/Down/Home/End/arrow) 가 동작하도록 유지하지만, scroll 키 입력 시 focus 가
          // viewport 로 떨어지면서 :focus-visible 이 발동해 viewport 전체에 큰 outline 이
          // 그려지는 시각 버그가 발생함. inner 콘텐츠의 focusable 요소들은 자체 focus ring
          // 을 유지하므로 viewport 자체의 ring 은 불필요.
          'focus:outline-none focus-visible:outline-none',
        )}
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
    <ScrollAreaPrimitive.ScrollAreaThumb
      className="relative flex-1 rounded-full cursor-pointer hover:!bg-[color-mix(in_srgb,var(--text-muted)_35%,transparent)]"
      style={{ backgroundColor: 'color-mix(in srgb, var(--text-muted) 20%, transparent)' }}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = 'ScrollBar';

export { ScrollArea, ScrollBar };
