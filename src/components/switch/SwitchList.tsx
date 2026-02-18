import * as React from 'react';

import { cn } from '@/lib/utils';
import { Switch } from './Switch';
import type { SwitchListProps } from './SwitchList.types';

const SwitchList = React.forwardRef<HTMLDivElement, SwitchListProps>(
  ({ items, listStyle = 'default', color = 'green', onItemChange, className }, ref) => {
    const containerClassName = cn(
      'flex flex-col',
      listStyle === 'default' && 'ds-gap-24',
      className
    );

    const handleItemChange = (id: string) => (checked: boolean) => {
      onItemChange?.(id, checked);
    };

    if (listStyle === 'bordered') {
      return (
        <div ref={ref} className={containerClassName}>
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
      <div ref={ref} className={containerClassName}>
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
