import { forwardRef, useMemo, useState, useCallback } from 'react';

import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../dialog/AlertDialog';
import { Button } from '../button/Button';
import type { PaginationProps } from './Pagination.types';
import { PaginationItem } from './components/PaginationItem';
import { PaginationNav } from './components/PaginationNav';
import { PaginationEllipsis } from './components/PaginationEllipsis';

function getPageNumbers(
  page: number,
  totalPages: number,
  maxVisible: number = 7
): (number | 'ellipsis-start' | 'ellipsis-end')[] {
  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = [];

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  const nearStartEnd = maxVisible - 3;
  const middlePageCount = maxVisible - 4;
  const sideCount = Math.floor(middlePageCount / 2);

  const isNearStart = page <= nearStartEnd;
  const isNearEnd = page >= totalPages - nearStartEnd + 1;

  if (isNearStart) {
    for (let i = 1; i <= maxVisible - 2; i++) {
      pages.push(i);
    }
    pages.push('ellipsis-end');
    pages.push(totalPages);
  } else if (isNearEnd) {
    pages.push(1);
    pages.push('ellipsis-start');
    for (let i = totalPages - (maxVisible - 3); i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push('ellipsis-start');
    for (let i = page - sideCount; i <= page + sideCount; i++) {
      pages.push(i);
    }
    pages.push('ellipsis-end');
    pages.push(totalPages);
  }

  return pages;
}

function getPageNumbersFromCounts(
  page: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number
): (number | 'ellipsis-start' | 'ellipsis-end')[] {
  const range = (start: number, end: number) => {
    const result: number[] = [];
    for (let i = start; i <= end; i++) result.push(i);
    return result;
  };

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
  );

  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = [];

  pages.push(...startPages);

  if (siblingsStart > boundaryCount + 2) {
    pages.push('ellipsis-start');
  } else if (boundaryCount + 1 < totalPages - boundaryCount) {
    pages.push(boundaryCount + 1);
  }

  pages.push(...range(siblingsStart, siblingsEnd));

  if (siblingsEnd < totalPages - boundaryCount - 1) {
    pages.push('ellipsis-end');
  } else if (totalPages - boundaryCount > boundaryCount) {
    const val = totalPages - boundaryCount;
    if (!pages.includes(val)) pages.push(val);
  }

  pages.push(...endPages.filter((p) => !pages.includes(p)));

  return pages;
}

function getDotPages(
  page: number,
  totalPages: number,
  maxDots?: number
): number[] {
  if (!maxDots || maxDots < 1 || totalPages <= maxDots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxDots / 2);
  let start = page - half;
  let end = start + maxDots - 1;

  if (start < 1) {
    start = 1;
    end = maxDots;
  }
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, totalPages - maxDots + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Pagination 컴포넌트
 *
 * 페이지 번호, 점, 간단 모드를 지원하는 페이지네이션입니다.
 *
 * @example
 * <Pagination page={1} totalPages={10} onPageChange={setPage} />
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      page,
      totalPages,
      onPageChange,
      variant = 'numbered',
      maxVisiblePages = 7,
      siblingCount,
      boundaryCount = 1,
      disabled = false,
      hideNavButtons = false,
      showFirstLastButtons = false,
      maxDots,
      ellipsisJump = 5,
      pageChangeConfirmMessage,
      getPageHref,
      total,
      resultTextFormatter,
      prevText = 'Prev',
      nextText = 'Next',
      ...props
    },
    ref
  ) => {
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [pendingPage, setPendingPage] = useState<number | null>(null);

    const handlePageChange = useCallback(
      (newPage: number) => {
        if (disabled) return;
        if (newPage < 1 || newPage > totalPages) return;
        if (newPage === page) return;

        if (pageChangeConfirmMessage) {
          setPendingPage(newPage);
          setConfirmDialogOpen(true);
        } else {
          onPageChange(newPage);
        }
      },
      [disabled, totalPages, page, pageChangeConfirmMessage, onPageChange]
    );

    const handleConfirm = useCallback(() => {
      if (pendingPage !== null) {
        onPageChange(pendingPage);
        setPendingPage(null);
      }
      setConfirmDialogOpen(false);
    }, [pendingPage, onPageChange]);

    const handleCancel = useCallback(() => {
      setPendingPage(null);
      setConfirmDialogOpen(false);
    }, []);

    const pageNumbers = useMemo(() => {
      if (siblingCount !== undefined) {
        return getPageNumbersFromCounts(page, totalPages, siblingCount, boundaryCount);
      }
      return getPageNumbers(page, totalPages, maxVisiblePages);
    }, [page, totalPages, maxVisiblePages, siblingCount, boundaryCount]);

    const dotPages = useMemo(
      () => getDotPages(page, totalPages, maxDots),
      [page, totalPages, maxDots]
    );

    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    if (totalPages <= 0) {
      return null;
    }

    const firstLastIconType = (dir: 'first' | 'last'): ['arrows', string] =>
      dir === 'first'
        ? ['arrows', 'arrow-left-double']
        : ['arrows', 'arrow-right-double'];

    return (
      <>
        <nav
          ref={ref}
          role="navigation"
          aria-label="페이지네이션"
          className={cn(
            'flex items-center',
            variant === 'simple' ? 'justify-between' : 'ds-gap-12',
            className
          )}
          {...props}
        >
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            {`${page} / ${totalPages} 페이지`}
          </span>
          {variant === 'simple' ? (
            <>
              <span className="font-body size-sm line-height-leading-5 text-muted">
                {resultTextFormatter
                  ? resultTextFormatter(page, total ?? 0)
                  : `${page} of ${total ?? 0} results`}
              </span>
              <div className="flex items-center ds-gap-8">
                <Button
                  buttonStyle="soft"
                  size="sm"
                  disabled={!hasPreviousPage || disabled}
                  onClick={() => handlePageChange(page - 1)}
                >
                  {prevText}
                </Button>
                <Button
                  buttonStyle="soft"
                  size="sm"
                  disabled={!hasNextPage || disabled}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {nextText}
                </Button>
              </div>
            </>
          ) : (
            <>
              {showFirstLastButtons && variant === 'numbered' && (
                <PaginationNav
                  direction="prev"
                  disabled={disabled || !hasPreviousPage}
                  onClick={() => handlePageChange(1)}
                  aria-label="첫 페이지"
                  iconOverride={firstLastIconType('first')}
                />
              )}

              {!hideNavButtons && (
                <PaginationNav
                  direction="prev"
                  disabled={disabled || !hasPreviousPage}
                  onClick={() => handlePageChange(page - 1)}
                  href={getPageHref && hasPreviousPage ? getPageHref(page - 1) : undefined}
                />
              )}

              <div
                className={cn(
                  'flex items-center',
                  variant === 'numbered' ? 'ds-gap-4' : 'ds-gap-8'
                )}
              >
                {variant === 'numbered'
                  ? pageNumbers.map((pageNum) =>
                      typeof pageNum === 'string' ? (
                        <PaginationEllipsis
                          key={pageNum}
                          onClick={
                            ellipsisJump
                              ? () => {
                                  const jumpDir = pageNum === 'ellipsis-start' ? -ellipsisJump : ellipsisJump;
                                  const target = Math.max(1, Math.min(totalPages, page + jumpDir));
                                  handlePageChange(target);
                                }
                              : undefined
                          }
                        />
                      ) : (
                        <PaginationItem
                          key={pageNum}
                          variant="numbered"
                          isActive={pageNum === page}
                          disabled={disabled}
                          onClick={() => handlePageChange(pageNum)}
                          href={getPageHref ? getPageHref(pageNum) : undefined}
                        >
                          {pageNum}
                        </PaginationItem>
                      )
                    )
                  : dotPages.map((dotPage) => (
                      <PaginationItem
                        key={dotPage}
                        variant="dot"
                        isActive={dotPage === page}
                        disabled={disabled}
                        onClick={() => handlePageChange(dotPage)}
                        href={getPageHref ? getPageHref(dotPage) : undefined}
                      >
                        {dotPage}
                      </PaginationItem>
                    ))}
              </div>

              {!hideNavButtons && (
                <PaginationNav
                  direction="next"
                  disabled={disabled || !hasNextPage}
                  onClick={() => handlePageChange(page + 1)}
                  href={getPageHref && hasNextPage ? getPageHref(page + 1) : undefined}
                />
              )}

              {showFirstLastButtons && variant === 'numbered' && (
                <PaginationNav
                  direction="next"
                  disabled={disabled || !hasNextPage}
                  onClick={() => handlePageChange(totalPages)}
                  aria-label="마지막 페이지"
                  iconOverride={firstLastIconType('last')}
                />
              )}
            </>
          )}
        </nav>

        {pageChangeConfirmMessage && (
          <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>페이지 이동</AlertDialogTitle>
                <AlertDialogDescription>
                  {pageChangeConfirmMessage}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <Button buttonStyle="secondary" onClick={handleCancel}>
                    취소
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction>
                  <Button buttonStyle="primary" onClick={handleConfirm}>
                    확인
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </>
    );
  }
);

Pagination.displayName = 'Pagination';
