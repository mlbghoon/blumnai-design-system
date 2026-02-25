import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';
import { getPixelValue } from '@/lib/css-utils';
import { ScrollArea } from '../scroll-area';
import type {
  PopoverContentProps,
  PopoverScrollAreaProps,
  PopoverArrowProps,
} from './Popover.types';

/**
 * Popover 컴포넌트
 *
 * 클릭으로 열리는 플로팅 콘텐츠 컨테이너입니다. PopoverTrigger, PopoverContent와 함께 사용합니다.
 *
 * @example
 * <Popover>
 *   <PopoverTrigger asChild><span><Button>열기</Button></span></PopoverTrigger>
 *   <PopoverContent>내용</PopoverContent>
 * </Popover>
 */
const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverPortal = PopoverPrimitive.Portal;

const PopoverClose = PopoverPrimitive.Close;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, width, container, style, ...props }, ref) => {
  const widthStyle = width !== undefined && width !== ''
    ? { width: getPixelValue(width) }
    : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 [width:288px] rounded-lg bg-card padding-16 text-default shadow-modal-sm outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'origin-[--radix-popover-content-transform-origin]',
          width && 'w-auto',
          className
        )}
        style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverScrollArea = ({ className, maxHeight, children }: PopoverScrollAreaProps) => (
  <ScrollArea
    orientation="vertical"
    maxHeight={maxHeight}
    className={className}
  >
    {children}
  </ScrollArea>
);
PopoverScrollArea.displayName = 'PopoverScrollArea';

const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  PopoverArrowProps
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn('fill-card', className)}
    {...props}
  />
));
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverPortal,
  PopoverClose,
  PopoverContent,
  PopoverScrollArea,
  PopoverArrow,
};
