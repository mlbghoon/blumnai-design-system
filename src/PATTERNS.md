# Common UI Patterns

> Copy-paste ready patterns for common UI scenarios.

---

## Forms

### Login Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormControl } from '@blumnai/design-system';
import { Input } from '@blumnai/design-system';
import { Button } from '@blumnai/design-system';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log(values);
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-16 max-w-sm">
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

### Registration Form with Password Strength

```tsx
const registrationSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상'),
  email: z.string().email('유효한 이메일 필요'),
  password: z.string().min(8, '8자 이상 필요'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

// In form:
<FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormControl>
      <Input
        variant="password"
        label="비밀번호"
        showStrength
        autoCalculateStrength
        {...field}
      />
    </FormControl>
  )}
/>
```

### Form with Checkbox Agreement

```tsx
import { FormItem, FormError, Checkbox } from '@blumnai/design-system';

const schema = z.object({
  terms: z.boolean().refine((val) => val === true, '동의가 필요합니다'),
});

// In form:
<FormField
  control={form.control}
  name="terms"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <Checkbox
          label="이용약관에 동의합니다"
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormError />
    </FormItem>
  )}
/>
```

### Form with Select

```tsx
import { Select } from '@blumnai/design-system';

const options = [
  { id: 'developer', label: '개발자' },
  { id: 'designer', label: '디자이너' },
  { id: 'pm', label: 'PM' },
];

<FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormControl>
      <Select
        variant="default"
        label="역할"
        placeholder="선택하세요"
        options={options}
        value={field.value}
        onChange={field.onChange}
      />
    </FormControl>
  )}
/>
```

---

## Dialogs

### Simple Confirmation Dialog

```tsx
import { ConfirmDialog, Button } from '@blumnai/design-system';
import { useState } from 'react';

function DeleteConfirmation() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Deleted!');
    setOpen(false);
  };

  return (
    <>
      <Button buttonStyle="destructive" onClick={() => setOpen(true)}>
        삭제
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="정말 삭제하시겠습니까?"
        description="이 작업은 되돌릴 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="destructive"
        onConfirm={handleConfirm}
      />
    </>
  );
}
```

### Simple Alert Dialog

```tsx
import {
  SimpleAlertDialog,
  Button,
} from '@blumnai/design-system';
import { useState } from 'react';

function AlertExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>알림 표시</Button>
      <SimpleAlertDialog
        open={open}
        onOpenChange={setOpen}
        title="주의가 필요합니다"
        description="이 작업을 진행하면 일부 데이터가 변경됩니다."
        confirmLabel="확인"
        onConfirm={() => {
          console.log('Confirmed');
          setOpen(false);
        }}
      />
    </>
  );
}
```

### Full Dialog with Form

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
} from '@blumnai/design-system';

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
            <DialogDescription>
              이름을 변경하세요.
            </DialogDescription>
          </DialogHeader>

          <div className="padding-y-16">
            <Input
              variant="default"
              label="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button buttonStyle="secondary" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button buttonStyle="primary" onClick={() => setOpen(false)}>
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

---

## Toasts

### Basic Toast

```tsx
import { toast } from '@blumnai/design-system';

// Success
toast.success('저장되었습니다');

// Error
toast.error('오류가 발생했습니다');

// Warning
toast.warning('주의가 필요합니다');

// Info
toast.info('새로운 메시지가 있습니다');

// With action
toast.info('삭제됨', { label: '실행취소' });

// With duration
toast.success('저장됨', { duration: 5000 });
```

---

## Tables

### DataGrid with Sorting and Selection

```tsx
import { useState } from 'react';
import { DataGrid, CellText, CellBadge, CellAvatar } from '@blumnai/design-system';
import type { ColumnDef } from '@blumnai/design-system';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: '이름',
    cell: ({ row }) => (
      <CellAvatar
        name={row.original.name}
        src={row.original.avatar}
        showName
      />
    ),
  },
  {
    accessorKey: 'email',
    header: '이메일',
    cell: ({ getValue }) => <CellText value={getValue() as string} />,
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
    { id: '2', name: '김철수', email: 'kim@email.com', status: 'inactive' },
  ]);

  return (
    <DataGrid
      columns={columns}
      data={data}
      enableRowSelection
      onRowSelectionChange={(selection) => console.log(selection)}
    />
  );
}
```

---

## Navigation

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@blumnai/design-system';

function TabsExample() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="security">보안</TabsTrigger>
        <TabsTrigger value="notifications">알림</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <p>계정 설정 내용</p>
      </TabsContent>
      <TabsContent value="security">
        <p>보안 설정 내용</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p>알림 설정 내용</p>
      </TabsContent>
    </Tabs>
  );
}
```

### Breadcrumbs

```tsx
import { Breadcrumbs } from '@blumnai/design-system';

function BreadcrumbsExample() {
  const items = [
    { label: '홈', href: '/' },
    { label: '설정', href: '/settings' },
    { label: '프로필', href: '/settings/profile' },
  ];

  return <Breadcrumbs items={items} />;
}
```

---

## Selection

### Checkbox List

```tsx
import { CheckboxList } from '@blumnai/design-system';

const items = [
  { id: 'email', label: '이메일 알림' },
  { id: 'sms', label: 'SMS 알림' },
  { id: 'push', label: '푸시 알림' },
];

function NotificationSettings() {
  const [selected, setSelected] = useState<string[]>(['email']);

  return (
    <CheckboxList
      items={items}
      value={selected}
      onChange={setSelected}
    />
  );
}
```

### Radio List

```tsx
import { RadioList } from '@blumnai/design-system';

const options = [
  { id: 'light', label: '라이트 모드' },
  { id: 'dark', label: '다크 모드' },
  { id: 'system', label: '시스템 설정' },
];

function ThemeSelector() {
  const [theme, setTheme] = useState('system');

  return (
    <RadioList
      items={options}
      value={theme}
      onChange={setTheme}
    />
  );
}
```

### Switch List

```tsx
import { SwitchList } from '@blumnai/design-system';

const settings = [
  { id: 'marketing', label: '마케팅 알림', description: '프로모션 정보 수신' },
  { id: 'updates', label: '업데이트 알림', description: '새 기능 알림 수신' },
];

function SettingsSwitches() {
  const [enabled, setEnabled] = useState<string[]>(['updates']);

  return (
    <SwitchList
      items={settings}
      value={enabled}
      onChange={setEnabled}
    />
  );
}
```

---

## Inputs

### Input with Clear Button

```tsx
import { Input } from '@blumnai/design-system';

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

### Input with Addon

```tsx
<Input
  variant="addon"
  label="웹사이트"
  prefix="https://"
  suffix=".com"
  placeholder="example"
/>
```

### Quantity Input

```tsx
import { Input } from '@blumnai/design-system';

function QuantitySelector() {
  const [qty, setQty] = useState(1);

  return (
    <Input
      variant="quantity"
      label="수량"
      value={qty}
      onChange={setQty}
      min={1}
      max={99}
    />
  );
}
```

### Tags Input

```tsx
import { Input } from '@blumnai/design-system';

function TagsEditor() {
  const [tags, setTags] = useState(['react', 'typescript']);

  return (
    <Input
      variant="tags"
      label="태그"
      tags={tags}
      onTagsChange={setTags}
      placeholder="태그 입력 후 Enter"
    />
  );
}
```

---

## Feedback

### Tooltip

```tsx
import { TooltipTrigger, Button } from '@blumnai/design-system';

<TooltipTrigger content="도움말 텍스트입니다">
  <Button buttonStyle="secondary">?</Button>
</TooltipTrigger>
```

### Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent, Button } from '@blumnai/design-system';

function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span>
          <Button buttonStyle="secondary">설정</Button>
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <div className="padding-16">
          <p>팝오버 내용</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

---

## File Upload

```tsx
import { FileUploadArea } from '@blumnai/design-system';

function UploadExample() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUploadArea
      accept="image/*,.png,.jpg,.jpeg"
      maxFiles={5}
      maxSize={5 * 1024 * 1024} // 5MB
      onFilesSelected={setFiles}
    />
  );
}
```

---

## Keyboard Shortcuts

### Button with Keyboard Binding

The `shortcut` prop on Button both renders a visual badge and automatically binds a global `keydown` listener. When the user presses the key combo, `onClick` fires.

```tsx
import { Button } from '@blumnai/design-system';

// Single key — ignored when focus is in an input field
<Button shortcut="/" onClick={() => openSearch()}>Search</Button>

// Modifier shortcut — always fires regardless of focus
<Button shortcut="⌘K" onClick={() => openCommandPalette()}>Command</Button>
<Button shortcut="⌘E" onClick={() => exportData()}>Export</Button>
<Button shortcut="⌘⇧K" onClick={() => newPanel()}>New Panel</Button>

// Disabled/loading buttons ignore shortcuts
<Button shortcut="⌘K" disabled onClick={handler}>Won't fire</Button>
<Button shortcut="⌘K" loading onClick={handler}>Won't fire</Button>
```

### Standalone Hook (without Button)

```tsx
import { useKeyboardShortcut } from '@blumnai/design-system';

function CommandPalette() {
  const [open, setOpen] = useState(false);

  useKeyboardShortcut('⌘K', () => setOpen(true));

  return open ? <Dialog>...</Dialog> : null;
}
```

### Browser-Reserved Shortcuts

브라우저가 예약한 단축키는 `preventDefault()`로 차단할 수 없습니다.
이러한 단축키는 브라우저가 JavaScript에 이벤트를 전달하기 전에 처리합니다.

**사용을 피해야 하는 단축키:**

| Shortcut | Browser action |
|----------|---------------|
| `⌘W` / `Ctrl+W` | 탭 닫기 |
| `⌘N` / `Ctrl+N` | 새 창 |
| `⌘⇧N` / `Ctrl+Shift+N` | 시크릿 창 |
| `⌘T` / `Ctrl+T` | 새 탭 |
| `⌘Q` / `Ctrl+Q` | 브라우저 종료 |
| `⌘L` / `Ctrl+L` | 주소창 포커스 |

**안전한 단축키 예시:** `/`, `⌘K`, `⌘J`, `⌘E`, `⌘B`, `⌘⇧K`, `Escape`

---

## Button Variants

```tsx
import { Button, Icon } from '@blumnai/design-system';

// Styles
<Button buttonStyle="primary">Primary</Button>
<Button buttonStyle="secondary">Secondary</Button>
<Button buttonStyle="ghost">Ghost</Button>
<Button buttonStyle="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leadIcon={['system', 'add']}>추가</Button>
<Button tailIcon={['system', 'arrow-right']}>다음</Button>

// Loading
<Button loading>저장 중...</Button>

// Full width
<Button fullWidth>전체 너비</Button>

// FilterButton
<FilterButton selected={hasFilters} label="필터" />

// AvatarButton
<AvatarButton avatar="/avatar.jpg" label="홍길동" />
```

---

## Time Picker

### Basic Time Picker

```tsx
import { useState } from 'react';
import { TimePicker } from '@blumnai/design-system';
import type { TimeValue } from '@blumnai/design-system';

function TimePickerExample() {
  const [time, setTime] = useState<TimeValue | undefined>();

  return (
    <TimePicker
      label="시간 선택"
      value={time}
      onChange={setTime}
      timeFormat="24h"
    />
  );
}
```

### Time Range Picker

```tsx
import { useState } from 'react';
import { TimeRangePicker } from '@blumnai/design-system';
import type { TimeRange } from '@blumnai/design-system';

function TimeRangeExample() {
  const [range, setRange] = useState<TimeRange | undefined>();

  return (
    <TimeRangePicker
      label="근무 시간"
      value={range}
      onChange={setRange}
      showQuickSelect
    />
  );
}
```

---

## OTP Input

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@blumnai/design-system';

function OTPExample() {
  const [value, setValue] = useState('');

  return (
    <InputOTP maxLength={6} value={value} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
```

---

## Drawer & Sheet

### Bottom Drawer

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, Button } from '@blumnai/design-system';

function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>메뉴 열기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>설정</DrawerTitle>
        </DrawerHeader>
        <div className="padding-16">
          <p>드로어 내용</p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

### Side Sheet

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, Button } from '@blumnai/design-system';

function SheetExample() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>상세 보기</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>상세 정보</SheetTitle>
        </SheetHeader>
        <div className="padding-16">
          <p>시트 내용</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

---

## Slider Variants

### Basic Slider

```tsx
import { Slider } from '@blumnai/design-system';

function SliderExample() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
}
```

### Slider with Input

```tsx
import { SliderInput } from '@blumnai/design-system';

function SliderInputExample() {
  const [value, setValue] = useState(50);

  return (
    <SliderInput
      label="볼륨"
      value={value}
      onChange={setValue}
      min={0}
      max={100}
    />
  );
}
```

### Range Slider

```tsx
import { SliderRange, SliderRangeInput } from '@blumnai/design-system';

function RangeExample() {
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <SliderRangeInput
      label="가격 범위"
      value={range}
      onChange={setRange}
      min={0}
      max={1000}
    />
  );
}
```

### Data Range Slider (with Distribution Chart)

```tsx
import { DataRangeSliderInput } from '@blumnai/design-system';

function DataRangeExample() {
  const data = [10, 25, 40, 30, 55, 45, 60, 50, 35, 20];
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <DataRangeSliderInput
      label="데이터 필터"
      data={data}
      value={range}
      onChange={setRange}
    />
  );
}
```

---

## Carousel

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators } from '@blumnai/design-system';

function CarouselExample() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <Carousel>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="padding-16 bg-subtle rounded-md">
              {item}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators variant="dot" />
    </Carousel>
  );
}
```

---

## Hover Card

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent, Avatar } from '@blumnai/design-system';

function HoverCardExample() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer underline">@username</span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-12">
          <Avatar src="/avatar.jpg" name="홍길동" />
          <div>
            <p className="font-medium">홍길동</p>
            <p className="text-muted size-sm">개발자</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

---

## Navigation Menu

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@blumnai/design-system';

function NavMenuExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>제품</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="padding-16">
              <NavigationMenuLink href="/products/a">제품 A</NavigationMenuLink>
              <NavigationMenuLink href="/products/b">제품 B</NavigationMenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">소개</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

---

## Resizable Panels

```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@blumnai/design-system';

function ResizableExample() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25}>
        <div className="padding-16">사이드바</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="padding-16">메인 컨텐츠</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

---

## Aspect Ratio

```tsx
import { AspectRatio } from '@blumnai/design-system';

function AspectRatioExample() {
  return (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="/image.jpg"
          alt="Image"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  );
}
```

---

## Sidebar Navigation

```tsx
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from '@blumnai/design-system';

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem variant="label" label="메뉴" />
          <SidebarMenuItem
            icon={['system', 'dashboard-horizontal']}
            label="대시보드"
            isActive
          />
          <SidebarMenuItem
            icon={['user', 'group']}
            label="사용자"
            badge="12"
          />
          <SidebarMenuItem
            icon={['system', 'settings']}
            label="설정"
          />
          <SidebarMenuItem variant="divider" />
          <SidebarMenuItem
            icon={['system', 'logout-box']}
            label="로그아웃"
          />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
```

---

## Dashboard Layout

```tsx
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from '@blumnai/design-system';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem icon={['system', 'dashboard-horizontal']} label="대시보드" isActive />
            <SidebarMenuItem icon={['business', 'bar-chart-box']} label="분석" />
            <SidebarMenuItem icon={['system', 'settings']} label="설정" />
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 overflow-auto padding-24">
        {children}
      </main>
    </div>
  );
}
```

---

## Settings Page

```tsx
import { useState } from 'react';
import { Input, Switch, SwitchList, Button, Divider } from '@blumnai/design-system';

function SettingsPage() {
  const [name, setName] = useState('홍길동');
  const [settings, setSettings] = useState([
    { id: 'email', title: '이메일 알림', description: '중요한 업데이트 수신', checked: true },
    { id: 'push', title: '푸시 알림', description: '실시간 알림 수신', checked: false },
  ]);

  return (
    <div className="max-w-lg flex flex-col gap-24">
      <section>
        <h2 className="font-headline size-lg font-bold text-default">프로필</h2>
        <div className="flex flex-col gap-16 padding-y-16">
          <Input variant="default" label="이름" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </section>

      <Divider />

      <section>
        <h2 className="font-headline size-lg font-bold text-default">알림 설정</h2>
        <div className="padding-y-16">
          <SwitchList
            items={settings}
            onItemChange={(id, checked) => {
              setSettings(prev => prev.map(s => s.id === id ? { ...s, checked } : s));
            }}
          />
        </div>
      </section>

      <Button buttonStyle="primary">저장</Button>
    </div>
  );
}
```

---

## Error & Empty States

```tsx
import { Skeleton } from '@blumnai/design-system';
import { Icon } from '@blumnai/design-system';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 padding-24">
      <Icon iconType={['system', 'inbox']} size={48} color="var(--text-muted)" />
      <p className="font-body size-md text-muted">데이터가 없습니다</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-12 padding-16">
      <Skeleton width="60%" height={20} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="80%" height={16} />
    </div>
  );
}
```

---

## Responsive Layout

```tsx
import { useIsMobile } from '@blumnai/design-system';
import { Sheet, SheetContent, Drawer, DrawerContent } from '@blumnai/design-system';

function ResponsivePanel({ open, onOpenChange, children }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">{children}</SheetContent>
    </Sheet>
  );
}
```

---

## Loading States

```tsx
import { Skeleton, Card, CardHeader, CardContent } from '@blumnai/design-system';

function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton width={200} height={24} />
        <Skeleton width={300} height={16} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          <Skeleton width="100%" height={16} />
          <Skeleton width="100%" height={16} />
          <Skeleton width="60%" height={16} />
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## DataGrid with Filtering

```tsx
import { useState } from 'react';
import { DataGrid, FilterButton } from '@blumnai/design-system';
import type { ColumnDef } from '@blumnai/design-system';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

const columns: ColumnDef<Product>[] = [
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'category', header: '카테고리' },
  { accessorKey: 'price', header: '가격' },
];

function ProductTable() {
  const [data] = useState<Product[]>([
    { id: '1', name: '제품 A', category: '전자', price: 10000 },
    { id: '2', name: '제품 B', category: '의류', price: 25000 },
  ]);

  return (
    <DataGrid
      columns={columns}
      data={data}
      pagination
      limit={10}
    />
  );
}
```

---

## DatePicker with Presets

```tsx
import { useState } from 'react';
import { DatePicker, DateRangePicker } from '@blumnai/design-system';

function DatePickerWithPresets() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <DatePicker
      label="날짜 선택"
      value={date}
      onChange={setDate}
      showQuickPresets
      presets={[
        { label: '오늘', getValue: () => new Date() },
        { label: '어제', getValue: () => { const d = new Date(); d.setDate(d.getDate() - 1); return d; } },
        { label: '일주일 전', getValue: () => { const d = new Date(); d.setDate(d.getDate() - 7); return d; } },
      ]}
    />
  );
}
```

---

## Sheet with Form

```tsx
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, Button, Input } from '@blumnai/design-system';

function EditSheet() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <Button onClick={() => setOpen(true)}>편집</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>프로필 편집</SheetTitle>
          </SheetHeader>
          <div className="padding-16 flex flex-col gap-16">
            <Input variant="default" label="이름" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <SheetFooter>
            <Button buttonStyle="secondary" onClick={() => setOpen(false)}>취소</Button>
            <Button buttonStyle="primary" onClick={() => setOpen(false)}>저장</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
```

---

## Searchable Select (Combobox)

```tsx
import { useState } from 'react';
import { Combobox } from '@blumnai/design-system';

const options = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte' },
];

function SearchableSelect() {
  const [value, setValue] = useState('');

  return (
    <Combobox
      label="프레임워크"
      placeholder="검색..."
      options={options}
      value={value}
      onChange={setValue}
    />
  );
}
```

---

## RadioCard / CheckboxCard

```tsx
import { useState } from 'react';
import { RadioGroup, RadioCard, CheckboxCard } from '@blumnai/design-system';

function PlanSelector() {
  const [plan, setPlan] = useState('basic');

  return (
    <RadioGroup value={plan} onValueChange={setPlan} className="flex flex-col gap-12">
      <RadioCard
        value="basic"
        title="Basic"
        description="개인 사용에 적합"
      />
      <RadioCard
        value="pro"
        title="Pro"
        description="팀 협업에 적합"
      />
      <RadioCard
        value="enterprise"
        title="Enterprise"
        description="대규모 조직에 적합"
      />
    </RadioGroup>
  );
}

function FeatureSelector() {
  const [features, setFeatures] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-12">
      <CheckboxCard
        title="알림"
        description="이메일 및 푸시 알림 수신"
        checked={features.includes('notifications')}
        onCheckedChange={(checked) => {
          setFeatures(prev => checked
            ? [...prev, 'notifications']
            : prev.filter(f => f !== 'notifications')
          );
        }}
      />
      <CheckboxCard
        title="분석"
        description="사용 통계 및 리포트"
        checked={features.includes('analytics')}
        onCheckedChange={(checked) => {
          setFeatures(prev => checked
            ? [...prev, 'analytics']
            : prev.filter(f => f !== 'analytics')
          );
        }}
      />
    </div>
  );
}
```

---

## Charts

```tsx
import { BarChart, LineChart } from '@blumnai/design-system';

const data = [
  { month: '1월', revenue: 4000, expenses: 2400 },
  { month: '2월', revenue: 3000, expenses: 1398 },
  { month: '3월', revenue: 5000, expenses: 3200 },
];

const config = {
  revenue: { label: '매출', color: 'var(--chart-1)' },
  expenses: { label: '비용', color: 'var(--chart-2)' },
};

function BarChartExample() {
  return (
    <BarChart
      data={data}
      config={config}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'revenue' }}
      height={300}
      showLegend
    />
  );
}

function LineChartExample() {
  return (
    <LineChart
      data={data}
      config={config}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ dataKey: 'revenue' }}
      dataKeys={['revenue', 'expenses']}
      height={300}
      showArea
      showLegend
    />
  );
}
```
