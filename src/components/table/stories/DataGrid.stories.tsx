import { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef, SortingState, RowSelectionState } from '@tanstack/react-table';

import { DataGrid } from '../DataGrid';
import type { DataGridProps } from '../DataGrid.types';
import { Checkbox } from '../../checkbox/Checkbox';
import { CellBadge, CellAvatar, CellProgress, CellText } from '../cells';
import { Badge } from '../../badge/Badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  progress: number;
  avatar?: string;
}

const sampleUsers: User[] = [
  { id: '1', name: '홍길동', email: 'hong@example.com', role: 'admin', status: 'active', progress: 100 },
  { id: '2', name: '김철수', email: 'kim@example.com', role: 'editor', status: 'active', progress: 75 },
  { id: '3', name: '이영희', email: 'lee@example.com', role: 'viewer', status: 'inactive', progress: 30 },
  { id: '4', name: '박민수', email: 'park@example.com', role: 'editor', status: 'pending', progress: 50 },
  { id: '5', name: '최지은', email: 'choi@example.com', role: 'admin', status: 'active', progress: 90 },
  { id: '6', name: '정수진', email: 'jung@example.com', role: 'viewer', status: 'active', progress: 60 },
  { id: '7', name: '강민호', email: 'kang@example.com', role: 'editor', status: 'inactive', progress: 45 },
  { id: '8', name: '윤서연', email: 'yoon@example.com', role: 'viewer', status: 'active', progress: 80 },
  { id: '9', name: '임재현', email: 'lim@example.com', role: 'admin', status: 'pending', progress: 20 },
  { id: '10', name: '한소희', email: 'han@example.com', role: 'editor', status: 'active', progress: 95 },
  { id: '11', name: '송민아', email: 'song@example.com', role: 'viewer', status: 'active', progress: 55 },
  { id: '12', name: '오준혁', email: 'oh@example.com', role: 'editor', status: 'inactive', progress: 40 },
];

const statusColorMap = {
  active: 'green',
  inactive: 'neutral',
  pending: 'orange',
} as const;

const roleColorMap = {
  admin: 'blue',
  editor: 'violet',
  viewer: 'neutral',
} as const;

const meta: Meta<DataGridProps<User>> = {
  title: 'Components/Table/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    data: {
      description: '테이블에 표시할 데이터 배열',
      table: {
        type: {
          summary: 'T[]',
          detail: '제네릭 타입 T는 행 데이터의 타입입니다.',
        },
      },
    },
    columns: {
      description: 'TanStack Table 컬럼 정의 배열',
      table: {
        type: {
          summary: 'ColumnDef<T>[]',
          detail: `각 컬럼 속성:
- accessorKey: string - 데이터 필드 키
- header: string | HeaderFn - 헤더 텍스트 또는 렌더 함수
- cell?: CellFn - 셀 커스텀 렌더 함수
- enableSorting?: boolean - 정렬 활성화 (기본값: false)
- meta?: { width: string, align?: 'left' | 'center' | 'right' }`,
        },
      },
    },
    getRowId: {
      description: '각 행의 고유 식별자를 반환하는 함수',
      table: {
        type: {
          summary: '(row: T) => string',
          detail: '기본값: row.id를 반환',
        },
      },
    },
    sorting: {
      description: '현재 정렬 상태 (제어 컴포넌트용)',
      table: {
        type: {
          summary: 'SortingState',
          detail: `{ id: string, desc: boolean }[]

단일 정렬: [{ id: 'name', desc: false }]
다중 정렬: [{ id: 'role', desc: false }, { id: 'name', desc: true }]

사용법:
- 클릭: 오름차순 → 내림차순 → 정렬해제
- Shift + 클릭: 다중 정렬 추가 (우선순위 번호 표시)`,
        },
      },
    },
    onSortingChange: {
      description: '정렬 상태 변경 시 호출되는 콜백',
      table: {
        type: {
          summary: 'OnChangeFn<SortingState>',
          detail: '(updater: SortingState | ((old: SortingState) => SortingState)) => void',
        },
      },
    },
    rowSelection: {
      description: '현재 선택된 행 상태 (제어 컴포넌트용)',
      table: {
        type: {
          summary: 'RowSelectionState',
          detail: `{ [rowId: string]: boolean }

예시: { '1': true, '3': true } - ID가 1, 3인 행 선택됨`,
        },
      },
    },
    onRowSelectionChange: {
      description: '행 선택 상태 변경 시 호출되는 콜백',
      table: {
        type: {
          summary: 'OnChangeFn<RowSelectionState>',
          detail: '(updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => void',
        },
      },
    },
    enableRowSelection: {
      description: '행 선택 기능 활성화 여부 또는 행별 선택 가능 여부 판단 함수',
      table: {
        type: {
          summary: 'boolean | ((row: Row<T>) => boolean)',
          detail: `true: 모든 행 선택 가능
false: 선택 불가
함수: 행별로 선택 가능 여부 결정
예시: (row) => row.original.status !== 'inactive'`,
        },
      },
    },
    pagination: {
      control: 'boolean',
      description: '페이지네이션 UI 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    page: {
      control: 'number',
      description: '현재 페이지 번호 (1부터 시작)',
      table: {
        type: {
          summary: 'number',
          detail: '서버사이드 페이지네이션 시 사용. 클라이언트 모드에서는 내부 관리됨.',
        },
      },
    },
    total: {
      control: 'number',
      description: '전체 데이터 항목 수',
      table: {
        type: {
          summary: 'number',
          detail: '서버사이드 페이지네이션 시 필수. 미제공 시 data.length 사용.',
        },
      },
    },
    limit: {
      control: 'number',
      description: '페이지당 표시할 항목 수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    limitOptions: {
      description: '페이지 크기 선택 옵션 배열',
      table: {
        type: {
          summary: 'number[]',
          detail: 'onLimitChange와 함께 사용하면 선택 UI 표시',
        },
        defaultValue: { summary: '[10, 20, 50, 100]' },
      },
    },
    onPageChange: {
      description: '페이지 변경 시 호출되는 콜백',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
    onLimitChange: {
      description: '페이지 크기 변경 시 호출되는 콜백',
      table: {
        type: {
          summary: '(limit: number) => void',
          detail: '제공 시 페이지 크기 선택 UI 표시',
        },
      },
    },
    pageChangeConfirmMessage: {
      control: 'text',
      description: '페이지 이동 전 확인 다이얼로그에 표시할 메시지',
      table: {
        type: {
          summary: 'string',
          detail: '예시: "저장하지 않은 변경사항이 있습니다. 이동하시겠습니까?"',
        },
      },
    },
    paginationVariant: {
      control: 'select',
      options: ['numbered', 'dot', 'simple'],
      description: '페이지네이션 스타일 변형',
      table: {
        type: {
          summary: 'PaginationVariant',
          detail: `'numbered': 페이지 번호 버튼 표시 (기본값)
'dot': 도트 인디케이터로 표시
'simple': 이전/다음 버튼만 표시`,
        },
        defaultValue: { summary: "'numbered'" },
      },
    },
    maxVisiblePages: {
      control: 'number',
      description: '최대 표시할 페이지 번호 수',
      table: {
        type: {
          summary: 'number',
          detail: 'numbered 변형에서만 사용. 페이지 번호와 ellipsis(...)를 포함한 총 개수.',
        },
        defaultValue: { summary: '7' },
      },
    },
    paginationDisabled: {
      control: 'boolean',
      description: '페이지네이션 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hideNavButtons: {
      control: 'boolean',
      description: '이전/다음 버튼 숨김 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    resultTextFormatter: {
      description: '결과 텍스트 포맷터 (simple 변형에서 사용)',
      table: {
        type: {
          summary: '(current: number, total: number) => string',
          detail: `기본값: (current, total) => \`\${current} of \${total} results\`
예시: (current, total) => \`\${current} / \${total}개\``,
        },
      },
    },
    isLoading: {
      control: 'boolean',
      description: '로딩 상태 표시 여부',
      table: {
        type: {
          summary: 'boolean',
          detail: 'true: 데이터 없으면 스켈레톤, 있으면 오버레이 표시',
        },
        defaultValue: { summary: 'false' },
      },
    },
    preserveDataWhileLoading: {
      control: 'boolean',
      description: '로딩 중 기존 데이터 유지 여부',
      table: {
        type: {
          summary: 'boolean',
          detail: 'true: 오버레이만 표시, false: 스켈레톤으로 대체',
        },
        defaultValue: { summary: 'false' },
      },
    },
    minHeight: {
      control: 'text',
      description: '테이블 최소 높이',
      table: {
        type: {
          summary: 'string',
          detail: '예시: "300px", "50vh"',
        },
      },
    },
    maxHeight: {
      control: 'text',
      description: '테이블 최대 높이 (초과 시 스크롤)',
      table: {
        type: {
          summary: 'string',
          detail: '예시: "500px" - 설정 시 헤더 고정 스크롤 활성화',
        },
      },
    },
    headerHeight: {
      control: 'text',
      description: '헤더 행 높이',
      table: {
        type: {
          summary: 'string',
          detail: '예시: "48px" - 기본값: "32px"',
        },
        defaultValue: { summary: '32px' },
      },
    },
    rowHeight: {
      control: 'text',
      description: '데이터 행 높이',
      table: {
        type: {
          summary: 'string',
          detail: '예시: "48px" - 기본값: "32px"',
        },
        defaultValue: { summary: '32px' },
      },
    },
    getRowHeight: {
      description: '행별 높이 계산 함수 (rowHeight보다 우선순위 높음)',
      table: {
        type: {
          summary: '(row: T) => string | undefined',
          detail: `행별로 다른 높이를 지정할 때 사용합니다.
반환값이 undefined면 rowHeight 또는 기본값(32px)이 적용됩니다.

예시:
(row) => row.isExpanded ? '120px' : undefined`,
        },
      },
    },
    emptyText: {
      control: 'text',
      description: '데이터가 없을 때 표시할 메시지',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '검색된 내용이 없습니다.' },
      },
    },
    emptyContent: {
      description: '데이터가 없을 때 표시할 커스텀 콘텐츠',
      table: {
        type: {
          summary: 'ReactNode',
          detail: 'emptyText 대신 사용할 커스텀 JSX',
        },
      },
    },
    error: {
      control: 'text',
      description: '에러 상태에서 표시할 메시지 또는 커스텀 콘텐츠',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    onRetry: {
      description: '에러 상태에서 재시도 버튼 클릭 시 호출되는 콜백',
      table: {
        type: {
          summary: '() => void',
          detail: '제공 시 재시도 버튼 표시',
        },
      },
    },
    onRowClick: {
      description: '행 클릭 시 호출되는 콜백',
      table: {
        type: {
          summary: '(row: T) => void',
          detail: '제공 시 행에 커서 포인터 표시',
        },
      },
    },
    showSelectedRowBackground: {
      control: 'boolean',
      description: '선택된 행에 배경색 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      control: 'text',
      description: '루트 요소에 추가할 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DataGridProps<User>>;

const baseColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: '이름',
    meta: { width: '120px' },
  },
  {
    accessorKey: 'email',
    header: '이메일',
    meta: { width: '1fr' },
  },
  {
    accessorKey: 'role',
    header: '역할',
    cell: ({ row }) => (
      <Badge label={row.original.role} color={roleColorMap[row.original.role]} size="sm" />
    ),
    meta: { width: '100px', align: 'center' },
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => (
      <CellBadge label={row.original.status} color={statusColorMap[row.original.status]} />
    ),
    meta: { width: '100px', align: 'center' },
  },
];

/**
 * 기본 DataGrid
 *
 * TanStack Table 기반의 데이터 그리드 컴포넌트입니다.
 * CSS Grid를 사용하여 컬럼 너비를 지정합니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  args: {
    pagination: true,
    limit: 5,
    isLoading: false,
    preserveDataWhileLoading: false,
    emptyText: '검색된 내용이 없습니다.',
    showSelectedRowBackground: true,
    paginationVariant: 'numbered',
    paginationAlign: 'right',
    headerHeight: '32px',
    rowHeight: '32px',
    maxHeight: undefined,
    minHeight: undefined,
  },
  render: function Render(args) {
    return (
      <DataGrid
        data={sampleUsers}
        columns={baseColumns}
        getRowId={(row) => row.id}
        pagination={args.pagination}
        limit={args.limit}
        isLoading={args.isLoading}
        preserveDataWhileLoading={args.preserveDataWhileLoading}
        emptyText={args.emptyText}
        showSelectedRowBackground={args.showSelectedRowBackground}
        paginationVariant={args.paginationVariant}
        paginationAlign={args.paginationAlign}
        headerHeight={args.headerHeight}
        rowHeight={args.rowHeight}
        maxHeight={args.maxHeight}
        minHeight={args.minHeight}
      />
    );
  },
};

/**
 * 정렬
 *
 * 컬럼 헤더 클릭으로 정렬할 수 있습니다.
 * - **클릭**: 오름차순 → 내림차순 → 정렬 해제 순으로 토글
 * - **Shift + 클릭**: 다중 정렬 추가 (우선순위 번호 표시)
 *
 * 다중 정렬 시 헤더에 우선순위 번호(1, 2, 3...)가 표시됩니다.
 */
export const WithSorting: Story = {
  render: function Render() {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns: ColumnDef<User>[] = [
      {
        accessorKey: 'name',
        header: '이름',
        enableSorting: true,
        meta: { width: '120px' },
      },
      {
        accessorKey: 'email',
        header: '이메일',
        enableSorting: true,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'role',
        header: '역할',
        enableSorting: true,
        cell: ({ row }) => (
          <Badge label={row.original.role} color={roleColorMap[row.original.role]} size="sm" />
        ),
        meta: { width: '100px', align: 'center' },
      },
      {
        accessorKey: 'progress',
        header: '진행률',
        enableSorting: true,
        cell: ({ row }) => <CellProgress value={row.original.progress} />,
        meta: { width: '150px' },
      },
    ];

    return (
      <div className="flex flex-col gap-16">
        <DataGrid
          data={sampleUsers}
          columns={columns}
          getRowId={(row) => row.id}
          sorting={sorting}
          onSortingChange={setSorting}
          limit={5}
        />
        {sorting.length > 0 && (
          <div className="font-body size-sm text-subtle">
            정렬 상태: {sorting.map((s, i) => `${i + 1}. ${s.id} (${s.desc ? '내림차순' : '오름차순'})`).join(' → ')}
          </div>
        )}
      </div>
    );
  },
};

/**
 * 행 선택
 *
 * 체크박스를 사용한 행 선택 기능입니다.
 */
export const WithRowSelection: Story = {
  render: function Render() {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const columns: ColumnDef<User>[] = useMemo(
      () => [
        {
          id: 'select',
          header: ({ table }) => (
            <Checkbox
              checkboxStyle="with-shadow"
              checked={
                table.getIsAllPageRowsSelected()
                  ? true
                  : table.getIsSomePageRowsSelected()
                    ? 'indeterminate'
                    : false
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="모두 선택"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checkboxStyle="with-shadow"
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="행 선택"
            />
          ),
          meta: { width: '46px', align: 'center' },
          enableSorting: false,
        },
        ...baseColumns,
      ],
      []
    );

    return (
      <div className="flex flex-col gap-16">
        <DataGrid
          data={sampleUsers}
          columns={columns}
          getRowId={(row) => row.id}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          enableRowSelection
          limit={5}
        />
        <div className="font-body size-sm text-subtle">
          선택된 항목: {Object.keys(rowSelection).length}개
        </div>
      </div>
    );
  },
};

/**
 * 비활성화된 행 선택
 *
 * `enableRowSelection` 함수로 특정 행의 선택을 비활성화할 수 있습니다.
 */
export const WithDisabledRows: Story = {
  render: function Render() {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const columns: ColumnDef<User>[] = useMemo(
      () => [
        {
          id: 'select',
          header: ({ table }) => (
            <Checkbox
              checkboxStyle="with-shadow"
              checked={
                table.getIsAllPageRowsSelected()
                  ? true
                  : table.getIsSomePageRowsSelected()
                    ? 'indeterminate'
                    : false
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="모두 선택"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checkboxStyle="with-shadow"
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="행 선택"
            />
          ),
          meta: { width: '46px', align: 'center' },
          enableSorting: false,
        },
        ...baseColumns,
      ],
      []
    );

    return (
      <DataGrid
        data={sampleUsers}
        columns={columns}
        getRowId={(row) => row.id}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableRowSelection={(row) => row.original.status !== 'inactive'}
        limit={5}
      />
    );
  },
};

/**
 * 페이지 크기 변경
 *
 * `limitOptions`로 페이지 크기 옵션을 제공합니다.
 * `showItemCount`와 `limitOptionLabel`로 표시를 커스터마이징할 수 있습니다.
 */
export const WithLimitOptions: Story = {
  render: function Render() {
    const [limit, setLimit] = useState(5);

    return (
      <DataGrid
        data={sampleUsers}
        columns={baseColumns}
        getRowId={(row) => row.id}
        limit={limit}
        limitOptions={[5, 10, 20]}
        onLimitChange={setLimit}
        showItemCount
        limitOptionLabel={(n) => `${n}개씩 보기`}
      />
    );
  },
};

/**
 * 페이지 변경 확인
 *
 * 페이지 이동 전 확인 다이얼로그를 표시합니다.
 */
export const WithPageChangeConfirm: Story = {
  render: function Render() {
    return (
      <DataGrid
        data={sampleUsers}
        columns={baseColumns}
        getRowId={(row) => row.id}
        limit={5}
        pageChangeConfirmMessage="저장하지 않은 변경사항이 있습니다. 페이지를 이동하시겠습니까?"
      />
    );
  },
};

/**
 * 로딩 상태 (스켈레톤)
 *
 * 데이터가 없을 때 스켈레톤 로딩을 표시합니다.
 */
export const LoadingSkeleton: Story = {
  render: function Render() {
    return (
      <DataGrid
        data={[]}
        columns={baseColumns}
        getRowId={(row) => row.id}
        isLoading
        limit={5}
      />
    );
  },
};

/**
 * 로딩 상태 (오버레이)
 *
 * `preserveDataWhileLoading`으로 데이터를 유지하면서 로딩 오버레이를 표시합니다.
 */
export const LoadingOverlay: Story = {
  render: function Render() {
    return (
      <DataGrid
        data={sampleUsers}
        columns={baseColumns}
        getRowId={(row) => row.id}
        isLoading
        preserveDataWhileLoading
        limit={5}
      />
    );
  },
};

/**
 * 빈 상태
 *
 * 데이터가 없을 때 빈 상태 메시지를 표시합니다.
 */
export const EmptyState: Story = {
  render: function Render() {
    return (
      <DataGrid
        data={[]}
        columns={baseColumns}
        getRowId={(row) => row.id}
        emptyText="사용자가 없습니다."
        limit={5}
      />
    );
  },
};

/**
 * 에러 상태
 *
 * 에러 발생 시 에러 메시지와 재시도 버튼을 표시합니다.
 */
export const ErrorState: Story = {
  render: function Render() {
    return (
      <DataGrid
        data={[]}
        columns={baseColumns}
        getRowId={(row) => row.id}
        error="데이터를 불러오는데 실패했습니다."
        onRetry={() => alert('재시도')}
        limit={5}
      />
    );
  },
};

/**
 * 최대 높이 제한
 *
 * `maxHeight`로 테이블 높이를 제한하고 스크롤을 활성화합니다.
 */
export const WithMaxHeight: Story = {
  render: function Render() {
    return (
      <DataGrid
        data={sampleUsers}
        columns={baseColumns}
        getRowId={(row) => row.id}
        maxHeight="300px"
        pagination={false}
      />
    );
  },
};

/**
 * 아바타와 진행률
 *
 * 다양한 셀 헬퍼 컴포넌트를 사용한 예시입니다.
 */
export const WithCellHelpers: Story = {
  render: function Render() {
    const columns: ColumnDef<User>[] = [
      {
        accessorKey: 'name',
        header: '사용자',
        cell: ({ row }) => (
          <CellAvatar name={row.original.name} src={row.original.avatar} />
        ),
        meta: { width: '180px' },
      },
      {
        accessorKey: 'email',
        header: '이메일',
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'role',
        header: '역할',
        cell: ({ row }) => (
          <CellBadge label={row.original.role} color={roleColorMap[row.original.role]} />
        ),
        meta: { width: '100px', align: 'center' },
      },
      {
        accessorKey: 'progress',
        header: '진행률',
        cell: ({ row }) => (
          <CellProgress
            value={row.original.progress}
            color={row.original.progress >= 80 ? 'success' : row.original.progress >= 50 ? 'default' : 'warning'}
          />
        ),
        meta: { width: '150px' },
      },
    ];

    return (
      <DataGrid
        data={sampleUsers}
        columns={columns}
        getRowId={(row) => row.id}
        limit={5}
      />
    );
  },
};

/**
 * 행 클릭
 *
 * `onRowClick`으로 행 클릭 이벤트를 처리합니다.
 */
export const WithRowClick: Story = {
  render: function Render() {
    return (
      <DataGrid
        data={sampleUsers}
        columns={baseColumns}
        getRowId={(row) => row.id}
        onRowClick={(row) => alert(`클릭: ${row.name}`)}
        limit={5}
      />
    );
  },
};

/**
 * 싱글톤 툴팁
 *
 * DataGrid는 내장된 싱글톤 툴팁 시스템을 제공합니다.
 * `CellText`의 `tooltip={true}` prop을 사용하면 셀 텍스트가 잘릴 때 전체 내용을 툴팁으로 표시합니다.
 *
 * 성능 이점:
 * - 셀마다 툴팁을 렌더링하지 않고 하나의 툴팁만 재사용
 * - 가상화와 함께 사용해도 성능 저하 없음
 * - 포털을 통해 렌더링되어 클리핑 문제 없음
 */
export const WithSingletonTooltip: Story = {
  render: function Render() {
    const columns: ColumnDef<User>[] = [
      {
        accessorKey: 'name',
        header: '이름',
        cell: ({ row }) => <CellText value={row.original.name} tooltip />,
        meta: { width: '80px' },
      },
      {
        accessorKey: 'email',
        header: '이메일',
        cell: ({ row }) => <CellText value={row.original.email} tooltip />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'role',
        header: '역할',
        cell: ({ row }) => (
          <CellBadge label={row.original.role} color={roleColorMap[row.original.role]} />
        ),
        meta: { width: '100px', align: 'center' },
      },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <CellBadge label={row.original.status} color={statusColorMap[row.original.status]} />
        ),
        meta: { width: '100px', align: 'center' },
      },
    ];

    return (
      <DataGrid
        data={sampleUsers}
        columns={columns}
        getRowId={(row) => row.id}
        limit={5}
      />
    );
  },
};

/**
 * 수평 스크롤 + 고정 헤더 + 고정 컬럼
 *
 * 많은 컬럼으로 인한 수평 스크롤과 `maxHeight`로 인한 수직 스크롤이 있을 때,
 * 헤더와 첫 번째 컬럼이 고정되어 데이터를 쉽게 탐색할 수 있습니다.
 *
 * - **수평 스크롤**: 컬럼이 많아 화면 너비를 초과할 때 발생
 * - **고정 헤더**: `maxHeight` 설정 시 헤더가 상단에 고정
 * - **고정 컬럼**: `meta.sticky: true`로 컬럼을 왼쪽에 고정
 * - **1fr 컬럼**: `1fr`을 사용하여 남은 공간을 채움
 */
export const WithStickyHeaderAndColumn: Story = {
  render: function Render() {
    interface ExtendedUser {
      id: string;
      name: string;
      email: string;
      department: string;
      position: string;
      phone: string;
      joinDate: string;
      salary: string;
      manager: string;
      location: string;
      project: string;
      skill: string;
      team: string;
      floor: string;
      extension: string;
      startTime: string;
      status: 'active' | 'inactive' | 'pending';
    }

    const extendedUsers: ExtendedUser[] = Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1),
      name: `사용자 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: ['개발팀', '디자인팀', '마케팅팀', '영업팀', 'HR팀'][i % 5],
      position: ['사원', '대리', '과장', '차장', '부장'][i % 5],
      phone: `010-${String(1000 + i).padStart(4, '0')}-${String(1000 + i * 2).padStart(4, '0')}`,
      joinDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      salary: `${(3000 + i * 100).toLocaleString()}만원`,
      manager: i > 0 ? `사용자 ${Math.floor(i / 3) + 1}` : '-',
      location: ['서울', '부산', '대구', '인천', '광주'][i % 5],
      project: ['프로젝트 A', '프로젝트 B', '프로젝트 C', '프로젝트 D'][i % 4],
      skill: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'][i % 5],
      team: ['Alpha', 'Beta', 'Gamma', 'Delta'][i % 4],
      floor: `${(i % 10) + 1}층`,
      extension: `${1000 + i}`,
      startTime: `${8 + (i % 3)}:${i % 2 === 0 ? '00' : '30'}`,
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
    }));

    const columns: ColumnDef<ExtendedUser>[] = [
      {
        accessorKey: 'name',
        header: '이름',
        cell: ({ row }) => <CellText value={row.original.name} />,
        meta: { width: '120px', sticky: true },
      },
      {
        accessorKey: 'email',
        header: '이메일',
        cell: ({ row }) => <CellText value={row.original.email} />,
        meta: { width: '180px' },
      },
      {
        accessorKey: 'department',
        header: '부서',
        cell: ({ row }) => <CellText value={row.original.department} />,
        meta: { width: '120px' },
      },
      {
        accessorKey: 'position',
        header: '직책',
        cell: ({ row }) => <CellText value={row.original.position} />,
        meta: { width: '100px' },
      },
      {
        accessorKey: 'phone',
        header: '연락처',
        cell: ({ row }) => <CellText value={row.original.phone} />,
        meta: { width: '150px' },
      },
      {
        accessorKey: 'joinDate',
        header: '입사일',
        cell: ({ row }) => <CellText value={row.original.joinDate} />,
        meta: { width: '120px' },
      },
      {
        accessorKey: 'salary',
        header: '연봉',
        cell: ({ row }) => <CellText value={row.original.salary} />,
        meta: { width: '120px', align: 'right' },
      },
      {
        accessorKey: 'manager',
        header: '담당 매니저',
        cell: ({ row }) => <CellText value={row.original.manager} />,
        meta: { width: '120px' },
      },
      {
        accessorKey: 'location',
        header: '근무지',
        cell: ({ row }) => <CellText value={row.original.location} />,
        meta: { width: '100px' },
      },
      {
        accessorKey: 'project',
        header: '프로젝트',
        cell: ({ row }) => <CellText value={row.original.project} />,
        meta: { width: '120px' },
      },
      {
        accessorKey: 'skill',
        header: '주요 기술',
        cell: ({ row }) => <CellText value={row.original.skill} />,
        meta: { width: '120px' },
      },
      {
        accessorKey: 'team',
        header: '팀',
        cell: ({ row }) => <CellText value={row.original.team} />,
        meta: { width: '100px' },
      },
      {
        accessorKey: 'floor',
        header: '층',
        cell: ({ row }) => <CellText value={row.original.floor} />,
        meta: { width: '80px', align: 'center' },
      },
      {
        accessorKey: 'extension',
        header: '내선번호',
        cell: ({ row }) => <CellText value={row.original.extension} />,
        meta: { width: '100px', align: 'center' },
      },
      {
        accessorKey: 'startTime',
        header: '출근시간',
        cell: ({ row }) => <CellText value={row.original.startTime} />,
        meta: { width: '100px', align: 'center' },
      },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <CellBadge
            label={row.original.status}
            color={statusColorMap[row.original.status]}
          />
        ),
        meta: { width: '1fr', align: 'center' },
      },
    ];

    return (
      <DataGrid
        data={extendedUsers}
        columns={columns}
        getRowId={(row) => row.id}
        maxHeight="400px"
        pagination={false}
      />
    );
  },
};

/**
 * ## 컬럼 너비 지정 방식
 *
 * DataGrid는 CSS Grid를 사용하여 컬럼 너비를 지정합니다.
 * `meta.width`에 다음 형식을 사용할 수 있습니다.
 *
 * ---
 *
 * ### 지원 형식
 *
 * | 형식 | 예시 | 설명 | Sticky 컬럼 |
 * |------|------|------|-------------|
 * | **픽셀** | `'120px'` | 고정 너비 | ✅ 지원 |
 * | **fr 단위** | `'1fr'` | 남은 공간 비율 배분 | ❌ 미지원 |
 * | **minmax** | `'minmax(100px, 1fr)'` | 최소/최대 범위 지정 | ❌ 미지원 |
 *
 * ---
 *
 * ### Sticky 컬럼 제약사항
 *
 * `meta.sticky: true` 컬럼은 **반드시 픽셀 단위**를 사용해야 합니다.
 *
 * **이유**: Sticky 컬럼의 `left` 오프셋 계산에 정확한 픽셀 값이 필요합니다.
 * `1fr`이나 `minmax`는 렌더링 후에야 실제 크기가 결정되므로,
 * 오프셋을 미리 계산할 수 없습니다.
 *
 * ```tsx
 * // ✅ 올바른 사용
 * { meta: { width: '120px', sticky: true } }
 *
 * // ❌ 작동하지 않음
 * { meta: { width: '1fr', sticky: true } }
 * { meta: { width: 'minmax(100px, 1fr)', sticky: true } }
 * ```
 *
 * ---
 *
 * ### 사용 예시
 *
 * ```tsx
 * const columns = [
 *   { accessorKey: 'name', meta: { width: '120px', sticky: true } },
 *   { accessorKey: 'email', meta: { width: '1fr' } }, // 남은 공간 채움
 *   { accessorKey: 'role', meta: { width: '100px' } },
 *   { accessorKey: 'status', meta: { width: '100px' } },
 * ];
 *
 * // minmax - 최소 너비 보장하면서 확장
 * { accessorKey: 'description', meta: { width: 'minmax(200px, 1fr)' } }
 * ```
 *
 * ---
 *
 * ### Table과의 차이
 *
 * | 컴포넌트 | 레이아웃 | 지원 형식 |
 * |----------|----------|-----------|
 * | **DataGrid** | CSS Grid | `px`, `fr`, `minmax()` |
 * | **Table** | HTML Table | `px`만 지원 |
 *
 * Table은 HTML `<table>` 레이아웃을 사용하므로,
 * CSS Grid의 `fr`이나 `minmax()`를 사용할 수 없습니다.
 */
export const ColumnWidthGuide: Story = {
  render: function Render() {
    interface WidthDemoUser {
      id: string;
      name: string;
      email: string;
      description: string;
      status: 'active' | 'inactive';
    }

    const demoUsers: WidthDemoUser[] = [
      { id: '1', name: '홍길동', email: 'hong@example.com', description: '프론트엔드 개발자로 React, TypeScript 전문', status: 'active' },
      { id: '2', name: '김철수', email: 'kim@example.com', description: '백엔드 개발자로 Node.js, Python 전문', status: 'active' },
      { id: '3', name: '이영희', email: 'lee@example.com', description: 'UI/UX 디자이너로 Figma 전문', status: 'inactive' },
    ];

    const pixelColumns: ColumnDef<WidthDemoUser>[] = [
      { accessorKey: 'name', header: '이름', cell: ({ row }) => <CellText value={row.original.name} />, meta: { width: '100px' } },
      { accessorKey: 'email', header: '이메일', cell: ({ row }) => <CellText value={row.original.email} />, meta: { width: '180px' } },
      { accessorKey: 'description', header: '설명', cell: ({ row }) => <CellText value={row.original.description} />, meta: { width: '300px' } },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <CellBadge
            label={row.original.status}
            color={row.original.status === 'active' ? 'green' : 'neutral'}
          />
        ),
        meta: { width: '100px', align: 'center' },
      },
    ];

    const frColumns: ColumnDef<WidthDemoUser>[] = [
      { accessorKey: 'name', header: '이름', cell: ({ row }) => <CellText value={row.original.name} />, meta: { width: '100px' } },
      { accessorKey: 'email', header: '이메일', cell: ({ row }) => <CellText value={row.original.email} />, meta: { width: '180px' } },
      { accessorKey: 'description', header: '설명', cell: ({ row }) => <CellText value={row.original.description} />, meta: { width: '1fr' } },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <CellBadge
            label={row.original.status}
            color={row.original.status === 'active' ? 'green' : 'neutral'}
          />
        ),
        meta: { width: '100px', align: 'center' },
      },
    ];

    const minmaxColumns: ColumnDef<WidthDemoUser>[] = [
      { accessorKey: 'name', header: '이름', cell: ({ row }) => <CellText value={row.original.name} />, meta: { width: '100px' } },
      { accessorKey: 'email', header: '이메일', cell: ({ row }) => <CellText value={row.original.email} />, meta: { width: '180px' } },
      { accessorKey: 'description', header: '설명', cell: ({ row }) => <CellText value={row.original.description} />, meta: { width: 'minmax(200px, 1fr)' } },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <CellBadge
            label={row.original.status}
            color={row.original.status === 'active' ? 'green' : 'neutral'}
          />
        ),
        meta: { width: '100px', align: 'center' },
      },
    ];

    return (
      <div className="flex flex-col gap-24">
        <div>
          <h3 className="font-body size-md font-bold text-default padding-y-8">
            1. 픽셀 고정 너비
          </h3>
          <p className="font-body size-sm text-subtle padding-y-4">
            모든 컬럼에 고정 픽셀 값 사용 (100px, 180px, 300px, 100px)
          </p>
          <DataGrid
            data={demoUsers}
            columns={pixelColumns}
            getRowId={(row) => row.id}
            pagination={false}
          />
        </div>

        <div>
          <h3 className="font-body size-md font-bold text-default padding-y-8">
            2. fr 단위 (남은 공간 채움)
          </h3>
          <p className="font-body size-sm text-subtle padding-y-4">
            설명 컬럼에 <code className="bg-muted padding-x-4 rounded-xs">1fr</code> 사용 - 나머지 공간을 모두 차지
          </p>
          <DataGrid
            data={demoUsers}
            columns={frColumns}
            getRowId={(row) => row.id}
            pagination={false}
          />
        </div>

        <div>
          <h3 className="font-body size-md font-bold text-default padding-y-8">
            3. minmax (최소/최대 범위)
          </h3>
          <p className="font-body size-sm text-subtle padding-y-4">
            설명 컬럼에 <code className="bg-muted padding-x-4 rounded-xs">minmax(200px, 1fr)</code> 사용 - 최소 200px, 최대 남은 공간
          </p>
          <DataGrid
            data={demoUsers}
            columns={minmaxColumns}
            getRowId={(row) => row.id}
            pagination={false}
          />
        </div>
      </div>
    );
  },
};

/**
 * 커스텀 행/헤더 높이
 *
 * `headerHeight`와 `rowHeight`로 행 높이를 조절할 수 있습니다.
 * 기본값은 둘 다 `32px`입니다.
 */
export const CustomRowHeight: Story = {
  render: function Render() {
    return (
      <DataGrid
        data={sampleUsers}
        columns={baseColumns}
        getRowId={(row) => row.id}
        headerHeight="48px"
        rowHeight="48px"
        limit={5}
      />
    );
  },
};

/**
 * 행별 동적 높이
 *
 * `getRowHeight` 함수로 행별로 다른 높이를 지정할 수 있습니다.
 * `rowHeight`보다 우선순위가 높으며, `undefined`를 반환하면 `rowHeight` 또는 기본값이 적용됩니다.
 */
export const DynamicRowHeight: Story = {
  render: function Render() {
    return (
      <DataGrid
        data={sampleUsers}
        columns={baseColumns}
        getRowId={(row) => row.id}
        headerHeight="40px"
        rowHeight="40px"
        getRowHeight={(row) => (row.role === 'admin' ? '60px' : undefined)}
        limit={5}
      />
    );
  },
};

/**
 * 페이지네이션 변형
 *
 * `paginationVariant`로 페이지네이션 스타일을 변경할 수 있습니다.
 *
 * - **numbered**: 페이지 번호 버튼 표시 (기본값)
 * - **dot**: 도트 인디케이터로 표시
 * - **simple**: 이전/다음 버튼과 현재 위치만 표시
 */
export const PaginationVariants: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-24">
        <div>
          <h3 className="font-body size-md font-bold text-default padding-y-8">
            1. Numbered (기본값)
          </h3>
          <p className="font-body size-sm text-subtle padding-y-4">
            페이지 번호를 직접 클릭하여 이동할 수 있습니다.
          </p>
          <DataGrid
            data={sampleUsers}
            columns={baseColumns}
            getRowId={(row) => row.id}
            limit={3}
            paginationVariant="numbered"
          />
        </div>

        <div>
          <h3 className="font-body size-md font-bold text-default padding-y-8">
            2. Dot
          </h3>
          <p className="font-body size-sm text-subtle padding-y-4">
            도트 인디케이터로 현재 페이지를 표시합니다. 간단한 UI에 적합합니다.
          </p>
          <DataGrid
            data={sampleUsers}
            columns={baseColumns}
            getRowId={(row) => row.id}
            limit={3}
            paginationVariant="dot"
          />
        </div>

        <div>
          <h3 className="font-body size-md font-bold text-default padding-y-8">
            3. Simple
          </h3>
          <p className="font-body size-sm text-subtle padding-y-4">
            이전/다음 버튼과 "N of M results" 텍스트만 표시합니다.
          </p>
          <DataGrid
            data={sampleUsers}
            columns={baseColumns}
            getRowId={(row) => row.id}
            limit={3}
            paginationVariant="simple"
            resultTextFormatter={(current, total) => `${current} / ${total}개`}
          />
        </div>
      </div>
    );
  },
};

/**
 * 페이지네이션 정렬
 *
 * `paginationAlign`으로 페이지네이션 위치를 변경할 수 있습니다.
 */
export const PaginationAlignment: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-24">
        <div>
          <h3 className="font-body size-md font-bold text-default padding-y-8">
            Left
          </h3>
          <DataGrid
            data={sampleUsers.slice(0, 6)}
            columns={baseColumns}
            getRowId={(row) => row.id}
            limit={3}
            paginationAlign="left"
          />
        </div>

        <div>
          <h3 className="font-body size-md font-bold text-default padding-y-8">
            Center
          </h3>
          <DataGrid
            data={sampleUsers.slice(0, 6)}
            columns={baseColumns}
            getRowId={(row) => row.id}
            limit={3}
            paginationAlign="center"
          />
        </div>

        <div>
          <h3 className="font-body size-md font-bold text-default padding-y-8">
            Right (기본값)
          </h3>
          <DataGrid
            data={sampleUsers.slice(0, 6)}
            columns={baseColumns}
            getRowId={(row) => row.id}
            limit={3}
            paginationAlign="right"
          />
        </div>
      </div>
    );
  },
};

/**
 * 서버사이드 페이지네이션
 *
 * 서버에서 페이지네이션을 처리할 때 사용합니다.
 * `page`, `total`, `onPageChange`를 함께 사용하여 제어합니다.
 *
 * - **page**: 현재 페이지 (1부터 시작)
 * - **total**: 전체 항목 수 (서버에서 제공)
 * - **onPageChange**: 페이지 변경 시 서버 요청을 보내는 콜백
 */
export const ServerSidePagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const limit = 5;
    const total = 50;

    const simulateFetch = (newPage: number) => {
      setIsLoading(true);
      setTimeout(() => {
        setPage(newPage);
        setIsLoading(false);
      }, 500);
    };

    const startIndex = (page - 1) * limit;
    const currentPageData = Array.from({ length: limit }, (_, i) => ({
      id: String(startIndex + i + 1),
      name: `사용자 ${startIndex + i + 1}`,
      email: `user${startIndex + i + 1}@example.com`,
      role: (['admin', 'editor', 'viewer'] as const)[i % 3],
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
      progress: Math.floor(Math.random() * 100),
    }));

    return (
      <div className="flex flex-col gap-16">
        <div className="font-body size-sm text-subtle bg-muted padding-12 rounded-md">
          서버사이드 모드: 전체 {total}개 중 페이지 {page} 표시 중
          (항목 {startIndex + 1} - {Math.min(startIndex + limit, total)})
        </div>
        <DataGrid
          data={currentPageData}
          columns={baseColumns}
          getRowId={(row) => row.id}
          page={page}
          total={total}
          limit={limit}
          onPageChange={simulateFetch}
          isLoading={isLoading}
          preserveDataWhileLoading
        />
      </div>
    );
  },
};

/**
 * 커스텀 빈 상태 콘텐츠
 *
 * `emptyContent`로 빈 상태에 커스텀 JSX를 렌더링할 수 있습니다.
 * `emptyText`보다 우선순위가 높습니다.
 */
export const CustomEmptyContent: Story = {
  render: function Render() {
    return (
      <DataGrid
        data={[]}
        columns={baseColumns}
        getRowId={(row) => row.id}
        limit={5}
        emptyContent={
          <div className="flex flex-col items-center gap-12 padding-y-24">
            <div className="font-body size-2xl">📭</div>
            <div className="font-body size-md font-medium text-default">
              데이터가 없습니다
            </div>
            <div className="font-body size-sm text-subtle">
              새로운 사용자를 추가하여 시작하세요.
            </div>
            <button
              type="button"
              className="font-body size-sm font-medium text-primary padding-x-16 padding-y-8 bg-state-soft rounded-md hover:bg-state-soft-hover"
              onClick={() => alert('사용자 추가')}
            >
              + 사용자 추가
            </button>
          </div>
        }
      />
    );
  },
};

/**
 * 다중 고정 컬럼
 *
 * 여러 컬럼에 `meta.sticky: true`를 설정하여 다중 고정 컬럼을 사용할 수 있습니다.
 * 고정 컬럼은 반드시 픽셀 단위로 너비를 지정해야 합니다.
 */
export const MultipleStickyColumns: Story = {
  render: function Render() {
    interface ExtendedUser {
      id: string;
      name: string;
      email: string;
      department: string;
      position: string;
      phone: string;
      joinDate: string;
      salary: string;
      location: string;
      status: 'active' | 'inactive' | 'pending';
    }

    const extendedUsers: ExtendedUser[] = Array.from({ length: 15 }, (_, i) => ({
      id: String(i + 1),
      name: `사용자 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: ['개발팀', '디자인팀', '마케팅팀'][i % 3],
      position: ['사원', '대리', '과장'][i % 3],
      phone: `010-${String(1000 + i).padStart(4, '0')}-${String(2000 + i).padStart(4, '0')}`,
      joinDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-15`,
      salary: `${(3000 + i * 100).toLocaleString()}만원`,
      location: ['서울', '부산', '대구'][i % 3],
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
    }));

    const columns: ColumnDef<ExtendedUser>[] = [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <CellText value={row.original.id} />,
        meta: { width: '60px', sticky: true },
      },
      {
        accessorKey: 'name',
        header: '이름',
        cell: ({ row }) => <CellText value={row.original.name} />,
        meta: { width: '100px', sticky: true },
      },
      {
        accessorKey: 'email',
        header: '이메일',
        cell: ({ row }) => <CellText value={row.original.email} />,
        meta: { width: '180px' },
      },
      {
        accessorKey: 'department',
        header: '부서',
        cell: ({ row }) => <CellText value={row.original.department} />,
        meta: { width: '120px' },
      },
      {
        accessorKey: 'position',
        header: '직책',
        cell: ({ row }) => <CellText value={row.original.position} />,
        meta: { width: '100px' },
      },
      {
        accessorKey: 'phone',
        header: '연락처',
        cell: ({ row }) => <CellText value={row.original.phone} />,
        meta: { width: '150px' },
      },
      {
        accessorKey: 'joinDate',
        header: '입사일',
        cell: ({ row }) => <CellText value={row.original.joinDate} />,
        meta: { width: '120px' },
      },
      {
        accessorKey: 'salary',
        header: '연봉',
        cell: ({ row }) => <CellText value={row.original.salary} />,
        meta: { width: '120px', align: 'right' },
      },
      {
        accessorKey: 'location',
        header: '근무지',
        cell: ({ row }) => <CellText value={row.original.location} />,
        meta: { width: '100px' },
      },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <CellBadge
            label={row.original.status}
            color={statusColorMap[row.original.status]}
          />
        ),
        meta: { width: '1fr', align: 'center' },
      },
    ];

    return (
      <div className="flex flex-col gap-16">
        <div className="font-body size-sm text-subtle bg-muted padding-12 rounded-md">
          ID와 이름 컬럼이 고정되어 있습니다. 가로 스크롤 시 확인하세요.
        </div>
        <DataGrid
          data={extendedUsers}
          columns={columns}
          getRowId={(row) => row.id}
          maxHeight="400px"
          pagination={false}
        />
      </div>
    );
  },
};

/**
 * 풀 기능 조합
 *
 * 페이지네이션, 수직 스크롤(maxHeight), 페이지 크기 변경을 함께 사용하는 예시입니다.
 * 실제 사용 사례에서 가장 일반적인 조합입니다.
 *
 * - **maxHeight**: 테이블 높이를 제한하여 수직 스크롤 활성화
 * - **pagination**: 페이지네이션 UI 표시
 * - **limitOptions + onLimitChange**: 페이지 크기 선택 UI 표시
 * - **showItemCount**: 전체 항목 수 표시
 */
export const FullFeaturedCombination: Story = {
  render: function Render() {
    const [limit, setLimit] = useState(10);

    const largeDataset: User[] = Array.from({ length: 50 }, (_, i) => ({
      id: String(i + 1),
      name: `사용자 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: (['admin', 'editor', 'viewer'] as const)[i % 3],
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
      progress: Math.floor((i * 17) % 100),
    }));

    const columns: ColumnDef<User>[] = [
      {
        accessorKey: 'name',
        header: '이름',
        cell: ({ row }) => <CellText value={row.original.name} />,
        meta: { width: '120px' },
      },
      {
        accessorKey: 'email',
        header: '이메일',
        cell: ({ row }) => <CellText value={row.original.email} tooltip />,
        meta: { width: '1fr' },
      },
      {
        accessorKey: 'role',
        header: '역할',
        cell: ({ row }) => (
          <CellBadge label={row.original.role} color={roleColorMap[row.original.role]} />
        ),
        meta: { width: '100px', align: 'center' },
      },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <CellBadge label={row.original.status} color={statusColorMap[row.original.status]} />
        ),
        meta: { width: '100px', align: 'center' },
      },
      {
        accessorKey: 'progress',
        header: '진행률',
        cell: ({ row }) => <CellProgress value={row.original.progress} />,
        meta: { width: '150px' },
      },
    ];

    return (
      <DataGrid
        data={largeDataset}
        columns={columns}
        getRowId={(row) => row.id}
        maxHeight="400px"
        limit={limit}
        limitOptions={[5, 10, 20, 50]}
        onLimitChange={setLimit}
        showItemCount
        limitOptionLabel={(n) => `${n}개씩 보기`}
      />
    );
  },
};
