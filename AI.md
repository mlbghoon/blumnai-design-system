# Blumnai Design System — AI & Developer Reference

> Component reference for AI agents and developers.
> Package: `@blumnai-studio/blumnai-design-system`
>
> **Props are NOT listed here** — read `.types.ts` files in each component directory for always-up-to-date prop definitions.

---

## Setup

```bash
npm install @blumnai-studio/blumnai-design-system --legacy-peer-deps
```

```tsx
// 1. Import CSS once in app entry
import '@blumnai-studio/blumnai-design-system/styles';

// 2. Import components (subpath imports recommended for smaller bundles)
import { Button } from '@blumnai-studio/blumnai-design-system/button';
import { Input } from '@blumnai-studio/blumnai-design-system/input';
import { Icon } from '@blumnai-studio/blumnai-design-system/icons/icon';

// Root import also works (but pulls all component metadata)
import { Button, Input, Select } from '@blumnai-studio/blumnai-design-system';

// Some components are subpath-only (not in root export):
import { Form, FormField, FormControl } from '@blumnai-studio/blumnai-design-system/form';
import { EventCalendar } from '@blumnai-studio/blumnai-design-system/event-calendar';
import { CellText, CellBadge, CellAvatar } from '@blumnai-studio/blumnai-design-system/table';
```

**Peer Dependencies:**
- **Required:** `react` ^18/^19, `react-dom` ^18/^19
- **Optional** (for Form components): `react-hook-form`, `@hookform/resolvers`, `zod`
- **Optional** (for HtmlEditor): `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extension-underline`, `@tiptap/extension-text-align`, `@tiptap/extension-color`, `@tiptap/extension-text-style`, `@tiptap/extension-highlight`, `@tiptap/extension-link`, `@tiptap/extension-image`, `@tiptap/extension-placeholder`
- **Bundled** (no action needed): `date-fns`, `sonner`

**Ref forwarding:** All interactive components forward refs via `React.forwardRef`.

---

## Quick Reference Table

| Need | Component | Quick Example |
|------|-----------|---------------|
| Clickable action | `Button` | `<Button buttonStyle="primary">Save</Button>` |
| Navigation link | `LinkButton` | `<LinkButton href="/page">Go</LinkButton>` |
| Icon-only button | `ControlButton` | `<ControlButton icon={RiSettingsLine} />` or `icon={RiStarFill} color="yellow"` |
| Quick actions menu | `MenuButton` | `<MenuButton items={[...]} />` |
| Text input | `Input` | `<Input variant="default" label="Name" />` |
| Password input | `Input` | `<Input variant="password" showStrength />` |
| Number input +/- | `Input` | `<Input variant="quantity" />` |
| Tags/chips input | `Input` | `<Input variant="tags" />` |
| Multi-line text | `Textarea` | `<Textarea label="Bio" />` |
| Rich text editor | `HtmlEditor` | `<HtmlEditor defaultValue={html} onChange={setHtml} label="내용" />` |
| Select one (form picker) | `Select` | `<Select variant="default" options={[...]} />` |
| Select multiple | `Select` | `<Select variant="multi-select" options={[...]} />` |
| Typeahead / autocomplete (type to filter) | `Combobox` | `<Combobox options={[...]} />` |
| Create-as-you-type | `Combobox` | `<Combobox creatable onCreate={...} options={[...]} />` |
| Large list (1000+) | `VirtualSelect` | `<VirtualSelect variant="single" options={[...]} />` |
| Toggle | `Switch` | `<Switch label="Enabled" />` |
| Checkbox | `Checkbox` | `<Checkbox label="Agree" />` |
| Checkbox group | `CheckboxList` | `<CheckboxList items={[...]} onItemChange={...} />` |
| Radio buttons | `RadioGroup` | `<RadioGroup><Radio value="a" label="A" /></RadioGroup>` |
| Form validation | `Form` | See Form patterns below (subpath: `./form`) |
| Modal dialog | `Dialog` | `<Dialog><DialogContent>...</DialogContent></Dialog>` |
| Confirmation | `ConfirmDialog` | `<ConfirmDialog title="Delete?" onConfirm={...} />` |
| Alert dialog | `AlertDialog` | `<AlertDialog title="Sure?" onConfirm={...} />` |
| Simple alert | `SimpleAlertDialog` | `<SimpleAlertDialog title="Error" description="..." />` |
| Info callout | `InfoBox` | `<InfoBox variant="info" title="Note">Message</InfoBox>` |
| Toast | `toast()` | `toast.success("Saved!")` |
| Tooltip | `TooltipTrigger` | `<TooltipTrigger content="Help"><Button>?</Button></TooltipTrigger>` |
| Hover info card | `HoverCard` | `<HoverCard><HoverCardTrigger>...</HoverCardTrigger></HoverCard>` |
| Tabs | `Tabs` | `<Tabs><TabsList>...</TabsList></Tabs>` |
| Breadcrumb nav | `Breadcrumbs` | `<Breadcrumbs items={[{ label: 'Home', href: '/' }, ...]} />` |
| Data table | `DataGrid` | `<DataGrid columns={[...]} data={[...]} />` |
| Simple table | `Table` | `<Table><TableHeader>...</TableHeader></Table>` |
| Accordion | `AccordionGroup` | `<AccordionGroup items={[...]} />` |
| Collapsible section | `Collapsible` | `<Collapsible><CollapsibleTrigger>...</CollapsibleTrigger></Collapsible>` |
| Progress bar | `Progress` | `<Progress value={50} />` |
| Circular progress | `ProgressCircular` | `<ProgressCircular value={75} />` |
| Date picker | `DatePicker` | `<DatePicker value={date} onChange={...} />` |
| Date range | `DateRangePicker` | `<DateRangePicker value={range} onChange={...} />` |
| Month picker | `MonthPicker` | `<MonthPicker value={date} onChange={...} />` |
| Month range | `MonthRangePicker` | `<MonthRangePicker value={range} onChange={...} />` |
| Event calendar | `EventCalendar` | `<EventCalendar month={month} renderDayContent={(date, ctx) => ...} />` (subpath: `./event-calendar`) |
| Time picker | `TimePicker` | `<TimePicker value={time} onChange={...} />` |
| Time range | `TimeRangePicker` | `<TimeRangePicker value={range} onChange={...} />` |
| File upload | `FileUploadArea` | `<FileUploadArea onFilesSelected={...} />` |
| Avatar | `Avatar` | `<Avatar variant="userpic" src="url" alt="John" />` |
| Badge/Tag | `Badge` | `<Badge label="Active" color="green" />` |
| Chip | `Chip` | `<Chip label="Tag" />` |
| Popover | `Popover` | `<Popover><PopoverTrigger>...</PopoverTrigger></Popover>` |
| Context menu | `ContextMenu` | `<ContextMenu><ContextMenuTrigger>...</ContextMenuTrigger></ContextMenu>` |
| Dropdown menu | `DropdownMenu` | `<DropdownMenu><DropdownMenuTrigger>...</DropdownMenuTrigger></DropdownMenu>` |
| Slider | `Slider` | `<Slider value={50} onChange={...} />` |
| Slider + input | `SliderInput` | `<SliderInput value={50} onChange={...} />` |
| Range slider | `SliderRange` | `<SliderRange value={[20, 80]} />` |
| Data range slider | `DataRangeSlider` | `<DataRangeSlider data={data} value={[min, max]} />` |
| Sidebar | `Sidebar` | `<Sidebar><SidebarContent>...</SidebarContent></Sidebar>` |
| Sheet | `Sheet` | `<Sheet><SheetContent>...</SheetContent></Sheet>` |
| Drawer | `Drawer` | `<Drawer><DrawerContent>...</DrawerContent></Drawer>` |
| Divider | `Divider` | `<Divider />` or `<Divider orientation="vertical" />` |
| Scroll container | `ScrollArea` | `<ScrollArea className="h-[300px]">...</ScrollArea>` |
| OTP input | `InputOTP` | `<InputOTP maxLength={6} />` |
| Card | `Card` | `<Card><CardHeader>...</CardHeader></Card>` |
| Card grid | `CardGroup` | `<CardGroup columns={3}>...</CardGroup>` |
| Skeleton | `Skeleton` | `<Skeleton width="100%" height={16} />` |
| Status dot | `StatusDot` | `<StatusDot color="green" label="Active" />` |
| Empty state | `EmptyState` | `<EmptyState icon={['system', 'inbox']} title="No data" />` or `<EmptyState illustration={<img src="/img.png" />} variant="fill" size="lg" title="Select a room" />` |
| Stepper | `Stepper` | `<Stepper steps={[...]} activeStep={0} />` |
| Pagination | `Pagination` | `<Pagination totalPages={10} currentPage={1} onChange={...} />` |
| Resizable panels | `ResizablePanelGroup` | `<ResizablePanelGroup><ResizablePanel /></ResizablePanelGroup>` |
| Aspect ratio | `AspectRatio` | `<AspectRatio ratio={16/9}><img ... /></AspectRatio>` |
| Carousel | `Carousel` | `<Carousel><CarouselContent>...</CarouselContent></Carousel>` |
| Drag and drop | `DndContext` | See DnD section |
| Sortable list | `Sortable` | `<Sortable items={ids}><SortableItem id={id}>...</SortableItem></Sortable>` |
| Charts | `BarChart`, `LineChart`, `PieChart`, `DonutChart`, `ComboChart` | See chart section |
| Proportion bar | `ProportionBar` | `<ProportionBar data={[{name,value,color}]} showLegend legendPosition="right" />` |
| Bar list | `BarList` | `<BarList data={[{name,value}]} showCount={5} labelWidth={80} />` |

### Component Categories

#### Form Inputs
`Input` (12 variants: default, password, quantity, tags, addon, shortcut, etc.), `Textarea`, `Select` (default, multi-select, avatar, tags), `Combobox` (default, avatar, tags), `VirtualSelect` (single, multi), `Checkbox`/`CheckboxList`/`CheckboxCard`, `Radio`/`RadioGroup`/`RadioList`/`RadioCard`, `Switch`/`SwitchList`, `Slider`/`SliderRange`/`SliderInput`/`SliderRangeInput`/`DataRangeSlider`/`DataRangeSliderInput`, `DatePicker`/`DateRangePicker`, `MonthPicker`/`MonthRangePicker`, `TimePicker`/`TimeRangePicker`/`TimeInput`/`TimeRangeInput`, `FileUploadArea`/`FileUploadCard`, `InputOTP`, `Form`/`FormField`/`FormControl` (subpath: `./form`)

#### Buttons
`Button`, `LinkButton`, `ControlButton` (icon-only), `FilterButton`, `AvatarButton`, `ButtonGroup`, `MenuButton` (dropdown trigger with icon)

#### Feedback & Overlays
`Dialog`, `AlertDialog`/`SimpleAlertDialog`, `ConfirmDialog`, `InfoBox`, `toast()`/`BlumnaiToaster`, `TooltipTrigger`/`AdvancedTooltip`, `Popover`, `HoverCard`, `Sheet`, `Drawer`

#### Navigation
`Tabs`, `Breadcrumbs`, `Sidebar`, `NavigationMenu`, `Menubar`, `Pagination`

#### Data Display
`DataGrid`, `Table`, `Avatar`/`AvatarGroup`, `Badge`, `Chip`, `Progress`/`ProgressCircular`, `Skeleton`, `Card`/`CardGroup`, `StatusDot`, `EmptyState`, `Stepper`, `EventCalendar` (subpath: `./event-calendar`)

**DataGrid Cell helpers** (subpath: `./table`): `CellText`, `CellBadge`, `CellAvatar`, `CellProgress`, `CellLink`, `CellIcon`, `CellDate`, `CellDateRange`

#### Menus
`ContextMenu`, `DropdownMenu` (with sub-components: `DropdownMenuAvatar`, `DropdownMenuUserbar`, `DropdownMenuButton`, `DropdownMenuSearch`), `Menubar`

#### Layout
`Divider`, `ScrollArea`, `ResizablePanelGroup`, `Collapsible`, `AccordionGroup`, `AspectRatio`, `Carousel`

#### Drag & Drop
`DndContext`, `Draggable`, `Droppable`, `DragHandle`, `DragOverlay`, `Sortable`, `SortableItem`

#### Charts
`BarChart`, `LineChart`, `PieChart`, `DonutChart`, `ComboChart` (mixed bar+line, dual Y-axis), `ProportionBar` (비율 바), `BarList` (수평 바 리스트)

#### Icons
`Icon` (system, arrows, etc.), `BrandIcon` (126+ brands), `FlagIcon` (260 countries), `FileIcon`, `IsometricIcon` (311 3D icons), `CursorIcon`

### Decision Guide

#### Text Input
```
Single line? → Input variant="default"
Password? → Input variant="password"
Number +/-? → Input variant="quantity"
Multiple tags? → Input variant="tags"
With prefix/suffix? → Input variant="addon"
Multi-line? → Textarea
```

#### Selection
```
Single, few options (≤5)? → RadioGroup or Select
Single, many options? → Select (default) — or Combobox if typing is the primary interaction
Multiple? → CheckboxList or Select variant="multi-select"
Typeahead / creatable / live-filter UX? → Combobox (not Select with `searchable`)
Large list (1000+)? → VirtualSelect
On/Off? → Switch
```

**Select vs Combobox:** `Select` is a click-to-open picker (form fields, dropdowns). `Combobox` is an editable input with live autocomplete (search-first, creatable). `Select`'s `searchable` prop is deprecated — use `Combobox` for search-first UX.

#### Button
```
Primary action? → Button buttonStyle="primary"
Secondary? → Button buttonStyle="secondary"
Dangerous? → Button buttonStyle="destructive"
Navigation? → LinkButton
Icon only? → ControlButton
With avatar? → AvatarButton
```

#### Feedback
```
Need user decision? → ConfirmDialog or AlertDialog
Show info inline? → InfoBox
Temporary notification? → toast()
Hover help? → TooltipTrigger
```

---

## Common Patterns

### Login Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button } from '@blumnai-studio/blumnai-design-system';
import { Form, FormField, FormControl } from '@blumnai-studio/blumnai-design-system/form';

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
      <FormField control={form.control} name="email" render={({ field }) => (
        <FormControl>
          <Input variant="default" label="이메일" placeholder="example@email.com" {...field} />
        </FormControl>
      )} />
      <FormField control={form.control} name="password" render={({ field }) => (
        <FormControl>
          <Input variant="password" label="비밀번호" placeholder="비밀번호 입력" {...field} />
        </FormControl>
      )} />
      <Button type="submit" buttonStyle="primary" size="lg" fullWidth>로그인</Button>
    </Form>
  );
}
```

### Form with Select & Checkbox

`FormControl` auto-injects `error` prop into `Input`, `Textarea`, `Select`. Other components get `aria-invalid` and `aria-describedby`.

As of v1.1.26, `Checkbox`/`Switch`/`Radio`/`RadioGroup` natively support `error`/`success`/`caption`/`required` — same API as `Input`/`Textarea`. Pass `error` / `success` as `boolean | string`, and `caption` as plain helper text.

```tsx
<FormField control={form.control} name="role" render={({ field }) => (
  <FormControl>
    <Select label="역할" options={roleOptions} value={field.value} onChange={field.onChange} />
  </FormControl>
)} />

<FormField control={form.control} name="agree" render={({ field, fieldState }) => (
  <Checkbox
    label="약관 동의"
    checked={field.value}
    onCheckedChange={field.onChange}
    error={fieldState.error?.message}
    required
  />
)} />

{/* RadioGroup: error/required at the group level — NOT per-item */}
<FormField control={form.control} name="plan" render={({ field, fieldState }) => (
  <RadioGroup
    value={field.value}
    onValueChange={field.onChange}
    error={fieldState.error?.message}
    caption="나중에 언제든지 변경할 수 있습니다"
    required
  >
    <Radio value="free" label="무료" />
    <Radio value="pro" label="프로" />
  </RadioGroup>
)} />
```

### Confirmation Dialog

```tsx
import { ConfirmDialog, Button } from '@blumnai-studio/blumnai-design-system';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button, Input } from '@blumnai-studio/blumnai-design-system';
import { useState } from 'react';

function EditDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  return (
    <>
      <Button onClick={() => setOpen(true)}>편집</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>프로필 편집</DialogTitle></DialogHeader>
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
import { toast } from '@blumnai-studio/blumnai-design-system';

toast.success('저장되었습니다');
toast.error('오류가 발생했습니다');
toast.warning('주의가 필요합니다');
toast.info('새로운 메시지가 있습니다');
toast.info('삭제됨', { action: { label: '실행취소', onClick: () => handleUndo() } });
```

### FilterButton with Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent, FilterButton, CheckboxList } from '@blumnai-studio/blumnai-design-system';
import { useState } from 'react';

function StatusFilter() {
  const [selected, setSelected] = useState<string[]>([]);
  const statusOptions = [
    { id: 'active', title: '활성', checked: selected.includes('active') },
    { id: 'inactive', title: '비활성', checked: selected.includes('inactive') },
  ];
  return (
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
import { DataGrid } from '@blumnai-studio/blumnai-design-system';
import { CellAvatar, CellBadge } from '@blumnai-studio/blumnai-design-system/table';
import type { ColumnDef } from '@blumnai-studio/blumnai-design-system';

interface User { id: string; name: string; status: 'active' | 'inactive'; }

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: '이름', cell: ({ row }) => <CellAvatar name={row.original.name} showName /> },
  { accessorKey: 'status', header: '상태', cell: ({ getValue }) => (
    <CellBadge label={getValue() === 'active' ? '활성' : '비활성'} color={getValue() === 'active' ? 'green' : 'neutral'} />
  )},
];

function UserTable() {
  const [data] = useState<User[]>([{ id: '1', name: '홍길동', status: 'active' }]);
  return <DataGrid columns={columns} data={data} enableRowSelection />;
}
```

### DataGrid with Server-Side Sorting

`ColumnDef`, `SortingState`, `ColumnFiltersState`, `RowSelectionState`, `OnChangeFn` — all re-exported from the DS.

```tsx
import { DataGrid } from '@blumnai-studio/blumnai-design-system';
import type { ColumnDef, SortingState } from '@blumnai-studio/blumnai-design-system';

function ServerTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const sort = sorting[0];
    fetchUsers({ page, sortBy: sort?.id, sortDir: sort?.desc ? 'desc' : 'asc' })
      .then(({ items, total }) => { setData(items); setTotal(total); });
  }, [sorting, page]);

  return <DataGrid columns={columns} data={data} sorting={sorting} onSortingChange={setSorting} page={page} total={total} limit={10} onPageChange={setPage} />;
}
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@blumnai-studio/blumnai-design-system';

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
import { Input } from '@blumnai-studio/blumnai-design-system';
import { useState } from 'react';

function SearchInput() {
  const [value, setValue] = useState('');
  return (
    <Input variant="default" placeholder="검색..." leadIcon={RiSearchLine}
      value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue('')} />
  );
}
```

### Button Variants

```tsx
import { Button } from '@blumnai-studio/blumnai-design-system';

<Button buttonStyle="primary">Primary</Button>
<Button buttonStyle="secondary">Secondary</Button>
<Button buttonStyle="ghost">Ghost</Button>
<Button buttonStyle="destructive">Destructive</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button leadIcon={RiAddLine}>추가</Button>
<Button loading width={120}>저장 중...</Button>
<Button fullWidth>전체 너비</Button>

// v1.1.26+: color prop (canonical) — use instead of deprecated colorOverride
<Button color="red" buttonStyle="solid">삭제</Button>
<Button color="blue" buttonStyle="ghost">정보</Button>
```

### Async Input Validation (loading + error)

v1.1.26+: `Input`, `Textarea`, and all variants support `loading?: boolean`. Combine with `error`/`success` for async validation.

```tsx
import { Input } from '@blumnai-studio/blumnai-design-system';
import { useState, useEffect } from 'react';

function UsernameInput() {
  const [username, setUsername] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (!username) { setAvailable(null); return; }
    setChecking(true);
    const timer = setTimeout(async () => {
      const result = await checkUsernameAvailability(username);
      setAvailable(result);
      setChecking(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [username]);

  return (
    <Input
      label="사용자명"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      loading={checking}
      error={available === false ? "이미 사용 중인 사용자명입니다" : undefined}
      success={available === true ? "사용 가능합니다" : undefined}
      required
    />
  );
}
```

### Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent, Button } from '@blumnai-studio/blumnai-design-system';

<Popover>
  <PopoverTrigger asChild>
    <span><Button buttonStyle="secondary">설정</Button></span>
  </PopoverTrigger>
  <PopoverContent>
    <div className="padding-16"><p>팝오버 내용</p></div>
  </PopoverContent>
</Popover>

// 애니메이션 커스텀: slide 프리셋 (위→아래 확장) + 400ms
<PopoverContent animation="slide" animationDuration={400}>...</PopoverContent>

// 프리셋: 'default' | 'fade' | 'scale' | 'slide' | 'none'
```

### Combobox with Creatable

```tsx
import { Combobox } from '@blumnai-studio/blumnai-design-system';

<Combobox variant="default" label="프레임워크" options={options} value={value} onChange={setValue}
  creatable createText={(v) => `"${v}" 추가`} onCreate={(newValue) => setOptions([...options, { id: newValue, label: newValue }])} />
```

### HtmlEditor (Rich Text)

```tsx
import { HtmlEditor } from '@blumnai-studio/blumnai-design-system/html-editor';
// Requires: npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-text-align @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-highlight @tiptap/extension-link @tiptap/extension-image @tiptap/extension-placeholder

// Uncontrolled (recommended) — read HTML via ref
const editorRef = useRef<HtmlEditorRef>(null);
const handleSave = () => { const html = editorRef.current?.getHTML() || ''; };

<HtmlEditor
  ref={editorRef}
  defaultValue={savedHtml}
  onChange={(html) => console.log(html)}
  placeholder="게시글을 작성해주세요"
  label="내용"
  required
  imageUpload={{
    maxSize: 3 * 1024 * 1024,
    handler: async (file) => {
      const base64 = await toBase64(file);
      return { url: base64 };
    },
  }}
  onContentSizeChange={(bytes) => setSize(bytes)}
  maxContentSize={5 * 1024 * 1024}
  minHeight={300}
  maxHeight={500}
/>

// Controlled — external state drives editor content
<HtmlEditor value={html} onChange={setHtml} />

// Subset features only
<HtmlEditor features={['bold', 'italic', 'link', 'history']} />

// Compact toolbar (alignment as dropdown)
<HtmlEditor compactToolbar />
```

Features: bold, italic, underline, strikethrough, heading (H1-H6), blockquote, codeBlock, bulletList, orderedList, textAlign, colorPicker (text + background), link (title + URL), image (file upload + URL), removeFormat, history (undo/redo), codeView (HTML source dialog). All controlled via `features` prop array. Outputs standard HTML string — compatible with existing Draft.js/stateToHTML data.

### Sidebar Page Layout

```tsx
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu,
  SidebarMenuItem, SidebarFooter, SidebarUserbar, SidebarInset } from '@blumnai-studio/blumnai-design-system';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader><img src="/logo.svg" alt="Logo" /></SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem label="대시보드" icon={['system', 'home-2']} isActive />
            <SidebarMenuItem label="프로젝트" icon={['system', 'folder']} badge="3" />
            <SidebarMenuItem variant="divider" />
            <SidebarMenuItem variant="children" label="도구">
              <SidebarMenuItem label="분석" icon={['system', 'chart']} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarUserbar variant="variant2" name="홍길동" email="hong@email.com" avatarInitials="홍" />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
```

### Form with Async Submit

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, toast } from '@blumnai-studio/blumnai-design-system';
import { Form, FormField, FormControl } from '@blumnai-studio/blumnai-design-system/form';

const schema = z.object({ name: z.string().min(1, '필수 항목입니다') });

function AsyncForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { name: '' } });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try { await saveData(values); toast.success('저장되었습니다'); }
    catch { toast.error('저장에 실패했습니다'); }
    finally { setIsSubmitting(false); }
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

> ⚠️ **v2.0.0 will remove the tuple-form API.** `iconType={['cat','name']}`, `leadIcon={[...]}`, `CellIcon.iconType` and all tuple variants will be removed. Run `npx blumnai-icon-codemod ./src` now. v1.10.x emits dev-console warnings per unique tuple. See [MIGRATION.md](./MIGRATION.md#v200--icon-tuple-form-제거).

The DS provides two equivalent APIs for `<Icon>`. **Prefer direct-import for tree-shaking** — bundles only the icons you actually use (~1KB per icon vs the legacy ~50-200KB per-category chunk).

### Direct-import API (recommended)

```tsx
import { Icon, RiCheckLine, RiAddFill, RiCloseLine, RiHeartFill } from '@blumnai-studio/blumnai-design-system';

<Icon icon={RiCheckLine} size={16} color="default" />
<Icon icon={RiAddFill} size={20} color="informative" />
<Icon icon={RiHeartFill} size={24} color="destructive" />
```

The `icon` prop accepts any `@remixicon/react` component (`Ri*Line` / `Ri*Fill`) plus DS-custom components. All Remixicon icons are re-exported from the DS — you don't need to install `@remixicon/react` separately.

**⚠️ Anti-pattern** — never pass an inline component:
```tsx
// BAD — new function every render, breaks memoization
<Icon icon={() => <RiCheckLine />} />

// BAD — variable assigned in render scope
<Icon icon={React.memo(RiCheckLine)} />

// GOOD — module-level import, stable reference
<Icon icon={RiCheckLine} />
```

### Icon props on every DS component (`leadIcon`, `tailIcon`, `icon`, ...)

Same API surface — every icon-accepting prop in the DS (Button, Input, Chip, Badge, Select, Tabs, Sidebar, Dropdown, Menubar, etc.) accepts the component form:

```tsx
import { Button, Input, Chip, RiAddLine, RiSearchLine, RiHeartFill } from '@blumnai-studio/blumnai-design-system';

<Button leadIcon={RiAddLine}>추가</Button>
<Input leadIcon={RiSearchLine} placeholder="검색..." />
<Chip icon={RiHeartFill} label="찜" />
```

The legacy tuple form (`leadIcon={['system', 'add']}`) still works but emits a dev-console deprecation warning per unique tuple with the exact `Ri*` replacement to use. Production builds strip the warning.

### Dynamic-string API (back-compat, deprecated — removed in v2.0.0)

> ⚠️ **Removed in v2.0.0.** Migrate via `npx blumnai-icon-codemod ./src`. Existing code using `iconType` continues to work in v1.10.x with dev console warnings.

Behind the scenes the registry lazy-loads `@remixicon/react` once and resolves names from there. **This causes a ~2.5MB async chunk in every consumer build** — direct-import API avoids it entirely.

```tsx
import { Icon } from '@blumnai-studio/blumnai-design-system';

<Icon iconType={['system', 'check']} />
<Icon iconType={['system', 'close']} size={24} />
<Icon iconType={['system', 'heart']} isFill />
```

**When to use which:** new code → direct-import (tree-shake, no Suspense flicker on first paint). Existing code → keep dynamic-string until you migrate, or run the codemod.

### Codemod

`blumnai-icon-codemod` mechanically converts both `<Icon iconType={...}>` and `<Button leadIcon={...}>` / `<Input tailIcon={...}>` / `<Chip icon={...}>` / `buttonLeadIcon` / `buttonTailIcon` patterns, adding the right `Ri*` imports automatically.

```bash
npx blumnai-icon-codemod --dry --print ./src   # preview
npx blumnai-icon-codemod ./src                 # apply
```

Static literal tuples only; dynamic values (variables, ternaries, function calls) are left alone and continue to work via dynamic-string back-compat.

### Other icon components (unchanged)

```tsx
<BrandIcon brandType="github" size={24} />
<FlagIcon country="south korea" size={24} />
<FileIcon fileType="pdf" size="lg" />
<IsometricIcon iconType="rocketlaunch" view="top" fillColor="default" strokeColor="accent" />
<CursorIcon cursorType="pointer" />
```

These have their own component systems (not Remixicon-derived) and aren't affected by the migration.

**Preloading:** `preloadIconCategory('system')` or `preloadIcons([['system', 'check']])` — both now warm up `@remixicon/react` (per-category preload no longer meaningful since Remixicon ships as a single bundle).

**Categories (20, full Remixicon 4.9 manifest):** `arrows`, `buildings`, `business`, `communication`, `design`, `development`, `device`, `document`, `editor`, `finance`, `food`, `game & sports`, `health & medical`, `logos`, `map`, `media`, `others`, `system`, `user & faces`, `weather`.

**Common system icons:** `add`, `check`, `close`, `search`, `settings`, `menu`, `more`, `delete-bin`, `download`, `upload`, `eye`, `eye-off`, `filter`, `star`, `share`, `lock`, `information`, `error-warning`, `time`, `refresh`, `external-link`

> Full icon list browsable via Storybook (`Components / Icons / Icon / Category`). For TS prop types, read `.types.ts` files in `src/components/icons/`.

---

## Key Type Definitions

> Full types in `.types.ts` files. These are the most commonly needed:

```ts
type IconType = [category: string, name: string];
type IconTypeWithFill = IconType | [...IconType, boolean];
type DateRange = { from: Date; to: Date };
interface TimeValue { hour: number; minute: number; second?: number; }
interface TimeRange { start?: TimeValue; end?: TimeValue; }
type ChartDataPoint = { [key: string]: string | number };
type ChartConfig = Record<string, { label: string; color: string; icon?: ReactNode }>;
interface ChartAxisConfig { dataKey: string; label?: string; domain?: [number, number] | 'auto'; tickFormatter?: (value: string | number) => string; tickCount?: number; show?: boolean; }
type Placement = 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end';
```

---

## Hooks

### useKeyboardShortcut

```tsx
import { useKeyboardShortcut } from '@blumnai-studio/blumnai-design-system';

useKeyboardShortcut('⌘+K', () => console.log('Triggered!'), { enabled: true, preventDefault: true });
```

Options: `enabled` (boolean), `ignoreInputFields` (boolean), `preventDefault` (boolean)

> Browser-reserved shortcuts (⌘W, ⌘N, ⌘T, ⌘Q, ⌘L) cannot be overridden.

### useDebouncedValue

```tsx
import { useDebouncedValue } from '@blumnai-studio/blumnai-design-system';

const [query, setQuery] = useState('');
const debouncedQuery = useDebouncedValue(query, 300);

useEffect(() => {
  if (debouncedQuery) void fetchSearchResults(debouncedQuery);
}, [debouncedQuery]);
```

Signature: `useDebouncedValue<T>(value: T, delay?: number): T` (default `delay=300`)

### useSidebar

Must be inside `SidebarProvider`. Returns: `state` ('expanded'|'collapsed'), `open`, `setOpen`, `toggleSidebar`, `isMobile`, `collapsible`.

---

## CSS Utility Classes

**Do not use default Tailwind classes** for typography or spacing. Standard Tailwind layout classes (`flex`, `grid`, `items-center`, etc.) are fine.

| Category | DS Classes |
|----------|-----------|
| Font size | `size-xs`(12), `size-sm`(14), `size-md`(16), `size-lg`(18), `size-xl`(20), `size-2xl`(24) |
| Line height | `line-height-leading-none`(1), `-3`(12px), `-4`(16px), `-5`(20px), `-6`(24px), `-7`(28px), `-8`(32px) |
| Letter spacing | `letter-spacing-tracking-tighter`(-1.2px), `-tight`(-0.8px), `-normal`(-0.6px), `-wide`(0.4px) |
| Font family | `font-body`, `font-headline`, `font-quote`, `font-code` |
| Padding | `padding-{0,1,2,4,6,8,10,12,16,20,24}`, `padding-x-*`, `padding-y-*` |
| Width/Height | `width-{2,8,10,14,16,24,28,32,36,40}`, `height-{2,8,14,16,24,28,32,36,40}` |
| Gap | `ds-gap-{0,1,2,4,6,8,10,12,16,20,24,32}` |
| Colors | `text-{default,subtle,muted,hint}`, `bg-{default,subtle,muted,card}`, `border-{default,darker,strong}` |
| Radius | `rounded-{none,2xs,xs,sm,md,lg,xl,2xl,3xl,full}` |

---

## Accessibility & SSR

- All interactive components built on Radix UI — proper ARIA attributes included
- Keyboard: `Tab` to focus, `Enter`/`Space` to activate, `Escape` to close overlays
- Focus trapped in Dialog, AlertDialog, Sheet, Drawer, Popover
- Form components auto-connect `aria-describedby` to caption/error, set `aria-required`
- All components include `"use client"` — safe for Next.js Server Components
- CSS importable in server components: `import '@blumnai-studio/blumnai-design-system/styles'`

## Theme System

4 themes via `data-theme` attribute: default (Light-A), `"dark"`, `"theme-b-light"`, `"theme-b-dark"`.

```tsx
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.removeAttribute('data-theme'); // reset to default
```

Themes can be scoped: `<div data-theme="dark">...</div>`

## Chart CSS Variables

```css
--chart-1: #437DFC; --chart-2: #34D399; --chart-3: #FBBF24; --chart-4: #F87171;
--chart-5: #A78BFA; --chart-6: #FB923C; --chart-7: #38BDF8; --chart-8: #E879F9;
```

Use in config: `color: 'var(--chart-1)'`

## z-index Stacking

| Layer | z-index |
|-------|---------|
| Tooltips, Popovers, Dropdowns, Sheets, Drawers, Dialogs | 50 |
| Toasts | 100 |
