# Component Catalog & Props

> Full component reference for `@mbisolution/blumnai-design-system`

## Quick Reference

| Need | Component | Example |
|------|-----------|---------|
| Clickable action | `Button` | `<Button buttonStyle="primary">Save</Button>` |
| Text input | `Input` | `<Input variant="default" label="Name" />` |
| Password input | `Input` | `<Input variant="password" showStrength />` |
| Number input | `Input` | `<Input variant="quantity" />` |
| Tags input | `Input` | `<Input variant="tags" />` |
| Multi-line text | `Textarea` | `<Textarea label="Bio" />` |
| Select one | `Select` | `<Select variant="default" options={[...]} />` |
| Select multiple | `Select` | `<Select variant="multi" options={[...]} />` |
| Searchable select | `Combobox` | `<Combobox options={[...]} />` |
| Toggle on/off | `Switch` | `<Switch label="Enabled" />` |
| Checkbox | `Checkbox` | `<Checkbox label="Agree" />` |
| Radio buttons | `RadioGroup` | `<RadioGroup><Radio value="a" label="A" /></RadioGroup>` |
| Modal dialog | `Dialog` | `<Dialog><DialogContent>...</DialogContent></Dialog>` |
| Confirmation | `ConfirmDialog` | `<ConfirmDialog title="Delete?" onConfirm={...} />` |
| Toast | `toast()` | `toast({ title: "Saved!", variant: "success" })` |
| Tooltip | `Tooltip` | `<Tooltip content="Help"><Button>?</Button></Tooltip>` |
| Tabs | `Tabs` | `<Tabs><TabsList>...</TabsList></Tabs>` |
| Data table | `DataGrid` | `<DataGrid columns={[...]} data={[...]} />` |
| Progress bar | `Progress` | `<Progress value={50} />` |
| Date picker | `DatePicker` | `<DatePicker value={date} onChange={...} />` |
| File upload | `FileUpload` | `<FileUpload onFilesChange={...} />` |
| Avatar | `Avatar` | `<Avatar src="url" name="John" />` |
| Badge | `Badge` | `<Badge variant="success">Active</Badge>` |
| Navigation link | `LinkButton` | `<LinkButton href="/page">Go</LinkButton>` |
| Icon-only button | `ControlButton` | `<ControlButton icon={['system','edit']} />` |
| Side panel | `Sheet` | `<Sheet><SheetContent>...</SheetContent></Sheet>` |
| Drawer | `Drawer` | `<Drawer><DrawerContent>...</DrawerContent></Drawer>` |
| Carousel | `Carousel` | `<Carousel><CarouselContent>...</CarouselContent></Carousel>` |
| OTP input | `InputOTP` | `<InputOTP maxLength={6} />` |

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
| `width` | `string \| number` | — | Custom width (e.g., `120`, `'200px'`) |
| `leadIcon` | `IconType` | — | Icon before text |
| `tailIcon` | `IconType` | — | Icon after text |

> **Tip:** When using `loading`, set `width` to prevent the button from shrinking (e.g., `<Button loading width={120}>Save</Button>`).

### Input

```tsx
import { Input } from '@mbisolution/blumnai-design-system';
```

**Common Props (all variants)**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'password'` `'quantity'` `'tags'` `'addon'` `'shortcut'` | `'default'` | Input type |
| `inputStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `size` | `'sm'` `'lg'` | `'sm'` | Input size |
| `label` | `string` | — | Label text |
| `placeholder` | `string` | — | Placeholder text |
| `required` | `boolean` | `false` | Required indicator |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean \| string` | — | Error state/message |
| `success` | `boolean \| string` | — | Success state/message |
| `supportText` | `string` | — | Helper text |
| `caption` | `string` | — | Description below input |

**variant="default"**: `leadIcon`, `tailIcon`, `onClear`

**variant="password"**: `showToggle`, `showStrength`, `autoCalculateStrength`, `strength`

**variant="quantity"**: `value` (number), `onChange`, `min`, `max`, `step`

**variant="tags"**: `tags` (string[]), `onTagsChange`, `maxTags`

**variant="addon"**: `prefix`, `suffix`

### Select

```tsx
import { Select } from '@mbisolution/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'multi'` `'avatar'` `'tags'` | `'default'` | Select type |
| `options` | `SelectOption[]` | `[]` | Available options |
| `value` | `string \| string[]` | — | Selected value(s) |
| `onChange` | `(value) => void` | — | Change callback |
| `placeholder` | `string` | — | Placeholder |
| `label` | `string` | — | Label text |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean \| string` | — | Error state |
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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text |
| `checked` | `boolean` | `false` | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Change callback |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `disabled` | `boolean` | `false` | Disabled state |

### Switch

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text |
| `checked` | `boolean` | `false` | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Change callback |
| `disabled` | `boolean` | `false` | Disabled state |
| `color` | `'default'` `'success'` | `'default'` | Active color |

### Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@mbisolution/blumnai-design-system';
```

**Dialog**: `open`, `onOpenChange`, `modal`

**DialogContent**: `hideCloseButton`, `size` (`'sm'` | `'md'` | `'lg'` | `'xl'` | `'full'`)

### ConfirmDialog

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Open state |
| `onOpenChange` | `(open: boolean) => void` | — | Open change |
| `title` | `string` | required | Title |
| `description` | `string` | — | Description |
| `variant` | `'default'` `'destructive'` | `'default'` | Confirm style |
| `onConfirm` | `() => void \| Promise<void>` | — | Confirm callback |

### Toast

```tsx
import { toast } from '@mbisolution/blumnai-design-system';

toast({ title: 'Saved', variant: 'success' });
toast({ title: 'Error', description: 'Details', variant: 'error' });
```

Variants: `'default'` | `'success'` | `'error'` | `'warning'` | `'info'`

### DataGrid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<T>[]` | required | Column definitions |
| `data` | `T[]` | required | Data array |
| `enableSorting` | `boolean` | `false` | Column sorting |
| `enableFiltering` | `boolean` | `false` | Column filtering |
| `enableRowSelection` | `boolean` | `false` | Row selection |
| `enablePagination` | `boolean` | `false` | Pagination |
| `pageSize` | `number` | `10` | Rows per page |

### Tabs

**Tabs**: `value`, `defaultValue`, `onValueChange`

**TabsList**: `variant` (`'default'` | `'pills'` | `'underline'`), `size` (`'sm'` | `'md'` | `'lg'`)

### Avatar

**Avatar**: `src`, `name`, `size` (`'xs'`–`'xl'`), `shape` (`'circle'` | `'square'`)

**AvatarGroup**: `avatars`, `max` (default 5), `size`

### Badge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'secondary'` `'success'` `'warning'` `'destructive'` `'outline'` | `'default'` | Visual style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Badge size |

### Icon

```tsx
import { Icon } from '@mbisolution/blumnai-design-system';

<Icon iconType={['system', 'check']} />
<Icon iconType={['system', 'close']} size={24} />
```

Categories: `system`, `arrows`, `business`, `communication`, `design`, `development`, `device`, `document`, `editor`, `finance`, `map`, `media`, `weather`, `user`

Common icons: `add`, `close`, `check`, `search`, `settings`, `user`, `menu`, `edit`, `delete`, `copy`, `download`, `upload`, `eye`, `arrow-left`, `arrow-right`, `chevron-down`, `info`, `warning`, `heart`, `star`, `filter`, `calendar`, `clock`, `mail`, `link`

## Subpath Imports

| Subpath | Components |
|---------|------------|
| `/button` | Button, ControlButton, FilterButton, AvatarButton, LinkButton, ButtonGroup |
| `/input` | Input |
| `/select` | Select, Combobox |
| `/checkbox` | Checkbox, CheckboxCard, CheckboxList |
| `/radio` | Radio, RadioGroup, RadioCard, RadioList |
| `/switch` | Switch, SwitchList |
| `/dialog` | Dialog, AlertDialog, ConfirmDialog |
| `/toast` | toast |
| `/tooltip` | Tooltip |
| `/tabs` | Tabs, TabsList, TabsTrigger, TabsContent |
| `/table` | Table, DataGrid |
| `/avatar` | Avatar, AvatarGroup |
| `/badge` | Badge |
| `/icons` | All icons |
| `/icons/icon` | Icon |
| `/calendar` | Calendar, DatePicker, DateRangePicker |
| `/slider` | Slider, SliderRange, SliderInput, DataRangeSlider |
| `/textarea` | Textarea |
| `/popover` | Popover, PopoverTrigger, PopoverContent |
| `/drawer` | Drawer, Sheet |
| `/carousel` | Carousel, CarouselContent, CarouselItem |
| `/progress` | Progress, ProgressCircular |
| `/form` | Form, FormField, FormControl |
| `/file-upload` | FileUpload |
| `/input-otp` | InputOTP |
| `/styles` | CSS stylesheet |
