# Blumnai Design System — AI & Developer Reference

> Complete component reference for AI agents and developers.
> Package: `@mbisolution/blumnai-design-system`

---

## Setup

```tsx
// 1. Import CSS once in app entry
import '@mbisolution/blumnai-design-system/styles';

// 2. Import components
import { Button, Input, Select } from '@mbisolution/blumnai-design-system';

// Or use subpath imports for faster builds
import { Button } from '@mbisolution/blumnai-design-system/button';
import { Input } from '@mbisolution/blumnai-design-system/input';
```

---

## Component Catalog

### Quick Reference Table

| Need | Component | Quick Example |
|------|-----------|---------------|
| Clickable action | `Button` | `<Button buttonStyle="primary">Save</Button>` |
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
| Tooltip | `TooltipTrigger` | `<TooltipTrigger content="Help text"><Button>?</Button></TooltipTrigger>` |
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
| Avatar | `Avatar` | `<Avatar variant="userpic" src="url" alt="John" />` |
| Avatar group | `AvatarGroup` | `<AvatarGroup avatars={[...]} />` |
| Badge/Tag | `Badge` | `<Badge label="Active" color="green" />` |
| Chip | `Chip` | `<Chip label="Tag" />` |
| Breadcrumbs | `Breadcrumbs` | `<Breadcrumbs items={[...]} />` |
| Divider | `Divider` | `<Divider />` |
| Scroll area | `ScrollArea` | `<ScrollArea><Content /></ScrollArea>` |
| Skeleton loader | `Skeleton` | `<Skeleton width="100%" height={16} />` |
| Popover | `Popover` | `<Popover><PopoverTrigger>...</PopoverTrigger></Popover>` |
| Context menu | `ContextMenu` | `<ContextMenu><ContextMenuTrigger>...</ContextMenuTrigger><ContextMenuContent>...</ContextMenuContent></ContextMenu>` |
| Dropdown menu | `DropdownMenu` | `<DropdownMenu><DropdownMenuTrigger>...</DropdownMenuTrigger><DropdownMenuContent>...</DropdownMenuContent></DropdownMenu>` |
| Slider | `Slider` | `<Slider value={50} onChange={...} />` |
| Slider with input | `SliderInput` | `<SliderInput value={50} onChange={...} />` |
| Range slider | `SliderRange` | `<SliderRange value={[20, 80]} />` |
| Data range slider | `DataRangeSlider` | `<DataRangeSlider data={data} value={[min, max]} />` |
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
| Charts | `BarChart`, `LineChart`, `PieChart`, `DonutChart` | See chart section |

### Component Categories

#### Form Inputs

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
| `Checkbox` / `CheckboxList` / `CheckboxCard` | Single, grouped, or card-style checkboxes |
| `Radio` / `RadioGroup` / `RadioList` / `RadioCard` | Single choice from options |
| `Switch` / `SwitchList` | Toggle on/off |
| `Slider` / `SliderRange` / `SliderInput` / `SliderRangeInput` | Value sliders |
| `DataRangeSlider` / `DataRangeSliderInput` | Range slider with data distribution chart |
| `DatePicker` / `DateRangePicker` | Date selection |
| `TimePicker` / `TimeInput` / `TimeRangePicker` / `TimeRangeInput` | Time selection |
| `FileUpload` | File drag & drop upload |
| `InputOTP` | One-time password input |

#### Buttons

| Component | Use Case |
|-----------|----------|
| `Button` | Primary actions (submit, save, etc.) |
| `LinkButton` | Navigation styled as text link |
| `ControlButton` | Icon-only actions (edit, delete) |
| `FilterButton` | Filter toggles with selection state and count badge |
| `AvatarButton` | User profile button with avatar |
| `ButtonGroup` | Group of related buttons |

#### Feedback & Overlays

| Component | Use Case |
|-----------|----------|
| `Dialog` | Modal for complex content |
| `AlertDialog` | Confirmation with icon and actions |
| `ConfirmDialog` | Simple yes/no confirmation |
| `toast()` | Temporary notifications |
| `TooltipTrigger` | Hover help text |
| `Popover` | Click-triggered floating content |
| `HoverCard` | Rich content on hover |
| `Sheet` | Slide-in side panel |
| `Drawer` | Bottom/side drawer overlay |

#### Navigation

| Component | Use Case |
|-----------|----------|
| `Tabs` | Switch between views |
| `Breadcrumbs` | Page hierarchy |
| `Sidebar` | App navigation |
| `NavigationMenu` | Complex navigation menus |
| `Menubar` | Application menu bar |
| `Pagination` | Page navigation |

#### Data Display

| Component | Use Case |
|-----------|----------|
| `DataGrid` | Full-featured data table (sorting, filtering, selection) |
| `Table` | Simple HTML table |
| `Avatar` / `AvatarGroup` | User image / stacked avatars |
| `Badge` | Status indicator / tag |
| `Chip` | Selectable tag / filter |
| `Progress` / `ProgressCircular` | Progress indicators |
| `Skeleton` | Loading placeholder |
| `Card` | Content container |

#### Layout

| Component | Use Case |
|-----------|----------|
| `Divider` | Visual separator |
| `ScrollArea` | Custom scrollbar container |
| `ResizablePanelGroup` | Resizable split panels |
| `Collapsible` | Expandable/collapsible section |
| `AccordionGroup` | Multiple collapsible sections |
| `AspectRatio` | Fixed aspect ratio container |
| `Carousel` | Scrollable content carousel |

#### Charts

| Component | Use Case |
|-----------|----------|
| `BarChart` | Bar/column charts |
| `LineChart` | Line/area charts |
| `PieChart` | Pie charts |
| `DonutChart` | Donut charts |

### Decision Guide

#### Text Input Needs

```
Need text input?
├── Single line? → Input variant="default"
├── Password? → Input variant="password"
├── Number with +/-? → Input variant="quantity"
├── Multiple tags? → Input variant="tags"
├── With prefix/suffix? → Input variant="addon"
└── Multi-line? → Textarea
```

#### Selection Needs

```
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

#### Button Needs

```
Need a clickable element?
├── Primary action? → Button buttonStyle="primary"
├── Secondary action? → Button buttonStyle="secondary"
├── Dangerous action? → Button buttonStyle="destructive"
├── Navigation? → LinkButton
├── Icon only? → ControlButton
├── With avatar? → AvatarButton
└── Group of buttons? → ButtonGroup
```

#### Feedback Needs

```
Need to show feedback?
├── Blocking confirmation? → AlertDialog or ConfirmDialog
├── Non-blocking message? → toast()
├── Help text on hover? → Tooltip
├── Complex content on click? → Popover
├── Side panel? → Sheet
└── Full modal? → Dialog
```

---

## Props Reference

### Button

```tsx
import { Button } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonStyle` | `'primary'` `'secondary'` `'destructive'` `'ghost'` `'ghostMuted'` `'soft'` `'dashed'` | `'secondary'` | Visual style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Button size |
| `shape` | `'rectangle'` `'pill'` `'square'` `'circle'` | `'rectangle'` | Button shape |
| `fullWidth` | `boolean` | `false` | Full container width |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disabled state |
| `width` | `string \| number` | - | Custom width (e.g., `120`, `'200px'`) |
| `leadIcon` | `IconType` | - | Icon before text |
| `tailIcon` | `IconType` | - | Icon after text |

> **Tip:** When using `loading`, always set `width` to prevent the button from shrinking when the label is replaced by a spinner.
> ```tsx
> <Button loading={isSaving} width={120}>Save</Button>
> ```

### LinkButton

```tsx
import { LinkButton } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `linkType` | `'default'` `'muted'` `'informative'` | `'default'` | Link style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Button size |
| `label` | `string` | required | Button label text |
| `href` | `string` | - | URL (renders as `<a>` when provided) |
| `openInNewTab` | `boolean` | `false` | Open in new tab (`target="_blank"`) |
| `leadIcon` | `IconType \| ReactNode` | - | Icon before label |
| `tailIcon` | `IconType \| ReactNode` | `['system', 'external-link']` | Icon after label |
| `disabled` | `boolean` | `false` | Disabled state |
| `width` | `string \| number` | - | Custom width |

### ControlButton

```tsx
import { ControlButton } from '@mbisolution/blumnai-design-system';
```

Icon-only button. `aria-label` is required.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonStyle` | `'default'` `'inverted'` | `'default'` | Visual style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Button size (icon: sm=14px, md/lg=16px) |
| `shape` | `'rounded'` `'circle'` | `'rounded'` | Button shape |
| `icon` | `IconType` | required | Icon to display |
| `disabled` | `boolean` | `false` | Disabled state |
| `aria-label` | `string` | required | Accessibility label |

### ButtonGroup

```tsx
import { ButtonGroup } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ButtonGroupItem[]` | required | Array of button items |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` | `'md'` | Group size |

**ButtonGroupItem** (discriminated union):
- **Icon-only**: `{ icon, ariaLabel }` — `label` not allowed
- **Regular**: `{ label?, icon?, tailIcon?, badge?, disabled?, onClick? }`

### Input

```tsx
import { Input } from '@mbisolution/blumnai-design-system';
```

#### Common Props (all variants)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'password'` `'quantity'` `'tags'` `'addon'` `'shortcut'` | `'default'` | Input type |
| `inputStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `size` | `'sm'` `'lg'` | `'sm'` | Input size |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `required` | `boolean` | `false` | Show required indicator |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean \| string` | - | Error state/message |
| `success` | `boolean \| string` | - | Success state/message |
| `supportText` | `string` | - | Helper text next to label |
| `caption` | `string` | - | Description below input |

#### variant="default"

| Prop | Type | Description |
|------|------|-------------|
| `leadIcon` | `IconType` | Icon at start |
| `tailIcon` | `IconType` | Icon at end |
| `onClear` | `() => void` | Clear button callback |

#### variant="password"

| Prop | Type | Description |
|------|------|-------------|
| `showToggle` | `boolean` | Show visibility toggle |
| `showStrength` | `boolean` | Show strength indicator |
| `autoCalculateStrength` | `boolean` | Auto-calculate strength |
| `strength` | `'none'` `'low'` `'medium'` `'high'` | Controlled strength |

#### variant="quantity"

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number` | Current value |
| `onChange` | `(value: number) => void` | Value change callback |
| `min` / `max` / `step` | `number` | Constraints |

#### variant="tags"

| Prop | Type | Description |
|------|------|-------------|
| `tags` | `string[]` | Current tags |
| `onTagsChange` | `(tags: string[]) => void` | Tags change callback |
| `maxTags` | `number` | Maximum tags allowed |

#### variant="addon"

| Prop | Type | Description |
|------|------|-------------|
| `prefix` | `string \| ReactNode` | Content before input |
| `suffix` | `string \| ReactNode` | Content after input |

### Textarea

```tsx
import { Textarea } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `textareaStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `size` | `'sm'` `'lg'` | `'sm'` | Textarea size |
| `label` | `string` | - | Label text |
| `rows` | `number` | `3` | Visible text rows |
| `resize` | `'none'` `'vertical'` `'horizontal'` `'both'` | `'vertical'` | Resize behavior |
| `showCount` | `boolean` | `false` | Show character count |
| `maxLength` | `number` | - | Maximum characters |
| `error` | `boolean \| string` | - | Error state/message |

### Select

```tsx
import { Select } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'multi'` `'avatar'` `'tags'` | `'default'` | Select type |
| `options` | `SelectOption[]` | `[]` | Available options |
| `value` | `string \| string[]` | - | Selected value(s) |
| `onChange` | `(value) => void` | - | Change callback |
| `placeholder` | `string` | - | Placeholder text |
| `label` | `string` | - | Label text |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean \| string` | - | Error state/message |
| `searchable` | `boolean` | `false` | Enable search |

```ts
interface SelectOption {
  id: string;
  label: string;
  description?: string;
  avatar?: string;
  disabled?: boolean;
}
```

### Checkbox

```tsx
import { Checkbox } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text |
| `description` | `string` | - | Description below label |
| `checked` | `boolean` | `false` | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change callback |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `disabled` | `boolean` | `false` | Disabled state |
| `checkboxStyle` | `'default'` `'soft'` | `'default'` | Visual style |
| `position` | `'left'` `'right'` | `'left'` | Checkbox position |

### CheckboxList

```tsx
import { CheckboxList } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CheckboxListItem[]` | required | Checkbox items |
| `listStyle` | `'default'` `'bordered'` | `'default'` | List style |
| `checkboxStyle` | `'default'` `'with-shadow'` | `'with-shadow'` | Checkbox style |
| `onItemChange` | `(id: string, checked: boolean) => void` | - | Change handler |

**CheckboxListItem**: `{ id, title, description?, checked?, disabled? }`

### CheckboxCard

```tsx
import { CheckboxCard } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Card title |
| `description` | `string` | required | Card description |
| `sections` | `{ title, description }[]` | - | Additional sections |
| `layout` | `'vertical'` `'horizontal'` | `'vertical'` | Layout direction |
| `checked` | `boolean` | - | Checked state |
| `disabled` | `boolean` | - | Disabled state |
| `background` | `'default'` `'soft'` | `'default'` | Background style |
| `checkboxPosition` | `'left'` `'right'` `'off'` | `'right'` | Checkbox position |
| `checkboxStyle` | `'default'` `'with-shadow'` | `'with-shadow'` | Checkbox style |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change handler |

### Switch

```tsx
import { Switch } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text |
| `description` | `string` | - | Description text |
| `checked` | `boolean` | `false` | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change callback |
| `disabled` | `boolean` | `false` | Disabled state |
| `position` | `'left'` `'right'` | `'left'` | Switch position |
| `color` | `'default'` `'success'` | `'default'` | Active color |

### SwitchList

```tsx
import { SwitchList } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SwitchListItem[]` | required | Switch items |
| `listStyle` | `'default'` `'bordered'` | `'default'` | List style |
| `color` | `'green'` `'blue'` `'red'` `'orange'` `'violet'` `'cyan'` `'pink'` | `'green'` | Switch color |
| `onItemChange` | `(id: string, checked: boolean) => void` | - | Change handler |

**SwitchListItem**: `{ id, title, description?, checked?, disabled? }`

### RadioGroup / Radio

```tsx
import { RadioGroup, Radio } from '@mbisolution/blumnai-design-system';
```

**RadioGroup**: `value`, `onValueChange`, `disabled`, `orientation` (`'horizontal'`|`'vertical'`)

**Radio**: `value` (required), `label`, `description`, `disabled`

### RadioList

```tsx
import { RadioList } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `RadioListItem[]` | required | Radio items |
| `value` | `string` | - | Selected value |
| `onValueChange` | `(value: string) => void` | - | Value change handler |
| `listStyle` | `'default'` `'bordered'` | `'default'` | List style |
| `radioStyle` | `'default'` `'with-shadow'` | `'with-shadow'` | Radio style |

**RadioListItem**: `{ value, title, description?, disabled? }`

### RadioCard

```tsx
import { RadioCard } from '@mbisolution/blumnai-design-system';
```

Used inside a `RadioGroup`. Each card is one radio option.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Radio value |
| `title` | `string` | required | Card title |
| `description` | `string` | - | Card description |
| `sections` | `{ title, description }[]` | - | Additional sections |
| `layout` | `'vertical'` `'horizontal'` | `'vertical'` | Layout direction |
| `disabled` | `boolean` | - | Disabled state |
| `background` | `'default'` `'soft'` | `'default'` | Background style |
| `radioPosition` | `'left'` `'right'` `'off'` | `'right'` | Radio position |
| `radioStyle` | `'default'` `'with-shadow'` | `'with-shadow'` | Radio style |

### Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogScrollArea } from '@mbisolution/blumnai-design-system';
```

**Dialog**: `open`, `onOpenChange`, `modal`

**DialogContent**: `hideCloseButton`, `disableEscapeClose`, `disableOutsideClose`, `width` (string|number)

**DialogHeader**, **DialogFooter**: Layout wrappers (`HTMLAttributes<HTMLDivElement>`)

**DialogTitle**, **DialogDescription**: Radix Dialog primitives for accessibility

**DialogScrollArea**: `maxHeight` (string|number) — Scrollable content area

### ConfirmDialog

```tsx
import { ConfirmDialog } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |
| `title` | `string` | required | Title text |
| `description` | `string` | - | Description text |
| `variant` | `'default'` `'destructive'` | `'default'` | Confirm button style |
| `confirmLabel` | `string` | `'확인'` | Confirm button text |
| `cancelLabel` | `string` | `'취소'` | Cancel button text |
| `onConfirm` | `() => void \| Promise<void>` | - | Confirm callback |
| `loading` | `boolean` | `false` | Loading state |

### Toast

```tsx
import { toast } from '@mbisolution/blumnai-design-system';

// Shorthand methods (recommended)
toast.success('Saved successfully');
toast.error('Something went wrong');
toast.warning('Attention needed');
toast.info('New update available');
toast.default('Default notification');

// With options
toast.success('Saved', { duration: 5000 });
toast.info('Deleted', { label: 'Undo' });

// Dismiss
toast.dismiss(toastId);
toast.dismissAll();
```

| Method | Description |
|--------|-------------|
| `toast.default(message, options?)` | Default notification |
| `toast.success(message, options?)` | Success notification |
| `toast.error(message, options?)` | Error notification |
| `toast.warning(message, options?)` | Warning notification |
| `toast.info(message, options?)` | Info notification |
| `toast.dismiss(id?)` | Dismiss specific toast |
| `toast.dismissAll()` | Dismiss all toasts |

**ToastOptions:**

| Option | Type | Description |
|--------|------|-------------|
| `duration` | `number` | Display duration in ms |
| `label` | `string` | Action label text |

> **Setup:** Add `<Toaster />` from `sonner` in your app root:
> ```tsx
> import { Toaster } from 'sonner';
> // In your layout:
> <Toaster position="top-right" />
> ```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@mbisolution/blumnai-design-system';
```

**Tabs**: `value`, `defaultValue`, `onValueChange`, `orientation`

**TabsList**: `variant` (`'default'`|`'pills'`|`'underline'`), `size` (`'sm'`|`'md'`|`'lg'`)

### Table

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, TableCaption } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `striped` | `boolean` | - | Striped row style |
| `bordered` | `boolean` | - | Show border |
| `stickyHeader` | `boolean` | - | Sticky header on scroll |
| `maxHeight` | `string` | - | Container max height (enables scroll) |
| `isLoading` | `boolean` | - | Loading state |
| `pagination` | `boolean` | - | Show pagination UI |
| `page` | `number` | - | Current page (1-indexed) |
| `totalPages` | `number` | - | Total pages |
| `onPageChange` | `(page: number) => void` | - | Page change callback |

**TableHead**: `sortable?` (boolean), `sortDirection?` (`'asc'`|`'desc'`|`false`)

**TableRow**: `selected?` (boolean)

#### Cell Components (for DataGrid columns)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `CellText` | `value` (string\|number), `tooltip?`, `copyable?` | Text cell with optional copy |
| `CellBadge` | `label`, `color?` (BadgeColor) | Badge in a cell |
| `CellAvatar` | `src?`, `name?`, `initials?`, `size?`, `showName?` | Avatar in a cell |

### DataGrid

```tsx
import { DataGrid } from '@mbisolution/blumnai-design-system';
import type { ColumnDef } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<T>[]` | required | Column definitions |
| `data` | `T[]` | required | Data array |
| `enableSorting` | `boolean` | `false` | Enable column sorting |
| `enableFiltering` | `boolean` | `false` | Enable column filtering |
| `enableRowSelection` | `boolean` | `false` | Enable row selection |
| `enablePagination` | `boolean` | `false` | Enable pagination |
| `pageSize` | `number` | `10` | Rows per page |
| `onRowSelectionChange` | `(selection) => void` | - | Selection callback |
| `onRowClick` | `(row) => void` | - | Row click callback |

### Avatar

```tsx
import { Avatar, AvatarGroup } from '@mbisolution/blumnai-design-system';
```

**Avatar:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'initials'` `'userpic'` `'empty'` | `'initials'` | Avatar type |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` `'xl'` `'2xl'` `'3xl'` | `'md'` | Size |
| `shape` | `'circular'` `'rounded'` | `'circular'` | Shape |
| `initials` | `string` | - | 1-2 characters (for `variant="initials"`) |
| `src` | `string` | - | Image URL (for `variant="userpic"`) |
| `alt` | `string` | - | Image alt text |
| `color` | `string` | - | Background color for initials |
| `ring` | `boolean` | `false` | White ring around avatar |
| `status` | `'online'` `'offline'` `'checkmark'` `'logo'` `'icon'` `'notification'` | - | Status badge |
| `badgeLocation` | `'top'` `'bottom'` | `'top'` | Status badge position |

```tsx
<Avatar variant="initials" initials="JD" size="md" />
<Avatar variant="userpic" src="/photo.jpg" size="lg" />
<Avatar variant="empty" size="sm" />
<Avatar variant="initials" initials="OK" status="online" />
```

**AvatarGroup:** `avatars` (AvatarProps[]), `max` (default shows "+N" overflow), `size`, `stacking` (`'last-on-top'`|`'first-on-top'`)

### Badge

```tsx
import { Badge } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Badge text |
| `variant` | `'default'` `'icon'` `'image'` `'dot'` | `'default'` | Badge type |
| `color` | `'red'` `'orange'` `'lime'` `'green'` `'cyan'` `'blue'` `'violet'` `'fuchsia'` `'pink'` `'neutral'` | `'neutral'` | Badge color |
| `size` | `'sm'` `'lg'` | `'sm'` | Badge size |
| `shape` | `'rounded'` `'pill'` | `'rounded'` | Badge shape |
| `border` | `boolean` | `false` | Show border |
| `closeIcon` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | - | Close callback |
| `icon` | `IconTypeWithFill` | - | Icon (for `variant="icon"`) |
| `image` | `string` | - | Image URL (for `variant="image"`) |

```tsx
<Badge label="Active" color="green" />
<Badge label="Warning" color="orange" />
<Badge label="Error" color="red" />
<Badge label="Info" color="blue" />
<Badge label="Tag" color="neutral" closeIcon onClose={() => {}} />
<Badge variant="dot" color="green" label="Online" />
```

### Progress

```tsx
import { Progress, ProgressCircular } from '@mbisolution/blumnai-design-system';
```

**Progress**: `value`, `max` (100), `showValue`, `size` (`'sm'`|`'md'`|`'lg'`)

**ProgressCircular**: `value`, `size` (px), `strokeWidth`, `showValue`

### Icon

```tsx
import { Icon } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconType` | `[category, name]` | required | Icon identifier |
| `size` | `number` | `20` | Icon size in px |
| `color` | `string` | `'currentColor'` | Icon color |
| `isFill` | `boolean` | `false` | Use fill variant |

### Slider

```tsx
import { Slider, SliderRange, SliderInput, SliderRangeInput } from '@mbisolution/blumnai-design-system';
```

**Slider**: `value`, `onChange`, `min`, `max`, `step`, `disabled`, `color`, `showTicks`

**SliderRange**: `value` (`[number, number]`), `onChange`, `min`, `max`

**SliderInput / SliderRangeInput**: All slider props + `label`, `showInput`

**DataRangeSlider / DataRangeSliderInput**: `data` (number[]), `value`, `onChange`, `showChart`

### TimePicker

```tsx
import { TimePicker, TimeRangePicker } from '@mbisolution/blumnai-design-system';
```

**TimePicker**: `value` (`TimeValue`), `onChange`, `timeFormat` (`'12h'`|`'24h'`), `showSeconds`, `label`, `error`, `showQuickSelect`

**TimeRangePicker**: `value` (`TimeRange`), `onChange`, `timeFormat`, `showSeconds`, `showQuickSelect`

### Sheet / Drawer

```tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@mbisolution/blumnai-design-system';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@mbisolution/blumnai-design-system';
```

**Sheet**: `open`, `onOpenChange`. **SheetContent**: `side` (`'top'`|`'right'`|`'bottom'`|`'left'`)

**SheetHeader**, **SheetFooter**: Layout wrappers (`HTMLAttributes<HTMLDivElement>`)
**SheetTitle**, **SheetDescription**: Radix Dialog primitives for accessibility

**Drawer**: `open`, `onOpenChange`, `direction` (`'top'`|`'right'`|`'bottom'`|`'left'`, default `'bottom'`), `shouldScaleBackground` (default `true`)

**DrawerHeader**, **DrawerFooter**: Layout wrappers (`HTMLAttributes<HTMLDivElement>`)
**DrawerTitle**, **DrawerDescription**: Vaul primitives for accessibility

### FilterButton

```tsx
import { FilterButton } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | `false` | Selection state |
| `count` | `number` | - | Active filter count badge |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Button size |

### AvatarButton

```tsx
import { AvatarButton } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Avatar image URL |
| `name` | `string` | - | User name (fallback initials) |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Button size |
| `showDropdown` | `boolean` | `false` | Show dropdown indicator |

### Carousel

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators } from '@mbisolution/blumnai-design-system';
```

**Carousel**: `orientation` (`'horizontal'`|`'vertical'`), `opts` (EmblaOptionsType)

**CarouselIndicators**: `variant` (`'dot'`|`'line'`|`'number'`)

### InputOTP

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Description |
|------|------|-------------|
| `maxLength` | `number` | Number of digits (required) |
| `value` | `string` | Current OTP value |
| `onChange` | `(value: string) => void` | Change callback |

### HoverCard

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@mbisolution/blumnai-design-system';
```

`openDelay` (700ms), `closeDelay` (300ms)

### NavigationMenu

```tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuListItem } from '@mbisolution/blumnai-design-system';
```

**NavigationMenu**: `value`, `onValueChange`, `orientation` (`'horizontal'`|`'vertical'`)

**NavigationMenuContent**: `width?` (string|number)

**NavigationMenuLink**: `active?` (boolean)

**NavigationMenuListItem**: `title` (required), `description?`, `href` (required), `icon?` (IconType), `iconFill?`

### AspectRatio

```tsx
import { AspectRatio } from '@mbisolution/blumnai-design-system';
```

`ratio` (number, e.g. `16/9`, default `1`)

### Tooltip

```tsx
import { TooltipTrigger } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | required | Tooltip content |
| `children` | `ReactElement` | required | Trigger element |
| `placement` | `Placement` | `'top'` | Tooltip position |
| `delay` | `number` | `200` | Hover delay in ms |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `maxWidth` | `number` | `240` | Max width in px |
| `badge` | `string` | - | Badge text inside tooltip |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |

```tsx
<TooltipTrigger content="Help text" placement="top">
  <Button>Hover me</Button>
</TooltipTrigger>
```

**AdvancedTooltip** — Rich content tooltip with structured items:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TooltipItemData[]` | required | Array of tooltip items |
| `minWidth` | `number` | - | Minimum width in px |

**TooltipItemData** — Each item has a `type` field:
- `{ type: 'divider' }` — Horizontal separator
- `{ type: 'label', label, caption? }` — Section label with optional caption
- `{ type: 'item', label, caption?, indicatorColor?, icon? }` — Data row with optional color dot and icon
- `{ type: 'text', text }` — Plain text block

`icon` format: `['system', 'info']` or `['system', 'star', true]` for filled.

### DatePicker / DateRangePicker

```tsx
import { DatePicker, DateRangePicker } from '@mbisolution/blumnai-design-system';
```

**Common Props (both components):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `datePickerStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `size` | `'sm'` `'lg'` | `'sm'` | Input size |
| `label` | `string` | - | Label text |
| `required` | `boolean` | `false` | Required indicator |
| `caption` | `string` | - | Description below input |
| `error` | `boolean \| string` | - | Error state/message |
| `success` | `boolean \| string` | - | Success state/message |
| `disabled` | `boolean` | `false` | Disabled state |
| `width` | `string \| number` | - | Custom width |
| `minDate` | `Date` | - | Earliest selectable date |
| `maxDate` | `Date` | - | Latest selectable date |
| `disabledDates` | `Date[]` | - | Specific disabled dates |
| `dateFormat` | `'yyyy.MM.dd'` `'yyyy-MM-dd'` `'yyyy/MM/dd'` `'MM/dd/yyyy'` `'dd/MM/yyyy'` | `'yyyy.MM.dd'` | Display format |
| `showQuickPresets` | `boolean` | `false` | Show quick date presets |
| `locale` | `Locale` | - | date-fns locale |

**DatePicker-specific:** `value` (Date), `onChange` ((date: Date | undefined) => void), `presets` (QuickPreset[])

**DateRangePicker-specific:** `value` (DateRange: { from: Date, to: Date }), `onChange`, `numberOfMonths` (default 2), `presets`

```tsx
<DatePicker label="Start Date" value={date} onChange={setDate} />
<DateRangePicker label="Period" value={range} onChange={setRange} showQuickPresets />
```

### Charts

```tsx
import { BarChart, LineChart, PieChart, DonutChart } from '@mbisolution/blumnai-design-system';
```

**Common Props (all charts):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ChartDataPoint[]` | required | Data array (objects with string/number values) |
| `config` | `ChartConfig` | - | Color and label config per data key |
| `width` | `number` | - | Chart width |
| `height` | `number` | - | Chart height |
| `showXGrid` | `boolean` | - | Show X-axis grid lines |
| `showYGrid` | `boolean` | - | Show Y-axis grid lines |
| `showLegend` | `boolean` | - | Show legend |

**BarChart:** `xAxis` (ChartAxisConfig), `yAxis` (ChartAxisConfig), `barSize` (number), `stacked` (boolean), `stackedKeys` (string[])

**LineChart:** `xAxis`, `yAxis`, `dataKeys` (string[]), `showArea` (boolean), `showPoints` (boolean), `strokeWidth` (number)

**PieChart:** `dataKey` (string), `nameKey` (string), `outerRadius` (number), `isHalf` (boolean)

**DonutChart** extends PieChart: `innerRadius` (number), `centerLabel` (string), `centerValue` (string)

```tsx
const data = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
];

const config = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
  expenses: { label: 'Expenses', color: 'var(--chart-2)' },
};

<BarChart
  data={data}
  config={config}
  xAxis={{ dataKey: 'month' }}
  yAxis={{ dataKey: 'revenue' }}
  height={300}
  showLegend
/>
```

### AccordionGroup

```tsx
import { AccordionGroup } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionGroupItem[]` | required | Accordion items |
| `spacing` | `number` | - | Gap between items (px) |
| `style` | `AccordionItemStyle` | - | Default style for all items |
| `allowMultipleOpen` | `boolean` | - | Allow multiple items open simultaneously |

```ts
interface AccordionGroupItem {
  id?: string;
  header: ReactNode;
  children: ReactNode;
  style?: AccordionItemStyle;
  isOpen?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}
```

```tsx
<AccordionGroup
  items={[
    { id: '1', header: 'Question?', children: 'Answer here.' },
    { id: '2', header: 'Another?', children: 'More content.', isOpen: true },
  ]}
  allowMultipleOpen
/>
```

### ContextMenu

```tsx
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuSeparator, ContextMenuLabel,
  ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem,
  ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
} from '@mbisolution/blumnai-design-system';
```

**ContextMenuContent**: `width` (string|number)

**ContextMenuItem:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `destructive` | `boolean` | `false` | Danger/delete styling |
| `leadIcon` | `IconType` | - | Icon before label |
| `tailIcon` | `IconType` | - | Icon after label |
| `shortcut` | `string` | - | Keyboard shortcut display |
| `caption` | `string` | - | Secondary text |
| `description` | `string` | - | Description (large size only) |
| `size` | `'default'` `'large'` | `'default'` | Item size |

**ContextMenuLabel**: `caption` (string)

```tsx
<ContextMenu>
  <ContextMenuTrigger>
    <div>Right-click this area</div>
  </ContextMenuTrigger>
  <ContextMenuContent width={220}>
    <ContextMenuLabel>Actions</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuItem shortcut="⌘C">Copy</ContextMenuItem>
    <ContextMenuItem shortcut="⌘V">Paste</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem destructive shortcut="⌫">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### FileUpload

```tsx
import { FileUpload, FileUploadArea, FileUploadCard } from '@mbisolution/blumnai-design-system';
```

**FileUploadArea:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFilesSelected` | `(files: File[]) => void` | - | File selection callback |
| `accept` | `string` | - | Accepted file types (e.g., `"image/*,.pdf"`) |
| `maxFiles` | `number` | - | Maximum file count |
| `maxSize` | `number` | - | Max total size in bytes |
| `multiple` | `boolean` | - | Allow multiple files |
| `title` | `string` | - | Title text |
| `clickText` | `string` | - | Highlighted click text |
| `description` | `string` | - | Description text |
| `icon` | `IconTypeWithFill` | - | Custom icon |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean \| string` | - | Error state/message |

**FileUploadCard:**

| Prop | Type | Description |
|------|------|-------------|
| `file` | `File \| FileInfo` | File object |
| `status` | `'uploading'` `'uploaded'` `'error'` | Upload state |
| `progress` | `number` | Progress 0-100 |
| `thumbnail` | `string` | Preview image URL |
| `onRemove` | `() => void` | Remove callback |
| `onRetry` | `() => void` | Retry callback |

### Breadcrumbs

```tsx
import { Breadcrumbs } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | required | Breadcrumb items |
| `size` | `'sm'` `'lg'` | `'sm'` | Size |
| `separator` | `'slash'` `'chevron'` `'dot'` `'arrow'` | `'slash'` | Separator style |
| `maxItems` | `number` | - | Max visible items (collapses to "...") |

```ts
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: IconTypeWithFill | ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}
```

### Pagination

```tsx
import { Pagination } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | required | Current page (1-indexed) |
| `totalPages` | `number` | required | Total pages |
| `onPageChange` | `(page: number) => void` | required | Page change callback |
| `variant` | `'numbered'` `'dot'` `'simple'` | `'numbered'` | Pagination style |
| `maxVisiblePages` | `number` | `7` | Max visible page buttons |
| `disabled` | `boolean` | `false` | Disabled state |
| `hideNavButtons` | `boolean` | `false` | Hide prev/next buttons |
| `getPageHref` | `(page: number) => string` | - | For router integration |

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@mbisolution/blumnai-design-system';
```

**Card**: `variant` (`'default'`|`'outline'`|`'ghost'`)

```tsx
<Card variant="outline">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Chip

```tsx
import { Chip } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Chip text |
| `icon` | `IconTypeWithFill` | - | Icon |
| `variant` | `'default'` `'iconOnly'` | `'default'` | Display type |
| `style` | `'default'` `'soft'` `'ghost'` `'ghostMuted'` | `'default'` | Visual style |
| `shape` | `'rounded'` `'pill'` | `'rounded'` | Shape |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Size |
| `selected` | `boolean` | `false` | Selected state |

### Skeleton

```tsx
import { Skeleton } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'circular'` `'text'` | - | Shape variant |
| `width` | `string \| number` | - | Width |
| `height` | `string \| number` | - | Height |

```tsx
<Skeleton width={200} height={20} />
<Skeleton variant="circular" width={40} height={40} />
```

### Form

```tsx
import { Form, FormField, FormControl, FormItem, FormError } from '@mbisolution/blumnai-design-system';
```

Integrates with `react-hook-form` and `zod`. `FormControl` automatically injects error messages into children that support the `error` prop.

| Component | Key Props |
|-----------|-----------|
| `Form` | `form` (UseFormReturn), `onSubmit` |
| `FormField` | `control`, `name`, `render` |
| `FormControl` | `children` (auto-injects error + aria attributes) |
| `FormItem` | Container div |
| `FormError` | Custom error message override |

See Login Form pattern for complete example.

### Dropdown

```tsx
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from '@mbisolution/blumnai-design-system';
```

Same compound pattern as ContextMenu. Triggered by click instead of right-click.

**DropdownMenuContent**: `width` (string|number)

**DropdownMenuItem**: Same props as ContextMenuItem — `destructive`, `leadIcon`, `tailIcon`, `shortcut`, `caption`, `description`, `size`

**DropdownMenuAvatar**: `label` (required), `avatarSrc?`, `avatarAlt?`, `tailIcon?`, `caption?`, `shortcut?`, `disabled?`, `iconColor?`, `onClick?`

**DropdownMenuUserbar**: `name` (required), `description?`, `avatarSrc?`, `avatarAlt?`, `badge?`, `badgeColor?`

**DropdownMenuButton**: `label` (required), `buttonStyle?` (`'secondary'`), `leadIcon?`, `tailIcon?`, `disabled?`, `onClick?`

**DropdownMenuSearch**: `value?`, `onChange?`, `placeholder?` (`'Search...'`), `autoFocus?` (`true`)

### ScrollArea

```tsx
import { ScrollArea } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'vertical'` `'horizontal'` `'both'` | `'vertical'` | Scroll direction |
| `maxHeight` | `string \| number` | - | Max height (e.g., `300`, `"50vh"`) |
| `maxWidth` | `string \| number` | - | Max width |

### Collapsible

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `disabled` | `boolean` | `false` | Disable collapsible |

### Divider

```tsx
import { Divider } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'default'` `'text-left'` `'text-center'` `'text-right'` `'icon-left'` `'icon-center'` `'icon-right'` `'button-left'` `'button-center'` `'button-right'` | `'default'` | Divider type |
| `lineStyle` | `'default'` `'dashed'` | `'default'` | Line style |
| `label` | `string` | - | Text label (for text-* types) |
| `icon` | `IconTypeWithFill` | - | Icon (for icon-* types) |
| `buttonLabel` | `string` | - | Button label (for button-* types) |
| `onButtonClick` | `() => void` | - | Button click handler |
| `children` | `ReactNode` | - | Custom content (overrides label/icon/button) |

### ResizablePanelGroup

Wraps react-resizable-panels: `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`.

**ResizablePanel**: `defaultSize?` (number %), `minSize?` (number %), `maxSize?` (number %), `collapsible?` (boolean). Extends react-resizable-panels Panel props.

**ResizableHandle**: `withHandle` (boolean), `variant` (`'line'`|`'pill'`|`'dots'`|`'hidden'`), `collapseButton` (`'before'`|`'after'`), `collapseButtonPosition` (`'start'`|`'center'`|`'end'`|number), `panelRef`, `isCollapsed?`, `onCollapseChange?`

### AlertDialog vs ConfirmDialog

> **AlertDialog** — Low-level compound component (like Dialog). Build custom layouts with `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `onConfirm`. Supports `loading` and `confirmDisabled` props. Use for simple yes/no confirmations.
>
> **ConfirmDialog** — Higher-level wrapper. Pass `title`, `description`, `confirmLabel`, `cancelLabel`, `variant`, `onConfirm`. Use for standard confirmation patterns.

### Sidebar

```tsx
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarGroup, SidebarHeader, SidebarFooter, SidebarUserbar } from '@mbisolution/blumnai-design-system';
```

**SidebarContent**, **SidebarMenu**, **SidebarGroup**, **SidebarHeader**, **SidebarFooter**: Layout wrappers (div/ul elements with `className`)

**SidebarMenuItem** (discriminated union via `variant`):

| Variant | Key Props |
|---------|-----------|
| `'default'` (default) | `label` (required), `icon?`, `badge?`, `shortcut?`, `isActive?`, `disabled?`, `collapsed?`, `tooltip?` |
| `'label'` | `label` (required), `icon?`, `action?` (ReactNode) |
| `'caption'` | `label` (required), `caption` (required) |
| `'buttons'` | `label` (required), `icon?`, `actions?` (ReactNode) |
| `'divider'` | No props |
| `'avatar'` | `label` (required), `avatarSrc?`, `avatarAlt?`, `avatarInitials?`, `badge?` |
| `'children'` | `label` (required), `nested?` (default true) |

**SidebarUserbar**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'variant1'` `'variant2'` `'variant3'` | `'variant3'` | Userbar style |
| `collapsed` | `boolean` | `false` | Sidebar collapsed state |
| `avatarSrc` | `string` | - | Avatar image URL |
| `avatarAlt` | `string` | - | Avatar alt text |
| `avatarInitials` | `string` | - | Avatar initials |
| `name` | `string` | - | User name |
| `email` | `string` | - | User email (variant2 only) |
| `isOpen` | `boolean` | `false` | Dropdown open state |
| `onClick` | `() => void` | - | Click handler |

### Menubar

```tsx
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from '@mbisolution/blumnai-design-system';
```

**MenubarContent**: `width?` (string|number), `container?` (HTMLElement)

**MenubarItem**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `destructive` | `boolean` | - | Destructive action styling |
| `leadIcon` | `IconType` | - | Icon before label |
| `tailIcon` | `IconType` | - | Icon after label |
| `caption` | `string` | - | Caption text |
| `description` | `string` | - | Description (large size only) |
| `shortcut` | `string` | - | Keyboard shortcut |
| `size` | `'default'` `'large'` | `'default'` | Item size |
| `inset` | `boolean` | - | Left indent |

### PopoverContent

```tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverScrollArea, PopoverArrow } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | - | Content width |
| `align` | `'start'` `'center'` `'end'` | `'center'` | Horizontal alignment |
| `side` | `'top'` `'right'` `'bottom'` `'left'` | `'bottom'` | Which side to render |
| `sideOffset` | `number` | `4` | Distance from trigger (px) |

**PopoverScrollArea**: `maxHeight` (string|number)

---

## Common Patterns

### Login Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormControl, Input, Button } from '@mbisolution/blumnai-design-system';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
});

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <Form form={form} onSubmit={(values) => console.log(values)} className="flex flex-col gap-16 max-w-sm">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormControl>
            <Input variant="default" label="이메일" placeholder="example@email.com" {...field} />
          </FormControl>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormControl>
            <Input variant="password" label="비밀번호" placeholder="비밀번호 입력" {...field} />
          </FormControl>
        )}
      />
      <Button type="submit" buttonStyle="primary" size="lg" fullWidth>
        로그인
      </Button>
    </Form>
  );
}
```

### Confirmation Dialog

```tsx
import { ConfirmDialog, Button } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

function DeleteConfirmation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button buttonStyle="destructive" onClick={() => setOpen(true)}>삭제</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="정말 삭제하시겠습니까?"
        description="이 작업은 되돌릴 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="destructive"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}
```

### Dialog with Form

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button, Input } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

function EditDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <Button onClick={() => setOpen(true)}>편집</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>프로필 편집</DialogTitle>
          </DialogHeader>
          <div className="padding-y-16">
            <Input variant="default" label="이름" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <DialogFooter>
            <Button buttonStyle="secondary" onClick={() => setOpen(false)}>취소</Button>
            <Button buttonStyle="primary" onClick={() => setOpen(false)}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### Toast Notifications

```tsx
import { toast } from '@mbisolution/blumnai-design-system';

toast.success('저장되었습니다');
toast.error('오류가 발생했습니다');
toast.warning('주의가 필요합니다');
toast.info('새로운 메시지가 있습니다');
toast.info('삭제됨', { label: '실행취소' });
```

### DataGrid with Sorting and Selection

```tsx
import { useState } from 'react';
import { DataGrid, CellText, CellBadge, CellAvatar } from '@mbisolution/blumnai-design-system';
import type { ColumnDef } from '@mbisolution/blumnai-design-system';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: '이름',
    cell: ({ row }) => <CellAvatar name={row.original.name} description={row.original.email} />,
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ getValue }) => (
      <CellBadge variant={getValue() === 'active' ? 'success' : 'secondary'}>
        {getValue() === 'active' ? '활성' : '비활성'}
      </CellBadge>
    ),
  },
];

function UserTable() {
  const [data] = useState<User[]>([
    { id: '1', name: '홍길동', email: 'hong@email.com', status: 'active' },
  ]);

  return <DataGrid columns={columns} data={data} enableSorting enableRowSelection />;
}
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@mbisolution/blumnai-design-system';

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="security">보안</TabsTrigger>
  </TabsList>
  <TabsContent value="account">계정 설정</TabsContent>
  <TabsContent value="security">보안 설정</TabsContent>
</Tabs>
```

### Search Input with Clear

```tsx
import { Input } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

function SearchInput() {
  const [value, setValue] = useState('');
  return (
    <Input
      variant="default"
      placeholder="검색..."
      leadIcon={['system', 'search']}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
}
```

### File Upload

```tsx
import { FileUpload } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

function UploadExample() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      accept="image/*,.png,.jpg,.jpeg"
      maxFiles={5}
      maxSize={5 * 1024 * 1024}
      onFilesChange={setFiles}
    />
  );
}
```

### Button Variants

```tsx
import { Button } from '@mbisolution/blumnai-design-system';

<Button buttonStyle="primary">Primary</Button>
<Button buttonStyle="secondary">Secondary</Button>
<Button buttonStyle="ghost">Ghost</Button>
<Button buttonStyle="destructive">Destructive</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<Button leadIcon={['system', 'add']}>추가</Button>
<Button loading width={120}>저장 중...</Button>
<Button fullWidth>전체 너비</Button>
```

### Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent, Button } from '@mbisolution/blumnai-design-system';

<Popover>
  <PopoverTrigger asChild>
    <span><Button buttonStyle="secondary">설정</Button></span>
  </PopoverTrigger>
  <PopoverContent>
    <div className="padding-16"><p>팝오버 내용</p></div>
  </PopoverContent>
</Popover>
```

---

## Icons

### Usage

```tsx
import { Icon } from '@mbisolution/blumnai-design-system';

<Icon iconType={['system', 'check']} />
<Icon iconType={['system', 'close']} size={24} />
<Icon iconType={['system', 'heart']} isFill />
```

### Categories

`system`, `arrows`, `business`, `communication`, `design`, `development`, `device`, `document`, `editor`, `finance`, `food`, `health`, `logos`, `map`, `media`, `weather`, `user`

### Common System Icons

`add`, `close`, `check`, `search`, `settings`, `user`, `menu`, `more-horizontal`, `more-vertical`, `edit`, `delete`, `copy`, `download`, `upload`, `eye`, `eye-off`, `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`, `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`, `info`, `warning`, `error`, `success`, `heart`, `star`, `filter`, `sort`, `calendar`, `clock`, `mail`, `phone`, `link`, `external-link`

> **Naming convention:** Icon names in the `Icon` component tuple use kebab-case (e.g., `['system', 'more-horizontal']`). Named icon components use PascalCase (e.g., `MoreIcon`, `More2Icon`).

### BrandIcon

```tsx
import { BrandIcon } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brandType` | `BrandType` | required | Brand identifier (126+ brands: `'github'`, `'figma'`, `'slack'`, `'notion'`, etc.) |
| `size` | `number` | `20` | Icon size in px |
| `className` | `string` | - | Custom class |

```tsx
<BrandIcon brandType="github" size={24} />
<BrandIcon brandType="figma" />
```

### FlagIcon

```tsx
import { FlagIcon } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `country` | `CountryCode` | required | Country code (250+ countries: `'united states'`, `'south korea'`, `'japan'`, etc.) |
| `size` | `number` | `20` | Icon size in px |
| `className` | `string` | - | Custom class |

```tsx
<FlagIcon country="south korea" size={24} />
<FlagIcon country="united states" />
```

### FileIcon

```tsx
import { FileIcon } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fileType` | `'archive'` `'code'` `'default'` `'image'` `'music'` `'pdf'` `'thumbnail-1:1'` `'thumbnail-4:3'` `'video'` | required | File type |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Icon size |
| `src` | `string` | - | Image URL (for thumbnail variants) |
| `className` | `string` | - | Custom class |

```tsx
<FileIcon fileType="pdf" size="lg" />
<FileIcon fileType="thumbnail-1:1" src="/preview.jpg" />
```

### IsometricIcon

```tsx
import { IsometricIcon } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconType` | `IsometricIconType` | required | Icon identifier |
| `view` | `'top'` `'left'` | `'top'` | Viewing angle |
| `size` | `number` | - | Icon size in px |
| `fillColor` | `IsometricFillColor` | - | Fill color |
| `strokeColor` | `IsometricStrokeColor` | - | Stroke color |
| `className` | `string` | - | Custom class |

> **Note:** `IsometricIcon` is a separate component, not part of the `Icon` tuple system.

---

## Type Definitions

### IconType

```ts
type IconType = [category: string, name: string];
// e.g., ['system', 'check'], ['arrows', 'arrow-down']
```

### IconTypeWithFill

```ts
type IconTypeWithFill = IconType | [...IconType, boolean];
// e.g., ['system', 'heart', true] for filled variant
```

### ChartDataPoint

```ts
type ChartDataPoint = { [key: string]: string | number };
```

### ChartConfig

```ts
type ChartConfig = Record<string, { label: string; color: string }>;
```

### ChartAxisConfig

```ts
interface ChartAxisConfig {
  dataKey: string;
  label?: string;
  domain?: [number, number];
  tickFormatter?: (value: any) => string;
}
```

### TimeValue

```ts
interface TimeValue {
  hour: number;
  minute: number;
  second?: number;
}
```

### TimeRange

```ts
interface TimeRange {
  start?: TimeValue;
  end?: TimeValue;
}
```

### DateRange

```ts
type DateRange = { from: Date; to: Date };
// from react-day-picker
```

### QuickPreset

```ts
interface QuickPreset {
  label: string;
  getValue: () => Date | DateRange;
}
```

### Placement

```ts
type Placement = 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end';
// from @floating-ui/react
```

### EmblaOptionsType

```ts
// Embla Carousel options
interface EmblaOptionsType {
  loop?: boolean;
  align?: 'start' | 'center' | 'end';
  slidesToScroll?: number;
  dragFree?: boolean;
  // ... and more
}
```

### AccordionItemStyle

```ts
type AccordionItemStyle = 'default' | 'soft' | 'ghost' | 'line';
```

---

## Hooks

### useKeyboardShortcut

```tsx
import { useKeyboardShortcut } from '@mbisolution/blumnai-design-system';
```

Binds a global keydown listener for keyboard shortcuts.

```tsx
useKeyboardShortcut('⌘+K', () => {
  console.log('Triggered!');
}, { enabled: true, preventDefault: true });
```

| Param | Type | Description |
|-------|------|-------------|
| `shortcut` | `string \| null \| undefined` | Shortcut string (e.g., `'⌘+K'`, `'⌘+Shift+S'`, `'Ctrl+Enter'`) |
| `handler` | `() => void` | Callback when shortcut is pressed |
| `options` | `UseKeyboardShortcutOptions` | Optional configuration |

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable/disable the listener |
| `ignoreInputFields` | `boolean` | - | Skip when focus is in input/textarea |
| `preventDefault` | `boolean` | `false` | Call `e.preventDefault()` |

> **Note:** Browser-reserved shortcuts (⌘W, ⌘N, ⌘T, ⌘Q, ⌘L) cannot be overridden by JavaScript.

### useIsMobile

```tsx
import { useIsMobile } from '@mbisolution/blumnai-design-system';
```

Returns `true` when the viewport width is less than 768px. Listens to media query changes and updates reactively.

```tsx
const isMobile = useIsMobile();

if (isMobile) {
  return <Drawer>...</Drawer>;
}
return <Sheet>...</Sheet>;
```

---

## CSS Utility Classes Reference

The design system provides custom utility classes. **Do not use default Tailwind classes** for typography or spacing.

| Category | Classes | Examples |
|----------|---------|---------|
| Font size | `size-xs`, `size-sm`, `size-md`, `size-lg`, `size-xl`, `size-2xl` | `size-sm` |
| Line height | `line-height-leading-3` through `line-height-leading-10` | `line-height-leading-5` |
| Letter spacing | `letter-spacing-tracking-tighter`, `...tight`, `...normal`, `...wide` | `letter-spacing-tracking-normal` |
| Font family | `font-body`, `font-headline`, `font-quote`, `font-code` | `font-body` |
| Padding | `padding-0` through `padding-24`, `padding-x-*`, `padding-y-*` | `padding-x-12 padding-y-8` |
| Width | `width-2`, `width-8`, `width-10`, `width-14`, ..., `width-40` | `width-16` |
| Height | `height-2`, `height-8`, `height-14`, ..., `height-40` | `height-16` |
| Gap | `gap-0` through `gap-24` | `gap-8` |
| Border radius | `rounded-none`, `rounded-2xs`, `rounded-xs`, ..., `rounded-full` | `rounded-md` |
| Text color | `text-default`, `text-subtle`, `text-muted`, `text-hint` | `text-default` |
| Background | `bg-default`, `bg-subtle`, `bg-muted`, `bg-card` | `bg-subtle` |
| Border | `border-default`, `border-darker`, `border-strong` | `border-default` |

---

## Accessibility

- All interactive components built on Radix UI primitives include proper ARIA attributes automatically
- Keyboard navigation is supported: `Tab` to focus, `Enter`/`Space` to activate, `Escape` to close overlays
- Focus is automatically trapped and managed in `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, and `Popover`
- `ContextMenu` and `DropdownMenu` support full arrow-key navigation
- Screen reader support via semantic HTML and `aria-label`/`aria-describedby` where needed

---

## Style Customization

- All components accept a `className` prop for custom styling
- Theme switching via `data-theme` attribute on `<html>` or any parent element
- CSS variable overrides for colors, spacing, and typography:

```css
:root {
  --bg-default: #ffffff;
  --text-default: #27272a;
  --border-default: rgba(39, 39, 42, 0.10);
  /* ... */
}
```

---

## CSS Variables for Charts

```css
:root {
  --chart-1: #437DFC;
  --chart-2: #34D399;
  --chart-3: #FBBF24;
  --chart-4: #F87171;
  --chart-5: #A78BFA;
  --chart-6: #FB923C;
  --chart-7: #38BDF8;
  --chart-8: #E879F9;
}
```

Use in chart config: `color: 'var(--chart-1)'`

---

## SSR / React Server Components

- All components include `"use client"` directives automatically
- Components that use browser APIs (tooltips, popovers, dialogs) require a client boundary
- CSS can be imported in server components: `import '@mbisolution/blumnai-design-system/styles'`

---

## z-index Stacking

| Layer | z-index | Components |
|-------|---------|------------|
| Tooltips | 50 | `TooltipTrigger`, `AdvancedTooltip` |
| Popovers/Dropdowns | 50 | `Popover`, `DropdownMenu`, `ContextMenu`, `HoverCard` |
| Sheets/Drawers | 50 | `Sheet`, `Drawer` |
| Dialogs | 50 | `Dialog`, `AlertDialog`, `ConfirmDialog` |
| Toasts | 100 | `toast()` notifications |

---

## Responsive Behavior

Use the `useIsMobile` hook (768px breakpoint) to adapt layouts:

```tsx
import { useIsMobile } from '@mbisolution/blumnai-design-system';

function ResponsivePanel({ children }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <Drawer>{children}</Drawer>;
  }
  return <Sheet>{children}</Sheet>;
}
```

---

## Searchable Keywords

> Use this section to find components by keyword or concept.

| Keywords | Component |
|----------|-----------|
| button, click, action, submit, save, cancel, cta | `Button` |
| link, navigation, anchor, href | `LinkButton` |
| icon button, icon only, edit, delete | `ControlButton` |
| filter, toggle filter, badge count | `FilterButton` |
| avatar button, profile, account menu | `AvatarButton` |
| button group, toolbar | `ButtonGroup` |
| input, text, field, textbox, email, search | `Input` |
| password, secret, login, auth, strength | `Input variant="password"` |
| number, quantity, counter, increment | `Input variant="quantity"` |
| tags, chips, tokens, keywords | `Input variant="tags"` |
| textarea, multiline, long text, description | `Textarea` |
| select, dropdown, picker, choose | `Select` |
| combobox, autocomplete, search select, typeahead | `Combobox` |
| checkbox, check, tick, toggle, agree | `Checkbox` |
| checkbox group, checklist, multi select | `CheckboxList` |
| radio, single choice, option | `Radio` / `RadioGroup` |
| switch, toggle, on off, enable disable | `Switch` |
| form, validation, react hook form, zod | `Form` |
| dialog, modal, popup, overlay | `Dialog` |
| alert, confirm, yes no, delete confirmation | `ConfirmDialog` / `AlertDialog` |
| toast, notification, snackbar, message | `toast()` |
| tooltip, hint, help, hover | `TooltipTrigger` |
| popover, floating, click popup | `Popover` |
| sheet, side panel, slide out | `Sheet` |
| drawer, bottom sheet, mobile drawer | `Drawer` |
| tabs, tabbed, switch view, sections | `Tabs` |
| breadcrumbs, path, hierarchy, trail | `Breadcrumbs` |
| sidebar, nav, app shell | `Sidebar` |
| pagination, paging, pages | `Pagination` |
| table, data grid, sorting, filtering | `DataGrid` |
| simple table, html table | `Table` |
| avatar, profile, user image, initials | `Avatar` |
| badge, tag, label, status, indicator | `Badge` |
| chip, removable tag, token | `Chip` |
| progress, loading, bar, percentage | `Progress` |
| circular progress, spinner, ring | `ProgressCircular` |
| skeleton, loading placeholder, shimmer | `Skeleton` |
| card, container, box, panel | `Card` |
| divider, separator, line | `Divider` |
| scroll, scrollbar, overflow | `ScrollArea` |
| accordion, collapse, expand, faq | `AccordionGroup` |
| slider, range, value, track | `Slider` / `SliderRange` |
| date, calendar, date picker | `DatePicker` |
| date range, period | `DateRangePicker` |
| time, clock, hour, minute | `TimePicker` |
| time range, duration | `TimeRangePicker` |
| file, upload, drag drop, attach | `FileUpload` |
| otp, verification code, pin, 2fa | `InputOTP` |
| carousel, slideshow, gallery, swipe | `Carousel` |
| hover card, preview card, profile preview | `HoverCard` |
| context menu, right click | `ContextMenu` |
| dropdown menu, actions | `Dropdown` |
| menubar, app menu | `Menubar` |
| navigation menu, mega menu | `NavigationMenu` |
| resizable, split panels | `ResizablePanelGroup` |
| aspect ratio, image container | `AspectRatio` |
| collapsible, toggle content | `Collapsible` |
| bar chart, column chart, histogram | `BarChart` |
| line chart, trend, time series | `LineChart` |
| pie chart, distribution | `PieChart` |
| donut chart, ring chart | `DonutChart` |

---

## Subpath Imports

| Subpath | Components |
|---------|------------|
| `/avatar` | Avatar, AvatarGroup |
| `/badge` | Badge |
| `/breadcrumbs` | Breadcrumbs |
| `/button` | Button, ControlButton, FilterButton, AvatarButton, LinkButton, ButtonGroup |
| `/calendar` | Calendar, DatePicker, DateRangePicker |
| `/card` | Card, CardHeader, CardTitle, CardContent, CardFooter |
| `/carousel` | Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext |
| `/chart` | Chart, BarChart, LineChart, PieChart, DonutChart |
| `/checkbox` | Checkbox, CheckboxCard, CheckboxList |
| `/chip` | Chip |
| `/collapsible` | Collapsible, CollapsibleTrigger, CollapsibleContent |
| `/context-menu` | ContextMenu |
| `/dialog` | Dialog, AlertDialog, ConfirmDialog |
| `/divider` | Divider |
| `/drawer` | Drawer, Sheet |
| `/dropdown` | DropdownMenu |
| `/file-upload` | FileUpload, FileUploadArea, FileUploadCard |
| `/form` | Form, FormField, FormControl, FormItem, FormError |
| `/hover-card` | HoverCard, HoverCardTrigger, HoverCardContent |
| `/icons` | All icons |
| `/icons/icon` | Icon |
| `/icons/brand` | BrandIcon |
| `/icons/flag` | FlagIcon |
| `/icons/file` | FileIcon |
| `/input` | Input |
| `/input-otp` | InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator |
| `/menubar` | Menubar, MenubarMenu, MenubarTrigger, MenubarContent |
| `/navigation-menu` | NavigationMenu, NavigationMenuList, NavigationMenuItem |
| `/pagination` | Pagination |
| `/popover` | Popover, PopoverTrigger, PopoverContent |
| `/progress` | Progress, ProgressCircular |
| `/radio` | Radio, RadioGroup, RadioCard, RadioList |
| `/resizable` | ResizablePanelGroup, ResizablePanel, ResizableHandle |
| `/scroll-area` | ScrollArea |
| `/select` | Select, Combobox |
| `/sidebar` | Sidebar, SidebarContent, SidebarMenu |
| `/skeleton` | Skeleton |
| `/slider` | Slider, SliderRange, SliderInput, SliderRangeInput, DataRangeSlider |
| `/switch` | Switch, SwitchList |
| `/table` | Table, DataGrid |
| `/tabs` | Tabs, TabsList, TabsTrigger, TabsContent |
| `/textarea` | Textarea |
| `/time-picker` | TimePicker, TimeInput, TimeRangePicker, TimeRangeInput |
| `/toast` | toast |
| `/tooltip` | TooltipTrigger, AdvancedTooltip |
| `/styles` | CSS stylesheet |

---

## Theme System

4 themes via `data-theme` attribute:

| Theme | Attribute | Description |
|-------|-----------|-------------|
| Theme-A Light | (default) | Default light theme |
| Theme-A Dark | `data-theme="dark"` | Default dark theme |
| Theme-B Light | `data-theme="theme-b-light"` | Alternative light theme |
| Theme-B Dark | `data-theme="theme-b-dark"` | Alternative dark theme |

```tsx
<html data-theme="dark">{/* Dark theme */}</html>
```
