import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';

export type PaginationVariant = 'numbered' | 'dot' | 'simple';

export type PaginationSize = 'sm' | 'lg';

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
   * 페이지네이션 크기
   * @default 'lg'
   */
  size?: PaginationSize;

  /**
   * 최대 표시할 항목 수 (numbered 변형에서만 사용)
   * 페이지 번호와 ellipsis(...)를 모두 포함한 총 개수
   * @default 7
   */
  maxVisiblePages?: number;

  /**
   * 현재 페이지 양옆에 표시할 페이지 수 (numbered 변형에서만 사용)
   * 설정 시 maxVisiblePages 대신 siblingCount/boundaryCount 기반으로 계산됩니다
   * @default undefined
   */
  siblingCount?: number;

  /**
   * 시작과 끝에 항상 표시할 페이지 수 (numbered 변형에서만 사용)
   * siblingCount와 함께 사용됩니다
   * @default 1
   */
  boundaryCount?: number;

  /**
   * 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 이전/다음 버튼 숨김
   */
  hideNavButtons?: boolean;

  /**
   * 처음/마지막 페이지 이동 버튼 표시 (numbered 변형에서만 사용)
   * @default false
   */
  showFirstLastButtons?: boolean;

  /**
   * dot 변형에서 최대 표시할 점 개수 (초과 시 생략)
   * @default undefined (제한 없음)
   */
  maxDots?: number;

  /**
   * ellipsis 클릭 시 점프할 페이지 수
   * @default 5
   */
  ellipsisJump?: number;

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

export interface PaginationItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * 활성화 상태
   */
  isActive?: boolean;

  /**
   * 페이지 변형 (numbered 또는 dot)
   */
  variant?: PaginationVariant;

  /**
   * 페이지네이션 크기
   * @default 'lg'
   */
  size?: PaginationSize;

  /**
   * href 속성 (설정 시 a 태그로 렌더링)
   */
  href?: string;
}

export interface PaginationNavProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * 방향
   */
  direction: 'prev' | 'next';

  /**
   * 페이지네이션 크기
   * @default 'lg'
   */
  size?: PaginationSize;

  /**
   * href 속성 (설정 시 a 태그로 렌더링)
   */
  href?: string;

  /**
   * 아이콘 컴포넌트 오버라이드 (first/last 버튼에 사용).
   * v2.0+ — tuple form 대신 Remixicon component reference.
   */
  iconOverride?: import('../icons/Icon/Icon.types').RemixiconLikeComponent;
}

export interface PaginationEllipsisProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 클릭 이벤트 핸들러 (설정 시 클릭 가능한 버튼으로 렌더링)
   */
  onClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * 페이지네이션 크기
   * @default 'lg'
   */
  size?: PaginationSize;
}
