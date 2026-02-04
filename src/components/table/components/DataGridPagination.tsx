import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/lib/utils';
import { Icon } from '../../icons/Icon';
import { Pagination } from '../../pagination';

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
  showItemCount = true,
}: DataGridPaginationProps) {
  const showLeftSection = showItemCount || onLimitChange;

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
            {limitOptions.map((option) => (
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
                <SelectPrimitive.ItemText>{limitOptionLabel(option)}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );

  const paginationElement = (
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
        'flex items-center padding-y-8 padding-x-10',
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
