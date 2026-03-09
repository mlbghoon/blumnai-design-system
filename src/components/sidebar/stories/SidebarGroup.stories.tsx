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
      description: 'true로 설정하면 그룹 상단에 SidebarGroupLabel이 표시됩니다. false로 설정하면 라벨 없이 메뉴 아이템만 나열됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    labelText: {
      control: 'text',
      description: '그룹 라벨에 표시되는 텍스트입니다. 메뉴 섹션의 카테고리명 등을 입력합니다',
      table: {
        type: { summary: 'string' },
      },
    },
    showAction: {
      control: 'boolean',
      description: 'true로 설정하면 그룹 라벨 옆에 SidebarGroupAction 버튼이 표시됩니다. 항목 추가 등의 액션 버튼을 배치할 때 사용합니다',
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
    labelText: '메뉴',
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
                  label="대시보드"
                  isActive={true}
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['business', 'bar-chart']}
                  label="분석"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['system', 'settings']}
                  label="설정"
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
            <SidebarGroupLabel>프로젝트</SidebarGroupLabel>
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
                  label="프로젝트 알파"
                  badge="3"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['document', 'folder']}
                  label="프로젝트 베타"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['document', 'folder']}
                  label="프로젝트 감마"
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
            <SidebarGroupLabel>네비게이션</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  variant="default"
                  icon={['buildings', 'home']}
                  label="대시보드"
                  isActive={true}
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['business', 'bar-chart']}
                  label="분석"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarMenuItem variant="divider" />

          <SidebarGroup>
            <SidebarGroupLabel>설정</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  variant="default"
                  icon={['user', 'user']}
                  label="프로필"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['system', 'settings']}
                  label="환경설정"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarMenuItem variant="divider" />

          <SidebarGroup>
            <SidebarGroupLabel>지원</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  variant="default"
                  icon={['system', 'question']}
                  label="도움말"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['document', 'file']}
                  label="문서"
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
                  label="대시보드"
                  isActive={true}
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['business', 'bar-chart']}
                  label="분석"
                />
                <SidebarMenuItem
                  variant="default"
                  icon={['system', 'settings']}
                  label="설정"
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarProvider>
    );
  },
};
