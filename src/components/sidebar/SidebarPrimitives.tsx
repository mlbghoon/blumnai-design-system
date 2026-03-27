/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon } from "@/components/icons/Icon"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/drawer-sheet/Sheet"
import { Skeleton } from "@/components/skeleton"
import { TooltipTrigger } from "@/components/tooltip/Tooltip/TooltipTrigger"
import type { SidebarProviderProps } from "./Sidebar.types"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "256px"
const SIDEBAR_WIDTH_MOBILE = "288px"
const SIDEBAR_WIDTH_ICON = "48px"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
  collapsible: "offcanvas" | "icon" | "none"
  setCollapsible: (value: "offcanvas" | "icon" | "none") => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  SidebarProviderProps
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      onCollapse,
      onExpand,
      persistState = true,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)
    const [collapsible, setCollapsible] = React.useState<"offcanvas" | "icon" | "none">("offcanvas")

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const openRef = React.useRef(open)
    React.useEffect(() => { openRef.current = open }, [open])

    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(openRef.current) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        if (openState) {
          onExpand?.()
        } else {
          onCollapse?.()
        }

        if (persistState) {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        }
      },
      [setOpenProp, onCollapse, onExpand, persistState]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      if (collapsible === "none") return
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile, collapsible])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (collapsible === "none") return
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar, collapsible])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContextProps>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
        collapsible,
        setCollapsible,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar, collapsible]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
    showRail?: boolean
    showToggleButton?: boolean
    toggleButtonPosition?: "top" | "center" | "bottom"
    toggleButtonOffset?: number | string
    toggleButtonIcon?: React.ReactNode
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      showRail = false,
      showToggleButton = false,
      toggleButtonPosition = "center",
      toggleButtonOffset,
      toggleButtonIcon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile, setCollapsible, toggleSidebar } = useSidebar()

    React.useEffect(() => {
      setCollapsible(collapsible)
    }, [collapsible, setCollapsible])

    // When collapsible="none", always treat as expanded
    const effectiveState = collapsible === "none" ? "expanded" : state

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[var(--sidebar-width)] bg-sidebar padding-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden text-sidebar-foreground md:block"
        data-state={effectiveState}
        data-collapsible={effectiveState === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
            "group-data-[collapsible=offcanvas]:!w-0",
            "group-data-[side=right]:rotate-180",
            // Floating: spacer stays at icon width (sidebar overlays content when expanded)
            variant === "floating"
              ? "!w-[var(--sidebar-width-icon)]"
              : "group-data-[collapsible=icon]:!w-[var(--sidebar-width-icon)]"
          )}
        />
        <div
          className={cn(
            "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "padding-8 group-data-[collapsible=icon]:!w-[var(--sidebar-width-icon)] group-data-[collapsible=icon]:!padding-4"
              : "group-data-[collapsible=icon]:!w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border-solid group-data-[variant=floating]:border-[1px] group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
        {/* Rail toggle - invisible touch area */}
        {showRail && (
          <button
            data-sidebar="rail"
            aria-label="Toggle Sidebar"
            tabIndex={-1}
            onClick={toggleSidebar}
            title="Toggle Sidebar"
            className={cn(
              "fixed inset-y-0 z-20 hidden width-16 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex",
              side === "left"
                ? "left-[var(--sidebar-width)] group-data-[collapsible=icon]:left-[var(--sidebar-width-icon)]"
                : "right-[var(--sidebar-width)] group-data-[collapsible=icon]:right-[var(--sidebar-width-icon)]",
              "cursor-w-resize",
              effectiveState === "collapsed" && "cursor-e-resize"
            )}
          />
        )}
        {/* Toggle button - visible button */}
        {showToggleButton && (
          <button
            type="button"
            data-sidebar="toggle-button"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            aria-expanded={effectiveState === "expanded"}
            title="Toggle Sidebar"
            className={cn(
              "fixed z-20 flex items-center justify-center cursor-pointer",
              "width-24 height-24 rounded-full",
              "bg-default border-default shadow-sm",
              "hover:bg-subtle transition-colors",
              side === "left"
                ? "left-[calc(var(--sidebar-width)-12px)] group-data-[collapsible=icon]:left-[calc(var(--sidebar-width-icon)-12px)]"
                : "right-[calc(var(--sidebar-width)-12px)] group-data-[collapsible=icon]:right-[calc(var(--sidebar-width-icon)-12px)]",
              !toggleButtonOffset && toggleButtonPosition === "top" && "[top:16px]",
              !toggleButtonOffset && toggleButtonPosition === "center" && "top-1/2 -translate-y-1/2",
              !toggleButtonOffset && toggleButtonPosition === "bottom" && "[bottom:16px]"
            )}
            style={toggleButtonOffset !== undefined ? {
              top: typeof toggleButtonOffset === 'number' ? `${toggleButtonOffset}px` : toggleButtonOffset
            } : undefined}
          >
            {toggleButtonIcon || (
              <Icon
                iconType={
                  (effectiveState === "collapsed") !== (side === "right")
                    ? ['arrows', 'arrow-right-s']
                    : ['arrows', 'arrow-left-s']
                }
                size={14}
                color="var(--icon-default-muted)"
              />
            )}
          </button>
        )}
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      type="button"
      data-sidebar="trigger"
      className={cn(
        "height-28 width-28 inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <Icon iconType={['system', 'side-bar']} size={16} />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden width-16 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:[right:-16px] group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:[right:-8px]",
        "[[data-side=right][data-collapsible=offcanvas]_&]:[left:-8px]",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarToggleButton = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<"button">, 'type' | 'style'> & {
    position?: "top" | "center" | "bottom"
    offset?: number | string
    icon?: React.ReactNode
  }
>(({ className, position = "center", offset, icon, ...props }, ref) => {
  const { toggleSidebar, state, collapsible } = useSidebar()

  if (collapsible === "none") return null

  const isCollapsed = state === "collapsed"

  const positionClasses = {
    top: "[top:16px]",
    center: "top-1/2 -translate-y-1/2",
    bottom: "[bottom:16px]",
  }

  return (
    <button
      ref={ref}
      type="button"
      data-sidebar="toggle-button"
      onClick={toggleSidebar}
      aria-label="Toggle Sidebar"
      aria-expanded={state === "expanded"}
      title="Toggle Sidebar"
      className={cn(
        "absolute [right:-12px] z-20 flex items-center justify-center cursor-pointer",
        "width-24 height-24 rounded-full",
        "bg-default border-default shadow-sm",
        "hover:bg-subtle transition-colors",
        "group-data-[side=right]:[left:-12px] group-data-[side=right]:right-auto",
        !offset && positionClasses[position],
        className
      )}
      style={offset !== undefined ? {
        top: typeof offset === 'number' ? `${offset}px` : offset
      } : undefined}
      {...props}
    >
      {icon || (
        <Icon
          iconType={isCollapsed
            ? ['arrows', 'arrow-right-s']
            : ['arrows', 'arrow-left-s']
          }
          size={14}
          color="var(--icon-default-muted)"
          className="group-data-[side=right]:rotate-180"
        />
      )}
    </button>
  )
})
SidebarToggleButton.displayName = "SidebarToggleButton"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:m-[8px] md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-[8px] md:peer-data-[variant=inset]:[margin-left:0] md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      data-sidebar="input"
      className={cn(
        "flex height-32 w-full rounded-md border-solid border-[1px] border-input bg-background padding-x-12 padding-y-4 size-sm font-body line-height-leading-5 shadow-none transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn(
        "flex flex-col ds-gap-8 padding-8",
        "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:padding-x-0",
        className
      )}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn(
        "flex flex-col ds-gap-8 padding-8",
        "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:padding-x-0",
        className
      )}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      data-sidebar="separator"
      className={cn(
        "margin-x-8 w-auto bg-sidebar-border shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col ds-gap-8 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn(
        "relative flex w-full min-w-0 flex-col padding-8",
        "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:padding-x-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex height-32 shrink-0 items-center rounded-md padding-x-8 size-xs font-body font-medium line-height-leading-4 text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:width-16 [&>svg]:height-16 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:[margin-top:-32px] group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-[12px] top-[14px] flex aspect-square width-20 items-center justify-center rounded-md padding-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:width-16 [&>svg]:height-16 [&>svg]:shrink-0",
        "after:absolute after:[inset:-8px] after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full size-sm font-body line-height-leading-5", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn(
      "flex w-full min-w-0 flex-col ds-gap-4 list-none",
      "group-data-[collapsible=icon]:items-center",
      className
    )}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center ds-gap-8 overflow-hidden rounded-md padding-8 text-left size-sm font-body line-height-leading-5 outline-none ring-sidebar-ring transition-[width,height,padding] cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:[padding-right:32px] aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!width-32 group-data-[collapsible=icon]:!padding-8 group-data-[collapsible=icon]:justify-center [&>span:last-child]:truncate [&>svg]:width-16 [&>svg]:height-16 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "height-32 size-sm",
        sm: "height-28 size-xs",
        lg: "height-48 size-sm group-data-[collapsible=icon]:!padding-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | { children: React.ReactNode }
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        aria-current={isActive ? "page" : undefined}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    const tooltipContent = typeof tooltip === "string" ? tooltip : tooltip.children
    const isDisabled = state !== "collapsed" || isMobile

    return (
      <TooltipTrigger
        content={tooltipContent}
        placement="right"
        delay={0}
        disabled={isDisabled}
      >
        {button}
      </TooltipTrigger>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-[4px] top-[6px] flex aspect-square width-20 items-center justify-center rounded-md padding-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:width-16 [&>svg]:height-16 [&>svg]:shrink-0",
        "after:absolute after:[inset:-8px] after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-[4px]",
        "peer-data-[size=default]/menu-button:top-[6px]",
        "peer-data-[size=lg]/menu-button:top-[10px]",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
        "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "pointer-events-none absolute right-[4px] top-[6px] flex height-20 min-w-[20px] select-none items-center justify-center rounded-md padding-x-4 size-xs font-body font-medium line-height-leading-4 tabular-nums text-sidebar-foreground",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  const widthRef = React.useRef<string | null>(null)
  if (widthRef.current === null) {
    // eslint-disable-next-line react-hooks/purity -- Random width for skeleton visual variation is intentional
    widthRef.current = `${Math.floor(Math.random() * 40) + 50}%`
  }
  const width = widthRef.current

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex height-32 items-center ds-gap-8 rounded-md padding-x-8", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="width-16 height-16 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="height-16 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "margin-x-14 flex min-w-0 translate-x-px flex-col ds-gap-4 border-l border-sidebar-border padding-x-10 padding-y-2 list-none",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex height-28 min-w-0 -translate-x-px items-center ds-gap-8 overflow-hidden rounded-md padding-x-8 font-body text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:width-16 [&>svg]:height-16 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "size-xs line-height-leading-4",
        size === "md" && "size-sm line-height-leading-5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarToggleButton,
  SidebarTrigger,
  useSidebar,
}
