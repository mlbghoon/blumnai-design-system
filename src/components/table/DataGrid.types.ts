import type { ReactNode } from 'react';
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
  OnChangeFn,
  Row,
} from '@tanstack/react-table';
import type { PaginationVariant } from '../pagination';

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
     * 수평 스크롤 시 컬럼 고정 여부
     */
    sticky?: boolean | 'left';
    _unused?: [TData, TValue];
  }
}

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
}

export type { ColumnDef, SortingState, ColumnFiltersState, RowSelectionState, OnChangeFn, Row };
