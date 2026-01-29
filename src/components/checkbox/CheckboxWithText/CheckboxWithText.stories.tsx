import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxWithText } from './CheckboxWithText';

const meta: Meta<typeof CheckboxWithText> = {
  title: 'Components/Checkbox/CheckboxWithText',
  component: CheckboxWithText,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component:
          '제목과 설명 텍스트를 포함한 체크박스 컴포넌트입니다. 체크박스 위치를 왼쪽 또는 오른쪽으로 설정할 수 있으며, 그림자 스타일을 적용할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checkboxPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '텍스트에 대한 체크박스의 위치',
      table: {
        type: {
          summary: 'CheckboxWithTextPosition',
          detail: `'left' | 'right'`,
        },
      },
    },
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
    title: {
      control: 'text',
      description: '체크박스의 제목 텍스트',
      type: { required: true },
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    description: {
      control: 'text',
      description: '제목 아래의 설명 텍스트',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxWithText>;

/**
 * 기본 CheckboxWithText (제목만)
 *
 * CheckboxWithText 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    title: 'Checkbox title',
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
        console.log('CheckboxWithText ref:', checkboxRef.current);
      }
    }, []);

    return <CheckboxWithText ref={checkboxRef} {...args} />;
  },
};

/**
 * 제목과 설명 포함
 */
export const WithDescription: Story = {
  render: () => (
    <CheckboxWithText
      title="Checkbox title"
      description="This is a description for the checkbox option."
    />
  ),
};

/**
 * 체크된 상태
 */
export const Checked: Story = {
  render: () => (
    <CheckboxWithText
      title="Checked checkbox"
      description="This checkbox is checked."
      checked
    />
  ),
};

/**
 * Indeterminate 상태
 */
export const Indeterminate: Story = {
  render: () => (
    <CheckboxWithText
      title="Indeterminate checkbox"
      description="This checkbox is in indeterminate state."
      indeterminate
    />
  ),
};

/**
 * 체크박스 오른쪽 위치
 */
export const RightPosition: Story = {
  render: () => (
    <CheckboxWithText
      title="Right positioned checkbox"
      description="The checkbox is on the right side."
      checkboxPosition="right"
    />
  ),
};

/**
 * 모든 상태
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <CheckboxWithText title="Unchecked" description="Default unchecked state" />
      <CheckboxWithText title="Checked" description="Checked state" checked />
      <CheckboxWithText title="Indeterminate" description="Indeterminate state" indeterminate />
      <CheckboxWithText title="Disabled unchecked" description="Disabled in unchecked state" disabled />
      <CheckboxWithText title="Disabled checked" description="Disabled in checked state" checked disabled />
      <CheckboxWithText title="Disabled indeterminate" description="Disabled in indeterminate state" indeterminate disabled />
    </div>
  ),
};

/**
 * 체크박스 위치 비교
 */
export const PositionComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <CheckboxWithText
        title="Left position (default)"
        description="Checkbox appears on the left side"
        checkboxPosition="left"
      />
      <CheckboxWithText
        title="Right position"
        description="Checkbox appears on the right side"
        checkboxPosition="right"
      />
    </div>
  ),
};

/**
 * 스타일 변형
 */
export const StyleVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <CheckboxWithText title="Default style" description="Without shadow effect" style="default" />
      <CheckboxWithText title="With shadow style" description="Has subtle shadow effect" style="with-shadow" />
      <CheckboxWithText title="Checked default" description="Checked with default style" style="default" checked />
      <CheckboxWithText title="Checked with shadow" description="Checked with shadow style" style="with-shadow" checked />
    </div>
  ),
};

/**
 * 제목만 (설명 없이)
 */
export const TitleOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <CheckboxWithText title="Option 1" />
      <CheckboxWithText title="Option 2" checked />
      <CheckboxWithText title="Option 3" indeterminate />
    </div>
  ),
};
