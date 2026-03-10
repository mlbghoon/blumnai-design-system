import type { Meta, StoryObj } from '@storybook/react-vite';
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
    name: {
      control: 'text',
      description: '체크박스의 HTML form name 속성 (모든 체크박스에 공통 적용)',
      table: {
        type: { summary: 'string' },
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
    name: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [items, setItems] = useState<CheckboxListItem[]>([
      { id: '1', title: '옵션 1', description: '옵션 1에 대한 설명', checked: true },
      { id: '2', title: '옵션 2', description: '옵션 2에 대한 설명', checked: false },
      { id: '3', title: '옵션 3', checked: false },
    ]);

    const handleItemChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    const name = args.name || undefined;

    return (
      <CheckboxList
        items={items}
        listStyle={args.listStyle}
        checkboxStyle={args.checkboxStyle}
        name={name}
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
      { id: '1', title: '옵션 1', description: '설명 텍스트', checked: false },
      { id: '2', title: '옵션 2', description: '설명 텍스트', checked: true },
      { id: '3', title: '옵션 3', checked: false },
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
      { id: '1', title: '옵션 1', description: '설명 텍스트', checked: false },
      { id: '2', title: '옵션 2', description: '설명 텍스트', checked: true },
      { id: '3', title: '옵션 3', checked: false },
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
      { id: '1', title: '이메일 알림', checked: true },
      { id: '2', title: '푸시 알림', checked: false },
      { id: '3', title: 'SMS 알림', checked: false },
    ],
  },
};

/**
 * 설명 포함 리스트
 */
export const WithDescriptions: Story = {
  args: {
    items: [
      { id: '1', title: '이메일 알림', description: '이메일로 업데이트를 받습니다', checked: true },
      { id: '2', title: '푸시 알림', description: '기기에서 실시간 알림을 받습니다', checked: false },
      { id: '3', title: 'SMS 알림', description: '중요한 업데이트를 문자 메시지로 받습니다', checked: false },
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
      { id: '1', title: '사용 가능한 옵션', checked: false },
      { id: '2', title: '비활성화 (미선택)', checked: false, disabled: true },
      { id: '3', title: '비활성화 (선택됨)', checked: true, disabled: true },
      { id: '4', title: '또 다른 사용 가능한 옵션', checked: true },
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
      { id: '1', title: '옵션 1', checked: true },
      { id: '2', title: '옵션 2', checked: false },
      { id: '3', title: '옵션 3', checked: true },
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
      <div className="flex flex-col ds-gap-16">
        <Checkbox
          checked={parentState}
          onCheckedChange={handleSelectAll}
          label="전체 선택"
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
