import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';
import { getPixelValue } from '@/lib/css-utils';
import { Icon } from '../icons/Icon';
import { buttonVariants } from '../button/Button';
import { ScrollArea } from '../scroll-area';
import { PortalContainerProvider } from '../../utils/PortalContainerContext';
import type {
  DialogProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogScrollAreaProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogActionProps,
} from './Dialog.types';

interface DialogContextValue {
  close: () => void;
  isPending: boolean;
  setIsPending: (pending: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog');
  }
  return context;
};

/**
 * Dialog 컴포넌트
 *
 * 모달 다이얼로그입니다. DialogContent, DialogHeader, DialogFooter와 함께 사용합니다.
 *
 * @example
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogContent>
 *     <DialogHeader><DialogTitle>제목</DialogTitle></DialogHeader>
 *   </DialogContent>
 * </Dialog>
 */
const Dialog = ({ children, open, onOpenChange, defaultOpen, ...props }: DialogProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const [isPending, setIsPending] = React.useState(false);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internalOpen;

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (isPending) return;
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [isControlled, onOpenChange, isPending]);

  const close = React.useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  const contextValue = React.useMemo(() => ({ close, isPending, setIsPending }), [close, isPending]);

  return (
    <DialogContext.Provider value={contextValue}>
      <DialogPrimitive.Root
        open={actualOpen}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
};

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

interface DialogCloseProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {
  asChild?: boolean;
}

const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  DialogCloseProps
>(({ asChild = true, disabled, children, ...props }, ref) => {
  const { isPending } = useDialogContext();
  const isDisabled = disabled || isPending;

  if (asChild && React.isValidElement(children)) {
    return (
      <DialogPrimitive.Close asChild ref={ref} {...props}>
        {React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
          disabled: isDisabled,
        })}
      </DialogPrimitive.Close>
    );
  }

  return (
    <DialogPrimitive.Close ref={ref} disabled={isDisabled} {...props}>
      {children}
    </DialogPrimitive.Close>
  );
});
DialogClose.displayName = DialogPrimitive.Close.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
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
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContentInner = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, hideCloseButton = false, disableEscapeClose = false, disableOutsideClose = false, width, fullScreen = false, overlayClassName, style, onEscapeKeyDown, onPointerDownOutside, onInteractOutside, ...props }, ref) => {
  const { isPending } = useDialogContext();
  const [contentEl, setContentEl] = React.useState<HTMLElement | null>(null);

  const composedRef = React.useCallback(
    (node: React.ElementRef<typeof DialogPrimitive.Content> | null) => {
      setContentEl(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<React.ElementRef<typeof DialogPrimitive.Content> | null>).current = node;
    },
    [ref],
  );

  const widthStyle = width !== undefined && width !== ''
    ? { width: getPixelValue(width) }
    : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(style || {}),
    ...(widthStyle || {}),
  };

  return (
    <DialogPortal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={composedRef}
        onEscapeKeyDown={(e) => {
          if (disableEscapeClose || isPending) {
            e.preventDefault();
          }
          onEscapeKeyDown?.(e);
        }}
        onPointerDownOutside={(e) => {
          if (disableOutsideClose || isPending) {
            e.preventDefault();
          }
          onPointerDownOutside?.(e);
        }}
        onInteractOutside={(e) => {
          if (disableOutsideClose || isPending) {
            e.preventDefault();
          }
          onInteractOutside?.(e);
        }}
        className={cn(
          fullScreen
            ? 'fixed inset-0 z-[10000] grid w-full h-full max-w-none rounded-none overflow-y-auto'
            : 'fixed left-[50%] top-[50%] z-[10000] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
          'ds-gap-16 border-default bg-card padding-24 shadow-modal-lg',
          !fullScreen && 'rounded-lg',
          'duration-200',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          width && !fullScreen && 'max-w-none',
          className
        )}
        style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
        {...props}
      >
        <PortalContainerProvider value={contentEl}>
          {children}
        </PortalContainerProvider>
        {!hideCloseButton && (
          <DialogPrimitive.Close
            disabled={isPending}
            className={cn(
              'absolute [right:20px] [top:20px] rounded-sm cursor-pointer',
              'text-muted hover:text-default',
              'transition-colors duration-150',
              'focus:outline-none focus-visible:shadow-component-misc-focus',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            <Icon iconType={['system', 'close']} size={20} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContentInner.displayName = DialogPrimitive.Content.displayName;

const DialogContent = DialogContentInner;

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col ds-gap-6 text-center sm:text-left', className)}
      {...props}
    />
  )
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
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
DialogFooter.displayName = 'DialogFooter';

const DialogScrollArea = ({ className, maxHeight, children }: DialogScrollAreaProps) => (
  <ScrollArea
    orientation="vertical"
    maxHeight={maxHeight}
    className={className}
  >
    {children}
  </ScrollArea>
);
DialogScrollArea.displayName = 'DialogScrollArea';

const TITLE_WEIGHT = {
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-semibold',
} as const;

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, weight = 'semibold', ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'font-body size-lg line-height-leading-6 letter-spacing-tracking-tight text-default',
      TITLE_WEIGHT[weight],
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'font-body size-sm line-height-leading-5 text-muted',
      className
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogAction = React.forwardRef<
  HTMLButtonElement,
  DialogActionProps
>(({ className, asChild = true, onAction, onClick, disabled, children, ...props }, ref) => {
  const { close, isPending, setIsPending } = useDialogContext();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (onAction) {
      const result = onAction();
      if (result instanceof Promise) {
        setIsPending(true);
        try {
          await result;
          close();
        } finally {
          setIsPending(false);
        }
      } else {
        close();
      }
    } else {
      close();
    }
  };

  const isDisabled = disabled || isPending;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ref,
      onClick: handleClick,
      disabled: isDisabled,
      loading: isPending,
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      onClick={handleClick}
      className={cn(buttonVariants(), 'bg-state-primary text-white border border-transparent', className)}
      {...props}
    >
      {children}
    </button>
  );
});
DialogAction.displayName = 'DialogAction';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogAction,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogScrollArea,
  DialogTitle,
  DialogDescription,
};
