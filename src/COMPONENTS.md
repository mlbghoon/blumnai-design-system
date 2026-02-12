# Blumnai Component Catalog

> AI-friendly component reference. Use this to find the right component for your needs.
> For full props reference, see [AI.md](../AI.md) and [PROPS.md](./PROPS.md).

---

## Quick Reference Table

| Need | Component | Quick Example |
|------|-----------|---------------|
| Clickable action | `Button` | `<Button buttonStyle="primary" shortcut="⌘K">Save</Button>` |
| Navigation link styled as button | `LinkButton` | `<LinkButton href="/page">Go</LinkButton>` |
| Text input | `Input` | `<Input variant="default" label="Name" />` |
| Password input | `Input` | `<Input variant="password" showStrength />` |
| Number input with +/- | `Input` | `<Input variant="quantity" />` |
| Tags/chips input | `Input` | `<Input variant="tags" />` |
| Multi-line text | `Textarea` | `<Textarea label="Bio" />` |
| Select one option | `Select` | `<Select variant="default" options={[...]} />` |
| Select multiple | `Select` | `<Select variant="multi" options={[...]} />` |
| Searchable select | `Combobox` | `<Combobox options={[...]} />` |
| Yes/No toggle | `Switch` | `<Switch label="Enabled" />` |
| Checkbox | `Checkbox` | `<Checkbox label="Agree" />` |
| Radio buttons | `RadioGroup` | `<RadioGroup><Radio value="a" label="A" /></RadioGroup>` |
| Form with validation | `Form` | See Form patterns below |
| Modal dialog | `Dialog` | `<Dialog><DialogContent>...</DialogContent></Dialog>` |
| Confirmation popup | `AlertDialog` | `<AlertDialog title="Sure?" onConfirm={...} />` |
| Simple confirm/cancel | `ConfirmDialog` | `<ConfirmDialog title="Delete?" onConfirm={...} />` |
| Toast notification | `toast()` | `toast.success("Saved!")` |
| Tooltip | `Tooltip` | `<Tooltip content="Help text"><Button>?</Button></Tooltip>` |
| Tabs | `Tabs` | `<Tabs><TabsList>...</TabsList></Tabs>` |
| Data table | `DataGrid` | `<DataGrid columns={[...]} data={[...]} />` |
| Simple table | `Table` | `<Table><TableHeader>...</TableHeader></Table>` |
| Accordion | `AccordionGroup` | `<AccordionGroup items={[...]} />` |
| Progress bar | `Progress` | `<Progress value={50} />` |
| Circular progress | `ProgressCircular` | `<ProgressCircular value={75} />` |
| Date picker | `DatePicker` | `<DatePicker value={date} onChange={...} />` |
| Date range picker | `DateRangePicker` | `<DateRangePicker value={range} onChange={...} />` |
| Time picker | `TimePicker` | `<TimePicker value={time} onChange={...} />` |
| Time range picker | `TimeRangePicker` | `<TimeRangePicker value={range} onChange={...} />` |
| File upload | `FileUpload` | `<FileUpload onFilesChange={...} />` |
| Avatar | `Avatar` | `<Avatar src="url" name="John" />` |
| Avatar group | `AvatarGroup` | `<AvatarGroup avatars={[...]} />` |
| Badge/Tag | `Badge` | `<Badge variant="success">Active</Badge>` |
| Chip | `Chip` | `<Chip label="Tag" onRemove={...} />` |
| Breadcrumbs | `Breadcrumbs` | `<Breadcrumbs items={[...]} />` |
| Divider | `Divider` | `<Divider />` |
| Scroll area | `ScrollArea` | `<ScrollArea><Content /></ScrollArea>` |
| Skeleton loader | `Skeleton` | `<Skeleton className="h-4 w-full" />` |
| Popover | `Popover` | `<Popover><PopoverTrigger>...</PopoverTrigger></Popover>` |
| Context menu | `ContextMenu` | `<ContextMenu items={[...]}><Child /></ContextMenu>` |
| Dropdown menu | `Dropdown` | `<Dropdown items={[...]} />` |
| Slider | `Slider` | `<Slider value={50} onChange={...} />` |
| Slider with input | `SliderInput` | `<SliderInput value={50} onChange={...} />` |
| Range slider | `SliderRange` | `<SliderRange value={[20, 80]} />` |
| Range slider with input | `SliderRangeInput` | `<SliderRangeInput value={[20, 80]} onChange={...} />` |
| Data range slider | `DataRangeSlider` | `<DataRangeSlider data={data} value={[min, max]} />` |
| Data range with input | `DataRangeSliderInput` | `<DataRangeSliderInput data={data} value={[min, max]} />` |
| Sidebar navigation | `Sidebar` | `<Sidebar><SidebarContent>...</SidebarContent></Sidebar>` |
| Sheet (side panel) | `Sheet` | `<Sheet><SheetContent>...</SheetContent></Sheet>` |
| Drawer (bottom/side) | `Drawer` | `<Drawer><DrawerContent>...</DrawerContent></Drawer>` |
| OTP input | `InputOTP` | `<InputOTP maxLength={6} />` |
| Card container | `Card` | `<Card><CardHeader>...</CardHeader></Card>` |
| Collapsible section | `Collapsible` | `<Collapsible><CollapsibleContent>...</CollapsibleContent></Collapsible>` |
| Hover card | `HoverCard` | `<HoverCard><HoverCardTrigger>...</HoverCardTrigger></HoverCard>` |
| Resizable panels | `ResizablePanelGroup` | `<ResizablePanelGroup><ResizablePanel /></ResizablePanelGroup>` |
| Carousel | `Carousel` | `<Carousel><CarouselContent>...</CarouselContent></Carousel>` |
| Menubar | `Menubar` | `<Menubar><MenubarMenu>...</MenubarMenu></Menubar>` |
| Navigation menu | `NavigationMenu` | `<NavigationMenu><NavigationMenuList>...</NavigationMenuList></NavigationMenu>` |
| Charts | `Chart`, `BarChart`, `LineChart`, `PieChart`, `DonutChart` | See chart examples |

---

## Component Categories

### Form Inputs

| Component | Use Case |
|-----------|----------|
| `Input variant="default"` | Single-line text, email, search |
| `Input variant="password"` | Password with visibility toggle and strength indicator |
| `Input variant="quantity"` | Number with increment/decrement buttons |
| `Input variant="tags"` | Multiple tags/chips input |
| `Input variant="addon"` | Input with prefix/suffix text |
| `Input variant="shortcut"` | Input with keyboard shortcut badge |
| `Textarea` | Multi-line text with optional character count |
| `Select variant="default"` | Single selection dropdown |
| `Select variant="multi"` | Multiple selection |
| `Select variant="avatar"` | Selection with user avatars |
| `Select variant="tags"` | Selection displayed as tags |
| `Combobox` | Searchable/filterable select |
| `Checkbox` | Single checkbox |
| `CheckboxList` | Group of checkboxes |
| `CheckboxCard` | Checkbox with card styling |
| `Radio` / `RadioGroup` | Single choice from options |
| `RadioList` | Group of radio buttons |
| `RadioCard` | Radio with card styling |
| `Switch` | Toggle on/off |
| `SwitchList` | Group of switches |
| `Slider` | Single value slider |
| `SliderRange` | Range slider (min/max) |
| `DatePicker` | Single date selection |
| `DateRangePicker` | Date range selection |
| `TimePicker` | Time selection (12h/24h format) |
| `TimeInput` | Segmented time input |
| `TimeRangePicker` | Time range selection (start-end) |
| `TimeRangeInput` | Segmented time range input |
| `FileUpload` | File drag & drop upload |
| `InputOTP` | One-time password input |

### Buttons

| Component | Use Case |
|-----------|----------|
| `Button` | Primary actions (submit, save, etc.) |
| `LinkButton` | Navigation styled as text link |
| `ControlButton` | Icon-only actions (edit, delete) |
| `FilterButton` | Filter toggles with selection state and count badge |
| `AvatarButton` | User profile button with avatar and dropdown |
| `ButtonGroup` | Group of related buttons |

### Feedback & Overlays

| Component | Use Case |
|-----------|----------|
| `Dialog` | Modal for complex content |
| `AlertDialog` | Confirmation with icon and actions |
| `ConfirmDialog` | Simple yes/no confirmation |
| `toast()` | Temporary notifications |
| `Tooltip` | Hover help text |
| `Popover` | Click-triggered floating content |
| `HoverCard` | Rich content on hover |
| `Sheet` | Slide-in side panel |
| `Drawer` | Bottom/side drawer overlay |

### Navigation

| Component | Use Case |
|-----------|----------|
| `Tabs` | Switch between views |
| `Breadcrumbs` | Page hierarchy |
| `Sidebar` | App navigation |
| `NavigationMenu` | Complex navigation menus |
| `Menubar` | Application menu bar |
| `Pagination` | Page navigation |

### Data Display

| Component | Use Case |
|-----------|----------|
| `DataGrid` | Full-featured data table (sorting, filtering, selection) |
| `Table` | Simple HTML table |
| `Avatar` | User image |
| `AvatarGroup` | Stacked avatars |
| `Badge` | Status indicator |
| `Chip` | Removable tag |
| `Progress` | Linear progress bar |
| `ProgressCircular` | Circular progress |
| `Skeleton` | Loading placeholder |
| `Card` | Content container |

### Layout

| Component | Use Case |
|-----------|----------|
| `Divider` | Visual separator |
| `ScrollArea` | Custom scrollbar container |
| `ResizablePanelGroup` | Resizable split panels |
| `Collapsible` | Expandable/collapsible section |
| `AccordionGroup` | Multiple collapsible sections |
| `AspectRatio` | Fixed aspect ratio container |
| `Carousel` | Scrollable content carousel |

### Charts

| Component | Use Case |
|-----------|----------|
| `Chart` | Base chart component |
| `BarChart` | Bar/column charts |
| `LineChart` | Line/area charts |
| `PieChart` | Pie charts |
| `DonutChart` | Donut charts |

---

## Decision Guide: Which Component?

### Text Input Needs

```text
Need text input?
├── Single line? → Input variant="default"
├── Password? → Input variant="password"
├── Number with +/-? → Input variant="quantity"
├── Multiple tags? → Input variant="tags"
├── With prefix/suffix? → Input variant="addon"
└── Multi-line? → Textarea
```

### Selection Needs

```text
Need to select from options?
├── Single selection?
│   ├── Few options (≤5)? → RadioGroup or Select
│   ├── Many options? → Select or Combobox
│   └── With search? → Combobox
├── Multiple selection?
│   ├── Few options? → CheckboxList
│   └── Many options? → Select variant="multi"
└── On/Off toggle? → Switch
```

### Button Needs

```text
Need a clickable element?
├── Primary action (submit, save)? → Button buttonStyle="primary"
├── Secondary action? → Button buttonStyle="secondary"
├── Dangerous action? → Button buttonStyle="destructive"
├── Navigation? → LinkButton
├── Icon only? → ControlButton
├── With avatar? → AvatarButton
└── Group of buttons? → ButtonGroup
```

### Feedback Needs

```text
Need to show feedback?
├── Blocking confirmation? → AlertDialog or ConfirmDialog
├── Non-blocking message? → toast()
├── Help text on hover? → Tooltip
├── Complex content on click? → Popover
├── Side panel? → Sheet
└── Full modal? → Dialog
```

---

## Icons

The design system includes comprehensive icon sets:

```tsx
import { Icon } from '@blumnai/design-system';

// System icons
<Icon iconType={['system', 'check']} />
<Icon iconType={['system', 'close']} />
<Icon iconType={['system', 'search']} />
<Icon iconType={['system', 'settings']} />

// With fill variant
<Icon iconType={['system', 'heart']} isFill />

// Sizes
<Icon iconType={['system', 'user']} size={16} />
<Icon iconType={['system', 'user']} size={24} />
```

Icon categories: `system`, `arrows`, `business`, `communication`, `design`, `development`, `device`, `document`, `editor`, `finance`, `food`, `health`, `logos`, `map`, `media`, `weather`, `user`

---

## Form Integration

All form inputs work with `react-hook-form` via the Form components:

```tsx
import { Form, FormField, FormControl } from '@blumnai/design-system';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// See PATTERNS.md for complete examples
```

---

## Import Examples

```tsx
// Buttons
import { Button, LinkButton, ControlButton } from '@blumnai/design-system';

// Inputs
import { Input, Textarea, Select, Combobox } from '@blumnai/design-system';

// Selection
import { Checkbox, CheckboxList, Radio, RadioGroup, Switch } from '@blumnai/design-system';

// Feedback
import { Dialog, AlertDialog, toast, Tooltip } from '@blumnai/design-system';

// Navigation
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@blumnai/design-system';

// Data
import { DataGrid, Table, Avatar, Badge } from '@blumnai/design-system';

// Forms
import { Form, FormField, FormControl, FormError } from '@blumnai/design-system';

// Icons
import { Icon } from '@blumnai/design-system';

// Hooks
import { useKeyboardShortcut, parseShortcut } from '@blumnai/design-system';

// Styles (required in app entry)
import '@blumnai/design-system/styles';
```
