import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  SidebarMenu,
  SidebarProvider,
  SidebarMenuItem,
} from '../Sidebar';
import { Icon, RiDeleteBinLine, RiEditLine } from '../../icons/Icon';

type SidebarMenuItemStoryProps = {
  label: string;
  icon: [string, string] | null;
  isActive: boolean;
  disabled: boolean;
  badgeLabel: string;
  badgeColor: 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'neutral';
  badgeShape: 'rounded' | 'pill';
  badgeBorder: boolean;
  shortcut: string;
};

const meta: Meta<SidebarMenuItemStoryProps> = {
  title: 'Navigation/Sidebar/MenuItem',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '메뉴 아이템에 표시되는 라벨 텍스트입니다. 메뉴 항목의 이름이나 제목을 입력합니다',
      table: { type: { summary: 'string' } },
    },
    icon: {
      control: 'object',
      description: '메뉴 아이템 앞에 표시되는 아이콘입니다. [카테고리, 아이콘명] 튜플 형식으로 전달하며, null로 설정하면 아이콘이 표시되지 않습니다',
      table: { type: { summary: 'IconType | null' } },
    },
    isActive: {
      control: 'boolean',
      description: 'true로 설정하면 현재 선택된 메뉴 아이템으로 강조 표시됩니다. 현재 페이지나 활성 항목을 표시할 때 사용합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 메뉴 아이템이 비활성화되어 클릭할 수 없으며, 흐릿하게 표시됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    badgeLabel: {
      control: 'text',
      description: '메뉴 아이템 오른쪽에 표시되는 배지 텍스트입니다. 비어있으면 배지가 숨겨집니다',
      table: { type: { summary: 'string' } },
    },
    badgeColor: {
      control: 'select',
      options: ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'neutral'],
      description: '배지의 색상을 설정합니다. 18가지 색상 중 선택할 수 있으며, 기본값은 neutral(회색)입니다',
      table: {
        type: { summary: 'BadgeColor' },
        defaultValue: { summary: 'neutral' },
      },
    },
    badgeShape: {
      control: 'select',
      options: ['rounded', 'pill'],
      description: '배지의 모양을 설정합니다. rounded(둥근 사각형) 또는 pill(타원형) 중 선택합니다',
      table: {
        type: { summary: 'BadgeShape' },
        defaultValue: { summary: 'rounded' },
      },
    },
    badgeBorder: {
      control: 'boolean',
      description: 'true로 설정하면 배지에 테두리가 추가됩니다. 배경색과 구분이 필요할 때 사용합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    shortcut: {
      control: 'text',
      description: '메뉴 아이템 오른쪽에 표시되는 키보드 단축키 텍스트입니다. 전역 keydown 리스너도 자동으로 바인딩됩니다',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<SidebarMenuItemStoryProps>;

// Helper to validate icon
const isValidIcon = (icon: unknown): icon is [string, string] => {
  return Array.isArray(icon) &&
    icon.length >= 2 &&
    typeof icon[0] === 'string' &&
    typeof icon[1] === 'string' &&
    icon[0].length > 0 &&
    icon[1].length > 0;
};

/**
 * 기본 메뉴 아이템
 *
 * ## 사용법
 *
 * ```tsx
 * // Default - 아이콘 + 라벨
 * <SidebarMenuItem variant="default" icon={['buildings', 'home']} label="Dashboard" />
 *
 * // With badge
 * <SidebarMenuItem variant="default" icon={['system', 'star']} label="Favorites" badge="5" />
 * <SidebarMenuItem variant="default" label="New" badge={{ label: "New", color: "blue", shape: "pill" }} />
 *
 * // With shortcut
 * <SidebarMenuItem variant="default" icon={['system', 'search']} label="Search" shortcut="⌘K" />
 *
 * // Label - 섹션 헤더
 * <SidebarMenuItem variant="label" label="Settings" />
 *
 * // Caption - 설명 포함
 * <SidebarMenuItem variant="caption" label="Documentation" caption="Learn how to use" />
 *
 * // Avatar - 아바타 포함
 * <SidebarMenuItem variant="avatar" avatarInitials="JD" label="John Doe" />
 *
 * // Children - 하위 메뉴
 * <SidebarMenuItem variant="children" label="Sub Item" />
 *
 * // Divider - 구분선
 * <SidebarMenuItem variant="divider" />
 * ```
 */
export const Default: Story = {
  args: {
    label: '메뉴 항목',
    icon: ['buildings', 'home'],
    isActive: false,
    disabled: false,
    badgeLabel: '',
    badgeColor: 'neutral',
    badgeShape: 'rounded',
    badgeBorder: false,
    shortcut: '',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const shortcut = args.shortcut || undefined;
    const icon = isValidIcon(args.icon) ? args.icon : undefined;

    // Build badge prop - either undefined or full BadgeProps object
    const badge = args.badgeLabel
      ? {
        label: args.badgeLabel,
        color: args.badgeColor,
        shape: args.badgeShape,
        border: args.badgeBorder,
      }
      : undefined;

    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] border-default rounded-md padding-8">
          <SidebarMenu>
            <SidebarMenuItem
              variant="default"
              label={args.label}
              icon={icon}
              isActive={args.isActive}
              disabled={args.disabled}
              badge={badge}
              shortcut={shortcut}
            />
          </SidebarMenu>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * 모든 변형
 *
 * SidebarMenuItem의 다양한 변형을 보여줍니다.
 */
export const AllVariants: Story = {
  render: function Render() {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] border-default rounded-md padding-8 flex flex-col ds-gap-8">
          <div>
            <p className="font-body size-xs text-muted padding-x-8 padding-y-4">Default</p>
            <SidebarMenu>
              <SidebarMenuItem
                variant="default"
                icon={['buildings', 'home']}
                label="기본 항목"
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'star']}
                label="배지 포함"
                badge="5"
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'search']}
                label="단축키 포함"
                shortcut="⌘K"
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'check']}
                label="활성 항목"
                isActive={true}
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'close']}
                label="비활성 항목"
                disabled={true}
              />
            </SidebarMenu>
          </div>

          <SidebarMenuItem variant="divider" />

          <div>
            <p className="font-body size-xs text-muted padding-x-8 padding-y-4">Label</p>
            <SidebarMenu>
              <SidebarMenuItem variant="label" label="섹션 헤더" />
              <SidebarMenuItem
                variant="default"
                icon={['document', 'file']}
                label="라벨 하위 항목"
              />
            </SidebarMenu>
          </div>

          <SidebarMenuItem variant="divider" />

          <div>
            <p className="font-body size-xs text-muted padding-x-8 padding-y-4">Avatar</p>
            <SidebarMenu>
              <SidebarMenuItem
                variant="avatar"
                avatarInitials="AB"
                label="김영희"
              />
              <SidebarMenuItem
                variant="avatar"
                avatarInitials="CD"
                label="이철수"
                badge="2"
              />
              <SidebarMenuItem
                variant="avatar"
                avatarInitials="EF"
                label="박지수"
                isActive={true}
              />
            </SidebarMenu>
          </div>

          <SidebarMenuItem variant="divider" />

          <div>
            <p className="font-body size-xs text-muted padding-x-8 padding-y-4">Caption</p>
            <SidebarMenu>
              <SidebarMenuItem
                variant="caption"
                label="문서"
                caption="앱 사용법 알아보기"
              />
              <SidebarMenuItem
                variant="caption"
                label="지원"
                caption="팀에게 도움 받기"
              />
            </SidebarMenu>
          </div>

          <SidebarMenuItem variant="divider" />

          <div>
            <p className="font-body size-xs text-muted padding-x-8 padding-y-4">Children</p>
            <SidebarMenu>
              <SidebarMenuItem
                variant="default"
                icon={['document', 'folder']}
                label="상위 항목"
              />
              <SidebarMenuItem
                variant="children"
                label="하위 항목 1"
              />
              <SidebarMenuItem
                variant="children"
                label="하위 항목 2"
                isActive={true}
              />
              <SidebarMenuItem
                variant="children"
                label="하위 항목 3"
              />
            </SidebarMenu>
          </div>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * Buttons 변형
 *
 * 액션 아이콘이 포함된 메뉴 아이템입니다.
 */
export const ButtonsVariant: Story = {
  render: function Render() {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] border-default rounded-md padding-8">
          <SidebarMenu>
            <SidebarMenuItem
              variant="buttons"
              icon={['document', 'file']}
              label="document.pdf"
              actions={
                <>
                  <button className="cursor-pointer bg-transparent border-none padding-0 hover:opacity-70">
                    <Icon icon={RiEditLine} size={18} color="var(--icon-default-muted)" />
                  </button>
                  <button className="cursor-pointer bg-transparent border-none padding-0 hover:opacity-70">
                    <Icon icon={RiDeleteBinLine} size={18} color="var(--icon-default-muted)" />
                  </button>
                </>
              }
            />
            <SidebarMenuItem
              variant="buttons"
              icon={['document', 'file']}
              label="report.xlsx"
              actions={
                <>
                  <button className="cursor-pointer bg-transparent border-none padding-0 hover:opacity-70">
                    <Icon icon={RiEditLine} size={18} color="var(--icon-default-muted)" />
                  </button>
                  <button className="cursor-pointer bg-transparent border-none padding-0 hover:opacity-70">
                    <Icon icon={RiDeleteBinLine} size={18} color="var(--icon-default-muted)" />
                  </button>
                </>
              }
            />
            <SidebarMenuItem
              variant="buttons"
              icon={['document', 'file']}
              label="presentation.pptx"
              isActive={true}
              actions={
                <>
                  <button className="cursor-pointer bg-transparent border-none padding-0 hover:opacity-70">
                    <Icon icon={RiEditLine} size={18} color="var(--icon-default-muted)" />
                  </button>
                  <button className="cursor-pointer bg-transparent border-none padding-0 hover:opacity-70">
                    <Icon icon={RiDeleteBinLine} size={18} color="var(--icon-default-muted)" />
                  </button>
                </>
              }
            />
          </SidebarMenu>
          <p className="font-body size-xs text-muted padding-8">
            메뉴 항목에 호버하면 액션 아이콘이 표시됩니다.
          </p>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * 상태별 비교
 *
 * 기본, 활성, 비활성 상태를 비교합니다.
 */
export const States: Story = {
  render: function Render() {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] border-default rounded-md padding-8">
          <SidebarMenu>
            <SidebarMenuItem
              variant="default"
              icon={['buildings', 'home']}
              label="기본 상태"
            />
            <SidebarMenuItem
              variant="default"
              icon={['system', 'check']}
              label="활성 상태"
              isActive={true}
            />
            <SidebarMenuItem
              variant="default"
              icon={['system', 'close']}
              label="비활성 상태"
              disabled={true}
            />
          </SidebarMenu>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * 키보드 단축키 바인딩
 *
 * `shortcut` prop은 뱃지를 렌더링할 뿐만 아니라 전역 keydown 리스너도 바인딩합니다.
 * 단축키를 누르면 해당 항목의 onClick이 실행됩니다.
 */
export const KeyboardShortcutBinding: Story = {
  render: function Render() {
    const [log, setLog] = useState<string[]>([]);

    const addLog = (message: string) => {
      setLog((prev) => [`${new Date().toLocaleTimeString()} — ${message}`, ...prev.slice(0, 4)]);
    };

    return (
      <div className="flex flex-col ds-gap-16">
        <p className="margin-0 size-sm text-subtle">
          단축키를 눌러 onClick이 실행되는 것을 확인하세요. 사이드바 항목은 항상 마운트되어 있으므로 전역 단축키가 작동합니다.
        </p>
        <SidebarProvider defaultOpen={true}>
          <div className="w-[280px] border-default rounded-md padding-8">
            <SidebarMenu>
              <SidebarMenuItem
                variant="default"
                icon={['buildings', 'home']}
                label="홈"
                shortcut="⌘1"
                onClick={() => addLog('홈 클릭됨 (⌘1)')}
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'search']}
                label="검색"
                shortcut="⌘K"
                onClick={() => addLog('검색 클릭됨 (⌘K)')}
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'settings']}
                label="설정"
                shortcut="⌘,"
                onClick={() => addLog('설정 클릭됨 (⌘,)')}
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'close']}
                label="비활성"
                shortcut="⌘D"
                disabled
                onClick={() => addLog('실행되지 않아야 함')}
              />
            </SidebarMenu>
          </div>
        </SidebarProvider>
        {log.length > 0 && (
          <div className="padding-12 bg-subtle rounded-md">
            <p className="margin-0 size-xs text-muted font-medium">이벤트 로그</p>
            {log.map((entry, i) => (
              <p key={i} className="margin-0 size-xs text-subtle">{entry}</p>
            ))}
          </div>
        )}
      </div>
    );
  },
};
