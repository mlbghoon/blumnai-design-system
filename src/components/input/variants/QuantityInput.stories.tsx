import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title: 'DataEntry/Input/QuantityInput',
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
      description: '입력 필드의 변형을 설정합니다. quantity(좌우 양쪽에 +/- 버튼 배치), quantity-2(오른쪽에 버튼이 쌓여서 표시되는 컴팩트 형태) 중 선택할 수 있습니다',
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'quantity' },
      },
    },
    inputStyle: {
      control: 'select',
      options: ['default', 'shadow', 'soft'],
      description: '입력 필드의 외관 스타일을 설정합니다. default(기본 테두리), shadow(그림자 효과), soft(부드러운 배경) 중 선택할 수 있습니다',
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
      description: '입력 필드의 크기를 설정합니다. sm(작게), lg(크게) 중 선택할 수 있습니다',
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
      description: '입력 필드 위에 표시되는 제목 텍스트입니다',
      table: {
        type: { summary: 'string' },
      },
    },
    caption: {
      control: 'text',
      description: '입력 필드 아래에 표시되는 도움말 텍스트입니다. 사용자에게 입력 방법이나 형식을 안내합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: 'true로 설정하면 필수 입력 항목으로 표시되며, 라벨 옆에 필수 표시(*)가 나타납니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 컴포넌트가 비활성화되어 클릭이나 입력을 할 수 없습니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      description: '에러 메시지를 입력하면 빨간색 테두리와 함께 아래에 에러 메시지가 표시됩니다. true로 설정하면 에러 스타일만 적용됩니다',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    success: {
      control: 'text',
      description: '성공 메시지를 입력하면 초록색 테두리와 함께 아래에 성공 메시지가 표시됩니다. true로 설정하면 성공 스타일만 적용됩니다',
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    min: {
      control: 'number',
      description: '입력할 수 있는 최소 숫자 값입니다. 이 값 이하로는 감소할 수 없습니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: '입력할 수 있는 최대 숫자 값입니다. 이 값 이상으로는 증가할 수 없습니다',
      table: {
        type: { summary: 'number' },
      },
    },
    step: {
      control: 'number',
      description: '+/- 버튼을 클릭할 때마다 변경되는 값의 단위입니다. 기본값은 1입니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    value: {
      control: 'number',
      description: '현재 입력 필드에 표시되는 숫자 값입니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    onChange: {
      action: 'changed',
      description: '사용자가 값을 변경할 때 호출되는 함수입니다. 변경된 숫자 값을 인자로 받습니다',
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
    const min = 'min' in args && typeof args.min === 'number' ? args.min : 0;
    const max = 'max' in args && typeof args.max === 'number' ? args.max : 10;
    const step = 'step' in args && typeof args.step === 'number' ? args.step : 1;
    return (
      <Input
        variant="quantity"
        inputStyle={args.inputStyle}
        size={args.size}
        label={args.label}
        required={args.required}
        supportText={args.supportText}
        caption={args.caption}
        error={args.error}
        success={args.success}
        disabled={args.disabled}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    variant: 'quantity',
    label: '수량',
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
        label="수량"
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
        label="수량 (1-10)"
        min={1}
        max={10}
        step={1}
        caption="최소 1, 최대 10"
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
        label="온도 (°C)"
        min={-20}
        max={50}
        step={5}
        caption="5씩 증감"
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
        label="무게 (kg)"
        min={0}
        max={100}
        step={0.5}
        caption="0.5kg 단위로 증감"
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
        error="제한을 초과했습니다"
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
        success="유효한 수량입니다"
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
        caption="감소 버튼이 비활성화됩니다"
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
        caption="증가 버튼이 비활성화됩니다"
      />
    );
  },
};
