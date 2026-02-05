import { cn } from '@/lib/utils';
import { Pagination } from '../../pagination';
import type { PaginationVariant } from '../../pagination';
import { Select } from '../../select';

interface DataGridPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  limitOptions?: number[];
  limitOptionLabel?: (limit: number) => string;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  pageChangeConfirmMessage?: string;
  align?: 'left' | 'center' | 'right';
  variant?: PaginationVariant;
  maxVisiblePages?: number;
  disabled?: boolean;
  hideNavButtons?: boolean;
  resultTextFormatter?: (current: number, total: number) => string;
  showItemCount?: boolean;
}

const defaultLimitOptionLabel = (limit: number) => `${limit}개씩 보기`;

export function DataGridPagination({
  page,
  totalPages,
  total,
  limit,
  limitOptions = [10, 20, 50, 100],
  limitOptionLabel = defaultLimitOptionLabel,
  startIndex,
  endIndex,
  onPageChange,
  onLimitChange,
  pageChangeConfirmMessage,
  align = 'right',
  variant = 'numbered',
  maxVisiblePages,
  disabled,
  hideNavButtons,
  resultTextFormatter,
  showItemCount = true,
}: DataGridPaginationProps) {
  const showLeftSection = showItemCount || onLimitChange;

  const limitSelector = onLimitChange && (
    <Select
      size="sm"
      selectStyle="default"
      options={limitOptions.map((option) => ({
        id: String(option),
        label: limitOptionLabel(option),
      }))}
      value={String(limit)}
      onChange={(value) => onLimitChange(Number(value))}
      width={140}
    />
  );

  const paginationElement = (
    <Pagination
      variant={variant}
      page={page}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      pageChangeConfirmMessage={pageChangeConfirmMessage}
      maxVisiblePages={maxVisiblePages}
      disabled={disabled}
      hideNavButtons={hideNavButtons}
      resultTextFormatter={resultTextFormatter}
    />
  );

  return (
    <div
      className={cn(
        'flex items-center padding-y-8 padding-x-10 border-t-default',
        align === 'left' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'right' && showLeftSection && 'justify-between',
        align === 'right' && !showLeftSection && 'justify-end'
      )}
    >
      {align === 'right' && showLeftSection && (
        <div className="flex items-center gap-8">
          {showItemCount && (
            <span className="font-body size-sm text-subtle">
              {startIndex}-{endIndex} / {total}
            </span>
          )}
          {limitSelector}
        </div>
      )}

      {align === 'center' && paginationElement}

      {align === 'left' && (
        <>
          {paginationElement}
          {showLeftSection && (
            <div className="flex items-center gap-8 ml-auto">
              {showItemCount && (
                <span className="font-body size-sm text-subtle">
                  {startIndex}-{endIndex} / {total}
                </span>
              )}
              {limitSelector}
            </div>
          )}
        </>
      )}

      {align === 'right' && paginationElement}
    </div>
  );
}
