import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input/Quantity',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['quantity', 'quantity-2'],
      description: '입력 필드의 변형 (quantity: 양쪽 버튼, quantity-2: 컴팩트)',
      type: { required: true },
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'quantity' },
      },
    },
    inputStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '입력 필드의 스타일 변형',
      table: {
        type: {
          summary: 'InputStyle',
          detail: `'default' | 'shadow' | 'soft'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '입력 필드의 크기',
      table: {
        type: {
          summary: 'InputSize',
          detail: `'sm' | 'lg'`,
        },
        defaultValue: { summary: 'sm' },
      },
    },
    label: {
      control: 'text',
      description: '입력 필드의 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래 설명 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    error: {
      control: 'text',
      description: '에러 상태 또는 메시지',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    success: {
      control: 'text',
      description: '성공 상태 또는 메시지',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    min: {
      control: 'number',
      description: '최소값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: '최대값',
      table: {
        type: { summary: 'number' },
      },
    },
    step: {
      control: 'number',
      description: '증감 단위',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    value: {
      control: 'number',
      description: '현재 값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    onChange: {
      action: 'changed',
      description: '값 변경 시 콜백',
      table: {
        type: { summary: '(value: number) => void' },
      },
    },
    autoComplete: {
      control: 'text',
      description: '브라우저 자동완성 설정 (기본값: "off"로 자동완성 비활성화)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'off' },
      },
    },
    width: {
      control: 'text',
      description: '입력 필드 컨테이너의 커스텀 너비 (숫자는 px, 문자열은 그대로 사용)',
      table: {
        type: { summary: 'string | number' },
      },
    },
    className: {
      control: 'text',
      description: '컴포넌트에 전달할 추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ============================================================================
// BASIC VARIANTS
// ============================================================================

/**
 * 기본 수량 입력 필드
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 * Input 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 */
export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(1);
    return (
      <Input
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    variant: 'quantity',
    label: 'Quantity',
    min: 0,
    max: 10,
    step: 1,
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 컴팩트 변형 (오른쪽 버튼)
 *
 * `variant="quantity-2"`로 버튼이 오른쪽에 쌓여서 표시됩니다.
 */
export const Compact: Story = {
  render: function Render() {
    const [value, setValue] = useState(5);
    return (
      <Input
        variant="quantity-2"
        label="Quantity"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// ============================================================================
// OPTIONS
// ============================================================================

/**
 * 최소/최대 제한
 *
 * `min`과 `max` prop으로 입력 범위를 제한할 수 있습니다.
 */
export const WithLimits: Story = {
  render: function Render() {
    const [value, setValue] = useState(5);
    return (
      <Input
        variant="quantity"
        label="Quantity (1-10)"
        min={1}
        max={10}
        step={1}
        caption="Minimum 1, maximum 10"
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * 커스텀 증감 단위
 *
 * `step` prop으로 증감 단위를 설정할 수 있습니다.
 */
export const CustomStep: Story = {
  render: function Render() {
    const [value, setValue] = useState(0);
    return (
      <Input
        variant="quantity"
        label="Temperature (C)"
        min={-20}
        max={50}
        step={5}
        caption="Increments of 5"
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * 소수점 값
 *
 * 소수점 단위의 증감을 지원합니다.
 */
export const DecimalValues: Story = {
  render: function Render() {
    const [value, setValue] = useState(1.5);
    return (
      <Input
        variant="quantity"
        label="Weight (kg)"
        min={0}
        max={100}
        step={0.5}
        caption="Increments of 0.5 kg"
        value={value}
        onChange={setValue}
      />
    );
  },
};

// ============================================================================
// SIZES
// ============================================================================

/**
 * Small 크기
 */
export const SizeSmall: Story = {
  render: function Render() {
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity"
        label="Small"
        size="sm"
        min={0}
        max={10}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * Large 크기
 */
export const SizeLarge: Story = {
  render: function Render() {
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity"
        label="Large"
        size="lg"
        min={0}
        max={10}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * Small Compact 크기
 */
export const SizeSmallCompact: Story = {
  render: function Render() {
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity-2"
        label="Small Compact"
        size="sm"
        min={0}
        max={10}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * Large Compact 크기
 */
export const SizeLargeCompact: Story = {
  render: function Render() {
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity-2"
        label="Large Compact"
        size="lg"
        min={0}
        max={10}
        value={value}
        onChange={setValue}
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
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity"
        label="Default Style"
        inputStyle="default"
        min={0}
        max={10}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * Shadow 스타일
 */
export const StyleShadow: Story = {
  render: function Render() {
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity"
        label="Shadow Style"
        inputStyle="shadow"
        min={0}
        max={10}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * Soft 스타일
 */
export const StyleSoft: Story = {
  render: function Render() {
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity"
        label="Soft Style"
        inputStyle="soft"
        min={0}
        max={10}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 기본 상태
 */
export const StateDefault: Story = {
  render: function Render() {
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity"
        label="Default"
        min={0}
        max={10}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * 비활성화 상태
 */
export const StateDisabled: Story = {
  render: function Render() {
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity"
        label="Disabled"
        min={0}
        max={10}
        disabled
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * 에러 상태
 */
export const StateError: Story = {
  render: function Render() {
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity"
        label="Error"
        min={0}
        max={10}
        error="Exceeds limit"
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * 성공 상태
 */
export const StateSuccess: Story = {
  render: function Render() {
    const [value, setValue] = useState(1);
    return (
      <Input
        variant="quantity"
        label="Success"
        min={0}
        max={10}
        success="Valid quantity"
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * 최소값 도달 (감소 버튼 비활성화)
 */
export const AtMinimum: Story = {
  render: function Render() {
    const [value, setValue] = useState(0);
    return (
      <Input
        variant="quantity"
        label="At Minimum (0)"
        min={0}
        max={10}
        value={value}
        onChange={setValue}
        caption="Decrement button should be disabled"
      />
    );
  },
};

/**
 * 최대값 도달 (증가 버튼 비활성화)
 */
export const AtMaximum: Story = {
  render: function Render() {
    const [value, setValue] = useState(10);
    return (
      <Input
        variant="quantity"
        label="At Maximum (10)"
        min={0}
        max={10}
        value={value}
        onChange={setValue}
        caption="Increment button should be disabled"
      />
    );
  },
};
