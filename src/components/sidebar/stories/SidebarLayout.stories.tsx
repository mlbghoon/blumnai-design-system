import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarMenuItem,
  SidebarUserbar,
  SidebarRail,
  SidebarSeparator,
} from '../Sidebar';
import { Icon } from '../../icons/Icon';

type SidebarStoryProps = {
  open: boolean;
  side: 'left' | 'right';
  variant: 'sidebar' | 'floating' | 'inset';
  collapsible: 'offcanvas' | 'icon' | 'none';
  showRail: boolean;
  showToggleButton: boolean;
  toggleButtonPosition: 'top' | 'center' | 'bottom';
  toggleButtonOffset?: string;
};

const meta: Meta<SidebarStoryProps> = {
  title: 'Navigation/Sidebar/Layout',
  component: SidebarProvider,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'true로 설정하면 사이드바가 펼쳐진 상태로 표시됩니다. false로 설정하면 축소된 상태로 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    side: {
      control: 'select',
      options: ['left', 'right'],
      description: '사이드바가 화면의 어느 쪽에 위치할지 설정합니다. left(왼쪽) 또는 right(오른쪽) 중 선택합니다',
      table: {
        type: { summary: 'Side', detail: '"left" | "right"' },
        defaultValue: { summary: 'left' },
      },
    },
    variant: {
      control: 'select',
      options: ['sidebar', 'floating', 'inset'],
      description: '사이드바의 시각적 스타일을 설정합니다. sidebar(기본 고정형), floating(떠있는 형태), inset(내부 삽입형) 중 선택합니다',
      table: {
        type: { summary: 'Variant', detail: '"sidebar" | "floating" | "inset"' },
        defaultValue: { summary: 'sidebar' },
      },
    },
    collapsible: {
      control: 'select',
      options: ['offcanvas', 'icon', 'none'],
      description: '사이드바 축소 방식을 설정합니다. offcanvas(화면 밖으로 슬라이드), icon(아이콘만 표시), none(축소 불가) 중 선택합니다',
      table: {
        type: { summary: 'Collapsible', detail: '"offcanvas" | "icon" | "none"' },
        defaultValue: { summary: 'offcanvas' },
      },
    },
    showRail: {
      control: 'boolean',
      description: 'true로 설정하면 사이드바 가장자리에 보이지 않는 터치 영역(레일)이 추가됩니다. 호버 시 선이 표시되고 클릭하면 사이드바가 토글됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showToggleButton: {
      control: 'boolean',
      description: 'true로 설정하면 사이드바 가장자리에 원형 토글 버튼이 표시됩니다. 호버 시 나타나며 클릭하면 사이드바가 토글됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    toggleButtonPosition: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
      description: '토글 버튼의 세로 위치를 프리셋으로 설정합니다. top(상단), center(중앙), bottom(하단) 중 선택합니다',
      table: {
        type: { summary: 'ToggleButtonPosition', detail: '"top" | "center" | "bottom"' },
        defaultValue: { summary: 'center' },
      },
    },
    toggleButtonOffset: {
      control: 'text',
      description: '토글 버튼의 세로 위치를 커스텀 값으로 직접 지정합니다. 숫자(px), 퍼센트("50%"), rem("10rem") 등의 값을 사용할 수 있습니다',
      table: {
        type: { summary: 'number | string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SidebarStoryProps>;

const menuItems = [
  { icon: ['buildings', 'home'] as const, label: '대시보드', isActive: true },
  { icon: ['business', 'bar-chart'] as const, label: '분석' },
  { icon: ['user', 'group'] as const, label: '사용자' },
  { icon: ['system', 'settings'] as const, label: '설정' },
];

/**
 * 기본 사이드바
 *
 * 사이드바 컴포넌트입니다. 모든 props를 테스트할 수 있습니다.
 *
 * ## 토글 방법
 * - **showToggleButton**: 사이드바 가장자리의 원형 버튼
 * - **showRail**: 사이드바 가장자리의 보이지 않는 터치 영역 (호버 시 선 표시)
 * - **SidebarTrigger**: 메인 콘텐츠 영역에 배치하는 버튼
 * - **키보드 단축키**: Cmd+B (Mac) / Ctrl+B (Windows)
 */
export const Default: Story = {
  args: {
    open: true,
    side: 'left',
    variant: 'sidebar',
    collapsible: 'icon',
    showRail: false,
    showToggleButton: true,
    toggleButtonPosition: 'center',
    toggleButtonOffset: undefined,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);

    useEffect(() => {
      setOpen(args.open);
    }, [args.open]);

    const offset = args.toggleButtonOffset
      ? (isNaN(Number(args.toggleButtonOffset)) ? args.toggleButtonOffset : Number(args.toggleButtonOffset))
      : undefined;

    const sidebarContent = (
      <Sidebar
        side={args.side}
        variant={args.variant}
        collapsible={args.collapsible}
        showRail={args.showRail}
        showToggleButton={args.showToggleButton}
        toggleButtonPosition={args.toggleButtonPosition}
        toggleButtonOffset={offset}
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem
                    key={item.label}
                    variant="default"
                    icon={item.icon}
                    label={item.label}
                    isActive={item.isActive}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );

    const insetContent = (
      <SidebarInset>
        <header className="flex items-center ds-gap-8 padding-16 border-b-default">
          <SidebarTrigger />
          <span className="font-body size-sm font-medium">사이드바 데모</span>
        </header>
        <main className="flex-1 padding-16">
          <p className="font-body size-sm text-muted">
            Cmd+B (또는 Ctrl+B)로 사이드바를 토글할 수 있습니다.
          </p>
        </main>
      </SidebarInset>
    );

    return (
      <SidebarProvider
        open={open}
        onOpenChange={setOpen}
        style={{ '--sidebar-width': '280px' } as React.CSSProperties}
      >
        {args.side === 'right' ? (
          <>
            {insetContent}
            {sidebarContent}
          </>
        ) : (
          <>
            {sidebarContent}
            {insetContent}
          </>
        )}
      </SidebarProvider>
    );
  },
};

/**
 * SidebarHeader
 *
 * 사이드바 상단에 위치하는 헤더 영역입니다. 보통 유저바나 로고를 배치합니다.
 */
export const Header: Story = {
  render: function Render() {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] border-default rounded-md">
          <SidebarHeader>
            <SidebarUserbar
              variant="variant3"
              name="John Doe"
              avatarInitials="JD"
            />
          </SidebarHeader>
          <SidebarSeparator />
          <div className="padding-16">
            <p className="font-body size-xs text-muted">
              SidebarHeader는 사이드바 상단에 위치합니다.
            </p>
          </div>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * SidebarContent
 *
 * 사이드바의 메인 콘텐츠 영역입니다. 스크롤이 가능합니다.
 */
export const Content: Story = {
  render: function Render() {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] h-[400px] border-default rounded-md flex flex-col">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>메뉴</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[...menuItems, ...menuItems, ...menuItems].map((item, i) => (
                    <SidebarMenuItem
                      key={`${item.label}-${i}`}
                      variant="default"
                      icon={item.icon}
                      label={`${item.label} ${i + 1}`}
                      isActive={i === 0}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * SidebarFooter
 *
 * 사이드바 하단에 위치하는 푸터 영역입니다. 로그아웃 버튼 등을 배치합니다.
 */
export const Footer: Story = {
  render: function Render() {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] border-default rounded-md">
          <div className="padding-16">
            <p className="font-body size-xs text-muted">
              메인 콘텐츠 영역...
            </p>
          </div>
          <SidebarSeparator />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem
                variant="default"
                icon={['system', 'logout-box']}
                label="로그아웃"
              />
            </SidebarMenu>
          </SidebarFooter>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * SidebarInset
 *
 * 사이드바 옆에 위치하는 메인 콘텐츠 영역입니다.
 */
export const Inset: Story = {
  render: function Render() {
    return (
      <SidebarProvider
        defaultOpen={true}
        style={{ '--sidebar-width': '280px' } as React.CSSProperties}
      >
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem
                      key={item.label}
                      variant="default"
                      icon={item.icon}
                      label={item.label}
                      isActive={item.isActive}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center ds-gap-8 padding-16 border-b-default">
            <SidebarTrigger />
            <span className="font-body size-sm font-medium">SidebarInset 데모</span>
          </header>
          <main className="flex-1 padding-16">
            <div className="border-default border-dashed rounded-md padding-24 text-center">
              <p className="font-body size-sm text-muted">
                SidebarInset은 사이드바 옆의 메인 콘텐츠 영역입니다.
              </p>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  },
};

/**
 * SidebarTrigger
 *
 * 사이드바를 토글하는 버튼입니다.
 */
export const Trigger: Story = {
  render: function Render() {
    return (
      <SidebarProvider
        defaultOpen={true}
        style={{ '--sidebar-width': '280px' } as React.CSSProperties}
      >
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem
                      key={item.label}
                      variant="default"
                      icon={item.icon}
                      label={item.label}
                      isActive={item.isActive}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center ds-gap-8 padding-16 border-b-default">
            <SidebarTrigger />
            <span className="font-body size-sm font-medium">트리거를 클릭하세요!</span>
          </header>
          <main className="flex-1 padding-16">
            <p className="font-body size-sm text-muted">
              SidebarTrigger로 사이드바를 토글합니다. Cmd+B 키보드 단축키도 지원합니다.
            </p>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  },
};

/**
 * SidebarRail
 *
 * 사이드바 가장자리에 있는 드래그 가능한 레일입니다.
 */
export const Rail: Story = {
  render: function Render() {
    return (
      <SidebarProvider
        defaultOpen={true}
        style={{ '--sidebar-width': '280px' } as React.CSSProperties}
      >
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem
                      key={item.label}
                      variant="default"
                      icon={item.icon}
                      label={item.label}
                      isActive={item.isActive}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center ds-gap-8 padding-16 border-b-default">
            <SidebarTrigger />
            <span className="font-body size-sm font-medium">가장자리에 호버하세요!</span>
          </header>
          <main className="flex-1 padding-16">
            <p className="font-body size-sm text-muted">
              SidebarRail은 사이드바 가장자리에 클릭/호버 가능한 영역을 추가합니다.
              사이드바 오른쪽 가장자리에 마우스를 올려보세요.
            </p>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  },
};

/**
 * ToggleButton
 *
 * 사이드바 가장자리에 표시되는 토글 버튼입니다.
 */
export const ToggleButton: Story = {
  render: function Render() {
    return (
      <SidebarProvider
        defaultOpen={true}
        style={{ '--sidebar-width': '280px' } as React.CSSProperties}
      >
        <Sidebar collapsible="icon" showToggleButton={true} toggleButtonPosition="center">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem
                      key={item.label}
                      variant="default"
                      icon={item.icon}
                      label={item.label}
                      isActive={item.isActive}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center ds-gap-8 padding-16 border-b-default">
            <SidebarTrigger />
            <span className="font-body size-sm font-medium">토글 버튼 데모</span>
          </header>
          <main className="flex-1 padding-16">
            <p className="font-body size-sm text-muted">
              showToggleButton으로 사이드바 가장자리에 토글 버튼을 추가합니다.
              toggleButtonPosition은 "top", "center", "bottom" 중 선택할 수 있습니다.
              toggleButtonOffset으로 커스텀 위치를 지정할 수 있습니다.
            </p>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  },
};

/**
 * ToggleButton 커스텀 아이콘
 *
 * toggleButtonIcon prop으로 커스텀 아이콘을 사용할 수 있습니다.
 */
export const ToggleButtonCustomIcon: Story = {
  render: function Render() {
    return (
      <SidebarProvider
        defaultOpen={true}
        style={{ '--sidebar-width': '280px' } as React.CSSProperties}
      >
        <Sidebar
          collapsible="icon"
          showToggleButton={true}
          toggleButtonPosition="center"
          toggleButtonIcon={
            <div className="width-24 height-24 rounded-full bg-state-primary flex items-center justify-center">
              <Icon iconType={['arrows', 'arrow-left-right']} size={14} color="white" />
            </div>
          }
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem
                      key={item.label}
                      variant="default"
                      icon={item.icon}
                      label={item.label}
                      isActive={item.isActive}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center ds-gap-8 padding-16 border-b-default">
            <SidebarTrigger />
            <span className="font-body size-sm font-medium">커스텀 토글 아이콘</span>
          </header>
          <main className="flex-1 padding-16">
            <p className="font-body size-sm text-muted">
              toggleButtonIcon prop으로 토글 버튼에 커스텀 React 노드를 제공할 수 있습니다.
            </p>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  },
};
