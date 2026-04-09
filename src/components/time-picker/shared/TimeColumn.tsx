import { memo, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../../scroll-area';

export interface TimeColumnItem {
  value: number;
  label: string;
}

export interface TimeColumnProps {
  label: string;
  items: TimeColumnItem[];
  selectedValue: number | undefined;
  onSelect: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const TimeColumn = memo(function TimeColumn({
  label,
  items,
  selectedValue,
  onSelect,
  disabled,
  className,
}: TimeColumnProps) {
  const selectedRef = useRef<HTMLButtonElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedValue === undefined) return;
    const frame = requestAnimationFrame(() => {
      const btn = selectedRef.current;
      const viewport = viewportRef.current;
      if (!btn || !viewport) return;
      // 선택된 버튼을 viewport 중앙에 배치합니다. scrollIntoView는 모든 스크롤 가능
      // 조상을 연쇄적으로 스크롤하기 때문에 Popover 뒤 페이지까지 스크롤될 수 있습니다.
      // 여기서는 ScrollArea viewport에만 범위를 한정하여 scrollTop을 직접 설정합니다.
      const btnTop = btn.offsetTop;
      const btnHeight = btn.offsetHeight;
      const viewportHeight = viewport.clientHeight;
      viewport.scrollTop = Math.max(0, btnTop - (viewportHeight - btnHeight) / 2);
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedValue]);

  return (
    <div className={cn('flex flex-col ds-gap-4', className)}>
      <span className="size-xs text-muted font-medium font-body text-center padding-y-2">
        {label}
      </span>
      <ScrollArea maxHeight={224} className="flex flex-col" viewportRef={viewportRef}>
        <div className="flex flex-col ds-gap-2">
          {items.map((item) => {
            const isSelected = item.value === selectedValue;
            return (
              <button
                key={item.value}
                ref={isSelected ? selectedRef : undefined}
                type="button"
                disabled={disabled}
                onClick={() => onSelect(item.value)}
                className={cn(
                  'width-40 height-32 flex items-center justify-center',
                  'size-sm font-body rounded-md border-0',
                  'transition-colors duration-150 cursor-pointer',
                  isSelected
                    ? 'bg-state-soft text-basic-blue-strong font-medium'
                    : 'hover:bg-state-ghost-hover text-default',
                  disabled && 'opacity-50 pointer-events-none'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
});
