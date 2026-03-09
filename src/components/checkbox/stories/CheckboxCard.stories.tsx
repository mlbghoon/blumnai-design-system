import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { CheckboxCard } from '../CheckboxCard';
import type { CheckboxCardProps } from '../CheckboxCard.types';

const meta: Meta<CheckboxCardProps> = {
  title: 'DataEntry/Checkbox/CheckboxCard',
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
    title: '카드 제목',
    description: '제목과 설명이 있는 체크박스 카드입니다.',
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
    title: '수직 레이아웃',
    description: '콘텐츠가 수직으로 쌓이고 체크박스는 오른쪽에 위치합니다.',
    layout: 'vertical',
    checked: false,
  },
};

/**
 * Horizontal 레이아웃
 */
export const LayoutHorizontal: Story = {
  args: {
    title: '수평 레이아웃',
    description: '콘텐츠가 수평으로 배치됩니다.',
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
    <div className="flex flex-col ds-gap-16">
      <CheckboxCard
        title="기본 배경 (미선택)"
        description="테두리가 있는 기본 카드 배경입니다."
        background="default"
        checked={false}
      />
      <CheckboxCard
        title="기본 배경 (선택됨)"
        description="강조 테두리가 있는 기본 카드 배경입니다."
        background="default"
        checked={true}
      />
      <CheckboxCard
        title="소프트 배경 (미선택)"
        description="테두리 없는 소프트 색상 배경입니다."
        background="soft"
        checked={false}
      />
      <CheckboxCard
        title="소프트 배경 (선택됨)"
        description="강조 테두리가 있는 소프트 색상 배경입니다."
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
      <div className="flex flex-col ds-gap-16">
        <CheckboxCard
          title="체크박스 왼쪽"
          description="체크박스가 왼쪽에 위치합니다."
          checkboxPosition="left"
          checked={checked[0]}
          onCheckedChange={(v) => setChecked([v, checked[1], checked[2]])}
        />
        <CheckboxCard
          title="체크박스 오른쪽"
          description="체크박스가 오른쪽에 위치합니다 (기본값)."
          checkboxPosition="right"
          checked={checked[1]}
          onCheckedChange={(v) => setChecked([checked[0], v, checked[2]])}
        />
        <CheckboxCard
          title="체크박스 숨김"
          description="체크박스가 숨겨지고 선택 상태는 테두리로만 표시됩니다."
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
    title: '플랜 제목',
    description: '플랜에 대한 기본 설명입니다.',
    layout: 'vertical',
    sections: [
      { title: '지원자', description: '월 $10' },
      { title: '기능', description: '모든 기본 기능 이용 가능' },
    ],
    checked: false,
  },
};

/**
 * 추가 섹션 (Horizontal)
 */
export const WithSectionsHorizontal: Story = {
  args: {
    title: '구독 플랜',
    description: '월별 청구',
    layout: 'horizontal',
    sections: [{ title: '$29', description: '/월' }],
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
    <div className="flex flex-col ds-gap-16">
      <CheckboxCard
        title="비활성화 (미선택)"
        description="이 카드는 비활성화되어 있으며 선택되지 않은 상태입니다."
        disabled
        checked={false}
      />
      <CheckboxCard
        title="비활성화 (선택됨)"
        description="이 카드는 비활성화되어 있으며 선택된 상태입니다."
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
      { id: 'plan-1', title: '베이직', description: '개인 사용자용', price: '월 $9' },
      { id: 'plan-2', title: '프로', description: '소규모 팀용', price: '월 $29' },
      { id: 'plan-3', title: '엔터프라이즈', description: '대규모 조직용', price: '문의' },
    ];

    const handleChange = (id: string) => (checked: boolean) => {
      if (checked) {
        setSelected((prev) => [...prev, id]);
      } else {
        setSelected((prev) => prev.filter((v) => v !== id));
      }
    };

    return (
      <div className="flex flex-col ds-gap-12">
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
        <p className="size-xs text-muted margin-t-32">
          선택됨: {selected.length > 0 ? selected.join(', ') : '없음'}
        </p>
      </div>
    );
  },
};
