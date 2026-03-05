import { useRef, useCallback } from 'react';
import { cn } from '../../../utils/cn';
import type { QuickPreset } from '../DatePicker.types';

export interface QuickPresetsProps {
  presets: QuickPreset[];
  onSelect: (preset: QuickPreset) => void;
  selectedIndex?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * 빠른 날짜 선택 프리셋 컴포넌트
 */
export const QuickPresets = ({
  presets,
  onSelect,
  selectedIndex,
  disabled = false,
  className,
}: QuickPresetsProps) => {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = index < presets.length - 1 ? index + 1 : 0;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = index > 0 ? index - 1 : presets.length - 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = presets.length - 1;
        break;
    }

    if (nextIndex !== null) {
      itemRefs.current[nextIndex]?.focus();
    }
  }, [presets.length]);

  return (
    <div
      role="listbox"
      aria-label="Quick presets"
      className={cn(
        'flex flex-col ds-gap-4 padding-8',
        'w-[160px] self-stretch',
        'border-r-default',
        className
      )}
    >
      {presets.map((preset, index) => {
        const isSelected = selectedIndex === index;

        return (
          <button
            key={preset.label}
            ref={(el) => { itemRefs.current[index] = el; }}
            type="button"
            role="option"
            aria-selected={isSelected}
            tabIndex={isSelected || (selectedIndex === undefined && index === 0) ? 0 : -1}
            disabled={disabled}
            onClick={() => onSelect(preset)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'padding-x-8 padding-y-4 rounded-xs text-left',
              'font-body size-sm line-height-leading-5 letter-spacing-tracking-tight font-medium',
              'transition-colors whitespace-nowrap',
              'focus-visible:outline-none',
              disabled
                ? 'text-hint cursor-not-allowed'
                : isSelected
                  ? 'cursor-pointer bg-state-brand text-white-default hover:bg-state-brand-hover'
                  : 'cursor-pointer text-subtle hover:bg-state-ghost-hover focus-visible:[box-shadow:0_0_0_2px_var(--border-highlight-accent)]'
            )}
            style={{ height: '28px' }}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
};

QuickPresets.displayName = 'QuickPresets';
