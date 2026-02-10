import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'DataDisplay/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'icon', 'image', 'dot'],
      description: '배지의 변형',
      table: {
        type: {
          summary: 'BadgeVariant',
          detail: `'default' | 'icon' | 'image' | 'dot'

- default: 라벨이 있는 텍스트 배지
- icon: 아이콘이 있는 배지
- image: 이미지가 있는 배지
- dot: 점 표시기가 있는 배지
기본값: 'default'`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '배지의 크기',
      table: {
        type: {
          summary: 'BadgeSize',
          detail: `'sm' | 'lg'
기본값: 'sm'`,
        },
      },
    },
    color: {
      control: 'select',
      options: ['red', 'orange', 'lime', 'green', 'cyan', 'blue', 'violet', 'fuchsia', 'pink', 'neutral'],
      description: '배지의 색상',
      table: {
        type: {
          summary: 'BadgeColor',
          detail: `'red' | 'orange' | 'lime' | 'green' | 'cyan' | 'blue' | 'violet' | 'fuchsia' | 'pink' | 'neutral'
기본값: 'neutral'`,
        },
      },
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
      description: '배지의 모양',
      table: {
        type: {
          summary: 'BadgeShape',
          detail: `'rounded' | 'pill'
기본값: 'rounded'`,
        },
      },
    },
    border: {
      control: 'boolean',
      description: 'true일 경우, 배지 주위에 테두리 표시',
      table: {
        type: {
          summary: 'boolean',
          detail: '기본값: false',
        },
      },
    },
    closeIcon: {
      control: 'boolean',
      description: 'true일 경우, 닫기 아이콘 버튼 표시',
      table: {
        type: {
          summary: 'boolean',
          detail: '기본값: false',
        },
      },
    },
    label: {
      control: 'text',
      description: '표시할 라벨 텍스트 (default 변형용)',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    icon: {
      control: 'object',
      description: '표시할 아이콘 타입 (icon 변형용)',
      table: {
        type: {
          summary: 'IconType',
          detail: `[category, name] 튜플 형식
예시: ['system', 'check']`,
        },
      },
    },
    image: {
      control: 'text',
      description: '이미지 소스 URL (image 변형용)',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    onClose: {
      action: 'onClose',
      description: '닫기 아이콘 클릭 시 호출되는 콜백 함수',
      table: {
        type: {
          summary: '() => void',
          detail: 'closeIcon=true일 때만 사용',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * 기본 Badge
 *
 * Badge 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    variant: 'default',
    label: 'A Label',
    size: 'sm',
    color: 'neutral',
    shape: 'rounded',
    border: false,
    closeIcon: false,
    icon: ['business', 'at'],
    image: 'https://placehold.co/12',
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const badgeRef = useRef<HTMLDivElement>(null);
    return (
      <Badge
        ref={badgeRef}
        variant={args.variant}
        label={args.label}
        size={args.size}
        color={args.color}
        shape={args.shape}
        border={args.border}
        closeIcon={args.closeIcon}
        icon={args.icon}
        image={args.image}
        className={args.className || undefined}
        onClose={args.onClose}
      />
    );
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'icon',
    label: 'Badge',
    icon: ['business', 'at'],
    size: 'sm',
    color: 'neutral',
    shape: 'rounded',
  },
  parameters: { controls: { disable: true } },
};

export const WithImage: Story = {
  args: {
    variant: 'image',
    label: 'Badge',
    image: 'https://placehold.co/12',
    size: 'sm',
    color: 'neutral',
    shape: 'rounded',
  },
  parameters: { controls: { disable: true } },
};

export const WithDot: Story = {
  args: {
    variant: 'dot',
    label: 'Badge',
    size: 'sm',
    color: 'neutral',
    shape: 'rounded',
  },
  parameters: { controls: { disable: true } },
};

export const WithCloseIcon: Story = {
  args: {
    variant: 'default',
    label: 'A Label',
    closeIcon: true,
    size: 'sm',
    color: 'neutral',
    shape: 'rounded',
  },
  parameters: { controls: { disable: true } },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['red', 'orange', 'lime', 'green', 'cyan', 'blue', 'violet', 'fuchsia', 'pink', 'neutral'] as const).map((color) => (
        <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ width: '100px', textTransform: 'capitalize' }}>{color}</span>
          <Badge variant="default" label="A Label" color={color} size="sm" />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Badge variant="default" label="A Label" size="sm" />
      <Badge variant="default" label="A Label" size="lg" />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Badge variant="default" label="A Label" shape="rounded" />
      <Badge variant="default" label="A Label" shape="pill" />
    </div>
  ),
  parameters: { controls: { disable: true } },
};
