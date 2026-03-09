import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Tabs';
import type { TabsTriggerProps, TabsType, TabsVariant, TabsShape, TabsSize } from '../Tabs.types';

interface TabsStoryProps {
  variant?: TabsVariant;
  shape?: TabsShape;
  size?: TabsSize;
  type?: TabsType;
  activeColor?: string;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  leadIcon?: TabsTriggerProps['leadIcon'];
  tailIcon?: TabsTriggerProps['tailIcon'];
  badge?: TabsTriggerProps['badge'];
  disabled?: boolean;
}

const meta: Meta<TabsStoryProps> = {
  title: 'Navigation/Tabs',
  component: TabsList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    // Tabs (Root) props
    defaultValue: {
      control: 'text',
      description: '[Tabs] 초기 렌더링 시 선택되어 있을 탭의 value입니다. 비제어 모드에서 사용합니다',
      table: {
        type: { summary: 'string' },
        category: 'Tabs',
      },
    },
    value: {
      control: 'text',
      description: '[Tabs] 현재 선택된 탭의 value입니다. onValueChange와 함께 사용하여 외부에서 탭 상태를 제어합니다',
      table: {
        type: { summary: 'string' },
        category: 'Tabs',
      },
    },
    onValueChange: {
      action: 'valueChange',
      description: '[Tabs] 선택된 탭이 변경될 때 호출되는 콜백 함수입니다. 새로 선택된 탭의 value가 인자로 전달됩니다',
      table: {
        type: { summary: '(value: string) => void' },
        category: 'Tabs',
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '[Tabs] 탭의 배치 방향을 설정합니다. horizontal(가로 배치) 또는 vertical(세로 배치)을 선택할 수 있습니다',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'horizontal'" },
        category: 'Tabs',
      },
    },
    activationMode: {
      control: 'select',
      options: ['automatic', 'manual'],
      description: '[Tabs] 키보드로 탭을 전환하는 방식을 설정합니다. automatic(포커스 이동 시 자동 활성화) 또는 manual(Enter/Space로 활성화)을 선택합니다',
      table: {
        type: { summary: "'automatic' | 'manual'" },
        defaultValue: { summary: "'automatic'" },
        category: 'Tabs',
      },
    },
    // TabsList props
    variant: {
      control: 'select',
      options: ['pill', 'segmented', 'underline'],
      description: '[TabsList] 탭의 시각적 스타일을 설정합니다. pill(개별 알약 형태), segmented(회색 배경 컨테이너), underline(하단 밑줄) 중 선택합니다',
      table: {
        type: { summary: 'TabsVariant', detail: "'pill' | 'segmented' | 'underline'" },
        defaultValue: { summary: "'segmented'" },
        category: 'TabsList',
      },
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded'],
      description: '[TabsList] 탭 아이템 모서리 스타일 (pill/segmented 변형에만 적용)',
      table: {
        type: { summary: 'TabsShape', detail: "'pill' | 'rounded'" },
        defaultValue: { summary: "'rounded'" },
        category: 'TabsList',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '[TabsList] 탭 크기 (underline 변형에만 적용)',
      table: {
        type: { summary: 'TabsSize', detail: "'sm' | 'lg'" },
        defaultValue: { summary: "'sm'" },
        category: 'TabsList',
      },
    },
    type: {
      control: 'select',
      options: ['default', 'fixed'],
      description: '[TabsList] 탭 너비 타입 (default: 콘텐츠 크기, fixed: 균등 너비)',
      table: {
        type: { summary: 'TabsType', detail: "'default' | 'fixed'" },
        defaultValue: { summary: "'default'" },
        category: 'TabsList',
      },
    },
    activeColor: {
      control: 'color',
      description: '[TabsList] 활성 탭의 텍스트 및 언더라인 색상 (underline 변형 전용)',
      table: {
        type: { summary: 'string' },
        category: 'TabsList',
      },
    },
    // TabsTrigger props
    leadIcon: {
      control: 'object',
      description: `[TabsTrigger] 앞에 표시되는 아이콘

IconTypeWithFill 또는 ReactNode를 사용할 수 있습니다.
- \`['system', 'settings']\` - 기본 아이콘
- \`['system', 'star', true]\` - filled 아이콘
- \`<CustomIcon />\` - ReactNode`,
      table: {
        type: {
          summary: 'IconTypeWithFill | ReactNode',
          detail: `IconTypeWithFill = [category, name] | [category, name, isFill]

예시:
  ['system', 'check']        - 기본 아이콘
  ['system', 'star', true]   - filled 아이콘
  ['health', 'heart', true]  - filled heart`,
        },
        category: 'TabsTrigger',
      },
    },
    tailIcon: {
      control: 'object',
      description: `[TabsTrigger] 뒤에 표시되는 아이콘

IconTypeWithFill 또는 ReactNode를 사용할 수 있습니다.
- \`['arrows', 'arrow-right']\` - 기본 아이콘
- \`['health', 'heart', true]\` - filled 아이콘
- \`<CustomIcon />\` - ReactNode`,
      table: {
        type: {
          summary: 'IconTypeWithFill | ReactNode',
          detail: `IconTypeWithFill = [category, name] | [category, name, isFill]

예시:
  ['arrows', 'arrow-down']   - 기본 아이콘
  ['health', 'heart', true]  - filled 아이콘`,
        },
        category: 'TabsTrigger',
      },
    },
    badge: {
      control: 'text',
      description: '[TabsTrigger] 탭 라벨 옆에 표시되는 배지입니다. 숫자 또는 텍스트를 전달하여 알림 수, 상태 등을 나타낼 수 있습니다',
      table: {
        type: { summary: 'string | number' },
        category: 'TabsTrigger',
      },
    },
    disabled: {
      control: 'boolean',
      description: '[TabsTrigger] true로 설정하면 해당 탭이 비활성화되어 클릭하거나 선택할 수 없습니다',
      table: {
        type: { summary: 'boolean' },
        category: 'TabsTrigger',
      },
    },
  },
};

export default meta;
type Story = StoryObj<TabsStoryProps>;

/**
 * 기본 탭
 *
 * 이 스토리에서 컴포넌트의 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  args: {
    variant: 'segmented',
    shape: 'rounded',
    size: 'sm',
    type: 'default',
    activeColor: undefined,
    orientation: 'horizontal',
    activationMode: 'automatic',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const variant = args.variant ?? 'segmented';
    const shape = args.shape ?? 'rounded';
    const size = args.size ?? 'sm';
    const type = args.type ?? 'default';
    const activeColor = args.activeColor || undefined;
    const orientation = args.orientation ?? 'horizontal';
    const activationMode = args.activationMode ?? 'automatic';

    return (
      <Tabs
        defaultValue="tab1"
        orientation={orientation}
        activationMode={activationMode}
        className={orientation === 'vertical' ? 'flex ds-gap-16' : undefined}
      >
        <TabsList variant={variant} shape={shape} size={size} type={type} activeColor={activeColor}>
          <TabsTrigger value="tab1">계정</TabsTrigger>
          <TabsTrigger value="tab2">설정</TabsTrigger>
          <TabsTrigger value="tab3">알림</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="font-body size-sm text-default">
          계정 설정 및 환경설정을 관리합니다.
        </TabsContent>
        <TabsContent value="tab2" className="font-body size-sm text-default">
          일반 애플리케이션 설정을 변경합니다.
        </TabsContent>
        <TabsContent value="tab3" className="font-body size-sm text-default">
          알림 환경설정을 관리합니다.
        </TabsContent>
      </Tabs>
    );
  },
};

/**
 * 모든 스타일 변형
 *
 * Pill, Segmented, Underline 세 가지 스타일을 비교합니다.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill tabs</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">상품</TabsTrigger>
            <TabsTrigger value="tab3">주문</TabsTrigger>
            <TabsTrigger value="tab4">구독</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented tabs</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">상품</TabsTrigger>
            <TabsTrigger value="tab3">주문</TabsTrigger>
            <TabsTrigger value="tab4">구독</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline tabs</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">상품</TabsTrigger>
            <TabsTrigger value="tab3">주문</TabsTrigger>
            <TabsTrigger value="tab4">구독</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * Pill 스타일 탭
 *
 * 컨테이너 배경 없이 개별 Pill 형태의 탭입니다.
 */
export const PillVariant: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="pill">
        <TabsTrigger value="tab1">개요</TabsTrigger>
        <TabsTrigger value="tab2">분석</TabsTrigger>
        <TabsTrigger value="tab3">보고서</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="font-body size-sm text-default">
        개요 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab2" className="font-body size-sm text-default">
        분석 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab3" className="font-body size-sm text-default">
        보고서 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Segmented 스타일 탭
 *
 * 회색 배경 컨테이너 안에 탭이 배치되는 스타일입니다.
 */
export const SegmentedVariant: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="segmented">
        <TabsTrigger value="tab1">개요</TabsTrigger>
        <TabsTrigger value="tab2">분석</TabsTrigger>
        <TabsTrigger value="tab3">보고서</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="font-body size-sm text-default">
        개요 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab2" className="font-body size-sm text-default">
        분석 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab3" className="font-body size-sm text-default">
        보고서 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Underline 스타일 탭
 *
 * 하단 밑줄 표시 스타일의 탭입니다.
 */
export const UnderlineVariant: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="underline">
        <TabsTrigger value="tab1">개요</TabsTrigger>
        <TabsTrigger value="tab2">분석</TabsTrigger>
        <TabsTrigger value="tab3">보고서</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="font-body size-sm text-default">
        개요 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab2" className="font-body size-sm text-default">
        분석 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab3" className="font-body size-sm text-default">
        보고서 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Underline 크기 비교
 *
 * size prop은 underline 변형에만 적용됩니다. (sm, lg)
 */
export const UnderlineSizes: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - Small (40px)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" size="sm">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - Large (48px)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" size="lg">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * Underline 커스텀 색상
 *
 * activeColor prop으로 활성 탭의 텍스트와 언더라인 색상을 변경할 수 있습니다.
 */
export const UnderlineActiveColor: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">activeColor=&quot;#5988fe&quot;</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" activeColor="#5988fe">
            <TabsTrigger value="tab1">고객 목록</TabsTrigger>
            <TabsTrigger value="tab2">상담 내역</TabsTrigger>
            <TabsTrigger value="tab3">통계</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">activeColor=&quot;#e11d48&quot;</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" activeColor="#e11d48">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">보고서</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">기본 (activeColor 없음)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">보고서</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * 아이콘 포함 탭
 *
 * leadIcon prop으로 탭에 아이콘을 추가할 수 있습니다.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented with Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" leadIcon={['user', 'user']}>프로필</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['system', 'settings']}>설정</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['media', 'notification']}>알림</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill with Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" leadIcon={['user', 'user']}>프로필</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['system', 'settings']}>설정</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['media', 'notification']}>알림</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline with Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" leadIcon={['user', 'user']}>프로필</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['system', 'settings']}>설정</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['media', 'notification']}>알림</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * 배지 포함 탭
 *
 * badge prop으로 숫자나 텍스트 배지를 추가할 수 있습니다.
 */
export const WithBadges: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented with Badges</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" badge={3}>받은편지함</TabsTrigger>
            <TabsTrigger value="tab2" badge={12}>보낸편지함</TabsTrigger>
            <TabsTrigger value="tab3">임시보관함</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill with Badges</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" badge={3}>받은편지함</TabsTrigger>
            <TabsTrigger value="tab2" badge={12}>보낸편지함</TabsTrigger>
            <TabsTrigger value="tab3">임시보관함</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline with Badges</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" badge={3}>받은편지함</TabsTrigger>
            <TabsTrigger value="tab2" badge={12}>보낸편지함</TabsTrigger>
            <TabsTrigger value="tab3">임시보관함</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Icons + Badges</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" leadIcon={['business', 'mail']} badge={5}>메시지</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['media', 'notification']} badge="New">업데이트</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['system', 'settings']}>설정</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * 비활성화 탭
 *
 * disabled prop으로 개별 탭을 비활성화할 수 있습니다.
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented with Disabled Tab</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1">활성</TabsTrigger>
            <TabsTrigger value="tab2" disabled>비활성</TabsTrigger>
            <TabsTrigger value="tab3">사용 가능</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill with Disabled Tab</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1">활성</TabsTrigger>
            <TabsTrigger value="tab2" disabled>비활성</TabsTrigger>
            <TabsTrigger value="tab3">사용 가능</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline with Disabled Tab</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1">활성</TabsTrigger>
            <TabsTrigger value="tab2" disabled>비활성</TabsTrigger>
            <TabsTrigger value="tab3">사용 가능</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * 세로 방향 탭
 *
 * orientation="vertical"로 세로 탭 레이아웃을 구현합니다.
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented Vertical</p>
        <Tabs defaultValue="tab1" orientation="vertical" className="flex ds-gap-16">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1">일반</TabsTrigger>
            <TabsTrigger value="tab2">보안</TabsTrigger>
            <TabsTrigger value="tab3">개인정보</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="flex-1 font-body size-sm text-default">
            일반 설정 패널입니다.
          </TabsContent>
          <TabsContent value="tab2" className="flex-1 font-body size-sm text-default">
            보안 설정 패널입니다.
          </TabsContent>
          <TabsContent value="tab3" className="flex-1 font-body size-sm text-default">
            개인정보 설정 패널입니다.
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline Vertical</p>
        <Tabs defaultValue="tab1" orientation="vertical" className="flex ds-gap-16">
          <TabsList variant="underline">
            <TabsTrigger value="tab1">일반</TabsTrigger>
            <TabsTrigger value="tab2">보안</TabsTrigger>
            <TabsTrigger value="tab3">개인정보</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="flex-1 font-body size-sm text-default">
            일반 설정 패널입니다.
          </TabsContent>
          <TabsContent value="tab2" className="flex-1 font-body size-sm text-default">
            보안 설정 패널입니다.
          </TabsContent>
          <TabsContent value="tab3" className="flex-1 font-body size-sm text-default">
            개인정보 설정 패널입니다.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * 제어 모드
 *
 * value와 onValueChange로 외부에서 탭 상태를 제어합니다.
 */
export const Controlled: Story = {
  render: function Render() {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div className="flex flex-col ds-gap-16">
        <p className="font-body size-sm text-muted">
          현재 탭: <span className="font-semibold text-default">{activeTab}</span>
        </p>
        <div className="flex ds-gap-8">
          <button
            onClick={() => setActiveTab('tab1')}
            className="padding-x-12 padding-y-6 rounded-md bg-muted font-body size-sm text-default hover:bg-subtle"
          >
            Tab 1로 이동
          </button>
          <button
            onClick={() => setActiveTab('tab2')}
            className="padding-x-12 padding-y-6 rounded-md bg-muted font-body size-sm text-default hover:bg-subtle"
          >
            Tab 2로 이동
          </button>
          <button
            onClick={() => setActiveTab('tab3')}
            className="padding-x-12 padding-y-6 rounded-md bg-muted font-body size-sm text-default hover:bg-subtle"
          >
            Tab 3로 이동
          </button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="segmented">
            <TabsTrigger value="tab1">첫 번째</TabsTrigger>
            <TabsTrigger value="tab2">두 번째</TabsTrigger>
            <TabsTrigger value="tab3">세 번째</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="font-body size-sm text-default">
            첫 번째 탭 콘텐츠입니다.
          </TabsContent>
          <TabsContent value="tab2" className="font-body size-sm text-default">
            두 번째 탭 콘텐츠입니다.
          </TabsContent>
          <TabsContent value="tab3" className="font-body size-sm text-default">
            세 번째 탭 콘텐츠입니다.
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

/**
 * Fixed 타입 탭
 *
 * type="fixed"로 탭이 균등한 너비로 컨테이너를 채웁니다.
 */
export const FixedType: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24 w-full">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented - Fixed</p>
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList variant="segmented" type="fixed">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - Fixed</p>
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList variant="underline" type="fixed">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill - Fixed</p>
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList variant="pill" type="fixed">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * Shape 비교 (pill vs rounded)
 *
 * shape prop으로 탭 아이템의 모서리 스타일을 제어합니다.
 * pill: 완전히 둥근 모서리 (rounded-full)
 * rounded: 약간 둥근 모서리 (rounded-md)
 */
export const ShapeComparison: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill variant + shape=pill (default)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill" shape="pill">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">보고서</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill variant + shape=rounded</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill" shape="rounded">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">보고서</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented variant + shape=rounded (default)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented" shape="rounded">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">보고서</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented variant + shape=pill</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented" shape="pill">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">보고서</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * Filled 아이콘
 *
 * 아이콘 튜플에 세 번째 인자로 true를 전달하면 filled 스타일이 적용됩니다.
 * 예: ['health', 'heart', true]
 */
export const WithFilledIcons: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">기본 아이콘 vs Filled 아이콘</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" leadIcon={['system', 'star']}>기본 별</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['system', 'star', true]}>채워진 별</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Filled 아이콘 탭들</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" leadIcon={['health', 'heart', true]}>즐겨찾기</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['business', 'bookmark', true]}>북마크</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['system', 'settings']}>설정</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline with Filled Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" leadIcon={['buildings', 'home', true]}>홈</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['user', 'user', true]}>프로필</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['system', 'settings', true]}>설정</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * Tail Icon
 *
 * tailIcon prop으로 탭 뒤에 아이콘을 추가할 수 있습니다.
 */
export const WithTailIcon: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented with Tail Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" tailIcon={['arrows', 'arrow-drop-down']}>개요</TabsTrigger>
            <TabsTrigger value="tab2" tailIcon={['system', 'external-link']}>외부 링크</TabsTrigger>
            <TabsTrigger value="tab3" tailIcon={['system', 'information']}>정보</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill with Lead + Tail Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" leadIcon={['user', 'user']} tailIcon={['arrows', 'arrow-drop-down']}>프로필</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['system', 'settings']} tailIcon={['arrows', 'arrow-drop-down']}>설정</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['media', 'notification']}>알림</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline with Tail Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" tailIcon={['system', 'external-link']}>문서</TabsTrigger>
            <TabsTrigger value="tab2" tailIcon={['system', 'external-link']}>API 레퍼런스</TabsTrigger>
            <TabsTrigger value="tab3">변경 이력</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * 스크롤 가능한 탭
 *
 * scrollable prop을 사용하면 탭이 넘칠 때 좌우 화살표 버튼이 나타납니다.
 */
export const Scrollable: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented - Scrollable (300px)</p>
        <div style={{ width: 300 }}>
          <Tabs defaultValue="tab1">
            <TabsList variant="segmented" scrollable>
              <TabsTrigger value="tab1">개요</TabsTrigger>
              <TabsTrigger value="tab2">분석</TabsTrigger>
              <TabsTrigger value="tab3">보고서</TabsTrigger>
              <TabsTrigger value="tab4">고객</TabsTrigger>
              <TabsTrigger value="tab5">상품</TabsTrigger>
              <TabsTrigger value="tab6">설정</TabsTrigger>
              <TabsTrigger value="tab7">결제</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill - Scrollable (300px)</p>
        <div style={{ width: 300 }}>
          <Tabs defaultValue="tab1">
            <TabsList variant="pill" scrollable>
              <TabsTrigger value="tab1">개요</TabsTrigger>
              <TabsTrigger value="tab2">분석</TabsTrigger>
              <TabsTrigger value="tab3">보고서</TabsTrigger>
              <TabsTrigger value="tab4">고객</TabsTrigger>
              <TabsTrigger value="tab5">상품</TabsTrigger>
              <TabsTrigger value="tab6">설정</TabsTrigger>
              <TabsTrigger value="tab7">결제</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - Scrollable (300px)</p>
        <div style={{ width: 300 }}>
          <Tabs defaultValue="tab1">
            <TabsList variant="underline" scrollable>
              <TabsTrigger value="tab1">개요</TabsTrigger>
              <TabsTrigger value="tab2">분석</TabsTrigger>
              <TabsTrigger value="tab3">보고서</TabsTrigger>
              <TabsTrigger value="tab4">고객</TabsTrigger>
              <TabsTrigger value="tab5">상품</TabsTrigger>
              <TabsTrigger value="tab6">설정</TabsTrigger>
              <TabsTrigger value="tab7">결제</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Scrollable with Icons + Badges (400px)</p>
        <div style={{ width: 400 }}>
          <Tabs defaultValue="tab1">
            <TabsList variant="segmented" scrollable>
              <TabsTrigger value="tab1" leadIcon={['buildings', 'home']}>홈</TabsTrigger>
              <TabsTrigger value="tab2" leadIcon={['user', 'user']} badge={3}>사용자</TabsTrigger>
              <TabsTrigger value="tab3" leadIcon={['business', 'mail']} badge={12}>메시지</TabsTrigger>
              <TabsTrigger value="tab4" leadIcon={['system', 'settings']}>설정</TabsTrigger>
              <TabsTrigger value="tab5" leadIcon={['media', 'notification']} badge="New">알림</TabsTrigger>
              <TabsTrigger value="tab6" leadIcon={['system', 'information']}>도움말</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  ),
};
