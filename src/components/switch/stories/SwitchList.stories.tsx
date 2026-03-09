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
      description: '리스트의 외관 스타일을 설정합니다. default(기본 간격), bordered(구분선 포함) 중 선택할 수 있습니다',
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
      description: '스위치의 활성 상태 색상을 설정합니다. green, blue, red, orange, violet, cyan, pink 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'SwitchColor',
          detail: `'green' | 'blue' | 'red' | 'orange' | 'violet' | 'cyan' | 'pink'`,
        },
        defaultValue: { summary: 'green' },
      },
    },
    items: {
      description: '스위치 리스트에 표시할 아이템 배열입니다. 각 아이템은 id, title을 필수로 가지며 description, checked, disabled 등을 설정할 수 있습니다',
      table: {
        type: { summary: 'SwitchListItem[]' },
      },
    },
    onItemChange: {
      action: 'itemChanged',
      description: '아이템의 스위치 상태가 변경될 때 호출되는 콜백 함수입니다. id와 새로운 체크 상태를 인자로 받습니다',
      table: {
        type: { summary: '(id: string, checked: boolean) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SwitchList>;

const defaultItems: SwitchListItem[] = [
  { id: '1', title: '이메일 알림', description: '이메일로 업데이트를 수신합니다', checked: true },
  { id: '2', title: '푸시 알림', description: '기기에서 푸시 알림을 받습니다', checked: false },
  { id: '3', title: 'SMS 알림', description: '문자 메시지를 받습니다', checked: false },
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
      { id: '1', title: '옵션 1', description: '옵션 1에 대한 설명', checked: true },
      { id: '2', title: '옵션 2', description: '옵션 2에 대한 설명', checked: false },
      { id: '3', title: '옵션 3', description: '옵션 3에 대한 설명', checked: false },
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
      { id: '1', title: '이메일 알림', description: '이메일로 업데이트를 수신합니다', checked: true },
      { id: '2', title: '푸시 알림', description: '기기에서 푸시 알림을 받습니다', checked: false },
      { id: '3', title: 'SMS 알림', description: '문자 메시지를 받습니다', checked: true },
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
      { id: '2', title: '비활성화 꺼짐', description: '이 옵션은 비활성화되어 있습니다', checked: false, disabled: true },
      { id: '3', title: '다른 사용 가능한 옵션', description: '이 옵션도 전환할 수 있습니다', checked: false },
      { id: '4', title: '비활성화 켜짐', description: '이 옵션은 비활성화되어 있고 켜져 있습니다', checked: true, disabled: true },
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
      { id: '1', title: '다크 모드', checked: false },
      { id: '2', title: '콤팩트 뷰', checked: true },
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
