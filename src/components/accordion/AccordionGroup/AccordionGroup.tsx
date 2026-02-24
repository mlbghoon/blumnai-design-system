import { forwardRef, useCallback, useMemo, useState } from 'react';

import { cn } from '../../../utils/cn';

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
  className,
  ...restProps
}, ref) => {
  const getItemId = useCallback((item: (typeof items)[number], index: number) => item.id ?? `__idx_${index}`, []);

  const isGroupControlled = groupOnToggle !== undefined;

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
            className={item.className}
          >
            {item.children}
          </AccordionItem>
        );
      })}
    </div>
  );
});

AccordionGroup.displayName = 'AccordionGroup';
