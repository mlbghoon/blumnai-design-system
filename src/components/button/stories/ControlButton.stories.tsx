import type { Meta, StoryObj } from '@storybook/react-vite';

import { ControlButton } from '../ControlButton';

const meta: Meta<typeof ControlButton> = {
  title: 'Actions/Button/ControlButton',
  component: ControlButton,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    buttonStyle: {
      control: 'select',
      options: ['default', 'inverted'],
      description: '컨트롤 버튼의 스타일 변형',
      table: {
        type: {
          summary: 'ControlButtonStyle',
          detail: `'default' | 'inverted'`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '컨트롤 버튼의 크기',
      table: {
        type: {
          summary: 'ControlButtonSize',
          detail: `'sm' | 'md' | 'lg'`,
        },
      },
    },
    shape: {
      control: 'select',
      options: ['rounded', 'circle'],
      description: '컨트롤 버튼의 모양',
      table: {
        type: {
          summary: 'ControlButtonShape',
          detail: `'rounded' | 'circle'`,
        },
      },
    },
    icon: {
      control: 'object',
      description: '아이콘 타입 튜플 (필수)',
      table: {
        type: { summary: 'IconType' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    'aria-label': {
      control: 'text',
      description: '접근성 라벨 (아이콘 전용 버튼에 필수)',
      table: {
        type: { summary: 'string' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'true일 경우 자식 요소를 버튼으로 렌더링 (Radix Slot 패턴)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
type Story = StoryObj<typeof ControlButton>;

/**
 * 기본 컨트롤 버튼
 *
 * ControlButton 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: button 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 * - `asChild`: Radix Slot 패턴으로 자식 요소를 버튼으로 렌더링
 */
export const Default: Story = {
  args: {
    icon: ['media', 'play'],
    'aria-label': 'Play',
    buttonStyle: 'default',
    size: 'md',
    shape: 'rounded',
  },
  parameters: {
    controls: { disable: false },
  },
};

/**
 * 모든 크기
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center padding-16 rounded-md border-default">
      <ControlButton icon={['media', 'play']} aria-label="Play" size="sm" />
      <ControlButton icon={['media', 'play']} aria-label="Play" size="md" />
      <ControlButton icon={['media', 'play']} aria-label="Play" size="lg" />
    </div>
  ),
};

/**
 * 모든 모양
 */
export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center padding-16 rounded-md border-default">
      <ControlButton icon={['media', 'play']} aria-label="Play" shape="rounded" />
      <ControlButton icon={['media', 'play']} aria-label="Play" shape="circle" />
    </div>
  ),
};

/**
 * 모든 스타일
 */
export const AllStyles: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-12 items-center padding-16 rounded-md border-default">
        <span className="text-default size-sm">Default:</span>
        <ControlButton icon={['media', 'play']} aria-label="Play" buttonStyle="default" />
        <ControlButton icon={['media', 'pause']} aria-label="Pause" buttonStyle="default" />
        <ControlButton icon={['media', 'skip-forward']} aria-label="Skip" buttonStyle="default" />
      </div>
      <div className="flex flex-wrap gap-12 items-center bg-subtle padding-16 rounded-md">
        <span className="text-white size-sm">Inverted:</span>
        <ControlButton icon={['media', 'play']} aria-label="Play" buttonStyle="inverted" />
        <ControlButton icon={['media', 'pause']} aria-label="Pause" buttonStyle="inverted" />
        <ControlButton icon={['media', 'skip-forward']} aria-label="Skip" buttonStyle="inverted" />
      </div>
    </div>
  ),
};

/**
 * 일반 컨트롤
 */
export const CommonControls: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12 items-center padding-16 rounded-md border-default">
      <ControlButton icon={['media', 'play']} aria-label="Play" />
      <ControlButton icon={['media', 'pause']} aria-label="Pause" />
      <ControlButton icon={['media', 'skip-forward']} aria-label="Skip forward" />
      <ControlButton icon={['media', 'skip-back']} aria-label="Skip back" />
      <ControlButton icon={['media', 'stop']} aria-label="Stop" />
    </div>
  ),
};

/**
 * 상태
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-12 items-center padding-16 rounded-md border-default">
        <span className="text-default size-sm">Default:</span>
        <ControlButton icon={['media', 'play']} aria-label="Play" />
        <ControlButton icon={['media', 'play']} aria-label="Play" disabled />
      </div>
      <div className="flex flex-wrap gap-12 items-center bg-subtle padding-16 rounded-md">
        <span className="text-white size-sm">Inverted:</span>
        <ControlButton icon={['media', 'play']} aria-label="Play" buttonStyle="inverted" />
        <ControlButton icon={['media', 'play']} aria-label="Play" buttonStyle="inverted" disabled />
      </div>
    </div>
  ),
};
