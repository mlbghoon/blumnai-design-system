import { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../Table';
import type { TableProps } from '../Table.types';
import { Checkbox } from '../../checkbox/Checkbox';

const meta: Meta<TableProps> = {
  title: 'Components/Table/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  argTypes: {
    striped: {
      control: 'boolean',
      description: '줄무늬 행 스타일 사용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    bordered: {
      control: 'boolean',
      description: '테두리 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    minHeight: {
      control: 'text',
      description: '테이블 컨테이너의 최소 높이',
      table: {
        type: { summary: 'string' },
      },
    },
    maxHeight: {
      control: 'text',
      description: '테이블 컨테이너의 최대 높이 (스크롤 활성화)',
      table: {
        type: { summary: 'string' },
      },
    },
    stickyHeader: {
      control: 'boolean',
      description: '헤더 고정 여부 (스크롤 시 상단에 고정)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    pagination: {
      control: 'boolean',
      description: '페이지네이션 UI 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    page: {
      control: 'number',
      description: '현재 페이지 (1-indexed)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    totalPages: {
      control: 'number',
      description: '전체 페이지 수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    onPageChange: {
      action: 'pageChanged',
      description: '페이지 변경 콜백',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
    limit: {
      control: 'number',
      description: '페이지당 아이템 수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    limitOptions: {
      control: 'object',
      description: '페이지당 아이템 수 옵션 목록',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[10, 20, 50, 100]' },
      },
    },
    onLimitChange: {
      action: 'limitChanged',
      description: '페이지당 아이템 수 변경 콜백',
      table: {
        type: { summary: '(limit: number) => void' },
      },
    },
    paginationAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '페이지네이션 정렬 위치',
      table: {
        type: { summary: "'left' | 'center' | 'right'" },
        defaultValue: { summary: "'right'" },
      },
    },
    showItemCount: {
      control: 'boolean',
      description: '아이템 수 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    total: {
      control: 'number',
      description: '전체 아이템 수',
      table: {
        type: { summary: 'number' },
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
type Story = StoryObj<TableProps>;

const sampleData = [
  { id: '1', name: '홍길동', email: 'hong@example.com', role: '관리자', status: '활성' },
  { id: '2', name: '김철수', email: 'kim@example.com', role: '편집자', status: '활성' },
  { id: '3', name: '이영희', email: 'lee@example.com', role: '뷰어', status: '비활성' },
  { id: '4', name: '박민수', email: 'park@example.com', role: '편집자', status: '활성' },
  { id: '5', name: '최지은', email: 'choi@example.com', role: '관리자', status: '활성' },
];

const largeData = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  name: `사용자 ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['관리자', '편집자', '뷰어'][i % 3],
  status: i % 4 === 0 ? '비활성' : '활성',
}));

/**
 * 기본 테이블
 *
 * 심플한 HTML 테이블 컴포넌트입니다. 32px 행 높이를 기본으로 합니다.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: false },
  },
  args: {
    striped: false,
    bordered: false,
  },
  render: function Render(args) {
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-striped={args.striped || undefined}>
          {sampleData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 줄무늬 스타일
 *
 * `striped` prop으로 짝수 행에 배경색을 적용합니다.
 */
export const Striped: Story = {
  render: function Render() {
    return (
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-striped>
          {sampleData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 테두리 스타일
 *
 * `bordered` prop으로 테이블 외곽 테두리를 추가합니다.
 */
export const Bordered: Story = {
  render: function Render() {
    return (
      <Table bordered>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 정렬 가능한 헤더
 *
 * `sortable` prop으로 정렬 가능한 컬럼을 지정합니다.
 */
export const SortableHeader: Story = {
  render: function Render() {
    return (
      <Table bordered>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="asc">
              이름
            </TableHead>
            <TableHead sortable>이메일</TableHead>
            <TableHead sortable sortDirection="desc">
              역할
            </TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 체크박스 선택
 *
 * 체크박스를 사용한 행 선택 예시입니다.
 */
export const WithCheckbox: Story = {
  render: function Render() {
    return (
      <Table bordered>
        <TableHeader>
          <TableRow>
            <TableHead className="width-40">
              <Checkbox />
            </TableHead>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="width-40">
                <Checkbox />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 선택된 행
 *
 * `selected` prop으로 선택된 행을 표시합니다.
 */
export const SelectedRow: Story = {
  render: function Render() {
    return (
      <Table bordered>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user, index) => (
            <TableRow key={user.id} selected={index === 1 || index === 3}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 스크롤 및 고정 헤더
 *
 * `maxHeight`와 `stickyHeader`를 사용하여 스크롤 가능한 테이블을 만듭니다.
 */
export const ScrollWithStickyHeader: Story = {
  render: function Render() {
    return (
      <Table bordered maxHeight="300px" stickyHeader>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {largeData.slice(0, 20).map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 로딩 상태
 *
 * `isLoading` prop으로 로딩 오버레이를 표시합니다.
 */
export const Loading: Story = {
  render: function Render() {
    return (
      <Table bordered isLoading>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 페이지네이션
 *
 * `pagination` prop으로 페이지네이션 UI를 표시합니다.
 * 사용자가 직접 데이터 슬라이싱을 관리합니다.
 */
export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const limit = 5;
    const paginatedData = largeData.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(largeData.length / limit);

    return (
      <Table
        bordered
        pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        showItemCount
        total={largeData.length}
        limit={limit}
      >
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 페이지당 아이템 수 변경
 *
 * `onLimitChange`와 `limitOptions`로 페이지당 아이템 수를 변경할 수 있습니다.
 */
export const WithLimitSelector: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const paginatedData = largeData.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(largeData.length / limit);

    const handleLimitChange = (newLimit: number) => {
      setLimit(newLimit);
      setPage(1);
    };

    return (
      <Table
        bordered
        pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        limitOptions={[5, 10, 20, 50]}
        onLimitChange={handleLimitChange}
        showItemCount
        total={largeData.length}
      >
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 페이지네이션 정렬
 *
 * `paginationAlign`으로 페이지네이션 위치를 변경합니다.
 */
export const PaginationAlignment: Story = {
  render: function Render() {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);
    const limit = 3;

    const getData = (p: number) => sampleData.slice((p - 1) * limit, p * limit);
    const totalPages = Math.ceil(sampleData.length / limit);

    return (
      <div className="flex flex-col gap-24">
        <div>
          <p className="font-body size-sm text-subtle padding-y-4">paginationAlign=&quot;left&quot;</p>
          <Table
            bordered
            pagination
            page={page1}
            totalPages={totalPages}
            onPageChange={setPage1}
            paginationAlign="left"
            showItemCount
            total={sampleData.length}
            limit={limit}
          >
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getData(page1).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <p className="font-body size-sm text-subtle padding-y-4">paginationAlign=&quot;center&quot;</p>
          <Table
            bordered
            pagination
            page={page2}
            totalPages={totalPages}
            onPageChange={setPage2}
            paginationAlign="center"
          >
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getData(page2).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <p className="font-body size-sm text-subtle padding-y-4">paginationAlign=&quot;right&quot; (기본값)</p>
          <Table
            bordered
            pagination
            page={page3}
            totalPages={totalPages}
            onPageChange={setPage3}
            paginationAlign="right"
            showItemCount
            total={sampleData.length}
            limit={limit}
          >
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getData(page3).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  },
};

/**
 * 정렬 상태 관리
 *
 * 정렬은 사용자가 직접 상태를 관리합니다.
 * `sortable`, `sortDirection`, `onClick`을 사용합니다.
 */
export const SortingWithState: Story = {
  render: function Render() {
    const [sortKey, setSortKey] = useState<string | null>('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    const sortedData = useMemo(() => {
      if (!sortKey) return sampleData;
      return [...sampleData].sort((a, b) => {
        const aVal = a[sortKey as keyof typeof a];
        const bVal = b[sortKey as keyof typeof b];
        const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }, [sortKey, sortDir]);

    const handleSort = (key: string) => {
      if (sortKey === key) {
        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
    };

    return (
      <Table bordered>
        <TableHeader>
          <TableRow>
            <TableHead
              sortable
              sortDirection={sortKey === 'name' ? sortDir : false}
              onClick={() => handleSort('name')}
            >
              이름
            </TableHead>
            <TableHead
              sortable
              sortDirection={sortKey === 'email' ? sortDir : false}
              onClick={() => handleSort('email')}
            >
              이메일
            </TableHead>
            <TableHead
              sortable
              sortDirection={sortKey === 'role' ? sortDir : false}
              onClick={() => handleSort('role')}
            >
              역할
            </TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 행 선택 상태 관리
 *
 * 행 선택은 사용자가 직접 상태를 관리합니다.
 */
export const RowSelectionWithState: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const toggleRow = (id: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    const toggleAll = () => {
      if (selected.size === sampleData.length) {
        setSelected(new Set());
      } else {
        setSelected(new Set(sampleData.map((d) => d.id)));
      }
    };

    const allSelected = selected.size === sampleData.length;
    const someSelected = selected.size > 0 && selected.size < sampleData.length;
    const parentChecked: boolean | 'indeterminate' = allSelected
      ? true
      : someSelected
        ? 'indeterminate'
        : false;

    return (
      <Table bordered>
        <TableHeader>
          <TableRow>
            <TableHead className="width-40">
              <Checkbox
                checked={parentChecked}
                onChange={toggleAll}
              />
            </TableHead>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user) => (
            <TableRow key={user.id} selected={selected.has(user.id)}>
              <TableCell className="width-40">
                <Checkbox
                  checked={selected.has(user.id)}
                  onChange={() => toggleRow(user.id)}
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * 모든 기능 조합
 *
 * 스크롤, 고정 헤더, 페이지네이션, 정렬을 모두 사용하는 예시입니다.
 */
export const FullFeatured: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortKey, setSortKey] = useState<string | null>('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [isLoading, setIsLoading] = useState(false);

    const sortedData = useMemo(() => {
      if (!sortKey) return largeData;
      return [...largeData].sort((a, b) => {
        const aVal = a[sortKey as keyof typeof a];
        const bVal = b[sortKey as keyof typeof b];
        const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }, [sortKey, sortDir]);

    const paginatedData = sortedData.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(largeData.length / limit);

    const handleSort = (key: string) => {
      setIsLoading(true);
      setTimeout(() => {
        if (sortKey === key) {
          setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
          setSortKey(key);
          setSortDir('asc');
        }
        setIsLoading(false);
      }, 300);
    };

    const handleLimitChange = (newLimit: number) => {
      setLimit(newLimit);
      setPage(1);
    };

    return (
      <Table
        bordered
        maxHeight="400px"
        stickyHeader
        isLoading={isLoading}
        pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        limitOptions={[10, 20, 50]}
        onLimitChange={handleLimitChange}
        showItemCount
        total={largeData.length}
      >
        <TableHeader>
          <TableRow>
            <TableHead
              sortable
              sortDirection={sortKey === 'name' ? sortDir : false}
              onClick={() => handleSort('name')}
            >
              이름
            </TableHead>
            <TableHead
              sortable
              sortDirection={sortKey === 'email' ? sortDir : false}
              onClick={() => handleSort('email')}
            >
              이메일
            </TableHead>
            <TableHead
              sortable
              sortDirection={sortKey === 'role' ? sortDir : false}
              onClick={() => handleSort('role')}
            >
              역할
            </TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/**
 * ## Table vs DataGrid 아키텍처 비교
 *
 * ### 핵심 차이점
 *
 * **Table** - Compositional Pattern (JSX 직접 작성)
 * ```tsx
 * <Table>
 *   <TableBody>
 *     {data.map(item => <TableRow>...</TableRow>)}
 *   </TableBody>
 * </Table>
 * ```
 *
 * **DataGrid** - Declarative Pattern (데이터 + 컬럼 설정)
 * ```tsx
 * <DataGrid data={data} columns={columns} />
 * ```
 *
 * ---
 *
 * ## Table에서 지원하지 않는 기능과 기술적 이유
 *
 * ### 1. sorting / onSortingChange - 정렬 상태 관리
 *
 * **왜 지원하지 않는가?**
 *
 * Table은 compositional 패턴으로, 컴포넌트가 데이터 구조를 알지 못합니다.
 *
 * ```tsx
 * // Table은 이 구조를 모릅니다
 * <TableHead sortable sortDirection="asc">Name</TableHead>
 * <TableHead sortable>Email</TableHead>
 * ```
 *
 * 정렬 상태 관리를 위해서는:
 * 1. 어떤 컬럼이 정렬 가능한지 알아야 함
 * 2. 각 컬럼의 고유 ID가 필요함
 * 3. 정렬 시 데이터를 재정렬해야 함
 *
 * Table은 `<TableHead>`가 몇 개인지, 어떤 데이터 필드에 매핑되는지 모릅니다.
 * DataGrid는 `columns` 배열로 이 정보를 가지고 있어 자동 관리가 가능합니다.
 *
 * **Table에서 정렬 구현 방법:**
 * ```tsx
 * const [sortKey, setSortKey] = useState<string | null>(null);
 * const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
 *
 * const sortedData = useMemo(() => {
 *   if (!sortKey) return data;
 *   return [...data].sort((a, b) => {
 *     const cmp = a[sortKey] > b[sortKey] ? 1 : -1;
 *     return sortDir === 'asc' ? cmp : -cmp;
 *   });
 * }, [data, sortKey, sortDir]);
 *
 * <TableHead
 *   sortable
 *   sortDirection={sortKey === 'name' ? sortDir : false}
 *   onClick={() => handleSort('name')}
 * >
 *   Name
 * </TableHead>
 * ```
 *
 * ---
 *
 * ### 2. rowSelection / onRowSelectionChange - 행 선택 상태 관리
 *
 * **왜 지원하지 않는가?**
 *
 * 행 선택을 관리하려면:
 * 1. 각 행의 고유 ID를 알아야 함 (DataGrid는 `getRowId` prop으로 제공)
 * 2. 어떤 행이 선택 가능한지 알아야 함 (`enableRowSelection`)
 * 3. 전체 선택 로직 (header checkbox)을 구현해야 함
 *
 * Table은 `<TableRow>`가 어떤 데이터를 나타내는지 모릅니다.
 *
 * **Table에서 행 선택 구현 방법:**
 * ```tsx
 * const [selected, setSelected] = useState<Set<string>>(new Set());
 *
 * const toggleRow = (id: string) => {
 *   setSelected(prev => {
 *     const next = new Set(prev);
 *     if (next.has(id)) next.delete(id);
 *     else next.add(id);
 *     return next;
 *   });
 * };
 *
 * <TableRow selected={selected.has(item.id)}>
 *   <TableCell>
 *     <Checkbox checked={selected.has(item.id)} onChange={() => toggleRow(item.id)} />
 *   </TableCell>
 * </TableRow>
 * ```
 *
 * ---
 *
 * ### 3. preserveDataWhileLoading - 로딩 중 데이터 유지
 *
 * **왜 지원하지 않는가?**
 *
 * 이 기능은 이전 데이터를 메모리에 저장하고, 새 데이터가 로드될 때까지 표시합니다.
 *
 * ```tsx
 * // DataGrid 내부 구현 (useDataGridTable.ts)
 * const previousDataRef = useRef<T[]>(data);
 *
 * useEffect(() => {
 *   if (!isLoading && data.length > 0) {
 *     previousDataRef.current = data;
 *   }
 * }, [data, isLoading]);
 *
 * const displayData = isLoading && preserveDataWhileLoading
 *   ? previousDataRef.current
 *   : data;
 * ```
 *
 * Table은 데이터 배열을 받지 않고 children으로 JSX를 받기 때문에,
 * "이전 children"을 저장하고 표시하는 것은 React 패턴에 맞지 않습니다.
 *
 * ---
 *
 * ### 4. 서버사이드 페이지네이션 / 정렬 / 필터링
 *
 * **왜 지원하지 않는가?**
 *
 * DataGrid의 서버사이드 모드는 다음과 같이 작동합니다:
 *
 * 1. `onPageChange`, `onSortingChange` 등 콜백이 제공되면 서버사이드로 판단
 * 2. TanStack Table의 client-side row model을 비활성화
 * 3. 부모 컴포넌트가 API 호출 후 새 데이터를 전달
 *
 * ```tsx
 * // DataGrid 서버사이드 모드
 * const isServerSide = onPageChange !== undefined || onSortingChange !== undefined;
 *
 * useReactTable({
 *   manualSorting: isServerSide,
 *   manualFiltering: isServerSide,
 *   manualPagination: isServerSide,
 *   getSortedRowModel: isServerSide ? undefined : getSortedRowModel(),
 * });
 * ```
 *
 * Table은 데이터 배열을 관리하지 않으므로, 서버사이드 로직을 구현할 수 없습니다.
 * 단, 페이지네이션 UI는 제공하므로, 부모 컴포넌트에서 직접 API 호출을 처리하면 됩니다.
 *
 * ---
 *
 * ## 기능 비교표
 *
 * | 기능 | Table | DataGrid | 설명 |
 * |------|:-----:|:--------:|------|
 * | rowSpan/colSpan | ✅ | ❌ | HTML table 네이티브 기능 |
 * | 중첩 테이블 | ✅ | ❌ | 셀 안에 또 다른 테이블 |
 * | 비정형 행 구조 | ✅ | ❌ | 행마다 다른 셀 개수 |
 * | 정렬 상태 관리 | 수동 | 자동 | DataGrid는 TanStack Table 사용 |
 * | 행 선택 상태 관리 | 수동 | 자동 | DataGrid는 getRowId로 식별 |
 * | 페이지네이션 UI | ✅ | ✅ | 둘 다 Pagination 컴포넌트 사용 |
 * | 로딩 오버레이 | ✅ | ✅ | isLoading prop |
 * | 로딩 중 데이터 유지 | ❌ | ✅ | preserveDataWhileLoading |
 * | 서버사이드 모드 | ❌ | ✅ | 자동 감지 및 처리 |
 * | 빈 상태 | ❌ | ✅ | emptyText, emptyContent |
 * | 에러 상태 | ❌ | ✅ | error, onRetry |
 *
 * ---
 *
 * ## 선택 가이드
 *
 * **Table 선택:**
 * - `rowSpan`/`colSpan`이 필요한 경우
 * - 행마다 구조가 다른 복잡한 레이아웃
 * - 정적 콘텐츠 (데이터 배열 없이)
 * - 완전한 마크업 제어가 필요한 경우
 *
 * **DataGrid 선택:**
 * - 정형화된 데이터 배열 표시
 * - 정렬/필터링/페이지네이션 자동 관리 필요
 * - 행 선택 기능 필요
 * - 서버사이드 페이지네이션 필요
 * - 로딩/빈/에러 상태 자동 처리 필요
 */
export const ComparisonGuide: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-24">
        <div>
          <h3 className="font-body size-lg font-bold text-default padding-y-8">
            Table - rowSpan/colSpan 예시
          </h3>
          <Table bordered>
            <TableHeader>
              <TableRow>
                <TableHead rowSpan={2}>이름</TableHead>
                <TableHead colSpan={2}>연락처</TableHead>
                <TableHead rowSpan={2}>역할</TableHead>
              </TableRow>
              <TableRow>
                <TableHead>이메일</TableHead>
                <TableHead>전화번호</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell rowSpan={2}>홍길동</TableCell>
                <TableCell>hong@example.com</TableCell>
                <TableCell>010-1234-5678</TableCell>
                <TableCell rowSpan={2}>관리자</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>hong2@example.com</TableCell>
                <TableCell>010-8765-4321</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>김철수</TableCell>
                <TableCell>kim@example.com</TableCell>
                <TableCell>010-1111-2222</TableCell>
                <TableCell>편집자</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="font-body size-sm text-subtle padding-y-8">
            DataGrid는 이러한 복잡한 셀 병합 구조를 지원하지 않습니다.
          </p>
        </div>

        <div>
          <h3 className="font-body size-lg font-bold text-default padding-y-8">
            Table - 중첩 테이블 예시
          </h3>
          <Table bordered>
            <TableHeader>
              <TableRow>
                <TableHead>부서</TableHead>
                <TableHead>구성원</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>개발팀</TableCell>
                <TableCell className="padding-0">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>홍길동</TableCell>
                        <TableCell>백엔드</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>김철수</TableCell>
                        <TableCell>프론트엔드</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>디자인팀</TableCell>
                <TableCell className="padding-0">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>이영희</TableCell>
                        <TableCell>UI/UX</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="font-body size-sm text-subtle padding-y-8">
            DataGrid는 중첩 테이블 구조를 지원하지 않습니다.
          </p>
        </div>
      </div>
    );
  },
};
