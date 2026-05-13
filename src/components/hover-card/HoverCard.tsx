import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import { cn } from '@/lib/utils';
import { usePortalContainer } from '../../utils/PortalContainerContext';
import type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
  HoverCardArrowProps,
} from './HoverCard.types';

const HoverCard = ({ ...props }: HoverCardProps) => (
  <HoverCardPrimitive.Root {...props} />
);
HoverCard.displayName = 'HoverCard';

const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Trigger>,
  HoverCardTriggerProps
>(({ ...props }, ref) => <HoverCardPrimitive.Trigger ref={ref} {...props} />);
HoverCardTrigger.displayName = 'HoverCardTrigger';

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, container, width, style, ...props }, ref) => {
  const contextContainer = usePortalContainer();
  return (
  <HoverCardPrimitive.Portal container={container ?? contextContainer ?? undefined}>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'blumnai-floating-content blumnai-hover-card-content',
        'z-50 rounded-lg bg-card padding-16 text-default shadow-modal-sm outline-none',
        !width && '[width:256px]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'origin-[--radix-hover-card-content-transform-origin]',
        className
      )}
      style={width ? { width: typeof width === 'number' ? `${width}px` : width, ...style } : style}
      {...props}
    />
  </HoverCardPrimitive.Portal>
  );
});
HoverCardContent.displayName = 'HoverCardContent';

const HoverCardArrow = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Arrow>,
  HoverCardArrowProps
>(({ className, ...props }, ref) => (
  <HoverCardPrimitive.Arrow
    ref={ref}
    className={cn('fill-card', className)}
    {...props}
  />
));
HoverCardArrow.displayName = 'HoverCardArrow';

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardArrow };
