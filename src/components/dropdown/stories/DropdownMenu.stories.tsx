import type { Meta, StoryObj } from '@storybook/react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../Dropdown';
import type {
  DropdownMenuProps,
  DropdownMenuContentProps,
} from '../Dropdown.types';
import { Button } from '../../button';

type DropdownStoryProps = DropdownMenuProps & DropdownMenuContentProps;

const meta: Meta<DropdownStoryProps> = {
  title: 'Overlay/Dropdown',
  component: DropdownMenuContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: '[DropdownMenu] 초기 열림 상태 (비제어 모드)',
      table: {
        type: { summary: 'boolean' },
        category: 'DropdownMenu',
      },
    },
    open: {
      control: 'boolean',
      description: '[DropdownMenu] 열림 상태 (제어 모드)',
      table: {
        type: { summary: 'boolean' },
        category: 'DropdownMenu',
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: '[DropdownMenu] 열림 상태 변경 콜백',
      table: {
        type: { summary: '(open: boolean) => void' },
        category: 'DropdownMenu',
      },
    },
    modal: {
      control: 'boolean',
      description: '[DropdownMenu] 모달 모드. true면 포커스 트랩 활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'DropdownMenu',
      },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: '[DropdownMenuContent] 트리거 기준 표시 방향',
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: 'bottom' },
        category: 'DropdownMenuContent',
      },
    },
    sideOffset: {
      control: 'number',
      description: '[DropdownMenuContent] 트리거와의 간격 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
        category: 'DropdownMenuContent',
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '[DropdownMenuContent] 트리거 기준 정렬 위치',
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'start' },
        category: 'DropdownMenuContent',
      },
    },
    alignOffset: {
      control: 'number',
      description: '[DropdownMenuContent] 정렬 오프셋 (px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'DropdownMenuContent',
      },
    },
    width: {
      control: 'text',
      description: '[DropdownMenuContent] 드롭다운의 커스텀 너비 (예: "200", "300px")',
      table: {
        type: { summary: 'string | number' },
        category: 'DropdownMenuContent',
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
type Story = StoryObj<DropdownStoryProps>;

/**
 * 기본 DropdownMenu
 *
 * 가장 단순한 형태의 드롭다운 메뉴입니다.
 */
export const Default: Story = {
  args: {
    modal: true,
    side: 'bottom',
    sideOffset: 4,
    align: 'start',
    alignOffset: 0,
    width: 200,
  },
  parameters: {
    controls: { disable: false },
  },
  render: function Render(args) {
    return (
      <DropdownMenu modal={args.modal}>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={args.side}
          sideOffset={args.sideOffset}
          align={args.align}
          alignOffset={args.alignOffset}
          width={args.width}
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem shortcut="⇧⌘P">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘B">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘S">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem shortcut="⇧⌘Q">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 복합 예시
 *
 * 다양한 아이템 유형을 조합한 예시입니다.
 */
export const ComplexExample: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={280}>
          <DropdownMenuLabel>빠른 작업</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={['document', 'file-add']} shortcut="⌘N">
            새 문서
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['document', 'folder-add']} shortcut="⇧⌘N">
            새 폴더
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>최근 파일</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={['design', 'artboard']} caption="2분 전">
            design-system.fig
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['development', 'code-box']} caption="1시간 전">
            components.tsx
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={['document', 'file-text']} caption="어제">
            notes.md
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem tailIcon={['arrows', 'arrow-right-s']}>모두 보기</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
