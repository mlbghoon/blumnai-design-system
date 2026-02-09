import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../button/Button';
import { ScrollArea } from '../scroll-area';
import { Button } from '../button/Button';
import type {
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps,
  AlertDialogScrollAreaProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogOverlayProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
  SimpleAlertDialogProps,
} from './AlertDialog.types';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-overlay',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const getPixelValue = (v: string | number): string => {
  if (typeof v === 'number') return `${v}px`;
  const numericValue = parseFloat(v);
  if (!isNaN(numericValue) && String(numericValue) === v.trim()) {
    return `${numericValue}px`;
  }
  return v;
};

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
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
          'gap-16 border-default bg-card padding-24 shadow-modal-lg rounded-lg',
          'duration-200',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
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
      className={cn('flex flex-col gap-6 text-center sm:text-left', className)}
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
        'flex flex-col-reverse gap-8 sm:flex-row sm:justify-end',
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
    className={asChild ? className : cn(buttonVariants(), 'bg-state-primary text-white border border-transparent', className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(({ className, asChild = true, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    asChild={asChild}
    className={asChild ? className : cn(buttonVariants(), 'bg-state-secondary text-default border-default', className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

const SimpleAlertDialog: React.FC<SimpleAlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = '확인',
  onConfirm,
  width,
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent width={width}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button buttonStyle="primary" onClick={handleConfirm}>
              {confirmLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

SimpleAlertDialog.displayName = 'SimpleAlertDialog';

export {
  SimpleAlertDialog,
  AlertDialog,
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
  AlertDialogCancel,
};
