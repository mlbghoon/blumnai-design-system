# Props Quick Reference

> Quick lookup table for common component props.

---

## Button

```tsx
import { Button } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonStyle` | `'primary'` `'secondary'` `'destructive'` `'ghost'` `'ghostMuted'` `'soft'` `'dashed'` | `'secondary'` | Visual style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Button size |
| `shape` | `'rectangle'` `'pill'` `'square'` `'circle'` | `'rectangle'` | Button shape |
| `fullWidth` | `boolean` | `false` | Full container width |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disabled state |
| `leadIcon` | `IconType` | - | Icon before text |
| `tailIcon` | `IconType` | - | Icon after text |
| `shortcut` | `string` | - | Keyboard shortcut badge + global keydown binding (e.g. `"/"`, `"⌘K"`, `"Ctrl+S"`) |

---

## Input

```tsx
import { Input } from '@blumnai/design-system';
```

### Common Props (all variants)

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
| `width` | `string \| number` | - | Custom width |

### variant="default"

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leadIcon` | `IconType` | - | Icon at start |
| `tailIcon` | `IconType` | - | Icon at end |
| `shortcut` | `string` | - | Keyboard shortcut badge |
| `onClear` | `() => void` | - | Clear button callback |

### variant="password"

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showToggle` | `boolean` | `true` | Show visibility toggle |
| `showStrength` | `boolean` | `false` | Show strength indicator |
| `autoCalculateStrength` | `boolean` | `false` | Auto-calculate strength |
| `strength` | `'none'` `'low'` `'medium'` `'high'` | - | Controlled strength |
| `onStrengthChange` | `(strength) => void` | - | Strength change callback |

### variant="quantity"

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `onChange` | `(value: number) => void` | - | Value change callback |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | - | Maximum value |
| `step` | `number` | `1` | Increment step |

### variant="tags"

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tags` | `string[]` | `[]` | Current tags |
| `onTagsChange` | `(tags: string[]) => void` | - | Tags change callback |
| `maxTags` | `number` | - | Maximum tags allowed |
| `delimiters` | `string[]` | `[',', 'Enter']` | Tag creation triggers |
| `allowDuplicates` | `boolean` | `false` | Allow duplicate tags |

### variant="addon"

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prefix` | `string \| ReactNode` | - | Content before input |
| `suffix` | `string \| ReactNode` | - | Content after input |

---

## Textarea

```tsx
import { Textarea } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `textareaStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `size` | `'sm'` `'lg'` | `'sm'` | Textarea size |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `rows` | `number` | `3` | Visible text rows |
| `resize` | `'none'` `'vertical'` `'horizontal'` `'both'` | `'vertical'` | Resize behavior |
| `showCount` | `boolean` | `false` | Show character count |
| `maxLength` | `number` | - | Maximum characters |
| `error` | `boolean \| string` | - | Error state/message |
| `success` | `boolean \| string` | - | Success state/message |

---

## Select

```tsx
import { Select } from '@blumnai/design-system';
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

### SelectOption

```ts
interface SelectOption {
  id: string;
  label: string;
  description?: string;
  avatar?: string;      // For variant="avatar"
  disabled?: boolean;
}
```

---

## Checkbox

```tsx
import { Checkbox } from '@blumnai/design-system';
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

---

## Switch

```tsx
import { Switch } from '@blumnai/design-system';
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

---

## RadioGroup / Radio

```tsx
import { RadioGroup, Radio } from '@blumnai/design-system';
```

### RadioGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Selected value |
| `onValueChange` | `(value: string) => void` | - | Change callback |
| `disabled` | `boolean` | `false` | Disabled state |
| `orientation` | `'horizontal'` `'vertical'` | `'vertical'` | Layout direction |

### Radio

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Radio value |
| `label` | `string` | - | Label text |
| `description` | `string` | - | Description text |
| `disabled` | `boolean` | `false` | Disabled state |

---

## Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@blumnai/design-system';
```

### Dialog (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |
| `modal` | `boolean` | `true` | Modal behavior |

### DialogContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hideCloseButton` | `boolean` | `false` | Hide X button |
| `size` | `'sm'` `'md'` `'lg'` `'xl'` `'full'` | `'md'` | Dialog size |

---

## SimpleAlertDialog

```tsx
import { SimpleAlertDialog } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |
| `title` | `string` | required | Title text |
| `description` | `string` | - | Description text |
| `confirmLabel` | `string` | `'확인'` | Confirm button text |
| `onConfirm` | `() => void` | - | Confirm callback |
| `width` | `string \| number` | - | Dialog width |

---

## ConfirmDialog

```tsx
import { ConfirmDialog } from '@blumnai/design-system';
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
| `onCancel` | `() => void` | - | Cancel callback |
| `loading` | `boolean` | `false` | Loading state |
| `confirmDisabled` | `boolean` | `false` | Disable confirm button |
| `width` | `string \| number` | - | Dialog width |

---

## Toast

```tsx
import { toast } from '@blumnai/design-system';

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

---

## Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@blumnai/design-system';
```

### Tabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled active tab |
| `defaultValue` | `string` | - | Default active tab |
| `onValueChange` | `(value: string) => void` | - | Change callback |
| `orientation` | `'horizontal'` `'vertical'` | `'horizontal'` | Layout direction |

### TabsList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'pills'` `'underline'` | `'default'` | Visual style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Tab size |

---

## DataGrid

```tsx
import { DataGrid } from '@blumnai/design-system';
import type { ColumnDef } from '@blumnai/design-system';
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

---

## Avatar

```tsx
import { Avatar, AvatarGroup } from '@blumnai/design-system';
```

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image URL |
| `name` | `string` | - | Fallback name (initials) |
| `size` | `'xs'` `'sm'` `'md'` `'lg'` `'xl'` | `'md'` | Avatar size |
| `shape` | `'circle'` `'square'` | `'circle'` | Avatar shape |

### AvatarGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatars` | `AvatarProps[]` | `[]` | Avatar items |
| `max` | `number` | `5` | Max visible avatars |
| `size` | `'xs'` `'sm'` `'md'` `'lg'` `'xl'` | `'md'` | Group size |

---

## Badge

```tsx
import { Badge } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'secondary'` `'success'` `'warning'` `'destructive'` `'outline'` | `'default'` | Visual style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Badge size |

---

## Progress

```tsx
import { Progress, ProgressCircular } from '@blumnai/design-system';
```

### Progress (Linear)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value (0-100) |
| `max` | `number` | `100` | Maximum value |
| `showValue` | `boolean` | `false` | Show percentage text |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Bar height |

### ProgressCircular

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value (0-100) |
| `size` | `number` | `40` | Circle size in px |
| `strokeWidth` | `number` | `4` | Stroke width |
| `showValue` | `boolean` | `false` | Show percentage text |

---

## Icon

```tsx
import { Icon } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconType` | `[category, name]` | required | Icon identifier |
| `size` | `number` | `20` | Icon size in px |
| `color` | `string` | `'currentColor'` | Icon color |
| `isFill` | `boolean` | `false` | Use fill variant |

### Icon Categories

`system`, `arrows`, `business`, `communication`, `design`, `development`, `device`, `document`, `editor`, `finance`, `food`, `health`, `logos`, `map`, `media`, `weather`, `user`

### Common System Icons

`add`, `close`, `check`, `search`, `settings`, `user`, `menu`, `more-horizontal`, `more-vertical`, `edit`, `delete`, `copy`, `download`, `upload`, `eye`, `eye-off`, `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`, `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`, `info`, `warning`, `error`, `success`, `heart`, `star`, `filter`, `sort`, `calendar`, `clock`, `mail`, `phone`, `link`, `external-link`

---

## Slider

```tsx
import { Slider, SliderRange, SliderInput, SliderRangeInput, DataRangeSlider, DataRangeSliderInput } from '@blumnai/design-system';
```

### Slider (Single Value)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `onChange` | `(value: number) => void` | - | Change callback |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Disabled state |
| `color` | `'default'` `'primary'` `'success'` | `'default'` | Track color |
| `showTicks` | `boolean` | `false` | Show tick marks |

### SliderRange

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `[number, number]` | `[0, 100]` | Min/max values |
| `onChange` | `(value: [number, number]) => void` | - | Change callback |
| `min` | `number` | `0` | Minimum bound |
| `max` | `number` | `100` | Maximum bound |

### SliderInput / SliderRangeInput

Includes all Slider/SliderRange props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text |
| `showInput` | `boolean` | `true` | Show numeric input |

### DataRangeSlider / DataRangeSliderInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `number[]` | required | Data distribution |
| `value` | `[number, number]` | - | Selected range |
| `onChange` | `(value: [number, number]) => void` | - | Change callback |
| `showChart` | `boolean` | `true` | Show distribution chart |

---

## TimePicker

```tsx
import { TimePicker, TimeInput, TimeRangePicker, TimeRangeInput } from '@blumnai/design-system';
```

### TimePicker

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `TimeValue` | - | `{ hour, minute, second? }` |
| `onChange` | `(value: TimeValue) => void` | - | Change callback |
| `timeFormat` | `'12h'` `'24h'` | `'24h'` | Time format |
| `showSeconds` | `boolean` | `false` | Show seconds |
| `label` | `string` | - | Label text |
| `error` | `boolean \| string` | - | Error state |
| `disabled` | `boolean` | `false` | Disabled state |
| `showQuickSelect` | `boolean` | `false` | Show quick presets |

### TimeRangePicker

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `TimeRange` | - | `{ start: TimeValue, end: TimeValue }` |
| `onChange` | `(value: TimeRange) => void` | - | Change callback |
| `timeFormat` | `'12h'` `'24h'` | `'24h'` | Time format |
| `showSeconds` | `boolean` | `false` | Show seconds |
| `showQuickSelect` | `boolean` | `false` | Show quick presets |

---

## InputOTP

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxLength` | `number` | required | Number of digits |
| `value` | `string` | - | Current OTP value |
| `onChange` | `(value: string) => void` | - | Change callback |
| `disabled` | `boolean` | `false` | Disabled state |
| `pattern` | `RegExp` | `REGEXP_ONLY_DIGITS` | Input pattern |

---

## Sheet / Drawer

```tsx
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@blumnai/design-system';
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from '@blumnai/design-system';
```

### Sheet

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |

### SheetContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top'` `'right'` `'bottom'` `'left'` | `'right'` | Slide direction |

### Drawer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |
| `shouldScaleBackground` | `boolean` | `true` | Scale background |

### DrawerContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top'` `'right'` `'bottom'` `'left'` | `'bottom'` | Drawer position |

---

## HoverCard

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `openDelay` | `number` | `700` | Delay before open (ms) |
| `closeDelay` | `number` | `300` | Delay before close (ms) |

---

## Carousel

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal'` `'vertical'` | `'horizontal'` | Scroll direction |
| `opts` | `EmblaOptionsType` | - | Embla options |

### CarouselIndicators

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'dot'` `'line'` `'number'` | `'dot'` | Indicator style |

---

## NavigationMenu

```tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Active menu item |
| `onValueChange` | `(value: string) => void` | - | Change callback |
| `orientation` | `'horizontal'` `'vertical'` | `'horizontal'` | Layout direction |

---

## AspectRatio

```tsx
import { AspectRatio } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `number` | `1` | Width/height ratio (e.g., 16/9) |

---

## FilterButton

```tsx
import { FilterButton } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | `false` | Selection state |
| `count` | `number` | - | Active filter count badge |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |

---

## AvatarButton

```tsx
import { AvatarButton } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Avatar image URL |
| `name` | `string` | - | User name (fallback initials) |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Button size |
| `showDropdown` | `boolean` | `false` | Show dropdown indicator |

---

## Hooks

### useKeyboardShortcut

```tsx
import { useKeyboardShortcut } from '@blumnai/design-system';
```

Binds a global `keydown` listener for a keyboard shortcut string. Automatically integrated into `Button` via the `shortcut` prop — use this hook directly when you need shortcut binding without a Button.

```ts
useKeyboardShortcut(
  shortcut: string | undefined | null,
  handler: () => void,
  options?: UseKeyboardShortcutOptions
): void
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable/disable the listener |
| `ignoreInputFields` | `boolean` | `true` | Skip when focus is in input/textarea/select (only for non-modifier shortcuts) |
| `preventDefault` | `boolean` | `true` | Call `preventDefault()` on matching keydown |

**Supported shortcut formats:**

| Format | Examples |
|--------|----------|
| Mac symbols | `⌘K`, `⌘⇧N`, `⌥A`, `⌃⇧P` |
| Text notation | `Ctrl+S`, `Cmd+K`, `Alt+Shift+N` |
| Single keys | `/`, `Escape`, `Enter` |

**Symbol map:** `⌘` → meta, `⇧` → shift, `⌥` → alt, `⌃` → ctrl

> **주의:** 브라우저가 예약한 단축키(`⌘W`, `⌘N`, `⌘T`, `⌘Q`, `⌘L`, `⌘⇧N`)는
> `preventDefault()`로 차단할 수 없습니다. 이 단축키들은 사용을 피하세요.

### parseShortcut

```tsx
import { parseShortcut } from '@blumnai/design-system';
```

Pure function that parses a shortcut string into a structured `ParsedShortcut` object.

```ts
interface ParsedShortcut {
  key: string;        // lowercase, e.g. 'k', '/', 'escape'
  meta: boolean;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  hasModifier: boolean;
}
```

### useIsMobile

```tsx
import { useIsMobile } from '@blumnai/design-system';
```

Returns `true` when the viewport width is less than 768px.

```tsx
const isMobile = useIsMobile();
```

---

## LinkButton

```tsx
import { LinkButton } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `linkType` | `'default'` `'muted'` `'informative'` | `'default'` | Visual style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Size |
| `label` | `string` | required | Link text |
| `href` | `string` | - | URL (renders as `<a>`) |
| `openInNewTab` | `boolean` | `false` | Open in new tab |
| `leadIcon` | `IconType \| ReactNode` | - | Icon before text |
| `tailIcon` | `IconType \| ReactNode` | - | Icon after text |
| `disabled` | `boolean` | `false` | Disabled state |
| `width` | `string \| number` | - | Custom width |

---

## ControlButton

```tsx
import { ControlButton } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonStyle` | `'default'` `'inverted'` | `'default'` | Visual style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Size |
| `shape` | `'rounded'` `'circle'` | `'rounded'` | Shape |
| `icon` | `IconType` | required | Icon to display |
| `disabled` | `boolean` | `false` | Disabled state |
| `aria-label` | `string` | required | Accessibility label |

---

## ButtonGroup

```tsx
import { ButtonGroup } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ButtonGroupItem[]` | required | Button items |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` | `'md'` | Group size |
| `className` | `string` | - | Custom class |

```ts
interface ButtonGroupItem {
  id?: string;
  label?: ReactNode;
  icon?: IconType | ReactNode;
  tailIcon?: IconType | ReactNode;
  badge?: string;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
}
```

---

## CheckboxList

```tsx
import { CheckboxList } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CheckboxListItem[]` | required | Checkbox items |
| `listStyle` | `'default'` `'bordered'` | `'default'` | List style |
| `checkboxStyle` | `'default'` `'soft'` | `'default'` | Checkbox visual style |
| `onItemChange` | `(id: string, checked: boolean) => void` | - | Change callback |

```ts
interface CheckboxListItem {
  id: string;
  title: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
}
```

---

## CheckboxCard

```tsx
import { CheckboxCard } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Card title |
| `description` | `string` | required | Card description |
| `sections` | `CheckboxCardSection[]` | - | Additional sections |
| `layout` | `'vertical'` `'horizontal'` | `'vertical'` | Card layout |
| `checked` | `boolean` | `false` | Checked state |
| `disabled` | `boolean` | `false` | Disabled state |
| `background` | `'default'` `'soft'` | `'default'` | Background style |
| `checkboxPosition` | `'left'` `'right'` | `'left'` | Checkbox position |
| `checkboxStyle` | `'default'` `'soft'` | `'default'` | Checkbox visual style |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change callback |

---

## RadioList

```tsx
import { RadioList } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `RadioListItem[]` | required | Radio items |
| `value` | `string` | - | Selected value |
| `onValueChange` | `(value: string) => void` | - | Change callback |
| `listStyle` | `'default'` `'bordered'` | `'default'` | List style |
| `radioStyle` | `RadioStyle` | `'default'` | Radio visual style |

```ts
interface RadioListItem {
  value: string;
  title: string;
  description?: string;
  disabled?: boolean;
}
```

---

## RadioCard

```tsx
import { RadioCard } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Radio value |
| `title` | `string` | required | Card title |
| `description` | `string` | - | Card description |
| `sections` | `RadioCardSection[]` | - | Additional sections |
| `layout` | `'vertical'` `'horizontal'` | `'vertical'` | Card layout |
| `disabled` | `boolean` | `false` | Disabled state |
| `background` | `'default'` `'soft'` | `'default'` | Background style |
| `radioPosition` | `'left'` `'right'` | `'left'` | Radio position |
| `radioStyle` | `RadioStyle` | `'default'` | Radio visual style |

---

## SwitchList

```tsx
import { SwitchList } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SwitchListItem[]` | required | Switch items |
| `listStyle` | `'default'` `'bordered'` | `'default'` | List style |
| `color` | `'default'` `'success'` | `'default'` | Active color |
| `onItemChange` | `(id: string, checked: boolean) => void` | - | Change callback |

```ts
interface SwitchListItem {
  id: string;
  title: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
}
```

---

## AdvancedTooltip

```tsx
import { AdvancedTooltip } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TooltipItemData[]` | required | Tooltip content items |
| `minWidth` | `number` | - | Minimum width in px |

```ts
type TooltipItemType = 'divider' | 'label' | 'item' | 'text';

interface TooltipItemData {
  type: TooltipItemType;
  label?: string;
  caption?: string;
  indicatorColor?: string;
  icon?: IconTypeWithFill;
  text?: string;
}
```

---

## DropdownMenu Sub-components

### DropdownMenuAvatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Item label |
| `avatarSrc` | `string` | - | Avatar image URL |
| `avatarAlt` | `string` | - | Avatar alt text |
| `tailIcon` | `IconType` | - | Trailing icon |
| `caption` | `string` | - | Secondary text |
| `shortcut` | `string` | - | Keyboard shortcut |
| `disabled` | `boolean` | `false` | Disabled state |
| `onClick` | `() => void` | - | Click callback |

### DropdownMenuUserbar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | User name |
| `description` | `string` | - | User description |
| `avatarSrc` | `string` | - | Avatar image URL |
| `avatarAlt` | `string` | - | Avatar alt text |
| `badge` | `string` | - | Badge text |
| `badgeColor` | `BadgeColor` | - | Badge color |

### DropdownMenuButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Button label |
| `buttonStyle` | `ButtonStyle` | - | Button visual style |
| `leadIcon` | `IconType` | - | Leading icon |
| `tailIcon` | `IconType` | - | Trailing icon |
| `disabled` | `boolean` | `false` | Disabled state |
| `onClick` | `() => void` | - | Click callback |

### DropdownMenuSearch

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Search value |
| `onChange` | `(value: string) => void` | - | Change callback |
| `placeholder` | `string` | - | Placeholder text |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |

---

## Table

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `striped` | `boolean` | `false` | Striped rows |
| `bordered` | `boolean` | `false` | Show borders |
| `stickyHeader` | `boolean` | `false` | Sticky header row |
| `isLoading` | `boolean` | `false` | Show loading state |
| `minHeight` | `string` | - | Minimum table height |
| `maxHeight` | `string` | - | Maximum table height |
| `pagination` | `boolean` | `false` | Show pagination |
| `page` | `number` | - | Current page |
| `totalPages` | `number` | - | Total pages |
| `onPageChange` | `(page: number) => void` | - | Page change callback |
| `limit` | `number` | - | Rows per page |
| `onLimitChange` | `(limit: number) => void` | - | Limit change callback |
| `showItemCount` | `boolean` | `false` | Show item count |

**TableHead** additional props: `sortable` (boolean), `sortDirection` (`'asc'` | `'desc'` | `false`)

**TableRow** additional props: `selected` (boolean)

---

## Sidebar Sub-components

### SidebarMenuItem

Discriminated union based on `variant`:

| Variant | Key Props |
|---------|-----------|
| `'default'` (or omit) | `icon`, `label`, `badge`, `shortcut`, `isActive`, `disabled` |
| `'label'` | `label`, `icon`, `action` |
| `'caption'` | `label`, `caption` |
| `'buttons'` | `icon`, `label`, `actions` |
| `'divider'` | _(no props)_ |
| `'avatar'` | `avatarSrc`, `avatarInitials`, `label`, `badge` |
| `'children'` | `label`, `nested` |

All interactive variants support: `isActive`, `disabled`, `collapsed`, `tooltip`.

---

## Menubar Sub-components

Wraps Radix Menubar. Custom menu items share the same props as `ContextMenuItem`:

`leadIcon`, `tailIcon`, `shortcut`, `caption`, `description`, `destructive`, `size`

---

## NavigationMenuListItem

```tsx
import { NavigationMenuListItem } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Item title |
| `description` | `string` | - | Item description |
| `href` | `string` | required | Link URL |
| `icon` | `IconType` | - | Item icon |
| `iconFill` | `boolean` | `false` | Use filled icon |

---

## DataGrid Cell Components

### CellText

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number \| null` | - | Display value |
| `tooltip` | `boolean \| ReactNode` | - | Tooltip on hover |
| `copyable` | `boolean` | `false` | Copy-to-clipboard on click |

### CellBadge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Badge text |
| `color` | `BadgeColor` | `'neutral'` | Badge color |

### CellAvatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Avatar image URL |
| `name` | `string` | - | User name |
| `initials` | `string` | - | Custom initials |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` | `'2xs'` | Avatar size |
| `showName` | `boolean` | `true` | Show name text |

---

## PopoverContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | - | Content width |
| `align` | `'start'` `'center'` `'end'` | `'center'` | Alignment relative to trigger |
| `side` | `'top'` `'right'` `'bottom'` `'left'` | `'bottom'` | Side relative to trigger |
| `sideOffset` | `number` | `4` | Offset from trigger in px |

---

## DialogDescription

Standard Radix `DialogDescription` component. Use inside `DialogHeader` for accessible dialog descriptions:

```tsx
<DialogHeader>
  <DialogTitle>Title</DialogTitle>
  <DialogDescription>Description text</DialogDescription>
</DialogHeader>
```

---

## Sheet Sub-components

`SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter` — standard wrapper components for structuring Sheet content. Same pattern as Dialog sub-components.

---

## Drawer Sub-components

`DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter` — standard wrapper components for structuring Drawer content. Same pattern as Dialog sub-components.

---

## Collapsible

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@blumnai/design-system';
```

Wraps Radix UI Collapsible.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |
| `defaultOpen` | `boolean` | `false` | Default open state |
| `disabled` | `boolean` | `false` | Disabled state |

---

## ResizablePanel

```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@blumnai/design-system';
```

**ResizablePanel:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultSize` | `number` | - | Default size (percentage) |
| `minSize` | `number` | - | Minimum size (percentage) |
| `maxSize` | `number` | - | Maximum size (percentage) |
| `collapsible` | `boolean` | `false` | Allow collapsing |
| `collapsedSize` | `number` | - | Size when collapsed |
| `onCollapse` | `() => void` | - | Collapse callback |
| `onExpand` | `() => void` | - | Expand callback |

---

## AccordionItemStyle

```ts
type AccordionItemStyle = 'default' | 'soft' | 'ghost' | 'line';
```

Used in `AccordionGroup` `style` prop and individual `AccordionGroupItem.style`.

---

## Divider

```tsx
import { Divider } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `DividerType` | `'default'` | Divider variant |
| `lineStyle` | `'default'` `'dashed'` | `'default'` | Line style |
| `label` | `string` | - | Text label (for text variants) |
| `icon` | `IconTypeWithFill` | - | Icon (for icon variants) |
| `buttonLabel` | `string` | - | Button text (for button variants) |
| `onButtonClick` | `() => void` | - | Button click callback |

```ts
type DividerType =
  | 'default'
  | 'text-left' | 'text-center' | 'text-right'
  | 'icon-left' | 'icon-center' | 'icon-right'
  | 'button-left' | 'button-center' | 'button-right';
```

---

## ScrollArea

```tsx
import { ScrollArea } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'vertical'` `'horizontal'` `'both'` | `'vertical'` | Scroll direction |
| `maxHeight` | `string \| number` | - | Max height |
| `maxWidth` | `string \| number` | - | Max width |

> Scrollbars auto-hide when not scrolling and appear on hover/scroll.

---

## Combobox

```tsx
import { Combobox } from '@blumnai/design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'avatar'` `'tags'` | `'default'` | Combobox type |
| `options` | `ComboboxOption[]` | `[]` | Available options |
| `value` | `string \| string[]` | - | Selected value(s) |
| `onChange` | `(value) => void` | - | Change callback |
| `onCreate` | `(value: string) => void` | - | Create new option callback |
| `placeholder` | `string` | - | Placeholder text |
| `label` | `string` | - | Label text |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean \| string` | - | Error state/message |

```ts
interface ComboboxOption {
  id: string;
  label: string;
  description?: string;
  leadIcon?: IconTypeWithFill;
  badge?: string;
  avatarSrc?: string;
  disabled?: boolean;
}
```
