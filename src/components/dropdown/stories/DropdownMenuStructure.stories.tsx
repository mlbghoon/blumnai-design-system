import type { Meta, StoryObj } from '@storybook/react-vite';

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
import { Icon, RiAddLine, RiMailLine, RiMessage3Line, RiUserLine } from '../../icons/Icon';

const meta: Meta<DropdownMenuLabelProps> = {
  title: 'Overlay/Dropdown/Structure',
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
          <Button buttonStyle="secondary">메뉴</Button>
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
          <Button buttonStyle="secondary">파일</Button>
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
          <Button buttonStyle="secondary">메뉴</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={250}>
          <DropdownMenuLabel inset>섹션 1</DropdownMenuLabel>
          <DropdownMenuItem inset>항목 1</DropdownMenuItem>
          <DropdownMenuItem inset>항목 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel inset>섹션 2</DropdownMenuLabel>
          <DropdownMenuItem inset>항목 3</DropdownMenuItem>
          <DropdownMenuItem inset>항목 4</DropdownMenuItem>
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
          <Button buttonStyle="secondary">편집</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="[width:224px]">
          <DropdownMenuItem shortcut="⌘Z">실행 취소</DropdownMenuItem>
          <DropdownMenuItem shortcut="⇧⌘Z">다시 실행</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icon icon={RiUserLine} size={16} />
              사용자 초대
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Icon icon={RiMailLine} size={16} />
                이메일
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon={RiMessage3Line} size={16} />
                메시지
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon icon={RiAddLine} size={16} />
                더 보기...
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem shortcut="⌘X">잘라내기</DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘C">복사</DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘V">붙여넣기</DropdownMenuItem>
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
          <Button buttonStyle="secondary">네비게이션</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={200}>
          <DropdownMenuItem>홈</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>상품</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>전자제품</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>의류</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>남성</DropdownMenuItem>
                  <DropdownMenuItem>여성</DropdownMenuItem>
                  <DropdownMenuItem>아동</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>도서</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>회사 소개</DropdownMenuItem>
          <DropdownMenuItem>문의하기</DropdownMenuItem>
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
          <Button buttonStyle="secondary">계정</Button>
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
      <div className="flex ds-gap-16 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">상단</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem>항목 1</DropdownMenuItem>
            <DropdownMenuItem>항목 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">우측</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuItem>항목 1</DropdownMenuItem>
            <DropdownMenuItem>항목 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">하단</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom">
            <DropdownMenuItem>항목 1</DropdownMenuItem>
            <DropdownMenuItem>항목 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">좌측</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            <DropdownMenuItem>항목 1</DropdownMenuItem>
            <DropdownMenuItem>항목 2</DropdownMenuItem>
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
      <div className="flex ds-gap-16">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">좁게 (150px)</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={150}>
            <DropdownMenuItem>항목 1</DropdownMenuItem>
            <DropdownMenuItem>항목 2</DropdownMenuItem>
            <DropdownMenuItem>항목 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button buttonStyle="secondary" size="sm">넓게 (300px)</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={300}>
            <DropdownMenuItem>더 긴 텍스트가 있는 항목</DropdownMenuItem>
            <DropdownMenuItem>다른 항목</DropdownMenuItem>
            <DropdownMenuItem>세 번째 항목</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

