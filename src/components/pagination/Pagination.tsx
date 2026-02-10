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

/**
 * Pagination 컴포넌트
 *
 * 페이지 번호, 점, 간단 모드를 지원하는 페이지네이션입니다.
 *
 * @example
 * <Pagination currentPage={1} totalPages={10} onPageChange={setPage} />
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
      disabled = false,
      hideNavButtons = false,
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

    const pageNumbers = useMemo(
      () => getPageNumbers(page, totalPages, maxVisiblePages),
      [page, totalPages, maxVisiblePages]
    );

    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    if (totalPages <= 0) {
      return null;
    }

    return (
      <>
        <nav
          ref={ref}
          role="navigation"
          aria-label="페이지네이션"
          className={cn(
            'flex items-center',
            variant === 'simple' ? 'justify-between' : 'gap-12',
            className
          )}
          {...props}
        >
          {variant === 'simple' ? (
            <>
              <span className="font-body size-sm line-height-leading-5 text-muted">
                {resultTextFormatter
                  ? resultTextFormatter(page, total ?? 0)
                  : `${page} of ${total ?? 0} results`}
              </span>
              <div className="flex items-center gap-8">
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
                  variant === 'numbered' ? 'gap-4' : 'gap-8'
                )}
              >
                {variant === 'numbered'
                  ? pageNumbers.map((pageNum) =>
                      typeof pageNum === 'string' ? (
                        <PaginationEllipsis key={pageNum} />
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
                  : Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem
                        key={index + 1}
                        variant="dot"
                        isActive={index + 1 === page}
                        disabled={disabled}
                        onClick={() => handlePageChange(index + 1)}
                        href={getPageHref ? getPageHref(index + 1) : undefined}
                      />
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
