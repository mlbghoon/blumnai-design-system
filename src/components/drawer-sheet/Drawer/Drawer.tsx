import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"
import { Icon, RiCloseLine } from "@/components/icons/Icon";
import { PortalContainerProvider } from "../../../utils/PortalContainerContext"

type DrawerDirection = "top" | "bottom" | "left" | "right"

const DrawerContext = React.createContext<{ direction?: DrawerDirection }>({
  direction: "bottom",
})

const Drawer = ({
  shouldScaleBackground = true,
  direction = "bottom",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  direction?: DrawerDirection
}) => (
  <DrawerContext.Provider value={{ direction }}>
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      direction={direction}
      autoFocus
      {...props}
    />
  </DrawerContext.Provider>
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-overlay", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { direction } = React.useContext(DrawerContext)
  const [contentEl, setContentEl] = React.useState<HTMLElement | null>(null)

  const composedRef = React.useCallback(
    (node: React.ElementRef<typeof DrawerPrimitive.Content> | null) => {
      setContentEl(node)
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<React.ElementRef<typeof DrawerPrimitive.Content> | null>).current = node
    },
    [ref],
  )

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={composedRef}
        className={cn(
          "fixed z-50 flex bg-background border",
          direction === "bottom" && "inset-x-0 bottom-0 [margin-top:96px] h-auto flex-col rounded-t-lg",
          direction === "top" && "inset-x-0 top-0 [margin-bottom:96px] h-auto flex-col rounded-b-lg",
          direction === "left" && "inset-y-0 left-0 [margin-right:96px] w-auto h-full flex-col rounded-r-lg",
          direction === "right" && "inset-y-0 right-0 [margin-left:96px] w-auto h-full flex-col rounded-l-lg",
          className
        )}
        {...props}
      >
        <PortalContainerProvider value={contentEl}>
          <DrawerPrimitive.Close className="absolute [right:16px] [top:16px] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <Icon icon={RiCloseLine} size={16} />
            <span className="sr-only">Close</span>
          </DrawerPrimitive.Close>
          {children}
        </PortalContainerProvider>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid ds-gap-6 padding-16 [padding-top:24px] [padding-right:48px] text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col ds-gap-8 padding-16", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "size-lg font-body font-semibold line-height-leading-3 letter-spacing-tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("size-sm font-body line-height-leading-5 text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
