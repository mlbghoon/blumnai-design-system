import type { Meta, StoryObj } from '@storybook/react';

import { CellText } from '../cells/CellText';
import { CellBadge } from '../cells/CellBadge';
import { CellAvatar } from '../cells/CellAvatar';
import { CellProgress } from '../cells/CellProgress';
import { CellLink } from '../cells/CellLink';
import { cn } from '@/lib/utils';

/**
 * DataGrid 셀 헬퍼 컴포넌트들입니다.
 *
 * 각 컴포넌트는 DataGrid의 `cell` 함수 내에서 사용할 수 있습니다.
 *
 * ```tsx
 * const columns: ColumnDef<User>[] = [
 *   {
 *     accessorKey: 'name',
 *     header: '이름',
 *     cell: ({ row }) => <CellAvatar name={row.original.name} />,
 *   },
 * ];
 * ```
 */
const meta: Meta = {
  title: 'Components/Table/DataGrid Cells',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;

// Grid wrapper component for realistic preview
function GridPreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-default rounded-md overflow-hidden">
      {children}
    </div>
  );
}

function GridHeader({
  columns,
  headers,
}: {
  columns: string;
  headers: string[];
}) {
  return (
    <div
      className="grid bg-default border-b-default"
      style={{ gridTemplateColumns: columns }}
    >
      {headers.map((header, index) => (
        <div
          key={index}
          className={cn(
            'height-32 padding-x-10 flex items-center',
            'font-body size-xs font-medium text-subtle',
            'border-r-default last:border-r-0'
          )}
        >
          {header}
        </div>
      ))}
    </div>
  );
}

function GridRow({
  columns,
  children,
}: {
  columns: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid border-b-default last:border-b-0"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function GridCell({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}) {
  return (
    <div
      className={cn(
        'height-32 padding-x-10 flex items-center group',
        'border-r-default last:border-r-0',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end'
      )}
    >
      {children}
    </div>
  );
}

// ============================================
// CellText
// ============================================

/**
 * ## CellText
 *
 * 텍스트 셀 컴포넌트입니다. 툴팁과 복사 기능을 지원합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | value | `string \| number \| null` | - | 표시할 값 |
 * | tooltip | `boolean` | `false` | 툴팁 표시 여부 |
 * | copyable | `boolean` | `false` | 복사 기능 활성화 |
 * | className | `string` | - | 추가 CSS 클래스 |
 */
export const TextCell: StoryObj = {
  render: function Render() {
    const columns = '100px 1fr';

    return (
      <GridPreview>
        <GridHeader columns={columns} headers={['유형', '값']} />
        <GridRow columns={columns}>
          <GridCell>
            <span className="font-body size-sm text-subtle">기본</span>
          </GridCell>
          <GridCell>
            <CellText value="홍길동" />
          </GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell>
            <span className="font-body size-sm text-subtle">툴팁</span>
          </GridCell>
          <GridCell>
            <CellText value="매우 긴 텍스트가 있는 경우 툴팁으로 전체 내용을 확인할 수 있습니다." tooltip />
          </GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell>
            <span className="font-body size-sm text-subtle">복사 가능</span>
          </GridCell>
          <GridCell>
            <CellText value="hong@example.com" copyable />
          </GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell>
            <span className="font-body size-sm text-subtle">null 값</span>
          </GridCell>
          <GridCell>
            <CellText value={null} />
          </GridCell>
        </GridRow>
      </GridPreview>
    );
  },
};

// ============================================
// CellBadge
// ============================================

/**
 * ## CellBadge
 *
 * 배지 셀 컴포넌트입니다. 상태나 카테고리를 표시할 때 사용합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | label | `string` | - | 배지 텍스트 |
 * | color | `BadgeColor` | `'neutral'` | 배지 색상 |
 */
export const BadgeCell: StoryObj = {
  render: function Render() {
    const columns = '1fr 100px 100px';

    return (
      <GridPreview>
        <GridHeader columns={columns} headers={['이름', '역할', '상태']} />
        <GridRow columns={columns}>
          <GridCell><CellText value="홍길동" /></GridCell>
          <GridCell align="center"><CellBadge label="admin" color="blue" /></GridCell>
          <GridCell align="center"><CellBadge label="active" color="green" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell><CellText value="김철수" /></GridCell>
          <GridCell align="center"><CellBadge label="editor" color="violet" /></GridCell>
          <GridCell align="center"><CellBadge label="pending" color="orange" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell><CellText value="이영희" /></GridCell>
          <GridCell align="center"><CellBadge label="viewer" color="neutral" /></GridCell>
          <GridCell align="center"><CellBadge label="inactive" color="neutral" /></GridCell>
        </GridRow>
      </GridPreview>
    );
  },
};

// ============================================
// CellAvatar
// ============================================

/**
 * ## CellAvatar
 *
 * 아바타 셀 컴포넌트입니다. 사용자 정보를 표시할 때 사용합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | src | `string` | - | 이미지 URL |
 * | name | `string` | - | 사용자 이름 |
 * | initials | `string` | - | 이니셜 (미설정 시 이름에서 자동 생성) |
 * | size | `'xs' \| 'sm' \| 'md'` | `'sm'` | 아바타 크기 |
 * | showName | `boolean` | `true` | 이름 표시 여부 |
 */
export const AvatarCell: StoryObj = {
  render: function Render() {
    const columns = '180px 1fr 100px';

    return (
      <GridPreview>
        <GridHeader columns={columns} headers={['사용자', '이메일', '상태']} />
        <GridRow columns={columns}>
          <GridCell><CellAvatar name="홍길동" /></GridCell>
          <GridCell><CellText value="hong@example.com" /></GridCell>
          <GridCell align="center"><CellBadge label="active" color="green" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell>
            <CellAvatar
              name="김철수"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            />
          </GridCell>
          <GridCell><CellText value="kim@example.com" /></GridCell>
          <GridCell align="center"><CellBadge label="active" color="green" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell><CellAvatar name="이영희" /></GridCell>
          <GridCell><CellText value="lee@example.com" /></GridCell>
          <GridCell align="center"><CellBadge label="inactive" color="neutral" /></GridCell>
        </GridRow>
      </GridPreview>
    );
  },
};

// ============================================
// CellProgress
// ============================================

/**
 * ## CellProgress
 *
 * 진행률 셀 컴포넌트입니다. 백분율 진행 상황을 표시할 때 사용합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | value | `number` | - | 현재 값 |
 * | max | `number` | `100` | 최대 값 |
 * | showLabel | `boolean` | `true` | 퍼센트 라벨 표시 여부 |
 * | color | `'default' \| 'success' \| 'warning' \| 'destructive'` | `'default'` | 진행바 색상 |
 */
export const ProgressCell: StoryObj = {
  render: function Render() {
    const columns = '1fr 150px 100px';

    return (
      <GridPreview>
        <GridHeader columns={columns} headers={['작업', '진행률', '상태']} />
        <GridRow columns={columns}>
          <GridCell><CellText value="데이터 마이그레이션" /></GridCell>
          <GridCell><CellProgress value={100} color="success" /></GridCell>
          <GridCell align="center"><CellBadge label="완료" color="green" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell><CellText value="API 연동" /></GridCell>
          <GridCell><CellProgress value={75} color="default" /></GridCell>
          <GridCell align="center"><CellBadge label="진행중" color="blue" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell><CellText value="테스트 코드 작성" /></GridCell>
          <GridCell><CellProgress value={45} color="warning" /></GridCell>
          <GridCell align="center"><CellBadge label="진행중" color="orange" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell><CellText value="문서화" /></GridCell>
          <GridCell><CellProgress value={20} color="destructive" /></GridCell>
          <GridCell align="center"><CellBadge label="지연" color="red" /></GridCell>
        </GridRow>
      </GridPreview>
    );
  },
};

// ============================================
// CellLink
// ============================================

/**
 * ## CellLink
 *
 * 링크 셀 컴포넌트입니다. 클릭 가능한 링크를 표시할 때 사용합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | href | `string` | - | 링크 URL |
 * | label | `string` | - | 표시 텍스트 (미설정 시 href 표시) |
 * | external | `boolean` | `false` | 외부 링크 여부 (새 탭에서 열기) |
 * | className | `string` | - | 추가 CSS 클래스 |
 */
export const LinkCell: StoryObj = {
  render: function Render() {
    const columns = '1fr 180px 100px';

    return (
      <GridPreview>
        <GridHeader columns={columns} headers={['프로젝트', '저장소', '유형']} />
        <GridRow columns={columns}>
          <GridCell><CellText value="Design System" /></GridCell>
          <GridCell><CellLink href="https://github.com" label="GitHub" external /></GridCell>
          <GridCell align="center"><CellBadge label="외부" color="blue" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell><CellText value="Documentation" /></GridCell>
          <GridCell><CellLink href="/docs" label="문서 보기" /></GridCell>
          <GridCell align="center"><CellBadge label="내부" color="neutral" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell><CellText value="API Reference" /></GridCell>
          <GridCell><CellLink href="https://api.example.com/docs" label="API Docs" external /></GridCell>
          <GridCell align="center"><CellBadge label="외부" color="blue" /></GridCell>
        </GridRow>
      </GridPreview>
    );
  },
};

// ============================================
// All Cells Combined
// ============================================

/**
 * ## 모든 셀 타입
 *
 * DataGrid에서 사용할 수 있는 모든 셀 헬퍼 컴포넌트를 한눈에 볼 수 있습니다.
 */
export const AllCells: StoryObj = {
  render: function Render() {
    const columns = '180px 1fr 100px 150px 100px';

    return (
      <GridPreview>
        <GridHeader columns={columns} headers={['사용자', '이메일', '역할', '진행률', '상세']} />
        <GridRow columns={columns}>
          <GridCell><CellAvatar name="홍길동" /></GridCell>
          <GridCell><CellText value="hong@example.com" copyable /></GridCell>
          <GridCell align="center"><CellBadge label="admin" color="blue" /></GridCell>
          <GridCell><CellProgress value={100} color="success" /></GridCell>
          <GridCell align="center"><CellLink href="#" label="보기" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell>
            <CellAvatar
              name="김철수"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kim"
            />
          </GridCell>
          <GridCell><CellText value="kim@example.com" copyable /></GridCell>
          <GridCell align="center"><CellBadge label="editor" color="violet" /></GridCell>
          <GridCell><CellProgress value={75} /></GridCell>
          <GridCell align="center"><CellLink href="#" label="보기" /></GridCell>
        </GridRow>
        <GridRow columns={columns}>
          <GridCell><CellAvatar name="이영희" /></GridCell>
          <GridCell><CellText value="lee@example.com" copyable /></GridCell>
          <GridCell align="center"><CellBadge label="viewer" color="neutral" /></GridCell>
          <GridCell><CellProgress value={45} color="warning" /></GridCell>
          <GridCell align="center"><CellLink href="#" label="보기" /></GridCell>
        </GridRow>
      </GridPreview>
    );
  },
};
