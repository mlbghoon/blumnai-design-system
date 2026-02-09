---
name: storybook-story
description: Guide for creating Storybook stories following project conventions. Auto-invoke when creating or modifying story files, or when user mentions "story", "storybook", "stories".
allowed-tools: Bash, Write, Read, Glob, Grep
---

# Storybook Story Creation

## Steps

### 1. Read the component file completely

- Read the main component `.tsx` and `.types.ts` files
- Identify all props, their types, and default values
- Note discriminated union types (e.g., `SelectProps = DefaultSelectProps | MultiSelectProps`)

### 2. Check existing stories in the folder for patterns

- Look in `src/components/{component}/stories/` for sibling stories
- Match the Storybook `title` hierarchy (e.g., `Form/Input`, `Feedback/AlertDialog`)
- Reuse the same layout parameter (`padded` or `centered`) as related components

### 3. Create story matching existing conventions

#### File location

```text
src/components/{component-name}/stories/{ComponentName}.stories.tsx
```

#### Meta configuration

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
```

#### Controls pattern (CRITICAL)

- **Meta level**: `controls: { disable: true }` — disables controls on all stories
- **Default story only**: `parameters: { controls: { disable: false } }` — enables controls
- **All other stories**: inherit disabled controls from meta (showcase only)

#### Default story — connect every argType

Every prop in `argTypes` must appear in **three** places:

1. Defined in `argTypes`
2. Given a default value in `args`
3. Passed to the component in `render`

```tsx
export const Default: Story = {
  args: {
    label: 'Label',
    size: 'md',
    disabled: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return <Component label={args.label} size={args.size} disabled={args.disabled} />;
  },
};
```

#### argTypes — Korean descriptions, explicit table types

```tsx
argTypes: {
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg'],
    description: '컴포넌트의 크기',
    table: {
      type: { summary: 'ComponentSize', detail: "'sm' | 'md' | 'lg'" },
    },
  },
  disabled: {
    control: 'boolean',
    description: '비활성화 여부',
    table: { type: { summary: 'boolean' } },
  },
  onChange: {
    action: 'changed',
    description: '변경 시 호출되는 콜백 함수',
    table: { type: { summary: '(value: string) => void' } },
  },
},
```

#### Compound components (Radix pattern)

For Dialog, Popover, etc., create a combined type:

```tsx
type DialogStoryProps = DialogProps & DialogContentProps;
const meta: Meta<DialogStoryProps> = { ... };
```

Use `table: { category: 'Dialog' }` or `table: { category: 'DialogContent' }` to group props.

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

## Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| `{...args}` in render loses TypeScript narrowing | Set each prop explicitly |
| argType defined but not in `args` | Control appears but does nothing |
| `text-sm` / `leading-5` / `p-4` | Use design system classes: `size-sm` / `line-height-leading-5` / `padding-16` |
| English comments in story code | Use Korean or omit |
| Using internal variant component directly | Use unified component with `variant` prop |
| Radix `asChild` conflicts with Button `style` prop | Wrap Button in `<span>` for trigger, or use controlled state |

## Common Korean Descriptions

| English | Korean |
|---------|--------|
| Size | 크기 |
| Style/Variant | 스타일 변형 |
| Disabled | 비활성화 여부 |
| Loading | 로딩 상태 |
| Label | 라벨 |
| Placeholder | 플레이스홀더 텍스트 |
| Error | 에러 상태 또는 메시지 |
| Success | 성공 상태 또는 메시지 |
| Required | 필수 입력 여부 |
| On click | 클릭 시 호출되는 콜백 함수 |
| On change | 변경 시 호출되는 콜백 함수 |
| Lead icon | 앞에 표시되는 아이콘 |
| Tail icon | 뒤에 표시되는 아이콘 |
