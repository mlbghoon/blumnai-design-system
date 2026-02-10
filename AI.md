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
| Toast notification | `toast()` | `toast({ title: "Saved!", variant: "success" })` |
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
| `Tooltip` | Hover help text |
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
| `Badge` | Status indicator |
| `Chip` | Removable tag |
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

### RadioGroup / Radio

```tsx
import { RadioGroup, Radio } from '@mbisolution/blumnai-design-system';
```

**RadioGroup**: `value`, `onValueChange`, `disabled`, `orientation` (`'horizontal'`|`'vertical'`)

**Radio**: `value` (required), `label`, `description`, `disabled`

### Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@mbisolution/blumnai-design-system';
```

**Dialog**: `open`, `onOpenChange`, `modal`

**DialogContent**: `hideCloseButton`, `size` (`'sm'`|`'md'`|`'lg'`|`'xl'`|`'full'`)

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

toast({ title: 'Saved', variant: 'success' });
toast({ title: 'Error', description: 'Something failed', variant: 'error' });
toast({ title: 'Deleted', action: { label: 'Undo', onClick: () => {} } });
```

Variants: `'default'` | `'success'` | `'error'` | `'warning'` | `'info'`

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@mbisolution/blumnai-design-system';
```

**Tabs**: `value`, `defaultValue`, `onValueChange`, `orientation`

**TabsList**: `variant` (`'default'`|`'pills'`|`'underline'`), `size` (`'sm'`|`'md'`|`'lg'`)

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

**Avatar**: `src`, `name`, `size` (`'xs'`-`'xl'`), `shape` (`'circle'`|`'square'`)

**AvatarGroup**: `avatars`, `max` (default 5), `size`

### Badge

```tsx
import { Badge } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'secondary'` `'success'` `'warning'` `'destructive'` `'outline'` | `'default'` | Visual style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Badge size |

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
import { Sheet, SheetContent } from '@mbisolution/blumnai-design-system';
import { Drawer, DrawerContent } from '@mbisolution/blumnai-design-system';
```

**Sheet**: `open`, `onOpenChange`. **SheetContent**: `side` (`'top'`|`'right'`|`'bottom'`|`'left'`)

**Drawer**: `open`, `onOpenChange`. **DrawerContent**: `position` (`'top'`|`'right'`|`'bottom'`|`'left'`)

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
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@mbisolution/blumnai-design-system';
```

`value`, `onValueChange`, `orientation` (`'horizontal'`|`'vertical'`)

### AspectRatio

```tsx
import { AspectRatio } from '@mbisolution/blumnai-design-system';
```

`ratio` (number, e.g. `16/9`, default `1`)

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

toast({ title: '저장되었습니다', variant: 'success' });
toast({ title: '오류가 발생했습니다', variant: 'error' });
toast({ title: '주의가 필요합니다', variant: 'warning' });
toast({ title: '알림', description: '새로운 메시지가 있습니다', variant: 'info' });
toast({ title: '삭제됨', action: { label: '실행취소', onClick: () => console.log('Undo') } });
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
      accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
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
| tooltip, hint, help, hover | `Tooltip` |
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
| `/tooltip` | Tooltip |
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
