import type { Meta, StoryObj } from '@storybook/react-vite';

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
      description: '[DropdownMenu] 초기 열림 상태를 설정합니다. 비제어 모드에서 드롭다운이 처음 렌더링될 때의 열림 여부를 결정합니다',
      table: {
        type: { summary: 'boolean' },
        category: 'DropdownMenu',
      },
    },
    open: {
      control: 'boolean',
      description: '[DropdownMenu] 드롭다운의 열림 상태를 직접 제어합니다. onOpenChange와 함께 사용하여 제어 모드로 동작합니다',
      table: {
        type: { summary: 'boolean' },
        category: 'DropdownMenu',
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: '[DropdownMenu] 드롭다운의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다',
      table: {
        type: { summary: '(open: boolean) => void' },
        category: 'DropdownMenu',
      },
    },
    modal: {
      control: 'boolean',
      description: '[DropdownMenu] 모달 모드 여부입니다. true이면 드롭다운이 열려 있을 때 외부 요소와의 상호작용이 차단되고 포커스가 트랩됩니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'DropdownMenu',
      },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: '[DropdownMenuContent] 트리거 버튼을 기준으로 드롭다운이 표시되는 방향입니다. 공간이 부족하면 자동으로 반대 방향으로 전환됩니다',
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: 'bottom' },
        category: 'DropdownMenuContent',
      },
    },
    sideOffset: {
      control: 'number',
      description: '[DropdownMenuContent] 트리거 버튼과 드롭다운 사이의 간격을 픽셀 단위로 설정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
        category: 'DropdownMenuContent',
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '[DropdownMenuContent] 트리거 버튼을 기준으로 드롭다운의 정렬 위치입니다. start(시작), center(중앙), end(끝) 중 선택합니다',
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'start' },
        category: 'DropdownMenuContent',
      },
    },
    alignOffset: {
      control: 'number',
      description: '[DropdownMenuContent] 정렬 위치에서의 추가 오프셋을 픽셀 단위로 설정합니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'DropdownMenuContent',
      },
    },
    width: {
      control: 'text',
      description: '[DropdownMenuContent] 드롭다운 패널의 너비를 직접 지정합니다. 숫자 또는 CSS 단위가 포함된 문자열을 사용할 수 있습니다',
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
          <Button buttonStyle="secondary">메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={args.side}
          sideOffset={args.sideOffset}
          align={args.align}
          alignOffset={args.alignOffset}
          width={args.width}
        >
          <DropdownMenuLabel>내 계정</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem shortcut="⇧⌘P">
            프로필
          </DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘B">
            결제
          </DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘S">
            설정
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem shortcut="⇧⌘Q">
            로그아웃
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
          <Button buttonStyle="secondary">메뉴</Button>
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
