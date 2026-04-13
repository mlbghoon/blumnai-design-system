import { forwardRef, useCallback, useMemo, useRef, useState, type KeyboardEvent } from 'react';

import { cn } from '@/lib/utils';

import { AccordionItem } from '../AccordionItem';
import type { AccordionGroupProps } from './AccordionGroup.types';

/**
 * AccordionGroup 컴포넌트
 *
 * 여러 AccordionItem을 그룹으로 묶어 표시하는 컨테이너입니다.
 * 아이템 간 간격을 일관되게 관리하고, 그룹 레벨에서 스타일과 상태를 제어합니다.
 */
export const AccordionGroup = forwardRef<HTMLDivElement, AccordionGroupProps>(({
  items,
  spacing = 8,
  style = 'default',
  allowMultipleOpen = true,
  onToggle: groupOnToggle,
  padding,
  className,
  ...restProps
}, ref) => {
  const getItemId = useCallback((item: (typeof items)[number], index: number) => item.id ?? `__idx_${index}`, []);

  const isGroupControlled = groupOnToggle !== undefined;

  const headerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const ids = new Set<string>();
    items.forEach((item, index) => {
      if (item.isOpen) ids.add(getItemId(item, index));
    });
    return ids;
  });

  const handleToggle = useCallback(
    (id: string, currentIsOpen: boolean, itemOnToggle?: (isOpen: boolean) => void) => {
      if (itemOnToggle) {
        itemOnToggle(!currentIsOpen);
        return;
      }

      if (isGroupControlled) {
        groupOnToggle(id, !currentIsOpen);
        return;
      }

      setOpenItems((prev) => {
        const newSet = new Set(prev);
        const isCurrentlyOpen = newSet.has(id);

        if (allowMultipleOpen) {
          if (isCurrentlyOpen) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }
        } else {
          if (isCurrentlyOpen) {
            newSet.delete(id);
          } else {
            newSet.clear();
            newSet.add(id);
          }
        }

        return newSet;
      });
    },
    [allowMultipleOpen, isGroupControlled, groupOnToggle]
  );

  const enabledIndices = useMemo(
    () => items
      .map((item, i) => ({ index: i, disabled: item.disabled ?? false }))
      .filter((e) => !e.disabled)
      .map((e) => e.index),
    [items]
  );

  const handleHeaderKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLButtonElement>) => {
      const currentEnabledPos = enabledIndices.indexOf(index);
      if (currentEnabledPos === -1) return;

      let targetIndex: number | undefined;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = enabledIndices[(currentEnabledPos + 1) % enabledIndices.length];
          break;
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = enabledIndices[(currentEnabledPos - 1 + enabledIndices.length) % enabledIndices.length];
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = enabledIndices[0];
          break;
        case 'End':
          e.preventDefault();
          targetIndex = enabledIndices[enabledIndices.length - 1];
          break;
      }

      if (targetIndex !== undefined) {
        headerRefs.current[targetIndex]?.focus();
      }
    },
    [enabledIndices]
  );

  const containerClassName = useMemo(() => {
    return cn('flex flex-col w-full', className);
  }, [className]);

  return (
    <div
      ref={ref}
      className={containerClassName}
      style={{ gap: spacing }}
      {...restProps}
    >
      {items.map((item, index) => {
        const id = getItemId(item, index);
        const isItemControlled = item.onToggle !== undefined;
        const isOpen = isItemControlled || isGroupControlled
          ? (item.isOpen ?? false)
          : openItems.has(id);
        const itemStyle = item.style ?? style;

        return (
          <AccordionItem
            key={id}
            header={item.header}
            style={itemStyle}
            isOpen={isOpen}
            onToggle={() => handleToggle(id, isOpen, item.onToggle)}
            disabled={item.disabled}
            padding={item.padding ?? padding}
            className={item.className}
            headerProps={{
              ref: (el: HTMLButtonElement | null) => { headerRefs.current[index] = el; },
              onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => handleHeaderKeyDown(index, e),
            }}
          >
            {item.children}
          </AccordionItem>
        );
      })}
    </div>
  );
});

AccordionGroup.displayName = 'AccordionGroup';
