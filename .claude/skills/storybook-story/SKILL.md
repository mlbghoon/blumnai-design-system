---
name: storybook-story
description: Guide for creating Storybook stories following project conventions. Auto-invoke when creating or modifying story files, or when user mentions "story", "storybook", "stories".
---

# Storybook Story Conventions

Follow these rules when creating Storybook stories for this design system.

## When to Auto-Invoke

- When creating a new story file
- When modifying existing stories
- When user asks about story setup or conventions

## File Structure

```
src/components/{component}/stories/{Component}.stories.tsx
```

## Meta Configuration

```tsx
const meta: Meta<typeof Component> = {
  title: 'Components/Category/ComponentName',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },  // Disable controls globally
  },
  argTypes: {
    // Define all props here
  },
};

export default meta;
type Story = StoryObj<typeof Component>;
```

## Controls Rule (Critical)

| Story | Controls |
|-------|----------|
| Meta level | `controls: { disable: true }` (disabled globally) |
| Default story | `parameters: { controls: { disable: false } }` (enabled) |
| All other stories | Inherit disabled from meta |

## argTypes Convention

Every prop must have:
1. Korean description
2. Proper type display using `table.type.summary`

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
        detail: `'sm' | 'md' | 'lg'`,
      },
    },
  },

  // For boolean types
  disabled: {
    control: 'boolean',
    description: '비활성화 여부',
    table: {
      type: { summary: 'boolean' },
    },
  },

  // For string types
  label: {
    control: 'text',
    description: '라벨 텍스트',
    table: {
      type: { summary: 'string' },
    },
  },

  // For function types
  onClick: {
    action: 'clicked',
    description: '클릭 시 호출되는 콜백 함수',
    table: {
      type: { summary: '(event: MouseEvent) => void' },
    },
  },
},
```

## Three Places Rule (Critical)

Every prop in argTypes MUST be connected in THREE places:

1. **In argTypes** - Define the control
2. **In args** - Provide default value
3. **In render function** - Pass to component

```tsx
// 1. Define in argTypes
argTypes: {
  selectType: {
    control: 'select',
    options: ['default', 'checkbox'],
    description: '선택 표시 타입',
  },
},

// 2. Add to args
export const Default: Story = {
  args: {
    selectType: 'default',  // Must be here
  },

  // 3. Pass in render
  render: function Render(args) {
    return (
      <Component
        selectType={args.selectType}  // Must be here
      />
    );
  },
};
```

## Default Story Template

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

## Showcase Stories (No Controls)

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

## Common Korean Descriptions

| English | Korean |
|---------|--------|
| Size | 크기 |
| Style/Variant | 스타일 변형 |
| Disabled state | 비활성화 여부 |
| Loading state | 로딩 상태 |
| Full width | 전체 너비 사용 여부 |
| Label | 라벨 |
| Placeholder | 플레이스홀더 텍스트 |
| Error state | 에러 상태 또는 메시지 |
| Required | 필수 입력 여부 |
| Callback on click | 클릭 시 호출되는 콜백 함수 |
| Callback on change | 변경 시 호출되는 콜백 함수 |

## Show Code Best Practices

- Use unified component with `variant` prop, not individual components
- Never spread `args` in render functions
- Set all props explicitly for TypeScript safety
