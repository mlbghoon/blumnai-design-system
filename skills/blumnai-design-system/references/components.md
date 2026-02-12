# Component Catalog & Props

> Component reference for `@mbisolution/blumnai-design-system`
> For the full authoritative reference, see [AI.md](../../AI.md).

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
| Toast | `toast()` | `toast.success("Saved!")` |
| Tooltip | `TooltipTrigger` | `<TooltipTrigger content="Help"><Button>?</Button></TooltipTrigger>` |
| Tabs | `Tabs` | `<Tabs><TabsList>...</TabsList></Tabs>` |
| Data table | `DataGrid` | `<DataGrid columns={[...]} data={[...]} />` |
| Progress bar | `Progress` | `<Progress value={50} />` |
| Date picker | `DatePicker` | `<DatePicker value={date} onChange={...} />` |
| File upload | `FileUpload` | `<FileUpload onFilesChange={...} />` |
| Avatar | `Avatar` | `<Avatar variant="userpic" src="url" alt="John" />` |
| Badge | `Badge` | `<Badge label="Active" color="green" />` |
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
| `description` | `string` | — | Description below label |
| `checked` | `boolean` | `false` | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Change callback |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `disabled` | `boolean` | `false` | Disabled state |
| `checkboxStyle` | `'default'` `'soft'` | `'default'` | Visual style |
| `position` | `'left'` `'right'` | `'left'` | Checkbox position |

### Switch

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text |
| `description` | `string` | — | Description text |
| `checked` | `boolean` | `false` | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Change callback |
| `disabled` | `boolean` | `false` | Disabled state |
| `position` | `'left'` `'right'` | `'left'` | Switch position |
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

toast.success('Saved successfully');
toast.error('Something went wrong');
toast.warning('Attention needed');
toast.info('New update available');
toast.default('Default notification');

// With options
toast.success('Saved', { duration: 5000 });
toast.info('Deleted', { label: 'Undo' });
```

Methods: `toast.default()`, `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()`, `toast.dismiss()`, `toast.dismissAll()`

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

**Avatar**: `variant` (`'initials'`|`'userpic'`|`'empty'`), `size` (`'2xs'`–`'3xl'`), `shape` (`'circular'`|`'rounded'`), `initials`, `src`, `alt`, `color`, `ring`, `status` (`'online'`|`'offline'`|`'checkmark'`|`'logo'`|`'icon'`|`'notification'`), `badgeLocation`

**AvatarGroup**: `avatars` (AvatarProps[]), `max`, `size`, `stacking` (`'last-on-top'`|`'first-on-top'`)

### Badge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Badge text |
| `variant` | `'default'` `'icon'` `'image'` `'dot'` | `'default'` | Badge type |
| `color` | `'red'` `'orange'` `'lime'` `'green'` `'cyan'` `'blue'` `'violet'` `'fuchsia'` `'pink'` `'neutral'` | `'neutral'` | Badge color |
| `size` | `'sm'` `'lg'` | `'sm'` | Badge size |
| `shape` | `'rounded'` `'pill'` | `'rounded'` | Badge shape |
| `border` | `boolean` | `false` | Show border |
| `icon` | `IconType` | — | Icon (for `variant="icon"`) |
| `image` | `string` | — | Image URL (for `variant="image"`) |
| `closeIcon` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | - | Close callback |

### Icon

```tsx
import { Icon } from '@mbisolution/blumnai-design-system';

<Icon iconType={['system', 'check']} />
<Icon iconType={['system', 'close']} size={24} />
```

Categories: `system`, `arrows`, `business`, `communication`, `design`, `development`, `device`, `document`, `editor`, `finance`, `map`, `media`, `weather`, `user`

Common icons: `add`, `close`, `check`, `search`, `settings`, `user`, `menu`, `edit`, `delete`, `copy`, `download`, `upload`, `eye`, `arrow-left`, `arrow-right`, `chevron-down`, `info`, `warning`, `heart`, `star`, `filter`, `calendar`, `clock`, `mail`, `link`

### BrandIcon

```tsx
import { BrandIcon } from '@mbisolution/blumnai-design-system/icons/brand';

<BrandIcon brandType="github" size={24} />
```

`brandType` (required), `size`, `className`. 119+ brands.

### FlagIcon

```tsx
import { FlagIcon } from '@mbisolution/blumnai-design-system/icons/flag';

<FlagIcon country="kr" size="md" />
```

`country` (ISO 3166-1 alpha-2, required), `size` (`'sm'`|`'md'`|`'lg'`). 260+ flags.

### FileIcon

```tsx
import { FileIcon } from '@mbisolution/blumnai-design-system/icons/file';

<FileIcon fileType="pdf" size="md" />
```

`fileType` (`'archive'`|`'code'`|`'default'`|`'image'`|`'music'`|`'pdf'`|`'video'`|`'thumbnail11'`|`'thumbnail43'`), `size` (`'sm'`|`'md'`|`'lg'`).

### IsometricIcon

```tsx
import { IsometricIcon } from '@mbisolution/blumnai-design-system';

<IsometricIcon iconType="check" view="top" size={64} />
```

`iconType` (required), `view` (`'top'`|`'left'`), `size`, `fillColor`, `strokeColor`. 156 icon types with top/left views.

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
| `/tooltip` | TooltipTrigger, AdvancedTooltip |
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
