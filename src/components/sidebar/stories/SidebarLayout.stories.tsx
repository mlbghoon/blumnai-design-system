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
import { Icon, RiArrowLeftRightLine, RiLogoutBoxLine } from '../../icons/Icon';

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
      description: '열림 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    side: {
      control: 'select',
      options: ['left', 'right'],
      description: '사이드바 위치',
      table: {
        type: { summary: 'Side', detail: '"left" | "right"' },
        defaultValue: { summary: 'left' },
      },
    },
    variant: {
      control: 'select',
      options: ['sidebar', 'floating', 'inset'],
      description: '사이드바 스타일 변형',
      table: {
        type: { summary: 'Variant', detail: '"sidebar" | "floating" | "inset"' },
        defaultValue: { summary: 'sidebar' },
      },
    },
    collapsible: {
      control: 'select',
      options: ['offcanvas', 'icon', 'none'],
      description: '축소 모드',
      table: {
        type: { summary: 'Collapsible', detail: '"offcanvas" | "icon" | "none"' },
        defaultValue: { summary: 'offcanvas' },
      },
    },
    showRail: {
      control: 'boolean',
      description: '레일 토글 표시 (가장자리 터치 영역)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showToggleButton: {
      control: 'boolean',
      description: '토글 버튼 표시 (가장자리 원형 버튼)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    toggleButtonPosition: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
      description: '토글 버튼 위치 (프리셋)',
      table: {
        type: { summary: 'ToggleButtonPosition', detail: '"top" | "center" | "bottom"' },
        defaultValue: { summary: 'center' },
      },
    },
    toggleButtonOffset: {
      control: 'text',
      description: '토글 버튼 커스텀 위치 (예: 100, "50%", "10rem")',
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
  { icon: ['business', 'bar-chart'] as const, label: 'Analytics' },
  { icon: ['user', 'group'] as const, label: 'Users' },
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
          <span className="font-body size-sm font-medium">Sidebar Demo</span>
        </header>
        <main className="flex-1 padding-16">
          <p className="font-body size-sm text-muted">
            Use Cmd+B (or Ctrl+B) to toggle the sidebar.
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
              SidebarHeader sits at the top of the sidebar.
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
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
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
              Main content area...
            </p>
          </div>
          <SidebarSeparator />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem
                variant="default"
                icon={RiLogoutBoxLine}
                label="Log out"
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
            <span className="font-body size-sm font-medium">SidebarInset Demo</span>
          </header>
          <main className="flex-1 padding-16">
            <div className="border-default border-dashed rounded-md padding-24 text-center">
              <p className="font-body size-sm text-muted">
                SidebarInset is the main content area next to the sidebar.
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
            <span className="font-body size-sm font-medium">Click the trigger!</span>
          </header>
          <main className="flex-1 padding-16">
            <p className="font-body size-sm text-muted">
              SidebarTrigger toggles the sidebar. Also supports Cmd+B keyboard shortcut.
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
            <span className="font-body size-sm font-medium">Hover the edge!</span>
          </header>
          <main className="flex-1 padding-16">
            <p className="font-body size-sm text-muted">
              SidebarRail adds a clickable/hoverable edge to toggle the sidebar.
              Hover over the right edge of the sidebar to see it.
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
            <span className="font-body size-sm font-medium">Toggle Button Demo</span>
          </header>
          <main className="flex-1 padding-16">
            <p className="font-body size-sm text-muted">
              showToggleButton adds a visible toggle button at the sidebar edge.
              toggleButtonPosition can be "top", "center", or "bottom".
              toggleButtonOffset can be used for custom pixel positioning.
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
              <Icon icon={RiArrowLeftRightLine} size={14} color="white" />
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
            <span className="font-body size-sm font-medium">Custom Toggle Icon</span>
          </header>
          <main className="flex-1 padding-16">
            <p className="font-body size-sm text-muted">
              Use toggleButtonIcon prop to provide a custom React node for the toggle button.
            </p>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  },
};
