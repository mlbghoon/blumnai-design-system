import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';

export type PaginationVariant = 'numbered' | 'dot' | 'simple';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * 현재 페이지 (1-indexed)
   */
  page: number;

  /**
   * 전체 페이지 수
   */
  totalPages: number;

  /**
   * 페이지 변경 콜백
   */
  onPageChange: (page: number) => void;

  /**
   * 페이지네이션 스타일
   * @default 'numbered'
   */
  variant?: PaginationVariant;

  /**
   * 최대 표시할 항목 수 (numbered 변형에서만 사용)
   * 페이지 번호와 ellipsis(...)를 모두 포함한 총 개수
   * @default 7
   */
  maxVisiblePages?: number;

  /**
   * 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 이전/다음 버튼 숨김
   */
  hideNavButtons?: boolean;

  /**
   * 페이지 변경 전 확인 메시지 (설정 시 확인 다이얼로그 표시)
   */
  pageChangeConfirmMessage?: string;

  /**
   * 라우터 지원을 위한 페이지 href 생성 함수
   */
  getPageHref?: (page: number) => string;

  /**
   * 전체 항목 수 (simple 변형에서 사용)
   */
  total?: number;

  /**
   * 결과 텍스트 포맷터 (simple 변형에서 사용)
   * @default (current, total) => `${current} of ${total} results`
   */
  resultTextFormatter?: (current: number, total: number) => string;

  /**
   * 이전 버튼 텍스트 (simple 변형에서 사용)
   * @default 'Prev'
   */
  prevText?: string;

  /**
   * 다음 버튼 텍스트 (simple 변형에서 사용)
   * @default 'Next'
   */
  nextText?: string;
}

export interface PaginationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 활성화 상태
   */
  isActive?: boolean;

  /**
   * 페이지 변형 (numbered 또는 dot)
   */
  variant?: PaginationVariant;

  /**
   * href 속성 (설정 시 a 태그로 렌더링)
   */
  href?: string;
}

export interface PaginationNavProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 방향
   */
  direction: 'prev' | 'next';

  /**
   * href 속성 (설정 시 a 태그로 렌더링)
   */
  href?: string;
}

export type PaginationEllipsisProps = HTMLAttributes<HTMLSpanElement>;
