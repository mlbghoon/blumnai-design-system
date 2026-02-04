import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/lib/utils';
import { Icon } from '../icons/Icon';
import { Pagination } from '../pagination';
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
      <SelectPrimitive.Root
        value={String(limit)}
        onValueChange={(value) => onLimitChange(Number(value))}
      >
        <SelectPrimitive.Trigger
          className={cn(
            'inline-flex items-center gap-4 height-28 padding-x-8',
            'font-body size-sm text-default',
            'bg-default border-default rounded-sm',
            'hover:bg-basic-gray-alpha-2 cursor-pointer',
            'focus:outline-none focus-visible:shadow-component-misc-focus'
          )}
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <Icon
              iconType={['arrows', 'arrow-up-down']}
              size={12}
              className="text-subtle"
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              'overflow-hidden bg-default rounded-md shadow-modal-sm',
              'animate-in fade-in-0 zoom-in-95'
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="padding-4">
              {(limitOptions ?? [10, 20, 50, 100]).map((option) => (
                <SelectPrimitive.Item
                  key={option}
                  value={String(option)}
                  className={cn(
                    'relative flex items-center height-28 padding-x-8 rounded-sm',
                    'font-body size-sm text-default',
                    'cursor-pointer select-none outline-none',
                    'hover:bg-basic-gray-alpha-4 focus:bg-basic-gray-alpha-4',
                    'data-[state=checked]:bg-basic-blue-subtle'
                  )}
                >
                  <SelectPrimitive.ItemText>
                    {limitOptionLabel(option)}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );

    const paginationElement = pagination && onPageChange && (
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        pageChangeConfirmMessage={pageChangeConfirmMessage}
      />
    );

    return (
      <div
        className={cn(
          'relative w-full overflow-hidden',
          bordered && 'bg-default border-default rounded-lg'
        )}
      >
        <div
          className={cn('overflow-auto', stickyHeader && '[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10 [&_thead]:bg-default')}
          style={{ minHeight, maxHeight }}
        >
          <table
            ref={ref}
            className={cn('w-full caption-bottom size-sm font-body', className)}
            data-striped={striped || undefined}
            {...props}
          >
            {children}
          </table>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-default/80 z-20">
            <div className="flex items-center gap-8">
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
              <div className="flex items-center gap-8">
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
                  <div className="flex items-center gap-8 ml-auto">
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
      className={cn('[&_tr]:border-b-default', className)}
      {...props}
    />
  )
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(
        '[&_tr:last-child]:border-0',
        '[&[data-striped]_tr:nth-child(even)]:bg-basic-gray-alpha-2',
        className
      )}
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
        'hover:bg-basic-gray-alpha-4',
        selected && 'bg-basic-gray-alpha-4',
        className
      )}
      data-state={selected ? 'selected' : undefined}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, children, onClick, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'height-32 padding-x-10 text-left align-middle',
        'font-body size-xs line-height-leading-4 font-medium text-subtle',
        '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        sortable && 'cursor-pointer select-none hover:bg-basic-gray-alpha-2',
        className
      )}
      onClick={sortable ? onClick : undefined}
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
        <div className="flex items-center gap-4">
          <span>{children}</span>
          {sortDirection && (
            <Icon
              iconType={['arrows', sortDirection === 'asc' ? 'arrow-up-s' : 'arrow-down-s']}
              size={12}
              className="text-subtle"
            />
          )}
        </div>
      ) : (
        children
      )}
    </th>
  )
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'height-32 padding-x-10 align-middle',
        'font-body size-sm line-height-leading-5 text-default',
        '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
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
      className={cn('mt-4 size-sm font-body text-subtle', className)}
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
