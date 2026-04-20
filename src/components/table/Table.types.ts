import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import type { PaginationVariant } from '../pagination';
import type { TableFontSize } from './components/TableFontSizeContext';

export type TablePaginationAlign = 'left' | 'center' | 'right';

export type { TableFontSize };

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * 텍스트 크기 (행 높이도 함께 조정됨)
   * - xs: 12px / 행 32px
   * - sm: 14px / 행 36px (기본값)
   * - md: 16px / 행 40px
   *
   * 명시적으로 `minHeight`는 표 전체 최소 높이이고, 행 높이는 내부 기본값입니다.
   * @default 'sm'
   */
  fontSize?: TableFontSize;

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

  /**
   * 페이지네이션 스타일 변형
   * @default 'numbered'
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
