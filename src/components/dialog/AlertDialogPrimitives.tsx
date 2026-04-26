import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/utils';
import { getPixelValue } from '@/lib/css-utils';
import { buttonVariants } from '../button/Button';
import { ScrollArea } from '../scroll-area';
import type {
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps,
  AlertDialogScrollAreaProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogOverlayProps,
  AlertDialogActionProps,
} from './AlertDialog.types';

const AlertDialogRoot = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[10000] bg-overlay',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, width, style, ...props }, ref) => {
  const widthStyle = width !== undefined && width !== ''
    ? { width: getPixelValue(width) }
    : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className={cn(
          'fixed left-[50%] top-[50%] z-[10000] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
          'ds-gap-16 bg-card padding-24 shadow-modal-lg rounded-lg',
          'duration-200',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          width && 'max-w-none',
          className
        )}
        style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
        {...props}
      />
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = React.forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col ds-gap-6 text-center sm:text-left', className)}
      {...props}
    />
  )
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = React.forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse ds-gap-8 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  )
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogScrollArea = ({ className, maxHeight, children }: AlertDialogScrollAreaProps) => (
  <ScrollArea
    orientation="vertical"
    maxHeight={maxHeight}
    className={className}
  >
    {children}
  </ScrollArea>
);
AlertDialogScrollArea.displayName = 'AlertDialogScrollArea';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      'font-body size-lg font-semibold line-height-leading-6 letter-spacing-tracking-tight text-default',
      className
    )}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      'font-body size-sm line-height-leading-5 text-muted',
      className
    )}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, asChild = true, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    asChild={asChild}
    className={asChild ? className : cn(buttonVariants(), 'bg-state-primary text-white-default border border-transparent', className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

export {
  AlertDialogRoot,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogScrollArea,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
};
