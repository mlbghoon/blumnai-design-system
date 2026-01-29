# Blumnai Design System - Development Guidelines

## Typography Classes (CRITICAL)

**NEVER use default Tailwind typography classes. ALWAYS use the design system's utility classes:**

### Font Size
- Use `size-xs`, `size-sm`, `size-md`, `size-lg`, `size-xl`, `size-2xl`, etc.
- NOT `text-xs`, `text-sm`, `text-base`, `text-lg`, etc.

### Line Height
- Use `line-height-leading-3`, `line-height-leading-4`, `line-height-leading-5`, `line-height-leading-6`, etc.
- NOT `leading-3`, `leading-4`, `leading-5`, `leading-6`, etc.

### Letter Spacing
- Use `letter-spacing-tracking-tighter`, `letter-spacing-tracking-tight`, `letter-spacing-tracking-normal`, `letter-spacing-tracking-wide`, etc.
- NOT `tracking-tighter`, `tracking-tight`, `tracking-normal`, `tracking-wide`, etc.

### Font Family
- Use `font-body`, `font-headline`, `font-quote`, `font-code`
- These map to CSS variables: `var(--font-body)`, `var(--font-headline)`, etc.

### Font Weight
- Use `font-medium`, `font-bold`, etc. (Tailwind classes are OK here as they're configured to use CSS variables)

### Example - Correct Label Styling:
```tsx
const labelClassName = cn(
  'font-body',
  'size-sm line-height-leading-5 letter-spacing-tracking-normal',
  'font-medium',
  'text-default',
  'select-none'
);
```

### Example - WRONG (DO NOT USE):
```tsx
// WRONG - Do not use these Tailwind defaults
const labelClassName = cn(
  'text-sm leading-5 tracking-normal', // WRONG!
  'font-medium',
  'text-gray-700'
);
```

## Spacing & Sizing (CRITICAL)

**NEVER use arbitrary values like `w-[14px]`, `h-[10px]`, `left-[1px]`, etc.**
**NEVER use Tailwind default spacing classes like `w-16`, `h-8`, `p-4`, `px-2`, `gap-4`, etc.**

### Padding
Use design system padding utility classes:
- `padding-0`, `padding-1`, `padding-2`, `padding-4`, `padding-6`, `padding-8`, `padding-10`, `padding-12`, `padding-16`, `padding-20`, `padding-24`
- `padding-x-*` for horizontal padding (left + right)
- `padding-y-*` for vertical padding (top + bottom)
- NOT `p-4`, `px-2`, `py-1` (Tailwind defaults)

Available padding-x: `padding-x-0`, `padding-x-1`, `padding-x-2`, `padding-x-4`, `padding-x-6`, `padding-x-8`, `padding-x-10`, `padding-x-12`, `padding-x-14`, `padding-x-16`
Available padding-y: `padding-y-0`, `padding-y-1`, `padding-y-2`, `padding-y-4`, `padding-y-6`, `padding-y-8`, `padding-y-10`, `padding-y-12`, `padding-y-16`

### Width & Height
Use design system utility classes from `utilities.css`:
- `width-2`, `width-8`, `width-10`, `width-14`, `width-16`, `width-24`, `width-28`, `width-32`, `width-36`, `width-40`
- `height-2`, `height-8`, `height-14`, `height-16`, `height-24`, `height-28`, `height-32`, `height-36`, `height-40`
- NOT `w-16`, `h-16` (Tailwind defaults)

### Gap
Use `gap-*` classes:
- `gap-0`, `gap-1`, `gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-10`, `gap-12`, `gap-16`, `gap-20`, `gap-24`
- NOT `gap-[6px]` or other arbitrary values

### Examples:
```tsx
// CORRECT
'width-16 height-16'           // 16px × 16px
'width-10 height-2'            // 10px × 2px
'padding-x-12 padding-y-8'     // 12px horizontal, 8px vertical padding
'padding-6'                    // 6px padding all sides
'gap-8'                        // 8px gap

// WRONG - Never use these
'w-16 h-16'            // WRONG! Use width-16 height-16
'w-[14px] h-[14px]'    // WRONG! Use width-14 height-14
'p-4 px-2 py-1'        // WRONG! Use padding-4, padding-x-2, padding-y-1
'gap-[6px]'            // WRONG! Use gap-6
```

### Border Radius
Use design system radius tokens:
- `rounded-none`, `rounded-2xs`, `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`
- NOT `rounded-[5px]` or other arbitrary values

## Color Classes (CRITICAL)

**NEVER use arbitrary color values like `bg-[#437DFC]`, `border-[rgba(39,39,42,0.15)]`, etc.**

### Text Colors
- Use semantic colors: `text-default`, `text-subtle`, `text-muted`, `text-hint`
- NOT hardcoded colors like `text-[#4E4E55]` or `text-gray-600`

### Background Colors
- Use semantic colors: `bg-default`, `bg-subtle`, `bg-muted`, `bg-card`, etc.
- NOT hardcoded colors like `bg-[#437DFC]`, `bg-[rgba(39,39,42,0.06)]`, `bg-white`

#### Checkbox-specific backgrounds:
- `bg-checkbox-default` - unchecked checkbox background (white)
- `bg-checkbox-active` - checked/indeterminate checkbox background (blue)
- `bg-checkbox-active-hover` - hover state for checked checkbox
- `bg-checkbox-disabled` - disabled checkbox background

### Border Colors
- Use semantic colors: `border-default`, `border-darker`, `border-strong`, etc.
- NOT hardcoded colors like `border-[rgba(39,39,42,0.15)]`

#### Border opacity reference:
- `border-default` = 10% opacity (#27272a1a)
- `border-darker` = 15% opacity (#27272a26)
- `border-strong` = 25% opacity (#27272a40)

**Note:** Border classes set `border-width: 1px` and `border-color`, but NOT `border-style`. This allows them to work with style modifiers like `border-dashed`. For solid borders, use `border-default` alone (default style is solid). For dashed borders, use `border border-dashed border-default`.

### Examples - Correct checkbox styling:
```tsx
// CORRECT
disabled
  ? 'bg-checkbox-disabled border-default cursor-not-allowed'
  : isChecked
    ? 'border-none bg-checkbox-active hover:bg-checkbox-active-hover'
    : 'border-darker bg-checkbox-default hover:border-strong'

// WRONG - Never use these
disabled
  ? 'bg-[rgba(39,39,42,0.06)] border border-[rgba(39,39,42,0.10)]'  // WRONG!
  : isChecked
    ? 'bg-[#437DFC] hover:bg-[#65A0FD]'                             // WRONG!
    : 'border border-[rgba(39,39,42,0.15)] bg-white'                // WRONG!
```

## Component Patterns

### No darkMode prop
- Components should NOT have a `darkMode` prop
- Dark mode is handled automatically via CSS variables and themes

## Code Comments (CRITICAL)

### Minimize Comments
- **Only add comments when absolutely necessary** - when the code logic is not self-explanatory
- Do NOT add obvious or redundant comments
- Code should be self-documenting through clear naming

### No English Comments in Code
- **Do NOT write comments in English** in component code
- If a comment is truly necessary, write it in Korean
- Exception: JSDoc for public API documentation can be in English

```tsx
// WRONG - Unnecessary English comments
// Set the disabled state
const isDisabled = disabled || loading;

// Handle click event
const handleClick = () => {
  onClick?.();
};

// CORRECT - No comments needed, code is self-explanatory
const isDisabled = disabled || loading;

const handleClick = () => {
  onClick?.();
};

// CORRECT - If comment is truly needed, use Korean
// 비밀번호 강도 계산 로직이 복잡하므로 주석 추가
const calculateStrength = (password: string): PasswordStrength => {
  // ...complex logic
};
```

### What NOT to Comment
- Variable declarations with clear names
- Simple function calls
- Obvious conditional logic
- Import statements
- Standard React patterns (useState, useEffect, etc.)

### When Comments ARE Acceptable
- Complex algorithms that need explanation
- Non-obvious business logic
- Workarounds for known issues (with issue reference)
- JSDoc for exported functions/components (public API)

## Figma REST API Script

Use `scripts/fetch-figma.mjs` to fetch component data from Figma. This is the standard way to get design specs.

### Setup
```bash
# Get your token from: https://www.figma.com/developers/api#access-tokens
export FIGMA_ACCESS_TOKEN=your_token_here
```

### Usage
```bash
# Fetch single node (outputs JSON to console)
FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=2846-3118

# Fetch multiple nodes
FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=2846-3118 --node=2846-3119

# Save to file
FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=2846-3118 --output=src/components/checkbox/source/figma-data.json

# Get raw Figma data (unprocessed)
FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=2846-3118 --raw

# Limit child depth
FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=2846-3118 --depth=2
```

### Arguments
| Argument | Description |
|----------|-------------|
| `--node=NODE_ID` | Node ID to fetch (required, can specify multiple). Format: `2846-3118` or `2846:3118` |
| `--output=PATH` | Save output to file (default: prints to console) |
| `--file=FILE_KEY` | Figma file key (default: design system file `hNwky49HL9rYtxWb5smgqZ`) |
| `--raw` | Output raw Figma data without processing |
| `--depth=N` | Limit child traversal depth |

### Finding Node IDs
1. Open the Figma file in browser
2. Select the component/frame you want
3. The node ID is in the URL after `node-id=` (e.g., `node-id=2846-3118`)
4. Or right-click → "Copy link" and extract the node ID

### Output Structure
The processed output includes:
- `id`, `name`, `type` - Node identification
- `size` - Width and height in pixels
- `position` - X/Y position relative to parent
- `styles` - Visual styles (fills, strokes, effects, cornerRadius, padding, layout, etc.)
- `textStyle` - For TEXT nodes (fontFamily, fontSize, fontWeight, lineHeight, letterSpacing)
- `children` - Nested child nodes

## Reference Files
- Typography utilities: `src/styles/utilities.css`
- Tailwind config: `tailwind.config.js`
- Design tokens: `src/tokens/`
- Figma fetch script: `scripts/fetch-figma.mjs`

## Storybook Stories Documentation

All Storybook stories must follow these conventions for proper Docs page generation.

### Story Structure (CRITICAL)

Each component's story file must have:
1. **Docs page** - Auto-generated via `tags: ['autodocs']`
2. **Default story** - Interactive story with controls ENABLED
3. **Showcase stories** - All other stories with controls DISABLED

#### Controls Configuration

- **Meta level**: Disable controls globally with `parameters: { controls: { disable: true } }`
- **Default story**: Enable controls with `parameters: { controls: { disable: false } }`
- **All other stories**: Inherit disabled controls from meta (showcases only)

```tsx
const meta: Meta<typeof Component> = {
  title: 'Components/Category/ComponentName',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },  // Disable controls globally
  },
  argTypes: { /* ... */ },
};

/**
 * 기본 컴포넌트
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder...',
  },
  parameters: {
    controls: { disable: false },  // Enable controls ONLY for Default
  },
};

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

/**
 * 에러 상태
 */
export const Error: Story = {
  args: {
    label: 'Error',
    error: 'Error message',
  },
  // No parameters - showcase only, no controls
};
```

#### Why This Pattern?

- **Default story**: Developers can interactively test all props via Storybook controls
- **Showcase stories**: Display specific states/variants without cluttering with controls
- **Docs page**: Shows all stories with the Default being the interactive example

### argTypes Structure (CRITICAL)

Every prop must have:
1. **Korean description** - `description: '한글 설명'`
2. **Proper type display** - Use `table.type.summary` to avoid "union" label

#### For Union/Enum Types (select control)
```tsx
size: {
  control: 'select',
  options: ['sm', 'md', 'lg'],
  description: '컴포넌트의 크기',
  table: {
    type: {
      summary: 'ComponentSize',           // Type name shown in table
      detail: `'sm' | 'md' | 'lg'`,       // Full type on hover
    },
  },
},
```

#### For Boolean Types
```tsx
disabled: {
  control: 'boolean',
  description: '비활성화 여부',
  table: {
    type: { summary: 'boolean' },
  },
},
```

#### For String/Number Types
```tsx
label: {
  control: 'text',
  description: '라벨 텍스트',
  table: {
    type: { summary: 'string' },
  },
},
```

#### For Function Types
```tsx
onClick: {
  action: 'clicked',
  description: '클릭 시 호출되는 콜백 함수',
  table: {
    type: { summary: '(event: MouseEvent) => void' },
  },
},
```

#### For Complex/Object Types
```tsx
leadIcon: {
  control: 'object',
  description: '앞에 표시되는 아이콘',
  table: {
    type: { summary: 'IconType | ReactNode' },
  },
},
```

### Story Documentation

Use JSDoc comments above stories for descriptions in Docs:
```tsx
/**
 * 기본 컴포넌트
 *
 * Component는 `ref`와 `className` prop을 지원합니다.
 */
export const Default: Story = {
  args: { ... },
  parameters: {
    controls: { disable: false },  // Enable controls for interactive story
  },
};
```

### Common Korean Descriptions

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
| Success state | 성공 상태 또는 메시지 |
| Required | 필수 입력 여부 |
| Callback on click | 클릭 시 호출되는 콜백 함수 |
| Callback on change | 변경 시 호출되는 콜백 함수 |
| Icon before/lead | 앞에 표시되는 아이콘 |
| Icon after/tail | 뒤에 표시되는 아이콘 |

### "Show Code" Best Practices (CRITICAL)

The code shown in Storybook's "Show code" must match exactly how users would write it.

#### Use Unified Components with `variant` Prop (CRITICAL)

For components with multiple variants (like Input), always use the unified component with the `variant` prop.
**NEVER** use the individual variant components directly in stories.

```tsx
// CORRECT - Use unified component with variant prop
import { Input } from '../Input';

export const PasswordExample: Story = {
  args: {
    variant: 'password',
    label: 'Password',
    showStrength: true,
  },
};

// WRONG - Don't use individual variant components
import { PasswordInput } from './PasswordInput';

export const PasswordExample: Story = {
  args: {
    label: 'Password',
    showStrength: true,
  },
};
```

This ensures "Show code" displays:
```tsx
// What developers will see and copy
<Input variant="password" label="Password" showStrength />

// NOT this (internal component)
<PasswordInput label="Password" showStrength />
```

#### Never Spread `args` in Render Functions (CRITICAL)

When using `render` functions with stateful components, **do NOT spread `args`**.
Set all props explicitly to maintain TypeScript type safety and clean "Show code" output.

```tsx
// CORRECT - Set props explicitly
export const WithClearButton: Story = {
  render: function Render() {
    const [value, setValue] = useState('Hello World');
    return (
      <Input
        variant="default"
        label="With Clear Button"
        placeholder="Type something..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
};

// WRONG - Spreading args loses TypeScript narrowing
export const WithClearButton: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('Hello World');
    return (
      <Input
        {...args}  // DON'T DO THIS - loses type safety
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
  args: {
    variant: 'default',
    label: 'With Clear Button',
  },
};
```

**Why this matters:**
1. Spreading `args` breaks TypeScript's discriminated union narrowing
2. The `variant` prop determines which other props are valid
3. TypeScript can't narrow the type when `args` is spread
4. "Show code" displays cleaner, more realistic code

#### Use `render` with Direct Component Usage
```tsx
// CORRECT - Shows clean, realistic code
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-12">
      <Button leadIcon={['system', 'add']}>Add</Button>
      <Button tailIcon={['system', 'check']}>Confirm</Button>
    </div>
  ),
};
```

#### For Stateful Components
When component needs state (like controlled inputs), use minimal wrapper:
```tsx
// CORRECT - Shows realistic controlled usage
export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <Input
        variant="default"
        label="Email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
```

#### Avoid Internal Helpers in Render
```tsx
// WRONG - Shows confusing internal code
export const Example: Story = {
  render: () => {
    const helper = useInternalHelper();  // Don't expose internals
    return <Button {...helper.props}>Click</Button>;
  },
};
```

#### Group Related Examples
```tsx
// CORRECT - Shows multiple variants together
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-12 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
