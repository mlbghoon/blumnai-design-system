import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { RadioList } from '../RadioList';
import type { RadioListProps } from '../RadioList.types';

const meta: Meta<RadioListProps> = {
  title: 'DataEntry/Radio/RadioList',
  component: RadioList,
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
          summary: 'RadioListStyle',
          detail: `'default' | 'bordered'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    radioStyle: {
      control: 'select',
      options: ['default', 'with-shadow'],
      description: '라디오 버튼의 외관 스타일을 설정합니다. default(기본), with-shadow(그림자 효과) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'RadioStyle',
          detail: `'default' | 'with-shadow'`,
        },
        defaultValue: { summary: 'with-shadow' },
      },
    },
    items: {
      control: 'object',
      description: '라디오 리스트에 표시할 아이템 배열입니다. 각 아이템은 value, title을 필수로 가지며 description, disabled 등을 설정할 수 있습니다',
      table: {
        type: {
          summary: 'RadioListItem[]',
          detail: `{
  value: string;
  title: string;
  description?: string;
  disabled?: boolean;
}[]`,
        },
      },
    },
    value: {
      control: 'text',
      description: '현재 선택된 라디오 아이템의 value 값입니다. 외부에서 제어할 때 사용합니다',
      table: { type: { summary: 'string' } },
    },
    onValueChange: {
      action: 'valueChange',
      description: '선택된 값이 변경될 때 호출되는 콜백 함수입니다',
      table: { type: { summary: '(value: string) => void' } },
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
type Story = StoryObj<RadioListProps>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 RadioList
 *
 * 이 스토리에서 RadioList의 모든 props를 테스트할 수 있습니다.
 * 단일 선택만 허용됩니다.
 */
export const Default: Story = {
  args: {
    listStyle: 'default',
    radioStyle: 'with-shadow',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState('1');

    const items = [
      { value: '1', title: '옵션 1', description: '옵션 1에 대한 설명' },
      { value: '2', title: '옵션 2', description: '옵션 2에 대한 설명' },
      { value: '3', title: '옵션 3' },
    ];

    return (
      <RadioList
        items={items}
        value={value}
        onValueChange={setValue}
        listStyle={args.listStyle}
        radioStyle={args.radioStyle}
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
  render: function Render() {
    const [value, setValue] = useState('2');
    return (
      <RadioList
        items={[
          { value: '1', title: '옵션 1', description: '설명 텍스트' },
          { value: '2', title: '옵션 2', description: '설명 텍스트' },
          { value: '3', title: '옵션 3' },
        ]}
        value={value}
        onValueChange={setValue}
        listStyle="default"
      />
    );
  },
};

/**
 * Bordered 스타일
 */
export const StyleBordered: Story = {
  render: function Render() {
    const [value, setValue] = useState('2');
    return (
      <RadioList
        items={[
          { value: '1', title: '옵션 1', description: '설명 텍스트' },
          { value: '2', title: '옵션 2', description: '설명 텍스트' },
          { value: '3', title: '옵션 3' },
        ]}
        value={value}
        onValueChange={setValue}
        listStyle="bordered"
      />
    );
  },
};

// ============================================================================
// VARIATIONS
// ============================================================================

/**
 * 제목만 있는 리스트
 */
export const TitleOnly: Story = {
  render: function Render() {
    const [value, setValue] = useState('email');
    return (
      <RadioList
        items={[
          { value: 'email', title: '이메일 알림' },
          { value: 'push', title: '푸시 알림' },
          { value: 'sms', title: 'SMS 알림' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * 설명 포함 리스트
 */
export const WithDescriptions: Story = {
  render: function Render() {
    const [value, setValue] = useState('email');
    return (
      <RadioList
        items={[
          { value: 'email', title: '이메일 알림', description: '이메일로 업데이트를 수신합니다' },
          { value: 'push', title: '푸시 알림', description: '기기에서 실시간 알림을 받습니다' },
          { value: 'sms', title: 'SMS 알림', description: '중요한 업데이트를 문자 메시지로 받습니다' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 비활성화된 아이템
 */
export const WithDisabledItems: Story = {
  render: function Render() {
    const [value, setValue] = useState('4');
    return (
      <RadioList
        items={[
          { value: '1', title: '사용 가능한 옵션' },
          { value: '2', title: '비활성화 미선택', disabled: true },
          { value: '3', title: '비활성화 선택됨', disabled: true },
          { value: '4', title: '다른 사용 가능한 옵션' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

// ============================================================================
// INTERACTIVE
// ============================================================================

/**
 * 선택 표시
 */
export const WithSelectionDisplay: Story = {
  render: function Render() {
    const [value, setValue] = useState('option1');

    return (
      <div className="flex flex-col ds-gap-16">
        <RadioList
          items={[
            { value: 'option1', title: '옵션 1' },
            { value: 'option2', title: '옵션 2' },
            { value: 'option3', title: '옵션 3' },
          ]}
          value={value}
          onValueChange={setValue}
        />
        <p className="size-xs text-muted">
          선택됨: {value || '없음'}
        </p>
      </div>
    );
  },
};
