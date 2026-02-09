import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

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
      description: '칩 변형',
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
      description: '칩 스타일',
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
      description: '칩 모양',
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
      description: '칩 크기',
      table: {
        type: {
          summary: 'ChipSize',
          detail: `'sm' | 'md' | 'lg'`,
        },
      },
    },
    icon: {
      control: 'object',
      description: '아이콘 타입 튜플',
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
      description: '선택된 상태',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    label: {
      control: 'text',
      description: '표시할 텍스트 라벨',
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
    label: 'Chip',
    icon: ['system', 'add'],
    variant: 'default',
    style: 'default',
    shape: 'rounded',
    size: 'md',
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const chipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (chipRef.current) {
        console.log('Chip ref:', chipRef.current);
      }
    }, []);

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
    <div className="flex items-center gap-4">
      <Chip label="Chip" icon={['business', 'at']} variant="default" style="default" size="sm" />
      <Chip label="Chip" icon={['business', 'at']} variant="default" style="default" size="md" />
      <Chip label="Chip" icon={['business', 'at']} variant="default" style="default" size="lg" />
    </div>
  ),
};

/**
 * 스타일 변형
 */
export const Styles: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Chip label="Chip" icon={['business', 'at']} variant="default" style="default" />
        <Chip label="Chip" icon={['business', 'at']} variant="default" style="soft" />
        <Chip label="Chip" icon={['business', 'at']} variant="default" style="ghost" />
        <Chip label="Chip" icon={['business', 'at']} variant="default" style="ghostMuted" />
      </div>
      <div className="flex items-center gap-4">
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
    <div className="flex items-center gap-4">
      <Chip label="Chip" icon={['business', 'at']} variant="default" style="default" shape="rounded" />
      <Chip label="Chip" icon={['business', 'at']} variant="default" style="default" shape="pill" />
    </div>
  ),
};

/**
 * 선택된 상태
 */
export const Selected: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Chip label="Chip" icon={['business', 'at']} variant="default" style="default" selected />
        <Chip label="Chip" icon={['business', 'at']} variant="default" style="soft" selected />
        <Chip label="Chip" icon={['business', 'at']} variant="default" style="ghost" selected />
        <Chip label="Chip" icon={['business', 'at']} variant="default" style="ghostMuted" selected />
      </div>
      <div className="flex items-center gap-4">
        <Chip icon={['business', 'at']} variant="iconOnly" style="default" selected />
        <Chip icon={['business', 'at']} variant="iconOnly" style="soft" selected />
        <Chip icon={['business', 'at']} variant="iconOnly" style="ghost" selected />
        <Chip icon={['business', 'at']} variant="iconOnly" style="ghostMuted" selected />
      </div>
    </div>
  ),
};

