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
  className,
  ...restProps
}, ref) => {
  const [openItems, setOpenItems] = useState<Set<number>>(() =>
    new Set(items.map((item, index) => (item.isOpen ? index : -1)).filter((i) => i !== -1))
  );

  const handleToggle = useCallback(
    (index: number, itemOnToggle?: () => void) => {
      if (itemOnToggle) {
        itemOnToggle();
        return;
      }

      setOpenItems((prev) => {
        const newSet = new Set(prev);
        const isCurrentlyOpen = newSet.has(index);

        if (allowMultipleOpen) {
          if (isCurrentlyOpen) {
            newSet.delete(index);
          } else {
            newSet.add(index);
          }
        } else {
          if (isCurrentlyOpen) {
            newSet.delete(index);
          } else {
            newSet.clear();
            newSet.add(index);
          }
        }

        return newSet;
      });
    },
    [allowMultipleOpen]
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
        const isControlled = item.isOpen !== undefined;
        const isOpen = isControlled ? item.isOpen : openItems.has(index);
        const itemStyle = item.style ?? style;

        return (
          <AccordionItem
            key={item.id ?? index}
            header={item.header}
            style={itemStyle}
            isOpen={isOpen}
            onToggle={() => handleToggle(index, item.onToggle)}
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
