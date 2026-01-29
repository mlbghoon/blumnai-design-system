import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';
import type { DropdownProps, DropdownItemData, DropdownSection } from './Dropdown.types';

// Generic wrapper component for stateful dropdown
function StatefulDropdown({
  items,
  label,
  ...props
}: Omit<DropdownProps, 'value' | 'onChange'>) {
  const [selected, setSelected] = useState<string>();

  return (
    <Dropdown
      {...props}
      label={label}
      items={items}
      value={selected}
      onChange={(item) => setSelected(item.id)}
    />
  );
}

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '드롭다운 버튼에 표시되는 라벨 텍스트',
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    items: {
      control: 'object',
      description: '드롭다운 메뉴 아이템 목록 또는 섹션 목록',
      type: { required: true },
      table: {
        type: {
          summary: 'DropdownItemData[] | DropdownSection[]',
          detail: `// DropdownItemData
{
  id: string;              // 고유 식별자
  label: string;           // 라벨 텍스트
  size?: 'default' | 'large';
  leadIcon?: IconType;     // 라벨 앞 아이콘
  tailIcon?: IconType;     // 라벨 뒤 아이콘
  caption?: string;        // 캡션 텍스트
  description?: string;    // 설명 (large 사이즈만)
  shortcut?: string;       // 단축키
  disabled?: boolean;
  iconColor?: IconColor;
}

// DropdownSection
{
  label?: string;          // 섹션 라벨
  items: DropdownItemData[];
}`,
        },
      },
    },
    value: {
      control: 'text',
      description: '현재 선택된 아이템의 id',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: '아이템 선택 시 호출되는 콜백',
      table: {
        type: { summary: '(item: DropdownItemData) => void' },
      },
    },
    leadIcon: {
      control: 'object',
      description: '버튼 라벨 앞에 표시되는 아이콘',
      table: {
        type: { summary: 'IconType' },
      },
    },
    tailIcon: {
      control: 'object',
      description: '버튼 라벨 뒤에 표시되는 아이콘 (기본: chevron-down)',
      table: {
        type: { summary: 'IconType' },
        defaultValue: { summary: "['arrows', 'chevron-down']" },
      },
    },
    shortcut: {
      control: 'text',
      description: '버튼에 표시되는 단축키',
      table: {
        type: { summary: 'string' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '버튼 라벨 텍스트 정렬',
      table: {
        type: {
          summary: 'DropdownButtonAlign',
          detail: `'left' | 'center' | 'right'`,
        },
        defaultValue: { summary: 'center' },
      },
    },
    buttonWidth: {
      control: 'text',
      description: '버튼 너비 (픽셀 숫자 또는 CSS 값)',
      table: {
        type: { summary: 'number | string' },
      },
    },
    menuWidth: {
      control: 'text',
      description: '메뉴 너비 (픽셀 숫자 또는 CSS 값)',
      table: {
        type: { summary: 'number | string' },
      },
    },
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end'],
      description: '메뉴 위치',
      table: {
        type: {
          summary: 'DropdownPlacement',
          detail: `'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end'`,
        },
        defaultValue: { summary: 'bottom-start' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '드롭다운 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    trigger: {
      control: false,
      description: '커스텀 트리거 요소 (기본 DropdownButton 대체)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    open: {
      control: 'boolean',
      description: '제어 모드에서 열림 상태',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      action: 'openChanged',
      description: '열림 상태 변경 시 호출되는 콜백',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    portal: {
      control: 'boolean',
      description: '메뉴를 body에 포탈로 렌더링 (부모 요소에 의해 잘리지 않음)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300px', display: 'flex', alignItems: 'flex-start', paddingTop: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const simpleItems: DropdownItemData[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'archive', label: 'Archive' },
  { id: 'delete', label: 'Delete', disabled: true },
];

const itemsWithIcons: DropdownItemData[] = [
  { id: 'edit', label: 'Edit', leadIcon: ['design', 'edit'] },
  { id: 'duplicate', label: 'Duplicate', leadIcon: ['document', 'file-copy'] },
  { id: 'archive', label: 'Archive', leadIcon: ['business', 'archive'] },
  { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'], disabled: true },
];

const itemsWithShortcuts: DropdownItemData[] = [
  { id: 'edit', label: 'Edit', leadIcon: ['design', 'edit'], shortcut: '⌘E' },
  { id: 'duplicate', label: 'Duplicate', leadIcon: ['document', 'file-copy'], shortcut: '⌘D' },
  { id: 'archive', label: 'Archive', leadIcon: ['business', 'archive'], shortcut: '⌘A' },
  { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'], shortcut: '⌫' },
];

const sectionsWithLabels: DropdownSection[] = [
  {
    label: 'Actions',
    items: [
      { id: 'edit', label: 'Edit', leadIcon: ['design', 'edit'] },
      { id: 'duplicate', label: 'Duplicate', leadIcon: ['document', 'file-copy'] },
    ],
  },
  {
    label: 'Organize',
    items: [
      { id: 'archive', label: 'Archive', leadIcon: ['business', 'archive'] },
      { id: 'move', label: 'Move to folder', leadIcon: ['document', 'folder'] },
    ],
  },
  {
    items: [
      { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'] },
    ],
  },
];

// Wrapper for Default story with controls
function DefaultDropdownExample(args: {
  label?: string;
  items?: DropdownItemData[] | DropdownSection[];
  align?: 'left' | 'center' | 'right';
  buttonWidth?: number | string;
  menuWidth?: number | string;
  placement?: DropdownProps['placement'];
  disabled?: boolean;
  portal?: boolean;
}) {
  const [selected, setSelected] = useState<string>();

  const menuWidth = args.menuWidth
    ? Number(args.menuWidth)
    : undefined;

  const buttonWidth = args.buttonWidth
    ? /^\d+$/.test(String(args.buttonWidth))
      ? Number(args.buttonWidth)
      : args.buttonWidth
    : undefined;

  return (
    <Dropdown
      label={args.label ?? 'Select action'}
      items={args.items ?? simpleItems}
      value={selected}
      onChange={(item) => setSelected(item.id)}
      align={args.align}
      buttonWidth={buttonWidth}
      menuWidth={menuWidth}
      placement={args.placement}
      disabled={args.disabled}
      portal={args.portal}
    />
  );
}

/**
 * Default Dropdown
 */
export const Default: Story = {
  args: {
    label: 'Select action',
    items: simpleItems,
    align: 'center',
    buttonWidth: undefined,
    menuWidth: undefined,
    placement: 'bottom-start',
    disabled: false,
    portal: true,
  },
  render: (args) => <DefaultDropdownExample {...args} />,
  parameters: {
    controls: { disable: false },
    docs: {
      source: {
        code: `const [selected, setSelected] = useState<string>();

<Dropdown
  label="Select action"
  items={[
    { id: 'edit', label: 'Edit' },
    { id: 'duplicate', label: 'Duplicate' },
    { id: 'archive', label: 'Archive' },
    { id: 'delete', label: 'Delete', disabled: true },
  ]}
  value={selected}
  onChange={(item) => setSelected(item.id)}
  placement="bottom-start"
  portal
/>`,
      },
    },
  },
};

/**
 * With Icons
 */
export const WithIcons: Story = {
  render: () => (
    <StatefulDropdown
      label="Select action"
      items={itemsWithIcons}
      leadIcon={['system', 'menu']}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown
  label="Select action"
  items={[
    { id: 'edit', label: 'Edit', leadIcon: ['design', 'edit'] },
    { id: 'duplicate', label: 'Duplicate', leadIcon: ['document', 'file-copy'] },
    { id: 'archive', label: 'Archive', leadIcon: ['business', 'archive'] },
    { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'], disabled: true },
  ]}
  leadIcon={['system', 'menu']}
  value={selected}
  onChange={(item) => setSelected(item.id)}
/>`,
      },
    },
  },
};

/**
 * With Shortcuts
 */
export const WithShortcuts: Story = {
  render: () => (
    <StatefulDropdown
      label="Select action"
      items={itemsWithShortcuts}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown
  label="Select action"
  items={[
    { id: 'edit', label: 'Edit', leadIcon: ['design', 'edit'], shortcut: '⌘E' },
    { id: 'duplicate', label: 'Duplicate', leadIcon: ['document', 'file-copy'], shortcut: '⌘D' },
    { id: 'archive', label: 'Archive', leadIcon: ['business', 'archive'], shortcut: '⌘A' },
    { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'], shortcut: '⌫' },
  ]}
  value={selected}
  onChange={(item) => setSelected(item.id)}
/>`,
      },
    },
  },
};

/**
 * With Sections
 */
export const WithSections: Story = {
  render: () => (
    <StatefulDropdown
      label="Select action"
      items={sectionsWithLabels}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown
  label="Select action"
  items={[
    {
      label: 'Actions',
      items: [
        { id: 'edit', label: 'Edit', leadIcon: ['design', 'edit'] },
        { id: 'duplicate', label: 'Duplicate', leadIcon: ['document', 'file-copy'] },
      ],
    },
    {
      label: 'Organize',
      items: [
        { id: 'archive', label: 'Archive', leadIcon: ['business', 'archive'] },
        { id: 'move', label: 'Move to folder', leadIcon: ['document', 'folder'] },
      ],
    },
    {
      items: [
        { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'] },
      ],
    },
  ]}
  value={selected}
  onChange={(item) => setSelected(item.id)}
/>`,
      },
    },
  },
};

/**
 * Placement Options
 */
export const Placement: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '150px 50px' }}>
      <div style={{ display: 'flex', gap: '48px' }}>
        <StatefulDropdown
          label="Bottom Start"
          items={simpleItems}
          placement="bottom-start"
        />
        <StatefulDropdown
          label="Bottom"
          items={simpleItems}
          placement="bottom"
        />
        <StatefulDropdown
          label="Bottom End"
          items={simpleItems}
          placement="bottom-end"
        />
      </div>
      <div style={{ display: 'flex', gap: '48px' }}>
        <StatefulDropdown
          label="Top Start"
          items={simpleItems}
          placement="top-start"
        />
        <StatefulDropdown
          label="Top"
          items={simpleItems}
          placement="top"
        />
        <StatefulDropdown
          label="Top End"
          items={simpleItems}
          placement="top-end"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown label="Bottom Start" items={items} placement="bottom-start" />
<Dropdown label="Bottom" items={items} placement="bottom" />
<Dropdown label="Bottom End" items={items} placement="bottom-end" />
<Dropdown label="Top Start" items={items} placement="top-start" />
<Dropdown label="Top" items={items} placement="top" />
<Dropdown label="Top End" items={items} placement="top-end" />`,
      },
    },
  },
};

/**
 * Menu Width Options
 */
export const MenuWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <StatefulDropdown
        label="Auto width"
        items={simpleItems}
      />
      <StatefulDropdown
        label="Fixed 200px"
        items={simpleItems}
        menuWidth={200}
      />
      <StatefulDropdown
        label="Fixed 300px"
        items={simpleItems}
        menuWidth={300}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown label="Auto width" items={items} />
<Dropdown label="Fixed 200px" items={items} menuWidth={200} />
<Dropdown label="Fixed 300px" items={items} menuWidth={300} />`,
      },
    },
  },
};

/**
 * Disabled State
 */
export const Disabled: Story = {
  render: () => (
    <StatefulDropdown
      label="Select action"
      items={simpleItems}
      disabled
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown label="Select action" items={items} disabled />`,
      },
    },
  },
};

const largeItems: DropdownItemData[] = [
  {
    id: 'workspace',
    label: 'Workspace Settings',
    description: 'Manage workspace preferences and members',
    leadIcon: ['system', 'settings'],
    size: 'large',
  },
  {
    id: 'profile',
    label: 'Profile Settings',
    description: 'Update your personal information',
    leadIcon: ['user', 'user'],
    size: 'large',
  },
  {
    id: 'billing',
    label: 'Billing',
    description: 'Manage your subscription and payments',
    leadIcon: ['finance', 'bank-card'],
    size: 'large',
  },
];

/**
 * With Large Items
 */
export const LargeItems: Story = {
  render: () => (
    <StatefulDropdown
      label="Settings"
      items={largeItems}
      menuWidth={280}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown
  label="Settings"
  items={[
    {
      id: 'workspace',
      label: 'Workspace Settings',
      description: 'Manage workspace preferences and members',
      leadIcon: ['system', 'settings'],
      size: 'large',
    },
    {
      id: 'profile',
      label: 'Profile Settings',
      description: 'Update your personal information',
      leadIcon: ['user', 'user'],
      size: 'large',
    },
    {
      id: 'billing',
      label: 'Billing',
      description: 'Manage your subscription and payments',
      leadIcon: ['finance', 'bank-card'],
      size: 'large',
    },
  ]}
  menuWidth={280}
/>`,
      },
    },
  },
};

// Wrapper for Controlled story
function ControlledDropdownExample() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-default)',
            cursor: 'pointer',
          }}
        >
          Open
        </button>
        <button
          onClick={() => setOpen(false)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-default)',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
      <Dropdown
        label="Controlled dropdown"
        items={simpleItems}
        value={selected}
        onChange={(item) => setSelected(item.id)}
        open={open}
        onOpenChange={setOpen}
      />
      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        Selected: {selected || 'none'}
      </div>
    </div>
  );
}

/**
 * Controlled State
 */
export const Controlled: Story = {
  render: () => <ControlledDropdownExample />,
  parameters: {
    docs: {
      source: {
        code: `const [open, setOpen] = useState(false);
const [selected, setSelected] = useState<string>();

<Dropdown
  label="Controlled dropdown"
  items={items}
  value={selected}
  onChange={(item) => setSelected(item.id)}
  open={open}
  onOpenChange={setOpen}
/>`,
      },
    },
  },
};

const itemsWithColors: DropdownItemData[] = [
  { id: 'success', label: 'Completed', leadIcon: ['system', 'checkbox-circle'], iconColor: 'success' },
  { id: 'warning', label: 'Pending Review', leadIcon: ['system', 'error-warning'], iconColor: 'warning' },
  { id: 'info', label: 'More Info', leadIcon: ['system', 'information'], iconColor: 'informative' },
  { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'], iconColor: 'destructive' },
];

/**
 * With Icon Colors
 */
export const WithIconColors: Story = {
  render: () => (
    <StatefulDropdown
      label="Status"
      items={itemsWithColors}
      menuWidth={200}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown
  label="Status"
  items={[
    { id: 'success', label: 'Completed', leadIcon: ['system', 'checkbox-circle'], iconColor: 'success' },
    { id: 'warning', label: 'Pending Review', leadIcon: ['system', 'error-warning'], iconColor: 'warning' },
    { id: 'info', label: 'More Info', leadIcon: ['system', 'information'], iconColor: 'informative' },
    { id: 'delete', label: 'Delete', leadIcon: ['system', 'delete-bin'], iconColor: 'destructive' },
  ]}
  menuWidth={200}
/>`,
      },
    },
  },
};

/**
 * Button Width and Alignment
 */
export const ButtonWidthAndAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <StatefulDropdown
        label="Left Aligned"
        items={simpleItems}
        align="left"
        buttonWidth={200}
      />
      <StatefulDropdown
        label="Center Aligned"
        items={simpleItems}
        align="center"
        buttonWidth={200}
      />
      <StatefulDropdown
        label="Right Aligned"
        items={simpleItems}
        align="right"
        buttonWidth={200}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown label="Left Aligned" items={items} align="left" buttonWidth={200} />
<Dropdown label="Center Aligned" items={items} align="center" buttonWidth={200} />
<Dropdown label="Right Aligned" items={items} align="right" buttonWidth={200} />`,
      },
    },
  },
};

// Extended items for search demo
const searchableItems: DropdownItemData[] = [
  { id: 'apple', label: 'Apple', leadIcon: ['food', 'bowl'] },
  { id: 'banana', label: 'Banana', leadIcon: ['food', 'bowl'] },
  { id: 'cherry', label: 'Cherry', leadIcon: ['food', 'bowl'] },
  { id: 'dragon-fruit', label: 'Dragon Fruit', leadIcon: ['food', 'bowl'] },
  { id: 'elderberry', label: 'Elderberry', leadIcon: ['food', 'bowl'] },
  { id: 'fig', label: 'Fig', leadIcon: ['food', 'bowl'] },
  { id: 'grape', label: 'Grape', leadIcon: ['food', 'bowl'] },
  { id: 'honeydew', label: 'Honeydew', leadIcon: ['food', 'bowl'] },
];

const searchableSections: DropdownSection[] = [
  {
    label: 'Fruits',
    items: [
      { id: 'apple', label: 'Apple', leadIcon: ['food', 'bowl'] },
      { id: 'banana', label: 'Banana', leadIcon: ['food', 'bowl'] },
      { id: 'cherry', label: 'Cherry', leadIcon: ['food', 'bowl'] },
    ],
  },
  {
    label: 'Vegetables',
    items: [
      { id: 'carrot', label: 'Carrot', leadIcon: ['food', 'bowl'] },
      { id: 'broccoli', label: 'Broccoli', leadIcon: ['food', 'bowl'] },
      { id: 'celery', label: 'Celery', leadIcon: ['food', 'bowl'] },
    ],
  },
];

/**
 * Searchable Dropdown
 *
 * Add search functionality with the `searchable` prop.
 * Items are filtered client-side by default.
 */
export const Searchable: Story = {
  render: () => (
    <StatefulDropdown
      label="Select fruit"
      items={searchableItems}
      searchable
      searchPlaceholder="Search fruits..."
      menuWidth={240}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown
  label="Select fruit"
  items={[
    { id: 'apple', label: 'Apple', leadIcon: ['food', 'bowl'] },
    { id: 'banana', label: 'Banana', leadIcon: ['food', 'bowl'] },
    { id: 'cherry', label: 'Cherry', leadIcon: ['food', 'bowl'] },
    // ...more items
  ]}
  searchable
  searchPlaceholder="Search fruits..."
  menuWidth={240}
  value={selected}
  onChange={(item) => setSelected(item.id)}
/>`,
      },
    },
  },
};

/**
 * Searchable with Sections
 *
 * Search works with sectioned items too.
 */
export const SearchableWithSections: Story = {
  render: () => (
    <StatefulDropdown
      label="Select item"
      items={searchableSections}
      searchable
      searchPlaceholder="Search..."
      menuWidth={240}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown
  label="Select item"
  items={[
    {
      label: 'Fruits',
      items: [
        { id: 'apple', label: 'Apple' },
        { id: 'banana', label: 'Banana' },
      ],
    },
    {
      label: 'Vegetables',
      items: [
        { id: 'carrot', label: 'Carrot' },
        { id: 'broccoli', label: 'Broccoli' },
      ],
    },
  ]}
  searchable
  searchPlaceholder="Search..."
/>`,
      },
    },
  },
};

// Custom search handler example
function ExternalSearchDropdownExample() {
  const [selected, setSelected] = useState<string>();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <Dropdown
        label="Select fruit"
        items={searchableItems}
        value={selected}
        onChange={(item) => setSelected(item.id)}
        searchable
        onSearch={setSearchQuery}
        filterItems={false}
        searchPlaceholder="Search (no filter)..."
        menuWidth={240}
      />
      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        Search query: "{searchQuery}"
      </div>
    </div>
  );
}

/**
 * External Search Handler
 *
 * Use `onSearch` callback with `filterItems={false}` to handle filtering externally.
 * Useful for server-side search or custom filtering logic.
 */
export const ExternalSearch: Story = {
  render: () => <ExternalSearchDropdownExample />,
  parameters: {
    docs: {
      source: {
        code: `const [searchQuery, setSearchQuery] = useState('');

<Dropdown
  label="Select fruit"
  items={filteredItems} // Your custom filtered items
  searchable
  onSearch={setSearchQuery}
  filterItems={false}
  searchPlaceholder="Search..."
/>`,
      },
    },
  },
};

/**
 * Custom No Results Text
 *
 * Use `noResultsText` prop to customize the message shown when search yields no results.
 */
export const CustomNoResultsText: Story = {
  render: () => (
    <StatefulDropdown
      label="Select fruit"
      items={searchableItems}
      searchable
      searchPlaceholder="Search fruits..."
      noResultsText="Nothing matches your search"
      menuWidth={240}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Dropdown
  label="Select fruit"
  items={items}
  searchable
  searchPlaceholder="Search fruits..."
  noResultsText="Nothing matches your search"
  menuWidth={240}
/>`,
      },
    },
  },
};
