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
toast({ title: 'Saved successfully', variant: 'success' });

// Error
toast({ title: 'Something went wrong', description: 'Please try again', variant: 'error' });

// Warning
toast({ title: 'Attention needed', variant: 'warning' });

// Info
toast({ title: 'New message', description: 'You have a new notification', variant: 'info' });

// With action
toast({ title: 'Deleted', action: { label: 'Undo', onClick: () => console.log('Undo') } });
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
      accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
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
