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
  ({ items, style = 'default', size = 'md', checkboxStyle = 'with-shadow', darkMode = false, className }, ref) => {
    // Container styles
    const containerClassName = cn(
      'flex flex-col',
      style === 'bordered'
        ? 'border-t border-b border-[rgba(39,39,42,0.10)] py-3 gap-3' // padding: 12px, gap: 12px
        : 'gap-6', // gap: 24px for default style
      className
    );

    // Item row styles (checkbox + text)
    const itemRowClassName = 'flex items-start gap-2.5'; // gap: 10px between checkbox and text

    // Text container styles
    const textContainerClassName = 'flex-1 flex flex-col gap-1'; // gap: 4px between title and description

    // Title styles
    const getTitleClassName = (disabled?: boolean) => {
      return cn(
        'text-sm font-medium leading-5', // fontSize: 14, fontWeight: 500, lineHeight: 20
        disabled
          ? 'text-[rgba(39,39,42,0.30)]'
          : darkMode
            ? 'text-white'
            : 'text-[#111115]'
      );
    };

    // Description styles
    const getDescriptionClassName = (disabled?: boolean) => {
      return cn(
        'text-sm font-normal leading-5', // fontSize: 14, fontWeight: 400, lineHeight: 20
        disabled
          ? 'text-[rgba(39,39,42,0.30)]'
          : darkMode
            ? 'text-[rgba(255,255,255,0.6)]'
            : 'text-[#4E4E55]'
      );
    };

    // Checkbox wrapper (20x20px container for alignment)
    const checkboxWrapperClassName = 'w-5 h-5 flex items-center justify-center shrink-0';

    return (
      <div ref={ref} className={containerClassName}>
        {style === 'default' ? (
          // Simple list: gap between items is 24px (handled by container gap-6)
          items.map((item) => (
            <div key={item.id} className={itemRowClassName}>
              <div className={checkboxWrapperClassName}>
                <Checkbox
                  checked={item.checked}
                  indeterminate={item.indeterminate}
                  disabled={item.disabled}
                  size={size}
                  style={checkboxStyle}
                  darkMode={darkMode}
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
          // Bordered list: items with borders between them
          items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'w-full',
                index < items.length - 1 && 'border-b border-[rgba(39,39,42,0.10)] pb-3',
                index > 0 && 'pt-3'
              )}
            >
              <div className={itemRowClassName}>
                <div className={checkboxWrapperClassName}>
                  <Checkbox
                    checked={item.checked}
                    indeterminate={item.indeterminate}
                    disabled={item.disabled}
                    size={size}
                    style={checkboxStyle}
                    darkMode={darkMode}
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
