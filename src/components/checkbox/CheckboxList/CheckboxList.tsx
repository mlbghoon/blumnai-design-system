import { forwardRef } from 'react';

import { Checkbox } from '../Checkbox/Checkbox';
import { cn } from '../../../utils/cn';

import type { CheckboxListProps } from './CheckboxList.types';

/**
 * CheckboxList 컴포넌트
 *
 * 여러 체크박스를 리스트 형태로 표시하는 컴포넌트입니다.
 * 각 아이템은 제목과 선택적 설명을 포함할 수 있습니다.
 */
export const CheckboxList = forwardRef<HTMLDivElement, CheckboxListProps>(
  ({ items, style = 'default', checkboxStyle = 'with-shadow', className }, ref) => {
    const containerClassName = cn(
      'flex flex-col',
      style === 'bordered'
        ? 'border-t border-b border-default py-3 gap-3'
        : 'gap-6',
      className
    );

    const itemRowClassName = 'flex items-start gap-2.5';

    const textContainerClassName = 'flex-1 flex flex-col gap-1';

    const getTitleClassName = (disabled?: boolean) => {
      return cn(
        'size-sm font-medium line-height-leading-5',
        disabled ? 'text-hint' : 'text-default'
      );
    };

    const getDescriptionClassName = (disabled?: boolean) => {
      return cn(
        'size-sm font-normal line-height-leading-5',
        disabled ? 'text-hint' : 'text-subtle'
      );
    };

    const checkboxWrapperClassName = 'w-5 h-5 flex items-center justify-center shrink-0';

    return (
      <div ref={ref} className={containerClassName}>
        {style === 'default' ? (
          items.map((item) => (
            <div key={item.id} className={itemRowClassName}>
              <div className={checkboxWrapperClassName}>
                <Checkbox
                  checked={item.checked}
                  disabled={item.disabled}
                  style={checkboxStyle}
                  onChange={(e) => {
                    item.onChange?.(e.target.checked);
                  }}
                  className="m-0"
                />
              </div>
              <div className={textContainerClassName}>
                <div className={getTitleClassName(item.disabled)}>{item.title}</div>
                {item.description && (
                  <div className={getDescriptionClassName(item.disabled)}>{item.description}</div>
                )}
              </div>
            </div>
          ))
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'w-full',
                index < items.length - 1 && 'border-b border-default pb-3',
                index > 0 && 'pt-3'
              )}
            >
              <div className={itemRowClassName}>
                <div className={checkboxWrapperClassName}>
                  <Checkbox
                    checked={item.checked}
                    disabled={item.disabled}
                    style={checkboxStyle}
                    onChange={(e) => {
                      item.onChange?.(e.target.checked);
                    }}
                    className="m-0"
                  />
                </div>
                <div className={textContainerClassName}>
                  <div className={getTitleClassName(item.disabled)}>{item.title}</div>
                  {item.description && (
                    <div className={getDescriptionClassName(item.disabled)}>{item.description}</div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
);

CheckboxList.displayName = 'CheckboxList';
