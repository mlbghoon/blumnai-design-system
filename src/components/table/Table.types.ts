import type { HTMLAttributes, Ref, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import type { PaginationVariant } from '../pagination';
import type { TableFontSize } from './components/TableFontSizeContext';

export type TablePaginationAlign = 'left' | 'center' | 'right';

export type { TableFontSize };

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * 최상위 래퍼 `<div>`(스크롤 영역 + 페이지네이션 + 로딩 오버레이를 감싸는 컨테이너)에 적용할 className.
   * `className`은 내부 `<table>` 엘리먼트에만 적용되므로, 컴포넌트 전체에 스타일을 주려면 이 prop을 사용하세요.
   */
  wrapperClassName?: string;

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

  /**
   * 푸터(`<tfoot>`) 고정 여부 (스크롤 시 하단에 고정)
   *
   * `stickyHeader`와 동시에 사용 가능합니다. 내부 ScrollArea viewport를 기준으로
   * `tfoot`이 하단에 고정되며, body 행이 푸터 아래로 스크롤됩니다. (요구사항 QA: 합계 행 항상 노출)
   */
  stickyFooter?: boolean;

  /**
   * 스크롤바 표시 방식 (내부 ScrollArea 의 `type` prop 으로 전달).
   * - `'hover'` — 포인터 호버 시 표시 (기본값)
   * - `'scroll'` — 스크롤 중 표시
   * - `'auto'` — 콘텐츠 오버플로 시 표시
   * - `'always'` — 항상 표시
   *
   * 가로 스크롤 가능 여부를 사용자에게 항상 시각적으로 보여주려면 `'always'` 사용.
   * @default 'hover'
   */
  scrollbarType?: 'hover' | 'scroll' | 'auto' | 'always';

  /**
   * 스크롤 가능한 뷰포트 요소에 대한 ref.
   * programmatic scroll (특정 행으로 스크롤, 상단 복귀 등) 제어에 사용합니다.
   *
   * @example
   * ```tsx
   * const viewportRef = useRef<HTMLDivElement>(null);
   * viewportRef.current?.scrollTo({ top: 0 });
   * ```
   */
  viewportRef?: Ref<HTMLDivElement>;

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

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * 셀 내용을 한 줄로 truncate (말줄임표) 처리합니다.
   * `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` 을 적용합니다.
   *
   * 컬럼에 명시적 너비가 지정되어 있어야 효과가 보입니다.
   * @default false
   */
  truncate?: boolean;
}

export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
