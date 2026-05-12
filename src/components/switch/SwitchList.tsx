import * as React from 'react';

import { cn } from '@/lib/utils';
import { resolveCaption } from '../input/shared/resolveCaption';
import { InputCaption } from '../input/shared/InputCaption';
import { Switch } from './Switch';
import type { SwitchListProps } from './SwitchList.types';

const SwitchList = React.forwardRef<HTMLDivElement, SwitchListProps>(
  ({ items, listStyle = 'default', color = 'green', onItemChange, showToggleAll = false, toggleAllLabel = '전체 토글', onToggleAll, error, success, caption, className }, ref) => {
    const { hasError, hasSuccess, captionText, showCaption } = resolveCaption(error, success, caption);
    const enabledItems = items.filter((item) => !item.disabled);
    const allChecked = enabledItems.length > 0 && enabledItems.every((item) => item.checked);

    const groupClassName = cn(
      'flex flex-col',
      listStyle === 'default' && 'ds-gap-24'
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
        disabled={enabledItems.length === 0}
        onCheckedChange={handleToggleAll}
        label={toggleAllLabel}
      />
    ) : null;

    const captionElement = showCaption ? (
      <InputCaption error={hasError} success={hasSuccess}>
        {captionText}
      </InputCaption>
    ) : null;

    const itemElements = items.map((item) => {
      const switchEl = (
        <Switch
          key={item.id}
          checked={item.checked}
          disabled={item.disabled}
          color={color}
          onCheckedChange={handleItemChange(item.id)}
          label={item.title}
          description={item.description}
        />
      );

      if (listStyle === 'bordered') {
        return (
          <div key={item.id} className="w-full padding-y-12 border-b-default">
            {switchEl}
          </div>
        );
      }

      return switchEl;
    });

    const toggleAllBordered = toggleAllElement && listStyle === 'bordered' ? (
      <div className="w-full padding-y-12 border-b-default">
        {toggleAllElement}
      </div>
    ) : toggleAllElement;

    const groupElement = (
      <div ref={ref} role="group" className={cn(groupClassName, !showCaption && className)}>
        {toggleAllBordered}
        {itemElements}
      </div>
    );

    if (!showCaption) {
      return groupElement;
    }

    return (
      <div className={cn('flex flex-col', className)}>
        {groupElement}
        {captionElement}
      </div>
    );
  }
);

SwitchList.displayName = 'SwitchList';

export { SwitchList };
