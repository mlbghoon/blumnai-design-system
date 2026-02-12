import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Radio, RadioGroup } from '../Radio';
import type { RadioProps } from '../Radio.types';

const meta: Meta<RadioProps> = {
  title: 'DataEntry/Radio/RadioDefault',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Radio value (RadioGroup 내에서 고유해야 함)',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트 (Title)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    description: {
      control: 'text',
      description: '라벨 아래 설명 텍스트',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    radioPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '라디오 버튼 위치 (라벨 기준)',
      table: {
        type: {
          summary: 'RadioPosition',
          detail: `'left' | 'right'`,
        },
        defaultValue: { summary: 'left' },
      },
    },
    radioStyle: {
      control: 'select',
      options: ['default', 'with-shadow'],
      description: '스타일 변형',
      table: {
        type: {
          summary: 'RadioStyle',
          detail: `'default' | 'with-shadow'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<RadioProps>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 Radio
 *
 * 이 스토리에서 Radio의 모든 props를 테스트할 수 있습니다.
 * RadioGroup 내에서 단일 선택만 허용됩니다.
 */
export const Default: Story = {
  args: {
    value: 'option1',
    disabled: false,
    label: 'Title',
    description: '',
    radioPosition: 'left',
    radioStyle: 'default',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState('option1');
    const description = args.description || undefined;

    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio
          value="option1"
          disabled={args.disabled}
          label={args.label}
          description={description}
          radioPosition={args.radioPosition}
          radioStyle={args.radioStyle}
        />
        <Radio
          value="option2"
          disabled={args.disabled}
          label="Option 2"
          radioPosition={args.radioPosition}
          radioStyle={args.radioStyle}
        />
        <Radio
          value="option3"
          disabled={args.disabled}
          label="Option 3"
          radioPosition={args.radioPosition}
          radioStyle={args.radioStyle}
        />
      </RadioGroup>
    );
  },
};

/**
 * 라벨 있는 라디오
 */
export const WithLabel: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio value="option1" label="이용약관에 동의합니다" />
      </RadioGroup>
    );
  },
};

/**
 * 라벨과 설명 텍스트
 */
export const WithDescription: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio value="option1" label="Title" description="Description" />
      </RadioGroup>
    );
  },
};

/**
 * 모든 상태 (설명 포함)
 *
 * 일반 상태와 비활성화 상태의 라디오를 모두 보여줍니다.
 */
export const AllStatesWithDescription: Story = {
  render: function Render() {
    const [value1, setValue1] = useState('checked');
    const [value2, setValue2] = useState('disabled-checked');

    return (
      <div className="flex flex-col gap-24">
        <RadioGroup value={value1} onValueChange={setValue1} className="flex flex-row gap-24">
          <Radio value="unchecked" label="Title" description="Description" />
          <Radio value="checked" label="Title" description="Description" />
        </RadioGroup>
        <RadioGroup value={value2} onValueChange={setValue2} className="flex flex-row gap-24">
          <Radio value="disabled-unchecked" disabled label="Title" description="Description" />
          <Radio value="disabled-checked" disabled label="Title" description="Description" />
        </RadioGroup>
      </div>
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 체크 상태
 */
export const CheckedStates: Story = {
  render: function Render() {
    const [value, setValue] = useState('checked');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-16">
        <Radio value="unchecked" label="Unchecked" />
        <Radio value="checked" label="Checked" />
      </RadioGroup>
    );
  },
};

/**
 * 비활성화 상태
 */
export const DisabledStates: Story = {
  render: function Render() {
    const [value, setValue] = useState('disabled-checked');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-16">
        <Radio value="disabled-unchecked" disabled label="Disabled Unchecked" />
        <Radio value="disabled-checked" disabled label="Disabled Checked" />
      </RadioGroup>
    );
  },
};

// ============================================================================
// STYLES
// ============================================================================

/**
 * 기본 스타일
 */
export const StyleDefault: Story = {
  render: function Render() {
    const [value, setValue] = useState('checked');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-16">
        <Radio value="unchecked" radioStyle="default" label="Default Style (Unchecked)" />
        <Radio value="checked" radioStyle="default" label="Default Style (Checked)" />
      </RadioGroup>
    );
  },
};

/**
 * 그림자 스타일
 */
export const StyleWithShadow: Story = {
  render: function Render() {
    const [value, setValue] = useState('checked');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-16">
        <Radio value="unchecked" radioStyle="with-shadow" label="With Shadow Style (Unchecked)" />
        <Radio value="checked" radioStyle="with-shadow" label="With Shadow Style (Checked)" />
      </RadioGroup>
    );
  },
};

// ============================================================================
// POSITIONS
// ============================================================================

/**
 * 라디오 버튼 위치
 */
export const RadioPositions: Story = {
  render: function Render() {
    const [value, setValue] = useState('right');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-16">
        <Radio value="left" radioPosition="left" label="Radio on Left" description="Default position" />
        <Radio value="right" radioPosition="right" label="Radio on Right" description="Alternative position" />
      </RadioGroup>
    );
  },
};

// ============================================================================
// INTERACTIVE
// ============================================================================

/**
 * 단일 선택
 *
 * RadioGroup 내에서 하나의 옵션만 선택할 수 있습니다.
 */
export const SingleSelection: Story = {
  render: function Render() {
    const [value, setValue] = useState('option1');

    return (
      <div className="flex flex-col gap-12">
        <RadioGroup value={value} onValueChange={setValue}>
          <Radio value="option1" label="옵션 1" />
          <Radio value="option2" label="옵션 2" />
          <Radio value="option3" label="옵션 3" />
        </RadioGroup>
        <p className="size-xs text-muted mt-8">선택됨: {value || '없음'}</p>
      </div>
    );
  },
};
