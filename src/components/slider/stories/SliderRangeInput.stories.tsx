import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SliderRangeInput } from '../SliderRangeInput';
import type { SliderRangeInputProps } from '../Slider.types';

const meta: Meta<SliderRangeInputProps> = {
  title: 'DataEntry/Slider/SliderRangeInput',
  component: SliderRangeInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      description: '현재 범위 값 [최소값, 최대값]',
      table: {
        type: {
          summary: '[number, number]',
          detail: '첫 번째 값: 범위 시작값 (number)\n두 번째 값: 범위 끝값 (number)',
        },
      },
    },
    defaultValue: {
      description: '기본 범위 값 [최소값, 최대값]',
      table: {
        type: {
          summary: '[number, number]',
          detail: '첫 번째 값: 범위 시작값 (number)\n두 번째 값: 범위 끝값 (number)',
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
          summary: '(value: [number, number]) => void',
          detail: 'value: [시작값, 끝값] 형태의 튜플',
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
type Story = StoryObj<SliderRangeInputProps>;

/**
 * 기본 범위 슬라이더 + 입력
 *
 * 양쪽에 입력 필드가 있는 범위 슬라이더입니다.
 */
export const Default: Story = {
  args: {
    color: 'gray',
    label: '가격 범위',
    suffix: '',
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    defaultValue: [20, 80],
    showTicks: false,
    tickCount: 11,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState<[number, number]>(args.defaultValue || [20, 80]);
    return (
      <div style={{ width: 500 }}>
        <SliderRangeInput
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
 * 가격 범위
 */
export const PriceRange: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([100, 500]);
    return (
      <div style={{ width: 500 }}>
        <SliderRangeInput
          label="예산"
          suffix="$"
          min={0}
          max={1000}
          step={10}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

/**
 * 연령 범위
 */
export const AgeRange: Story = {
  render: function Render() {
    const [value, setValue] = useState<[number, number]>([25, 45]);
    return (
      <div style={{ width: 500 }}>
        <SliderRangeInput
          label="대상 연령"
          min={18}
          max={65}
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
      <div style={{ width: 500 }}>
        <SliderRangeInput
          label="비활성화 범위"
          defaultValue={[30, 70]}
          disabled
        />
      </div>
    );
  },
};
