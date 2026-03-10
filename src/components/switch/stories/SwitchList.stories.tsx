import type { Meta, StoryObj } from '@storybook/react-vite';
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
    showToggleAll: {
      control: 'boolean',
      description: '리스트 상단에 "전체 토글" 스위치 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    toggleAllLabel: {
      control: 'text',
      description: '"전체 토글" 스위치의 라벨 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '전체 토글' },
      },
    },
    onToggleAll: {
      action: 'toggleAll',
      description: '전체 토글 상태 변경 콜백',
      table: {
        type: { summary: '(checked: boolean) => void' },
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
  { id: '1', title: '이메일 알림', description: '이메일 업데이트 수신', checked: true },
  { id: '2', title: '푸시 알림', description: '기기에서 푸시 알림 수신', checked: false },
  { id: '3', title: 'SMS 알림', description: '문자 메시지 수신', checked: false },
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
    showToggleAll: false,
    toggleAllLabel: undefined,
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

    const handleToggleAll = (checked: boolean) => {
      setItems((prev) => prev.map((item) => ({ ...item, checked })));
    };

    const toggleAllLabel = args.toggleAllLabel || undefined;

    return (
      <div className="max-w-md">
        <SwitchList
          items={items}
          listStyle={args.listStyle}
          color={args.color}
          showToggleAll={args.showToggleAll}
          toggleAllLabel={toggleAllLabel}
          onToggleAll={handleToggleAll}
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
      { id: '1', title: '옵션 1', description: '옵션 1 설명', checked: true },
      { id: '2', title: '옵션 2', description: '옵션 2 설명', checked: false },
      { id: '3', title: '옵션 3', description: '옵션 3 설명', checked: false },
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
      { id: '1', title: '이메일 알림', description: '이메일 업데이트 수신', checked: true },
      { id: '2', title: '푸시 알림', description: '기기에서 푸시 알림 수신', checked: false },
      { id: '3', title: 'SMS 알림', description: '문자 메시지 수신', checked: true },
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
      { id: '1', title: '사용 가능한 옵션', description: '이 옵션은 전환할 수 있습니다', checked: true },
      { id: '2', title: '비활성화 (꺼짐)', description: '이 옵션은 비활성화되어 있습니다', checked: false, disabled: true },
      { id: '3', title: '다른 사용 가능한 옵션', description: '이 옵션도 전환할 수 있습니다', checked: false },
      { id: '4', title: '비활성화 (켜짐)', description: '이 옵션은 비활성화되어 있고 켜져 있습니다', checked: true, disabled: true },
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
 * 전체 토글 포함
 *
 * showToggleAll prop으로 리스트 상단에 "전체 토글" 스위치를 표시합니다.
 */
export const WithToggleAll: Story = {
  render: function Render() {
    const [items, setItems] = useState<SwitchListItem[]>([
      { id: '1', title: '이메일 알림', description: '이메일 업데이트 수신', checked: true },
      { id: '2', title: '푸시 알림', description: '기기에서 푸시 알림 수신', checked: false },
      { id: '3', title: 'SMS 알림', description: '문자 메시지 수신', checked: false },
    ]);

    const handleItemChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    const handleToggleAll = (checked: boolean) => {
      setItems((prev) => prev.map((item) => ({ ...item, checked })));
    };

    return (
      <div className="max-w-md">
        <SwitchList
          items={items}
          listStyle="bordered"
          showToggleAll
          toggleAllLabel="모든 알림"
          onToggleAll={handleToggleAll}
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
      { id: '1', title: '다크 모드', checked: false },
      { id: '2', title: '컴팩트 보기', checked: true },
      { id: '3', title: '자동 저장', checked: true },
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
