---
name: new-component
description: Create a new component with correct file structure and boilerplate. Auto-invoke when user wants to create a new component, mentions "new component", "create component", or starts work on a component that doesn't exist yet.
allowed-tools: Bash, Write, Read, Glob
---

# Create New Component

Generate the standard file structure and boilerplate for a new component.

## When to Auto-Invoke

- User asks to create a new component
- User mentions "new component", "create component", "add component"
- Starting work on a component that doesn't have files yet

## Directory Structure

Create the following structure:

```
src/components/{component-name}/
├── {ComponentName}.tsx           # Main component
├── {ComponentName}.types.ts      # TypeScript types
├── index.ts                      # Exports
├── source/                       # Figma specs (empty initially)
└── stories/
    └── {ComponentName}.stories.tsx
```

## File Templates

### {ComponentName}.tsx

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import type { {ComponentName}Props } from './{ComponentName}.types';

function {ComponentName}({
  className,
  children,
  ...props
}: {ComponentName}Props) {
  return (
    <div
      className={cn(
        'font-body',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

{ComponentName}.displayName = '{ComponentName}';

export { {ComponentName} };
```

### {ComponentName}.types.ts

```tsx
import type { HTMLAttributes } from 'react';

export interface {ComponentName}Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes
   */
  className?: string;
}
```

### index.ts

```tsx
export * from './{ComponentName}';
export * from './{ComponentName}.types';
```

### stories/{ComponentName}.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { {ComponentName} } from '../{ComponentName}';

const meta: Meta<typeof {ComponentName}> = {
  title: 'Components/{Category}/{ComponentName}',
  component: {ComponentName},
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof {ComponentName}>;

/**
 * 기본 컴포넌트
 */
export const Default: Story = {
  args: {
    children: '{ComponentName} content',
  },
  parameters: {
    controls: { disable: false },
  },
};
```

## Steps

1. **Convert name**: `ComponentName` → `component-name` for folder
2. **Create directories**: Main folder, source/, stories/
3. **Create files**: All 4 files with templates
4. **Ask for category**: For Storybook title (e.g., "Components/Form/Input")

## Naming Conventions

| Input | Folder | Component |
|-------|--------|-----------|
| Calendar | calendar | Calendar |
| DatePicker | date-picker | DatePicker |
| RadioGroup | radio-group | RadioGroup |

## After Creation

Report to user:

```
✓ Component created: {ComponentName}

Files:
- src/components/{component-name}/{ComponentName}.tsx
- src/components/{component-name}/{ComponentName}.types.ts
- src/components/{component-name}/index.ts
- src/components/{component-name}/stories/{ComponentName}.stories.tsx

Next steps:
1. Provide Figma URL to fetch design specs
2. Implement component logic
3. Add more stories for different states
```
