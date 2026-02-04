import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

export type TablePaginationAlign = 'left' | 'center' | 'right';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * 줄무늬 행 스타일 사용 여부
   */
  striped?: boolean;

  /**
   * 테두리 표시 여부
   */
  bordered?: boolean;

  // === Sizing ===

  /**
   * 테이블 컨테이너의 최소 높이
   */
  minHeight?: string;

  /**
   * 테이블 컨테이너의 최대 높이 (스크롤 활성화)
   */
  maxHeight?: string;

  /**
   * 헤더 고정 여부 (스크롤 시 상단에 고정)
   */
  stickyHeader?: boolean;

  // === Loading ===

  /**
   * 로딩 상태
   */
  isLoading?: boolean;

  // === Pagination ===

  /**
   * 페이지네이션 UI 표시 여부
   */
  pagination?: boolean;

  /**
   * 현재 페이지 (1-indexed)
   */
  page?: number;

  /**
   * 전체 페이지 수
   */
  totalPages?: number;

  /**
   * 페이지 변경 콜백
   */
  onPageChange?: (page: number) => void;

  /**
   * 페이지당 아이템 수
   */
  limit?: number;

  /**
   * 페이지당 아이템 수 옵션 목록
   */
  limitOptions?: number[];

  /**
   * 페이지당 아이템 수 옵션 레이블 포맷터
   */
  limitOptionLabel?: (limit: number) => string;

  /**
   * 페이지당 아이템 수 변경 콜백
   */
  onLimitChange?: (limit: number) => void;

  /**
   * 페이지 변경 전 확인 메시지
   */
  pageChangeConfirmMessage?: string;

  /**
   * 페이지네이션 정렬 위치
   * @default 'right'
   */
  paginationAlign?: TablePaginationAlign;

  // === Item Count ===

  /**
   * 아이템 수 표시 여부
   */
  showItemCount?: boolean;

  /**
   * 전체 아이템 수
   */
  total?: number;

  /**
   * 아이템 수 텍스트 포맷터
   * @default (start, end, total) => `${start}-${end} / ${total}`
   */
  itemCountFormatter?: (start: number, end: number, total: number) => string;
}

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * 선택된 행 스타일 적용
   */
  selected?: boolean;
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * 정렬 가능 여부
   */
  sortable?: boolean;

  /**
   * 현재 정렬 방향
   */
  sortDirection?: 'asc' | 'desc' | false;
}

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
