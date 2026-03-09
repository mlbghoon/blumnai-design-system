import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SliderInput } from '../SliderInput';
import type { SliderInputProps } from '../Slider.types';

const meta: Meta<SliderInputProps> = {
  title: 'DataEntry/Slider/SliderInput',
  component: SliderInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      control: 'number',
      description: '현재 슬라이더 값 (number 타입)',
      table: {
        type: {
          summary: 'number',
          detail: '슬라이더의 현재 위치를 나타내는 숫자 값',
        },
      },
    },
    defaultValue: {
      control: 'number',
      description: '기본 슬라이더 값 (number 타입)',
      table: {
        type: {
          summary: 'number',
          detail: '슬라이더의 초기 위치를 나타내는 숫자 값',
        },
      },
    },
    color: {
      control: 'select',
      options: ['gray', 'brand', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
      description: '슬라이더 트랙 채움 색상',
      table: {
        type: {
          summary: 'SliderColor',
          detail: "'gray' | 'brand' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'",
        },
        defaultValue: { summary: 'gray' },
      },
    },
    label: {
      control: 'text',
      description: '슬라이더 상단에 표시되는 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    suffix: {
      control: 'text',
      description: '입력 필드 내 숫자 뒤에 표시되는 단위 (예: %, px, $)',
      table: {
        type: { summary: 'string' },
      },
    },
    min: {
      control: 'number',
      description: '슬라이더 범위의 최소값 (number 타입)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: '슬라이더 범위의 최대값 (number 타입)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    step: {
      control: 'number',
      description: '값 변경 단위 (1이면 1씩 증가/감소)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태 (true면 조작 불가)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      action: 'changed',
      description: '값 변경 시 호출되는 콜백 함수',
      table: {
        type: {
          summary: '(value: number) => void',
          detail: 'value: 변경된 슬라이더 값 (number 타입)',
        },
      },
    },
    showTicks: {
      control: 'boolean',
      description: '슬라이더 아래 눈금(0, 10, 20...) 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tickCount: {
      control: 'number',
      description: '표시할 눈금 개수 (min~max 사이를 균등 분할)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '11' },
      },
    },
    formatTick: {
      description: '눈금 라벨 포맷 함수',
      table: {
        type: {
          summary: '(value: number) => string',
          detail: "예: (v) => `$${v}` → '$0', '$10', '$20'...",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SliderInputProps>;

/**
 * 기본 슬라이더 + 입력
 *
 * 슬라이더와 입력 필드가 동기화됩니다.
 */
export const Default: Story = {
  args: {
    color: 'gray',
    label: '볼륨',
    suffix: '%',
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    defaultValue: 50,
    showTicks: false,
    tickCount: 11,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.defaultValue || 50);
    return (
      <div style={{ width: 400 }}>
        <SliderInput
          color={args.color}
          label={args.label}
          suffix={args.suffix}
          min={args.min}
          max={args.max}
          step={args.step}
          disabled={args.disabled}
          showTicks={args.showTicks}
          tickCount={args.tickCount}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 퍼센트 입력
 */
export const Percentage: Story = {
  render: function Render() {
    const [value, setValue] = useState(75);
    return (
      <div style={{ width: 400 }}>
        <SliderInput
          label="불투명도"
          suffix="%"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 온도 입력
 */
export const Temperature: Story = {
  render: function Render() {
    const [value, setValue] = useState(22);
    return (
      <div style={{ width: 400 }}>
        <SliderInput
          label="실내 온도"
          suffix="°C"
          min={16}
          max={30}
          step={0.5}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 접미사 없음
 */
export const NoSuffix: Story = {
  render: function Render() {
    const [value, setValue] = useState(50);
    return (
      <div style={{ width: 400 }}>
        <SliderInput
          label="수량"
          min={1}
          max={100}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <div style={{ width: 400 }}>
        <SliderInput
          label="비활성화"
          suffix="%"
          defaultValue={50}
          disabled
        />
      </div>
    );
  },
};
