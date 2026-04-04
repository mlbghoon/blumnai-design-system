---
name: storybook-story
description: Guide for creating Storybook stories following project conventions. Auto-invoke when creating or modifying story files, or when user mentions "story", "storybook", "stories".
allowed-tools: Bash, Write, Read, Glob, Grep
user-invocable: true
---

# Storybook Story Conventions

Follow these rules when creating Storybook stories for this design system.

## Steps

### 1. Read the component file completely

- Read the main component `.tsx` and `.types.ts` files
- Identify all props, their types, and default values
- Note discriminated union types (e.g., `SelectProps = DefaultSelectProps | MultiSelectProps`)

### 2. Check existing stories in the folder for patterns

- Look in `src/components/{component}/stories/` for sibling stories
- Match the Storybook `title` hierarchy (e.g., `Form/Input`, `Feedback/AlertDialog`)
- Reuse the same layout parameter (`padded` or `centered`) as related components

### 3. Create story matching these conventions

#### File location

```text
src/components/{component-name}/stories/{ComponentName}.stories.tsx
```

#### Meta configuration (CRITICAL)

```tsx
const meta: Meta<typeof ComponentName> = {
  title: 'Components/{Category}/{ComponentName}',
  component: ComponentName,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',            // or 'centered' for dialogs/modals
    controls: { disable: true }, // disabled globally
  },
  argTypes: { /* see argTypes section below */ },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;
```

#### Controls pattern (CRITICAL)

| Story | Controls |
|-------|----------|
| Meta level | `controls: { disable: true }` (disabled globally) |
| Default story ONLY | `parameters: { controls: { disable: false } }` (enabled) |
| All other stories | Inherit disabled from meta (showcase only) |

### argTypes — Korean descriptions, explicit table types (CRITICAL)

Every prop must have:
1. **Korean description** — `description: '한글 설명'`
2. **Proper type display** — `table.type.summary` to avoid "union" label

```tsx
argTypes: {
  // For select/enum types
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg'],
    description: '컴포넌트의 크기',
    table: {
      type: {
        summary: 'ComponentSize',
        detail: "'sm' | 'md' | 'lg'",
      },
    },
  },

  // For boolean types
  disabled: {
    control: 'boolean',
    description: '비활성화 여부',
    table: { type: { summary: 'boolean' } },
  },

  // For string types
  label: {
    control: 'text',
    description: '라벨 텍스트',
    table: { type: { summary: 'string' } },
  },

  // For function types
  onClick: {
    action: 'clicked',
    description: '클릭 시 호출되는 콜백 함수',
    table: { type: { summary: '(event: MouseEvent) => void' } },
  },

  // For complex/object types
  leadIcon: {
    control: 'object',
    description: '앞에 표시되는 아이콘',
    table: { type: { summary: 'IconType | ReactNode' } },
  },
},
```

### Three Places Rule (CRITICAL)

Every prop in `argTypes` MUST be connected in **THREE** places:

1. **In `argTypes`** — Define the control
2. **In `args`** — Provide default value
3. **In `render` function** — Pass to component

```tsx
// 1. Define in argTypes
argTypes: {
  selectType: {
    control: 'select',
    options: ['default', 'checkbox', 'radio'],
    description: '선택 표시 타입',
    table: { type: { summary: 'SelectType' } },
  },
  maxSelections: {
    control: 'number',
    description: '최대 선택 개수',
    table: { type: { summary: 'number' } },
  },
},

// 2. Add to args with default value
export const Default: Story = {
  args: {
    selectType: 'default',        // ← MUST be here
    maxSelections: undefined,      // ← MUST be here (use undefined for optional)
  },

  // 3. Pass in render function
  render: function Render(args) {
    return (
      <Component
        selectType={args.selectType}           // ← MUST be here
        maxSelections={args.maxSelections}     // ← MUST be here
      />
    );
  },
  parameters: {
    controls: { disable: false },  // Enable controls for Default only
  },
};
```

#### Common Mistakes

```tsx
// WRONG - Control defined but not in args
argTypes: { selectType: { control: 'select', ... } }
args: { /* selectType missing! */ }

// WRONG - In args but not passed to component
args: { selectType: 'default' }
render: (args) => <Component /* selectType not passed! */ />

// WRONG - Empty string instead of undefined for optional props
args: { maxSelections: '' }  // Should be: maxSelections: undefined
```

#### For String Props That Can Be Empty

```tsx
args: {
  supportText: 'Support text here',
  error: '',  // Empty = no error
},
render: function Render(args) {
  const supportText = args.supportText || undefined;
  const error = args.error || undefined;
  return <Component supportText={supportText} error={error} />;
},
```

### Default Story Template

```tsx
/**
 * 기본 컴포넌트
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: 'Label',
    size: 'md',
    disabled: false,
  },
  parameters: {
    controls: { disable: false },  // Enable controls only for Default
  },
};
```

### Showcase Stories (No Controls)

```tsx
/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
  // No parameters - inherits controls: { disable: true } from meta
};
```

### 4. Include all major variants/states

Create showcase stories for each important state:
- **Sizes** — `AllSizes` showing sm/md/lg side by side
- **Disabled** — `Disabled` with `disabled: true`
- **Error/Success** — if the component supports validation states
- **Loading** — if the component has a loading prop
- **With icons** — if the component accepts icon props

Showcase stories use `render` with explicit props (no `args` spreading):

```tsx
export const Disabled: Story = {
  render: () => (
    <Component label="Disabled" disabled />
  ),
};
```

## Compound Components (Radix UI Pattern)

For Dialog, Popover, etc., create a combined type:

```tsx
import type { DialogProps, DialogContentProps } from "./Dialog.types";

type DialogStoryProps = DialogProps & DialogContentProps;
const meta: Meta<DialogStoryProps> = {
  component: DialogContent,
  argTypes: {
    modal: {
      control: "boolean",
      description: "[Dialog] 모달 모드",
      table: {
        type: { summary: "boolean" },
        category: "Dialog",
      },
    },
    hideCloseButton: {
      control: "boolean",
      description: "[DialogContent] 닫기 버튼 숨김",
      table: { category: "DialogContent" },
    },
  },
};
type Story = StoryObj<DialogStoryProps>;
```

### Radix asChild Prop Conflict (CRITICAL)

Our `Button` has a custom `style` prop. Radix `asChild` clones children and merges props, causing conflicts.

- **Dialog**: Use controlled state without `DialogTrigger`:
  ```tsx
  <Dialog open={open} onOpenChange={setOpen}>
    <Button style="secondary" onClick={() => setOpen(true)}>Open</Button>
    <DialogContent>...</DialogContent>
  </Dialog>
  ```

- **Popover**: Wrap Button in a span:
  ```tsx
  <PopoverTrigger asChild>
    <span><Button style="secondary">Open</Button></span>
  </PopoverTrigger>
  ```

## Variant-Specific Props (Discriminated Unions)

Use `in` type guard for variant-specific props:

```tsx
render: function Render(args) {
  const selectType = 'selectType' in args ? args.selectType : undefined;
  const maxSelections = 'maxSelections' in args ? args.maxSelections : undefined;

  return (
    <Select
      variant="default"
      selectType={selectType}
      maxSelections={maxSelections}
    />
  );
},
```

## "Show Code" Best Practices (CRITICAL)

### Use Unified Components with `variant` Prop

```tsx
// CORRECT
import { Input } from "../Input";
<Input variant="password" label="Password" showStrength />

// WRONG - Don't use individual variant components
import { PasswordInput } from "./PasswordInput";
<PasswordInput label="Password" showStrength />
```

### Never Spread `args` in Render Functions

Set all props explicitly for TypeScript type safety and clean "Show code" output:

```tsx
// CORRECT
export const WithClearButton: Story = {
  render: function Render() {
    const [value, setValue] = useState("Hello World");
    return (
      <Input
        variant="default"
        label="With Clear Button"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
      />
    );
  },
};

// WRONG - Spreading args loses TypeScript narrowing
render: function Render(args) {
  return <Input {...args} />;  // DON'T DO THIS
},
```

### Group Related Examples

```tsx
export const AllSizes: Story = {
  render: () => (
    <div className="flex ds-gap-12 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

## Common Korean Descriptions

| English | Korean |
|---------|--------|
| Size | 크기 |
| Style/Variant | 스타일 변형 |
| Disabled | 비활성화 여부 |
| Loading | 로딩 상태 |
| Full width | 전체 너비 사용 여부 |
| Label | 라벨 |
| Placeholder | 플레이스홀더 텍스트 |
| Error | 에러 상태 또는 메시지 |
| Success | 성공 상태 또는 메시지 |
| Required | 필수 입력 여부 |
| On click | 클릭 시 호출되는 콜백 함수 |
| On change | 변경 시 호출되는 콜백 함수 |
| Lead icon | 앞에 표시되는 아이콘 |
| Tail icon | 뒤에 표시되는 아이콘 |

## Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| `{...args}` in render loses TypeScript narrowing | Set each prop explicitly |
| argType defined but not in `args` | Control appears but does nothing |
| `text-sm` / `leading-5` / `p-4` | Use DS: `size-sm` / `line-height-leading-5` / `padding-16` |
| English comments in story code | Use Korean or omit |
| Using internal variant component directly | Use unified component with `variant` prop |
| Radix `asChild` conflicts with Button `style` | Wrap Button in `<span>` or use controlled state |
| `gap-8` used in story layout | Use `ds-gap-8` |
