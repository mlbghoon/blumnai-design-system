import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiPauseLine, RiPlayLine, RiSkipBackLine, RiSkipForwardLine, RiStopLine } from '../../icons/Icon';

import { ControlButton } from '../ControlButton';

const meta: Meta<typeof ControlButton> = {
  title: 'Actions/Button/ControlButton',
  component: ControlButton,
  parameters: {
    layout: 'centered',
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
      options: ['sm', 'md', 'lg', 'xl'],
      description: '컨트롤 버튼의 크기를 설정합니다. sm(작게), md(보통), lg(크게), xl(매우 크게) 중 선택할 수 있습니다',
      table: {
        type: {
          summary: 'ControlButtonSize',
          detail: `'sm' | 'md' | 'lg' | 'xl'`,
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
      description: '버튼에 표시할 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated, 필수)',
      table: {
        type: {
          summary: 'IconProp',
          detail: `Remixicon component (권장, tree-shakeable):
  icon={RiAddLine}
  icon={RiSettings3Line}
  icon={RiStarFill}

또는 tuple form (deprecated, dev console warning):
  icon={['system', 'add']}
  icon={['system', 'star', true]}`,
        },
      },
    },
    colorOverride: {
      control: 'select',
      options: [
        'gray', 'red', 'orange', 'amber', 'yellow', 'lime',
        'green', 'emerald', 'teal', 'cyan', 'sky', 'blue',
        'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
      ],
      description: '아이콘 색상을 오버라이드합니다. 배경/호버 스타일에는 영향 없음. Button의 colorOverride와 동일한 색상 팔레트',
      table: {
        type: {
          summary: 'ButtonColor',
          detail: `'gray' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime'
| 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue'
| 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'`,
        },
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
    className: {
      control: 'text',
      description: '컨테이너에 추가할 CSS 클래스. 아이콘 색상은 colorOverride를 사용하세요',
      table: {
        type: { summary: 'string' },
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
    icon: RiPlayLine,
    'aria-label': 'Play',
    buttonStyle: 'default',
    size: 'md',
    shape: 'rounded',
    colorOverride: undefined,
    disabled: false,
    asChild: false,
    className: '',
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
    <div className="flex flex-wrap ds-gap-12 items-center justify-center padding-16 rounded-md border-default">
      <ControlButton icon={RiPlayLine} aria-label="Play" size="sm" />
      <ControlButton icon={RiPlayLine} aria-label="Play" size="md" />
      <ControlButton icon={RiPlayLine} aria-label="Play" size="lg" />
      <ControlButton icon={RiPlayLine} aria-label="Play" size="xl" />
    </div>
  ),
};

/**
 * 모든 모양
 */
export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-wrap ds-gap-12 items-center justify-center padding-16 rounded-md border-default">
      <ControlButton icon={RiPlayLine} aria-label="Play" shape="rounded" />
      <ControlButton icon={RiPlayLine} aria-label="Play" shape="circle" />
    </div>
  ),
};

/**
 * 모든 스타일
 */
export const AllStyles: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center justify-center padding-16 rounded-md border-default">
        <span className="text-default size-sm">Default:</span>
        <ControlButton icon={RiPlayLine} aria-label="Play" buttonStyle="default" />
        <ControlButton icon={RiPauseLine} aria-label="Pause" buttonStyle="default" />
        <ControlButton icon={RiSkipForwardLine} aria-label="Skip" buttonStyle="default" />
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center bg-subtle padding-16 rounded-md">
        <span className="text-white size-sm">Inverted:</span>
        <ControlButton icon={RiPlayLine} aria-label="Play" buttonStyle="inverted" />
        <ControlButton icon={RiPauseLine} aria-label="Pause" buttonStyle="inverted" />
        <ControlButton icon={RiSkipForwardLine} aria-label="Skip" buttonStyle="inverted" />
      </div>
    </div>
  ),
};

/**
 * 일반 컨트롤
 */
export const CommonControls: Story = {
  render: () => (
    <div className="flex flex-wrap ds-gap-12 items-center justify-center padding-16 rounded-md border-default">
      <ControlButton icon={RiPlayLine} aria-label="Play" />
      <ControlButton icon={RiPauseLine} aria-label="Pause" />
      <ControlButton icon={RiSkipForwardLine} aria-label="Skip forward" />
      <ControlButton icon={RiSkipBackLine} aria-label="Skip back" />
      <ControlButton icon={RiStopLine} aria-label="Stop" />
    </div>
  ),
};

/**
 * 상태
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-16">
      <div className="flex flex-wrap ds-gap-12 items-center justify-center padding-16 rounded-md border-default">
        <span className="text-default size-sm">Default:</span>
        <ControlButton icon={RiPlayLine} aria-label="Play" />
        <ControlButton icon={RiPlayLine} aria-label="Play" disabled />
      </div>
      <div className="flex flex-wrap ds-gap-12 items-center justify-center bg-subtle padding-16 rounded-md">
        <span className="text-white size-sm">Inverted:</span>
        <ControlButton icon={RiPlayLine} aria-label="Play" buttonStyle="inverted" />
        <ControlButton icon={RiPlayLine} aria-label="Play" buttonStyle="inverted" disabled />
      </div>
    </div>
  ),
};
