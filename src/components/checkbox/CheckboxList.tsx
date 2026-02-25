import * as React from 'react';

import { cn } from '@/lib/utils';
import { Checkbox } from './Checkbox';
import type { CheckboxListProps } from './CheckboxList.types';

const CheckboxList = React.forwardRef<HTMLDivElement, CheckboxListProps>(
  ({ items, listStyle = 'default', checkboxStyle = 'with-shadow', name, onItemChange, className }, ref) => {
    const containerClassName = cn(
      'flex flex-col',
      listStyle === 'default' && 'ds-gap-24',
      className
    );

    const handleItemChange = (id: string) => (checked: boolean | 'indeterminate') => {
      onItemChange?.(id, checked !== false);
    };

    if (listStyle === 'bordered') {
      return (
        <div ref={ref} role="group" className={containerClassName}>
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full padding-y-12 border-b-default"
            >
              <Checkbox
                checked={item.checked}
                disabled={item.disabled}
                checkboxStyle={checkboxStyle}
                name={name}
                value={item.value}
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
        {items.map((item) => (
          <Checkbox
            key={item.id}
            checked={item.checked}
            disabled={item.disabled}
            checkboxStyle={checkboxStyle}
            name={name}
            value={item.value}
            onCheckedChange={handleItemChange(item.id)}
            label={item.title}
            description={item.description}
          />
        ))}
      </div>
    );
  }
);

CheckboxList.displayName = 'CheckboxList';

export { CheckboxList };
