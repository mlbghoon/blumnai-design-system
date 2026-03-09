import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pagination } from '../Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  argTypes: {
    page: {
      control: 'number',
      description: '현재 활성 페이지 번호입니다. 1부터 시작하며, totalPages 이하의 값을 설정합니다',
      table: {
        type: { summary: 'number' },
      },
    },
    totalPages: {
      control: 'number',
      description: '전체 페이지 수입니다. 이 값에 따라 페이지 번호 버튼과 ellipsis가 자동으로 계산됩니다',
      table: {
        type: { summary: 'number' },
      },
    },
    onPageChange: {
      action: 'pageChange',
      description: '페이지가 변경될 때 호출되는 콜백 함수입니다. 새로운 페이지 번호를 인자로 전달합니다',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
    variant: {
      control: 'select',
      options: ['numbered', 'dot', 'simple'],
      description: '페이지네이션의 시각적 스타일입니다. numbered(번호 버튼), dot(점 인디케이터), simple(이전/다음 버튼) 중 선택합니다',
      table: {
        type: {
          summary: 'PaginationVariant',
          detail: `'numbered' | 'dot' | 'simple'`,
        },
        defaultValue: { summary: 'numbered' },
      },
    },
    maxVisiblePages: {
      control: 'number',
      description: '한 번에 표시할 최대 항목 수입니다. 페이지 번호와 ellipsis를 포함하며, numbered 변형에서만 적용됩니다',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '7' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'true로 설정하면 모든 페이지 버튼이 비활성화되어 클릭할 수 없습니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hideNavButtons: {
      control: 'boolean',
      description: 'true로 설정하면 이전/다음 화살표 버튼을 숨기고 페이지 번호만 표시합니다',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    pageChangeConfirmMessage: {
      control: 'text',
      description: '페이지 이동 전 표시할 확인 메시지입니다. 설정하면 페이지 변경 시 confirm 다이얼로그가 표시됩니다',
      table: {
        type: { summary: 'string' },
      },
    },
    getPageHref: {
      description: '각 페이지 번호에 대한 href를 생성하는 함수입니다. 설정하면 페이지 버튼이 링크로 렌더링되어 라우터 연동이 가능합니다',
      table: {
        type: { summary: '(page: number) => string' },
      },
    },
    total: {
      control: 'number',
      description: '전체 데이터 항목 수입니다. simple 변형에서 결과 텍스트 표시에 사용됩니다',
      table: {
        type: { summary: 'number' },
      },
    },
    resultTextFormatter: {
      description: '결과 텍스트를 커스터마이즈하는 포맷터 함수입니다. simple 변형에서 기본 텍스트 대신 사용됩니다',
      table: {
        type: { summary: '(current: number, total: number) => string' },
      },
    },
    prevText: {
      control: 'text',
      description: '이전 페이지 버튼에 표시할 텍스트입니다. simple 변형에서만 사용됩니다',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '이전' },
      },
    },
    nextText: {
      control: 'text',
      description: '다음 페이지 버튼에 표시할 텍스트입니다. simple 변형에서만 사용됩니다',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '다음' },
      },
    },
    className: {
      control: 'text',
      description: '컴포넌트에 추가할 CSS 클래스명입니다. 외부 스타일 커스터마이즈에 사용합니다',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/**
 * 기본 페이지네이션
 *
 * Controls 패널에서 모든 props를 테스트할 수 있습니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  args: {
    page: 1,
    totalPages: 10,
    variant: 'numbered',
    maxVisiblePages: 7,
    disabled: false,
    hideNavButtons: false,
    pageChangeConfirmMessage: '',
    total: 100,
    prevText: '이전',
    nextText: '다음',
  },
  render: function Render(args) {
    const [page, setPage] = useState(args.page || 1);

    return (
      <Pagination
        page={page}
        totalPages={args.totalPages}
        onPageChange={setPage}
        variant={args.variant}
        maxVisiblePages={args.maxVisiblePages}
        disabled={args.disabled}
        hideNavButtons={args.hideNavButtons}
        pageChangeConfirmMessage={args.pageChangeConfirmMessage || undefined}
        total={args.total}
        prevText={args.prevText}
        nextText={args.nextText}
        className={args.className}
      />
    );
  },
};

/**
 * 다양한 페이지 수
 */
export const DifferentPageCounts: Story = {
  render: function Render() {
    const [page3, setPage3] = useState(1);
    const [page5, setPage5] = useState(3);
    const [page10, setPage10] = useState(5);
    const [page50, setPage50] = useState(25);

    return (
      <div className="flex flex-col ds-gap-24">
        <div className="flex flex-col ds-gap-8">
          <span className="font-body size-sm text-subtle">3 페이지</span>
          <Pagination page={page3} totalPages={3} onPageChange={setPage3} />
        </div>
        <div className="flex flex-col ds-gap-8">
          <span className="font-body size-sm text-subtle">5 페이지</span>
          <Pagination page={page5} totalPages={5} onPageChange={setPage5} />
        </div>
        <div className="flex flex-col ds-gap-8">
          <span className="font-body size-sm text-subtle">10 페이지</span>
          <Pagination page={page10} totalPages={10} onPageChange={setPage10} />
        </div>
        <div className="flex flex-col ds-gap-8">
          <span className="font-body size-sm text-subtle">50 페이지</span>
          <Pagination page={page50} totalPages={50} onPageChange={setPage50} />
        </div>
      </div>
    );
  },
};

/**
 * Dot 변형
 *
 * 캐러셀이나 슬라이더에 적합한 dot 스타일 페이지네이션
 */
export const DotVariant: Story = {
  render: function Render() {
    const [page, setPage] = useState(3);

    return (
      <Pagination
        page={page}
        totalPages={5}
        onPageChange={setPage}
        variant="dot"
      />
    );
  },
};

/**
 * Simple 변형
 *
 * 결과 수와 Prev/Next 버튼을 표시하는 간단한 스타일
 */
export const SimpleVariant: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);

    return (
      <div className="flex flex-col ds-gap-24">
        <div className="flex flex-col ds-gap-8">
          <span className="font-body size-sm text-subtle">기본 텍스트</span>
          <div style={{ width: 400 }}>
            <Pagination
              page={page}
              totalPages={10}
              onPageChange={setPage}
              variant="simple"
              total={100}
            />
          </div>
        </div>
        <div className="flex flex-col ds-gap-8">
          <span className="font-body size-sm text-subtle">커스텀 텍스트 (resultTextFormatter)</span>
          <div style={{ width: 400 }}>
            <Pagination
              page={page}
              totalPages={10}
              onPageChange={setPage}
              variant="simple"
              total={100}
              resultTextFormatter={(current, total) => `${current} / ${total}개`}
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-16">
        <Pagination
          page={3}
          totalPages={10}
          onPageChange={() => {}}
          disabled
        />
        <Pagination
          page={2}
          totalPages={5}
          onPageChange={() => {}}
          variant="dot"
          disabled
        />
      </div>
    );
  },
};

/**
 * 네비게이션 버튼 숨김
 */
export const WithoutNavButtons: Story = {
  render: function Render() {
    const [page, setPage] = useState(3);

    return (
      <Pagination
        page={page}
        totalPages={10}
        onPageChange={setPage}
        hideNavButtons
      />
    );
  },
};

/**
 * 페이지 변경 확인 다이얼로그
 *
 * 페이지 이동 전 확인 메시지를 표시합니다.
 */
export const WithConfirmation: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);

    return (
      <div className="flex flex-col ds-gap-8">
        <span className="font-body size-sm text-subtle">
          현재 페이지: {page}
        </span>
        <Pagination
          page={page}
          totalPages={10}
          onPageChange={setPage}
          pageChangeConfirmMessage="저장하지 않은 변경사항이 있습니다. 페이지를 이동하시겠습니까?"
        />
      </div>
    );
  },
};

/**
 * 첫 페이지와 마지막 페이지
 *
 * 첫 페이지에서는 이전 버튼이, 마지막 페이지에서는 다음 버튼이 비활성화됩니다.
 */
export const EdgePages: Story = {
  render: function Render() {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(10);

    return (
      <div className="flex flex-col ds-gap-16">
        <div className="flex flex-col ds-gap-8">
          <span className="font-body size-sm text-subtle">첫 페이지</span>
          <Pagination page={page1} totalPages={10} onPageChange={setPage1} />
        </div>
        <div className="flex flex-col ds-gap-8">
          <span className="font-body size-sm text-subtle">마지막 페이지</span>
          <Pagination page={page2} totalPages={10} onPageChange={setPage2} />
        </div>
      </div>
    );
  },
};
