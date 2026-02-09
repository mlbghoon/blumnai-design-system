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
toast({ title: '저장되었습니다', variant: 'success' });

// Error
toast({ title: '오류가 발생했습니다', variant: 'error' });

// Warning
toast({ title: '주의가 필요합니다', variant: 'warning' });

// Info
toast({ title: '알림', description: '새로운 메시지가 있습니다', variant: 'info' });

// With action
toast({
  title: '삭제됨',
  description: '항목이 삭제되었습니다',
  action: { label: '실행취소', onClick: () => console.log('Undo') },
});
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
        description={row.original.email}
      />
    ),
  },
  {
    accessorKey: 'email',
    header: '이메일',
    cell: ({ getValue }) => <CellText>{getValue() as string}</CellText>,
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
    { id: '2', name: '김철수', email: 'kim@email.com', status: 'inactive' },
  ]);

  return (
    <DataGrid
      columns={columns}
      data={data}
      enableSorting
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
import { Tooltip, Button } from '@blumnai/design-system';

<Tooltip content="도움말 텍스트입니다">
  <Button buttonStyle="secondary">?</Button>
</Tooltip>
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
import { FileUpload } from '@blumnai/design-system';

function UploadExample() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload
      accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
      maxFiles={5}
      maxSize={5 * 1024 * 1024} // 5MB
      onFilesChange={setFiles}
    />
  );
}
```

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
<FilterButton selected={hasFilters} count={filterCount}>
  필터
</FilterButton>

// AvatarButton
<AvatarButton src="/avatar.jpg" name="홍길동" showDropdown />
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
