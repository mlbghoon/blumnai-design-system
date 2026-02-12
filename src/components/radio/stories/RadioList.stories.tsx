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
      description: '리스트 스타일',
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
      description: '라디오 버튼 스타일',
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
      description: '라디오 아이템 목록',
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
      description: '현재 선택된 값',
      table: { type: { summary: 'string' } },
    },
    onValueChange: {
      action: 'valueChange',
      description: '값 변경 콜백',
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
      { value: '1', title: 'Option 1', description: 'Description for option 1' },
      { value: '2', title: 'Option 2', description: 'Description for option 2' },
      { value: '3', title: 'Option 3' },
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
          { value: '1', title: 'Option 1', description: 'Description text' },
          { value: '2', title: 'Option 2', description: 'Description text' },
          { value: '3', title: 'Option 3' },
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
          { value: '1', title: 'Option 1', description: 'Description text' },
          { value: '2', title: 'Option 2', description: 'Description text' },
          { value: '3', title: 'Option 3' },
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
          { value: 'email', title: 'Email notifications' },
          { value: 'push', title: 'Push notifications' },
          { value: 'sms', title: 'SMS notifications' },
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
          { value: 'email', title: 'Email notifications', description: 'Receive updates via email' },
          { value: 'push', title: 'Push notifications', description: 'Get real-time alerts on your device' },
          { value: 'sms', title: 'SMS notifications', description: 'Receive text messages for important updates' },
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
          { value: '1', title: 'Available option' },
          { value: '2', title: 'Disabled unchecked', disabled: true },
          { value: '3', title: 'Disabled checked', disabled: true },
          { value: '4', title: 'Another available option' },
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
      <div className="flex flex-col gap-16">
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
