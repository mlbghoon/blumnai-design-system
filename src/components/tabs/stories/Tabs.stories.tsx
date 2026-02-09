import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Tabs';
import type { TabsTriggerProps, TabsType, TabsVariant, TabsShape, TabsSize } from '../Tabs.types';

interface TabsStoryProps {
  variant?: TabsVariant;
  shape?: TabsShape;
  size?: TabsSize;
  type?: TabsType;
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
      description: '[TabsTrigger] 배지 텍스트/숫자',
      table: {
        type: { summary: 'string | number' },
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
    const orientation = args.orientation ?? 'horizontal';
    const activationMode = args.activationMode ?? 'automatic';

    return (
      <Tabs
        defaultValue="tab1"
        orientation={orientation}
        activationMode={activationMode}
        className={orientation === 'vertical' ? 'flex gap-16' : undefined}
      >
        <TabsList variant={variant} shape={shape} size={size} type={type}>
          <TabsTrigger value="tab1">Account</TabsTrigger>
          <TabsTrigger value="tab2">Settings</TabsTrigger>
          <TabsTrigger value="tab3">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="font-body size-sm text-default">
          Account settings and preferences.
        </TabsContent>
        <TabsContent value="tab2" className="font-body size-sm text-default">
          General application settings.
        </TabsContent>
        <TabsContent value="tab3" className="font-body size-sm text-default">
          Notification preferences.
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
    <div className="flex flex-col gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill tabs</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Products</TabsTrigger>
            <TabsTrigger value="tab3">Orders</TabsTrigger>
            <TabsTrigger value="tab4">Subscriptions</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented tabs</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Products</TabsTrigger>
            <TabsTrigger value="tab3">Orders</TabsTrigger>
            <TabsTrigger value="tab4">Subscriptions</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline tabs</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Products</TabsTrigger>
            <TabsTrigger value="tab3">Orders</TabsTrigger>
            <TabsTrigger value="tab4">Subscriptions</TabsTrigger>
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
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="font-body size-sm text-default">
        Overview content goes here.
      </TabsContent>
      <TabsContent value="tab2" className="font-body size-sm text-default">
        Analytics content goes here.
      </TabsContent>
      <TabsContent value="tab3" className="font-body size-sm text-default">
        Reports content goes here.
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
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="font-body size-sm text-default">
        Overview content goes here.
      </TabsContent>
      <TabsContent value="tab2" className="font-body size-sm text-default">
        Analytics content goes here.
      </TabsContent>
      <TabsContent value="tab3" className="font-body size-sm text-default">
        Reports content goes here.
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
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="font-body size-sm text-default">
        Overview content goes here.
      </TabsContent>
      <TabsContent value="tab2" className="font-body size-sm text-default">
        Analytics content goes here.
      </TabsContent>
      <TabsContent value="tab3" className="font-body size-sm text-default">
        Reports content goes here.
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
    <div className="flex flex-col gap-24">
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
 * 아이콘 포함 탭
 *
 * leadIcon prop으로 탭에 아이콘을 추가할 수 있습니다.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented with Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" leadIcon={['user', 'user']}>Profile</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['system', 'settings']}>Settings</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['media', 'notification']}>Alerts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill with Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" leadIcon={['user', 'user']}>Profile</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['system', 'settings']}>Settings</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['media', 'notification']}>Alerts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline with Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" leadIcon={['user', 'user']}>Profile</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['system', 'settings']}>Settings</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['media', 'notification']}>Alerts</TabsTrigger>
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
    <div className="flex flex-col gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented with Badges</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" badge={3}>Inbox</TabsTrigger>
            <TabsTrigger value="tab2" badge={12}>Sent</TabsTrigger>
            <TabsTrigger value="tab3">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill with Badges</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" badge={3}>Inbox</TabsTrigger>
            <TabsTrigger value="tab2" badge={12}>Sent</TabsTrigger>
            <TabsTrigger value="tab3">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline with Badges</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" badge={3}>Inbox</TabsTrigger>
            <TabsTrigger value="tab2" badge={12}>Sent</TabsTrigger>
            <TabsTrigger value="tab3">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Icons + Badges</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" leadIcon={['business', 'mail']} badge={5}>Messages</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['media', 'notification']} badge="New">Updates</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['system', 'settings']}>Settings</TabsTrigger>
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
    <div className="flex flex-col gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented with Disabled Tab</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1">Active</TabsTrigger>
            <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
            <TabsTrigger value="tab3">Available</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill with Disabled Tab</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1">Active</TabsTrigger>
            <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
            <TabsTrigger value="tab3">Available</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline with Disabled Tab</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1">Active</TabsTrigger>
            <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
            <TabsTrigger value="tab3">Available</TabsTrigger>
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
    <div className="flex flex-col gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented Vertical</p>
        <Tabs defaultValue="tab1" orientation="vertical" className="flex gap-16">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1">General</TabsTrigger>
            <TabsTrigger value="tab2">Security</TabsTrigger>
            <TabsTrigger value="tab3">Privacy</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="flex-1 font-body size-sm text-default">
            General settings panel.
          </TabsContent>
          <TabsContent value="tab2" className="flex-1 font-body size-sm text-default">
            Security settings panel.
          </TabsContent>
          <TabsContent value="tab3" className="flex-1 font-body size-sm text-default">
            Privacy settings panel.
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline Vertical</p>
        <Tabs defaultValue="tab1" orientation="vertical" className="flex gap-16">
          <TabsList variant="underline">
            <TabsTrigger value="tab1">General</TabsTrigger>
            <TabsTrigger value="tab2">Security</TabsTrigger>
            <TabsTrigger value="tab3">Privacy</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="flex-1 font-body size-sm text-default">
            General settings panel.
          </TabsContent>
          <TabsContent value="tab2" className="flex-1 font-body size-sm text-default">
            Security settings panel.
          </TabsContent>
          <TabsContent value="tab3" className="flex-1 font-body size-sm text-default">
            Privacy settings panel.
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
      <div className="flex flex-col gap-16">
        <p className="font-body size-sm text-muted">
          현재 탭: <span className="font-semibold text-default">{activeTab}</span>
        </p>
        <div className="flex gap-8">
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
            <TabsTrigger value="tab1">First</TabsTrigger>
            <TabsTrigger value="tab2">Second</TabsTrigger>
            <TabsTrigger value="tab3">Third</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="font-body size-sm text-default">
            First tab content.
          </TabsContent>
          <TabsContent value="tab2" className="font-body size-sm text-default">
            Second tab content.
          </TabsContent>
          <TabsContent value="tab3" className="font-body size-sm text-default">
            Third tab content.
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
    <div className="flex flex-col gap-24 w-full">
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
    <div className="flex flex-col gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill variant + shape=pill (default)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill" shape="pill">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill variant + shape=rounded</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill" shape="rounded">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented variant + shape=rounded (default)</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented" shape="rounded">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented variant + shape=pill</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented" shape="pill">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
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
    <div className="flex flex-col gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">기본 아이콘 vs Filled 아이콘</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" leadIcon={['system', 'star']}>Default Star</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['system', 'star', true]}>Filled Star</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Filled 아이콘 탭들</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" leadIcon={['health', 'heart', true]}>Favorites</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['business', 'bookmark', true]}>Bookmarks</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['system', 'settings']}>Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline with Filled Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" leadIcon={['buildings', 'home', true]}>Home</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['user', 'user', true]}>Profile</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['system', 'settings', true]}>Settings</TabsTrigger>
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
    <div className="flex flex-col gap-24">
      <div>
        <p className="font-body size-sm text-muted margin-b-8">Segmented with Tail Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="segmented">
            <TabsTrigger value="tab1" tailIcon={['arrows', 'arrow-drop-down']}>Overview</TabsTrigger>
            <TabsTrigger value="tab2" tailIcon={['system', 'external-link']}>External</TabsTrigger>
            <TabsTrigger value="tab3" tailIcon={['system', 'information']}>Info</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Pill with Lead + Tail Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" leadIcon={['user', 'user']} tailIcon={['arrows', 'arrow-drop-down']}>Profile</TabsTrigger>
            <TabsTrigger value="tab2" leadIcon={['system', 'settings']} tailIcon={['arrows', 'arrow-drop-down']}>Settings</TabsTrigger>
            <TabsTrigger value="tab3" leadIcon={['media', 'notification']}>Alerts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <p className="font-body size-sm text-muted margin-b-8">Underline with Tail Icons</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" tailIcon={['system', 'external-link']}>Documentation</TabsTrigger>
            <TabsTrigger value="tab2" tailIcon={['system', 'external-link']}>API Reference</TabsTrigger>
            <TabsTrigger value="tab3">Changelog</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};
