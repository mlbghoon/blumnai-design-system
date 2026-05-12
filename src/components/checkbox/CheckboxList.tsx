import * as React from 'react';

import { cn } from '@/lib/utils';
import { resolveCaption } from '../input/shared/resolveCaption';
import { InputCaption } from '../input/shared/InputCaption';
import { Checkbox } from './Checkbox';
import type { CheckboxListProps } from './CheckboxList.types';

const CheckboxList = React.forwardRef<HTMLDivElement, CheckboxListProps>(
  ({ items, listStyle = 'default', checkboxStyle = 'with-shadow', name, onItemChange, error, success, caption, className }, ref) => {
    const { hasError, hasSuccess, captionText, showCaption } = resolveCaption(error, success, caption);
    const groupClassName = cn(
      'flex flex-col',
      listStyle === 'default' && 'ds-gap-24'
    );

    const handleItemChange = (id: string) => (checked: boolean | 'indeterminate') => {
      onItemChange?.(id, checked !== false);
    };

    const captionElement = showCaption ? (
      <InputCaption error={hasError} success={hasSuccess}>
        {captionText}
      </InputCaption>
    ) : null;

    const itemElements = items.map((item) => {
      const checkbox = (
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
      );

      if (listStyle === 'bordered') {
        return (
          <div key={item.id} className="w-full padding-y-12 border-b-default">
            {checkbox}
          </div>
        );
      }

      return checkbox;
    });

    if (!showCaption) {
      return (
        <div ref={ref} role="group" className={cn(groupClassName, className)}>
          {itemElements}
        </div>
      );
    }

    return (
      <div className={cn('flex flex-col', className)}>
        <div ref={ref} role="group" className={groupClassName}>
          {itemElements}
        </div>
        {captionElement}
      </div>
    );
  }
);

CheckboxList.displayName = 'CheckboxList';

export { CheckboxList };
