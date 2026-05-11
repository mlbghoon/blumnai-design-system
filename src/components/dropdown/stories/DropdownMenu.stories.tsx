import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RiArrowRightSLine, RiArtboardLine, RiCodeBoxLine, RiFileAddLine, RiFileTextLine, RiFolderAddLine } from '../../icons/Icon';

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
    maxHeight: {
      control: 'text',
      description: '[DropdownMenuContent] 드롭다운의 최대 높이. 초과 시 스크롤 표시 (예: 200, "300px")',
      table: {
        type: { summary: 'string | number' },
        category: 'DropdownMenuContent',
      },
    },
    container: {
      control: false,
      description: '[DropdownMenuContent] Portal이 렌더링될 컨테이너 요소',
      table: {
        type: { summary: 'HTMLElement | null' },
        category: 'DropdownMenuContent',
      },
    },
    loading: {
      control: 'boolean',
      description: '[DropdownMenuContent] 비동기 데이터 로딩 중 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    maxHeight: undefined,
    loading: false,
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
          maxHeight={args.maxHeight}
          loading={args.loading}
        >
          <DropdownMenuLabel>내 계정</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem shortcut="⇧⌘P">
            프로필
          </DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘B">
            청구
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
 * 최대 높이 제한
 *
 * maxHeight prop으로 드롭다운의 최대 높이를 제한하면 스크롤이 표시됩니다.
 */
export const WithMaxHeight: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">긴 메뉴</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={220} maxHeight={200}>
          <DropdownMenuLabel>전체 메뉴</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>대시보드</DropdownMenuItem>
          <DropdownMenuItem>프로필</DropdownMenuItem>
          <DropdownMenuItem>설정</DropdownMenuItem>
          <DropdownMenuItem>알림</DropdownMenuItem>
          <DropdownMenuItem>보안</DropdownMenuItem>
          <DropdownMenuItem>결제</DropdownMenuItem>
          <DropdownMenuItem>팀 관리</DropdownMenuItem>
          <DropdownMenuItem>API 키</DropdownMenuItem>
          <DropdownMenuItem>로그</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>로그아웃</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 로딩 상태
 *
 * loading prop으로 비동기 데이터를 불러오는 동안 로딩 표시를 보여줍니다.
 */
export const Loading: Story = {
  render: function Render() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">데이터 로딩</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width={220} loading>
          <DropdownMenuLabel>목록</DropdownMenuLabel>
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
          <DropdownMenuItem leadIcon={RiFileAddLine} shortcut="⌘N">
            새 문서
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiFolderAddLine} shortcut="⇧⌘N">
            새 폴더
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>최근 파일</DropdownMenuLabel>
          <DropdownMenuItem leadIcon={RiArtboardLine} caption="2분 전">
            design-system.fig
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiCodeBoxLine} caption="1시간 전">
            components.tsx
          </DropdownMenuItem>
          <DropdownMenuItem leadIcon={RiFileTextLine} caption="어제">
            notes.md
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem tailIcon={RiArrowRightSLine}>모두 보기</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * 내부 검색
 *
 * `isSearch` prop으로 드롭다운 상단에 검색 입력을 표시합니다.
 * `onSearch` 콜백으로 외부에서 필터링 로직을 처리합니다.
 */
export const WithSearch: Story = {
  render: function Render() {
    const [search, setSearch] = useState('');
    const items = ['대시보드', '프로필', '설정', '알림', '보안', '결제', '팀 관리', 'API 키', '로그'];
    const filtered = items.filter((item) => item.toLowerCase().includes(search.toLowerCase()));

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button buttonStyle="secondary">검색 메뉴</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          width={220}
          isSearch
          searchValue={search}
          onSearch={setSearch}
          searchPlaceholder="메뉴 검색..."
        >
          <DropdownMenuLabel>메뉴</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
            ))
          ) : (
            <div className="padding-x-8 padding-y-6 size-sm text-muted">검색 결과 없음</div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
