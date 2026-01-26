import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['default', 'with-shadow'],
      description: '체크박스의 스타일 변형',
      table: {
        type: {
          summary: 'CheckboxStyle',
          detail: `'default' | 'with-shadow'

- default: 그림자 효과 없음
- with-shadow: 은은한 그림자 효과`,
        },
      },
    },
    checked: {
      control: 'boolean',
      description: '체크박스가 체크되어 있는지 여부',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate (부분 선택) 상태',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: '체크박스가 비활성화되어 있는지 여부',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    label: {
      control: 'text',
      description: '체크박스 옆에 표시되는 라벨 텍스트',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    className: {
      control: 'text',
      description: '컨테이너의 추가 CSS 클래스',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    onChange: {
      action: 'changed',
      description: '체크박스 상태 변경 시 호출되는 콜백 함수',
      table: {
        type: {
          summary: '(checked: boolean) => void',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * 기본 체크박스 (라벨 포함)
 *
 * Checkbox 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: input 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    label: 'Checkbox label',
    checked: false,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: (args) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (checkboxRef.current) {
        console.log('Checkbox ref:', checkboxRef.current);
      }
    }, []);

    return <Checkbox ref={checkboxRef} {...args} />;
  },
};

/**
 * 체크된 상태
 */
export const Checked: Story = {
  render: () => <Checkbox label="Checked checkbox" checked />,
};

/**
 * Indeterminate 상태
 */
export const Indeterminate: Story = {
  render: () => <Checkbox label="Indeterminate checkbox" indeterminate />,
};

/**
 * 모든 상태
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" checked disabled />
      <Checkbox label="Disabled indeterminate" indeterminate disabled />
    </div>
  ),
};

/**
 * 라벨 없이
 */
export const WithoutLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox />
      <Checkbox checked />
      <Checkbox indeterminate />
      <Checkbox disabled />
    </div>
  ),
};

/**
 * With shadow 스타일
 */
export const WithShadow: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" style="with-shadow" />
      <Checkbox label="Checked" checked style="with-shadow" />
      <Checkbox label="Indeterminate" indeterminate style="with-shadow" />
      <Checkbox label="Disabled checked" checked disabled style="with-shadow" />
    </div>
  ),
};

