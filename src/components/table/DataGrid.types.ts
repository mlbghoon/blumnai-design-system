import type { ReactNode, Ref } from 'react';
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
  ColumnOrderState,
  OnChangeFn,
  Row,
} from '@tanstack/react-table';
import type { PaginationVariant } from '../pagination';
import type { TableFontSize } from './components/TableFontSizeContext';

export type { TableFontSize };

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    /**
     * CSS Grid width (e.g., '100px', '1fr', 'minmax(100px, 1fr)')
     */
    width?: string;
    /**
     * Text alignment
     */
    align?: 'left' | 'center' | 'right';
    /**
     * 헤더 텍스트 정렬 (미지정 시 align 값 사용)
     */
    headerAlign?: 'left' | 'center' | 'right';
    /**
     * 수평 스크롤 시 컬럼 고정 여부
     */
    sticky?: boolean | 'left';
    /**
     * 컬럼 헤더에 표시할 툴팁
     */
    headerTooltip?: ReactNode;
    _unused?: [TData, TValue];
  }
}

export type ColumnSizingState = Record<string, number>;

/**
 * 가상화 관련 축별 설정 (행/열 각각 다르게 튜닝 가능)
 */
export type DataGridAxisValue = number | { rows?: number; columns?: number };

/**
 * DataGrid 푸터 행 - 컬럼 ID를 키로 하는 셀 컨텐츠 맵.
 *
 * @example
 * footerRow={{ name: '합계', amount: total, count: 100 }}
 */
export type DataGridFooterRow = Record<string, ReactNode>;

export interface DataGridProps<T> {
  /**
   * 테이블 데이터 배열
   */
  data: T[];

  /**
   * TanStack Table 컬럼 정의
   */
  columns: ColumnDef<T>[];

  /**
   * 행 식별자 함수 (기본값: row.id)
   */
  getRowId?: (row: T) => string;

  // ============================================
  // Column Reorder
  // ============================================
  /**
   * 컬럼 드래그 재정렬 활성화 여부
   */
  enableColumnReorder?: boolean;

  /**
   * 컬럼 순서 상태
   */
  columnOrder?: ColumnOrderState;

  /**
   * 컬럼 순서 변경 콜백
   */
  onColumnOrderChange?: OnChangeFn<ColumnOrderState>;

  // ============================================
  // Column Resize
  // ============================================
  /**
   * 컬럼 크기 조절 활성화 여부
   */
  enableColumnResize?: boolean;

  /**
   * 컬럼 크기 상태 (컬럼 ID → 픽셀 너비)
   */
  columnSizing?: ColumnSizingState;

  /**
   * 컬럼 크기 변경 콜백
   */
  onColumnSizingChange?: (sizing: ColumnSizingState) => void;

  // ============================================
  // Sorting
  // ============================================
  /**
   * 정렬 상태 (TanStack SortingState)
   */
  sorting?: SortingState;

  /**
   * 정렬 상태 변경 콜백
   */
  onSortingChange?: OnChangeFn<SortingState>;

  // ============================================
  // Filtering
  // ============================================
  /**
   * 컬럼 필터 상태 (TanStack ColumnFiltersState)
   */
  columnFilters?: ColumnFiltersState;

  /**
   * 컬럼 필터 변경 콜백
   */
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;

  // ============================================
  // Row Selection
  // ============================================
  /**
   * 행 선택 상태 (TanStack RowSelectionState)
   */
  rowSelection?: RowSelectionState;

  /**
   * 행 선택 변경 콜백
   */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  /**
   * 행 선택 활성화 여부 또는 행별 선택 가능 함수
   */
  enableRowSelection?: boolean | ((row: Row<T>) => boolean);

  // ============================================
  // Pagination
  // ============================================
  /**
   * 페이지네이션 활성화 여부 (기본값: true)
   */
  pagination?: boolean;

  /**
   * 현재 페이지 (1-indexed)
   */
  page?: number;

  /**
   * 전체 항목 수 (서버사이드 모드용)
   */
  total?: number;

  /**
   * 페이지당 항목 수 (기본값: 10)
   */
  limit?: number;

  /**
   * 페이지 크기 옵션
   */
  limitOptions?: number[];

  /**
   * 페이지 크기 옵션 라벨 포맷 함수 (기본값: (limit) => `${limit}개씩 보기`)
   */
  limitOptionLabel?: (limit: number) => string;

  /**
   * 페이지 변경 콜백
   */
  onPageChange?: (page: number) => void;

  /**
   * 페이지 크기 변경 콜백
   */
  onLimitChange?: (limit: number) => void;

  /**
   * 페이지 변경 전 확인 메시지
   */
  pageChangeConfirmMessage?: string;

  /**
   * 페이지네이션 위치 (기본값: 'right')
   */
  paginationAlign?: 'left' | 'center' | 'right';

  /**
   * 페이지네이션 스타일 변형 (기본값: 'numbered')
   */
  paginationVariant?: PaginationVariant;

  /**
   * 최대 표시할 페이지 번호 수 (numbered 변형에서만 사용)
   * @default 7
   */
  maxVisiblePages?: number;

  /**
   * 페이지네이션 비활성화 여부
   */
  paginationDisabled?: boolean;

  /**
   * 이전/다음 버튼 숨김
   */
  hideNavButtons?: boolean;

  /**
   * 결과 텍스트 포맷터 (simple 변형에서 사용)
   */
  resultTextFormatter?: (current: number, total: number) => string;

  /**
   * 항목 수 표시 여부 (기본값: true)
   */
  showItemCount?: boolean;

  // ============================================
  // Loading
  // ============================================
  /**
   * 로딩 상태
   */
  isLoading?: boolean;

  /**
   * 로딩 중 데이터 유지 여부
   */
  preserveDataWhileLoading?: boolean;

  // ============================================
  // Sizing
  // ============================================
  /**
   * 최소 높이
   */
  minHeight?: string;

  /**
   * 최대 높이
   */
  maxHeight?: string;

  /**
   * 헤더 행 높이 (기본값: '32px')
   */
  headerHeight?: string;

  /**
   * 데이터 행 높이 (기본값: '32px')
   */
  rowHeight?: string;

  /**
   * 행별 높이 계산 함수 (rowHeight보다 우선순위 높음)
   */
  getRowHeight?: (row: T) => string | undefined;

  /**
   * 바디 영역 높이를 `limit × rowHeight` 로 고정합니다 (헤더 / 페이지네이션 제외).
   *
   * Dialog 안에서 `limit={10}` 등으로 쓸 때, 마지막 페이지에 행이 적게 남아도
   * 바디 높이가 줄지 않아 Dialog 전체 높이가 페이지마다 흔들리지 않습니다.
   * 기존에 `minHeight`/`maxHeight` 에 `limit × rowHeight` 값을 직접 계산해 넣던
   * 패턴을 대체합니다.
   *
   * `getRowHeight` (동적 행 높이) 와 함께 쓸 수 없습니다. 둘 다 설정되면
   * `fitLimitRowHeight` 는 무시되고 dev 경고가 출력됩니다.
   *
   * @default false
   */
  fitLimitRowHeight?: boolean;

  /**
   * 텍스트 크기 (행 높이 기본값도 함께 조정됨)
   * - xs: 12px / 행 32px
   * - sm: 14px / 행 36px (기본값)
   * - md: 16px / 행 40px
   *
   * 명시적으로 `rowHeight` / `headerHeight`를 넘기면 그 값이 우선합니다.
   * @default 'sm'
   */
  fontSize?: TableFontSize;

  // ============================================
  // Empty State
  // ============================================
  /**
   * 빈 상태 텍스트 (기본값: '검색된 내용이 없습니다.')
   */
  emptyText?: string;

  /**
   * 빈 상태 커스텀 렌더링
   */
  emptyContent?: ReactNode;

  // ============================================
  // Error State
  // ============================================
  /**
   * 에러 메시지 또는 커스텀 렌더링
   */
  error?: string | ReactNode;

  /**
   * 재시도 콜백
   */
  onRetry?: () => void;

  // ============================================
  // Styling
  // ============================================
  /**
   * 그리드의 접근성 라벨
   */
  'aria-label'?: string;

  /**
   * 그리드 라벨을 제공하는 요소의 ID
   */
  'aria-labelledby'?: string;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 행 클릭 핸들러
   */
  onRowClick?: (row: T) => void;

  /**
   * 선택된 행 배경색 표시 여부
   */
  showSelectedRowBackground?: boolean;

  // ============================================
  // Footer Row
  // ============================================
  /**
   * 하단 고정 요약/합계 행. 컬럼 ID를 키로 각 셀 컨텐츠를 전달합니다.
   *
   * 스크롤 viewport 하단에 sticky로 고정되며, 본문 컬럼과 너비가 정렬됩니다.
   * 아무 키도 매칭되지 않는 컬럼은 빈 셀로 렌더됩니다.
   *
   * @example
   * footerRow={{ name: '합계', totalAmount: sum, count: rows.length }}
   */
  footerRow?: DataGridFooterRow;

  // ============================================
  // Virtualization
  // ============================================
  /**
   * 가상화 overscan (뷰포트 밖에 추가로 마운트할 개수).
   *
   * - `number` - 행 overscan만 설정 (열 overscan은 기본값 사용)
   * - `{ rows, columns }` - 축별로 따로 지정
   *
   * 큰 값 = 부드러운 스크롤, 느린 commit.
   * 작은 값 = 빠른 commit, 스크롤 중 빈 공간 깜빡임 가능.
   * @default 10 (행), 2 (열)
   */
  overscan?: DataGridAxisValue;

  /**
   * 가상화 활성화 임계값 (해당 축의 행/열 개수가 이 값을 초과하면 가상화 활성).
   *
   * - `number` - 행 임계값 (열은 기본값 사용)
   * - `{ rows, columns }` - 축별 임계값
   *
   * 테스트용 소규모 데이터셋에서 가상화를 강제하거나,
   * 많은 컬럼을 가진 그리드에서 더 낮은 행 수부터 가상화하려면 조정하세요.
   * @default { rows: 100, columns: 30 }
   */
  virtualizationThreshold?: DataGridAxisValue;

  // ============================================
  // Ref
  // ============================================
  /**
   * 스크롤 가능한 뷰포트 요소에 대한 ref.
   * programmatic scroll (특정 행으로 스크롤, 상단 복귀 등) 제어에 사용합니다.
   */
  viewportRef?: Ref<HTMLDivElement>;
}

export type { ColumnDef, SortingState, ColumnFiltersState, RowSelectionState, ColumnOrderState, OnChangeFn, Row };
