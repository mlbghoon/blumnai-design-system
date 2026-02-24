import * as React from 'react';

import { cn } from '@/lib/utils';
import { Radio, RadioGroup } from './Radio';
import type { RadioListProps } from './RadioList.types';

const RadioList = React.forwardRef<HTMLDivElement, RadioListProps>(
  ({ items, value, onValueChange, listStyle = 'default', radioStyle = 'with-shadow', disabled = false, className }, ref) => {
    const containerClassName = cn(
      'flex flex-col',
      listStyle === 'default' && 'ds-gap-24',
      className
    );

    if (listStyle === 'bordered') {
      return (
        <RadioGroup
          ref={ref}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          className={containerClassName}
        >
          {items.map((item) => (
            <div
              key={item.value}
              className="w-full padding-y-12 border-b-default"
            >
              <Radio
                value={item.value}
                disabled={item.disabled}
                radioStyle={radioStyle}
                label={item.title}
                description={item.description}
              />
            </div>
          ))}
        </RadioGroup>
      );
    }

    return (
      <RadioGroup
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        className={containerClassName}
      >
        {items.map((item) => (
          <Radio
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            radioStyle={radioStyle}
            label={item.title}
            description={item.description}
          />
        ))}
      </RadioGroup>
    );
  }
);

RadioList.displayName = 'RadioList';

export { RadioList };
