import type { Meta, StoryObj } from '@storybook/react';

import { DataGridLoading } from '../components/DataGridLoading';
import { DataGridEmpty } from '../components/DataGridEmpty';
import { DataGridError } from '../components/DataGridError';

/**
 * DataGrid 내부 컴포넌트들입니다.
 *
 * 이 컴포넌트들은 DataGrid 내부에서 사용되지만,
 * 독립적으로 사용하거나 커스터마이징할 때 참고할 수 있습니다.
 */
const meta: Meta = {
  title: 'Components/Table/DataGrid Components',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;

// ============================================
// DataGridLoading
// ============================================

/**
 * ## DataGridLoading
 *
 * 로딩 상태를 표시하는 컴포넌트입니다. 스켈레톤과 오버레이 두 가지 모드를 지원합니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | gridTemplateColumns | `string` | - | CSS Grid 템플릿 컬럼 |
 * | rowCount | `number` | `5` | 스켈레톤 행 수 |
 * | overlay | `boolean` | `false` | 오버레이 모드 사용 여부 |
 */
export const Loading: StoryObj = {
  render: function Render() {
    const gridTemplateColumns = '100px 1fr 120px 100px';
    const columns = [
      { id: 'col1', meta: { width: '100px' } },
      { id: 'col2' },
      { id: 'col3', meta: { width: '120px' } },
      { id: 'col4', meta: { width: '100px' } },
    ];
    const emptyStickyPositions = new Map();

    return (
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">스켈레톤 모드 (기본)</span>
          <span className="font-body size-xs text-subtle">데이터가 없을 때 표시되는 스켈레톤 로딩</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridLoading
              columns={columns}
              gridTemplateColumns={gridTemplateColumns}
              rowCount={3}
              stickyColumnPositions={emptyStickyPositions}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">오버레이 모드</span>
          <span className="font-body size-xs text-subtle">데이터 위에 표시되는 로딩 오버레이 (preserveDataWhileLoading)</span>
          <div className="relative border-default rounded-md overflow-hidden height-200">
            <DataGridLoading
              columns={columns}
              gridTemplateColumns={gridTemplateColumns}
              overlay
              stickyColumnPositions={emptyStickyPositions}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">행 수 조정</span>
          <span className="font-body size-xs text-subtle">rowCount로 스켈레톤 행 수를 조절할 수 있습니다</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridLoading
              columns={columns}
              gridTemplateColumns={gridTemplateColumns}
              rowCount={2}
              stickyColumnPositions={emptyStickyPositions}
            />
          </div>
        </div>
      </div>
    );
  },
};

// ============================================
// DataGridEmpty
// ============================================

/**
 * ## DataGridEmpty
 *
 * 데이터가 없을 때 표시되는 빈 상태 컴포넌트입니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | text | `string` | `'검색된 내용이 없습니다.'` | 표시할 메시지 |
 * | content | `ReactNode` | - | 커스텀 컨텐츠 |
 */
export const Empty: StoryObj = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">기본</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridEmpty />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">커스텀 텍스트</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridEmpty text="사용자가 없습니다." />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">커스텀 컨텐츠</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridEmpty
              content={
                <div className="flex flex-col items-center gap-8">
                  <span className="font-body size-sm text-subtle">검색 결과가 없습니다.</span>
                  <span className="font-body size-xs text-muted">다른 검색어를 입력해 보세요.</span>
                </div>
              }
            />
          </div>
        </div>
      </div>
    );
  },
};

// ============================================
// DataGridError
// ============================================

/**
 * ## DataGridError
 *
 * 에러 상태를 표시하는 컴포넌트입니다.
 *
 * ### Props
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | error | `string \| ReactNode` | - | 에러 메시지 또는 커스텀 컨텐츠 |
 * | onRetry | `() => void` | - | 재시도 콜백 (설정 시 재시도 버튼 표시) |
 */
export const Error: StoryObj = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">기본</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridError error="데이터를 불러오는데 실패했습니다." />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">재시도 버튼</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridError
              error="네트워크 오류가 발생했습니다."
              onRetry={() => alert('재시도')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">커스텀 에러 컨텐츠</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridError
              error={
                <div className="flex flex-col items-center gap-4">
                  <span className="font-body size-sm font-medium text-destructive">서버 오류</span>
                  <span className="font-body size-xs text-subtle">잠시 후 다시 시도해 주세요.</span>
                </div>
              }
              onRetry={() => alert('재시도')}
            />
          </div>
        </div>
      </div>
    );
  },
};

// ============================================
// All States
// ============================================

/**
 * ## 모든 상태
 *
 * DataGrid에서 사용되는 모든 상태 컴포넌트를 한눈에 볼 수 있습니다.
 */
export const AllStates: StoryObj = {
  render: function Render() {
    const gridTemplateColumns = '100px 1fr 120px 100px';
    const columns = [
      { id: 'col1', meta: { width: '100px' } },
      { id: 'col2' },
      { id: 'col3', meta: { width: '120px' } },
      { id: 'col4', meta: { width: '100px' } },
    ];
    const emptyStickyPositions = new Map();

    return (
      <div className="grid grid-cols-1 gap-16">
        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">로딩 (스켈레톤)</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridLoading
              columns={columns}
              gridTemplateColumns={gridTemplateColumns}
              rowCount={2}
              stickyColumnPositions={emptyStickyPositions}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">빈 상태</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridEmpty text="데이터가 없습니다." />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-body size-sm font-medium">에러 상태</span>
          <div className="border-default rounded-md overflow-hidden">
            <DataGridError
              error="데이터를 불러오는데 실패했습니다."
              onRetry={() => alert('재시도')}
            />
          </div>
        </div>
      </div>
    );
  },
};
