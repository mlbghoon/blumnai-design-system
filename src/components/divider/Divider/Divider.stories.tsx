import { useRef } from 'react';
import { RiAddLine, RiArrowDownSLine, RiStarFill, RiStarLine } from '../../icons/Icon';

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
      description: '아이콘 타입 (icon-* 타입에서 사용) (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'DividerIconType',
          detail: `Remixicon component (권장, tree-shakeable):
  icon={RiStarLine}
  icon={RiHeartFill}

또는 tuple form (deprecated, dev console warning):
  icon={['system', 'star']}
  icon={['health', 'heart', true]}`,
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
      description: '버튼 앞에 표시되는 아이콘 (button-* 타입에서 사용) (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'ButtonIconType | ReactNode',
          detail: `Remixicon component (권장, tree-shakeable):
  buttonLeadIcon={RiAddLine}
  buttonLeadIcon={RiStarFill}

또는 tuple form (deprecated, dev console warning):
  buttonLeadIcon={['system', 'add']}
  buttonLeadIcon={['system', 'star', true]}

또는 ReactNode (이미 렌더된 JSX)`,
        },
      },
    },
    buttonTailIcon: {
      control: 'object',
      description: '버튼 뒤에 표시되는 아이콘 (button-* 타입에서 사용) (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'ButtonIconType | ReactNode',
          detail: `Remixicon component (권장, tree-shakeable):
  buttonTailIcon={RiArrowRightLine}
  buttonTailIcon={RiArrowDownSLine}

또는 tuple form (deprecated, dev console warning):
  buttonTailIcon={['arrows', 'arrow-right']}
  buttonTailIcon={['arrows', 'chevron-down', true]}

또는 ReactNode (이미 렌더된 JSX)`,
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
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '구분선 주변 여백 크기 (sm=8px, md=12px, lg=16px, xl=24px)',
      table: {
        type: {
          summary: 'DividerSpacing',
          detail: `'sm' | 'md' | 'lg' | 'xl'`,
        },
        defaultValue: { summary: "'lg'" },
      },
    },
    spacingOverride: {
      control: 'number',
      description: '여백을 px 단위로 직접 지정. 설정 시 spacing 값은 무시됩니다',
      table: {
        type: { summary: 'number' },
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
    spacing: 'lg',
    spacingOverride: undefined,
    label: '라벨',
    icon: undefined,
    buttonLabel: '버튼',
    buttonLeadIcon: undefined,
    buttonTailIcon: undefined,
    buttonBadge: undefined,
    onButtonClick: undefined,
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
          spacing={args.spacing}
          spacingOverride={args.spacingOverride}
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
      <Divider type="icon-left" icon={RiStarLine} />
      <Divider type="icon-left" icon={RiStarLine} lineStyle="dashed" />
    </div>
  ),
};

/**
 * 아이콘 가운데 정렬
 */
export const IconCenter: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="icon-center" icon={RiStarLine} />
      <Divider type="icon-center" icon={RiStarLine} lineStyle="dashed" />
    </div>
  ),
};

/**
 * 아이콘 오른쪽 정렬
 */
export const IconRight: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
      <Divider type="icon-right" icon={RiStarLine} />
      <Divider type="icon-right" icon={RiStarLine} lineStyle="dashed" />
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
        <Divider type="icon-center" icon={RiStarLine} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>채워진 아이콘 (isFill)</span>
        <Divider type="icon-center" icon={RiStarFill} />
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
          buttonLeadIcon={RiAddLine}
          onButtonClick={() => console.log('clicked')}
        />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>뒤 아이콘</span>
        <Divider
          type="button-center"
          buttonLabel="버튼"
          buttonTailIcon={RiArrowDownSLine}
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
          buttonLeadIcon={RiAddLine}
          buttonTailIcon={RiArrowDownSLine}
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
        <Divider type="icon-left" icon={RiStarLine} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>아이콘 가운데</span>
        <Divider type="icon-center" icon={RiStarLine} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>아이콘 오른쪽</span>
        <Divider type="icon-right" icon={RiStarLine} />
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
        <Divider type="icon-left" icon={RiStarLine} lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>아이콘 가운데</span>
        <Divider type="icon-center" icon={RiStarLine} lineStyle="dashed" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '8px', display: 'block' }}>아이콘 오른쪽</span>
        <Divider type="icon-right" icon={RiStarLine} lineStyle="dashed" />
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
 * 여백 크기 (Spacing)
 *
 * sm(8px), md(12px), lg(16px, 기본값), xl(24px)
 */
export const Spacing: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px', width: '100%', maxWidth: '600px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '12px', color: '#6f6f77', marginBottom: '4px' }}>Horizontal</span>
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} style={{ background: 'var(--bg-subtle)' }}>
            <Divider spacing={size} />
            <span style={{ fontSize: '11px', color: '#6f6f77', paddingLeft: '4px' }}>{size}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '16px', height: '200px' }}>
        <span style={{ fontSize: '12px', color: '#6f6f77' }}>Vertical</span>
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} style={{ display: 'flex', alignItems: 'stretch', height: '100%', background: 'var(--bg-subtle)' }}>
            <Divider orientation="vertical" spacing={size} />
            <span style={{ fontSize: '11px', color: '#6f6f77', writingMode: 'vertical-lr' }}>{size}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * 여백 + 콘텐츠 (Spacing with Content)
 *
 * 텍스트 라벨이 있는 구분선에서의 여백 크기
 */
export const SpacingWithContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ background: 'var(--bg-subtle)' }}>
          <Divider type="text-center" label={size} spacing={size} />
        </div>
      ))}
    </div>
  ),
};

/**
 * 커스텀 여백 (SpacingOverride)
 *
 * spacingOverride로 px 단위 직접 지정. spacing 값은 무시됩니다.
 */
export const SpacingOverride: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
      <div style={{ background: 'var(--bg-subtle)' }}>
        <span style={{ fontSize: '12px', color: '#6f6f77', paddingLeft: '4px' }}>spacingOverride=30</span>
        <Divider spacingOverride={30} />
      </div>
      <div style={{ background: 'var(--bg-subtle)' }}>
        <span style={{ fontSize: '12px', color: '#6f6f77', paddingLeft: '4px' }}>spacingOverride=30 (with content)</span>
        <Divider type="text-center" label="30px" spacingOverride={30} />
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
