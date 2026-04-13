/**
 * Blumnai Design System
 *
 * @packageDocumentation
 */

import './index.css';

// =============================================================================
// BUTTONS
// =============================================================================
export {
  Button,
  buttonVariants,
  LinkButton,
  linkButtonVariants,
  ControlButton,
  controlButtonVariants,
  FilterButton,
  filterButtonVariants,
  AvatarButton,
  avatarButtonVariants,
  ButtonGroup,
} from './components/button';

export type {
  ButtonProps,
  ButtonStyle,
  ButtonVariant,
  ButtonSize,
  ButtonShape,
  ButtonIconType,
  ButtonColor,
  LinkButtonProps,
  LinkButtonSize,
  LinkButtonType,
  LinkButtonIconType,
  ControlButtonProps,
  ControlButtonSize,
  ControlButtonShape,
  ControlButtonStyle,
  FilterButtonProps,
  FilterButtonSize,
  FilterButtonShape,
  AvatarButtonProps,
  AvatarButtonSize,
  AvatarButtonStyle,
  AvatarButtonIconType,
  ButtonGroupProps,
  ButtonGroupSize,
  ButtonGroupItem,
} from './components/button';

// =============================================================================
// FORM INPUTS
// =============================================================================
export { Input } from './components/input';
export type {
  InputProps,
  InputStyle,
  InputSize,
  InputVariant,
  InputBaseProps,
  DefaultVariantProps,
  ShortcutVariantProps,
  TagsVariantProps,
  InlineTagsVariantProps,
  TailDropdownVariantProps,
  LeadDropdownVariantProps,
  QuantityVariantProps,
  Quantity2VariantProps,
  TailButtonVariantProps,
  LeadButtonVariantProps,
  AddOnVariantProps,
  InlineAddOnVariantProps,
  PasswordVariantProps,
  PasswordStrength,
  DropdownOption,
  IconTypeWithFill,
} from './components/input';

export { Textarea } from './components/textarea';
export type {
  TextareaProps,
  TextareaStyle,
  TextareaSize,
  TextareaResize,
  TextareaToolbarAction,
} from './components/textarea';

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './components/select';
export type {
  SelectProps,
  SelectStyle,
  SelectSize,
  SelectVariant,
  SelectType,
  SelectOption,
  SelectBaseProps,
  DefaultSelectProps,
  AvatarSelectProps,
  MultiSelectProps,
  TagsSelectProps,
  RadixMultiSelectProps,
  RadixMultiSelectVariant,
  SelectTriggerProps,
  SelectContentProps,
  ExtendedSelectItemProps,
  ExtendedSelectProps,
  MultiSelectItemProps,
  SelectOptionGroup,
} from './components/select';

export { TruncatedText } from './components/select';
export type { TruncatedTextProps } from './components/select';

export { Combobox } from './components/select/Combobox';
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxStyle,
  ComboboxSize,
  ComboboxVariant,
  ComboboxBaseProps,
  DefaultComboboxProps,
  AvatarComboboxProps,
  TagsComboboxProps,
} from './components/select/Combobox';

export { VirtualSelect } from './components/virtual-select';
export type {
  VirtualSelectProps,
  VirtualSelectBaseProps,
  VirtualSelectVariant,
  SingleVirtualSelectProps,
  MultiVirtualSelectProps,
} from './components/virtual-select';

// =============================================================================
// SELECTION CONTROLS
// =============================================================================
export {
  Checkbox,
  CheckboxCard,
  CheckboxList,
} from './components/checkbox';

export type {
  CheckboxProps,
  CheckboxStyle,
  CheckboxPosition,
  CheckboxSize,
  CheckboxShape,
  CheckboxCardProps,
  CheckboxCardBackground,
  CheckboxCardLayout,
  CheckboxCardSection,
  CheckboxListProps,
  CheckboxListStyle,
  CheckboxListItem,
} from './components/checkbox';

export {
  Radio,
  RadioGroup,
  RadioCard,
  RadioList,
} from './components/radio';

export type {
  RadioProps,
  RadioGroupProps,
  RadioSize,
  RadioStyle,
  RadioPosition,
  RadioCardProps,
  RadioCardBackground,
  RadioCardLayout,
  RadioCardSection,
  RadioListProps,
  RadioListStyle,
  RadioListItem,
} from './components/radio';

export { Switch, SwitchList } from './components/switch';
export type {
  SwitchProps,
  SwitchPosition,
  SwitchColor,
  SwitchSize,
  SwitchListProps,
  SwitchListStyle,
  SwitchListItem,
} from './components/switch';

// =============================================================================
// DIALOGS & OVERLAYS
// =============================================================================
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
  SimpleAlertDialog,
  ConfirmDialog,
} from './components/dialog';

export type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogCloseProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogScrollAreaProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogActionProps,
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogPortalProps,
  AlertDialogOverlayProps,
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps,
  AlertDialogScrollAreaProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
  SimpleAlertDialogProps,
  ConfirmDialogProps,
  ConfirmDialogVariant,
} from './components/dialog';

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
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
} from './components/drawer-sheet';

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverPortal,
  PopoverClose,
  PopoverScrollArea,
  PopoverArrow,
} from './components/popover';

export type {
  PopoverAnimation,
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverAnchorProps,
  PopoverPortalProps,
  PopoverCloseProps,
  PopoverScrollAreaProps,
  PopoverArrowProps,
} from './components/popover';

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardArrow,
} from './components/hover-card';

export type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
  HoverCardArrowProps,
} from './components/hover-card';

// =============================================================================
// HTML EDITOR
// =============================================================================
export { HtmlEditor } from './components/html-editor';
export type { HtmlEditorProps, HtmlEditorRef, HtmlEditorFeature, HtmlEditorImageUpload } from './components/html-editor';

// =============================================================================
// TOAST & NOTIFICATIONS
// =============================================================================
export { toast, ToastContent, BlumnaiToaster } from './components/toast';
export type { ToastContentProps, ToastOptions, ToastVariant, BlumnaiToasterProps, ToastAction } from './components/toast';

export { InfoBox } from './components/info-box';
export type { InfoBoxProps, InfoBoxVariant, InfoBoxStyle } from './components/info-box';

export { EmptyState } from './components/empty-state';
export type { EmptyStateProps, EmptyStateSize } from './components/empty-state';

export {
  Tooltip,
  TooltipTrigger,
  AdvancedTooltip,
} from './components/tooltip';

export type {
  TooltipProps,
  TooltipTriggerProps,
  AdvancedTooltipProps,
  TooltipItemData,
  TooltipItemType,
  TooltipItemProps,
} from './components/tooltip';

// =============================================================================
// NAVIGATION
// =============================================================================
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsVariant,
  TabsShape,
  TabsSize,
  TabsType,
} from './components/tabs';

export { Breadcrumbs } from './components/breadcrumbs';
export type {
  BreadcrumbsProps,
  BreadcrumbsSize,
  BreadcrumbsSeparator,
  BreadcrumbItem,
} from './components/breadcrumbs';

export { Pagination } from './components/pagination';
export type {
  PaginationProps,
  PaginationItemProps,
  PaginationNavProps,
  PaginationEllipsisProps,
  PaginationVariant,
  PaginationSize,
} from './components/pagination';

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
  SidebarUserbar,
  useSidebar,
} from './components/sidebar';

export type {
  SidebarProviderProps,
  SidebarMenuItemProps,
  SidebarMenuItemVariant,
  SidebarMenuItemIconType,
  SidebarMenuItemBadge,
  SidebarUserbarProps,
  SidebarUserbarVariant,
  SidebarUserbarState,
} from './components/sidebar';

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from './components/navigation-menu';

export type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuContentProps,
  NavigationMenuTriggerProps,
  NavigationMenuLinkProps,
  NavigationMenuViewportProps,
  NavigationMenuIndicatorProps,
  NavigationMenuListItemProps,
} from './components/navigation-menu';

// =============================================================================
// MENUS
// =============================================================================
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
  ContextMenuCaption,
} from './components/context-menu';

export type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuItemSize,
  ContextMenuCheckboxItemProps,
  ContextMenuRadioItemProps,
  ContextMenuLabelProps,
  ContextMenuSeparatorProps,
  ContextMenuShortcutProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
  ContextMenuGroupProps,
  ContextMenuPortalProps,
  ContextMenuSubProps,
  ContextMenuRadioGroupProps,
  ContextMenuCaptionProps,
} from './components/context-menu';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  MenuButton,
} from './components/dropdown';

export type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuItemSize,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuGroupProps,
  DropdownMenuPortalProps,
  DropdownMenuSubProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuCaptionProps,
  DropdownMenuAvatarProps,
  DropdownMenuUserbarProps,
  DropdownMenuButtonProps,
  DropdownMenuButtonGroupProps,
  MenuButtonProps,
  DropdownMenuSearchProps,
} from './components/dropdown';

export {
  Menubar,
  MenubarMenu,
  MenubarGroup,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarShortcut,
} from './components/menubar';

export type {
  MenubarProps,
  MenubarMenuProps,
  MenubarGroupProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarItemSize,
  MenubarCheckboxItemProps,
  MenubarRadioItemProps,
  MenubarLabelProps,
  MenubarSeparatorProps,
  MenubarShortcutProps,
  MenubarSubTriggerProps,
  MenubarSubContentProps,
  MenubarSubProps,
  MenubarRadioGroupProps,
  MenubarCaptionProps,
} from './components/menubar';

// =============================================================================
// DATA DISPLAY
// =============================================================================
export { DataGrid, useGridKeyboardNav } from './components/table';
export type {
  DataGridProps,
  ColumnSizingState,
  ColumnDef,
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableHeadProps,
  TableRowProps,
  TableCellProps,
  TableCaptionProps,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
  OnChangeFn,
  Row,
} from './components/table';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './components/table';

export { Avatar, AvatarGroup } from './components/avatar';
export type {
  AvatarProps,
  AvatarSize,
  AvatarShape,
  AvatarVariant,
  AvatarStatus,
  AvatarGroupProps,
  AvatarGroupStacking,
} from './components/avatar';

export { Badge } from './components/badge';
export type { BadgeProps, BadgeVariant, BadgeColor, BadgeSize, BadgeShape } from './components/badge';

export { Chip } from './components/chip';
export type { ChipProps, ChipSize, ChipVariant, ChipStyle, ChipShape, ChipColor } from './components/chip';

export { Progress, ProgressCircular } from './components/progress';
export type {
  ProgressProps,
  ProgressColor,
  ProgressVariant,
  ProgressCircularProps,
  ProgressCircularVariant,
  ProgressCircularShape,
} from './components/progress';

export { Skeleton } from './components/skeleton';
export type { SkeletonProps, SkeletonAnimation } from './components/skeleton';

export { StatusDot } from './components/status-dot';
export type { StatusDotProps, StatusDotColor, StatusDotSize } from './components/status-dot';

// =============================================================================
// LAYOUT
// =============================================================================
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardGroup,
} from './components/card';

export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardGroupProps,
} from './components/card';

export { Divider } from './components/divider';
export type { DividerProps, DividerType, DividerStyle, DividerOrientation } from './components/divider';

export { ScrollArea, ScrollBar } from './components/scroll-area';
export type { ScrollAreaProps, ScrollBarProps, ScrollAreaOrientation } from './components/scroll-area';

export { AccordionGroup } from './components/accordion/AccordionGroup';
export type { AccordionGroupProps } from './components/accordion/AccordionGroup';

export { AccordionItem } from './components/accordion/AccordionItem';
export type { AccordionItemProps, AccordionItemStyle } from './components/accordion/AccordionItem';

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './components/collapsible';

export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from './components/collapsible';

export { AspectRatio } from './components/aspect-ratio';
export type { AspectRatioProps } from './components/aspect-ratio';

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from './components/resizable';

export type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
  ResizableHandleVariant,
} from './components/resizable';

// =============================================================================
// STEPPER
// =============================================================================
export { Stepper } from './components/stepper';
export type {
  StepperProps,
  StepItem,
  StepperOrientation,
  StepperIndicatorType,
  StepperSize,
  StepStatus,
  StepperColor,
  StepperHorizontalAlign,
  StepperVerticalAlign,
  StepperIndicatorPosition,
} from './components/stepper';

// =============================================================================
// SLIDERS
// =============================================================================
export {
  Slider,
  SliderRange,
  SliderInput,
  SliderRangeInput,
  DataRangeSlider,
  DataRangeSliderInput,
} from './components/slider';

export type {
  SliderProps,
  SliderColor,
  SliderBaseProps,
  SliderOrientationProps,
  SliderRangeProps,
  SliderInputProps,
  SliderRangeInputProps,
  DataRangeSliderProps,
  DataRangeSliderInputProps,
} from './components/slider';

// =============================================================================
// DATE & TIME
// =============================================================================
export { Calendar, DatePicker, DateRangePicker, MonthRangePicker, MonthPicker } from './components/calendar';
export type {
  CalendarProps,
  CalendarStyle,
  CaptionLayout,
  DatePickerProps,
  DateRangePickerProps,
  DatePickerBaseProps,
  DatePickerStyle,
  DatePickerSize,
  DateFormat,
  QuickPreset,
  DateRange,
  DatePickerInputProps,
  DateInputProps,
  DateRangeInputProps,
  DateSegment,
  DateSegmentOrder,
  DateSegmentPlaceholder,
  MonthRangePickerProps,
  MonthRange,
  MonthRangePreset,
  MonthPickerProps,
  MonthPickerPreset,
} from './components/calendar';

export {
  TimePicker,
  TimeInput,
  TimeRangePicker,
  TimeRangeInput,
} from './components/time-picker';

export type {
  TimePickerProps,
  TimeInputProps,
  TimeRangePickerProps,
  TimeValue,
  TimeRange,
  TimeFormat,
  TimeSegment,
  TimeSegmentOrder,
  TimeSegmentPlaceholder,
  TimePickerStyle,
  TimePickerSize,
  QuickSelectOption,
  QuickRangeSelectOption,
} from './components/time-picker';

// =============================================================================
// FILE & MEDIA
// =============================================================================
export { FileUploadArea, FileUploadCard } from './components/file-upload';
export type {
  FileUploadAreaProps,
  FileUploadCardProps,
  FileUploadStatus,
  FileUploadCardSize,
  FileInfo,
  FileSelectSource,
  FileError,
  FileErrorCode,
} from './components/file-upload';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
  useCarousel,
} from './components/carousel';

export type {
  CarouselProps,
  CarouselApi,
  CarouselContentProps,
  CarouselItemProps,
  CarouselNavProps,
  CarouselIndicatorsProps,
  CarouselIndicatorVariant,
  CarouselOrientation,
  CarouselContextProps,
} from './components/carousel';

// =============================================================================
// INPUT OTP
// =============================================================================
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from './components/input-otp';

export type {
  InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
} from './components/input-otp';

// =============================================================================
// ICONS
// =============================================================================
export { Icon, preloadIconCategory, preloadIcons } from './components/icons';
export type {
  IconProps,
  IconType,
  IconCategory,
  IconTypeWithFill as IconTypeWithFillFromIcon,
  BrandType,
  CursorType,
  FileVariant,
  FileSize,
  CountryCode,
  IsometricIconType,
  IsometricView,
} from './components/icons';

export { FileIcon } from './components/icons/FileIcon';
export type { FileIconProps } from './components/icons/FileIcon';

export { FlagIcon } from './components/icons/FlagIcon';
export type { FlagIconProps } from './components/icons/FlagIcon';

export { BrandIcon } from './components/icons/BrandIcon';
export type { BrandIconProps } from './components/icons/BrandIcon';

export { CursorIcon } from './components/icons/CursorIcon';
export type { CursorIconProps } from './components/icons/CursorIcon';

export { IsometricIcon } from './components/icons/IsometricIcon';
export type { IsometricIconProps } from './components/icons/IsometricIcon';

// =============================================================================
// CHARTS
// =============================================================================
export { Chart, BarChart, LineChart, PieChart, DonutChart, ComboChart } from './components/chart';
export type {
  BaseChartProps,
  BarChartProps,
  LineChartProps,
  PieChartProps,
  DonutChartProps,
  ComboChartProps,
  ComboBarSeries,
  ComboLineSeries,
  ChartDataPoint,
  ChartAxisConfig,
  ChartVariant,
  ChartConfig,
  ChartConfigItem,
  ChartTooltipParams,
  PieTooltipParams,
} from './components/chart';

// =============================================================================
// DRAG & DROP
// =============================================================================
export {
  DndContext,
  Draggable,
  Droppable,
  DragHandle,
  DragOverlay,
  Sortable,
  SortableItem,
} from './components/dnd';

export type {
  DndId,
  DndItem,
  DndContextProps,
  DraggableProps,
  DraggableRenderProps,
  DroppableProps,
  DroppableRenderProps,
  DragHandleProps,
  DragOverlayProps,
  SortableProps,
  SortableItemProps,
  SortableItemRenderProps,
  SortableStrategy,
  DragData,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragMoveEvent,
  DragCancelEvent,
} from './components/dnd';

// =============================================================================
// HOOKS
// =============================================================================
export { useKeyboardShortcut } from './hooks/use-keyboard-shortcut';
export type { UseKeyboardShortcutOptions } from './hooks/use-keyboard-shortcut';

export { parseShortcut } from './hooks/keyboard-shortcut-parser';
export type { ParsedShortcut } from './hooks/keyboard-shortcut-parser';

export { useMergeRefs } from './hooks/use-merge-refs';

export { useDebouncedValue } from './hooks/use-debounced-value';

// =============================================================================
// UTILITIES
// =============================================================================
export { cn } from './lib/utils';
export { PortalContainerProvider, usePortalContainer } from './utils/PortalContainerContext';
