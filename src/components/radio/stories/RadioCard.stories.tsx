import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { RadioGroup } from '../Radio';
import { RadioCard } from '../RadioCard';
import type { RadioCardProps } from '../RadioCard.types';

const meta: Meta<RadioCardProps> = {
  title: 'DataEntry/Radio/RadioCard',
  component: RadioCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Radio value (RadioGroup 내에서 고유해야 함)',
      table: { type: { summary: 'string' } },
    },
    title: {
      control: 'text',
      description: '카드 제목',
      table: { type: { summary: 'string' } },
    },
    description: {
      control: 'text',
      description: '카드 설명',
      table: { type: { summary: 'string' } },
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '레이아웃 방향',
      table: {
        type: {
          summary: 'RadioCardLayout',
          detail: `'vertical' | 'horizontal'`,
        },
        defaultValue: { summary: 'vertical' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    background: {
      control: 'select',
      options: ['default', 'soft'],
      description: '배경 스타일',
      table: {
        type: {
          summary: 'RadioCardBackground',
          detail: `'default' | 'soft'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    radioPosition: {
      control: 'select',
      options: ['left', 'right', 'off'],
      description: '라디오 버튼 위치 (off: 라디오 버튼 숨김)',
      table: {
        type: {
          summary: 'RadioPosition',
          detail: `'left' | 'right' | 'off'`,
        },
        defaultValue: { summary: 'right' },
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
type Story = StoryObj<RadioCardProps>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 RadioCard
 *
 * 이 스토리에서 RadioCard의 모든 props를 테스트할 수 있습니다.
 * RadioGroup 내에서 단일 선택만 허용됩니다.
 */
export const Default: Story = {
  args: {
    value: 'card1',
    title: '카드 제목',
    description: '제목과 설명이 있는 라디오 카드입니다.',
    layout: 'vertical',
    disabled: false,
    background: 'default',
    radioPosition: 'right',
    radioStyle: 'with-shadow',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [value, setValue] = useState('card1');
    return (
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col ds-gap-12">
        <RadioCard
          value="card1"
          title={args.title}
          description={args.description}
          layout={args.layout}
          disabled={args.disabled}
          background={args.background}
          radioPosition={args.radioPosition}
          radioStyle={args.radioStyle}
        />
        <RadioCard
          value="card2"
          title="두 번째 카드"
          description="또 다른 라디오 카드 옵션입니다."
          layout={args.layout}
          disabled={args.disabled}
          background={args.background}
          radioPosition={args.radioPosition}
          radioStyle={args.radioStyle}
        />
      </RadioGroup>
    );
  },
};

// ============================================================================
// LAYOUTS
// ============================================================================

/**
 * Vertical 레이아웃
 */
export const LayoutVertical: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioCard
          value="card1"
          title="수직 레이아웃"
          description="콘텐츠가 수직으로 쌓이고 라디오는 오른쪽에 위치합니다."
          layout="vertical"
        />
      </RadioGroup>
    );
  },
};

/**
 * Horizontal 레이아웃
 */
export const LayoutHorizontal: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioCard
          value="card1"
          title="수평 레이아웃"
          description="콘텐츠가 수평으로 흐릅니다."
          layout="horizontal"
        />
      </RadioGroup>
    );
  },
};

// ============================================================================
// BACKGROUNDS
// ============================================================================

/**
 * 배경 스타일
 */
export const Backgrounds: Story = {
  render: function Render() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('checked');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('checked');

    return (
      <div className="flex flex-col ds-gap-16">
        <RadioGroup value={value1} onValueChange={setValue1}>
          <RadioCard
            value="unchecked"
            title="기본 배경 (선택 안 됨)"
            description="테두리가 있는 표준 카드 배경입니다."
            background="default"
          />
        </RadioGroup>
        <RadioGroup value={value2} onValueChange={setValue2}>
          <RadioCard
            value="checked"
            title="기본 배경 (선택됨)"
            description="강조 테두리가 있는 표준 카드 배경입니다."
            background="default"
          />
        </RadioGroup>
        <RadioGroup value={value3} onValueChange={setValue3}>
          <RadioCard
            value="unchecked"
            title="소프트 배경 (선택 안 됨)"
            description="테두리 없는 소프트 컬러 배경입니다."
            background="soft"
          />
        </RadioGroup>
        <RadioGroup value={value4} onValueChange={setValue4}>
          <RadioCard
            value="checked"
            title="소프트 배경 (선택됨)"
            description="강조 테두리가 있는 소프트 컬러 배경입니다."
            background="soft"
          />
        </RadioGroup>
      </div>
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
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col ds-gap-16">
        <RadioCard
          value="left"
          title="라디오 왼쪽"
          description="라디오가 왼쪽에 위치합니다."
          radioPosition="left"
        />
        <RadioCard
          value="right"
          title="라디오 오른쪽"
          description="라디오가 오른쪽에 위치합니다 (기본값)."
          radioPosition="right"
        />
        <RadioCard
          value="off"
          title="라디오 숨김"
          description="라디오 버튼이 숨겨지고 선택은 테두리로만 표시됩니다."
          radioPosition="off"
        />
      </RadioGroup>
    );
  },
};

// ============================================================================
// SECTIONS
// ============================================================================

/**
 * 추가 섹션 (Vertical)
 */
export const WithSectionsVertical: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioCard
          value="card1"
          title="플랜 제목"
          description="플랜에 대한 주요 설명입니다."
          layout="vertical"
          sections={[
            { title: '지원자', description: '$10/월' },
            { title: '기능', description: '모든 기본 기능 이용 가능' },
          ]}
        />
      </RadioGroup>
    );
  },
};

/**
 * 추가 섹션 (Horizontal)
 */
export const WithSectionsHorizontal: Story = {
  render: function Render() {
    const [value, setValue] = useState('card1');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioCard
          value="card1"
          title="구독 플랜"
          description="월별 청구"
          layout="horizontal"
          sections={[{ title: '$29', description: '/월' }]}
        />
      </RadioGroup>
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: function Render() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('checked');

    return (
      <div className="flex flex-col ds-gap-16">
        <RadioGroup value={value1} onValueChange={setValue1}>
          <RadioCard
            value="unchecked"
            title="비활성 선택 안 됨"
            description="이 카드는 비활성화되고 선택되지 않은 상태입니다."
            disabled
          />
        </RadioGroup>
        <RadioGroup value={value2} onValueChange={setValue2}>
          <RadioCard
            value="checked"
            title="비활성 선택됨"
            description="이 카드는 비활성화되고 선택된 상태입니다."
            disabled
          />
        </RadioGroup>
      </div>
    );
  },
};

// ============================================================================
// INTERACTIVE
// ============================================================================

/**
 * 단일 선택 (Multiple Cards)
 *
 * RadioGroup 내에서 하나의 카드만 선택할 수 있습니다.
 */
export const MultipleCards: Story = {
  render: function Render() {
    const [value, setValue] = useState('plan-2');

    const plans = [
      { id: 'plan-1', title: '베이직', description: '개인 사용자용', price: '$9/월' },
      { id: 'plan-2', title: '프로', description: '소규모 팀용', price: '$29/월' },
      { id: 'plan-3', title: '엔터프라이즈', description: '대규모 조직용', price: '문의' },
    ];

    return (
      <div className="flex flex-col ds-gap-12">
        <RadioGroup value={value} onValueChange={setValue} className="flex flex-col ds-gap-12">
          {plans.map((plan) => (
            <RadioCard
              key={plan.id}
              value={plan.id}
              title={plan.title}
              description={plan.description}
              layout="horizontal"
              sections={[{ title: plan.price, description: '' }]}
            />
          ))}
        </RadioGroup>
        <p className="size-xs text-muted margin-t-32">
          선택됨: {value || '없음'}
        </p>
      </div>
    );
  },
};
