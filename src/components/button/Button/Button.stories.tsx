import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost', 'ghostMuted', 'soft', 'dashed'],
      description: '버튼의 스타일 변형',
      table: {
        type: {
          summary: 'ButtonStyle',
          detail: `'primary' | 'secondary' | 'destructive' | 'ghost' | 'ghostMuted' | 'soft' | 'dashed'`,
        },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'iconOnly'],
      description: '버튼의 변형 타입',
      table: {
        type: {
          summary: 'ButtonVariant',
          detail: `'default' | 'iconOnly'`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg'],
      description: '버튼의 크기',
      table: {
        type: {
          summary: 'ButtonSize',
          detail: `'2xs' | 'xs' | 'sm' | 'md' | 'lg'`,
        },
      },
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
      description: '버튼의 모양',
      table: {
        type: {
          summary: 'ButtonShape',
          detail: `'rounded' | 'pill'`,
        },
      },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 표시 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: '버튼이 컨테이너 전체 너비를 차지하는지 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    width: {
      control: 'text',
      description: '버튼의 커스텀 너비 (예: "200px", "100%", "auto")',
      table: {
        type: { summary: 'string | number' },
      },
    },
    leadIcon: {
      control: 'object',
      description: '라벨 앞에 표시되는 아이콘 (iconOnly 변형에서는 버튼 아이콘)',
      table: {
        type: { summary: 'ButtonIconType | ReactNode' },
      },
    },
    tailIcon: {
      control: 'object',
      description: '라벨 뒤에 표시되는 아이콘',
      table: {
        type: { summary: 'ButtonIconType | ReactNode' },
      },
    },
    shortcut: {
      control: 'text',
      description: '키보드 단축키 표시 (예: "/", "⌘K")',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: '버튼 라벨 텍스트. iconOnly 변형에서는 선택 사항',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 호출되는 콜백 함수',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * 기본 버튼
 *
 * Button 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: button 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    children: 'Button',
    style: 'primary',
    size: 'md',
    leadIcon: ['system', 'add'],
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 모든 스타일
 */
export const AllStyles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <Button style="primary">Primary</Button>
      <Button style="secondary">Secondary</Button>
      <Button style="destructive">Destructive</Button>
      <Button style="ghost">Ghost</Button>
      <Button style="ghostMuted">Ghost Muted</Button>
      <Button style="soft">Soft</Button>
      <Button style="dashed">Dashed</Button>
    </div>
  ),
};

/**
 * 모든 크기
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <Button size="2xs">2XS</Button>
      <Button size="xs">XS</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * 모든 모양
 */
export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap gap-12 items-center">
        <Button shape="rounded">Rounded</Button>
        <Button shape="pill">Pill</Button>
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <Button shape="rounded" style="secondary">Rounded</Button>
        <Button shape="pill" style="secondary">Pill</Button>
      </div>
    </div>
  ),
};

/**
 * 아이콘 포함
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-12 items-center">
        <Button leadIcon={['system', 'delete-bin']}>Delete</Button>
        <Button tailIcon={['system', 'external-link']}>Preview</Button>
        <Button leadIcon={['system', 'add']}>Add New</Button>
        <Button leadIcon={['media', 'volume-mute']}>Mute</Button>
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <Button leadIcon={['system', 'check']} tailIcon={['arrows', 'arrow-down']}>Confirm</Button>
      </div>
    </div>
  ),
};

/**
 * 채워진 아이콘
 * isFill=true로 채워진 아이콘 사용
 */
export const WithFilledIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <p className="m-0 size-sm text-subtle">Regular icons vs Filled icons (isFill=true)</p>
      <div className="flex flex-wrap gap-12 items-center">
        <Button leadIcon={['system', 'star']}>Regular</Button>
        <Button leadIcon={['system', 'star', true]}>Filled</Button>
        <Button leadIcon={['health', 'heart']}>Regular</Button>
        <Button leadIcon={['health', 'heart', true]}>Filled</Button>
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <Button style="secondary" leadIcon={['system', 'settings']}>Regular</Button>
        <Button style="secondary" leadIcon={['system', 'settings', true]}>Filled</Button>
        <Button style="secondary" leadIcon={['business', 'bookmark']}>Regular</Button>
        <Button style="secondary" leadIcon={['business', 'bookmark', true]}>Filled</Button>
      </div>
    </div>
  ),
};

/**
 * 아이콘 전용 변형
 */
export const IconOnlyVariant: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center">
      <Button variant="iconOnly" leadIcon={['system', 'settings']} size="2xs" />
      <Button variant="iconOnly" leadIcon={['system', 'settings']} size="xs" />
      <Button variant="iconOnly" leadIcon={['system', 'settings']} size="sm" />
      <Button variant="iconOnly" leadIcon={['system', 'settings']} size="md" />
      <Button variant="iconOnly" leadIcon={['system', 'settings']} size="lg" />
    </div>
  ),
};

/**
 * 단축키 표시
 */
export const WithShortcut: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-12 items-center">
        <Button size="2xs" shortcut="/">2XS</Button>
        <Button size="xs" shortcut="/">XS</Button>
        <Button size="sm" shortcut="/">Small</Button>
        <Button size="md" shortcut="/">Medium</Button>
        <Button size="lg" shortcut="/">Large</Button>
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <Button style="secondary" size="2xs" shortcut="/">2XS</Button>
        <Button style="secondary" size="xs" shortcut="/">XS</Button>
        <Button style="secondary" size="sm" shortcut="/">Small</Button>
        <Button style="secondary" size="md" shortcut="/">Medium</Button>
        <Button style="secondary" size="lg" shortcut="/">Large</Button>
      </div>
    </div>
  ),
};

/**
 * 상태
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-12 items-center">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
      <div className="flex flex-wrap gap-12 items-center">
        <Button style="secondary">Default</Button>
        <Button style="secondary" disabled>Disabled</Button>
        <Button style="secondary" loading>Loading</Button>
      </div>
    </div>
  ),
};

/**
 * 커스텀 너비
 */
export const CustomWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <Button width={200}>Fixed 200px</Button>
      <Button width="100%">Full Width (100%)</Button>
      <Button fullWidth>Full Width (prop)</Button>
    </div>
  ),
};
