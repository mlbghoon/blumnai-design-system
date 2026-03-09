import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'DataDisplay/Chip',
  component: Chip,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'iconOnly'],
      description: '칩의 표시 형태를 설정합니다. default는 아이콘과 텍스트를 함께 표시하고, iconOnly는 아이콘만 표시합니다',
      table: {
        type: {
          summary: 'ChipVariant',
          detail: `'default' | 'iconOnly'

- default: 아이콘과 텍스트 표시
- iconOnly: 아이콘만 표시`,
        },
      },
    },
    style: {
      control: 'select',
      options: ['default', 'soft', 'ghost', 'ghostMuted'],
      description: '칩의 시각적 스타일을 설정합니다. default(테두리+흰색 배경), soft(연한 회색 배경), ghost(투명), ghostMuted(흐린 투명) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'ChipStyle',
          detail: `'default' | 'soft' | 'ghost' | 'ghostMuted'

- default: 테두리가 있는 흰색 배경
- soft: 연한 회색 배경
- ghost: 투명 배경
- ghostMuted: 흐린 텍스트의 투명 배경`,
        },
      },
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
      description: '칩의 외곽선 모양을 설정합니다. rounded는 둥근 모서리, pill은 완전히 둥근 알약 형태입니다',
      table: {
        type: {
          summary: 'ChipShape',
          detail: `'rounded' | 'pill'

- rounded: 둥근 모서리
- pill: 완전히 둥근 형태 (알약 모양)`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '칩의 크기를 설정합니다. sm(작게), md(보통), lg(크게) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'ChipSize',
          detail: `'sm' | 'md' | 'lg'`,
        },
      },
    },
    icon: {
      control: 'object',
      description: '칩에 표시할 아이콘입니다. [카테고리, 이름] 형식의 튜플로 지정합니다',
      table: {
        type: {
          summary: 'IconType',
          detail: `[category, name] 튜플 형식
예시: ['system', 'add']`,
        },
      },
    },
    selected: {
      control: 'boolean',
      description: 'true로 설정하면 칩이 선택된 상태로 표시되어 강조된 스타일이 적용됩니다',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    color: {
      control: 'select',
      options: ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'neutral'],
      description: '칩의 색상 테마를 설정합니다. 18가지 색상 중 선택할 수 있으며, 기본값은 neutral입니다',
      table: {
        type: {
          summary: 'ChipColor',
          detail: `'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'neutral'`,
        },
      },
    },
    label: {
      control: 'text',
      description: '칩에 표시할 텍스트 라벨입니다. default 변형에서 아이콘 옆에 표시됩니다',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

/**
 * 기본 Chip
 *
 * Chip 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    label: '칩',
    icon: ['system', 'add'],
    variant: 'default',
    style: 'default',
    shape: 'rounded',
    size: 'md',
    selected: false,
    color: undefined,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const chipRef = useRef<HTMLButtonElement>(null);
    return <Chip ref={chipRef} {...args} />;
  },
};

/**
 * 아이콘만 표시
 */
export const IconOnly: Story = {
  render: () => (
    <Chip icon={['system', 'add']} variant="iconOnly" style="default" shape="rounded" size="md" />
  ),
};

/**
 * 크기 변형
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center ds-gap-4">
      <Chip label="칩" icon={['business', 'at']} variant="default" style="default" size="sm" />
      <Chip label="칩" icon={['business', 'at']} variant="default" style="default" size="md" />
      <Chip label="칩" icon={['business', 'at']} variant="default" style="default" size="lg" />
    </div>
  ),
};

/**
 * 스타일 변형
 */
export const Styles: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-4">
      <div className="flex items-center ds-gap-4">
        <Chip label="칩" icon={['business', 'at']} variant="default" style="default" />
        <Chip label="칩" icon={['business', 'at']} variant="default" style="soft" />
        <Chip label="칩" icon={['business', 'at']} variant="default" style="ghost" />
        <Chip label="칩" icon={['business', 'at']} variant="default" style="ghostMuted" />
      </div>
      <div className="flex items-center ds-gap-4">
        <Chip icon={['business', 'at']} variant="iconOnly" style="default" />
        <Chip icon={['business', 'at']} variant="iconOnly" style="soft" />
        <Chip icon={['business', 'at']} variant="iconOnly" style="ghost" />
        <Chip icon={['business', 'at']} variant="iconOnly" style="ghostMuted" />
      </div>
    </div>
  ),
};

/**
 * 모양 변형
 */
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center ds-gap-4">
      <Chip label="칩" icon={['business', 'at']} variant="default" style="default" shape="rounded" />
      <Chip label="칩" icon={['business', 'at']} variant="default" style="default" shape="pill" />
    </div>
  ),
};

/**
 * 선택된 상태
 */
export const Selected: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-4">
      <div className="flex items-center ds-gap-4">
        <Chip label="칩" icon={['business', 'at']} variant="default" style="default" selected />
        <Chip label="칩" icon={['business', 'at']} variant="default" style="soft" selected />
        <Chip label="칩" icon={['business', 'at']} variant="default" style="ghost" selected />
        <Chip label="칩" icon={['business', 'at']} variant="default" style="ghostMuted" selected />
      </div>
      <div className="flex items-center ds-gap-4">
        <Chip icon={['business', 'at']} variant="iconOnly" style="default" selected />
        <Chip icon={['business', 'at']} variant="iconOnly" style="soft" selected />
        <Chip icon={['business', 'at']} variant="iconOnly" style="ghost" selected />
        <Chip icon={['business', 'at']} variant="iconOnly" style="ghostMuted" selected />
      </div>
    </div>
  ),
};

/**
 * 색상 변형 (비선택)
 */
export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center ds-gap-4">
      {(['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'neutral'] as const).map(
        (c) => (
          <Chip key={c} label={c} icon={['business', 'at']} color={c} />
        )
      )}
    </div>
  ),
};

/**
 * 색상 변형 (선택됨)
 */
export const ColorsSelected: Story = {
  render: () => (
    <div className="flex flex-wrap items-center ds-gap-4">
      {(['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'neutral'] as const).map(
        (c) => (
          <Chip key={c} label={c} icon={['business', 'at']} selected color={c} />
        )
      )}
    </div>
  ),
};

/**
 * 아이콘만 색상 변형
 */
export const ColorsIconOnly: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-8">
      <div className="flex flex-wrap items-center ds-gap-4">
        {(['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'neutral'] as const).map(
          (c) => (
            <Chip key={c} icon={['business', 'at']} variant="iconOnly" color={c} />
          )
        )}
      </div>
      <div className="flex flex-wrap items-center ds-gap-4">
        {(['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'neutral'] as const).map(
          (c) => (
            <Chip key={c} icon={['business', 'at']} variant="iconOnly" selected color={c} />
          )
        )}
      </div>
    </div>
  ),
};

