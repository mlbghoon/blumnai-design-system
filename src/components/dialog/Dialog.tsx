import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';
import { getPixelValue } from '@/lib/css-utils';
import { Icon, RiCloseLine } from '../icons/Icon';
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
 * ```tsx
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogContent>
 *     <DialogHeader><DialogTitle>제목</DialogTitle></DialogHeader>
 *   </DialogContent>
 * </Dialog>
 * ```
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

/**
 * Dialog 의 본문 컨테이너.
 *
 * **Tall-content 레이아웃 (v1.9.5+)**: `<DialogHeader>` / `<DialogFooter>` 를 직접
 * 자식으로 넣으면 이 두 슬롯이 자동으로 스크롤 영역 바깥에 고정되고 사이의
 * 나머지 children 만 스크롤되는 3-region 레이아웃이 적용됩니다. 커스텀 래퍼
 * (예: `<MyHeader>` 로 감싸기) 를 사용하면 타입 매칭이 실패해 body 스크롤
 * 영역 안쪽으로 들어가므로 — 스틱 동작이 필요하면 `<DialogHeader>` /
 * `<DialogFooter>` 를 직접 사용하세요. `fullScreen` 모드는 이 분리 로직을
 * 적용하지 않고 전체 children 을 그대로 렌더합니다.
 */
const DialogContentInner = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, hideCloseButton = false, disableEscapeClose = false, disableOutsideClose = false, width, fullScreen = false, overlayClassName, container, style, onEscapeKeyDown, onPointerDownOutside, onInteractOutside, ...props }, ref) => {
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
    // non-fullScreen 모드에서 뷰포트 상·하단 16px 여백을 제외하고 최대 높이 제한.
    // Tailwind arbitrary value (`max-h-[calc(100vh_-_32px)]`) 는 dev 모드에서
    // 종종 escape 이슈가 있어 inline style 로 안정적으로 적용.
    ...(fullScreen ? {} : { maxHeight: 'calc(100vh - 32px)' }),
    ...(style || {}),
    ...(widthStyle || {}),
  };

  // 뷰포트-초과 tall content 대응 (non-fullScreen): children 을 DialogHeader /
  // DialogFooter / body 로 분리하여 header·footer 는 스크롤 바깥 (DialogContent
  // 의 flex 레이아웃에 남음) 에, body 만 ScrollArea viewport 안쪽으로 렌더.
  // 결과적으로 스크롤 시에도 헤더·푸터는 위아래에 고정되고 DS 스크롤바 스타일이
  // 그대로 사용됨. DS 슬롯을 쓰지 않는 consumer 는 fallback 으로 모든 children
  // 이 body 로 들어가 기존 동작 유지.
  const splitChildren = React.useMemo(() => {
    if (fullScreen) return { header: null, footer: null, body: children };
    let header: React.ReactNode = null;
    let footer: React.ReactNode = null;
    const body: React.ReactNode[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === DialogHeader) {
        header = child;
      } else if (React.isValidElement(child) && child.type === DialogFooter) {
        footer = child;
      } else {
        body.push(child);
      }
    });
    return { header, footer, body };
  }, [children, fullScreen]);

  return (
    <DialogPortal container={container ?? undefined}>
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
            ? 'fixed inset-0 z-[10000] grid w-full h-full max-w-none rounded-none ds-gap-16 padding-24 overflow-y-auto'
            // 비-fullScreen: outer 는 위치·최대높이·overflow-hidden·모서리·배경·
            // 그림자 만 담당. 내부는 flex-col (header → ScrollArea(body) → footer)
            // 로 분리되어 body 만 스크롤, header·footer 는 항상 고정.
            : 'fixed left-[50%] top-[50%] z-[10000] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg flex flex-col',
          'bg-card shadow-modal-lg',
          // Radix 가 focus trap fallback 으로 DialogContent (tabindex=-1) 에 포커스
          // 를 떨어뜨릴 때 브라우저 기본 outline 이 모달 전체에 그려지는 시각 버그 방지.
          // DialogContent 자체는 인터랙티브 요소가 아니므로 focus ring 은 표시하지 않음.
          'focus:outline-none',
          'duration-200',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          width && !fullScreen && 'max-w-none',
          className
        )}
        style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
        {...props}
      >
        {fullScreen ? (
          <PortalContainerProvider value={contentEl}>
            {children}
          </PortalContainerProvider>
        ) : (
          <PortalContainerProvider value={contentEl}>
            {splitChildren.header}
            {/* Body 스크롤 영역. Radix ScrollArea 는 Viewport 에 h-full 을 주고
                Root 의 flex-computed height 에 의존해서 일부 브라우저/상황에서
                사이즈가 0 으로 수축되는 이슈가 있음. 네이티브 overflow-y-auto
                로 안정화하고 DS 스크롤바 스타일을 arbitrary variants 로 직접
                적용 (Radix ScrollArea 의 시각 스타일과 동일한 색 · 두께). */}
            <div
              className={cn(
                // padding-y-16: 스크롤 컨테이너 안쪽 상·하 16px breathing room.
                // header/footer 가 수직 padding 을 갖지 않으므로 header-body /
                // body-footer 사이의 16px 간격은 이 wrapper 의 padding-y-16 이
                // 단독으로 제공 (원본 grid gap-16 과 동일).
                'flex-1 min-h-0 overflow-y-auto padding-x-24 padding-y-16 flex flex-col ds-gap-16',
                '[&::-webkit-scrollbar]:w-[10px]',
                '[&::-webkit-scrollbar-track]:bg-transparent',
                '[&::-webkit-scrollbar-thumb]:rounded-full',
                '[&::-webkit-scrollbar-thumb]:bg-[color-mix(in_srgb,var(--text-muted)_20%,transparent)]',
                'hover:[&::-webkit-scrollbar-thumb]:bg-[color-mix(in_srgb,var(--text-muted)_35%,transparent)]',
              )}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor:
                  'color-mix(in srgb, var(--text-muted) 20%, transparent) transparent',
              }}
            >
              {splitChildren.body}
            </div>
            {splitChildren.footer}
          </PortalContainerProvider>
        )}
        {!hideCloseButton && (
          <DialogPrimitive.Close
            disabled={isPending}
            className={cn(
              'absolute [right:20px] [top:20px] z-[1] rounded-sm cursor-pointer',
              'text-muted hover:text-default',
              'transition-colors duration-150',
              'focus:outline-none focus-visible:shadow-component-misc-focus',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            <Icon icon={RiCloseLine} size={20} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContentInner.displayName = DialogPrimitive.Content.displayName;

const DialogContent = DialogContentInner;

// 헤더/푸터 의 수직 패딩은 `padding-t-24` / `padding-b-24` / `*-0` 유틸이 DS 에
// 없어 inline style 로 지정. 의도: 헤더 상단 24, 하단 0; 푸터 상단 0, 하단 24.
// 헤더-바디 / 바디-푸터 사이 16px gap 은 body wrapper (ScrollArea 컨테이너) 의
// padding-y-16 이 담당. 덕분에 스크롤 영역 안쪽에도 16px breathing room 확보.
const DIALOG_HEADER_STYLE: React.CSSProperties = { paddingTop: 24, paddingBottom: 0 };
const DIALOG_FOOTER_STYLE: React.CSSProperties = { paddingTop: 0, paddingBottom: 24 };

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col ds-gap-6 text-center sm:text-left',
        'flex-shrink-0 padding-x-24',
        className,
      )}
      style={{ ...DIALOG_HEADER_STYLE, ...style }}
      {...props}
    />
  )
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse ds-gap-8 sm:flex-row sm:justify-end',
        'flex-shrink-0 padding-x-24',
        className,
      )}
      style={{ ...DIALOG_FOOTER_STYLE, ...style }}
      {...props}
    />
  )
);
DialogFooter.displayName = 'DialogFooter';

const DialogScrollArea = ({
  className,
  maxHeight,
  children,
  viewportRef,
  onScrollPositionChange,
}: DialogScrollAreaProps) => (
  <ScrollArea
    orientation="vertical"
    maxHeight={maxHeight}
    className={className}
    viewportRef={viewportRef}
    onScrollPositionChange={onScrollPositionChange}
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
      className={cn(buttonVariants(), 'bg-state-primary text-white-default border border-transparent', className)}
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
