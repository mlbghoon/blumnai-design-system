import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiArrowDropDownLine, RiBookmarkFill, RiExternalLinkLine, RiHeartFill, RiHomeFill, RiInformationLine, RiMailLine, RiNotificationLine, RiSettingsFill, RiSettingsLine, RiStarFill, RiStarLine, RiUserFill, RiUserLine } from '../../icons/Icon';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Tabs';
import type { TabsTriggerProps, TabsType, TabsVariant, TabsShape, TabsSize } from '../Tabs.types';

interface TabsStoryProps {
  variant?: TabsVariant;
  shape?: TabsShape;
  size?: TabsSize;
  type?: TabsType;
  activeColor?: string;
  activeTextColor?: string;
  activeUnderlineColor?: string;
  scrollable?: boolean;
  animatedIndicator?: boolean;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  leadIcon?: TabsTriggerProps['leadIcon'];
  tailIcon?: TabsTriggerProps['tailIcon'];
  badge?: TabsTriggerProps['badge'];
  badgeColor?: TabsTriggerProps['badgeColor'];
  closable?: boolean;
  disabled?: boolean;
  animated?: boolean;
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
      description: '[Tabs] 기본 선택 탭 (비제어 모드)',
      table: {
        type: { summary: 'string' },
        category: 'Tabs',
      },
    },
    value: {
      control: 'text',
      description: '[Tabs] 선택된 탭 (제어 모드)',
      table: {
        type: { summary: 'string' },
        category: 'Tabs',
      },
    },
    onValueChange: {
      action: 'valueChange',
      description: '[Tabs] 탭 변경 콜백',
      table: {
        type: { summary: '(value: string) => void' },
        category: 'Tabs',
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '[Tabs] 탭 방향',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'horizontal'" },
        category: 'Tabs',
      },
    },
    activationMode: {
      control: 'select',
      options: ['automatic', 'manual'],
      description: '[Tabs] 키보드 활성화 모드',
      table: {
        type: { summary: "'automatic' | 'manual'" },
        defaultValue: { summary: "'automatic'" },
        category: 'Tabs',
      },
    },
    // TabsList props
    scrollable: {
      control: 'boolean',
      description: '[TabsList] 탭이 넘칠 때 스크롤 화살표 버튼 표시',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'TabsList',
      },
    },
    variant: {
      control: 'select',
      options: ['pill', 'segmented', 'underline'],
      description: '[TabsList] 탭 스타일 변형',
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
    activeTextColor: {
      control: 'color',
      description: '[TabsList] 활성 탭의 텍스트 색상 (activeColor보다 우선, underline 변형 전용)',
      table: {
        type: { summary: 'string' },
        category: 'TabsList',
      },
    },
    activeUnderlineColor: {
      control: 'color',
      description: '[TabsList] 활성 탭의 언더라인 색상 (activeColor보다 우선, underline 변형 전용)',
      table: {
        type: { summary: 'string' },
        category: 'TabsList',
      },
    },
    animatedIndicator: {
      control: 'boolean',
      description: '[TabsList] 활성 탭 인디케이터 슬라이딩 애니메이션 활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'TabsList',
      },
    },
    // TabsTrigger props
    leadIcon: {
      control: 'object',
      description: '[TabsTrigger] 앞에 표시되는 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'IconTypeWithFill | ReactNode',
          detail: `Remixicon component (권장, tree-shakeable):
  leadIcon={RiSettings3Line}
  leadIcon={RiStarFill}
  leadIcon={RiHeartFill}

또는 tuple form (deprecated, dev console warning):
  leadIcon={['system', 'settings']}
  leadIcon={['system', 'star', true]}

또는 ReactNode (이미 렌더된 JSX)`,
        },
        category: 'TabsTrigger',
      },
    },
    tailIcon: {
      control: 'object',
      description: '[TabsTrigger] 뒤에 표시되는 아이콘 (Remixicon `Ri*` component 권장, tuple form 은 deprecated)',
      table: {
        type: {
          summary: 'IconTypeWithFill | ReactNode',
          detail: `Remixicon component (권장, tree-shakeable):
  tailIcon={RiArrowRightLine}
  tailIcon={RiArrowDownLine}
  tailIcon={RiHeartFill}

또는 tuple form (deprecated, dev console warning):
  tailIcon={['arrows', 'arrow-right']}
  tailIcon={['health', 'heart', true]}

또는 ReactNode (이미 렌더된 JSX)`,
        },
        category: 'TabsTrigger',
      },
    },
    badge: {
      control: 'text',
      description: '[TabsTrigger] 배지 텍스트/숫자',
      table: {
        type: { summary: 'string | number' },
        category: 'TabsTrigger',
      },
    },
    badgeColor: {
      control: 'select',
      options: [
        undefined,
        'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald',
        'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple',
        'fuchsia', 'pink', 'rose', 'neutral', 'white',
      ],
      description: '[TabsTrigger] 배지 색상 (Badge 컴포넌트와 동일). 미지정 시 기본 muted 스타일.',
      table: {
        type: { summary: 'BadgeColor' },
        category: 'TabsTrigger',
      },
    },
    // TabsContent props
    animated: {
      control: 'boolean',
      description: '[TabsContent] 패널 전환 애니메이션 활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'TabsContent',
      },
    },
    closable: {
      control: 'boolean',
      description: '[TabsTrigger] 탭 닫기 버튼 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'TabsTrigger',
      },
    },
    disabled: {
      control: 'boolean',
      description: '[TabsTrigger] 비활성화 여부',
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
    activeTextColor: undefined,
    activeUnderlineColor: undefined,
    animatedIndicator: false,
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
    const activeTextColor = args.activeTextColor || undefined;
    const activeUnderlineColor = args.activeUnderlineColor || undefined;
    const animatedIndicator = args.animatedIndicator ?? false;
    const orientation = args.orientation ?? 'horizontal';
    const activationMode = args.activationMode ?? 'automatic';

    return (
      <Tabs
        defaultValue="tab1"
        orientation={orientation}
        activationMode={activationMode}
        className={orientation === 'vertical' ? 'flex ds-gap-16' : undefined}
      >
        <TabsList variant={variant} shape={shape} size={size} type={type} activeColor={activeColor} activeTextColor={activeTextColor} activeUnderlineColor={activeUnderlineColor} animatedIndicator={animatedIndicator}>
          <TabsTrigger value="tab1">계정</TabsTrigger>
          <TabsTrigger value="tab2">설정</TabsTrigger>
          <TabsTrigger value="tab3">알림</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="font-body size-sm text-default">
          계정 설정 및 환경설정입니다.
        </TabsContent>
        <TabsContent value="tab2" className="font-body size-sm text-default">
          일반 애플리케이션 설정입니다.
        </TabsContent>
        <TabsContent value="tab3" className="font-body size-sm text-default">
          알림 환경설정입니다.
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
        <p className="font-body size-sm text-muted margin-b-8">Pill 탭</p>
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
        <p className="font-body size-sm text-muted margin-b-8">Segmented 탭</p>
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
        <p className="font-body size-sm text-muted margin-b-8">Underline 탭</p>
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
        <TabsTrigger value="tab3">리포트</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="font-body size-sm text-default">
        개요 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab2" className="font-body size-sm text-default">
        분석 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab3" className="font-body size-sm text-default">
        리포트 콘텐츠가 여기에 표시됩니다.
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
        <TabsTrigger value="tab3">리포트</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="font-body size-sm text-default">
        개요 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab2" className="font-body size-sm text-default">
        분석 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab3" className="font-body size-sm text-default">
        리포트 콘텐츠가 여기에 표시됩니다.
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
        <TabsTrigger value="tab3">리포트</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="font-body size-sm text-default">
        개요 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab2" className="font-body size-sm text-default">
        분석 콘텐츠가 여기에 표시됩니다.
      </TabsContent>
      <TabsContent value="tab3" className="font-body size-sm text-default">
        리포트 콘텐츠가 여기에 표시됩니다.
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
        <p className="font-body size-sm text-muted margin-b-8">Underline - 소형 (40px)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" size="sm">
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - 대형 (48px)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" size="lg">
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * Underline 커스텀 색상
 *
 * activeColor로 텍스트와 언더라인을 동일 색상으로 설정하거나,
 * activeTextColor와 activeUnderlineColor로 개별 제어할 수 있습니다.
 */
export const UnderlineActiveColor: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">activeColor=&quot;#5988fe&quot; (텍스트+언더라인 동일)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" activeColor="#5988fe">
            <TabsTrigger value="tab1">고객 목록</TabsTrigger>
            <TabsTrigger value="tab2">상담 내역</TabsTrigger>
            <TabsTrigger value="tab3">통계</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">activeTextColor=&quot;#333&quot; activeUnderlineColor=&quot;#5988fe&quot; (개별 제어)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" activeTextColor="#333" activeUnderlineColor="#5988fe">
            <TabsTrigger value="tab1">고객 목록</TabsTrigger>
            <TabsTrigger value="tab2">상담 내역</TabsTrigger>
            <TabsTrigger value="tab3">통계</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">activeTextColor=&quot;#e11d48&quot; activeUnderlineColor=&quot;#facc15&quot;</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" activeTextColor="#e11d48" activeUnderlineColor="#facc15">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">리포트</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">기본 (색상 미지정)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">리포트</TabsTrigger>
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
        <p className="font-body size-sm text-muted margin-b-8">Segmented - 아이콘 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" leadIcon={RiUserLine}>프로필</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={RiSettingsLine}>설정</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={RiNotificationLine}>알림</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill - 아이콘 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" leadIcon={RiUserLine}>프로필</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={RiSettingsLine}>설정</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={RiNotificationLine}>알림</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - 아이콘 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" leadIcon={RiUserLine}>프로필</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={RiSettingsLine}>설정</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={RiNotificationLine}>알림</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * 스크롤 가능한 탭
 *
 * scrollable prop으로 탭이 넘칠 때 좌우 스크롤 화살표가 표시됩니다.
 */
export const ScrollableTabs: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Tabs defaultValue="tab1">
        <TabsList variant="underline" scrollable>
          <TabsTrigger value="tab1">대시보드</TabsTrigger>
          <TabsTrigger value="tab2">프로필</TabsTrigger>
          <TabsTrigger value="tab3">설정</TabsTrigger>
          <TabsTrigger value="tab4">알림</TabsTrigger>
          <TabsTrigger value="tab5">보안</TabsTrigger>
          <TabsTrigger value="tab6">결제</TabsTrigger>
          <TabsTrigger value="tab7">팀 관리</TabsTrigger>
          <TabsTrigger value="tab8">API 키</TabsTrigger>
          <TabsTrigger value="tab9">로그</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="font-body size-sm text-default">
          대시보드 콘텐츠입니다.
        </TabsContent>
        <TabsContent value="tab2" className="font-body size-sm text-default">
          프로필 콘텐츠입니다.
        </TabsContent>
        <TabsContent value="tab3" className="font-body size-sm text-default">
          설정 콘텐츠입니다.
        </TabsContent>
      </Tabs>
    </div>
  ),
};

/**
 * 닫기 가능한 탭
 *
 * closable prop으로 탭에 닫기 버튼을 추가합니다.
 */
export const ClosableTabs: Story = {
  render: function Render() {
    const [tabs, setTabs] = useState([
      { value: 'tab1', label: '문서 1' },
      { value: 'tab2', label: '문서 2' },
      { value: 'tab3', label: '문서 3' },
      { value: 'tab4', label: '문서 4' },
    ]);
    const [activeTab, setActiveTab] = useState('tab1');

    const handleClose = (value: string) => {
      setTabs((prev) => prev.filter((tab) => tab.value !== value));
      if (activeTab === value) {
        const remaining = tabs.filter((tab) => tab.value !== value);
        if (remaining.length > 0) {
          setActiveTab(remaining[0].value);
        }
      }
    };

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList variant="underline">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              closable
              onClose={handleClose}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="font-body size-sm text-default">
            {tab.label}의 콘텐츠입니다.
          </TabsContent>
        ))}
      </Tabs>
    );
  },
};

/**
 * 애니메이션 탭
 *
 * animatedIndicator로 인디케이터 슬라이딩, animated로 콘텐츠 페이드 애니메이션이 적용됩니다.
 */
export const AnimatedTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="segmented" animatedIndicator>
        <TabsTrigger value="tab1">첫 번째</TabsTrigger>
        <TabsTrigger value="tab2">두 번째</TabsTrigger>
        <TabsTrigger value="tab3">세 번째</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" animated className="font-body size-sm text-default">
        첫 번째 탭의 콘텐츠입니다. 전환 시 애니메이션이 적용됩니다.
      </TabsContent>
      <TabsContent value="tab2" animated className="font-body size-sm text-default">
        두 번째 탭의 콘텐츠입니다. 전환 시 애니메이션이 적용됩니다.
      </TabsContent>
      <TabsContent value="tab3" animated className="font-body size-sm text-default">
        세 번째 탭의 콘텐츠입니다. 전환 시 애니메이션이 적용됩니다.
      </TabsContent>
    </Tabs>
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
        <p className="font-body size-sm text-muted margin-b-8">Segmented - 배지 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" badge={3}>받은편지함</TabsTrigger>
            <TabsTrigger value="tab2" badge={12}>보낸편지함</TabsTrigger>
            <TabsTrigger value="tab3">임시보관함</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill - 배지 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" badge={3}>받은편지함</TabsTrigger>
            <TabsTrigger value="tab2" badge={12}>보낸편지함</TabsTrigger>
            <TabsTrigger value="tab3">임시보관함</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - 배지 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" badge={3}>받은편지함</TabsTrigger>
            <TabsTrigger value="tab2" badge={12}>보낸편지함</TabsTrigger>
            <TabsTrigger value="tab3">임시보관함</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">아이콘 + 배지</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" leadIcon={RiMailLine} badge={5}>메시지</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={RiNotificationLine} badge="신규">업데이트</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={RiSettingsLine}>설정</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * 배지 색상 (`badgeColor`)
 *
 * `badgeColor` prop으로 배지 색상을 지정할 수 있습니다. Badge 컴포넌트와 동일한
 * 색상 토큰 (`red`, `blue`, `green` 등)을 사용합니다.
 *
 * 미지정 시 기본 muted 스타일 (`bg-muted text-muted`) 적용 — 기존 동작과 동일.
 *
 * 사용 예: 알림 카운트는 빨강, 신규 항목은 파랑, 완료 상태는 초록 등.
 */
export const WithColoredBadges: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">상태별 색상 (Segmented)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" badge={3} badgeColor="red">긴급</TabsTrigger>
            <TabsTrigger value="tab2" badge={12} badgeColor="blue">신규</TabsTrigger>
            <TabsTrigger value="tab3" badge={5} badgeColor="green">완료</TabsTrigger>
            <TabsTrigger value="tab4" badge={2} badgeColor="amber">대기</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">상태별 색상 (Underline)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" badge={3} badgeColor="red">긴급</TabsTrigger>
            <TabsTrigger value="tab2" badge={12} badgeColor="blue">신규</TabsTrigger>
            <TabsTrigger value="tab3" badge={5} badgeColor="green">완료</TabsTrigger>
            <TabsTrigger value="tab4" badge={2} badgeColor="amber">대기</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">기본 vs 색상 지정 비교</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" badge={3}>기본 (muted)</TabsTrigger>
            <TabsTrigger value="tab2" badge={3} badgeColor="neutral">neutral</TabsTrigger>
            <TabsTrigger value="tab3" badge={3} badgeColor="red">red</TabsTrigger>
            <TabsTrigger value="tab4" badge={3} badgeColor="blue">blue</TabsTrigger>
            <TabsTrigger value="tab5" badge={3} badgeColor="green">green</TabsTrigger>
            <TabsTrigger value="tab6" badge={3} badgeColor="purple">purple</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">전체 색상 팔레트</p>
        <Tabs defaultValue="tab-red">
          <TabsList variant="segmented">
            {(['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'neutral', 'white'] as const).map((color) => (
              <TabsTrigger key={color} value={`tab-${color}`} badge={9} badgeColor={color}>{color}</TabsTrigger>
            ))}
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
        <p className="font-body size-sm text-muted margin-b-8">Segmented - 비활성화 탭 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1">활성</TabsTrigger>
            <TabsTrigger value="tab2" disabled>비활성화</TabsTrigger>
            <TabsTrigger value="tab3">사용가능</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill - 비활성화 탭 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1">활성</TabsTrigger>
            <TabsTrigger value="tab2" disabled>비활성화</TabsTrigger>
            <TabsTrigger value="tab3">사용가능</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - 비활성화 탭 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1">활성</TabsTrigger>
            <TabsTrigger value="tab2" disabled>비활성화</TabsTrigger>
            <TabsTrigger value="tab3">사용가능</TabsTrigger>
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
        <p className="font-body size-sm text-muted margin-b-8">Segmented 세로</p>
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
        <p className="font-body size-sm text-muted margin-b-8">Underline 세로</p>
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
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - Fixed</p>
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList variant="underline" type="fixed">
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill - Fixed</p>
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList variant="pill" type="fixed">
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
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
        <p className="font-body size-sm text-muted margin-b-8">Pill 변형 + shape=pill (기본값)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill" shape="pill">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">리포트</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill 변형 + shape=rounded</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill" shape="rounded">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">리포트</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented 변형 + shape=rounded (기본값)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented" shape="rounded">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">리포트</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented 변형 + shape=pill</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented" shape="pill">
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">분석</TabsTrigger>
            <TabsTrigger value="tab3">리포트</TabsTrigger>
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
            <TabsTrigger value="tab1" leadIcon={RiStarLine}>기본 별</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={RiStarFill}>Filled 별</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Filled 아이콘 탭들</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" leadIcon={RiHeartFill}>즐겨찾기</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={RiBookmarkFill}>북마크</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={RiSettingsLine}>설정</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - Filled 아이콘 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" leadIcon={RiHomeFill}>홈</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={RiUserFill}>프로필</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={RiSettingsFill}>설정</TabsTrigger>
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
        <p className="font-body size-sm text-muted margin-b-8">Segmented - Tail 아이콘 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" tailIcon={RiArrowDropDownLine}>개요</TabsTrigger>
            <TabsTrigger value="tab2" tailIcon={RiExternalLinkLine}>외부 링크</TabsTrigger>
            <TabsTrigger value="tab3" tailIcon={RiInformationLine}>정보</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill - Lead + Tail 아이콘 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" leadIcon={RiUserLine} tailIcon={RiArrowDropDownLine}>프로필</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={RiSettingsLine} tailIcon={RiArrowDropDownLine}>설정</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={RiNotificationLine}>알림</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - Tail 아이콘 포함</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" tailIcon={RiExternalLinkLine}>문서</TabsTrigger>
            <TabsTrigger value="tab2" tailIcon={RiExternalLinkLine}>API 레퍼런스</TabsTrigger>
            <TabsTrigger value="tab3">변경 이력</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * 인디케이터 슬라이딩 애니메이션
 *
 * animatedIndicator prop으로 탭 전환 시 인디케이터가 부드럽게 이동합니다.
 * 모든 변형(Segmented, Pill, Underline)에서 사용할 수 있습니다.
 */
export const AnimatedIndicator: Story = {
  render: () => (
    <div className="flex flex-col ds-gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented - 슬라이딩 인디케이터</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented" animatedIndicator>
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">상품</TabsTrigger>
            <TabsTrigger value="tab3">주문</TabsTrigger>
            <TabsTrigger value="tab4">구독</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill - 슬라이딩 인디케이터</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill" animatedIndicator>
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">상품</TabsTrigger>
            <TabsTrigger value="tab3">주문</TabsTrigger>
            <TabsTrigger value="tab4">구독</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline - 슬라이딩 인디케이터</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" animatedIndicator>
            <TabsTrigger value="tab1">개요</TabsTrigger>
            <TabsTrigger value="tab2">상품</TabsTrigger>
            <TabsTrigger value="tab3">주문</TabsTrigger>
            <TabsTrigger value="tab4">구독</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline + activeColor - 슬라이딩 인디케이터</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" animatedIndicator activeColor="#5988fe">
            <TabsTrigger value="tab1">고객 목록</TabsTrigger>
            <TabsTrigger value="tab2">상담 내역</TabsTrigger>
            <TabsTrigger value="tab3">통계</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};
