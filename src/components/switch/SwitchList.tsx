import * as React from 'react';

import { cn } from '@/lib/utils';
import { Switch } from './Switch';
import type { SwitchListProps } from './SwitchList.types';

const SwitchList = React.forwardRef<HTMLDivElement, SwitchListProps>(
  ({ items, listStyle = 'default', color = 'green', onItemChange, showToggleAll = false, toggleAllLabel = '전체 토글', onToggleAll, className }, ref) => {
    const enabledItems = items.filter((item) => !item.disabled);
    const allChecked = enabledItems.length > 0 && enabledItems.every((item) => item.checked);

    const containerClassName = cn(
      'flex flex-col',
      listStyle === 'default' && 'ds-gap-24',
      className
    );

    const handleItemChange = (id: string) => (checked: boolean) => {
      onItemChange?.(id, checked);
    };

    const handleToggleAll = (checked: boolean) => {
      if (onToggleAll) {
        onToggleAll(checked);
      } else {
        enabledItems.forEach((item) => {
          if (item.checked !== checked) {
            onItemChange?.(item.id, checked);
          }
        });
      }
    };

    const toggleAllElement = showToggleAll ? (
      <Switch
        checked={allChecked}
        color={color}
        onCheckedChange={handleToggleAll}
        label={toggleAllLabel}
      />
    ) : null;

    if (listStyle === 'bordered') {
      return (
        <div ref={ref} role="group" className={containerClassName}>
          {toggleAllElement && (
            <div className="w-full padding-y-12 border-b-default">
              {toggleAllElement}
            </div>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full padding-y-12 border-b-default"
            >
              <Switch
                checked={item.checked}
                disabled={item.disabled}
                color={color}
                onCheckedChange={handleItemChange(item.id)}
                label={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} role="group" className={containerClassName}>
        {toggleAllElement}
        {items.map((item) => (
          <Switch
            key={item.id}
            checked={item.checked}
            disabled={item.disabled}
            color={color}
            onCheckedChange={handleItemChange(item.id)}
            label={item.title}
            description={item.description}
          />
        ))}
      </div>
    );
  }
);

SwitchList.displayName = 'SwitchList';

export { SwitchList };
