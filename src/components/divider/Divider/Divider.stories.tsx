import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'default',
        'text-left',
        'text-center',
        'text-right',
        'icon-left',
        'icon-center',
        'icon-right',
        'button-left',
        'button-center',
        'button-right',
      ],
      description: '디바이더 타입',
      table: {
        type: {
          summary: 'DividerType',
          detail: `'default' | 'text-left' | 'text-center' | 'text-right' | 'icon-left' | 'icon-center' | 'icon-right' | 'button-left' | 'button-center' | 'button-right'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    lineStyle: {
      control: 'select',
      options: ['default', 'dashed'],
      description: '디바이더 라인 스타일',
      table: {
        type: {
          summary: 'DividerStyle',
          detail: `'default' | 'dashed'`,
        },
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: '텍스트 라벨 (text-* 타입에서 사용)',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'object',
      description: '아이콘 타입 (icon-* 타입에서 사용)',
      table: {
        type: {
          summary: 'DividerIconType',
          detail: `[category, name] 또는 [category, name, isFill] 튜플 형식`,
        },
      },
    },
    buttonLabel: {
      control: 'text',
      description: '버튼 라벨 (button-* 타입에서 사용)',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonLeadIcon: {
      control: 'object',
      description: '버튼 앞에 표시되는 아이콘 (button-* 타입에서 사용)',
      table: {
        type: {
          summary: 'ButtonIconType | ReactNode',
          detail: `[category, name] 또는 [category, name, isFill] 튜플 형식`,
        },
      },
    },
    buttonTailIcon: {
      control: 'object',
      description: '버튼 뒤에 표시되는 아이콘 (button-* 타입에서 사용)',
      table: {
        type: {
          summary: 'ButtonIconType | ReactNode',
          detail: `[category, name] 또는 [category, name, isFill] 튜플 형식`,
        },
      },
    },
    buttonBadge: {
      control: 'text',
      description: '버튼 내 뱃지/단축키 텍스트 (button-* 타입에서 사용)',
      table: {
        type: { summary: 'string' },
      },
    },
    onButtonClick: {
      action: 'buttonClicked',
      description: '버튼 클릭 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '디바이더 방향. vertical일 때 부모 요소에 높이가 설정되어 있어야 합니다',
      table: {
        type: {
          summary: 'DividerOrientation',
          detail: `'horizontal' | 'vertical'`,
        },
        defaultValue: { summary: "'horizontal'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

/**
 * 기본 Divider
 *
 * Divider 컴포넌트는 `ref`와 `className` prop을 지원합니다.
 * - `ref`: DOM 요소에 직접 접근 가능
 * - `className`: 커스텀 스타일 클래스 추가 가능
 */
export const Default: Story = {
  args: {
    type: 'default',
    lineStyle: 'default',
    orientation: 'horizontal',
    label: '라벨',
    icon: undefined,
    buttonLabel: '버튼',
    buttonLeadIcon: undefined,
    buttonTailIcon: undefined,
    buttonBadge: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const dividerRef = useRef<HTMLDivElement>(null);
    const isVertical = args.orientation === 'vertical';
    return (
      <div style={{ width: '100%', maxWidth: '400px', ...(isVertical ? { height: '100px', display: 'flex' } : {}) }}>
        <Divider
          ref={dividerRef}
          type={args.type}
          lineStyle={args.lineStyle}
          orientation={args.orientation}
          label={args.label}
          icon={args.icon}
          buttonLabel={args.buttonLabel}
          buttonLeadIcon={args.buttonLeadIcon}
          buttonTailIcon={args.buttonTailIcon}
          buttonBadge={args.buttonBadge}
          onButtonClick={args.onButtonClick}
        />
      </div>
    );
  },
};

/**
 * 기본 라인
 */
export const DefaultLine: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Divider />
    </div>
  ),
};

/**
 * 점선 스타일
 */
export const DashedLine: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Divider lineStyle="dashed" />
    </div>
  ),
};

/**
 * 텍스트 왼쪽 정렬
 */
export const TextLeft: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="text-left" label="라벨" />
      <Divider type="text-left" label="라벨" lineStyle="dashed" />
    </div>
  ),
};

/**
 * 텍스트 가운데 정렬
 */
export const TextCenter: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="text-center" label="라벨" />
      <Divider type="text-center" label="라벨" lineStyle="dashed" />
    </div>
  ),
};

/**
 * 텍스트 오른쪽 정렬
 */
export const TextRight: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="text-right" label="라벨" />
      <Divider type="text-right" label="라벨" lineStyle="dashed" />
    </div>
  ),
};

/**
 * 아이콘 왼쪽 정렬
 */
export const IconLeft: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="icon-left" icon={['system', 'star']} />
      <Divider type="icon-left" icon={['system', 'star']} lineStyle="dashed" />
    </div>
  ),
};

/**
 * 아이콘 가운데 정렬
 */
export const IconCenter: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="icon-center" icon={['system', 'star']} />
      <Divider type="icon-center" icon={['system', 'star']} lineStyle="dashed" />
    </div>
  ),
};

/**
 * 아이콘 오른쪽 정렬
 */
export const IconRight: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="icon-right" icon={['system', 'star']} />
      <Divider type="icon-right" icon={['system', 'star']} lineStyle="dashed" />
    </div>
  ),
};

/**
 * 채워진 아이콘 (isFill)
 */
export const IconFilled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>일반 아이콘</span>
        <Divider type="icon-center" icon={['system', 'star']} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>채워진 아이콘 (isFill)</span>
        <Divider type="icon-center" icon={['system', 'star', true]} />
      </div>
    </div>
  ),
};

/**
 * 버튼 왼쪽 정렬
 */
export const ButtonLeft: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="button-left" buttonLabel="버튼" onButtonClick={() => console.log('clicked')} />
      <Divider type="button-left" buttonLabel="버튼" lineStyle="dashed" onButtonClick={() => console.log('clicked')} />
    </div>
  ),
};

/**
 * 버튼 가운데 정렬
 */
export const ButtonCenter: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="button-center" buttonLabel="버튼" onButtonClick={() => console.log('clicked')} />
      <Divider type="button-center" buttonLabel="버튼" lineStyle="dashed" onButtonClick={() => console.log('clicked')} />
    </div>
  ),
};

/**
 * 버튼 오른쪽 정렬
 */
export const ButtonRight: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="button-right" buttonLabel="버튼" onButtonClick={() => console.log('clicked')} />
      <Divider type="button-right" buttonLabel="버튼" lineStyle="dashed" onButtonClick={() => console.log('clicked')} />
    </div>
  ),
};

/**
 * 버튼 전체 기능 (아이콘, 뱃지)
 */
export const ButtonWithFeatures: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>앞 아이콘</span>
        <Divider
          type="button-center"
          buttonLabel="버튼"
          buttonLeadIcon={['system', 'add']}
          onButtonClick={() => console.log('clicked')}
        />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>뒤 아이콘</span>
        <Divider
          type="button-center"
          buttonLabel="버튼"
          buttonTailIcon={['arrows', 'chevron-down']}
          onButtonClick={() => console.log('clicked')}
        />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>배지</span>
        <Divider
          type="button-center"
          buttonLabel="버튼"
          buttonBadge="⌘K"
          onButtonClick={() => console.log('clicked')}
        />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>모든 기능</span>
        <Divider
          type="button-center"
          buttonLabel="더 보기"
          buttonLeadIcon={['system', 'add']}
          buttonTailIcon={['arrows', 'chevron-down']}
          buttonBadge="12"
          onButtonClick={() => console.log('clicked')}
        />
      </div>
    </div>
  ),
};

/**
 * 모든 타입 (실선)
 */
export const AllTypesDefault: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>기본</span>
        <Divider />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>텍스트 왼쪽</span>
        <Divider type="text-left" label="라벨" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>텍스트 가운데</span>
        <Divider type="text-center" label="라벨" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>텍스트 오른쪽</span>
        <Divider type="text-right" label="라벨" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>아이콘 왼쪽</span>
        <Divider type="icon-left" icon={['system', 'star']} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>아이콘 가운데</span>
        <Divider type="icon-center" icon={['system', 'star']} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>아이콘 오른쪽</span>
        <Divider type="icon-right" icon={['system', 'star']} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>버튼 왼쪽</span>
        <Divider type="button-left" buttonLabel="버튼" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>버튼 가운데</span>
        <Divider type="button-center" buttonLabel="버튼" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>버튼 오른쪽</span>
        <Divider type="button-right" buttonLabel="버튼" />
      </div>
    </div>
  ),
};

/**
 * 모든 타입 (점선)
 */
export const AllTypesDashed: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>기본</span>
        <Divider lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>텍스트 왼쪽</span>
        <Divider type="text-left" label="라벨" lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>텍스트 가운데</span>
        <Divider type="text-center" label="라벨" lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>텍스트 오른쪽</span>
        <Divider type="text-right" label="라벨" lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>아이콘 왼쪽</span>
        <Divider type="icon-left" icon={['system', 'star']} lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>아이콘 가운데</span>
        <Divider type="icon-center" icon={['system', 'star']} lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>아이콘 오른쪽</span>
        <Divider type="icon-right" icon={['system', 'star']} lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>버튼 왼쪽</span>
        <Divider type="button-left" buttonLabel="버튼" lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>버튼 가운데</span>
        <Divider type="button-center" buttonLabel="버튼" lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>버튼 오른쪽</span>
        <Divider type="button-right" buttonLabel="버튼" lineStyle="dashed" />
      </div>
    </div>
  ),
};

/**
 * 커스텀 콘텐츠
 */
export const CustomContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="text-center">
        <span style={{ color: 'var(--text-informative)', fontWeight: 600 }}>커스텀 콘텐츠</span>
      </Divider>
      <Divider type="text-center" lineStyle="dashed">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          🎉 축하
        </span>
      </Divider>
    </div>
  ),
};
