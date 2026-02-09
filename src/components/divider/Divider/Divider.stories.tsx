import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

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
    label: 'Label',
    buttonLabel: 'Button',
    buttonLeadIcon: undefined,
    buttonTailIcon: undefined,
    buttonBadge: undefined,
    className: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const dividerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (dividerRef.current) {
        console.log('Divider ref:', dividerRef.current);
      }
    }, []);

    return (
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Divider ref={dividerRef} {...args} />
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
      <Divider type="text-left" label="Label" />
      <Divider type="text-left" label="Label" lineStyle="dashed" />
    </div>
  ),
};

/**
 * 텍스트 가운데 정렬
 */
export const TextCenter: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="text-center" label="Label" />
      <Divider type="text-center" label="Label" lineStyle="dashed" />
    </div>
  ),
};

/**
 * 텍스트 오른쪽 정렬
 */
export const TextRight: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="text-right" label="Label" />
      <Divider type="text-right" label="Label" lineStyle="dashed" />
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
      <Divider type="button-left" buttonLabel="Button" onButtonClick={() => console.log('clicked')} />
      <Divider type="button-left" buttonLabel="Button" lineStyle="dashed" onButtonClick={() => console.log('clicked')} />
    </div>
  ),
};

/**
 * 버튼 가운데 정렬
 */
export const ButtonCenter: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="button-center" buttonLabel="Button" onButtonClick={() => console.log('clicked')} />
      <Divider type="button-center" buttonLabel="Button" lineStyle="dashed" onButtonClick={() => console.log('clicked')} />
    </div>
  ),
};

/**
 * 버튼 오른쪽 정렬
 */
export const ButtonRight: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="button-right" buttonLabel="Button" onButtonClick={() => console.log('clicked')} />
      <Divider type="button-right" buttonLabel="Button" lineStyle="dashed" onButtonClick={() => console.log('clicked')} />
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
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Lead Icon</span>
        <Divider
          type="button-center"
          buttonLabel="Button"
          buttonLeadIcon={['system', 'add']}
          onButtonClick={() => console.log('clicked')}
        />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Tail Icon</span>
        <Divider
          type="button-center"
          buttonLabel="Button"
          buttonTailIcon={['arrows', 'chevron-down']}
          onButtonClick={() => console.log('clicked')}
        />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Badge</span>
        <Divider
          type="button-center"
          buttonLabel="Button"
          buttonBadge="⌘K"
          onButtonClick={() => console.log('clicked')}
        />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>All Features</span>
        <Divider
          type="button-center"
          buttonLabel="More"
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
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Default</span>
        <Divider />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Text Left</span>
        <Divider type="text-left" label="Label" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Text Center</span>
        <Divider type="text-center" label="Label" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Text Right</span>
        <Divider type="text-right" label="Label" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Icon Left</span>
        <Divider type="icon-left" icon={['system', 'star']} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Icon Center</span>
        <Divider type="icon-center" icon={['system', 'star']} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Icon Right</span>
        <Divider type="icon-right" icon={['system', 'star']} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Button Left</span>
        <Divider type="button-left" buttonLabel="Button" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Button Center</span>
        <Divider type="button-center" buttonLabel="Button" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Button Right</span>
        <Divider type="button-right" buttonLabel="Button" />
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
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Default</span>
        <Divider lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Text Left</span>
        <Divider type="text-left" label="Label" lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Text Center</span>
        <Divider type="text-center" label="Label" lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Text Right</span>
        <Divider type="text-right" label="Label" lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Icon Left</span>
        <Divider type="icon-left" icon={['system', 'star']} lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Icon Center</span>
        <Divider type="icon-center" icon={['system', 'star']} lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Icon Right</span>
        <Divider type="icon-right" icon={['system', 'star']} lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Button Left</span>
        <Divider type="button-left" buttonLabel="Button" lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Button Center</span>
        <Divider type="button-center" buttonLabel="Button" lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>Button Right</span>
        <Divider type="button-right" buttonLabel="Button" lineStyle="dashed" />
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
        <span style={{ color: 'var(--text-informative)', fontWeight: 600 }}>Custom Content</span>
      </Divider>
      <Divider type="text-center" lineStyle="dashed">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          🎉 Celebration
        </span>
      </Divider>
    </div>
  ),
};
