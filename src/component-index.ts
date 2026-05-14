/**
 * Component Index for AI Discovery
 *
 * This file helps AI assistants find the right component for a given task.
 * Each entry includes keywords, import statement, and a quick usage example.
 */

export const COMPONENT_INDEX = {
  // ============================================================================
  // BUTTONS
  // ============================================================================

  Button: {
    keywords: ['button', 'click', 'action', 'submit', 'save', 'cancel', 'cta', 'primary', 'secondary'],
    description: 'Clickable button for actions',
    import: "import { Button } from '@blumnai/design-system'",
    quickUse: '<Button buttonStyle="primary">Click me</Button>',
    variants: ['primary', 'secondary', 'destructive', 'ghost', 'ghostMuted', 'soft', 'dashed'],
  },

  LinkButton: {
    keywords: ['link', 'navigation', 'anchor', 'text link', 'href'],
    description: 'Navigation link styled as text button',
    import: "import { LinkButton } from '@blumnai/design-system'",
    quickUse: '<LinkButton href="/page">Go to page</LinkButton>',
  },

  ControlButton: {
    keywords: ['icon button', 'icon only', 'edit', 'delete', 'small button', 'action button'],
    description: 'Icon-only button for compact actions',
    import: "import { ControlButton } from '@blumnai/design-system'",
    quickUse: '<ControlButton icon={RiEditLine} />',
  },

  ButtonGroup: {
    keywords: ['button group', 'toolbar', 'button bar', 'grouped buttons'],
    description: 'Group of related buttons',
    import: "import { ButtonGroup } from '@blumnai/design-system'",
    quickUse: '<ButtonGroup items={[{ label: "A" }, { label: "B" }]} />',
  },

  FilterButton: {
    keywords: ['filter', 'filter button', 'toggle filter', 'active filters', 'badge count'],
    description: 'Filter toggle button with count badge',
    import: "import { FilterButton } from '@blumnai/design-system'",
    quickUse: '<FilterButton selected={hasFilters} count={3}>Filters</FilterButton>',
  },

  AvatarButton: {
    keywords: ['avatar button', 'user button', 'profile button', 'account menu'],
    description: 'User profile button with avatar',
    import: "import { AvatarButton } from '@blumnai/design-system'",
    quickUse: '<AvatarButton src="/avatar.jpg" name="John" showDropdown />',
  },

  // ============================================================================
  // FORM INPUTS
  // ============================================================================

  Input: {
    keywords: ['input', 'text', 'field', 'textbox', 'email', 'search', 'password', 'form input'],
    description: 'Text input with multiple variants',
    import: "import { Input } from '@blumnai/design-system'",
    quickUse: '<Input variant="default" label="Label" placeholder="Enter text" />',
    variants: ['default', 'password', 'quantity', 'tags', 'addon', 'shortcut'],
  },

  'Input (password)': {
    keywords: ['password', 'secret', 'login', 'auth', 'strength', 'visibility toggle'],
    description: 'Password input with visibility toggle and strength indicator',
    import: "import { Input } from '@blumnai/design-system'",
    quickUse: '<Input variant="password" label="Password" showStrength autoCalculateStrength />',
  },

  'Input (quantity)': {
    keywords: ['number', 'quantity', 'counter', 'increment', 'decrement', 'plus minus'],
    description: 'Number input with increment/decrement buttons',
    import: "import { Input } from '@blumnai/design-system'",
    quickUse: '<Input variant="quantity" label="Quantity" value={1} onChange={setQty} />',
  },

  'Input (tags)': {
    keywords: ['tags', 'chips', 'multiple', 'tokens', 'keywords', 'labels'],
    description: 'Input for multiple tags/chips',
    import: "import { Input } from '@blumnai/design-system'",
    quickUse: '<Input variant="tags" label="Tags" tags={tags} onTagsChange={setTags} />',
  },

  Textarea: {
    keywords: ['textarea', 'multiline', 'long text', 'description', 'comment', 'message', 'bio'],
    description: 'Multi-line text input',
    import: "import { Textarea } from '@blumnai/design-system'",
    quickUse: '<Textarea label="Description" rows={4} showCount maxLength={500} />',
  },

  Select: {
    keywords: ['select', 'dropdown', 'picker', 'choose', 'option', 'combo'],
    description: 'Dropdown selection',
    import: "import { Select } from '@blumnai/design-system'",
    quickUse: '<Select variant="default" options={options} value={value} onChange={setValue} />',
    variants: ['default', 'multi', 'avatar', 'tags'],
  },

  Combobox: {
    keywords: ['combobox', 'autocomplete', 'search select', 'filterable', 'typeahead'],
    description: 'Searchable/filterable select',
    import: "import { Combobox } from '@blumnai/design-system'",
    quickUse: '<Combobox options={options} value={value} onChange={setValue} />',
  },

  // ============================================================================
  // SELECTION CONTROLS
  // ============================================================================

  Checkbox: {
    keywords: ['checkbox', 'check', 'tick', 'toggle', 'agree', 'accept', 'terms'],
    description: 'Single checkbox',
    import: "import { Checkbox } from '@blumnai/design-system'",
    quickUse: '<Checkbox label="Accept terms" checked={checked} onCheckedChange={setChecked} />',
  },

  CheckboxList: {
    keywords: ['checkbox group', 'multiple selection', 'checklist', 'multi select'],
    description: 'Group of checkboxes',
    import: "import { CheckboxList } from '@blumnai/design-system'",
    quickUse: '<CheckboxList items={items} value={selected} onChange={setSelected} />',
  },

  Radio: {
    keywords: ['radio', 'radio button', 'single choice', 'option'],
    description: 'Single choice from options',
    import: "import { Radio, RadioGroup } from '@blumnai/design-system'",
    quickUse: '<RadioGroup value={value} onValueChange={setValue}><Radio value="a" label="A" /></RadioGroup>',
  },

  RadioList: {
    keywords: ['radio list', 'radio group', 'single selection list', 'option list'],
    description: 'List of radio options',
    import: "import { RadioList } from '@blumnai/design-system'",
    quickUse: '<RadioList items={items} value={value} onChange={setValue} />',
  },

  Switch: {
    keywords: ['switch', 'toggle', 'on off', 'enable disable', 'boolean'],
    description: 'Toggle switch',
    import: "import { Switch } from '@blumnai/design-system'",
    quickUse: '<Switch label="Enable" checked={enabled} onCheckedChange={setEnabled} />',
  },

  SwitchList: {
    keywords: ['switch list', 'toggle list', 'settings list', 'preferences'],
    description: 'List of toggle switches',
    import: "import { SwitchList } from '@blumnai/design-system'",
    quickUse: '<SwitchList items={items} value={enabled} onChange={setEnabled} />',
  },

  // ============================================================================
  // FORM COMPONENTS
  // ============================================================================

  Form: {
    keywords: ['form', 'validation', 'react hook form', 'zod', 'submit'],
    description: 'Form wrapper with validation support',
    import: "import { Form, FormField, FormControl } from '@blumnai/design-system'",
    quickUse: '<Form form={form} onSubmit={onSubmit}><FormField ... /></Form>',
  },

  // ============================================================================
  // FEEDBACK & OVERLAYS
  // ============================================================================

  Dialog: {
    keywords: ['dialog', 'modal', 'popup', 'overlay', 'lightbox'],
    description: 'Modal dialog for complex content',
    import: "import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@blumnai/design-system'",
    quickUse: '<Dialog open={open} onOpenChange={setOpen}><DialogContent>...</DialogContent></Dialog>',
  },

  SimpleAlertDialog: {
    keywords: ['alert', 'alert dialog', 'notification', 'info dialog'],
    description: 'Simple alert dialog with confirm button only',
    import: "import { SimpleAlertDialog } from '@blumnai/design-system'",
    quickUse: '<SimpleAlertDialog open={open} onOpenChange={setOpen} title="알림" confirmLabel="확인" onConfirm={...} />',
  },

  ConfirmDialog: {
    keywords: ['confirm dialog', 'yes no', 'simple confirm', 'delete'],
    description: 'Confirmation dialog with confirm and cancel buttons',
    import: "import { ConfirmDialog } from '@blumnai/design-system'",
    quickUse: '<ConfirmDialog open={open} onOpenChange={setOpen} title="Delete?" variant="destructive" onConfirm={handleDelete} />',
    variants: ['default', 'destructive'],
  },

  toast: {
    keywords: ['toast', 'notification', 'snackbar', 'message', 'alert', 'feedback'],
    description: 'Temporary notification toast',
    import: "import { toast } from '@blumnai/design-system'",
    quickUse: "toast({ title: 'Saved!', variant: 'success' })",
    variants: ['default', 'success', 'error', 'warning', 'info'],
  },

  Tooltip: {
    keywords: ['tooltip', 'hint', 'help', 'hover', 'info'],
    description: 'Hover help text',
    import: "import { Tooltip } from '@blumnai/design-system'",
    quickUse: '<Tooltip content="Help text"><Button>?</Button></Tooltip>',
  },

  Popover: {
    keywords: ['popover', 'dropdown content', 'floating', 'click popup'],
    description: 'Click-triggered floating content',
    import: "import { Popover, PopoverTrigger, PopoverContent } from '@blumnai/design-system'",
    quickUse: '<Popover><PopoverTrigger>...</PopoverTrigger><PopoverContent>...</PopoverContent></Popover>',
  },

  Sheet: {
    keywords: ['sheet', 'side panel', 'slide out', 'sidebar overlay'],
    description: 'Sliding side panel overlay',
    import: "import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@blumnai/design-system'",
    quickUse: '<Sheet><SheetTrigger>...</SheetTrigger><SheetContent side="right">...</SheetContent></Sheet>',
  },

  Drawer: {
    keywords: ['drawer', 'bottom sheet', 'mobile drawer', 'pull up', 'slide up'],
    description: 'Bottom/side drawer overlay',
    import: "import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from '@blumnai/design-system'",
    quickUse: '<Drawer><DrawerTrigger>...</DrawerTrigger><DrawerContent>...</DrawerContent></Drawer>',
  },

  InputOTP: {
    keywords: ['otp', 'one time password', 'verification code', 'pin', 'code input', '2fa', 'mfa'],
    description: 'One-time password / verification code input',
    import: "import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@blumnai/design-system'",
    quickUse: '<InputOTP maxLength={6}><InputOTPGroup><InputOTPSlot index={0} />...</InputOTPGroup></InputOTP>',
  },

  HoverCard: {
    keywords: ['hover card', 'hover popup', 'preview card', 'user card', 'profile preview'],
    description: 'Rich content on hover',
    import: "import { HoverCard, HoverCardTrigger, HoverCardContent } from '@blumnai/design-system'",
    quickUse: '<HoverCard><HoverCardTrigger>...</HoverCardTrigger><HoverCardContent>...</HoverCardContent></HoverCard>',
  },

  Carousel: {
    keywords: ['carousel', 'slider', 'slideshow', 'gallery', 'swipe', 'embla'],
    description: 'Scrollable content carousel',
    import: "import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@blumnai/design-system'",
    quickUse: '<Carousel><CarouselContent><CarouselItem>...</CarouselItem></CarouselContent></Carousel>',
  },

  AspectRatio: {
    keywords: ['aspect ratio', 'ratio', 'image container', 'video container', 'responsive'],
    description: 'Fixed aspect ratio container',
    import: "import { AspectRatio } from '@blumnai/design-system'",
    quickUse: '<AspectRatio ratio={16/9}><img src="..." /></AspectRatio>',
  },

  NavigationMenu: {
    keywords: ['navigation menu', 'nav menu', 'mega menu', 'dropdown navigation'],
    description: 'Complex navigation menu with dropdowns',
    import: "import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from '@blumnai/design-system'",
    quickUse: '<NavigationMenu><NavigationMenuList>...</NavigationMenuList></NavigationMenu>',
  },

  // ============================================================================
  // NAVIGATION
  // ============================================================================

  Tabs: {
    keywords: ['tabs', 'tab', 'tabbed', 'switch view', 'sections'],
    description: 'Tabbed content sections',
    import: "import { Tabs, TabsList, TabsTrigger, TabsContent } from '@blumnai/design-system'",
    quickUse: '<Tabs defaultValue="a"><TabsList><TabsTrigger value="a">A</TabsTrigger></TabsList><TabsContent value="a">...</TabsContent></Tabs>',
  },

  Breadcrumbs: {
    keywords: ['breadcrumbs', 'path', 'navigation', 'hierarchy', 'trail'],
    description: 'Page hierarchy navigation',
    import: "import { Breadcrumbs } from '@blumnai/design-system'",
    quickUse: '<Breadcrumbs items={[{ label: "Home", href: "/" }, ...]} />',
  },

  Sidebar: {
    keywords: ['sidebar', 'nav', 'navigation', 'menu', 'app shell'],
    description: 'Application sidebar navigation',
    import: "import { Sidebar, SidebarContent, SidebarMenu } from '@blumnai/design-system'",
    quickUse: '<Sidebar><SidebarContent>...</SidebarContent></Sidebar>',
  },

  Pagination: {
    keywords: ['pagination', 'paging', 'pages', 'next prev', 'page numbers'],
    description: 'Page navigation controls',
    import: "import { Pagination } from '@blumnai/design-system'",
    quickUse: '<Pagination currentPage={1} totalPages={10} onPageChange={setPage} />',
  },

  // ============================================================================
  // DATA DISPLAY
  // ============================================================================

  DataGrid: {
    keywords: ['table', 'data grid', 'datagrid', 'list', 'sorting', 'filtering', 'tanstack'],
    description: 'Full-featured data table with sorting, filtering, selection',
    import: "import { DataGrid } from '@blumnai/design-system'",
    quickUse: '<DataGrid columns={columns} data={data} enableSorting enableRowSelection />',
  },

  Table: {
    keywords: ['simple table', 'html table', 'basic table'],
    description: 'Simple HTML table',
    import: "import { Table, TableHeader, TableBody, TableRow, TableCell } from '@blumnai/design-system'",
    quickUse: '<Table><TableHeader>...</TableHeader><TableBody>...</TableBody></Table>',
  },

  Avatar: {
    keywords: ['avatar', 'profile', 'user image', 'photo', 'initials'],
    description: 'User avatar/profile image',
    import: "import { Avatar } from '@blumnai/design-system'",
    quickUse: '<Avatar src="url" name="John Doe" size="md" />',
  },

  AvatarGroup: {
    keywords: ['avatar group', 'stacked avatars', 'users', 'members'],
    description: 'Group of stacked avatars',
    import: "import { AvatarGroup } from '@blumnai/design-system'",
    quickUse: '<AvatarGroup avatars={[...]} max={5} />',
  },

  Badge: {
    keywords: ['badge', 'tag', 'label', 'status', 'indicator', 'chip'],
    description: 'Status badge/tag',
    import: "import { Badge } from '@blumnai/design-system'",
    quickUse: '<Badge variant="success">Active</Badge>',
    variants: ['default', 'secondary', 'success', 'warning', 'destructive', 'outline'],
  },

  Chip: {
    keywords: ['chip', 'removable tag', 'deletable', 'token'],
    description: 'Removable chip/tag',
    import: "import { Chip } from '@blumnai/design-system'",
    quickUse: '<Chip label="Tag" onRemove={() => {}} />',
  },

  Progress: {
    keywords: ['progress', 'loading', 'bar', 'percentage', 'completion'],
    description: 'Linear progress bar',
    import: "import { Progress } from '@blumnai/design-system'",
    quickUse: '<Progress value={50} showValue />',
  },

  ProgressCircular: {
    keywords: ['circular progress', 'spinner', 'donut', 'ring', 'radial'],
    description: 'Circular progress indicator',
    import: "import { ProgressCircular } from '@blumnai/design-system'",
    quickUse: '<ProgressCircular value={75} size={60} />',
  },

  Skeleton: {
    keywords: ['skeleton', 'loading', 'placeholder', 'shimmer'],
    description: 'Loading placeholder skeleton',
    import: "import { Skeleton } from '@blumnai/design-system'",
    quickUse: '<Skeleton className="h-4 w-full" />',
  },

  // ============================================================================
  // LAYOUT
  // ============================================================================

  Card: {
    keywords: ['card', 'container', 'box', 'panel', 'section'],
    description: 'Content container card',
    import: "import { Card, CardHeader, CardTitle, CardContent } from '@blumnai/design-system'",
    quickUse: '<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent>...</CardContent></Card>',
  },

  Divider: {
    keywords: ['divider', 'separator', 'line', 'hr'],
    description: 'Visual separator line',
    import: "import { Divider } from '@blumnai/design-system'",
    quickUse: '<Divider />',
  },

  ScrollArea: {
    keywords: ['scroll', 'scrollbar', 'overflow', 'scrollable'],
    description: 'Custom scrollbar container',
    import: "import { ScrollArea } from '@blumnai/design-system'",
    quickUse: '<ScrollArea className="h-[200px]">...</ScrollArea>',
  },

  Accordion: {
    keywords: ['accordion', 'collapse', 'expand', 'faq', 'collapsible list'],
    description: 'Expandable accordion sections',
    import: "import { AccordionGroup } from '@blumnai/design-system'",
    quickUse: '<AccordionGroup items={[{ title: "Q1", content: "A1" }]} />',
  },

  Collapsible: {
    keywords: ['collapsible', 'expand', 'collapse', 'toggle content'],
    description: 'Single collapsible section',
    import: "import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@blumnai/design-system'",
    quickUse: '<Collapsible><CollapsibleTrigger>Toggle</CollapsibleTrigger><CollapsibleContent>...</CollapsibleContent></Collapsible>',
  },

  Slider: {
    keywords: ['slider', 'range', 'value', 'track', 'thumb'],
    description: 'Single value slider',
    import: "import { Slider } from '@blumnai/design-system'",
    quickUse: '<Slider value={50} onChange={setValue} />',
  },

  SliderRange: {
    keywords: ['slider range', 'range slider', 'min max', 'two thumbs'],
    description: 'Range slider with two handles',
    import: "import { SliderRange } from '@blumnai/design-system'",
    quickUse: '<SliderRange value={[20, 80]} onChange={setRange} />',
  },

  SliderInput: {
    keywords: ['slider input', 'slider with input', 'numeric slider'],
    description: 'Slider with numeric input field',
    import: "import { SliderInput } from '@blumnai/design-system'",
    quickUse: '<SliderInput label="Volume" value={50} onChange={setValue} />',
  },

  SliderRangeInput: {
    keywords: ['slider range input', 'range with inputs', 'price range'],
    description: 'Range slider with numeric inputs',
    import: "import { SliderRangeInput } from '@blumnai/design-system'",
    quickUse: '<SliderRangeInput label="Price" value={[20, 80]} onChange={setRange} />',
  },

  DataRangeSlider: {
    keywords: ['data range slider', 'histogram slider', 'distribution', 'data filter'],
    description: 'Range slider with data distribution chart',
    import: "import { DataRangeSlider } from '@blumnai/design-system'",
    quickUse: '<DataRangeSlider data={data} value={[20, 80]} onChange={setRange} />',
  },

  DataRangeSliderInput: {
    keywords: ['data range slider input', 'histogram with inputs', 'data filter input'],
    description: 'Data range slider with numeric inputs',
    import: "import { DataRangeSliderInput } from '@blumnai/design-system'",
    quickUse: '<DataRangeSliderInput data={data} value={[20, 80]} onChange={setRange} />',
  },

  ResizablePanelGroup: {
    keywords: ['resizable', 'split', 'panels', 'resize', 'splitter'],
    description: 'Resizable split panels',
    import: "import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@blumnai/design-system'",
    quickUse: '<ResizablePanelGroup><ResizablePanel /><ResizableHandle /><ResizablePanel /></ResizablePanelGroup>',
  },

  // ============================================================================
  // DATE & TIME
  // ============================================================================

  DatePicker: {
    keywords: ['date', 'calendar', 'date picker', 'date select'],
    description: 'Single date picker',
    import: "import { DatePicker } from '@blumnai/design-system'",
    quickUse: '<DatePicker value={date} onChange={setDate} />',
  },

  DateRangePicker: {
    keywords: ['date range', 'date span', 'from to date', 'period'],
    description: 'Date range picker',
    import: "import { DateRangePicker } from '@blumnai/design-system'",
    quickUse: '<DateRangePicker value={range} onChange={setRange} />',
  },

  TimePicker: {
    keywords: ['time', 'time picker', 'clock', 'hour', 'minute', 'second', 'am pm', '12h', '24h'],
    description: 'Time picker with 12h/24h format',
    import: "import { TimePicker } from '@blumnai/design-system'",
    quickUse: '<TimePicker value={time} onChange={setTime} timeFormat="24h" />',
  },

  TimeInput: {
    keywords: ['time input', 'segmented time', 'hour minute'],
    description: 'Segmented time input component',
    import: "import { TimeInput } from '@blumnai/design-system'",
    quickUse: '<TimeInput value={time} onChange={setTime} />',
  },

  TimeRangePicker: {
    keywords: ['time range', 'time span', 'from to time', 'start end time', 'duration'],
    description: 'Time range picker with start and end time',
    import: "import { TimeRangePicker } from '@blumnai/design-system'",
    quickUse: '<TimeRangePicker value={range} onChange={setRange} />',
  },

  TimeRangeInput: {
    keywords: ['time range input', 'segmented time range', 'start end'],
    description: 'Segmented time range input component',
    import: "import { TimeRangeInput } from '@blumnai/design-system'",
    quickUse: '<TimeRangeInput value={range} onChange={setRange} />',
  },

  // ============================================================================
  // FILE & MEDIA
  // ============================================================================

  FileUpload: {
    keywords: ['file', 'upload', 'drop', 'drag drop', 'attach', 'import file'],
    description: 'File upload with drag & drop',
    import: "import { FileUpload } from '@blumnai/design-system'",
    quickUse: '<FileUpload accept={{ "image/*": [".png", ".jpg"] }} onFilesChange={setFiles} />',
  },

  // ============================================================================
  // ICONS
  // ============================================================================

  Icon: {
    keywords: ['icon', 'symbol', 'glyph', 'svg'],
    description: 'Icon component',
    import: "import { Icon } from '@blumnai/design-system'",
    quickUse: '<Icon icon={RiCheckLine} size={20} />',
    categories: ['system', 'arrows', 'business', 'communication', 'design', 'development', 'device', 'document', 'editor', 'finance', 'food', 'health', 'logos', 'map', 'media', 'weather', 'user'],
  },

  // ============================================================================
  // CHARTS
  // ============================================================================

  BarChart: {
    keywords: ['bar chart', 'column chart', 'histogram', 'bars'],
    description: 'Bar/column chart',
    import: "import { BarChart } from '@blumnai/design-system'",
    quickUse: '<BarChart data={data} xAxis="month" yAxis="value" />',
  },

  LineChart: {
    keywords: ['line chart', 'trend', 'time series', 'graph'],
    description: 'Line/area chart',
    import: "import { LineChart } from '@blumnai/design-system'",
    quickUse: '<LineChart data={data} xAxis="date" yAxis="value" />',
  },

  PieChart: {
    keywords: ['pie chart', 'pie', 'percentage', 'distribution'],
    description: 'Pie chart',
    import: "import { PieChart } from '@blumnai/design-system'",
    quickUse: '<PieChart data={data} />',
  },

  DonutChart: {
    keywords: ['donut chart', 'doughnut', 'ring chart'],
    description: 'Donut chart',
    import: "import { DonutChart } from '@blumnai/design-system'",
    quickUse: '<DonutChart data={data} />',
  },

  // ============================================================================
  // MENUS
  // ============================================================================

  ContextMenu: {
    keywords: ['context menu', 'right click', 'menu'],
    description: 'Right-click context menu',
    import: "import { ContextMenu } from '@blumnai/design-system'",
    quickUse: '<ContextMenu items={menuItems}><div>Right click me</div></ContextMenu>',
  },

  Dropdown: {
    keywords: ['dropdown', 'menu', 'actions', 'options menu'],
    description: 'Dropdown action menu',
    import: "import { Dropdown } from '@blumnai/design-system'",
    quickUse: '<Dropdown items={menuItems} />',
  },

  Menubar: {
    keywords: ['menubar', 'app menu', 'menu bar', 'file edit view'],
    description: 'Application menu bar',
    import: "import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent } from '@blumnai/design-system'",
    quickUse: '<Menubar><MenubarMenu>...</MenubarMenu></Menubar>',
  },
} as const;

/**
 * Find components by keyword
 */
export function findComponentsByKeyword(keyword: string): string[] {
  const lowerKeyword = keyword.toLowerCase();
  return Object.entries(COMPONENT_INDEX)
    .filter(([, info]) =>
      info.keywords.some((k) => k.includes(lowerKeyword)) ||
      info.description.toLowerCase().includes(lowerKeyword)
    )
    .map(([name]) => name);
}

/**
 * Get component info by name
 */
export function getComponentInfo(name: string): (typeof COMPONENT_INDEX)[keyof typeof COMPONENT_INDEX] | undefined {
  return COMPONENT_INDEX[name as keyof typeof COMPONENT_INDEX];
}
