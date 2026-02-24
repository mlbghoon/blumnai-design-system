import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icon } from '../icons/Icon';
import { Pagination } from '../pagination';
import { Select } from '../select';
import { ScrollArea } from '../scroll-area';
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from './Table.types';

const defaultLimitOptionLabel = (limit: number) => `${limit}개씩 보기`;

/**
 * Table 컴포넌트
 *
 * HTML 테이블 기반의 컴포넌트입니다. 페이지네이션, 스크롤/고정 헤더, 로딩 상태를 지원합니다.
 *
 * @example
 * <Table>
 *   <TableHeader><TableRow><TableHead>이름</TableHead></TableRow></TableHeader>
 *   <TableBody><TableRow><TableCell>홍길동</TableCell></TableRow></TableBody>
 * </Table>
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      striped,
      bordered,
      minHeight,
      maxHeight,
      stickyHeader,
      isLoading,
      pagination,
      page = 1,
      totalPages = 1,
      onPageChange,
      limit = 10,
      limitOptions,
      limitOptionLabel = defaultLimitOptionLabel,
      onLimitChange,
      pageChangeConfirmMessage,
      paginationAlign = 'right',
      paginationVariant = 'numbered',
      maxVisiblePages,
      paginationDisabled,
      hideNavButtons,
      resultTextFormatter,
      showItemCount,
      total,
      itemCountFormatter,
      children,
      ...props
    },
    ref
  ) => {
    const showLeftSection = showItemCount || onLimitChange;
    const startIndex = (page - 1) * limit + 1;
    const endIndex = Math.min(page * limit, total ?? page * limit);

    const formatItemCount = () => {
      if (itemCountFormatter && total !== undefined) {
        return itemCountFormatter(startIndex, endIndex, total);
      }
      return `${startIndex}-${endIndex} / ${total ?? '?'}`;
    };

    const limitSelector = onLimitChange && (
      <Select
        size="sm"
        selectStyle="default"
        options={(limitOptions ?? [10, 20, 50, 100]).map((option) => ({
          id: String(option),
          label: limitOptionLabel(option),
        }))}
        value={String(limit)}
        onChange={(value) => onLimitChange(Number(value))}
        width={140}
      />
    );

    const paginationElement = pagination && onPageChange && (
      <Pagination
        variant={paginationVariant}
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={onPageChange}
        pageChangeConfirmMessage={pageChangeConfirmMessage}
        maxVisiblePages={maxVisiblePages}
        disabled={paginationDisabled}
        hideNavButtons={hideNavButtons}
        resultTextFormatter={resultTextFormatter}
      />
    );

    return (
      <div
        className={cn(
          'relative w-full overflow-hidden',
          bordered && 'bg-default border-default rounded-lg'
        )}
      >
        <ScrollArea
          orientation="both"
          maxHeight={maxHeight}
          className={cn(
            stickyHeader && '[&_thead]:sticky [&_thead]:top-[0px] [&_thead]:z-10'
          )}
          data-sticky-bordered={bordered && stickyHeader ? '' : undefined}
          style={{ minHeight }}
        >
          <table
            ref={ref}
            className={cn('w-full caption-bottom size-sm font-body', className)}
            data-slot="table"
            data-striped={striped || undefined}
            aria-busy={isLoading || undefined}
            {...props}
          >
            {children}
          </table>
        </ScrollArea>

        {isLoading && (
          <div role="status" className="absolute inset-0 flex items-center justify-center bg-default/80 z-20">
            <div className="flex items-center ds-gap-8">
              <div className="width-20 height-20 border-2 border-state-primary border-t-transparent rounded-full animate-spin" />
              <span className="font-body size-sm text-subtle">로딩 중...</span>
            </div>
          </div>
        )}

        {pagination && onPageChange && totalPages > 0 && (
          <div
            className={cn(
              'flex items-center padding-y-8 padding-x-10 border-t-default',
              paginationAlign === 'left' && 'justify-start',
              paginationAlign === 'center' && 'justify-center',
              paginationAlign === 'right' && showLeftSection && 'justify-between',
              paginationAlign === 'right' && !showLeftSection && 'justify-end'
            )}
          >
            {paginationAlign === 'right' && showLeftSection && (
              <div className="flex items-center ds-gap-8">
                {showItemCount && (
                  <span className="font-body size-sm text-subtle">
                    {formatItemCount()}
                  </span>
                )}
                {limitSelector}
              </div>
            )}

            {paginationAlign === 'center' && paginationElement}

            {paginationAlign === 'left' && (
              <>
                {paginationElement}
                {showLeftSection && (
                  <div className="flex items-center ds-gap-8 ml-auto">
                    {showItemCount && (
                      <span className="font-body size-sm text-subtle">
                        {formatItemCount()}
                      </span>
                    )}
                    {limitSelector}
                  </div>
                )}
              </>
            )}

            {paginationAlign === 'right' && paginationElement}
          </div>
        )}
      </div>
    );
  }
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(className)}
      {...props}
    />
  )
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(className)}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        'border-t-default bg-muted/50 font-medium [&>tr]:last:border-b-0',
        className
      )}
      {...props}
    />
  )
);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b-default transition-colors',
        selected && 'bg-basic-gray-alpha-4',
        className
      )}
      aria-selected={selected || undefined}
      data-state={selected ? 'selected' : undefined}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, children, onClick, ...props }, ref) => {
    const getSortIcon = () => {
      if (!sortDirection) return 'expand-up-down';
      return sortDirection === 'asc' ? 'arrow-up-s' : 'arrow-down-s';
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
      if (sortable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLTableCellElement>);
      }
    };

    return (
      <th
        ref={ref}
        scope="col"
        className={cn(
          'height-32 padding-x-10 text-left align-middle bg-default',
          'font-body size-xs line-height-leading-4 font-medium text-subtle',
          '[&:has([role=checkbox])]:[padding-right:0] [&>[role=checkbox]]:translate-y-[2px]',
          sortable && 'cursor-pointer select-none',
          className
        )}
        onClick={sortable ? onClick : undefined}
        onKeyDown={sortable ? handleKeyDown : undefined}
        tabIndex={sortable ? 0 : undefined}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
              ? 'descending'
              : undefined
        }
        {...props}
      >
        {sortable ? (
          <div className="flex items-center ds-gap-4">
            <span>{children}</span>
            <Icon
              iconType={['arrows', getSortIcon()]}
              size={12}
              className={cn('shrink-0', sortDirection ? 'text-subtle' : 'text-hint')}
            />
          </div>
        ) : (
          children
        )}
      </th>
    );
  }
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'height-32 padding-x-10 align-middle',
        'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-default',
        '[&:has([role=checkbox])]:[padding-right:0] [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('margin-t-16 size-sm font-body text-subtle', className)}
      {...props}
    />
  )
);
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
