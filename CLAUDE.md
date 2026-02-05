# Blumnai Design System - Development Guidelines

## Code Quality Verification (CRITICAL)

**ALWAYS run type-check and lint after making code changes:**

```bash
npm run typecheck && npm run lint
```

This MUST be done:
- After completing any code changes
- Before telling the user the work is done
- To catch TypeScript errors, ESLint violations, and React hooks issues

**Common issues this catches:**
- TypeScript type incompatibilities
- React refs updated during render (use `useEffect` instead)
- Missing or incorrect prop types
- Import errors

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
- shadcn bridge CSS: `src/styles/tokens/shadcn-bridge.css`
- shadcn components: `src/components/ui/`
- shadcn config: `components.json`

## shadcn/ui Components

### Component Location
- shadcn components: `src/components/ui/`
- Hooks: `src/hooks/`
- CSS bridge: `src/styles/tokens/shadcn-bridge.css`

### Adding New Components
```bash
npx shadcn@latest add [component-name]
```

### Customizing shadcn Components (CRITICAL)

After adding a shadcn component, you MUST customize it to use design system classes:

#### Typography
| shadcn | Replace with |
|--------|--------------|
| `text-sm` | `size-sm` |
| `text-lg` | `size-lg` |
| `leading-none` | `line-height-leading-3` |
| `leading-normal` | `line-height-leading-5` |
| `tracking-tight` | `letter-spacing-tracking-tight` |

#### Spacing
| shadcn | Replace with |
|--------|--------------|
| `p-4` | `padding-16` |
| `px-4` | `padding-x-16` |
| `py-2` | `padding-y-8` |
| `gap-2` | `gap-8` |
| `gap-4` | `gap-16` |
| `h-9` | `height-36` |
| `h-10` | `height-40` |

#### Add Font Family
Always add `font-body` to text elements in shadcn components.

### shadcn Color Variables

shadcn components use these CSS variables (mapped via bridge):

| shadcn Variable | Maps to Design Token |
|-----------------|---------------------|
| `--primary` | `--bg-state-primary` |
| `--secondary` | `--bg-state-secondary` |
| `--destructive` | `--bg-state-destructive` |
| `--muted` | `--bg-muted` |
| `--accent` | `--bg-state-soft` |
| `--border` | `--border-default` |
| `--ring` | `--border-highlight` |

### Example - Customizing shadcn Button

Before (shadcn default):
```tsx
"h-9 px-4 py-2 text-sm font-medium"
```

After (design system):
```tsx
"height-36 padding-x-16 padding-y-8 size-sm font-medium font-body line-height-leading-5"
```

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

### Connecting Controls to Default Story (CRITICAL)

**Every prop defined in `argTypes` MUST be connected to the Default story in THREE places:**

1. **In `argTypes`** - Define the control
2. **In `args`** - Provide default value
3. **In `render` function** - Pass to component

If any of these are missing, the control will appear in Storybook but won't work.

#### Checklist for Default Story
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
    // ... other args
  },

  // 3. Pass in render function
  render: function Render(args) {
    return (
      <Component
        selectType={args.selectType}           // ← MUST be here
        maxSelections={args.maxSelections}     // ← MUST be here
        // ... other props
      />
    );
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
Use empty string to undefined conversion:
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

#### Compound Components (Radix UI Pattern) - CRITICAL

For compound components like Dialog or Popover (based on Radix UI), create a combined type that includes props from both the root and content components. This allows documenting and controlling all props in Storybook.

```tsx
import type { DialogProps, DialogContentProps } from './Dialog.types';

// Create combined type for story
type DialogStoryProps = DialogProps & DialogContentProps;

// Use combined type for Meta
const meta: Meta<DialogStoryProps> = {
  component: DialogContent,
  argTypes: {
    // Dialog (Root) props
    modal: {
      control: 'boolean',
      description: '[Dialog] 모달 모드',
      table: {
        type: { summary: 'boolean' },
        category: 'Dialog',  // Group by component
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: '[Dialog] 초기 열림 상태',
      table: { category: 'Dialog' },
    },
    // DialogContent props
    hideCloseButton: {
      control: 'boolean',
      description: '[DialogContent] 닫기 버튼 숨김',
      table: { category: 'DialogContent' },
    },
  },
};

// Use combined type for Story
type Story = StoryObj<DialogStoryProps>;

export const Default: Story = {
  args: {
    modal: true,              // Root prop
    hideCloseButton: false,   // Content prop
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen} modal={args.modal}>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <DialogContent hideCloseButton={args.hideCloseButton}>
          {/* content */}
        </DialogContent>
      </Dialog>
    );
  },
};
```

**Key points:**
- Create combined type: `type DialogStoryProps = DialogProps & DialogContentProps`
- Use combined type for both `Meta<DialogStoryProps>` and `StoryObj<DialogStoryProps>`
- Use `table: { category: 'ComponentName' }` to group props by component in Storybook UI
- Prefix descriptions with `[ComponentName]` for clarity
- Pass root props to root component, content props to content component in render

#### Radix asChild Prop Conflict with Custom Components - CRITICAL

Radix UI's `asChild` prop clones the child element and merges props. This causes conflicts with components that have custom props with common names like `style`.

**Problem:** Our `Button` component has a custom `style` prop (for variants like "primary", "secondary"). When using `asChild`, Radix tries to pass its own `style` prop, causing conflicts.

**Solution for Dialog:** Use controlled state without `DialogTrigger`:
```tsx
// Dialog doesn't need a trigger for positioning - it's centered on screen
<Dialog open={open} onOpenChange={setOpen}>
  <Button style="secondary" onClick={() => setOpen(true)}>Open</Button>
  <DialogContent>...</DialogContent>
</Dialog>
```

**Solution for Popover:** Popover NEEDS a trigger for positioning. Wrap Button in a span:
```tsx
// Popover needs PopoverTrigger for positioning
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <span>
      <Button style="secondary" onClick={() => setOpen(true)}>Open</Button>
    </span>
  </PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>
```

**Why span wrapper works:**
- `asChild` passes props to the span (no conflicts)
- Button keeps its custom `style` prop intact
- PopoverTrigger still gets positioning reference from span

#### For Variant-Specific Props (Discriminated Unions)

When a component uses discriminated union types (e.g., `SelectProps = DefaultSelectProps | MultiSelectProps | ...`), variant-specific props need the `in` type guard to avoid TypeScript errors:

```tsx
// WRONG - TypeScript error: Property 'selectType' does not exist on type 'SelectProps'
render: function Render(args) {
  return <Select selectType={args.selectType} />;  // Error!
},

// CORRECT - Use 'in' type guard for variant-specific props
render: function Render(args) {
  const selectType = 'selectType' in args ? args.selectType : undefined;
  const maxSelections = 'maxSelections' in args ? args.maxSelections : undefined;
  const selectedText = 'selectedText' in args ? (args.selectedText || undefined) : undefined;

  return (
    <Select
      variant="default"
      selectType={selectType}
      maxSelections={maxSelections}
      selectedText={selectedText}
    />
  );
},
```

**Common variant-specific props:**
- `SelectProps`: `selectType` (default), `maxSelections`/`selectedText` (multi-select), `maxVisibleTags`/`overflowText` (tags)
- `InputProps`: `showStrength`/`showToggle` (password), `prefix`/`suffix` (default)

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
Add under a new ## CSS/Styling Guidelines section\n\nWhen fixing CSS/styling issues, always analyze the existing styles and their interactions before proposing changes. Never remove styles (like border-bottom) unless explicitly requested.
Add under ## Testing or ## Quality Assurance section\n\nAfter implementing fixes, verify that related functionality still works. For component changes, check that dependent features (like tooltips, hover states) are not affected.
Add under a new ## Storybook section\n\nFor Storybook stories, follow existing patterns in the codebase. Check for existing stories in the same component folder or similar components before creating new ones.