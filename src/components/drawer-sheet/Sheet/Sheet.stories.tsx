import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';
import { Button } from '../../button';
import { Input } from '../../input/Input';

type SheetSide = 'top' | 'bottom' | 'left' | 'right';

interface SheetStoryProps {
  side?: SheetSide;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const meta: Meta<SheetStoryProps> = {
  title: 'Overlay/DrawerSheet/Sheet',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '[SheetContent] 시트가 나타나는 방향',
      table: {
        type: {
          summary: 'SheetSide',
          detail: `'top' | 'bottom' | 'left' | 'right'`,
        },
        defaultValue: { summary: 'right' },
        category: 'SheetContent',
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: '[Sheet] 초기 열림 상태 (비제어 모드)',
      table: {
        type: { summary: 'boolean' },
        category: 'Sheet',
      },
    },
    open: {
      control: 'boolean',
      description: '[Sheet] 열림 상태 (제어 모드)',
      table: {
        type: { summary: 'boolean' },
        category: 'Sheet',
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: '[Sheet] 열림 상태 변경 콜백',
      table: {
        type: { summary: '(open: boolean) => void' },
        category: 'Sheet',
      },
    },
  },
};

export default meta;
type Story = StoryObj<SheetStoryProps>;

/**
 * 기본 시트
 *
 * 화면 가장자리에서 슬라이드 인 되는 패널입니다.
 * side prop으로 방향을 지정할 수 있습니다.
 */
export const Default: Story = {
  args: {
    side: 'right',
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button buttonStyle="secondary">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent side={args.side}>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>
              Sheet description text goes here.
            </SheetDescription>
          </SheetHeader>
          <div className="font-body size-sm text-default padding-y-16">
            This is the sheet content area.
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button buttonStyle="secondary">Cancel</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button>Save</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * 모든 방향
 *
 * 시트가 나타날 수 있는 4가지 방향을 보여줍니다.
 */
export const AllSides: Story = {
  render: () => (
    <div className="flex gap-12 flex-wrap">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button buttonStyle="secondary">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{side.charAt(0).toUpperCase() + side.slice(1)} Sheet</SheetTitle>
              <SheetDescription>
                This sheet slides in from the {side}.
              </SheetDescription>
            </SheetHeader>
            <div className="font-body size-sm text-default padding-y-16">
              Content for the {side} sheet.
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

/**
 * 폼 입력이 포함된 시트
 *
 * 프로필 편집 등 폼 입력이 필요한 경우 사용합니다.
 */
export const WithForm: Story = {
  render: function Render() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button buttonStyle="secondary">Edit Profile</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>프로필 수정</SheetTitle>
            <SheetDescription>
              프로필 정보를 수정합니다. 완료 후 저장 버튼을 클릭하세요.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-16 padding-y-16">
            <Input variant="default" label="이름" placeholder="이름 입력..." />
            <Input variant="default" label="사용자명" placeholder="@username" />
            <Input variant="default" label="이메일" placeholder="email@example.com" />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button buttonStyle="secondary">취소</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button>저장</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * 네비게이션 메뉴
 *
 * 모바일 네비게이션 메뉴로 사용할 수 있는 왼쪽 시트입니다.
 */
export const Navigation: Story = {
  render: function Render() {
    const menuItems = [
      { label: 'Dashboard', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'Settings', href: '#' },
    ];

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button buttonStyle="secondary">Open Menu</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-8 padding-y-16">
            {menuItems.map((item) => (
              <SheetClose asChild key={item.label}>
                <a
                  href={item.href}
                  className="font-body size-sm text-default padding-y-8 padding-x-12 rounded-md hover:bg-state-soft transition-colors"
                >
                  {item.label}
                </a>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * 알림 패널
 *
 * 알림 목록을 표시하는 오른쪽 시트입니다.
 */
export const Notifications: Story = {
  render: function Render() {
    const notifications = [
      { id: 1, title: '새 메시지', description: '홍길동님이 메시지를 보냈습니다.', time: '5분 전' },
      { id: 2, title: '시스템 알림', description: '시스템 업데이트가 완료되었습니다.', time: '1시간 전' },
      { id: 3, title: '새 댓글', description: '게시물에 새 댓글이 달렸습니다.', time: '2시간 전' },
    ];

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button buttonStyle="secondary">Notifications</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>알림</SheetTitle>
            <SheetDescription>
              최근 알림 목록입니다.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-12 padding-y-16">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-col gap-4 padding-12 rounded-md bg-subtle"
              >
                <div className="flex justify-between items-start">
                  <span className="font-body size-sm font-medium text-default">
                    {notification.title}
                  </span>
                  <span className="font-body size-xs text-muted">
                    {notification.time}
                  </span>
                </div>
                <span className="font-body size-sm text-subtle">
                  {notification.description}
                </span>
              </div>
            ))}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button buttonStyle="ghost" fullWidth>모두 읽음으로 표시</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * 프로그래매틱 제어
 *
 * Sheet는 `open`과 `onOpenChange` props로 외부에서 제어할 수 있습니다.
 */
export const Programmatic: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col gap-16 items-start">
        <p className="font-body size-sm text-muted">
          Sheet는 외부 상태로 제어할 수 있습니다.
        </p>
        <div className="flex gap-8">
          <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
            Open Sheet
          </Button>
          <Button buttonStyle="ghost" onClick={() => alert('다른 작업 수행')}>
            Other Action
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>프로그래매틱 시트</SheetTitle>
              <SheetDescription>
                이 시트는 트리거 버튼 없이 외부 상태로 제어됩니다.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <Button buttonStyle="secondary" onClick={() => setOpen(false)}>닫기</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
  },
};

/**
 * 하단 시트 (모바일 스타일)
 *
 * 모바일 앱에서 자주 사용되는 하단 시트 패턴입니다.
 */
export const BottomSheet: Story = {
  render: function Render() {
    const actions = [
      { label: '공유하기', icon: '📤' },
      { label: '복사하기', icon: '📋' },
      { label: '수정하기', icon: '✏️' },
      { label: '삭제하기', icon: '🗑️' },
    ];

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button buttonStyle="secondary">Open Actions</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-xl">
          <SheetHeader>
            <SheetTitle>작업 선택</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-8 padding-y-16">
            {actions.map((action) => (
              <SheetClose asChild key={action.label}>
                <button
                  className="flex items-center gap-12 padding-12 rounded-md hover:bg-state-soft transition-colors text-left font-body size-sm text-default cursor-pointer"
                >
                  <span className="size-lg">{action.icon}</span>
                  {action.label}
                </button>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};
