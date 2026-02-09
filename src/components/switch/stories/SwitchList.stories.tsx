import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SwitchList } from '../SwitchList';
import type { SwitchListItem } from '../SwitchList.types';

const meta: Meta<typeof SwitchList> = {
  title: 'DataEntry/Switch/SwitchList',
  component: SwitchList,
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
          summary: 'SwitchListStyle',
          detail: `'default' | 'bordered'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    color: {
      control: 'select',
      options: ['green', 'blue', 'red', 'orange', 'violet', 'cyan', 'pink'],
      description: '스위치 색상',
      table: {
        type: {
          summary: 'SwitchColor',
          detail: `'green' | 'blue' | 'red' | 'orange' | 'violet' | 'cyan' | 'pink'`,
        },
        defaultValue: { summary: 'green' },
      },
    },
    items: {
      description: '스위치 아이템 목록',
      table: {
        type: { summary: 'SwitchListItem[]' },
      },
    },
    onItemChange: {
      action: 'itemChanged',
      description: '아이템 체크 상태 변경 핸들러',
      table: {
        type: { summary: '(id: string, checked: boolean) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SwitchList>;

const defaultItems: SwitchListItem[] = [
  { id: '1', title: 'Email notifications', description: 'Receive email updates', checked: true },
  { id: '2', title: 'Push notifications', description: 'Receive push notifications on your device', checked: false },
  { id: '3', title: 'SMS notifications', description: 'Receive text messages', checked: false },
];

/**
 * 기본 SwitchList
 *
 * 이 스토리에서 SwitchList의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    listStyle: 'default',
    color: 'green',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [items, setItems] = useState<SwitchListItem[]>(defaultItems);

    const handleItemChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div className="max-w-md">
        <SwitchList
          items={items}
          listStyle={args.listStyle}
          color={args.color}
          onItemChange={handleItemChange}
        />
      </div>
    );
  },
};

/**
 * 기본 스타일 (간격만 있음)
 */
export const DefaultStyle: Story = {
  render: function Render() {
    const [items, setItems] = useState<SwitchListItem[]>([
      { id: '1', title: 'Option 1', description: 'Description for option 1', checked: true },
      { id: '2', title: 'Option 2', description: 'Description for option 2', checked: false },
      { id: '3', title: 'Option 3', description: 'Description for option 3', checked: false },
    ]);

    const handleItemChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div className="max-w-md">
        <SwitchList
          items={items}
          listStyle="default"
          onItemChange={handleItemChange}
        />
      </div>
    );
  },
};

/**
 * 테두리 스타일 (구분선 있음)
 */
export const BorderedStyle: Story = {
  render: function Render() {
    const [items, setItems] = useState<SwitchListItem[]>([
      { id: '1', title: 'Email notifications', description: 'Receive email updates', checked: true },
      { id: '2', title: 'Push notifications', description: 'Receive push on device', checked: false },
      { id: '3', title: 'SMS notifications', description: 'Receive text messages', checked: true },
    ]);

    const handleItemChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div className="max-w-md">
        <SwitchList
          items={items}
          listStyle="bordered"
          onItemChange={handleItemChange}
        />
      </div>
    );
  },
};

/**
 * 혼합 상태 (일부 비활성화)
 */
export const MixedStates: Story = {
  render: function Render() {
    const [items, setItems] = useState<SwitchListItem[]>([
      { id: '1', title: 'Available option', description: 'This option can be toggled', checked: true },
      { id: '2', title: 'Disabled unchecked', description: 'This option is disabled', checked: false, disabled: true },
      { id: '3', title: 'Another available', description: 'This option can also be toggled', checked: false },
      { id: '4', title: 'Disabled checked', description: 'This option is disabled and checked', checked: true, disabled: true },
    ]);

    const handleItemChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div className="max-w-md">
        <SwitchList
          items={items}
          listStyle="bordered"
          onItemChange={handleItemChange}
        />
      </div>
    );
  },
};

/**
 * 라벨만 있는 스위치 리스트
 */
export const LabelsOnly: Story = {
  render: function Render() {
    const [items, setItems] = useState<SwitchListItem[]>([
      { id: '1', title: 'Dark mode', checked: false },
      { id: '2', title: 'Compact view', checked: true },
      { id: '3', title: 'Auto-save', checked: true },
    ]);

    const handleItemChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div className="max-w-md">
        <SwitchList
          items={items}
          listStyle="default"
          onItemChange={handleItemChange}
        />
      </div>
    );
  },
};
