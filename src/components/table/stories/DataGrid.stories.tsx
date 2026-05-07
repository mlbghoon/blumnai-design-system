import { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef, SortingState, RowSelectionState, ColumnOrderState } from '@tanstack/react-table';

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
  title: 'DataDisplay/Table/DataGrid',
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
    enableColumnResize: {
      control: 'boolean',
      description: '컬럼 크기 조절 활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    scrollbarType: {
      control: 'select',
      options: ['hover', 'scroll', 'auto', 'always'],
      description: '스크롤바 표시 방식 (내부 ScrollArea의 type 으로 전달)',
      table: {
        type: {
          summary: "'hover' | 'scroll' | 'auto' | 'always'",
          detail:
            "hover: 호버 시 표시 (기본). scroll: 스크롤 중 표시. auto: 오버플로 시 표시. always: 항상 표시.\n" +
            '가로 스크롤 가능 여부를 사용자에게 시각적으로 알리려면 always 사용.',
        },
        defaultValue: { summary: "'hover'" },
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
    fitLimitRowHeight: {
      control: 'boolean',
      description: '바디 높이를 `limit × rowHeight` 로 고정 (Dialog 안에서 페이지 간 높이 흔들림 방지)',
      table: {
        type: {
          summary: 'boolean',
          detail: `true 면 바디 최소 높이가 limit × rowHeight 로 고정됩니다.
헤더와 페이지네이션은 영향 없음. getRowHeight 와 함께 쓰면 무시되며 dev 경고 출력.

예시: Dialog 안에서 limit=10, rowHeight="36px" → 바디 360px 유지, 마지막 페이지에 행이 3개여도 Dialog 높이 동일.`,
        },
        defaultValue: { summary: 'false' },
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
    fontSize: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: '텍스트 크기 (행 높이 기본값도 함께 조정)',
      table: {
        type: {
          summary: "'xs' | 'sm' | 'md'",
          detail: `'xs': 12px 텍스트 / 행 32px
'sm': 14px 텍스트 / 행 36px (기본값)
'md': 16px 텍스트 / 행 40px

명시적으로 rowHeight/headerHeight를 넘기면 그 값이 우선합니다.`,
        },
        defaultValue: { summary: "'sm'" },
      },
    },
    className: {
      control: 'text',
      description: '루트 요소에 추가할 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
    footerRow: {
      control: false,
      description: '하단 고정 요약/합계 행 (컬럼 ID → 셀 컨텐츠 맵)',
      table: {
        type: {
          summary: 'Record<string, ReactNode>',
          detail:
            '키는 컬럼의 id 또는 accessorKey. 매칭되지 않는 컬럼은 빈 셀. ' +
            '스크롤 viewport 하단에 sticky로 고정되며 본문 컬럼 너비·sticky 포지션을 공유합니다.\n' +
            '예: footerRow={{ name: "합계", amount: total }}',
        },
      },
    },
    overscan: {
      control: false,
      description: '가상화 overscan (뷰포트 밖에 추가로 마운트할 개수)',
      table: {
        type: {
          summary: 'number | { rows?: number; columns?: number }',
          detail:
            'number 로 주면 행 overscan만 설정 (열은 기본값 2). 축별 조정은 객체 사용.\n' +
            '기본값: 10 (행), 2 (열).',
        },
        defaultValue: { summary: '10 rows / 2 cols' },
      },
    },
    virtualizationThreshold: {
      control: false,
      description: '가상화 활성화 임계값 (행/열 개수가 이 값을 초과하면 가상화 활성)',
      table: {
        type: {
          summary: 'number | { rows?: number; columns?: number }',
          detail:
            'number 로 주면 행 임계값만 설정 (열은 기본값 30). 축별 조정은 객체 사용.\n' +
            '기본값: { rows: 100, columns: 30 }. 소규모 테스트 데이터셋에서 가상화 강제하거나 ' +
            '컬럼 많은 그리드에서 더 낮은 행 수부터 가상화할 때 사용.',
        },
        defaultValue: { summary: '{ rows: 100, columns: 30 }' },
      },
    },
    viewportRef: {
      control: false,
      description: '스크롤 가능한 뷰포트 요소에 대한 ref (programmatic scroll 제어용)',
      table: {
        type: {
          summary: 'Ref<HTMLDivElement>',
          detail:
            '내부 ScrollArea viewport에 연결됩니다. 특정 위치로 scrollTo, 현재 scrollTop/scrollLeft 측정 등에 사용.\n' +
            '예: const ref = useRef<HTMLDivElement>(null);\n' +
            'ref.current?.scrollTo({ top: 0, behavior: "smooth" });',
        },
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
    fontSize: 'sm',
    headerHeight: undefined,
    rowHeight: undefined,
    maxHeight: undefined,
    minHeight: undefined,
    enableColumnResize: false,
    fitLimitRowHeight: false,
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
        fontSize={args.fontSize}
        headerHeight={args.headerHeight}
        rowHeight={args.rowHeight}
        maxHeight={args.maxHeight}
        minHeight={args.minHeight}
        enableColumnResize={args.enableColumnResize}
        fitLimitRowHeight={args.fitLimitRowHeight}
      />
    );
  },
};

/**
 * fontSize 옵션
 *
 * `xs` / `sm` / `md` 세 가지 폰트 크기를 지원합니다.
 * 명시적 `rowHeight` / `headerHeight`가 없으면 행 높이도 자동으로 32/36/40px로 조정됩니다.
 */
export const FontSize: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24">
        {(['xs', 'sm', 'md'] as const).map((size) => (
          <div key={size} className="flex flex-col ds-gap-8">
            <h3 className="font-body size-md font-semibold text-default">fontSize=&quot;{size}&quot;</h3>
            <DataGrid
              data={sampleUsers.slice(0, 5)}
              columns={baseColumns}
              getRowId={(row) => row.id}
              fontSize={size}
              pagination={false}
            />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * fontSize + 명시적 rowHeight
 *
 * `rowHeight` / `headerHeight`를 직접 지정하면 `fontSize` 기본 행 높이보다 우선합니다.
 * 왼쪽은 `fontSize="md"` 기본(40px), 오른쪽은 `fontSize="md"` + `rowHeight="56px"`.
 */
export const FontSizeWithExplicitHeight: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24">
        <div className="flex flex-col ds-gap-8">
          <h3 className="font-body size-md font-semibold text-default">
            fontSize=&quot;md&quot; (기본 행 40px)
          </h3>
          <DataGrid
            data={sampleUsers.slice(0, 5)}
            columns={baseColumns}
            getRowId={(row) => row.id}
            fontSize="md"
            pagination={false}
          />
        </div>
        <div className="flex flex-col ds-gap-8">
          <h3 className="font-body size-md font-semibold text-default">
            fontSize=&quot;md&quot; + rowHeight=&quot;56px&quot; + headerHeight=&quot;56px&quot;
          </h3>
          <DataGrid
            data={sampleUsers.slice(0, 5)}
            columns={baseColumns}
            getRowId={(row) => row.id}
            fontSize="md"
            rowHeight="56px"
            headerHeight="56px"
            pagination={false}
          />
        </div>
      </div>
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
      <div className="flex flex-col ds-gap-16">
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
      <div className="flex flex-col ds-gap-16">
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
 * `fitLimitRowHeight` + 빈 상태 / 에러 상태 — body 높이 일관성 (v1.9.30+)
 *
 * `fitLimitRowHeight={true}` 가 활성일 때 빈 상태나 에러 상태에서도 grid 의 전체 높이가
 * 데이터 있을 때와 동일하게 유지됩니다.
 *
 * 동작:
 * - 빈 상태: pagination footer 는 의도적으로 숨김 (검색 결과 0 일 때 페이지 의미 없음).
 *   대신 body 가 `limit × rowHeight + (pagination 이 데이터 있을 때 차지하는 높이 ≈ 49px)` 로
 *   확장되어 grid 전체 높이가 동일하게 유지됨.
 * - 에러 상태: pagination footer 숨김. body 도 동일한 방식으로 확장 (단, error 시 pagination
 *   자체가 안 보이므로 footer 분 추가 X).
 *
 * **확인 포인트:**
 * - pagination 활성 case 에서 빈 상태 grid 와 데이터 있는 grid 의 전체 높이가 동일
 * - 빈/에러 상태의 아이콘 + 메시지 (+ 재시도 버튼) 가 그 영역 안에 수직 중앙 정렬
 * - `fitLimitRowHeight={false}` (이전 동작) 와 비교 시 빈 상태가 훨씬 짧아 grid 가 축소됨
 */
export const FitLimitRowHeightEmptyState: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col ds-gap-24">
        <div>
          <p className="font-body size-sm text-muted margin-b-8">
            <code>fitLimitRowHeight=true</code> + pagination 활성 + 빈 상태 — body 가 footer 영역까지 흡수해서 확장
          </p>
          <DataGrid
            data={[]}
            columns={baseColumns}
            getRowId={(row) => row.id}
            emptyText="검색된 내용이 없습니다."
            limit={10}
            rowHeight="36px"
            fitLimitRowHeight
          />
        </div>

        <div>
          <p className="font-body size-sm text-muted margin-b-8">
            <code>fitLimitRowHeight=true</code> + pagination 활성 + 데이터 있을 때 — 위 빈 상태와 같은 전체 높이
          </p>
          <DataGrid
            data={sampleUsers.slice(0, 3)}
            columns={baseColumns}
            getRowId={(row) => row.id}
            limit={10}
            rowHeight="36px"
            fitLimitRowHeight
          />
        </div>

        <div>
          <p className="font-body size-sm text-muted margin-b-8">
            <code>fitLimitRowHeight=true</code> + pagination 비활성 + 빈 상태 — body 360px 고정 (pagination footer 없음)
          </p>
          <DataGrid
            data={[]}
            columns={baseColumns}
            getRowId={(row) => row.id}
            emptyText="검색된 내용이 없습니다."
            limit={10}
            rowHeight="36px"
            fitLimitRowHeight
            pagination={false}
          />
        </div>

        <div>
          <p className="font-body size-sm text-muted margin-b-8">
            <code>fitLimitRowHeight=true</code> + 에러 상태 — body 360px 고정 (error 시 pagination 은 의도적으로 숨김)
          </p>
          <DataGrid
            data={[]}
            columns={baseColumns}
            getRowId={(row) => row.id}
            error="데이터를 불러오는데 실패했습니다."
            onRetry={() => alert('재시도')}
            limit={10}
            rowHeight="36px"
            fitLimitRowHeight
          />
        </div>

        <div>
          <p className="font-body size-sm text-muted margin-b-8">
            비교: <code>fitLimitRowHeight=false</code> (이전 동작) — 빈 상태가 훨씬 짧음
          </p>
          <DataGrid
            data={[]}
            columns={baseColumns}
            getRowId={(row) => row.id}
            emptyText="검색된 내용이 없습니다."
            limit={10}
            rowHeight="36px"
            fitLimitRowHeight={false}
            pagination={false}
          />
        </div>
      </div>
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
 * 가로 스크롤바 항상 노출 (`scrollbarType="always"`)
 *
 * 컬럼이 많아 가로 오버플로가 발생할 때, 스크롤바를 항상 노출하여
 * 사용자가 우측에 더 많은 컨텐츠가 있음을 즉시 인지할 수 있게 합니다.
 *
 * **확인 포인트:**
 * - 마우스 호버 없이도 가로 스크롤바가 보임
 * - 기본 (`scrollbarType` 미지정 / `'hover'`) 와 비교: 호버 시에만 표시
 *
 * QA 요구사항: 통계/이력 DataGrid 등 가로 스크롤이 필요한 곳에서 사용.
 */
export const ScrollbarAlwaysVisible: Story = {
  render: function Render() {
    type WideRow = {
      id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      department: string;
      position: string;
      hireDate: string;
      phone: string;
      address: string;
      emergency: string;
      memo: string;
    };
    const wideColumns: ColumnDef<WideRow>[] = [
      { accessorKey: 'id', header: 'ID', size: 60 },
      { accessorKey: 'name', header: '이름', size: 120 },
      { accessorKey: 'email', header: '이메일', size: 200 },
      { accessorKey: 'role', header: '역할', size: 100 },
      { accessorKey: 'status', header: '상태', size: 100 },
      { accessorKey: 'department', header: '부서', size: 120 },
      { accessorKey: 'position', header: '직급', size: 100 },
      { accessorKey: 'hireDate', header: '입사일', size: 120 },
      { accessorKey: 'phone', header: '전화번호', size: 140 },
      { accessorKey: 'address', header: '주소', size: 200 },
      { accessorKey: 'emergency', header: '비상연락처', size: 140 },
      { accessorKey: 'memo', header: '메모', size: 120 },
    ];
    const wideData: WideRow[] = sampleUsers.slice(0, 10).map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      department: '개발팀',
      position: '사원',
      hireDate: '2024-01-01',
      phone: '010-1234-5678',
      address: '서울시 강남구',
      emergency: '010-9876-5432',
      memo: '-',
    }));
    return (
      <div style={{ width: 600 }}>
        <DataGrid
          data={wideData}
          columns={wideColumns}
          getRowId={(row) => row.id}
          maxHeight="320px"
          scrollbarType="always"
          pagination={false}
        />
      </div>
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
      <div className="flex flex-col ds-gap-24">
        <div>
          <h3 className="font-body size-md font-semibold text-default padding-y-8">
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
          <h3 className="font-body size-md font-semibold text-default padding-y-8">
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
          <h3 className="font-body size-md font-semibold text-default padding-y-8">
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
      <div className="flex flex-col ds-gap-24">
        <div>
          <h3 className="font-body size-md font-semibold text-default padding-y-8">
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
          <h3 className="font-body size-md font-semibold text-default padding-y-8">
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
          <h3 className="font-body size-md font-semibold text-default padding-y-8">
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
      <div className="flex flex-col ds-gap-24">
        <div>
          <h3 className="font-body size-md font-semibold text-default padding-y-8">
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
          <h3 className="font-body size-md font-semibold text-default padding-y-8">
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
          <h3 className="font-body size-md font-semibold text-default padding-y-8">
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
      <div className="flex flex-col ds-gap-16">
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
          <div className="flex flex-col items-center ds-gap-12 padding-y-24">
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
      <div className="flex flex-col ds-gap-16">
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
 * 컬럼 드래그 재정렬
 *
 * `enableColumnReorder`로 컬럼 헤더를 드래그하여 순서를 변경할 수 있습니다.
 *
 * - **드래그**: 컬럼 헤더를 8px 이상 이동하면 드래그 시작
 * - **클릭**: 8px 미만 이동은 정렬로 동작
 * - **정렬과 함께 사용**: 클릭=정렬, 드래그=재정렬
 */
export const WithColumnReorder: Story = {
  render: function Render() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

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
        accessorKey: 'status',
        header: '상태',
        enableSorting: true,
        cell: ({ row }) => (
          <CellBadge label={row.original.status} color={statusColorMap[row.original.status]} />
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
      <div className="flex flex-col ds-gap-16">
        <DataGrid
          data={sampleUsers}
          columns={columns}
          getRowId={(row) => row.id}
          sorting={sorting}
          onSortingChange={setSorting}
          enableColumnReorder
          columnOrder={columnOrder}
          onColumnOrderChange={setColumnOrder}
          limit={5}
        />
        {columnOrder.length > 0 && (
          <div className="font-body size-sm text-subtle">
            컬럼 순서: {columnOrder.join(' → ')}
          </div>
        )}
      </div>
    );
  },
};

/**
 * 컬럼 크기 조절
 *
 * `enableColumnResize`로 컬럼 헤더 경계를 드래그하여 너비를 조절할 수 있습니다.
 *
 * - **드래그**: 헤더 오른쪽 경계를 드래그하면 컬럼 너비 변경
 * - **최소 너비**: 50px 이하로 줄어들지 않음
 * - **fr/minmax 컬럼**: 첫 드래그 시 현재 픽셀 너비를 기준으로 변환
 */
export const ColumnResize: Story = {
  render: function Render() {
    return (
      <DataGrid
        columns={baseColumns}
        data={sampleUsers}
        enableColumnResize
        pagination={false}
        aria-label="Column resize example"
      />
    );
  },
};

/**
 * 컬럼 크기 조절 (제어 모드)
 *
 * `columnSizing`과 `onColumnSizingChange`로 외부 상태 관리가 가능합니다.
 * 아래 JSON에서 각 컬럼의 현재 픽셀 너비를 확인할 수 있습니다.
 */
export const ControlledColumnResize: Story = {
  render: function Render() {
    const [sizing, setSizing] = useState<Record<string, number>>({});

    return (
      <div className="flex flex-col ds-gap-16">
        <DataGrid
          columns={baseColumns}
          data={sampleUsers}
          enableColumnResize
          columnSizing={sizing}
          onColumnSizingChange={setSizing}
          pagination={false}
          aria-label="Controlled resize example"
        />
        {Object.keys(sizing).length > 0 && (
          <pre className="font-code size-xs text-subtle">
            {JSON.stringify(sizing, null, 2)}
          </pre>
        )}
      </div>
    );
  },
};

/**
 * 풀 기능 조합
 *
 * 정렬, 행 선택, 컬럼 재정렬, 컬럼 리사이즈, 고정 컬럼, 페이지네이션을 모두 사용하는 예시입니다.
 *
 * - **정렬**: 컬럼 헤더 클릭 (Shift+클릭으로 다중 정렬)
 * - **행 선택**: 체크박스로 행 선택
 * - **컬럼 재정렬**: 헤더를 드래그하여 순서 변경 (고정 컬럼 제외)
 * - **컬럼 리사이즈**: 헤더 오른쪽 경계를 드래그하여 너비 조절
 * - **고정 컬럼**: 선택(체크박스)과 이름 컬럼은 스크롤 시 고정
 * - **페이지네이션**: 페이지 크기 변경 및 페이지 이동
 */
export const FullFeaturedCombination: Story = {
  render: function Render() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [limit, setLimit] = useState(10);

    interface FullUser {
      id: string;
      name: string;
      email: string;
      department: string;
      position: string;
      phone: string;
      joinDate: string;
      status: 'active' | 'inactive' | 'pending';
      progress: number;
    }

    const fullUsers: FullUser[] = Array.from({ length: 50 }, (_, i) => ({
      id: String(i + 1),
      name: `사용자 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: ['개발팀', '디자인팀', '마케팅팀'][i % 3],
      position: ['사원', '대리', '과장'][i % 3],
      phone: `010-${String(1000 + i).padStart(4, '0')}-${String(2000 + i).padStart(4, '0')}`,
      joinDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-15`,
      status: (['active', 'inactive', 'pending'] as const)[i % 3],
      progress: Math.floor((i * 17) % 100),
    }));

    const columns: ColumnDef<FullUser>[] = useMemo(
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
        {
          accessorKey: 'name',
          header: '이름',
          enableSorting: true,
          cell: ({ row }) => <CellText value={row.original.name} />,
          meta: { width: '100px', sticky: true },
        },
        {
          accessorKey: 'email',
          header: '이메일',
          enableSorting: true,
          cell: ({ row }) => <CellText value={row.original.email} tooltip />,
          meta: { width: '180px' },
        },
        {
          accessorKey: 'department',
          header: '부서',
          enableSorting: true,
          cell: ({ row }) => <CellText value={row.original.department} />,
          meta: { width: '120px' },
        },
        {
          accessorKey: 'position',
          header: '직책',
          enableSorting: true,
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
          enableSorting: true,
          cell: ({ row }) => <CellText value={row.original.joinDate} />,
          meta: { width: '120px' },
        },
        {
          accessorKey: 'status',
          header: '상태',
          enableSorting: true,
          cell: ({ row }) => (
            <CellBadge
              label={row.original.status}
              color={statusColorMap[row.original.status]}
            />
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
      ],
      []
    );

    return (
      <DataGrid
        data={fullUsers}
        columns={columns}
        getRowId={(row) => row.id}
        sorting={sorting}
        onSortingChange={setSorting}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableRowSelection
        enableColumnReorder
        columnOrder={columnOrder}
        onColumnOrderChange={setColumnOrder}
        enableColumnResize
        maxHeight="400px"
        limit={limit}
        limitOptions={[5, 10, 20, 50]}
        onLimitChange={setLimit}
        showItemCount
        limitOptionLabel={(n) => `${n}개씩 보기`}
        aria-label="Full featured DataGrid"
      />
    );
  },
};

/**
 * `footerRow` - 하단 고정 요약 행 (신규 v1.7.0)
 *
 * `footerRow` prop에 `{ [columnId]: ReactNode }` 맵을 전달하면 본문 아래에
 * 컬럼 정렬된 sticky footer 행이 렌더됩니다. 통계 테이블의 "합계" 행용.
 *
 * **확인 포인트:**
 * - 스크롤을 내리면 합계 행이 viewport 하단에 고정
 * - 각 셀이 해당 컬럼 너비와 일치
 * - sticky 컬럼 (이름)도 footer에서 동일하게 좌측 고정
 * - footer 셀도 컬럼 정렬(`meta.align`) 준수
 */
export const WithFooterRow: Story = {
  render: function Render() {
    interface Stat {
      id: string;
      name: string;
      calls: number;
      resolved: number;
      avgTime: number;
    }
    const data: Stat[] = Array.from({ length: 30 }, (_, i) => ({
      id: String(i + 1),
      name: `상담사 ${i + 1}`,
      calls: Math.floor(Math.random() * 200) + 50,
      resolved: Math.floor(Math.random() * 180) + 30,
      avgTime: Math.floor(Math.random() * 300) + 60,
    }));

    const totalCalls = data.reduce((s, d) => s + d.calls, 0);
    const totalResolved = data.reduce((s, d) => s + d.resolved, 0);
    const avgAll = Math.round(
      data.reduce((s, d) => s + d.avgTime, 0) / data.length
    );

    const columns: ColumnDef<Stat>[] = [
      {
        accessorKey: 'name',
        header: '상담사',
        cell: ({ row }) => <CellText value={row.original.name} />,
        meta: { width: '160px', sticky: true },
      },
      {
        accessorKey: 'calls',
        header: '인입 건수',
        cell: ({ row }) => <CellText value={row.original.calls} />,
        meta: { width: '140px', align: 'right' },
      },
      {
        accessorKey: 'resolved',
        header: '처리 건수',
        cell: ({ row }) => <CellText value={row.original.resolved} />,
        meta: { width: '140px', align: 'right' },
      },
      {
        accessorKey: 'avgTime',
        header: '평균 응답 (초)',
        cell: ({ row }) => <CellText value={row.original.avgTime} />,
        meta: { width: '160px', align: 'right' },
      },
    ];

    return (
      <DataGrid
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        maxHeight="300px"
        pagination={false}
        footerRow={{
          name: <span className="font-semibold">합계 / 평균</span>,
          calls: totalCalls,
          resolved: totalResolved,
          avgTime: `~${avgAll}`,
        }}
        aria-label="Stats with footer row"
      />
    );
  },
};

/**
 * 수평 컬럼 가상화 - 44 컬럼 × 500 행 (신규 v1.7.0)
 *
 * 컬럼 수가 `virtualizationThreshold.columns` (기본 30)를 초과하면 자동으로
 * 수평 컬럼 가상화가 활성됩니다. viewport 내 컬럼 + overscan만 마운트됩니다.
 *
 * **확인 포인트:**
 * - 초기 렌더에 전체 44 × visibleRows 개의 셀이 아닌, viewport 내 컬럼만 마운트
 * - 가로로 스크롤하면 새 컬럼이 나타나고 벗어나는 컬럼은 unmount
 * - 첫 번째 컬럼 (sticky) 은 스크롤과 무관하게 항상 보임
 * - 세로 스크롤도 정상 (행 가상화 - 500 > 100 threshold)
 * - DevTools Elements 탭에서 실제 렌더된 `[role=gridcell]` 수를 확인하면 크게 줄어있음
 */
export const HorizontalColumnVirtualization: Story = {
  render: function Render() {
    interface Row {
      id: string;
      [key: string]: string;
    }
    const colCount = 44;
    const rowCount = 500;

    const data: Row[] = useMemo(
      () =>
        Array.from({ length: rowCount }, (_, r) => {
          const row: Row = { id: String(r + 1) };
          for (let c = 0; c < colCount; c++) {
            row[`col${c}`] = `R${r + 1}C${c + 1}`;
          }
          return row;
        }),
      []
    );

    const columns: ColumnDef<Row>[] = useMemo(() => {
      const cols: ColumnDef<Row>[] = [
        {
          accessorKey: 'id',
          header: '#',
          cell: ({ row }) => <CellText value={row.original.id} />,
          meta: { width: '60px', sticky: true },
        },
      ];
      for (let c = 0; c < colCount; c++) {
        cols.push({
          accessorKey: `col${c}`,
          header: `Col ${c + 1}`,
          cell: ({ row }) => <CellText value={row.original[`col${c}`]} />,
          meta: { width: '140px' },
        });
      }
      return cols;
    }, []);

    return (
      <DataGrid
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        maxHeight="400px"
        pagination={false}
        aria-label="Virtualized 44 cols x 500 rows"
      />
    );
  },
};

/**
 * `overscan` 과 `virtualizationThreshold` 커스텀 (신규 v1.7.0)
 *
 * 두 prop은 `number` 또는 `{ rows, columns }` 형태를 허용합니다.
 * 소규모 데이터셋에서 가상화를 강제하거나 (threshold 를 낮춰서),
 * overscan 을 조정해 스크롤 부드러움 ↔ commit 시간 트레이드오프를 튜닝합니다.
 *
 * **확인 포인트:**
 * - 10 행 / 10 컬럼이지만 threshold 가 낮아 가상화 활성
 * - overscan 0 으로 설정되어 viewport 밖 셀이 즉시 unmount (빠른 commit)
 */
export const VirtualizationTuning: Story = {
  render: function Render() {
    interface Row {
      id: string;
      [key: string]: string;
    }
    const data: Row[] = Array.from({ length: 20 }, (_, r) => {
      const row: Row = { id: String(r + 1) };
      for (let c = 0; c < 10; c++) row[`col${c}`] = `R${r + 1}C${c + 1}`;
      return row;
    });

    const columns: ColumnDef<Row>[] = [
      {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }) => <CellText value={row.original.id} />,
        meta: { width: '60px', sticky: true },
      },
      ...Array.from({ length: 10 }, (_, c) => ({
        accessorKey: `col${c}`,
        header: `Col ${c + 1}`,
        cell: ({ row }: { row: { original: Row } }) => (
          <CellText value={row.original[`col${c}`]} />
        ),
        meta: { width: '140px' },
      })),
    ];

    return (
      <DataGrid
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        maxHeight="300px"
        pagination={false}
        virtualizationThreshold={{ rows: 5, columns: 3 }}
        overscan={{ rows: 2, columns: 0 }}
        aria-label="Tuned virtualization"
      />
    );
  },
};

/**
 * 행 + 컬럼 가상화 동시 활성 (v1.9.16 회귀 검증)
 *
 * 행 가상화 (`rows > virtualizationThreshold.rows`) 와 컬럼 가상화
 * (`columns > virtualizationThreshold.columns`) 가 함께 동작하는지 확인하는 스토리.
 *
 * v1.9.15 까지 행 가상화 활성 분기에서 `visibleColumnIndices` 를 자식 `DataGridRow`
 * 에 전달하지 않아, 두 가상화를 동시에 쓰면 컬럼 가상화가 silent 하게 무시됨.
 * v1.9.16 에서 수정.
 *
 * **컬럼 너비 규칙 (CRITICAL):**
 * 컬럼 가상화는 모든 컬럼의 너비를 픽셀로 미리 계산할 수 있을 때만 활성됩니다.
 * 하나라도 아래 패턴을 쓰면 안전을 위해 컬럼 가상화가 자동으로 OFF 됩니다.
 *
 * | `meta.width` | 컬럼 가상화 | 비고 |
 * |---|---|---|
 * | `'200px'`, `'200'` | ✅ ON | 명시적 px |
 * | `'minmax(200px, 1fr)'` | ✅ ON (v1.9.17+) | min 이 px 면 OK — `1fr` 은 남는 공간만 분배하므로 스크롤 시 정확히 min 에 고정 |
 * | `'minmax(200px, 500px)'` | ✅ ON (v1.9.17+) | 동일 — min 기준으로 추정 |
 * | `'1fr'` 단독 | ❌ OFF | min floor 없음 → 위치 추정 불가 |
 * | `'auto'` | ❌ OFF | content 의존 |
 * | `'50%'` | ❌ OFF | container 의존 |
 * | `'minmax(0, 1fr)'` | ❌ OFF | min 이 0 = 사실상 floor 없음 |
 *
 * 컬럼 가상화가 OFF 되어도 그리드 자체는 정상 동작 (행 가상화는 그대로 활성).
 * 단지 가로 스크롤 시 모든 컬럼이 항상 마운트되어 perf 이점이 사라질 뿐.
 *
 * **확인 포인트:**
 * - 데이터셋 크기: 1000 rows × 50 cols (= 50,000 셀) — 가상화 없으면 브라우저가 멈춤
 * - DevTools Elements 탭에서 `[role=gridcell]` 카운트가 viewport 내 셀 수 (≒ 행 × 컬럼) 만큼만 나와야 함
 * - 가로 스크롤: 새 컬럼 mount, 벗어난 컬럼 unmount (← v1.9.16 의 fix)
 * - 세로 스크롤: 새 행 mount, 벗어난 행 unmount
 * - 양방향 스크롤 후에도 sticky 컬럼 (`#`) 은 항상 좌측 고정
 * - 헤더 정렬과 본문 컬럼 정렬이 어긋나지 않음
 *
 * **회귀 시나리오:**
 * 만약 컬럼 가상화가 깨지면 → 가로 스크롤해도 우측 컬럼이 안 나타나거나,
 * `[role=gridcell]` 카운트가 (visibleRows × 50) 으로 나옴 (50 컬럼 전부 렌더).
 */
export const CombinedRowAndColumnVirtualization: Story = {
  render: function Render() {
    interface Row {
      id: string;
      [key: string]: string;
    }
    const colCount = 50;
    const rowCount = 1000;

    const data: Row[] = useMemo(
      () =>
        Array.from({ length: rowCount }, (_, r) => {
          const row: Row = { id: String(r + 1) };
          for (let c = 0; c < colCount; c++) {
            row[`col${c}`] = `R${r + 1}C${c + 1}`;
          }
          return row;
        }),
      []
    );

    const columns: ColumnDef<Row>[] = useMemo(() => {
      const cols: ColumnDef<Row>[] = [
        {
          accessorKey: 'id',
          header: '#',
          cell: ({ row }) => <CellText value={row.original.id} />,
          meta: { width: '60px', sticky: true },
        },
      ];
      for (let c = 0; c < colCount; c++) {
        cols.push({
          accessorKey: `col${c}`,
          header: `Col ${c + 1}`,
          cell: ({ row }) => <CellText value={row.original[`col${c}`]} />,
          meta: { width: '120px' },
        });
      }
      return cols;
    }, []);

    return (
      <DataGrid
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        maxHeight="400px"
        pagination={false}
        aria-label="Combined row + column virtualization (1000 rows x 50 cols)"
      />
    );
  },
};

/**
 * 컬럼 너비 vs 컬럼 가상화 — 어떤 너비가 가상화를 깨뜨리는가
 *
 * 컬럼 가상화는 모든 컬럼의 위치를 픽셀로 미리 알 수 있을 때만 활성됩니다.
 * 이 스토리는 `1fr` 단독 사용이 컬럼 가상화를 자동 비활성화시키는 것을 보여줍니다.
 *
 * **이 스토리에서 일어나는 일:**
 * - 50 컬럼 중 한 컬럼만 `meta.width: '1fr'` 로 지정 (나머지는 모두 px)
 * - 컬럼 수 (50) > threshold (30) 이므로 컬럼 가상화 활성 조건은 충족
 * - 그러나 `1fr` 컬럼이 하나라도 있으면 안전을 위해 컬럼 가상화 OFF
 * - DevTools 에서 `[role=gridcell]` 카운트가 (visibleRows × 50) 으로 모든 컬럼 마운트되는 것을 확인
 *
 * **해결 방법:** `'1fr'` → `'minmax(200px, 1fr)'` 로 바꾸면 컬럼 가상화 ON.
 * `minmax(<min>px, ...)` 은 가로 스크롤 시 정확히 `<min>` 에 고정되므로 위치 계산이 정확함.
 *
 * **이 동작이 의도된 이유:**
 * `1fr` 만으로는 컬럼 너비를 미리 계산할 수 없음 → 잘못된 위치 추정으로 컬럼이 silent 하게
 * 사라지는 것보다 가상화를 끄는 편이 안전 (v1.9.15 부터).
 */
export const ColumnVirtualizationWithFluidWidth: Story = {
  render: function Render() {
    interface Row {
      id: string;
      [key: string]: string;
    }
    const colCount = 50;
    const rowCount = 200;

    const data: Row[] = useMemo(
      () =>
        Array.from({ length: rowCount }, (_, r) => {
          const row: Row = { id: String(r + 1) };
          for (let c = 0; c < colCount; c++) {
            row[`col${c}`] = `R${r + 1}C${c + 1}`;
          }
          return row;
        }),
      []
    );

    const columns: ColumnDef<Row>[] = useMemo(() => {
      const cols: ColumnDef<Row>[] = [
        {
          accessorKey: 'id',
          header: '#',
          cell: ({ row }) => <CellText value={row.original.id} />,
          meta: { width: '60px', sticky: true },
        },
      ];
      for (let c = 0; c < colCount; c++) {
        cols.push({
          accessorKey: `col${c}`,
          header: c === 0 ? `Col 1 (1fr — disables col virt)` : `Col ${c + 1}`,
          cell: ({ row }) => <CellText value={row.original[`col${c}`]} />,
          // 첫 컬럼만 1fr → 컬럼 가상화 자동 OFF
          meta: { width: c === 0 ? '1fr' : '120px' },
        });
      }
      return cols;
    }, []);

    return (
      <DataGrid
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        maxHeight="400px"
        pagination={false}
        aria-label="Column virt disabled because of 1fr width"
      />
    );
  },
};

/**
 * `CellText` `copyValue` - display 와 copy 분리 (신규 v1.7.0)
 *
 * `value`는 truncate된 짧은 텍스트로 표시하고, `copyable` 클릭 시에는 `copyValue`
 * (원문 전체)가 클립보드에 복사됩니다. 5KB 메모 필드처럼 CSS truncate 비용을
 * 피하면서 copy 무결성을 유지해야 할 때 사용합니다.
 *
 * **확인 포인트:**
 * - 셀 표시 텍스트는 짧은 "요약..." 버전
 * - copy 아이콘 클릭 → 클립보드에 긴 원문 전체가 복사됨 (devtools console로 확인)
 * - `onCopy` 콜백은 실제 복사된 긴 텍스트를 받음
 */
export const CellTextCopyValue: Story = {
  render: function Render() {
    const fullMemo =
      '이것은 매우 긴 상담 메모입니다. 고객이 제품 사용 중 발생한 문제에 대해 상세히 설명했고, 담당자는 각 단계별로 해결 방안을 제시했습니다. 최종적으로 환불 처리 및 대체품 배송으로 마무리되었습니다.';
    const shortSummary = fullMemo.slice(0, 30) + '...';

    interface Item {
      id: string;
      memo: string;
    }
    const data: Item[] = [
      { id: '1', memo: fullMemo },
      { id: '2', memo: fullMemo },
    ];

    const columns: ColumnDef<Item>[] = [
      {
        accessorKey: 'memo',
        header: '메모 (표시: 요약, 복사: 원문)',
        cell: () => (
          <CellText
            value={shortSummary}
            copyValue={fullMemo}
            copyable
            onCopy={(v) => {
              console.log('Copied:', v);
            }}
          />
        ),
        meta: { width: '400px' },
      },
    ];

    return (
      <DataGrid
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={false}
        aria-label="CellText copyValue demo"
      />
    );
  },
};
