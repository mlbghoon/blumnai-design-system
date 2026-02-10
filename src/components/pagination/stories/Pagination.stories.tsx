import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

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
      description: '현재 페이지 (1-indexed)',
      table: {
        type: { summary: 'number' },
      },
    },
    totalPages: {
      control: 'number',
      description: '전체 페이지 수',
      table: {
        type: { summary: 'number' },
      },
    },
    onPageChange: {
      action: 'pageChange',
      description: '페이지 변경 콜백',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
    variant: {
      control: 'select',
      options: ['numbered', 'dot', 'simple'],
      description: '페이지네이션 스타일',
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
      description: '최대 표시할 항목 수 (페이지 번호 + ellipsis 포함, numbered 변형에서만 사용)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '7' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hideNavButtons: {
      control: 'boolean',
      description: '이전/다음 버튼 숨김',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    pageChangeConfirmMessage: {
      control: 'text',
      description: '페이지 변경 전 확인 메시지 (설정 시 확인 다이얼로그 표시)',
      table: {
        type: { summary: 'string' },
      },
    },
    getPageHref: {
      description: '라우터 지원을 위한 페이지 href 생성 함수',
      table: {
        type: { summary: '(page: number) => string' },
      },
    },
    total: {
      control: 'number',
      description: '전체 항목 수 (simple 변형에서 사용)',
      table: {
        type: { summary: 'number' },
      },
    },
    resultTextFormatter: {
      description: '결과 텍스트 포맷터 (simple 변형에서 사용)',
      table: {
        type: { summary: '(current: number, total: number) => string' },
      },
    },
    prevText: {
      control: 'text',
      description: '이전 버튼 텍스트 (simple 변형에서 사용)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Prev' },
      },
    },
    nextText: {
      control: 'text',
      description: '다음 버튼 텍스트 (simple 변형에서 사용)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Next' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
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
    prevText: 'Prev',
    nextText: 'Next',
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
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <span className="font-body size-sm text-subtle">3 페이지</span>
          <Pagination page={page3} totalPages={3} onPageChange={setPage3} />
        </div>
        <div className="flex flex-col gap-8">
          <span className="font-body size-sm text-subtle">5 페이지</span>
          <Pagination page={page5} totalPages={5} onPageChange={setPage5} />
        </div>
        <div className="flex flex-col gap-8">
          <span className="font-body size-sm text-subtle">10 페이지</span>
          <Pagination page={page10} totalPages={10} onPageChange={setPage10} />
        </div>
        <div className="flex flex-col gap-8">
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
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-8">
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
        <div className="flex flex-col gap-8">
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
      <div className="flex flex-col gap-16">
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
      <div className="flex flex-col gap-8">
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
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <span className="font-body size-sm text-subtle">첫 페이지</span>
          <Pagination page={page1} totalPages={10} onPageChange={setPage1} />
        </div>
        <div className="flex flex-col gap-8">
          <span className="font-body size-sm text-subtle">마지막 페이지</span>
          <Pagination page={page2} totalPages={10} onPageChange={setPage2} />
        </div>
      </div>
    );
  },
};
