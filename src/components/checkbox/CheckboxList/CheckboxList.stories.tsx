import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxList } from './CheckboxList';

const meta: Meta<typeof CheckboxList> = {
  title: 'Components/Checkbox/CheckboxList',
  component: CheckboxList,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '체크박스 아이템 배열',
      table: {
        type: {
          summary: 'CheckboxListItem[]',
          detail: `각 아이템 속성:
- id: string (필수)
- title: string (필수)
- description?: string
- checked?: boolean
- disabled?: boolean`,
        },
      },
    },
    style: {
      control: 'select',
      options: ['default', 'bordered'],
      description: '리스트 스타일 변형',
      table: {
        type: {
          summary: 'CheckboxListStyle',
          detail: `'default' | 'bordered'

- default: 아이템 사이 테두리 없음
- bordered: 각 아이템을 구분하는 테두리`,
        },
      },
    },
    checkboxStyle: {
      control: 'select',
      options: ['default', 'with-shadow'],
      description: '체크박스 스타일 변형',
      table: {
        type: {
          summary: 'CheckboxStyle',
          detail: `'default' | 'with-shadow'`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxList>;

/**
 * 기본 리스트 (제목만)
 *
 * CheckboxList 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    items: [
      { id: '1', title: 'Subscription renewal emails', checked: false },
      { id: '2', title: 'User onboarding emails', checked: true },
      { id: '3', title: 'Product update notifications', checked: false },
      { id: '4', title: 'Feedback request emails', checked: false },
      { id: '5', title: 'Promotional campaign emails', checked: false },
    ],
    style: 'default',
    checkboxStyle: 'with-shadow',
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: (args) => {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (listRef.current) {
        console.log('CheckboxList ref:', listRef.current);
      }
    }, []);

    return <CheckboxList ref={listRef} {...args} />;
  },
};

/**
 * 기본 리스트 (제목 + 설명)
 */
export const WithDescription: Story = {
  render: () => (
    <CheckboxList
      items={[
        {
          id: '1',
          title: 'Subscription renewal emails',
          description: 'Send customers email receipts for subscription payments',
          checked: false,
        },
        {
          id: '2',
          title: 'User onboarding emails',
          description: 'Welcome new users with a guide to getting started',
          checked: true,
        },
        {
          id: '3',
          title: 'Product update notifications',
          description: 'Inform users about the latest features and improvements',
          checked: false,
        },
        {
          id: '4',
          title: 'Feedback request emails',
          description: 'Ask customers for feedback on their experience',
          checked: false,
        },
        {
          id: '5',
          title: 'Promotional campaign emails',
          description: 'Share discounts and special offers with subscribers',
          checked: false,
        },
      ]}
      style="default"
      checkboxStyle="with-shadow"
    />
  ),
};

/**
 * 테두리 있는 리스트 (제목만)
 */
export const Bordered: Story = {
  render: () => (
    <CheckboxList
      items={[
        { id: '1', title: 'Subscription renewal emails', checked: false },
        { id: '2', title: 'User onboarding emails', checked: true },
        { id: '3', title: 'Product update notifications', checked: false },
        { id: '4', title: 'Feedback request emails', checked: false },
        { id: '5', title: 'Promotional campaign emails', checked: false },
      ]}
      style="bordered"
      checkboxStyle="with-shadow"
    />
  ),
};

/**
 * 테두리 있는 리스트 (제목 + 설명)
 */
export const BorderedWithDescription: Story = {
  render: () => (
    <CheckboxList
      items={[
        {
          id: '1',
          title: 'Subscription renewal emails',
          description: 'Send customers email receipts for subscription payments',
          checked: false,
        },
        {
          id: '2',
          title: 'User onboarding emails',
          description: 'Welcome new users with a guide to getting started',
          checked: true,
        },
        {
          id: '3',
          title: 'Product update notifications',
          description: 'Inform users about the latest features and improvements',
          checked: false,
        },
        {
          id: '4',
          title: 'Feedback request emails',
          description: 'Ask customers for feedback on their experience',
          checked: false,
        },
        {
          id: '5',
          title: 'Promotional campaign emails',
          description: 'Share discounts and special offers with subscribers',
          checked: false,
        },
      ]}
      style="bordered"
      checkboxStyle="with-shadow"
    />
  ),
};

/**
 * 비활성화 상태 포함
 */
export const WithDisabled: Story = {
  render: () => (
    <CheckboxList
      items={[
        { id: '1', title: 'Subscription renewal emails', checked: false, disabled: true },
        { id: '2', title: 'User onboarding emails', checked: true, disabled: true },
        { id: '3', title: 'Product update notifications', checked: false },
        { id: '4', title: 'Feedback request emails', checked: false },
        { id: '5', title: 'Promotional campaign emails', checked: false },
      ]}
      style="default"
      checkboxStyle="with-shadow"
    />
  ),
};
