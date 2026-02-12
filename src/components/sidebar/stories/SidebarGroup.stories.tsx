import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroupAction,
  SidebarMenu,
  SidebarProvider,
  SidebarMenuItem,
} from '../Sidebar';
import { Button } from '../../button/Button';

type SidebarGroupStoryProps = {
  showLabel: boolean;
  labelText: string;
  showAction: boolean;
};

const meta: Meta<SidebarGroupStoryProps> = {
  title: 'Navigation/Sidebar/Group',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    showLabel: {
      control: 'boolean',
      description: 'SidebarGroupLabel 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    labelText: {
      control: 'text',
      description: '그룹 라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    showAction: {
      control: 'boolean',
      description: 'SidebarGroupAction 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SidebarGroupStoryProps>;

/**
 * 기본 그룹
 *
 * SidebarGroup은 관련 메뉴 아이템들을 그룹화합니다.
 *
 * ## 구성 요소
 * - **SidebarGroup**: 그룹 컨테이너
 * - **SidebarGroupLabel**: 그룹 제목 (선택)
 * - **SidebarGroupAction**: 그룹 액션 버튼 (선택)
 * - **SidebarGroupContent**: 메뉴 아이템 컨테이너
 */
export const Default: Story = {
  args: {
    showLabel: true,
    labelText: 'Menu',
    showAction: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] border-default rounded-md">
          <SidebarGroup>
            {args.showLabel && <SidebarGroupLabel>{args.labelText}</SidebarGroupLabel>}
            {args.showAction && (
              <SidebarGroupAction>
                <Button
                  buttonStyle="ghost"
                  variant="iconOnly"
                  size="2xs"
                  leadIcon={['system', 'add']}
                />
              </SidebarGroupAction>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  variant="default"
                  icon={['buildings', 'home']}
                  label="Dashboard"
                  isActive={true}
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['business', 'bar-chart']}
                  label="Analytics"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['system', 'settings']}
                  label="Settings"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * 그룹 액션
 *
 * SidebarGroupAction으로 그룹에 액션 버튼을 추가할 수 있습니다.
 */
export const WithAction: Story = {
  render: function Render() {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] border-default rounded-md">
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupAction>
              <Button
                buttonStyle="ghost"
                variant="iconOnly"
                size="2xs"
                leadIcon={['system', 'add']}
              />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  variant="default"
                  icon={['document', 'folder']}
                  label="Project Alpha"
                  badge="3"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['document', 'folder']}
                  label="Project Beta"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['document', 'folder']}
                  label="Project Gamma"
                  badge="12"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * 다중 그룹
 *
 * 여러 그룹을 사용하여 메뉴를 구조화할 수 있습니다.
 */
export const MultipleGroups: Story = {
  render: function Render() {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] border-default rounded-md">
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  variant="default"
                  icon={['buildings', 'home']}
                  label="Dashboard"
                  isActive={true}
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['business', 'bar-chart']}
                  label="Analytics"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarMenuItem variant="divider" />

          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  variant="default"
                  icon={['user', 'user']}
                  label="Profile"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['system', 'settings']}
                  label="Preferences"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarMenuItem variant="divider" />

          <SidebarGroup>
            <SidebarGroupLabel>Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  variant="default"
                  icon={['system', 'question']}
                  label="Help"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['document', 'file']}
                  label="Documentation"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarProvider>
    );
  },
};

/**
 * 라벨 없는 그룹
 *
 * SidebarGroupLabel 없이도 그룹을 사용할 수 있습니다.
 */
export const WithoutLabel: Story = {
  render: function Render() {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[280px] border-default rounded-md">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  variant="default"
                  icon={['buildings', 'home']}
                  label="Dashboard"
                  isActive={true}
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['business', 'bar-chart']}
                  label="Analytics"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['system', 'settings']}
                  label="Settings"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarProvider>
    );
  },
};
