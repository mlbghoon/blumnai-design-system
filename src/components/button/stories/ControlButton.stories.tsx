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
      description: '컨트롤 버튼의 시각적 스타일을 설정합니다. default는 밝은 배경, inverted는 어두운 배경에서 사용하는 반전 스타일입니다',
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
      description: '컨트롤 버튼의 크기를 설정합니다. sm(작게), md(보통), lg(크게) 중 선택할 수 있습니다',
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
      description: '컨트롤 버튼의 외곽선 모양을 설정합니다. rounded는 둥근 모서리, circle은 완전한 원형입니다',
      table: {
        type: {
          summary: 'ControlButtonShape',
          detail: `'rounded' | 'circle'`,
        },
      },
    },
    icon: {
      control: 'object',
      description: '버튼에 표시할 아이콘입니다. [카테고리, 이름] 형식의 튜플로 지정합니다 (필수)',
      table: {
        type: { summary: 'IconType' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 버튼이 비활성화되어 클릭할 수 없고, 시각적으로 흐리게 표시됩니다',
      table: {
        type: { summary: 'boolean' },
      },
    },
    'aria-label': {
      control: 'text',
      description: '스크린 리더를 위한 접근성 라벨입니다. 아이콘 전용 버튼이므로 반드시 제공해야 합니다',
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
    <div className="flex flex-wrap ds-gap-12 items-center padding-16 rounded-md border-default">
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
    <div className="flex flex-wrap ds-gap-12 items-center padding-16 rounded-md border-default">
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
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center padding-16 rounded-md border-default">
        <span className="text-default size-sm">Default:</span>
        <ControlButton icon={['media', 'play']} aria-label="Play" buttonStyle="default" />
        <ControlButton icon={['media', 'pause']} aria-label="Pause" buttonStyle="default" />
        <ControlButton icon={['media', 'skip-forward']} aria-label="Skip" buttonStyle="default" />
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center bg-subtle padding-16 rounded-md">
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
    <div className="flex flex-wrap ds-gap-12 items-center padding-16 rounded-md border-default">
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
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center padding-16 rounded-md border-default">
        <span className="text-default size-sm">Default:</span>
        <ControlButton icon={['media', 'play']} aria-label="Play" />
        <ControlButton icon={['media', 'play']} aria-label="Play" disabled />
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center bg-subtle padding-16 rounded-md">
        <span className="text-white size-sm">Inverted:</span>
        <ControlButton icon={['media', 'play']} aria-label="Play" buttonStyle="inverted" />
        <ControlButton icon={['media', 'play']} aria-label="Play" buttonStyle="inverted" disabled />
      </div>
    </div>
  ),
};
