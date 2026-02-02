import type { Meta, StoryObj } from '@storybook/react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '../Dropdown';
import type { DropdownMenuLabelProps } from '../Dropdown.types';
import { Button } from '../../button';
import { Icon } from '../../icons/Icon';

const meta: Meta<DropdownMenuLabelProps> = {
  title: 'Components/Overlay/DropdownMenu/Structure',
  component: DropdownMenuLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    caption: {
      control: 'text',
      description: '라벨 우측에 표시되는 캡션 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    inset: {
      control: 'boolean',
      description: '왼쪽 인덴트 적용',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '350px', display: 'flex', alignItems: 'flex-start', paddingTop: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<DropdownMenuLabelProps>;

// ============================================================================
// LABELS
// ============================================================================

/**
 * 라벨과 구분선
 *
 * DropdownMenuLabel과 DropdownMenuSeparator를 사용한 섹션 구분 예시입니다.
 */
export const Default: Story = {
  args: {
    caption: '3개',
    inset: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    const caption = args.caption || undefined;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={250}>
          <DropdownMenuLabel caption={caption} inset={args.inset}>
            파일
          </DropdownMenuLabel>
          <DropdownMenuItem leadIcon={['document', 'file-add']}>새 파일</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['document', 'folder-open']}>열기</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel inset={args.inset}>편집</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={['arrows', 'arrow-go-back']} shortcut="⌘Z">실행 취소</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['arrows', 'arrow-go-forward']} shortcut="⇧⌘Z">다시 실행</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 캡션이 있는 라벨
 */
export const LabelWithCaption: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">Files</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuLabel caption="3개">최근 파일</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={['design', 'artboard']}>design-system.fig</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['development', 'code-box']}>components.tsx</DropdownMenuItem>
          <DropdownMenuItem leadIcon={['document', 'file-text']}>notes.md</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel caption="Ctrl+K">빠른 실행</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={['development', 'command']}>명령 팔레트</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 인셋 라벨
 */
export const InsetLabel: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={250}>
          <DropdownMenuLabel inset>Section 1</DropdownMenuLabel>
          <DropdownMenuItem inset>Item 1</DropdownMenuItem>
          <DropdownMenuItem inset>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel inset>Section 2</DropdownMenuLabel>
          <DropdownMenuItem inset>Item 3</DropdownMenuItem>
          <DropdownMenuItem inset>Item 4</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// ============================================================================
// SUBMENU
// ============================================================================

/**
 * 서브메뉴
 */
export const Submenu: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">Edit</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem shortcut="⌘Z">Undo</DropdownMenuItem>
          <DropdownMenuItem shortcut="⇧⌘Z">Redo</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icon iconType={['user', 'user']} size={16} />
              Invite Users
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Icon iconType={['communication', 'mail']} size={16} />
                Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon iconType={['communication', 'message-3']} size={16} />
                Message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon iconType={['system', 'add']} size={16} />
                More...
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem shortcut="⌘X">Cut</DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘C">Copy</DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘V">Paste</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 중첩 서브메뉴
 */
export const NestedSubmenu: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">Navigation</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={200}>
          <DropdownMenuItem>Home</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Products</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Electronics</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Clothing</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Men's</DropdownMenuItem>
                  <DropdownMenuItem>Women's</DropdownMenuItem>
                  <DropdownMenuItem>Kids</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>Books</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>About</DropdownMenuItem>
          <DropdownMenuItem>Contact</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// ============================================================================
// GROUPS
// ============================================================================

/**
 * 메뉴 그룹
 *
 * DropdownMenuGroup을 사용하여 관련 아이템을 묶습니다.
 */
export const MenuGroups: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">Account</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={200}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>계정</DropdownMenuLabel>
            <DropdownMenuItem leadIcon={['user', 'user']}>프로필</DropdownMenuItem>
            <DropdownMenuItem leadIcon={['system', 'settings']}>설정</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>팀</DropdownMenuLabel>
            <DropdownMenuItem leadIcon={['user', 'group']}>팀원</DropdownMenuItem>
            <DropdownMenuItem leadIcon={['user', 'user-add']}>초대</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem leadIcon={['system', 'logout-box-r']}>로그아웃</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// ============================================================================
// POSITIONING
// ============================================================================

/**
 * 위치 옵션
 *
 * `side` prop으로 메뉴의 표시 방향을 조절합니다.
 */
export const Positions: Story = {
  render: function Render() {
    return (
      <div className="flex gap-16 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">Top</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">Right</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">Bottom</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom">
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">Left</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

/**
 * 커스텀 너비
 */
export const CustomWidth: Story = {
  render: function Render() {
    return (
      <div className="flex gap-16">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">Narrow (150px)</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={150}>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">Wide (300px)</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={300}>
            <DropdownMenuItem>Item with longer text</DropdownMenuItem>
            <DropdownMenuItem>Another item</DropdownMenuItem>
            <DropdownMenuItem>Third item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

