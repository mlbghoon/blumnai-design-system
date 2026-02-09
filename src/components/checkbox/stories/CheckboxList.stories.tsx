import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Checkbox } from '../Checkbox';
import { CheckboxList } from '../CheckboxList';
import type { CheckboxListProps, CheckboxListItem } from '../CheckboxList.types';

const meta: Meta<CheckboxListProps> = {
  title: 'DataEntry/Checkbox/CheckboxList',
  component: CheckboxList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    listStyle: {
      control: 'select',
      options: ['default', 'bordered'],
      description: '리스트 스타일',
      table: {
        type: {
          summary: 'CheckboxListStyle',
          detail: `'default' | 'bordered'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    checkboxStyle: {
      control: 'select',
      options: ['default', 'with-shadow'],
      description: '체크박스 스타일',
      table: {
        type: {
          summary: 'CheckboxStyle',
          detail: `'default' | 'with-shadow'`,
        },
        defaultValue: { summary: 'with-shadow' },
      },
    },
    items: {
      control: 'object',
      description: '체크박스 아이템 목록',
      table: {
        type: {
          summary: 'CheckboxListItem[]',
          detail: `{
  id: string;
  title: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
}[]`,
        },
      },
    },
    onItemChange: {
      action: 'itemChange',
      description: '아이템 체크 상태 변경 콜백',
      table: { type: { summary: '(id: string, checked: boolean) => void' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<CheckboxListProps>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 CheckboxList
 *
 * 이 스토리에서 CheckboxList의 모든 props를 테스트할 수 있습니다.
 * 클릭, Space, Enter 키로 체크 상태를 변경할 수 있습니다.
 */
export const Default: Story = {
  args: {
    listStyle: 'default',
    checkboxStyle: 'with-shadow',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [items, setItems] = useState<CheckboxListItem[]>([
      { id: '1', title: 'Option 1', description: 'Description for option 1', checked: true },
      { id: '2', title: 'Option 2', description: 'Description for option 2', checked: false },
      { id: '3', title: 'Option 3', checked: false },
    ]);

    const handleItemChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <CheckboxList
        items={items}
        listStyle={args.listStyle}
        checkboxStyle={args.checkboxStyle}
        onItemChange={handleItemChange}
      />
    );
  },
};

// ============================================================================
// STYLES
// ============================================================================

/**
 * Default 스타일
 */
export const StyleDefault: Story = {
  args: {
    items: [
      { id: '1', title: 'Option 1', description: 'Description text', checked: false },
      { id: '2', title: 'Option 2', description: 'Description text', checked: true },
      { id: '3', title: 'Option 3', checked: false },
    ],
    listStyle: 'default',
  },
};

/**
 * Bordered 스타일
 */
export const StyleBordered: Story = {
  args: {
    items: [
      { id: '1', title: 'Option 1', description: 'Description text', checked: false },
      { id: '2', title: 'Option 2', description: 'Description text', checked: true },
      { id: '3', title: 'Option 3', checked: false },
    ],
    listStyle: 'bordered',
  },
};

// ============================================================================
// VARIATIONS
// ============================================================================

/**
 * 제목만 있는 리스트
 */
export const TitleOnly: Story = {
  args: {
    items: [
      { id: '1', title: 'Email notifications', checked: true },
      { id: '2', title: 'Push notifications', checked: false },
      { id: '3', title: 'SMS notifications', checked: false },
    ],
  },
};

/**
 * 설명 포함 리스트
 */
export const WithDescriptions: Story = {
  args: {
    items: [
      { id: '1', title: 'Email notifications', description: 'Receive updates via email', checked: true },
      { id: '2', title: 'Push notifications', description: 'Get real-time alerts on your device', checked: false },
      { id: '3', title: 'SMS notifications', description: 'Receive text messages for important updates', checked: false },
    ],
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 비활성화된 아이템
 */
export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: '1', title: 'Available option', checked: false },
      { id: '2', title: 'Disabled unchecked', checked: false, disabled: true },
      { id: '3', title: 'Disabled checked', checked: true, disabled: true },
      { id: '4', title: 'Another available option', checked: true },
    ],
  },
};

// ============================================================================
// INTERACTIVE
// ============================================================================

/**
 * 전체 선택
 *
 * Checkbox와 CheckboxList를 조합하여 전체 선택 기능을 구현합니다.
 */
export const SelectAll: Story = {
  render: function Render() {
    const [items, setItems] = useState<CheckboxListItem[]>([
      { id: '1', title: 'Option 1', checked: true },
      { id: '2', title: 'Option 2', checked: false },
      { id: '3', title: 'Option 3', checked: true },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const parentState: boolean | 'indeterminate' = allChecked
      ? true
      : someChecked
        ? 'indeterminate'
        : false;

    const handleSelectAll = (checked: boolean | 'indeterminate') => {
      const newChecked = checked === true;
      setItems((prev) => prev.map((item) => ({ ...item, checked: newChecked })));
    };

    const handleItemChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div className="flex flex-col gap-16">
        <Checkbox
          checked={parentState}
          onCheckedChange={handleSelectAll}
          label="Select All"
        />
        <div style={{ marginLeft: '26px' }}>
          <CheckboxList
            items={items}
            onItemChange={handleItemChange}
          />
        </div>
        <p className="size-xs text-muted">
          선택됨: {items.filter((i) => i.checked).length} / {items.length}
        </p>
      </div>
    );
  },
};
