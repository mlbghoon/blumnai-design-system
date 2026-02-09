import type { Meta, StoryObj } from '@storybook/react';

import {
  SidebarMenu,
  SidebarProvider,
  SidebarMenuItem,
} from '../Sidebar';
import { Icon } from '../../icons/Icon';

type SidebarMenuItemStoryProps = {
  label: string;
  icon: [string, string] | null;
  isActive: boolean;
  disabled: boolean;
  badgeLabel: string;
  badgeColor: 'red' | 'orange' | 'lime' | 'green' | 'cyan' | 'blue' | 'violet' | 'fuchsia' | 'pink' | 'neutral';
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
      description: '메뉴 아이템 라벨',
      table: { type: { summary: 'string' } },
    },
    icon: {
      control: 'object',
      description: '아이콘 (예: ["buildings", "home"]). null로 설정하면 아이콘 없음',
      table: { type: { summary: 'IconType | null' } },
    },
    isActive: {
      control: 'boolean',
      description: '활성 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    badgeLabel: {
      control: 'text',
      description: '배지 텍스트 (비어있으면 배지 숨김)',
      table: { type: { summary: 'string' } },
    },
    badgeColor: {
      control: 'select',
      options: ['red', 'orange', 'lime', 'green', 'cyan', 'blue', 'violet', 'fuchsia', 'pink', 'neutral'],
      description: '배지 색상',
      table: {
        type: { summary: 'BadgeColor' },
        defaultValue: { summary: 'neutral' },
      },
    },
    badgeShape: {
      control: 'select',
      options: ['rounded', 'pill'],
      description: '배지 모양',
      table: {
        type: { summary: 'BadgeShape' },
        defaultValue: { summary: 'rounded' },
      },
    },
    badgeBorder: {
      control: 'boolean',
      description: '배지 테두리',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    shortcut: {
      control: 'text',
      description: '단축키 표시 (예: ⌘K)',
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
    label: 'Menu Item',
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
        <div className="w-[280px] border-default rounded-md padding-8 flex flex-col gap-8">
          <div>
            <p className="font-body size-xs text-muted padding-x-8 padding-y-4">Default</p>
            <SidebarMenu>
              <SidebarMenuItem
                variant="default"
                icon={['buildings', 'home']}
                label="Default Item"
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'star']}
                label="With Badge"
                badge="5"
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'search']}
                label="With Shortcut"
                shortcut="⌘K"
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'check']}
                label="Active Item"
                isActive={true}
              />
              <SidebarMenuItem
                variant="default"
                icon={['system', 'close']}
                label="Disabled Item"
                disabled={true}
              />
            </SidebarMenu>
          </div>

          <SidebarMenuItem variant="divider" />

          <div>
            <p className="font-body size-xs text-muted padding-x-8 padding-y-4">Label</p>
            <SidebarMenu>
              <SidebarMenuItem variant="label" label="Section Header" />
              <SidebarMenuItem
                variant="default"
                icon={['document', 'file']}
                label="Item Under Label"
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
                label="Alice Brown"
              />
              <SidebarMenuItem
                variant="avatar"
                avatarInitials="CD"
                label="Charlie Davis"
                badge="2"
              />
              <SidebarMenuItem
                variant="avatar"
                avatarInitials="EF"
                label="Eve Fisher"
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
                label="Documentation"
                caption="Learn how to use the app"
              />
              <SidebarMenuItem
                variant="caption"
                label="Support"
                caption="Get help from our team"
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
                label="Parent Item"
              />
              <SidebarMenuItem
                variant="children"
                label="Child Item 1"
              />
              <SidebarMenuItem
                variant="children"
                label="Child Item 2"
                isActive={true}
              />
              <SidebarMenuItem
                variant="children"
                label="Child Item 3"
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
                    <Icon iconType={['design', 'edit']} size={18} color="var(--icon-default-muted)" />
                  </button>
                  <button className="cursor-pointer bg-transparent border-none padding-0 hover:opacity-70">
                    <Icon iconType={['system', 'delete-bin']} size={18} color="var(--icon-default-muted)" />
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
                    <Icon iconType={['design', 'edit']} size={18} color="var(--icon-default-muted)" />
                  </button>
                  <button className="cursor-pointer bg-transparent border-none padding-0 hover:opacity-70">
                    <Icon iconType={['system', 'delete-bin']} size={18} color="var(--icon-default-muted)" />
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
                    <Icon iconType={['design', 'edit']} size={18} color="var(--icon-default-muted)" />
                  </button>
                  <button className="cursor-pointer bg-transparent border-none padding-0 hover:opacity-70">
                    <Icon iconType={['system', 'delete-bin']} size={18} color="var(--icon-default-muted)" />
                  </button>
                </>
              }
            />
          </SidebarMenu>
          <p className="font-body size-xs text-muted padding-8">
            Hover over menu items to see action icons.
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
              label="Default State"
            />
            <SidebarMenuItem
              variant="default"
              icon={['system', 'check']}
              label="Active State"
              isActive={true}
            />
            <SidebarMenuItem
              variant="default"
              icon={['system', 'close']}
              label="Disabled State"
              disabled={true}
            />
          </SidebarMenu>
        </div>
      </SidebarProvider>
    );
  },
};
