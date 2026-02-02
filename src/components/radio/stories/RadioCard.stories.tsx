import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { RadioGroup } from '../Radio';
import { RadioCard } from '../RadioCard';
import type { RadioCardProps } from '../RadioCard.types';

const meta: Meta<RadioCardProps> = {
  title: 'Components/Radio/RadioCard',
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
    title: 'Card Title',
    description: 'This is a radio card with title and description.',
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
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-12">
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
          title="Second Card"
          description="Another radio card option."
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
          title="Vertical Layout"
          description="Content is stacked vertically with radio on the right."
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
          title="Horizontal Layout"
          description="Content flows horizontally."
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
      <div className="flex flex-col gap-16">
        <RadioGroup value={value1} onValueChange={setValue1}>
          <RadioCard
            value="unchecked"
            title="Default Background (Unchecked)"
            description="Standard card background with border."
            background="default"
          />
        </RadioGroup>
        <RadioGroup value={value2} onValueChange={setValue2}>
          <RadioCard
            value="checked"
            title="Default Background (Checked)"
            description="Standard card background with accent border."
            background="default"
          />
        </RadioGroup>
        <RadioGroup value={value3} onValueChange={setValue3}>
          <RadioCard
            value="unchecked"
            title="Soft Background (Unchecked)"
            description="Soft colored background without border."
            background="soft"
          />
        </RadioGroup>
        <RadioGroup value={value4} onValueChange={setValue4}>
          <RadioCard
            value="checked"
            title="Soft Background (Checked)"
            description="Soft colored background with accent border."
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
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-16">
        <RadioCard
          value="left"
          title="Radio on Left"
          description="Radio positioned on the left side."
          radioPosition="left"
        />
        <RadioCard
          value="right"
          title="Radio on Right"
          description="Radio positioned on the right side (default)."
          radioPosition="right"
        />
        <RadioCard
          value="off"
          title="Radio Hidden"
          description="Radio button hidden, selection shown by border only."
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
          title="Plan Title"
          description="This is the main description for the plan."
          layout="vertical"
          sections={[
            { title: 'Supporter', description: '$10/month' },
            { title: 'Features', description: 'Access to all basic features' },
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
          title="Subscription Plan"
          description="Monthly billing"
          layout="horizontal"
          sections={[{ title: '$29', description: '/month' }]}
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
      <div className="flex flex-col gap-16">
        <RadioGroup value={value1} onValueChange={setValue1}>
          <RadioCard
            value="unchecked"
            title="Disabled Unchecked"
            description="This card is disabled and unchecked."
            disabled
          />
        </RadioGroup>
        <RadioGroup value={value2} onValueChange={setValue2}>
          <RadioCard
            value="checked"
            title="Disabled Checked"
            description="This card is disabled and checked."
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
      { id: 'plan-1', title: 'Basic', description: 'For individuals', price: '$9/mo' },
      { id: 'plan-2', title: 'Pro', description: 'For small teams', price: '$29/mo' },
      { id: 'plan-3', title: 'Enterprise', description: 'For large organizations', price: 'Custom' },
    ];

    return (
      <div className="flex flex-col gap-12">
        <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-12">
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
        <p className="size-xs text-muted mt-8">
          선택됨: {value || '없음'}
        </p>
      </div>
    );
  },
};
