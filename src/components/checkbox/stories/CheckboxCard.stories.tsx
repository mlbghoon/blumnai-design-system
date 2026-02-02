import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CheckboxCard } from '../CheckboxCard';
import type { CheckboxCardProps } from '../CheckboxCard.types';

const meta: Meta<CheckboxCardProps> = {
  title: 'Components/Checkbox/CheckboxCard',
  component: CheckboxCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
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
          summary: 'CheckboxCardLayout',
          detail: `'vertical' | 'horizontal'`,
        },
        defaultValue: { summary: 'vertical' },
      },
    },
    checked: {
      control: 'boolean',
      description: '체크 상태',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
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
          summary: 'CheckboxCardBackground',
          detail: `'default' | 'soft'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    checkboxPosition: {
      control: 'select',
      options: ['left', 'right', 'off'],
      description: '체크박스 위치 (off: 체크박스 숨김)',
      table: {
        type: {
          summary: 'CheckboxPosition',
          detail: `'left' | 'right' | 'off'`,
        },
        defaultValue: { summary: 'right' },
      },
    },
    checkboxStyle: {
      control: 'select',
      options: ['default', 'with-shadow'],
      description: '체크박스 스타일',
      table: {
        type: {
          summary: 'CheckboxStyle',
          detail: `'default' | 'with-shadow'`,
        },
        defaultValue: { summary: 'with-shadow' },
      },
    },
    onCheckedChange: {
      action: 'checkedChange',
      description: '체크 상태 변경 콜백',
      table: { type: { summary: '(checked: boolean) => void' } },
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
type Story = StoryObj<CheckboxCardProps>;

// ============================================================================
// BASIC
// ============================================================================

/**
 * 기본 CheckboxCard
 *
 * 이 스토리에서 CheckboxCard의 모든 props를 테스트할 수 있습니다.
 * 클릭, Space, Enter 키로 체크 상태를 변경할 수 있습니다.
 */
export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a checkbox card with title and description.',
    layout: 'vertical',
    disabled: false,
    background: 'default',
    checkboxPosition: 'right',
    checkboxStyle: 'with-shadow',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(false);
    return (
      <CheckboxCard
        title={args.title}
        description={args.description}
        layout={args.layout}
        checked={checked}
        disabled={args.disabled}
        background={args.background}
        checkboxPosition={args.checkboxPosition}
        checkboxStyle={args.checkboxStyle}
        onCheckedChange={setChecked}
      />
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
  args: {
    title: 'Vertical Layout',
    description: 'Content is stacked vertically with checkbox on the right.',
    layout: 'vertical',
    checked: false,
  },
};

/**
 * Horizontal 레이아웃
 */
export const LayoutHorizontal: Story = {
  args: {
    title: 'Horizontal Layout',
    description: 'Content flows horizontally.',
    layout: 'horizontal',
    checked: false,
  },
};

// ============================================================================
// BACKGROUNDS
// ============================================================================

/**
 * 배경 스타일
 */
export const Backgrounds: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <CheckboxCard
        title="Default Background (Unchecked)"
        description="Standard card background with border."
        background="default"
        checked={false}
      />
      <CheckboxCard
        title="Default Background (Checked)"
        description="Standard card background with accent border."
        background="default"
        checked={true}
      />
      <CheckboxCard
        title="Soft Background (Unchecked)"
        description="Soft colored background without border."
        background="soft"
        checked={false}
      />
      <CheckboxCard
        title="Soft Background (Checked)"
        description="Soft colored background with accent border."
        background="soft"
        checked={true}
      />
    </div>
  ),
};

// ============================================================================
// POSITIONS
// ============================================================================

/**
 * 체크박스 위치
 */
export const CheckboxPositions: Story = {
  render: function Render() {
    const [checked, setChecked] = useState([false, true, true]);
    return (
      <div className="flex flex-col gap-16">
        <CheckboxCard
          title="Checkbox on Left"
          description="Checkbox positioned on the left side."
          checkboxPosition="left"
          checked={checked[0]}
          onCheckedChange={(v) => setChecked([v, checked[1], checked[2]])}
        />
        <CheckboxCard
          title="Checkbox on Right"
          description="Checkbox positioned on the right side (default)."
          checkboxPosition="right"
          checked={checked[1]}
          onCheckedChange={(v) => setChecked([checked[0], v, checked[2]])}
        />
        <CheckboxCard
          title="Checkbox Hidden"
          description="Checkbox hidden, selection shown by border only."
          checkboxPosition="off"
          checked={checked[2]}
          onCheckedChange={(v) => setChecked([checked[0], checked[1], v])}
        />
      </div>
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
  args: {
    title: 'Plan Title',
    description: 'This is the main description for the plan.',
    layout: 'vertical',
    sections: [
      { title: 'Supporter', description: '$10/month' },
      { title: 'Features', description: 'Access to all basic features' },
    ],
    checked: false,
  },
};

/**
 * 추가 섹션 (Horizontal)
 */
export const WithSectionsHorizontal: Story = {
  args: {
    title: 'Subscription Plan',
    description: 'Monthly billing',
    layout: 'horizontal',
    sections: [{ title: '$29', description: '/month' }],
    checked: true,
  },
};

// ============================================================================
// STATES
// ============================================================================

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <CheckboxCard
        title="Disabled Unchecked"
        description="This card is disabled and unchecked."
        disabled
        checked={false}
      />
      <CheckboxCard
        title="Disabled Checked"
        description="This card is disabled and checked."
        disabled
        checked={true}
      />
    </div>
  ),
};

// ============================================================================
// INTERACTIVE
// ============================================================================

/**
 * 다중 선택
 */
export const MultipleCards: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(['plan-2']);

    const plans = [
      { id: 'plan-1', title: 'Basic', description: 'For individuals', price: '$9/mo' },
      { id: 'plan-2', title: 'Pro', description: 'For small teams', price: '$29/mo' },
      { id: 'plan-3', title: 'Enterprise', description: 'For large organizations', price: 'Custom' },
    ];

    const handleChange = (id: string) => (checked: boolean) => {
      if (checked) {
        setSelected((prev) => [...prev, id]);
      } else {
        setSelected((prev) => prev.filter((v) => v !== id));
      }
    };

    return (
      <div className="flex flex-col gap-12">
        {plans.map((plan) => (
          <CheckboxCard
            key={plan.id}
            title={plan.title}
            description={plan.description}
            layout="horizontal"
            sections={[{ title: plan.price, description: '' }]}
            checked={selected.includes(plan.id)}
            onCheckedChange={handleChange(plan.id)}
          />
        ))}
        <p className="size-xs text-muted mt-8">
          선택됨: {selected.length > 0 ? selected.join(', ') : '없음'}
        </p>
      </div>
    );
  },
};
