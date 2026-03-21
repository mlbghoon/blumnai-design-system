import { memo, useEffect, useRef } from 'react';
import { cn } from '../../../utils/cn';
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

  useEffect(() => {
    if (selectedValue === undefined) return;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        selectedRef.current?.scrollIntoView({ block: 'center' });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedValue]);

  return (
    <div className={cn('flex flex-col ds-gap-4', className)}>
      <span className="size-xs text-muted font-medium font-body text-center padding-y-2">
        {label}
      </span>
      <ScrollArea maxHeight={224} className="flex flex-col">
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
