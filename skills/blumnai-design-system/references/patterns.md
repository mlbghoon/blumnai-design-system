# Common Patterns

> Copy-paste patterns for `@mbisolution/blumnai-design-system`

## Login Form (with validation)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormControl, Input, Button } from '@mbisolution/blumnai-design-system';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
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
            <Input variant="default" label="Email" placeholder="you@example.com" {...field} />
          </FormControl>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormControl>
            <Input variant="password" label="Password" placeholder="Enter password" {...field} />
          </FormControl>
        )}
      />
      <Button type="submit" buttonStyle="primary" size="lg" fullWidth>
        Log In
      </Button>
    </Form>
  );
}
```

## Confirmation Dialog

```tsx
import { ConfirmDialog, Button } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

function DeleteConfirmation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button buttonStyle="destructive" onClick={() => setOpen(true)}>Delete</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Are you sure?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}
```

## Dialog with Form

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button, Input } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

function EditDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="padding-y-16">
            <Input variant="default" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <DialogFooter>
            <Button buttonStyle="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button buttonStyle="primary" onClick={() => setOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

## Toast Notifications

```tsx
import { toast } from '@mbisolution/blumnai-design-system';

// Success
toast.success('Saved successfully');

// Error
toast.error('Something went wrong');

// Warning
toast.warning('Attention needed');

// Info
toast.info('You have a new notification');

// With options
toast.success('Saved', { duration: 5000 });

// With action label
toast.info('Deleted', { label: 'Undo' });
```

## Data Table with Sorting & Selection

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
    header: 'Name',
    cell: ({ row }) => <CellAvatar name={row.original.name} description={row.original.email} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <CellBadge variant={getValue() === 'active' ? 'success' : 'secondary'}>
        {getValue() === 'active' ? 'Active' : 'Inactive'}
      </CellBadge>
    ),
  },
];

function UserTable() {
  const [data] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@email.com', status: 'active' },
  ]);

  return <DataGrid columns={columns} data={data} enableSorting enableRowSelection />;
}
```

## Search Input with Clear

```tsx
import { Input } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

function SearchInput() {
  const [value, setValue] = useState('');
  return (
    <Input
      variant="default"
      placeholder="Search..."
      leadIcon={['system', 'search']}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
}
```

## File Upload

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

## Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@mbisolution/blumnai-design-system';

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="security">Security settings</TabsContent>
</Tabs>
```

## Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent, Button } from '@mbisolution/blumnai-design-system';

<Popover>
  <PopoverTrigger asChild>
    <span><Button buttonStyle="secondary">Settings</Button></span>
  </PopoverTrigger>
  <PopoverContent>
    <div className="padding-16"><p>Popover content</p></div>
  </PopoverContent>
</Popover>
```

## Button Variants

```tsx
import { Button } from '@mbisolution/blumnai-design-system';

// Styles
<Button buttonStyle="primary">Primary</Button>
<Button buttonStyle="secondary">Secondary</Button>
<Button buttonStyle="ghost">Ghost</Button>
<Button buttonStyle="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Features
<Button leadIcon={['system', 'add']}>Add</Button>
<Button loading width={120}>Saving...</Button>
<Button fullWidth>Full Width</Button>
```

## Button with Loading State

When using `loading`, always set `width` to keep the button size stable while the spinner replaces the label. The `width` prop sets an inline style, so it is immune to CSS specificity/layer issues.

```tsx
import { Button } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

function SaveButton() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await save();
    setSaving(false);
  };

  return (
    <Button buttonStyle="primary" loading={saving} width={120} onClick={handleSave}>
      Save
    </Button>
  );
}
```

## Combobox (Searchable Select)

```tsx
import { Combobox } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

const options = [
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
  { id: 'svelte', label: 'Svelte' },
];

function SearchableSelect() {
  const [value, setValue] = useState<string>();

  return (
    <Combobox
      variant="default"
      label="Framework"
      placeholder="Search..."
      options={options}
      value={value}
      onChange={setValue}
    />
  );
}
```

## RadioCard / CheckboxCard Selection

```tsx
import { RadioGroup, RadioCard, CheckboxCard } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

function PlanSelector() {
  const [plan, setPlan] = useState('free');

  return (
    <RadioGroup value={plan} onValueChange={setPlan}>
      <div className="flex flex-col gap-12">
        <RadioCard value="free" title="Free" description="Basic features" radioPosition="right" />
        <RadioCard value="pro" title="Pro" description="All features" sections={[{ title: '$10/mo', description: 'Billed monthly' }]} radioPosition="right" />
      </div>
    </RadioGroup>
  );
}

function FeatureSelector() {
  const [features, setFeatures] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col gap-12">
      <CheckboxCard title="Dark Mode" description="Enable dark theme" checked={features.dark} onCheckedChange={(c) => setFeatures({ ...features, dark: c })} />
      <CheckboxCard title="Notifications" description="Push notifications" checked={features.notify} onCheckedChange={(c) => setFeatures({ ...features, notify: c })} />
    </div>
  );
}
```

## Sidebar + Main Content Layout

```tsx
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarHeader, SidebarFooter, SidebarUserbar } from '@mbisolution/blumnai-design-system';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarHeader>
          <div className="padding-16 font-headline size-lg font-bold">App</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem icon={['system', 'home']} label="Dashboard" isActive />
            <SidebarMenuItem icon={['system', 'user']} label="Users" />
            <SidebarMenuItem icon={['system', 'settings']} label="Settings" />
            <SidebarMenuItem variant="divider" />
            <SidebarMenuItem variant="label" label="Section" />
            <SidebarMenuItem icon={['system', 'file']} label="Documents" badge="3" />
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarUserbar name="John Doe" avatarInitials="JD" />
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 overflow-auto padding-24">{children}</main>
    </div>
  );
}
```

## Sheet / Drawer with Form

```tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, Button, Input } from '@mbisolution/blumnai-design-system';
import { useState } from 'react';

function EditSheet() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader><SheetTitle>Edit Details</SheetTitle></SheetHeader>
          <div className="padding-y-16 flex flex-col gap-16">
            <Input variant="default" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input variant="default" label="Email" placeholder="you@example.com" />
          </div>
          <SheetFooter>
            <Button buttonStyle="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button buttonStyle="primary" onClick={() => setOpen(false)}>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
```

## Dashboard Page Layout

```tsx
import { Card, CardHeader, CardTitle, CardContent, Badge, Progress, DataGrid } from '@mbisolution/blumnai-design-system';
import type { ColumnDef } from '@mbisolution/blumnai-design-system';

function DashboardPage() {
  return (
    <div className="flex flex-col gap-24">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-16">
        <Card>
          <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
          <CardContent>
            <div className="font-headline size-2xl font-bold">1,234</div>
            <Badge label="+12%" color="green" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
          <CardContent>
            <div className="font-headline size-2xl font-bold">$45,678</div>
            <Progress value={75} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Active Tasks</CardTitle></CardHeader>
          <CardContent>
            <div className="font-headline size-2xl font-bold">89</div>
          </CardContent>
        </Card>
      </div>

      {/* Data table */}
      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent>
          <DataGrid columns={columns} data={data} enableSorting enablePagination pageSize={5} />
        </CardContent>
      </Card>
    </div>
  );
}
```

## DataGrid with Filtering

```tsx
import { useState } from 'react';
import { DataGrid, Input, Select } from '@mbisolution/blumnai-design-system';
import type { ColumnDef } from '@mbisolution/blumnai-design-system';

function FilteredTable<T extends Record<string, unknown>>({
  columns,
  data,
}: {
  columns: ColumnDef<T>[];
  data: T[];
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>();

  const filtered = data.filter((row) => {
    const matchesSearch = !search || JSON.stringify(row).toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || (row as Record<string, unknown>).status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-12">
        <Input variant="default" placeholder="Search..." leadIcon={['system', 'search']} value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch('')} />
        <Select variant="default" placeholder="Status" options={[{ id: 'active', label: 'Active' }, { id: 'inactive', label: 'Inactive' }]} value={statusFilter} onChange={setStatusFilter} />
      </div>
      <DataGrid columns={columns} data={filtered} enableSorting enableRowSelection enablePagination />
    </div>
  );
}
```

## DatePicker with Quick Presets

```tsx
import { DatePicker, DateRangePicker } from '@mbisolution/blumnai-design-system';
import type { QuickPreset } from '@mbisolution/blumnai-design-system';
import { addDays, addMonths } from 'date-fns';
import { useState } from 'react';

const datePresets: QuickPreset[] = [
  { label: '오늘', getValue: () => new Date() },
  { label: '어제', getValue: () => addDays(new Date(), -1) },
  { label: '1주 전', getValue: () => addDays(new Date(), -7) },
];

const rangePresets: QuickPreset[] = [
  { label: 'Last 7 days', getValue: () => ({ from: addDays(new Date(), -6), to: new Date() }) },
  { label: 'Last 30 days', getValue: () => ({ from: addDays(new Date(), -29), to: new Date() }) },
  { label: 'Last 3 months', getValue: () => ({ from: addMonths(new Date(), -3), to: new Date() }) },
];

function DatePickerWithPresets() {
  const [date, setDate] = useState<Date>();
  return <DatePicker label="Date" value={date} onChange={setDate} showQuickPresets presets={datePresets} />;
}

function DateRangeWithPresets() {
  const [range, setRange] = useState<{ from: Date; to: Date }>();
  return <DateRangePicker label="Period" value={range} onChange={setRange} showQuickPresets presets={rangePresets} numberOfMonths={2} />;
}
```

## Chart Pattern

```tsx
import { BarChart, LineChart } from '@mbisolution/blumnai-design-system';
import type { ChartConfig } from '@mbisolution/blumnai-design-system';

const data = [
  { month: 'Jan', sales: 100, revenue: 2400 },
  { month: 'Feb', sales: 120, revenue: 2210 },
  { month: 'Mar', sales: 150, revenue: 2290 },
  { month: 'Apr', sales: 130, revenue: 2000 },
  { month: 'May', sales: 180, revenue: 2181 },
];

const config: ChartConfig = {
  sales: { label: 'Sales', color: '#437DFC' },
  revenue: { label: 'Revenue', color: '#10B981' },
};

function SalesBarChart() {
  return (
    <BarChart
      data={data}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ domain: [0, 200] }}
      dataKey="sales"
      config={config}
      width={600}
      height={400}
    />
  );
}

function RevenueLineChart() {
  return (
    <LineChart
      data={data}
      xAxis={{ dataKey: 'month' }}
      yAxis={{ domain: [0, 3000] }}
      dataKeys={['sales', 'revenue']}
      config={config}
      showArea
      showPoints
      showLegend
      width={600}
      height={400}
    />
  );
}
```

## Skeleton Loading States

```tsx
import { Skeleton } from '@mbisolution/blumnai-design-system';

function CardSkeleton() {
  return (
    <div className="border-default rounded-md padding-16 flex flex-col gap-12">
      <div className="flex gap-12 items-center">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 flex flex-col gap-8">
          <Skeleton height={16} width="50%" />
          <Skeleton height={14} width="75%" />
        </div>
      </div>
      <Skeleton height={20} />
      <Skeleton height={20} width="85%" />
      <div className="flex gap-8">
        <Skeleton height={32} width="50%" />
        <Skeleton height={32} width="50%" />
      </div>
    </div>
  );
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-4 gap-16 padding-12">
        <Skeleton height={16} /><Skeleton height={16} /><Skeleton height={16} /><Skeleton height={16} />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-16 padding-12">
          <Skeleton height={16} /><Skeleton height={16} width="80%" /><Skeleton height={16} width="70%" /><Skeleton height={16} width="60%" />
        </div>
      ))}
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="flex flex-col gap-24">
      <Skeleton height={32} width="30%" />
      <div className="grid grid-cols-3 gap-16">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <TableSkeleton />
    </div>
  );
}
```

## Theme Setup

```tsx
// Default light theme — no attribute needed
<html>...</html>

// Dark theme
<html data-theme="dark">...</html>

// Alternative themes
<html data-theme="theme-b-light">...</html>
<html data-theme="theme-b-dark">...</html>
```
