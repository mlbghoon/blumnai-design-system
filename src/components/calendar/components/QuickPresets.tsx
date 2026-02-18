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
  return (
    <div
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
            key={index}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(preset)}
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
