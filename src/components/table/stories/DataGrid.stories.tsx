import { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef, SortingState, RowSelectionState } from '@tanstack/react-table';

import { DataGrid } from '../DataGrid';
import type { DataGridProps } from '../DataGrid.types';
import { Checkbox } from '../../checkbox/Checkbox';
import { CellBadge, CellAvatar, CellProgress } from '../cells';
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
      description: '테이블 데이터 배열',
      table: {
        type: { summary: 'T[]' },
      },
    },
    columns: {
      description: 'TanStack Table 컬럼 정의',
      table: {
        type: { summary: 'ColumnDef<T>[]' },
      },
    },
    getRowId: {
      description: '행 식별자 함수',
      table: {
        type: { summary: '(row: T) => string' },
        defaultValue: { summary: 'row.id' },
      },
    },
    sorting: {
      description: '정렬 상태 (TanStack SortingState)',
      table: {
        type: { summary: 'SortingState' },
      },
    },
    onSortingChange: {
      description: '정렬 상태 변경 콜백',
      table: {
        type: { summary: 'OnChangeFn<SortingState>' },
      },
    },
    rowSelection: {
      description: '행 선택 상태 (TanStack RowSelectionState)',
      table: {
        type: { summary: 'RowSelectionState' },
      },
    },
    onRowSelectionChange: {
      description: '행 선택 변경 콜백',
      table: {
        type: { summary: 'OnChangeFn<RowSelectionState>' },
      },
    },
    enableRowSelection: {
      description: '행 선택 활성화 여부 또는 행별 선택 가능 함수',
      table: {
        type: {
          summary: 'boolean | ((row: Row<T>) => boolean)',
        },
      },
    },
    pagination: {
      control: 'boolean',
      description: '페이지네이션 활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    page: {
      control: 'number',
      description: '현재 페이지 (1-indexed)',
      table: {
        type: { summary: 'number' },
      },
    },
    total: {
      control: 'number',
      description: '전체 항목 수 (서버사이드 모드용)',
      table: {
        type: { summary: 'number' },
      },
    },
    limit: {
      control: 'number',
      description: '페이지당 항목 수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    limitOptions: {
      description: '페이지 크기 옵션',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[10, 20, 50, 100]' },
      },
    },
    onPageChange: {
      description: '페이지 변경 콜백',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
    onLimitChange: {
      description: '페이지 크기 변경 콜백',
      table: {
        type: { summary: '(limit: number) => void' },
      },
    },
    pageChangeConfirmMessage: {
      control: 'text',
      description: '페이지 변경 전 확인 메시지',
      table: {
        type: { summary: 'string' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: '로딩 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    preserveDataWhileLoading: {
      control: 'boolean',
      description: '로딩 중 데이터 유지 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    minHeight: {
      control: 'text',
      description: '최소 높이',
      table: {
        type: { summary: 'string' },
      },
    },
    maxHeight: {
      control: 'text',
      description: '최대 높이',
      table: {
        type: { summary: 'string' },
      },
    },
    emptyText: {
      control: 'text',
      description: '빈 상태 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '검색된 내용이 없습니다.' },
      },
    },
    emptyContent: {
      description: '빈 상태 커스텀 렌더링',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    error: {
      control: 'text',
      description: '에러 메시지 또는 커스텀 렌더링',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    onRetry: {
      description: '재시도 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
    onRowClick: {
      description: '행 클릭 핸들러',
      table: {
        type: { summary: '(row: T) => void' },
      },
    },
    showSelectedRowBackground: {
      control: 'boolean',
      description: '선택된 행 배경색 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
      />
    );
  },
};

/**
 * 정렬
 *
 * 컬럼 헤더 클릭으로 정렬할 수 있습니다.
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
      <DataGrid
        data={sampleUsers}
        columns={columns}
        getRowId={(row) => row.id}
        sorting={sorting}
        onSortingChange={setSorting}
        limit={5}
      />
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
