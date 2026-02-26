# Blumnai Design System — AI & Developer Reference

> Complete component reference for AI agents and developers.
> Package: `@mlbghoon/blumnai-design-system`
>
> **This is the single source of truth.** Search for `### ComponentName` to jump to any component's props.

### Section Index

| Section | What's there |
|---------|-------------|
| **Setup & Imports** | Install, CSS import, peer deps, ref forwarding |
| **Quick Reference Table** | "I need X" → component + one-liner |
| **Component Categories** | Grouped lists (forms, buttons, feedback, nav, data, layout, charts) |
| **Decision Guide** | Flowcharts: which component for text input / selection / button / feedback |
| **Props Reference** | Every component's full props table (search `### ComponentName`) |
| **Common Patterns** | Copy-paste code: forms, dialogs, toasts, DataGrid, sidebar layout, async patterns |
| **Icons** | Icon, BrandIcon, FlagIcon, FileIcon, IsometricIcon usage |
| **Type Definitions** | Shared types (IconType, IsometricIcon types, ChartConfig, TimeValue, etc.) |
| **Hooks** | useKeyboardShortcut, useIsMobile, useSidebar |
| **CSS Utilities** | Spacing, font-size, line-height, letter-spacing px values |
| **Accessibility & SSR** | A11y notes, SSR, z-index, responsive |
| **Keywords → Component** | Search by keyword to find the right component |
| **Subpath Imports** | Tree-shakeable import paths |
| **Theme System** | 4 themes via `data-theme` attribute + runtime switching |

---

## Setup

```bash
npm install @mlbghoon/blumnai-design-system --legacy-peer-deps
```

```tsx
// 1. Import CSS once in app entry
import '@mlbghoon/blumnai-design-system/styles';

// 2. Import components
import { Button, Input, Select } from '@mlbghoon/blumnai-design-system';

// Or use subpath imports for faster builds
import { Button } from '@mlbghoon/blumnai-design-system/button';
import { Input } from '@mlbghoon/blumnai-design-system/input';
```

**Peer Dependencies:**
- **Required:** `react` ^18/^19, `react-dom` ^18/^19
- **Optional** (for Form components): `react-hook-form`, `@hookform/resolvers`, `zod`
- **Bundled** (no action needed): `date-fns`, `sonner`

**Ref forwarding:** All interactive components (Button, Input, Select, Checkbox, Switch, etc.) forward refs via `React.forwardRef`. Safe to use with `react-hook-form`, `framer-motion`, and other ref-based libraries.

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
| Select multiple | `Select` | `<Select variant="multi-select" options={[...]} />` |
| Searchable select | `Combobox` | `<Combobox options={[...]} />` |
| Yes/No toggle | `Switch` | `<Switch label="Enabled" />` |
| Checkbox | `Checkbox` | `<Checkbox label="Agree" />` |
| Radio buttons | `RadioGroup` | `<RadioGroup><Radio value="a" label="A" /></RadioGroup>` |
| Form with validation | `Form` | See Form patterns below |
| Modal dialog | `Dialog` | `<Dialog><DialogContent>...</DialogContent></Dialog>` |
| Confirmation popup | `AlertDialog` | `<AlertDialog title="Sure?" onConfirm={...} />` |
| Simple confirm/cancel | `ConfirmDialog` | `<ConfirmDialog title="Delete?" onConfirm={...} />` |
| Info/callout box | `InfoBox` | `<InfoBox variant="info" title="Note">Message</InfoBox>` |
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
| File upload | `FileUploadArea` | `<FileUploadArea onFilesSelected={...} />` |
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
| Dropdown search | `DropdownMenuSearch` | `<DropdownMenuSearch placeholder="검색..." />` |
| Dropdown user bar | `DropdownMenuUserbar` | `<DropdownMenuUserbar name="홍길동" avatarSrc="/img.jpg" />` |
| Dropdown avatar item | `DropdownMenuAvatar` | `<DropdownMenuAvatar label="프로필" avatarSrc="/img.jpg" />` |
| Dropdown button | `DropdownMenuButton` | `<DropdownMenuButton label="로그아웃" onClick={...} />` |
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
| Cursor icon | `CursorIcon` | `<CursorIcon cursorType="pointer" />` |
| Drag and drop | `DndContext`, `Draggable`, `Droppable`, `Sortable` | See DnD section |

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
| `Select variant="multi-select"` | Multiple selection |
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
| `FileUploadArea` / `FileUploadCard` | File drag & drop upload |
| `InputOTP` | One-time password input |

#### Buttons

| Component | Use Case |
|-----------|----------|
| `Button` | Primary actions (submit, save, etc.) |
| `LinkButton` | Navigation styled as text link |
| `ControlButton` | Icon-only actions (edit, delete) |
| `FilterButton` | Filter toggles with selection state |
| `AvatarButton` | User profile button with avatar |
| `ButtonGroup` | Group of related buttons |

#### Feedback & Overlays

| Component | Use Case |
|-----------|----------|
| `Dialog` | Modal for complex content |
| `AlertDialog` | Confirmation with icon and actions |
| `ConfirmDialog` | Simple yes/no confirmation |
| `InfoBox` | Static inline info/callout box |
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

#### Icons

| Component | Use Case |
|-----------|----------|
| `Icon` | UI icons (system, arrows, etc.) |
| `BrandIcon` | Brand/logo icons |
| `FlagIcon` | Country flag icons |
| `FileIcon` | File type icons |
| `IsometricIcon` | 3D isometric icons |
| `CursorIcon` | Cursor/pointer icons |

#### Interaction

| Component | Use Case |
|-----------|----------|
| `DndContext` / `Draggable` / `Droppable` | Drag and drop |
| `Sortable` / `SortableItem` | Reorderable lists |
| `DragHandle` / `DragOverlay` | DnD utilities |

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
│   └── Many options? → Select variant="multi-select"
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
import { Button } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonStyle` | `'primary'` `'secondary'` `'destructive'` `'ghost'` `'ghostMuted'` `'soft'` `'dashed'` | `'primary'` | Visual style |
| `variant` | `'default'` `'iconOnly'` | `'default'` | Button variant (`'iconOnly'` hides text, shows only icon) |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` | `'md'` | Button size |
| `shape` | `'rounded'` `'pill'` | `'rounded'` | Button shape |
| `type` | `'button'` `'submit'` `'reset'` | `'button'` | HTML button type |
| `fullWidth` | `boolean` | `false` | Full container width |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disabled state |
| `width` | `string \| number` | - | Custom width (e.g., `120`, `'200px'`) |
| `leadIcon` | `IconTypeWithFill \| ReactNode` | - | Icon before text |
| `tailIcon` | `IconTypeWithFill \| ReactNode` | - | Icon after text |
| `shortcut` | `string` | - | Keyboard shortcut badge (e.g., `'⌘K'`) |
| `colorOverride` | `ButtonColor` | - | Override button color hue (18 colors: `'gray'` `'red'` `'orange'` `'amber'` `'yellow'` `'lime'` `'green'` `'emerald'` `'teal'` `'cyan'` `'sky'` `'blue'` `'indigo'` `'violet'` `'purple'` `'fuchsia'` `'pink'` `'rose'`) |
| `asChild` | `boolean` | `false` | Render as child element (Radix Slot) |

> **Tip:** When using `loading`, always set `width` to prevent the button from shrinking when the label is replaced by a spinner.
> ```tsx
> <Button loading={isSaving} width={120}>Save</Button>
> ```

### LinkButton

```tsx
import { LinkButton } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `linkType` | `'default'` `'muted'` `'informative'` | `'default'` | Link style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Button size |
| `label` | `string` | required | Button label text |
| `href` | `string` | - | URL (renders as `<a>` when provided) |
| `openInNewTab` | `boolean` | `false` | Open in new tab (`target="_blank"`) |
| `leadIcon` | `IconTypeWithFill \| ReactNode` | - | Icon before label |
| `tailIcon` | `IconTypeWithFill \| ReactNode` | `['system', 'external-link']` | Icon after label |
| `disabled` | `boolean` | `false` | Disabled state |
| `asChild` | `boolean` | `false` | Render as child element (Radix Slot) |
| `width` | `string \| number` | - | Custom width |

### ControlButton

```tsx
import { ControlButton } from '@mlbghoon/blumnai-design-system';
```

Icon-only button. `aria-label` is required.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonStyle` | `'default'` `'inverted'` | `'default'` | Visual style |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Button size (icon: sm=14px, md/lg=16px) |
| `shape` | `'rounded'` `'circle'` | `'rounded'` | Button shape |
| `icon` | `IconType` | required | Icon to display |
| `disabled` | `boolean` | `false` | Disabled state |
| `asChild` | `boolean` | `false` | Render as child element (Radix Slot) |
| `aria-label` | `string` | required | Accessibility label |

### ButtonGroup

```tsx
import { ButtonGroup } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ButtonGroupItem[]` | required | Array of button items |
| `size` | `'2xs'` `'xs'` `'sm'` `'md'` `'lg'` | `'md'` | Group size |

**ButtonGroupItem** (discriminated union):
- **Common**: `{ id?, icon?, tailIcon?, disabled?, onClick? }`
- **Regular**: `{ label?, badge?, ariaLabel? }`
- **Icon-only**: `{ icon, ariaLabel }` — `label` not allowed



### Input

```tsx
import { Input } from '@mlbghoon/blumnai-design-system';
```

#### Common Props (all variants)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'password'` `'quantity'` `'quantity-2'` `'tags'` `'inline-tags'` `'addon'` `'inline-addon'` `'shortcut'` `'lead-button'` `'tail-button'` `'lead-dropdown'` `'tail-dropdown'` | `'default'` | Input type |
| `inputStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `size` | `'xs'` `'sm'` `'lg'` | `'sm'` | Input size (xs=28px, sm=32px, lg=36px) |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `required` | `boolean` | `false` | Show required indicator |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean \| string` | - | Error state/message |
| `success` | `boolean \| string` | - | Success state/message |
| `supportText` | `string` | - | Helper text next to label |
| `caption` | `string` | - | Description below input |
| `width` | `string \| number` | - | Container width |
| `showCount` | `boolean` | `false` | Show character count (use with `maxLength`) |

#### variant="default"

| Prop | Type | Description |
|------|------|-------------|
| `leadIcon` | `IconTypeWithFill` | Icon at start |
| `tailIcon` | `IconTypeWithFill` | Icon at end |
| `shortcut` | `string` | Keyboard shortcut badge |
| `onClear` | `() => void` | Clear button callback |

#### variant="shortcut"

| Prop | Type | Description |
|------|------|-------------|
| `leadIcon` | `IconTypeWithFill` | Icon at start |
| `shortcut` | `string` | Keyboard shortcut (required) |

#### variant="password"

| Prop | Type | Description |
|------|------|-------------|
| `leadIcon` | `IconTypeWithFill` | Icon at start |
| `showToggle` | `boolean` | Show visibility toggle (default `true`) |
| `showStrength` | `boolean` | Show strength indicator |
| `autoCalculateStrength` | `boolean` | Auto-calculate strength |
| `strength` | `'none'` `'low'` `'medium'` `'high'` | Controlled strength |
| `onStrengthChange` | `(strength: PasswordStrength) => void` | Strength change callback |

#### variant="quantity" / variant="quantity-2"

`quantity` has +/- buttons on right side. `quantity-2` has - on left, + on right.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number` | Current value (default `0`) |
| `onChange` | `(value: number) => void` | Value change callback |
| `min` | `number` | Minimum value (default `0`) |
| `max` | `number` | Maximum value |
| `step` | `number` | Step increment (default `1`) |

#### variant="tags" / variant="inline-tags"

`tags` renders tags above input. `inline-tags` renders tags inline with input.

| Prop | Type | Description |
|------|------|-------------|
| `leadIcon` | `IconTypeWithFill` | Icon at start |
| `tags` | `string[]` | Current tags |
| `onTagsChange` | `(tags: string[]) => void` | Tags change callback |
| `onTagAdd` | `(tag: string) => void` | Single tag add callback |
| `onTagRemove` | `(tag: string) => void` | Single tag remove callback |
| `maxTags` | `number` | Maximum tags allowed |
| `value` | `string` | Current input text value |
| `onInputChange` | `(value: string) => void` | Input text change callback |
| `delimiters` | `string[]` | Tag creation delimiters (default `[',', 'Enter']`) |
| `allowDuplicates` | `boolean` | Allow duplicate tags (default `false`) |
| `removable` | `boolean` | Tags can be removed (default `true`) |

#### variant="addon" / variant="inline-addon"

`addon` shows prefix/suffix as separate sections. `inline-addon` shows them inline.

| Prop | Type | Description |
|------|------|-------------|
| `leadIcon` | `IconTypeWithFill` | Icon at start |
| `tailIcon` | `IconTypeWithFill` | Icon at end |
| `prefix` | `string \| ReactNode` | Content before input |
| `suffix` | `string \| ReactNode` | Content after input |
| `onClear` | `() => void` | Clear button callback |

#### variant="lead-button" / variant="tail-button"

Input with an attached button on the leading or trailing side.

| Prop | Type | Description |
|------|------|-------------|
| `leadIcon` | `IconTypeWithFill` | Icon at start (tail-button only) |
| `tailIcon` | `IconTypeWithFill` | Icon at end (lead-button only) |
| `onClear` | `() => void` | Clear button callback |
| `buttonLabel` | `string` | Button text |
| `buttonLeadIcon` | `IconTypeWithFill` | Button leading icon |
| `buttonTailIcon` | `IconTypeWithFill` | Button trailing icon |
| `onButtonClick` | `() => void` | Button click callback |
| `buttonDisabled` | `boolean` | Button disabled state |

#### variant="lead-dropdown" / variant="tail-dropdown"

Input with an attached dropdown select on the leading or trailing side.

| Prop | Type | Description |
|------|------|-------------|
| `leadIcon` | `IconTypeWithFill` | Icon at start (tail-dropdown only) |
| `tailIcon` | `IconTypeWithFill` | Icon at end (lead-dropdown only) |
| `onClear` | `() => void` | Clear button callback |
| `dropdownOptions` | `DropdownOption[]` | Dropdown options (required) |
| `dropdownValue` | `string` | Selected dropdown value |
| `onDropdownChange` | `(value: string) => void` | Dropdown change callback |
| `dropdownPlaceholder` | `string` | Dropdown placeholder (default `'Select'`) |

### Textarea

```tsx
import { Textarea } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `textareaStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `size` | `'sm'` `'lg'` | `'sm'` | Textarea size |
| `label` | `string` | - | Label text |
| `required` | `boolean` | `false` | Show required indicator |
| `supportText` | `string` | - | Helper text next to label |
| `caption` | `string` | - | Description below textarea |
| `error` | `boolean \| string` | - | Error state/message |
| `success` | `boolean \| string` | - | Success state/message |
| `width` | `string \| number` | - | Container width |
| `disabled` | `boolean` | `false` | Disabled state |
| `minRows` | `number` | `3` | Minimum visible text rows |
| `maxRows` | `number` | - | Maximum visible text rows |
| `resize` | `'none'` `'vertical'` `'horizontal'` `'both'` | `'vertical'` | Resize behavior |
| `showCount` | `boolean` | `false` | Show character count |
| `maxLength` | `number` | - | Maximum characters |
| `showToolbar` | `boolean` | `false` | Show toolbar below textarea |
| `toolbarActions` | `TextareaToolbarAction[]` | - | Custom toolbar actions (left side) |
| `onAttach` | `() => void` | - | Attach button callback (shows paperclip icon) |
| `onSubmit` | `() => void` | - | Submit button callback (shows send icon) |
| `submitDisabled` | `boolean` | `false` | Disable submit button |
| `onVoiceInput` | `() => void` | - | Voice input callback (shows mic icon) |
| `toolbarTrailing` | `ReactNode` | - | Custom content in toolbar right side |
| `fieldSizing` | `'content'` `'fixed'` | `'fixed'` | CSS field-sizing: `'content'` auto-adjusts height to content (Chrome 123+) |

**TextareaToolbarAction**: `{ key, icon?, label?, onClick?, disabled? }`

### Select

```tsx
import { Select } from '@mlbghoon/blumnai-design-system';
```

#### Common Props (all variants)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'multi-select'` `'avatar'` `'tags'` | `'default'` | Select type |
| `selectStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `size` | `'sm'` `'lg'` | `'sm'` | Select size |
| `options` | `SelectOption[]` | required | Available options |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `required` | `boolean` | `false` | Show required indicator |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean \| string` | - | Error state/message |
| `success` | `boolean \| string` | - | Success state/message |
| `supportText` | `string` | - | Helper text next to label |
| `caption` | `string` | - | Description below select |
| `width` | `string \| number` | - | Container width |
| `leadIcon` | `IconTypeWithFill` | - | Icon before text |
| `searchable` | `boolean` | `false` | Enable search filtering |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `noResultsText` | `string` | `'No results found'` | Text when no search results |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state callback |
| `maxHeight` | `number \| string` | `300` | Dropdown max height |
| `renderOption` | `(option: SelectOption, isSelected: boolean) => ReactNode` | - | Custom option rendering |
| `minWidth` | `string \| number` | - | Minimum width of select trigger |
| `clearable` | `boolean` | `false` | Show clear button when value is selected |
| `loading` | `boolean` | `false` | Show loading spinner in dropdown |
| `optionGroups` | `SelectOptionGroup[]` | - | Group options by label (each group: `{ label, optionIds: string[] }`) |

#### variant="default"

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Selected option ID |
| `defaultValue` | `string` | Initial value (uncontrolled mode) |
| `onChange` | `(value: string) => void` | Change callback |
| `selectType` | `'default'` `'checkbox'` `'radio'` | Selection indicator style (default `'default'`) |

#### variant="avatar"

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Selected option ID |
| `onChange` | `(value: string) => void` | Change callback |
| `defaultValue` | `string` | Initial value (uncontrolled mode) |

#### variant="multi-select"

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string[]` | Selected option IDs |
| `onChange` | `(value: string[]) => void` | Change callback |
| `maxSelections` | `number` | Maximum selections allowed |
| `selectedText` | `string \| ((count: number) => string)` | Display text for selected count |
| `showSelectAll` | `boolean` | Show "Select All" option (ignored when `maxSelections` set) |
| `selectAllLabel` | `string` | "Select All" label text (default `'전체 선택'`) |

#### variant="tags"

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string[]` | Selected option IDs |
| `onChange` | `(value: string[]) => void` | Change callback |
| `maxSelections` | `number` | Maximum selections allowed |
| `maxVisibleTags` | `number` | Max visible tags before overflow |
| `overflowText` | `string \| ((hiddenCount, totalCount) => string)` | Overflow indicator text |

```ts
interface SelectOption {
  id: string;
  label: string;
  description?: string;
  leadIcon?: IconTypeWithFill;
  iconColor?: IconColor;
  badge?: string;
  avatarSrc?: string;
  disabled?: boolean;
}
```

### Combobox

```tsx
import { Combobox } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'avatar'` `'tags'` | `'default'` | Combobox type |
| `options` | `ComboboxOption[]` | `[]` | Available options |
| `value` | `string \| string[]` | - | Selected value(s) — `string[]` for tags variant |
| `onChange` | `(value) => void` | - | Change callback — `string` for default/avatar, `string[]` for tags |
| `selectStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `size` | `'sm'` `'lg'` | `'sm'` | Size |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `required` | `boolean` | `false` | Required state |
| `disabled` | `boolean` | `false` | Disabled state |
| `supportText` | `string` | - | Support text below |
| `caption` | `string` | - | Caption text |
| `error` | `boolean \| string` | - | Error state/message |
| `success` | `boolean \| string` | - | Success state/message |
| `width` | `string \| number` | - | Custom width |
| `emptyStateTitle` | `string` | `'No search results'` | Empty state heading when search matches nothing |
| `emptyStateDescription` | `string` | `'Your search did not match any results.'` | Empty state body text |
| `creatable` | `boolean` | `false` | Allow creating new options |
| `createText` | `string \| ((value: string) => string)` | - | Create option text |
| `onCreate` | `(value: string) => void` | - | Callback when new option is created |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state callback |
| `maxHeight` | `number \| string` | - | Dropdown max height |

Tags variant adds: `maxSelections` (number), `maxVisibleTags` (number), `overflowText` (string)

```ts
interface ComboboxOption {
  id: string;
  label: string;
  description?: string;
  leadIcon?: IconTypeWithFill;
  iconColor?: IconColor;
  badge?: string;
  avatarSrc?: string;
  disabled?: boolean;
}
```

### Checkbox

```tsx
import { Checkbox } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | - | Label text |
| `description` | `ReactNode` | - | Description below label |
| `checked` | `boolean \| 'indeterminate'` | `false` | Checked state |
| `onCheckedChange` | `(checked: boolean \| 'indeterminate') => void` | - | Change callback |
| `disabled` | `boolean` | `false` | Disabled state |
| `checkboxStyle` | `'default'` `'with-shadow'` | `'default'` | Visual style |
| `checkboxPosition` | `'left'` `'right'` `'off'` | `'left'` | Checkbox position |
| `size` | `'sm'` `'md'` `'lg'` | `'sm'` | Checkbox size (sm=16px, md=20px, lg=24px) |
| `shape` | `'square'` `'round'` | `'square'` | Checkbox shape |

### CheckboxList

```tsx
import { CheckboxList } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CheckboxListItem[]` | required | Checkbox items |
| `listStyle` | `'default'` `'bordered'` | `'default'` | List style |
| `checkboxStyle` | `'default'` `'with-shadow'` | `'with-shadow'` | Checkbox style |
| `name` | `string` | - | Form field name (applied to all checkboxes) |
| `onItemChange` | `(id: string, checked: boolean) => void` | - | Change handler |

**CheckboxListItem**: `{ id, title, description?, checked?, disabled?, value? }`

### CheckboxCard

```tsx
import { CheckboxCard } from '@mlbghoon/blumnai-design-system';
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
| `name` | `string` | - | Form field name |
| `value` | `string` | - | Form field value |

### Switch

```tsx
import { Switch } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | - | Label text |
| `description` | `ReactNode` | - | Description text |
| `checked` | `boolean` | `false` | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change callback |
| `disabled` | `boolean` | `false` | Disabled state |
| `switchPosition` | `'left'` `'right'` | `'left'` | Switch position |
| `color` | `'green'` `'blue'` `'red'` `'orange'` `'violet'` `'cyan'` `'pink'` | `'green'` | Active color |
| `size` | `'sm'` `'md'` `'lg'` | `'sm'` | Switch size (sm=32×20, md=40×24, lg=48×28) |
| `loading` | `boolean` | `false` | Show loading spinner and disable interaction |

### SwitchList

```tsx
import { SwitchList } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SwitchListItem[]` | required | Switch items |
| `listStyle` | `'default'` `'bordered'` | `'default'` | List style |
| `color` | `'green'` `'blue'` `'red'` `'orange'` `'violet'` `'cyan'` `'pink'` | `'green'` | Switch color |
| `onItemChange` | `(id: string, checked: boolean) => void` | - | Change handler |
| `showToggleAll` | `boolean` | `false` | Show "Toggle All" switch at top of list |
| `toggleAllLabel` | `string` | `'전체 토글'` | "Toggle All" label text |
| `onToggleAll` | `(checked: boolean) => void` | - | Toggle all state change handler |

**SwitchListItem**: `{ id, title, description?, checked?, disabled? }`

### RadioGroup / Radio

```tsx
import { RadioGroup, Radio } from '@mlbghoon/blumnai-design-system';
```

**RadioGroup**: `value`, `onValueChange`, `disabled`, `orientation` (`'horizontal'`|`'vertical'`)

**Radio**: `value` (required string), `label?` (ReactNode), `description?` (ReactNode), `disabled?`, `radioPosition?` (`'left'`|`'right'`|`'off'`, default `'left'`), `radioStyle?` (`'default'`|`'with-shadow'`, default `'default'`)

### RadioList

```tsx
import { RadioList } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `RadioListItem[]` | required | Radio items |
| `value` | `string` | - | Selected value |
| `defaultValue` | `string` | - | Initial value (uncontrolled mode) |
| `onValueChange` | `(value: string) => void` | - | Value change handler |
| `listStyle` | `'default'` `'bordered'` | `'default'` | List style |
| `radioStyle` | `'default'` `'with-shadow'` | `'with-shadow'` | Radio style |
| `disabled` | `boolean` | `false` | Disable all radio items |

**RadioListItem**: `{ value, title, description?, disabled? }`

### RadioCard

```tsx
import { RadioCard } from '@mlbghoon/blumnai-design-system';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogScrollArea, DialogAction, DialogClose, DialogTrigger } from '@mlbghoon/blumnai-design-system';
```

**Dialog**: `open`, `onOpenChange`, `defaultOpen`, `modal`

**DialogContent**: `hideCloseButton`, `disableEscapeClose`, `disableOutsideClose`, `width` (string|number), `fullScreen` (boolean — full viewport modal)

**DialogHeader**, **DialogFooter**: Layout wrappers (`HTMLAttributes<HTMLDivElement>`)

**DialogTitle**, **DialogDescription**: Radix Dialog primitives for accessibility

**DialogScrollArea**: `maxHeight` (string|number) — Scrollable content area

**DialogAction**: `onAction` (`() => void | Promise<void>` — closes dialog after promise resolves), `asChild` (boolean)

**DialogClose**: Radix Dialog.Close primitive (closes the dialog when clicked)

**DialogTrigger**: Radix Dialog.Trigger primitive (`asChild` supported)

### ConfirmDialog

```tsx
import { ConfirmDialog } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |
| `title` | `string` | required | Title text |
| `description` | `ReactNode` | - | Description (supports styled text) |
| `variant` | `'default'` `'destructive'` | `'default'` | Confirm button style |
| `confirmLabel` | `string` | `'확인'` | Confirm button text |
| `cancelLabel` | `string` | `'취소'` | Cancel button text |
| `onConfirm` | `() => void \| Promise<void>` | - | Confirm callback |
| `onCancel` | `() => void` | - | Cancel callback |
| `loading` | `boolean` | `false` | Loading state |
| `confirmDisabled` | `boolean` | `false` | Disable confirm button |
| `width` | `string \| number` | - | Custom width |

### AlertDialog

```tsx
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, AlertDialogScrollArea } from '@mlbghoon/blumnai-design-system';
```

**Simple usage (SimpleAlertDialog):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |
| `title` | `string` | required | Title text |
| `description` | `string` | - | Description text |
| `confirmLabel` | `string` | `'확인'` | Confirm button text |
| `onConfirm` | `() => void` | - | Confirm callback |
| `width` | `string \| number` | - | Custom width |

**Compound parts:**

**AlertDialogContent**: extends Radix AlertDialog.Content + `width` (string|number)

**AlertDialogScrollArea**: `maxHeight` (string|number) — Scrollable content area

**AlertDialogHeader**, **AlertDialogFooter**: Layout wrappers (`HTMLAttributes<HTMLDivElement>`)

**AlertDialogTitle**, **AlertDialogDescription**: Radix AlertDialog primitives for accessibility

**AlertDialogAction**, **AlertDialogCancel**: Radix AlertDialog primitives + `asChild`

### InfoBox

```tsx
import { InfoBox } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'info'` `'success'` `'warning'` `'error'` | `'default'` | Color variant |
| `icon` | `IconType` | Per-variant default | Override default icon |
| `visible` | `boolean` | `true` | Show/hide |
| `title` | `ReactNode` | - | Optional title |
| `closable` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | - | Close callback |
| `children` | `ReactNode` | required | Body content |

```tsx
<InfoBox variant="info" title="안내">메시지 내용</InfoBox>
<InfoBox variant="warning" closable onClose={() => {}}>경고 메시지</InfoBox>
<InfoBox variant="error">에러 상세 내용</InfoBox>
```

> ARIA: `role="status"` for default/info/success, `role="alert"` for warning/error. Uses same color palette as Toast.

### Toast

```tsx
import { toast } from '@mlbghoon/blumnai-design-system';

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
| `label` | `string` | Action label text (display-only) |
| `action` | `{ label: string; onClick: () => void }` | Action button with click callback |
| `onDismiss` | `() => void` | Called when user manually dismisses toast |
| `onAutoClose` | `() => void` | Called when toast auto-closes after duration |

**BlumnaiToaster** (required — add once in root layout):

```tsx
import { BlumnaiToaster } from '@mlbghoon/blumnai-design-system';

// In your root layout (e.g., App.tsx or layout.tsx):
<BlumnaiToaster />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visibleToasts` | `number` | `3` | Max simultaneous toasts |
| `position` | `string` | `'bottom-right'` | Toast position |

> Extends sonner `Toaster` props (except `toastOptions`). `sonner` is bundled — no separate install needed.

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@mlbghoon/blumnai-design-system';
```

**Tabs**: `value`, `defaultValue`, `onValueChange`, `orientation`

**TabsList**: `variant` (`'pill'`|`'segmented'`|`'underline'`), `shape` (`'pill'`|`'rounded'`), `size` (`'sm'`|`'lg'`), `type` (`'default'`|`'fixed'`), `scrollable` (boolean, default `false`)

**TabsTrigger**: `leadIcon` (`IconTypeWithFill | ReactNode`), `tailIcon` (`IconTypeWithFill | ReactNode`), `badge` (`string | number`), `closable` (boolean, default `false`), `onClose` (`(value: string) => void`)

**TabsContent**: `animated` (boolean, default `false`)

### Table

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, TableCaption } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `striped` | `boolean` | - | Striped row style |
| `bordered` | `boolean` | - | Show border |
| `stickyHeader` | `boolean` | - | Sticky header on scroll |
| `minHeight` | `string` | - | Container min height |
| `maxHeight` | `string` | - | Container max height (enables scroll) |
| `isLoading` | `boolean` | - | Loading state |
| `pagination` | `boolean` | - | Show pagination UI |
| `page` | `number` | - | Current page (1-indexed) |
| `totalPages` | `number` | - | Total pages |
| `onPageChange` | `(page: number) => void` | - | Page change callback |
| `limit` | `number` | `10` | Items per page |
| `limitOptions` | `number[]` | - | Page size options |
| `limitOptionLabel` | `(limit: number) => string` | - | Page size option label formatter |
| `onLimitChange` | `(limit: number) => void` | - | Page size change callback |
| `paginationAlign` | `TablePaginationAlign` | `'right'` | Pagination position (`'left'`\|`'center'`\|`'right'`) |
| `paginationVariant` | `PaginationVariant` | `'numbered'` | Pagination style (`'numbered'`\|`'dot'`\|`'simple'`) |
| `maxVisiblePages` | `number` | `7` | Max visible page buttons |
| `paginationDisabled` | `boolean` | - | Disable pagination |
| `hideNavButtons` | `boolean` | - | Hide prev/next buttons |
| `pageChangeConfirmMessage` | `string` | - | Confirmation dialog before page change |
| `resultTextFormatter` | `(current: number, total: number) => string` | - | Custom result text (simple variant) |
| `showItemCount` | `boolean` | - | Show item count |
| `total` | `number` | - | Total items |
| `itemCountFormatter` | `(start: number, end: number, total: number) => string` | - | Item count text formatter |

**TableHead**: `sortable?` (boolean), `sortDirection?` (`'asc'`|`'desc'`|`false`)

**TableRow**: `selected?` (boolean)

#### Cell Components (for DataGrid columns)

| Component | Key Props | Description |
|-----------|-----------|-------------|
| `CellText` | `value` (string\|number), `tooltip?`, `copyable?` | Text cell with optional copy |
| `CellBadge` | `label`, `color?` (BadgeColor) | Badge in a cell |
| `CellAvatar` | `src?`, `name?`, `initials?`, `size?` (`'2xs'`\|`'xs'`\|`'sm'`\|`'md'`), `showName?` | Avatar in a cell |
| `CellProgress` | `value`, `max?` (100), `showLabel?`, `color?` (`'default'`\|`'success'`\|`'warning'`\|`'destructive'`) | Progress bar in a cell |
| `CellLink` | `href`, `label?`, `tooltip?`, `external?` | Link in a cell |
| `CellIcon` | `iconType` (IconTypeWithFill), `size?` (16), `color?`, `label?` | Icon in a cell |
| `CellDate` | `value` (Date\|string\|number), `format?` (`'date'`\|`'datetime'`\|`'time'`), `locale?` (`'ko'`\|`'en'`\|`'ja'`\|`'zh'`) | Formatted date in a cell |
| `CellDateRange` | `startDate`, `endDate`, `format?`, `locale?`, `separator?` (`'~'`) | Date range in a cell |

### DataGrid

```tsx
import { DataGrid } from '@mlbghoon/blumnai-design-system';
import type { ColumnDef, ColumnOrderState } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<T>[]` | required | Column definitions (TanStack Table) |
| `data` | `T[]` | required | Data array |
| `getRowId` | `(row: T) => string` | `row.id` | Row identifier function |
| `enableColumnReorder` | `boolean` | - | Enable column drag reorder |
| `columnOrder` | `ColumnOrderState` | - | Controlled column order state |
| `onColumnOrderChange` | `OnChangeFn<ColumnOrderState>` | - | Column order change callback |
| `sorting` | `SortingState` | - | Controlled sorting state |
| `onSortingChange` | `OnChangeFn<SortingState>` | - | Sorting change callback |
| `columnFilters` | `ColumnFiltersState` | - | Controlled filter state |
| `onColumnFiltersChange` | `OnChangeFn<ColumnFiltersState>` | - | Filter change callback |
| `enableRowSelection` | `boolean \| ((row) => boolean)` | - | Enable row selection |
| `rowSelection` | `RowSelectionState` | - | Controlled selection state |
| `onRowSelectionChange` | `OnChangeFn<RowSelectionState>` | - | Selection change callback |
| `onRowClick` | `(row: T) => void` | - | Row click callback |
| `pagination` | `boolean` | `true` | Enable pagination |
| `page` | `number` | - | Current page (1-indexed) |
| `total` | `number` | - | Total items (server-side) |
| `limit` | `number` | `10` | Items per page |
| `limitOptions` | `number[]` | - | Page size options |
| `onPageChange` | `(page: number) => void` | - | Page change callback |
| `onLimitChange` | `(limit: number) => void` | - | Limit change callback |
| `isLoading` | `boolean` | - | Loading state |
| `preserveDataWhileLoading` | `boolean` | - | Keep data visible while loading |
| `emptyText` | `string` | `'검색된 내용이 없습니다.'` | Empty state text |
| `emptyContent` | `ReactNode` | - | Custom empty state |
| `error` | `string \| ReactNode` | - | Error message/content |
| `onRetry` | `() => void` | - | Retry callback |
| `minHeight` / `maxHeight` | `string` | - | Container height constraints |
| `headerHeight` / `rowHeight` | `string` | `'32px'` | Row sizing |
| `getRowHeight` | `(row: T) => string \| undefined` | - | Per-row height |
| `showSelectedRowBackground` | `boolean` | - | Highlight selected rows |

> **Additional pagination props:** `limitOptionLabel`, `pageChangeConfirmMessage`, `paginationAlign` (`'left'`|`'center'`|`'right'`), `paginationVariant`, `maxVisiblePages` (7), `paginationDisabled`, `hideNavButtons`, `resultTextFormatter`, `showItemCount`

**ColumnMeta** (via `meta` in column defs):

| Property | Type | Description |
|----------|------|-------------|
| `width` | `string` | CSS Grid width (e.g., `'1fr'`, `'minmax(100px, 1fr)'`) |
| `align` | `'left'` `'center'` `'right'` | Cell text alignment |
| `sticky` | `boolean \| 'left'` | Sticky column |
| `headerTooltip` | `ReactNode` | Tooltip shown on column header hover |

```tsx
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: '이름',
    meta: { width: '2fr', sticky: 'left' },
  },
  {
    accessorKey: 'status',
    header: '상태',
    meta: { width: 'minmax(100px, 1fr)', align: 'center' },
  },
];
```

### Avatar

```tsx
import { Avatar, AvatarGroup } from '@mlbghoon/blumnai-design-system';
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
| `logoImage` | `string` | - | Logo image URL (for `status="logo"`) |
| `icon` | `IconType` | - | Icon (for `status="icon"`) |
| `badgeLocation` | `'top'` `'bottom'` | `'top'` | Status badge position |
| `onError` | `ReactEventHandler<HTMLImageElement>` | - | Image load error callback (userpic) |
| `onLoad` | `ReactEventHandler<HTMLImageElement>` | - | Image loaded callback (userpic) |

```tsx
<Avatar variant="initials" initials="JD" size="md" />
<Avatar variant="userpic" src="/photo.jpg" size="lg" />
<Avatar variant="empty" size="sm" />
<Avatar variant="initials" initials="OK" status="online" />
```

**AvatarGroup:** `avatars` (AvatarProps[]), `max` (default shows "+N" overflow), `size`, `stacking` (`'last-on-top'`|`'first-on-top'`)

### Badge

```tsx
import { Badge } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Badge text |
| `variant` | `'default'` `'icon'` `'image'` `'dot'` | `'default'` | Badge type |
| `color` | `'red'` `'orange'` `'amber'` `'yellow'` `'lime'` `'green'` `'emerald'` `'teal'` `'cyan'` `'sky'` `'blue'` `'indigo'` `'violet'` `'purple'` `'fuchsia'` `'pink'` `'rose'` `'neutral'` | `'neutral'` | Badge color |
| `size` | `'sm'` `'lg'` | `'sm'` | Badge size |
| `shape` | `'rounded'` `'pill'` | `'rounded'` | Badge shape |
| `border` | `boolean` | `false` | Show border |
| `closeIcon` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | - | Close callback |
| `icon` | `IconTypeWithFill` | - | Icon (for `variant="icon"`) |
| `image` | `string` | - | Image URL (for `variant="image"`) |
| `imageAlt` | `string` | `''` | Alt text for image (for `variant="image"`) |
| `closeDisabled` | `boolean` | `false` | Disable close button (when `closeIcon=true`) |

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
import { Progress, ProgressCircular } from '@mlbghoon/blumnai-design-system';
```

**Progress**: `value`, `max` (100), `variant` (`'linear'`|`'dashed'`), `color` (ProgressColor, default `'gray'`), `label`, `showValue`, `formatValue`, `caption`, `error`, `success`

**ProgressCircular**: `value`, `max` (100), `variant` (`'default'`|`'success'`|`'failed'`), `color` (ProgressColor, default `'gray'`), `shape` (`'full'`|`'half'`), `size` (px, default 96), `strokeWidth` (default 8), `showLabel`, `formatValue`, `caption`, `error`, `success`

> **ProgressColor** (same as SliderColor): `'gray'` `'brand'` `'red'` `'orange'` `'amber'` `'yellow'` `'lime'` `'green'` `'emerald'` `'teal'` `'cyan'` `'sky'` `'blue'` `'indigo'` `'violet'` `'purple'` `'fuchsia'` `'pink'` `'rose'`

### Icon

```tsx
import { Icon } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconType` | `[category, name]` | required | Icon identifier |
| `size` | `number` | `24` | Icon size in px |
| `color` | `IconColor` | - | Icon color token or CSS color string (defaults to `currentColor` via CSS) |
| `isFill` | `boolean` | `false` | Use fill variant |
| `focusable` | `boolean` | - | Keyboard focusable (sets SVG `focusable` attribute) |

> **IconColor tokens:** `'default'`, `'default-subtle'`, `'default-muted'`, `'default-disabled'`, `'inverted-default'`, `'inverted-subtle'`, `'inverted-muted'`, `'inverted-disabled'`, `'white-default'`, `'black-default'`, `'destructive'`, `'informative'`, `'success'`, `'warning'`, or any CSS color string.

### Slider

```tsx
import { Slider, SliderRange, SliderInput, SliderRangeInput, DataRangeSlider, DataRangeSliderInput } from '@mlbghoon/blumnai-design-system';
```

**Common base props** (all slider components):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `SliderColor` | `'gray'` | Track color: `'gray'` `'brand'` `'red'` `'orange'` `'amber'` `'yellow'` `'lime'` `'green'` `'emerald'` `'teal'` `'cyan'` `'sky'` `'blue'` `'indigo'` `'violet'` `'purple'` `'fuchsia'` `'pink'` `'rose'` |
| `label` | `string` | - | Label text |
| `disabled` | `boolean` | `false` | Disabled state |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `showTicks` | `boolean` | `false` | Show tick marks |
| `tickCount` | `number` | `11` | Number of ticks |
| `formatTick` | `(value: number) => string` | - | Tick label formatter |

**Slider**: + `value` (number), `defaultValue`, `onChange`, `showValue`, `formatValue`

**SliderRange**: + `value` ([number, number]), `defaultValue`, `onChange`, `showValue`, `formatValue`

**SliderInput**: + `value` (number), `defaultValue`, `onChange`, `formatValue`, `suffix`

**SliderRangeInput**: + `value` ([number, number]), `defaultValue`, `onChange`, `formatValue`, `suffix`

**DataRangeSlider**: + `value` ([number, number]), `defaultValue`, `onChange`, `formatValue`, `separator` (`'~'`), `chartData` (number[])

**DataRangeSliderInput**: + `value` ([number, number]), `defaultValue`, `onChange`, `formatValue`, `suffix` (`'%'`), `chartData` (number[])

### TimePicker

```tsx
import { TimePicker, TimeRangePicker } from '@mlbghoon/blumnai-design-system';
```

**TimePicker** (extends TimeInput props, adds label/popup):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `TimeValue` | - | Time value `{ hour, minute, second? }` |
| `onChange` | `(value: TimeValue \| undefined) => void` | - | Change callback |
| `timeFormat` | `'12h'` `'24h'` | `'24h'` | Time format |
| `showSeconds` | `boolean` | `false` | Show seconds segment |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'sm'` `'lg'` | `'sm'` | Size |
| `timePickerStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `placeholder` | `TimeSegmentPlaceholder` | - | Placeholder `{ hour?, minute?, second? }` |
| `name` | `string` | - | Form name (renders hidden input) |
| `label` | `string` | - | Label text |
| `required` | `boolean` | `false` | Required indicator |
| `supportText` | `string` | - | Support text next to label |
| `caption` | `string` | - | Description below input |
| `error` | `boolean \| string` | - | Error state/message |
| `success` | `boolean \| string` | - | Success state/message |
| `width` | `string \| number` | - | Custom width |
| `showQuickSelect` | `boolean` | `false` | Show quick select options |
| `quickSelectOptions` | `QuickSelectOption[]` | - | Quick select option list |
| `align` | `'start'` `'center'` `'end'` | `'start'` | Popover alignment |
| `onFocus` | `() => void` | - | Focus callback |
| `onBlur` | `() => void` | - | Blur callback |

**TimeRangePicker:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `TimeRange` | - | Time range `{ start?: TimeValue, end?: TimeValue }` |
| `onChange` | `(value: TimeRange \| undefined) => void` | - | Change callback |
| `timeFormat` | `'12h'` `'24h'` | `'24h'` | Time format |
| `showSeconds` | `boolean` | `false` | Show seconds segment |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'sm'` `'lg'` | `'sm'` | Size |
| `timePickerStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `placeholder` | `TimeSegmentPlaceholder` | - | Start/end placeholder |
| `name` | `string` | - | Form name (`{name}-start`, `{name}-end`) |
| `label` | `string` | - | Label text |
| `required` | `boolean` | `false` | Required indicator |
| `supportText` | `string` | - | Support text next to label |
| `caption` | `string` | - | Description below input |
| `error` | `boolean \| string` | - | Error state/message |
| `success` | `boolean \| string` | - | Success state/message |
| `width` | `string \| number` | - | Custom width |
| `showQuickSelect` | `boolean` | `false` | Show quick select options |
| `quickSelectOptions` | `QuickRangeSelectOption[]` | - | Quick range select option list |
| `align` | `'start'` `'center'` `'end'` | `'start'` | Popover alignment |
| `onValidationError` | `(error: 'invalid-range' \| null) => void` | - | Validation error callback |
| `onFocus` | `() => void` | - | Focus callback |
| `onBlur` | `() => void` | - | Blur callback |

### TimeInput / TimeRangeInput

```tsx
import { TimeInput, TimeRangeInput } from '@mlbghoon/blumnai-design-system';
```

**TimeInput** (lower-level, no label/popup):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `TimeValue` | - | Time value `{ hour, minute, second? }` |
| `onChange` | `(value: TimeValue \| undefined) => void` | - | Change callback |
| `timeFormat` | `'12h'` `'24h'` | `'24h'` | Time format |
| `showSeconds` | `boolean` | `false` | Show seconds segment |
| `disabled` | `boolean` | `false` | Disabled state |
| `hasError` | `boolean` | `false` | Error style |
| `hasSuccess` | `boolean` | `false` | Success style |
| `isOpen` | `boolean` | - | Open state indicator |
| `size` | `'sm'` `'lg'` | `'sm'` | Size |
| `timePickerStyle` | `'default'` `'shadow'` `'soft'` | `'default'` | Visual style |
| `placeholder` | `TimeSegmentPlaceholder` | - | Placeholder `{ hour?, minute?, second? }` |
| `hideClockIcon` | `boolean` | `false` | Hide clock icon |
| `onFocus` | `() => void` | - | Focus callback |
| `onBlur` | `() => void` | - | Blur callback |
| `onClockClick` | `() => void` | - | Clock icon click callback |

**TimeRangeInput** (lower-level, no label/popup): `value` (`TimeRange`), `onChange`, `timeFormat`, `showSeconds`, `disabled`, `hasError`, `hasSuccess`, `isOpen`, `size`, `timePickerStyle`, `placeholder`, `onFocus`, `onBlur`, `onClockClick`

### Sheet / Drawer

```tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger, SheetClose } from '@mlbghoon/blumnai-design-system';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerTrigger, DrawerClose } from '@mlbghoon/blumnai-design-system';
```

**Sheet**: `open`, `onOpenChange`. **SheetContent**: `side` (`'top'`|`'right'`|`'bottom'`|`'left'`)

**SheetHeader**, **SheetFooter**: Layout wrappers (`HTMLAttributes<HTMLDivElement>`)
**SheetTitle**, **SheetDescription**: Radix Dialog primitives for accessibility

**SheetTrigger**: Radix Dialog.Trigger primitive (`asChild` supported)

**SheetClose**: Radix Dialog.Close primitive (closes the sheet when clicked)

**Drawer**: `open`, `onOpenChange`, `direction` (`'top'`|`'right'`|`'bottom'`|`'left'`, default `'bottom'`), `shouldScaleBackground` (default `true`)

**DrawerHeader**, **DrawerFooter**: Layout wrappers (`HTMLAttributes<HTMLDivElement>`)
**DrawerTitle**, **DrawerDescription**: Vaul primitives for accessibility

**DrawerTrigger**: Vaul Drawer.Trigger primitive (`asChild` supported)

**DrawerClose**: Vaul Drawer.Close primitive (closes the drawer when clicked)

### FilterButton

```tsx
import { FilterButton } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Button label text |
| `selected` | `boolean` | `false` | Selection state |
| `size` | `'xs'` `'md'` `'lg'` | `'md'` | Button size |
| `shape` | `'rounded'` `'pill'` | `'rounded'` | Button shape |
| `icon` | `IconType` | `['system', 'filter']` | Filter icon |
| `disabled` | `boolean` | `false` | Disabled state |
| `asChild` | `boolean` | `false` | Render as child element (Radix Slot) |
| `width` | `string \| number` | - | Custom width |

### AvatarButton

```tsx
import { AvatarButton } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatar` | `string` | required | Avatar image URL |
| `label` | `string` | required | Label text displayed next to avatar |
| `alt` | `string` | - | Avatar alt text |
| `size` | `'sm'` `'lg'` | `'lg'` | Button size |
| `buttonStyle` | `'default'` `'dashed'` `'soft'` | `'default'` | Visual style |
| `tailIcon` | `IconType \| ReactNode` | - | Trailing icon (e.g., dropdown indicator) |
| `width` | `string \| number` | - | Custom width |
| `disabled` | `boolean` | `false` | Disabled state |
| `asChild` | `boolean` | `false` | Render as child element (Radix Slot) |

### Carousel

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators } from '@mlbghoon/blumnai-design-system';
```

**Carousel**: `orientation` (`'horizontal'`|`'vertical'`), `opts` (EmblaOptionsType), `plugins` (EmblaPluginType[]), `gap` (number, default `16`), `setApi` ((api) => void)

**CarouselIndicators**: `variant` (`'dot'`|`'line'`|`'number'`)

**Autoplay example** (install `embla-carousel-autoplay`):

```tsx
import Autoplay from 'embla-carousel-autoplay';

<Carousel plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]} opts={{ loop: true }}>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
</Carousel>
```

### InputOTP

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Description |
|------|------|-------------|
| `maxLength` | `number` | Number of digits (required) |
| `value` | `string` | Current OTP value |
| `onChange` | `(value: string) => void` | Change callback |
| `error` | `boolean \| string` | Error state/message (red border + optional error text) |
| `label` | `string` | Label text above OTP input |

### HoverCard

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardArrow } from '@mlbghoon/blumnai-design-system';
```

`openDelay` (700ms), `closeDelay` (300ms). **HoverCardContent**: `container?` (HTMLElement), `width?` (number|string — default 256px)

**HoverCardArrow**: Radix HoverCard.Arrow primitive (renders arrow pointing to trigger)

### NavigationMenu

```tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuListItem } from '@mlbghoon/blumnai-design-system';
```

**NavigationMenu**: `value`, `onValueChange`, `orientation` (`'horizontal'`|`'vertical'`)

**NavigationMenuContent**: `width?` (string|number)

**NavigationMenuLink**: `active?` (boolean)

**NavigationMenuListItem**: `title` (required), `description?`, `href` (required), `icon?` (IconType), `iconFill?` (boolean, default false), `active?` (boolean — sets aria-current="page"), `children?` (ReactNode — custom content instead of title/description)

### AspectRatio

```tsx
import { AspectRatio } from '@mlbghoon/blumnai-design-system';
```

`ratio` (number, e.g. `16/9`, default `1`)

### Tooltip

```tsx
import { TooltipTrigger } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | required | Tooltip content |
| `children` | `ReactElement` | required | Trigger element |
| `placement` | `Placement` | `'top'` | Tooltip position |
| `delay` | `number` | `200` | Hover delay in ms |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `maxWidth` | `number` | `240` | Max width in px |
| `width` | `number` | - | Fixed width in px |
| `minWidth` | `number` | - | Min width in px |
| `sideOffset` | `number` | `8` | Distance from trigger (main axis) |
| `alignOffset` | `number` | `0` | Cross-axis offset |
| `badge` | `string` | - | Badge text inside tooltip |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |

```tsx
<TooltipTrigger content="Help text" placement="top">
  <Button>Hover me</Button>
</TooltipTrigger>
```

**AdvancedTooltip**: `items` (TooltipItemData[], required), `minWidth?` (number)

```ts
interface TooltipItemData {
  type: 'divider' | 'label' | 'item' | 'text';
  label?: string;
  caption?: string;
  indicatorColor?: string;
  icon?: IconTypeWithFill;
  text?: string;
}
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
import { DatePicker, DateRangePicker } from '@mlbghoon/blumnai-design-system';
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
| `supportText` | `string` | - | Support text next to label |
| `align` | `'start'` `'center'` `'end'` | `'start'` | Popover alignment |
| `captionLayout` | `CaptionLayout` | `'month-centered'` | Calendar caption layout |
| `showActions` | `boolean` | `false` | Show confirm/cancel buttons |
| `confirmLabel` | `string` | `'확인'` | Confirm button label |
| `cancelLabel` | `string` | `'취소'` | Cancel button label |

**DatePicker-specific:** `value` (Date), `onChange` ((date: Date | undefined) => void), `presets` (QuickPreset[])

**DateRangePicker-specific:** `value` (DateRange: { from: Date, to: Date }), `onChange`, `numberOfMonths` (default 2), `presets`

```tsx
<DatePicker label="Start Date" value={date} onChange={setDate} />
<DateRangePicker label="Period" value={range} onChange={setRange} showQuickPresets />
```

**Custom presets** (`QuickPreset[]` — works for both DatePicker and DateRangePicker):

```tsx
import { addDays, subDays } from 'date-fns';

const presets = [
  { label: '오늘', getValue: () => new Date() },
  { label: '어제', getValue: () => subDays(new Date(), 1) },
  { label: '일주일 후', getValue: () => addDays(new Date(), 7) },
];

<DatePicker showQuickPresets presets={presets} value={date} onChange={setDate} />
```

### Calendar

```tsx
import { Calendar } from '@mlbghoon/blumnai-design-system';
```

The underlying calendar used by DatePicker/DateRangePicker. Extends `react-day-picker` props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `calendarStyle` | `'default'` `'bordered'` | `'bordered'` | Visual style |
| `captionLayout` | `'month-centered'` `'month-left'` `'label'` `'dropdown'` `'dropdown-months'` `'dropdown-years'` | `'month-centered'` | Header layout |
| `mode` | `'single'` `'multiple'` `'range'` | - | Selection mode (from react-day-picker) |

> All other props are inherited from `react-day-picker` (`selected`, `onSelect`, `disabled`, `fromDate`, `toDate`, `numberOfMonths`, `locale`, etc.).

### Charts

```tsx
import { BarChart, LineChart, PieChart, DonutChart } from '@mlbghoon/blumnai-design-system';
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
| `ariaLabel` | `string` | - | Accessible label for the chart |
| `onDataPointClick` | `(point: ChartDataPoint, index: number) => void` | - | Callback when a data point is clicked |
| `isLoading` | `boolean` | - | Show skeleton loading overlay |
| `responsive` | `boolean` | `false` | Auto-resize to fill container via ResizeObserver |

**BarChart:** `xAxis` (ChartAxisConfig), `yAxis` (ChartAxisConfig), `barSize` (number), `dataKey` (string), `gap` (number), `stacked` (boolean), `stackedKeys` (string[]), `stackedColors` (Record<string, string> | string[])

**LineChart:** `xAxis`, `yAxis`, `dataKey` (string), `dataKeys` (string[]), `lineColors` (Record<string, string> | string[]), `showArea` (boolean), `showPoints` (boolean), `strokeWidth` (number)

**PieChart:** `dataKey` (string), `nameKey` (string), `outerRadius` (number), `startAngle` (number), `endAngle` (number), `paddingAngle` (number), `isHalf` (boolean)

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
import { AccordionGroup } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionGroupItem[]` | required | Accordion items |
| `spacing` | `number` | - | Gap between items (px) |
| `style` | `AccordionItemStyle` | - | Default style for all items |
| `allowMultipleOpen` | `boolean` | - | Allow multiple items open simultaneously |
| `onToggle` | `(id: string, isOpen: boolean) => void` | - | Group-level toggle callback (controlled mode) |

```ts
interface AccordionGroupItem {
  id?: string;
  header: ReactNode;
  children: ReactNode;
  style?: AccordionItemStyle;
  isOpen?: boolean;
  disabled?: boolean;
  onToggle?: (isOpen: boolean) => void;
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
  ContextMenuCaption,
} from '@mlbghoon/blumnai-design-system';
```

**ContextMenuContent**: `width` (string|number), `container?` (HTMLElement|null — portal target)

**ContextMenuItem:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inset` | `boolean` | `false` | Left indent (align with checkbox/radio items) |
| `destructive` | `boolean` | `false` | Danger/delete styling |
| `leadIcon` | `IconType` | - | Icon before label |
| `leadIconFill` | `boolean` | `false` | Lead icon filled style |
| `tailIcon` | `IconType` | - | Icon after label |
| `tailIconFill` | `boolean` | `false` | Tail icon filled style |
| `iconColor` | `IconColor` | - | Icon color |
| `shortcut` | `string` | - | Keyboard shortcut display |
| `caption` | `string` | - | Secondary text |
| `description` | `string` | - | Description (large size only) |
| `size` | `'default'` `'large'` | `'default'` | Item size |
| `onClick` | `() => void` | - | Click handler |

**ContextMenuLabel**: `caption?` (string), `inset?` (boolean)

**ContextMenuCaption**: Caption text block (children: ReactNode)

**ContextMenuSubTrigger**: `inset?` (boolean — left indent)

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
import { FileUploadArea, FileUploadCard } from '@mlbghoon/blumnai-design-system';
```

**FileUploadArea:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFilesSelected` | `(files: File[], source: FileSelectSource) => void` | - | File selection callback (`source`: `'click'` or `'drop'`) |
| `onValidationError` | `(errors: FileError[]) => void` | - | Validation error callback |
| `onDragEnter` | `() => void` | - | Drag enter callback |
| `onDragLeave` | `() => void` | - | Drag leave callback |
| `accept` | `string` | - | Accepted file types (e.g., `"image/*,.pdf"`) |
| `maxFiles` | `number` | - | Maximum file count |
| `maxSize` | `number` | - | Max total size in bytes |
| `maxFileSize` | `number` | - | Max individual file size in bytes |
| `multiple` | `boolean` | - | Allow multiple files |
| `title` | `string` | - | Title text |
| `clickText` | `string` | - | Highlighted click text |
| `description` | `string` | - | Description text |
| `icon` | `IconTypeWithFill` | - | Custom icon |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean \| string` | - | Error state/message |
| `caption` | `string` | - | Description below upload area |
| `width` | `string \| number` | - | Container width |

**FileUploadCard:**

| Prop | Type | Description |
|------|------|-------------|
| `file` | `File \| FileInfo` | File object |
| `status` | `'uploading'` `'uploaded'` `'error'` | Upload state |
| `progress` | `number` | Progress 0-100 |
| `thumbnail` | `string` | Preview image URL |
| `errorMessage` | `string` | Error message text |
| `size` | `'sm'` `'lg'` | Card size |
| `onRemove` | `() => void` | Remove callback |
| `onRetry` | `() => void` | Retry callback |

### Breadcrumbs

```tsx
import { Breadcrumbs } from '@mlbghoon/blumnai-design-system';
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
  image?: string;
  disabled?: boolean;
  onClick?: () => void;
}
```

### Pagination

```tsx
import { Pagination } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | required | Current page (1-indexed) |
| `totalPages` | `number` | required | Total pages |
| `onPageChange` | `(page: number) => void` | required | Page change callback |
| `variant` | `'numbered'` `'dot'` `'simple'` | `'numbered'` | Pagination style |
| `maxVisiblePages` | `number` | `7` | Max visible page buttons (numbered) |
| `siblingCount` | `number` | - | Pages shown beside current (overrides maxVisiblePages) |
| `boundaryCount` | `number` | `1` | Pages always shown at start/end |
| `disabled` | `boolean` | `false` | Disabled state |
| `hideNavButtons` | `boolean` | `false` | Hide prev/next buttons |
| `showFirstLastButtons` | `boolean` | `false` | Show first/last page buttons (numbered) |
| `maxDots` | `number` | - | Max dots shown (dot variant, unlimited by default) |
| `ellipsisJump` | `number` | `5` | Pages to jump on ellipsis click |
| `getPageHref` | `(page: number) => string` | - | For router integration |
| `pageChangeConfirmMessage` | `string` | - | Show confirmation dialog before page change |
| `total` | `number` | - | Total items (for `'simple'` variant display) |
| `resultTextFormatter` | `(current, total) => string` | - | Custom result text (simple variant) |
| `prevText` | `string` | `'Prev'` | Previous button text (simple variant) |
| `nextText` | `string` | `'Next'` | Next button text (simple variant) |
| `size` | `'sm'` `'lg'` | `'lg'` | Pagination size (sm=28px items, lg=32px items) |

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardGroup } from '@mlbghoon/blumnai-design-system';
```

**Card**: `variant` (`'default'`|`'outline'`|`'ghost'`), `interactive` (boolean — clickable card with role="button", tabIndex, keyboard support)

**CardTitle**: `as` (`'h1'`|`'h2'`|`'h3'`|`'h4'`|`'h5'`|`'h6'`, default `'h3'`)

**CardGroup**: `columns` (`1`|`2`|`3`|`4`, default `3`)

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
import { Chip } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Chip text |
| `icon` | `IconTypeWithFill` | - | Icon |
| `variant` | `'default'` `'iconOnly'` | `'default'` | Display type |
| `style` | `'default'` `'soft'` `'ghost'` `'ghostMuted'` | `'default'` | Visual style |
| `shape` | `'rounded'` `'pill'` | `'rounded'` | Shape |
| `size` | `'sm'` `'md'` `'lg'` | `'md'` | Size |
| `color` | `ChipColor` | - | Chip color (same 18 colors as BadgeColor) |
| `selected` | `boolean` | `false` | Selected state |
| `disabled` | `boolean` | `false` | Disabled state |
| `onToggle` | `(selected: boolean) => void` | - | Toggle callback (receives new selected state) |

### Skeleton

```tsx
import { Skeleton } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` `'circular'` `'text'` | `'default'` | Shape variant |
| `width` | `string \| number` | - | Width |
| `height` | `string \| number` | - | Height |
| `animation` | `'pulse'` `'wave'` `'none'` | `'pulse'` | Animation style |
| `count` | `number` | `1` | Number of skeleton lines (vertical stack) |

```tsx
<Skeleton width={200} height={20} />
<Skeleton variant="circular" width={40} height={40} />
```

### Form

```tsx
import { Form, FormField, FormControl, FormItem, FormDescription, FormError } from '@mlbghoon/blumnai-design-system';
```

Integrates with `react-hook-form` and `zod`. `FormControl` automatically injects error messages into children that support the `error` prop.

| Component | Key Props |
|-----------|-----------|
| `Form` | `form` (UseFormReturn), `onSubmit` |
| `FormField` | `control`, `name`, `render` |
| `FormControl` | `children` (auto-injects error + aria attributes) |
| `FormItem` | Container div |
| `FormDescription` | Description text below the field (p element) |
| `FormError` | Custom error message override |

See Login Form pattern for complete example.

### Dropdown

```tsx
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuCaption, DropdownMenuButtonGroup, MenuButton,
} from '@mlbghoon/blumnai-design-system';
```

Same compound pattern as ContextMenu. Triggered by click instead of right-click.

**DropdownMenuLabel**: `caption?` (string — secondary text on right), `inset?` (boolean — left indent)

**DropdownMenuContent**: `width` (string|number), `maxHeight?` (string|number), `loading?` (boolean, default `false`), `container?` (HTMLElement|null)

**DropdownMenuItem**: `inset?`, `destructive?`, `leadIcon?`, `leadIconFill?`, `tailIcon?`, `tailIconFill?`, `iconColor?`, `shortcut?`, `caption?`, `description?`, `size?` (`'default'`|`'large'`), `onClick?`

**DropdownMenuAvatar**: `label` (required), `avatarSrc?`, `avatarAlt?`, `tailIcon?`, `caption?`, `shortcut?`, `disabled?`, `iconColor?`, `onClick?`

**DropdownMenuUserbar**: `name` (required), `description?`, `avatarSrc?`, `avatarAlt?`, `badge?`, `badgeColor?`

**DropdownMenuButton**: `label` (required), `buttonStyle?` (`'secondary'`), `leadIcon?`, `tailIcon?`, `disabled?`, `onClick?`

**DropdownMenuSearch**: `value?`, `onChange?`, `placeholder?` (`'Search...'`), `autoFocus?` (`true`)

**DropdownMenuCheckboxItem**: `checked?`, `onCheckedChange?`, `inset?`, `leadIcon?`, `iconColor?`

**DropdownMenuRadioGroup**: `value?`, `onValueChange?`

**DropdownMenuRadioItem**: `value` (required), `inset?`, `leadIcon?`, `iconColor?`

**DropdownMenuCaption**: Caption text block (children: ReactNode)

**DropdownMenuButtonGroup**: Button group wrapper (children: ReactNode)

**MenuButton**: `label` (required), `disabled?`, `onClick?` — used inside DropdownMenuButtonGroup


```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button buttonStyle="secondary">메뉴</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent width={240}>
    <DropdownMenuSearch placeholder="검색..." />
    <DropdownMenuSeparator />
    <DropdownMenuUserbar name="홍길동" description="admin@email.com" avatarSrc="/avatar.jpg" />
    <DropdownMenuSeparator />
    <DropdownMenuAvatar label="프로필" avatarSrc="/avatar.jpg" />
    <DropdownMenuItem leadIcon={['system', 'settings']}>설정</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuButton label="로그아웃" leadIcon={['system', 'logout-box']} onClick={handleLogout} />
  </DropdownMenuContent>
</DropdownMenu>
```

### ScrollArea

```tsx
import { ScrollArea } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'vertical'` `'horizontal'` `'both'` | `'vertical'` | Scroll direction |
| `maxHeight` | `string \| number` | - | Max height (e.g., `300`, `"50vh"`) |
| `maxWidth` | `string \| number` | - | Max width |
| `viewportRef` | `Ref<HTMLDivElement>` | - | Ref to viewport element for programmatic scroll control |
| `onScrollPositionChange` | `(position: { x: number; y: number }) => void` | - | Scroll position callback (rAF throttled) |
| `type` | `'hover'` `'scroll'` `'auto'` `'always'` | `'hover'` | Scrollbar visibility mode |
| `scrollbarSize` | `number` | - | Scrollbar track thickness in px |
| `offsetScrollbars` | `boolean` | - | Inset content to prevent scrollbar overlap |

### Collapsible

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open change callback |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `disabled` | `boolean` | `false` | Disable collapsible |

**CollapsibleContent**: `forceMount` (true | undefined) — keep content mounted in DOM when collapsed

### Divider

```tsx
import { Divider } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'default'` `'text-left'` `'text-center'` `'text-right'` `'icon-left'` `'icon-center'` `'icon-right'` `'button-left'` `'button-center'` `'button-right'` | `'default'` | Divider type |
| `orientation` | `'horizontal'` `'vertical'` | `'horizontal'` | Divider direction |
| `lineStyle` | `'default'` `'dashed'` | `'default'` | Line style |
| `label` | `string` | - | Text label (for text-* types) |
| `icon` | `IconTypeWithFill` | - | Icon (for icon-* types) |
| `buttonLabel` | `string` | - | Button label (for button-* types) |
| `buttonLeadIcon` | `ButtonIconType \| ReactNode` | - | Icon before button label |
| `buttonTailIcon` | `ButtonIconType \| ReactNode` | - | Icon after button label |
| `buttonBadge` | `string` | - | Badge/shortcut text in button |
| `onButtonClick` | `() => void` | - | Button click handler |
| `children` | `ReactNode` | - | Custom content (overrides label/icon/button) |

### ResizablePanelGroup

Wraps react-resizable-panels: `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`.

**ResizablePanel**: `defaultSize?` (number %), `minSize?` (number %), `maxSize?` (number %), `collapsible?` (boolean). Extends react-resizable-panels Panel props.

**ResizableHandle**: `withHandle` (boolean), `variant` (`'line'`|`'pill'`|`'dots'`|`'hidden'`), `collapseButton` (`'before'`|`'after'`), `collapseButtonPosition` (`'start'`|`'center'`|`'end'`|number), `panelRef` (RefObject\<PanelImperativeHandle\> — required when using `collapseButton`, controls which panel collapses/expands), `isCollapsed?`, `onCollapseChange?`

### AlertDialog vs ConfirmDialog

> **AlertDialog** (SimpleAlertDialog) — Simple alert with `title`, `description`, `confirmLabel`, `onConfirm`. Single confirm button, no cancel. Use for simple acknowledgment alerts.
>
> **ConfirmDialog** — Higher-level wrapper with `loading`, `confirmDisabled`, `variant` (`'default'`|`'destructive'`), `cancelLabel`. Has both confirm and cancel buttons. Use for confirmation patterns that need loading/disabled states.

### Sidebar

```tsx
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarGroup, SidebarHeader, SidebarFooter, SidebarUserbar, SidebarInset } from '@mlbghoon/blumnai-design-system';
```

**SidebarProvider** (wrap your layout — required for sidebar context):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultOpen` | `boolean` | `true` | Initial open state (uncontrolled) |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state callback |
| `onCollapse` | `() => void` | - | Callback when sidebar collapses |
| `onExpand` | `() => void` | - | Callback when sidebar expands |
| `persistState` | `boolean` | `true` | Persist sidebar state in cookie |

**Sidebar** (main sidebar container):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'left'` `'right'` | `'left'` | Which side to render |
| `variant` | `'sidebar'` `'floating'` `'inset'` | `'sidebar'` | Visual variant |
| `collapsible` | `'offcanvas'` `'icon'` `'none'` | `'offcanvas'` | Collapse behavior |
| `showRail` | `boolean` | `false` | Show invisible rail toggle |
| `showToggleButton` | `boolean` | `false` | Show visible toggle button |
| `toggleButtonPosition` | `'top'` `'center'` `'bottom'` | `'center'` | Toggle button position |
| `toggleButtonOffset` | `number \| string` | - | Custom toggle button offset |
| `toggleButtonIcon` | `ReactNode` | - | Custom toggle button icon |

**SidebarInset**: Main content area (`<main>`) — adapts layout to sidebar state. No custom props, standard HTML main element props.

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

> **Collapse behavior:** The `collapsed` prop on `SidebarMenuItem` switches to icon-only mode. State auto-propagates from `useSidebar()` hook, or override with the prop directly. `variant="children"` renders nested items (hidden when collapsed). The `tooltip` prop shows a label on hover when collapsed.

### Menubar

```tsx
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from '@mlbghoon/blumnai-design-system';
```

**MenubarContent**: `width?` (string|number), `container?` (HTMLElement)

**MenubarItem**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `destructive` | `boolean` | - | Destructive action styling |
| `leadIcon` | `IconType` | - | Icon before label |
| `leadIconFill` | `boolean` | `false` | Lead icon filled style |
| `tailIcon` | `IconType` | - | Icon after label |
| `tailIconFill` | `boolean` | `false` | Tail icon filled style |
| `iconColor` | `IconColor` | - | Icon color |
| `caption` | `string` | - | Caption text |
| `description` | `string` | - | Description (large size only) |
| `shortcut` | `string` | - | Keyboard shortcut |
| `size` | `'default'` `'large'` | `'default'` | Item size |
| `inset` | `boolean` | - | Left indent |
| `onClick` | `() => void` | - | Click handler |

**MenubarCheckboxItem**: `inset?` (boolean — left indent), plus Radix CheckboxItem props (`checked`, `onCheckedChange`)

**MenubarRadioGroup**: Radix RadioGroup props (`value`, `onValueChange`)

**MenubarRadioItem**: `inset?` (boolean — left indent), plus Radix RadioItem props (`value`)

**MenubarLabel**: `inset?` (boolean), `caption?` (string — caption text beside label)

**MenubarSubTrigger**: `inset?` (boolean — left indent)

**MenubarCaption**: Text caption block (children: ReactNode)

### PopoverContent

```tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverScrollArea, PopoverArrow } from '@mlbghoon/blumnai-design-system';
```

**Popover** (root): `open?` (boolean), `onOpenChange?` ((open: boolean) => void), `defaultOpen?` (boolean), `modal?` (boolean)

**PopoverContent:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | - | Content width |
| `align` | `'start'` `'center'` `'end'` | `'center'` | Horizontal alignment |
| `side` | `'top'` `'right'` `'bottom'` `'left'` | `'bottom'` | Which side to render |
| `sideOffset` | `number` | `4` | Distance from trigger (px) |

**PopoverScrollArea**: `maxHeight` (string|number)

**PopoverArrow**: Renders an arrow pointing to the trigger. Wraps Radix `PopoverPrimitive.Arrow` — props: `width?` (number), `height?` (number), `className?`

### DnD (Drag and Drop)

```tsx
import {
  DndContext, Draggable, Droppable, DragHandle, DragOverlay,
  Sortable, SortableItem, useDraggableContext, useSortableItemContext,
} from '@mlbghoon/blumnai-design-system';
```

**DndContext** (wraps drag area, provides sensors):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onDragStart` | `(event: DragStartEvent) => void` | - | Drag start callback |
| `onDragMove` | `(event: DragMoveEvent) => void` | - | Drag move callback |
| `onDragOver` | `(event: DragOverEvent) => void` | - | Drag over callback |
| `onDragEnd` | `(event: DragEndEvent) => void` | - | Drag end callback |
| `onDragCancel` | `(event: DragCancelEvent) => void` | - | Drag cancel callback |
| `modifiers` | `Modifiers` | - | dnd-kit modifiers |
| `collisionDetection` | `CollisionDetection` | - | Collision algorithm |
| `autoScroll` | `boolean` | - | Auto-scroll during drag |
| `cancelDrop` | `CancelDrop` | - | Async cancel drop check |
| `sensors` | `SensorDescriptor[]` | - | Custom sensors (default: Pointer + Touch + Keyboard) |

**Draggable**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `DndId` | required | Unique identifier |
| `children` | `ReactNode \| (props: DraggableRenderProps) => ReactNode` | required | Content or render function |
| `data` | `T` | - | Custom data attached to drag item |
| `disabled` | `boolean` | - | Disable dragging |
| `handle` | `boolean` | - | Use DragHandle instead of entire element |

**Droppable**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `DndId` | required | Unique identifier |
| `children` | `ReactNode \| (props: DroppableRenderProps) => ReactNode` | required | Content or render function |
| `disabled` | `boolean` | - | Disable dropping |
| `accepts` | `string[]` | - | Accepted drag types |
| `activeClassName` | `string` | - | Class when any drag is active |
| `overClassName` | `string` | - | Class when dragged item is over |
| `rejectedClassName` | `string` | - | Class when item is over but not accepted |

**DragHandle**: Render inside a `Draggable` with `handle={true}`. Props: `children?`, `className?`

**DragOverlay**: `children` (ReactNode | (activeItem: DndItem | null) => ReactNode), `dropAnimation?` ({ duration?, easing? } | null)

**Sortable** (reorderable list):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `DndItem<T>[]` | required | Items array (each needs `id`) |
| `onReorder` | `(items: T[]) => void` | - | Reorder callback with new order |
| `strategy` | `'vertical'` `'horizontal'` `'grid'` | - | Sort layout strategy |
| `disabled` | `boolean` | - | Disable sorting |
| `standalone` | `boolean` | `true` | Create own DndContext (false for multi-list) |

**SortableItem**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `DndId` | required | Must match an item id |
| `children` | `ReactNode \| (props: SortableItemRenderProps) => ReactNode` | required | Content or render function |
| `disabled` | `boolean` | - | Disable this item |
| `handle` | `boolean` | - | Use DragHandle |
| `activeClassName` | `string` | - | Class when dragging |

**Hooks:**
- `useDraggableContext()` — access `{ isDragging, attributes, listeners }` inside a Draggable
- `useSortableItemContext()` — access sortable item state inside a SortableItem

```tsx
<Sortable items={items} onReorder={setItems} strategy="vertical">
  {items.map(item => (
    <SortableItem key={item.id} id={item.id}>
      {item.label}
    </SortableItem>
  ))}
</Sortable>
```

---

## Common Patterns

### Login Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormControl, Input, Button } from '@mlbghoon/blumnai-design-system';

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

### Form with Select & Checkbox

`FormControl` auto-injects the `error` prop into `Input`, `Textarea`, and `Select`. Other components (like `Checkbox`) still get `aria-invalid` and `aria-describedby` attributes.

```tsx
<FormField control={form.control} name="role" render={({ field }) => (
  <FormControl>
    <Select label="역할" options={roleOptions} value={field.value} onChange={field.onChange} />
  </FormControl>
)} />

<FormField control={form.control} name="agree" render={({ field }) => (
  <FormControl>
    <Checkbox label="약관 동의" checked={field.value} onCheckedChange={field.onChange} />
  </FormControl>
)} />
```

### Confirmation Dialog

```tsx
import { ConfirmDialog, Button } from '@mlbghoon/blumnai-design-system';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button, Input } from '@mlbghoon/blumnai-design-system';
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
import { toast } from '@mlbghoon/blumnai-design-system';

toast.success('저장되었습니다');
toast.error('오류가 발생했습니다');
toast.warning('주의가 필요합니다');
toast.info('새로운 메시지가 있습니다');
toast.info('삭제됨', { action: { label: '실행취소', onClick: () => handleUndo() } });
```

### FilterButton with Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent, FilterButton, CheckboxList } from '@mlbghoon/blumnai-design-system';
import { useState } from 'react';

function StatusFilter() {
  const [selected, setSelected] = useState<string[]>([]);
  const statusOptions = [
    { id: 'active', title: '활성', checked: selected.includes('active') },
    { id: 'inactive', title: '비활성', checked: selected.includes('inactive') },
  ];

  return (
    {/* Wrap in <span> because PopoverTrigger asChild merges props — the span prevents conflicts */}
    <Popover>
      <PopoverTrigger asChild>
        <span><FilterButton label="상태" selected={selected.length > 0} /></span>
      </PopoverTrigger>
      <PopoverContent>
        <CheckboxList items={statusOptions} onItemChange={(id, checked) => {
          setSelected(checked ? [...selected, id] : selected.filter(s => s !== id));
        }} />
      </PopoverContent>
    </Popover>
  );
}
```

### DataGrid with Selection

```tsx
import { useState } from 'react';
import { DataGrid, CellText, CellBadge, CellAvatar } from '@mlbghoon/blumnai-design-system';
import type { ColumnDef } from '@mlbghoon/blumnai-design-system';

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
    cell: ({ row }) => <CellAvatar name={row.original.name} showName />,
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ getValue }) => (
      <CellBadge label={getValue() === 'active' ? '활성' : '비활성'} color={getValue() === 'active' ? 'green' : 'neutral'} />
    ),
  },
];

function UserTable() {
  const [data] = useState<User[]>([
    { id: '1', name: '홍길동', email: 'hong@email.com', status: 'active' },
  ]);

  return <DataGrid columns={columns} data={data} enableRowSelection />;
}
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@mlbghoon/blumnai-design-system';

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
import { Input } from '@mlbghoon/blumnai-design-system';
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
import { FileUploadArea } from '@mlbghoon/blumnai-design-system';
import { useState } from 'react';

function UploadExample() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUploadArea
      accept="image/*,.png,.jpg,.jpeg"
      maxFiles={5}
      maxSize={5 * 1024 * 1024}
      onFilesSelected={setFiles}
    />
  );
}
```

### Button Variants

```tsx
import { Button } from '@mlbghoon/blumnai-design-system';

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
import { Popover, PopoverTrigger, PopoverContent, PopoverClose, PopoverAnchor, Button } from '@mlbghoon/blumnai-design-system';

<Popover>
  <PopoverTrigger asChild>
    <span><Button buttonStyle="secondary">설정</Button></span>
  </PopoverTrigger>
  <PopoverContent>
    <div className="padding-16"><p>팝오버 내용</p></div>
  </PopoverContent>
</Popover>
```

**PopoverContent**: `width?` (string|number), `container?` (HTMLElement|null — portal target, default `document.body`)

**PopoverClose**: Radix Popover.Close primitive (closes the popover when clicked)

**PopoverAnchor**: Radix Popover.Anchor primitive (custom anchor element for positioning)

### Combobox with Creatable

```tsx
import { Combobox } from '@mlbghoon/blumnai-design-system';
import { useState } from 'react';

function CreatableCombobox() {
  const [options, setOptions] = useState([
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
  ]);
  const [value, setValue] = useState<string>();

  return (
    <Combobox
      variant="default"
      label="프레임워크"
      options={options}
      value={value}
      onChange={setValue}
      creatable
      createText={(v) => `"${v}" 추가`}
      onCreate={(newValue) => {
        setOptions([...options, { id: newValue, label: newValue }]);
      }}
    />
  );
}
```

> **Note:** `creatable` is synchronous — there is no built-in async/loading support. Use `onCreate` to add the new option to your local state.

### Combobox with Async Options

No built-in async support — manage loading state externally:

```tsx
import { Combobox } from '@mlbghoon/blumnai-design-system';
import { useState, useEffect } from 'react';

function AsyncCombobox() {
  const [options, setOptions] = useState<{ id: string; label: string }[]>([]);
  const [value, setValue] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers().then((users) => {
      setOptions(users.map((u) => ({ id: u.id, label: u.name })));
      setIsLoading(false);
    });
  }, []);

  return (
    <Combobox
      variant="default"
      label="사용자"
      options={options}
      value={value}
      onChange={setValue}
      placeholder={isLoading ? '로딩 중...' : '선택하세요'}
      disabled={isLoading}
    />
  );
}
```

### Sidebar Page Layout

```tsx
import {
  SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu,
  SidebarMenuItem, SidebarFooter, SidebarUserbar, SidebarInset,
} from '@mlbghoon/blumnai-design-system';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <img src="/logo.svg" alt="Logo" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem label="대시보드" icon={['system', 'home-2']} isActive />
            <SidebarMenuItem label="프로젝트" icon={['system', 'folder']} badge="3" />
            <SidebarMenuItem variant="divider" />
            <SidebarMenuItem label="설정" icon={['system', 'settings']} />
            <SidebarMenuItem variant="children" label="도구">
              <SidebarMenuItem label="분석" icon={['system', 'chart']} />
              <SidebarMenuItem label="리포트" icon={['system', 'document']} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarUserbar
            variant="variant2"
            name="홍길동"
            email="hong@email.com"
            avatarInitials="홍"
          />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
```

### DataGrid with Server-Side Sorting

`ColumnDef`, `SortingState`, `ColumnFiltersState`, `RowSelectionState`, and `OnChangeFn` are all re-exported from the design system (originally from `@tanstack/react-table`).

```tsx
import { useState } from 'react';
import { DataGrid } from '@mlbghoon/blumnai-design-system';
import type { ColumnDef, SortingState, OnChangeFn } from '@mlbghoon/blumnai-design-system';

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'email', header: '이메일' },
];

function ServerTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sort = sorting[0];
    fetchUsers({ page, sortBy: sort?.id, sortDir: sort?.desc ? 'desc' : 'asc' })
      .then(({ items, total }) => { setData(items); setTotal(total); });
  }, [sorting, page]);

  return (
    <DataGrid
      columns={columns}
      data={data}
      sorting={sorting}
      onSortingChange={setSorting}
      page={page}
      total={total}
      limit={10}
      onPageChange={setPage}
    />
  );
}
```

### DataGrid with Column Filtering

```tsx
import { useState } from 'react';
import { DataGrid } from '@mlbghoon/blumnai-design-system';
import type { ColumnDef, ColumnFiltersState } from '@mlbghoon/blumnai-design-system';

function FilterableTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return (
    <DataGrid
      columns={columns}
      data={data}
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
    />
  );
}
```

### Form with Async Submit

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormControl, Input, Button, toast } from '@mlbghoon/blumnai-design-system';
import { useState } from 'react';

const schema = z.object({ name: z.string().min(1, '필수 항목입니다') });

function AsyncForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      await saveData(values);
      toast.success('저장되었습니다');
    } catch {
      toast.error('저장에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-16">
      <FormField control={form.control} name="name" render={({ field }) => (
        <FormControl><Input variant="default" label="이름" {...field} /></FormControl>
      )} />
      <Button buttonStyle="primary" type="submit" loading={isSubmitting}>저장</Button>
    </Form>
  );
}
```

---

## Icons

### Usage

```tsx
import { Icon, BrandIcon, FlagIcon, FileIcon, IsometricIcon, CursorIcon } from '@mlbghoon/blumnai-design-system';

<Icon iconType={['system', 'check']} />
<Icon iconType={['system', 'close']} size={24} />
<Icon iconType={['system', 'heart']} isFill />
<CursorIcon cursorType="pointer" />
```

### Categories

`arrows`, `buildings`, `business`, `communication`, `design`, `development`, `device`, `document`, `editor`, `finance`, `food`, `health`, `map`, `media`, `others`, `system`, `user`, `weather`

### Common System Icons

`add`, `check`, `close`, `search`, `settings`, `menu`, `more`, `more-2`, `delete-bin`, `download`, `upload`, `eye`, `eye-off`, `filter`, `star`, `share`, `lock`, `lock-unlock`, `information`, `error-warning`, `alarm-warning`, `time`, `refresh`, `external-link`, `login-box`, `logout-box`, `zoom-in`, `zoom-out`, `toggle`, `loader`, `shield`, `question`

> Icons like `user`, `edit`, `arrow-*`, `heart`, `calendar`, `mail`, `phone`, `link` exist in their respective categories (`user`, `design`, `arrows`, `health`, `business`, `communication`, `device`, `editor`).

### BrandIcon

```tsx
import { BrandIcon } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brandType` | `BrandType` | required | Brand identifier (126+ brands: `'github'`, `'figma'`, `'slack'`, `'notion'`, etc.) |
| `size` | `number` | `24` | Icon size in px |
| `className` | `string` | - | Custom class |

```tsx
<BrandIcon brandType="github" size={24} />
<BrandIcon brandType="figma" />
```

### FlagIcon

```tsx
import { FlagIcon } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `country` | `CountryCode` | required | Country code (250+ countries: `'united states'`, `'south korea'`, `'japan'`, etc.) |
| `size` | `number` | `24` | Icon size in px |
| `className` | `string` | - | Custom class |

```tsx
<FlagIcon country="south korea" size={24} />
<FlagIcon country="united states" />
```

### FileIcon

```tsx
import { FileIcon } from '@mlbghoon/blumnai-design-system';
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
import { IsometricIcon } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconType` | `IsometricIconType` | required | Icon identifier |
| `view` | `'top'` `'left'` | `'top'` | Viewing angle |
| `size` | `number` | `24` | Icon size in px |
| `fillColor` | `IsometricFillColor` | `'default'` | Fill color |
| `strokeColor` | `IsometricStrokeColor` | `'accent'` | Stroke color |

> **Note:** `IsometricIcon` is a separate component, not part of the `Icon` tuple system.

**All 160 IsometricIconType values:** `'123'`, `'abc'`, `'actionkey'`, `'acute'`, `'addbox'`, `'addcircle'`, `'addreaction'`, `'addtask'`, `'allmatch'`, `'arrowandedge'`, `'arrowcircledown'`, `'arrowcircleleft'`, `'arrowcircleright'`, `'arrowcircleup'`, `'backspace'`, `'block'`, `'bolt'`, `'boy'`, `'bringyourownip'`, `'cached'`, `'cancel'`, `'cancelcircle'`, `'captiveportal'`, `'changecircle'`, `'check'`, `'checkbox'`, `'checkcircle'`, `'checksmall'`, `'chipextraction'`, `'chips'`, `'chronic'`, `'clearall'`, `'clockleader'`, `'clockloader'`, `'couples'`, `'createnewfolder'`, `'css'`, `'cycle'`, `'dataalert'`, `'datacheckdouble'`, `'datainfoalert'`, `'dataset'`, `'datasetlinked'`, `'delete'`, `'deletesweep'`, `'deployedcode'`, `'deployedcodeaccount'`, `'deployedcodealert'`, `'deployedcodehistory'`, `'desktoplandscape'`, `'desktoplandscapeadd'`, `'desktopportrait'`, `'dialog'`, `'diamond'`, `'directorysync'`, `'diversity'`, `'doneall'`, `'donotdisturboff'`, `'donotdisturbon'`, `'download'`, `'downloaddone'`, `'emojievent'`, `'emojiobjects'`, `'emojipeople'`, `'extensionoff'`, `'favorite'`, `'favoriteminus'`, `'favoriteplus'`, `'filter'`, `'fitscreen'`, `'fronthand'`, `'fullscreen'`, `'fullscreenexit'`, `'gardencart'`, `'groupwork'`, `'happy'`, `'heartbroken'`, `'heartcheck'`, `'highlightkeyboardfocus'`, `'highlightmousecursor'`, `'highlighttextcursor'`, `'hive'`, `'hls'`, `'house'`, `'html'`, `'inputcircle'`, `'installdesktop'`, `'installmobile'`, `'iosshare'`, `'javascript'`, `'key'`, `'keyboardcommandkey'`, `'keyvertical'`, `'leftclick'`, `'linkedservices'`, `'loginblank'`, `'logout'`, `'man'`, `'managesearch'`, `'mood'`, `'moodbad'`, `'moveitem'`, `'multimodalhandeye'`, `'neutral'`, `'newwindow'`, `'openinnew'`, `'outputcircle'`, `'personadd'`, `'psychologyalt'`, `'rocketlaunch'`, `'rotateauto'`, `'rulesettings'`, `'searchcheck'`, `'searchoff'`, `'selectcheckbox'`, `'sendtimeextension'`, `'settings'`, `'settingsaccessibility'`, `'settingsheart'`, `'shelfautohide'`, `'shield'`, `'shoppingcart'`, `'signlanguage'`, `'skull'`, `'sort'`, `'sortbyalpha'`, `'stacks'`, `'star'`, `'starhalf'`, `'start'`, `'statdouble'`, `'stepover'`, `'swaphorizontalcircle'`, `'swapvertical'`, `'swipedown'`, `'swipeleft'`, `'swipeup'`, `'switchaccess'`, `'switchaccessshortcutadd'`, `'sync'`, `'toggleoff'`, `'toggleon'`, `'token'`, `'transcribe'`, `'unable'`, `'undo'`, `'unhappy'`, `'upload'`, `'veryhappy'`, `'veryunhappy'`, `'viewcomfyalt'`, `'viewcozy'`, `'viewkanbab'`, `'viewtimeline'`, `'weight'`, `'workspacepremium'`

### CursorIcon

```tsx
import { CursorIcon } from '@mlbghoon/blumnai-design-system';
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cursorType` | `'arrow'` `'hand-closed'` `'hand-open'` `'not-allowed'` `'pointer'` `'text'` | required | Cursor type |
| `size` | `number` | `24` | Icon size in px |

```tsx
<CursorIcon cursorType="pointer" size={32} />
<CursorIcon cursorType="text" />
```

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

### IsometricIconType

```ts
type IsometricIconType = string; // 200+ isometric icon identifiers
// e.g., 'analysis', 'calendar', 'chart', 'cloud', 'database', 'email', 'file', etc.
```

### IsometricFillColor

```ts
type IsometricFillColor =
  | 'default' | 'subtle' | 'muted' | 'inverted' | 'accent'
  | 'card-default' | 'card-subtle' | 'card-inverted'
  | 'sidebar-default' | 'sidebar-subtle'
  // + 100+ semantic color tokens (state, checkbox, switch, basic colors, etc.)
```

### IsometricStrokeColor

```ts
type IsometricStrokeColor =
  | 'default' | 'darker' | 'strong' | 'inverted' | 'accent'
  | 'accent-inverted' | 'destructive' | 'informative' | 'success'
  | 'warning' | 'highlight' | 'highlight-destructive' | 'input-highlight';
```

### ChartDataPoint

```ts
type ChartDataPoint = { [key: string]: string | number };
```

### ChartConfig

```ts
type ChartConfig = Record<string, { label: string; color: string; icon?: ReactNode }>;
```

### ChartAxisConfig

```ts
interface ChartAxisConfig {
  dataKey: string;
  label?: string;
  domain?: [number, number] | 'auto';
  tickFormatter?: (value: string | number) => string;
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
import { useKeyboardShortcut } from '@mlbghoon/blumnai-design-system';
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
import { useIsMobile } from '@mlbghoon/blumnai-design-system';
```

Returns `true` when the viewport width is less than 768px. Listens to media query changes and updates reactively.

```tsx
const isMobile = useIsMobile();

if (isMobile) {
  return <Drawer>...</Drawer>;
}
return <Sheet>...</Sheet>;
```

### useSidebar

```tsx
import { useSidebar } from '@mlbghoon/blumnai-design-system';
```

Returns the sidebar context. Must be used inside a `SidebarProvider`.

| Property | Type | Description |
|----------|------|-------------|
| `state` | `'expanded'` \| `'collapsed'` | Current sidebar state |
| `open` | `boolean` | Whether sidebar is open |
| `setOpen` | `(open: boolean) => void` | Set open state |
| `openMobile` | `boolean` | Mobile sidebar open state |
| `setOpenMobile` | `(open: boolean) => void` | Set mobile open state |
| `isMobile` | `boolean` | Whether viewport is mobile |
| `toggleSidebar` | `() => void` | Toggle sidebar open/closed |
| `collapsible` | `'offcanvas'` \| `'icon'` \| `'none'` | Collapse behavior |
| `setCollapsible` | `(value) => void` | Set collapse behavior |

```tsx
const { state, toggleSidebar } = useSidebar();
// state === 'collapsed' → icon-only mode
```

---

## CSS Utility Classes Reference

The design system provides custom utility classes. **Do not use default Tailwind classes** for typography or spacing. Standard Tailwind layout classes (`flex`, `flex-col`, `grid`, `items-center`, `justify-between`, `max-w-sm`, `w-full`, `h-full`, `relative`, `absolute`, `hidden`, etc.) are fine — only typography (`text-sm`, `leading-5`, `tracking-tight`) and spacing (`p-4`, `gap-2`, `w-16`, `h-8`) have custom replacements.

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

### Pixel Value Reference

**Spacing** (class number = px value): `padding-0`=0px, `padding-1`=1px, `padding-2`=2px, `padding-4`=4px, `padding-6`=6px, `padding-8`=8px, `padding-10`=10px, `padding-12`=12px, `padding-16`=16px, `padding-20`=20px, `padding-24`=24px. Same pattern for `gap-*`, `width-*`, `height-*`.

**Font size**: `size-xs`=12px, `size-sm`=14px, `size-md`=16px, `size-lg`=18px, `size-xl`=20px, `size-2xl`=24px, `size-3xl`=30px, `size-4xl`=36px, `size-5xl`=48px, `size-6xl`=60px, `size-7xl`=72px, `size-8xl`=96px, `size-9xl`=128px

**Line height**: `line-height-leading-3`=12px, `-4`=16px, `-5`=20px, `-6`=24px, `-7`=28px, `-8`=32px, `-9`=36px, `-10`=40px

**Letter spacing**: `letter-spacing-tracking-tighter`=-1.2px, `tracking-tight`=-0.8px, `tracking-normal`=-0.6px, `tracking-wide`=0.4px

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
- CSS can be imported in server components: `import '@mlbghoon/blumnai-design-system/styles'`

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
import { useIsMobile } from '@mlbghoon/blumnai-design-system';

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
| file, upload, drag drop, attach | `FileUploadArea` |
| otp, verification code, pin, 2fa | `InputOTP` |
| carousel, slideshow, gallery, swipe | `Carousel` |
| hover card, preview card, profile preview | `HoverCard` |
| context menu, right click | `ContextMenu` |
| dropdown menu, actions | `DropdownMenu` |
| menubar, app menu | `Menubar` |
| navigation menu, mega menu | `NavigationMenu` |
| resizable, split panels | `ResizablePanelGroup` |
| aspect ratio, image container | `AspectRatio` |
| collapsible, toggle content | `Collapsible` |
| bar chart, column chart, histogram | `BarChart` |
| line chart, trend, time series | `LineChart` |
| pie chart, distribution | `PieChart` |
| donut chart, ring chart | `DonutChart` |
| cursor, pointer, mouse cursor | `CursorIcon` |
| drag, drop, drag and drop, dnd, sortable, reorder | `DndContext` / `Sortable` |

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
| `/carousel` | Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators |
| `/chart` | Chart, BarChart, LineChart, PieChart, DonutChart |
| `/checkbox` | Checkbox, CheckboxCard, CheckboxList |
| `/chip` | Chip |
| `/collapsible` | Collapsible, CollapsibleTrigger, CollapsibleContent |
| `/context-menu` | ContextMenu |
| `/dialog` | Dialog, AlertDialog, ConfirmDialog |
| `/divider` | Divider |
| `/drawer` | Drawer, Sheet |
| `/dropdown` | DropdownMenu |
| `/file-upload` | FileUploadArea, FileUploadCard |
| `/dnd` | DndContext, Draggable, Droppable, DragHandle, DragOverlay, Sortable, SortableItem |
| `/form` | Form, FormField, FormControl, FormItem, FormDescription, FormError |
| `/hover-card` | HoverCard, HoverCardTrigger, HoverCardContent |
| `/icons` | All icons |
| `/icons/icon` | Icon |
| `/icons/brand` | BrandIcon |
| `/icons/flag` | FlagIcon |
| `/icons/file` | FileIcon |
| `/icons/cursor` | CursorIcon |
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
| `/slider` | Slider, SliderRange, SliderInput, SliderRangeInput, DataRangeSlider, DataRangeSliderInput |
| `/switch` | Switch, SwitchList |
| `/table` | Table, DataGrid, CellText, CellBadge, CellAvatar, CellProgress, CellLink, CellIcon, CellDate, CellDateRange + types: ColumnDef, SortingState, ColumnFiltersState, RowSelectionState, OnChangeFn, Row |
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
// Static (SSR-safe)
<html data-theme="dark">{/* Dark theme */}</html>

// Scoped to a section
<div data-theme="theme-b-light">{/* Only this area uses Theme-B Light */}</div>
```

**Runtime switching (JavaScript):**

```tsx
// Switch theme
document.documentElement.setAttribute('data-theme', 'dark');

// Reset to default (Theme-A Light)
document.documentElement.removeAttribute('data-theme');

// React example
function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>('');
  const changeTheme = (t: string) => {
    if (t) document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
    setTheme(t);
  };
  return (
    <Select
      variant="default"
      label="Theme"
      options={[
        { id: '', label: 'Light (default)' },
        { id: 'dark', label: 'Dark' },
        { id: 'theme-b-light', label: 'Theme-B Light' },
        { id: 'theme-b-dark', label: 'Theme-B Dark' },
      ]}
      value={theme}
      onChange={changeTheme}
    />
  );
}
```
