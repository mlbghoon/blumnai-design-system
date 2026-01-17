
import { cn } from '../../../utils/cn';

import type { TooltipItemType } from './Tooltip.types';

export type { TooltipItemType } from './Tooltip.types';

export interface TooltipItemProps {
  /**
   * The type of tooltip item.
   * - `divider`: A horizontal line separator
   * - `label`: Label with optional caption
   * - `item`: Item with indicator/icon, label, and caption
   * - `text`: Plain text content
   */
  type: TooltipItemType;
  /**
   * The label text (for label and item types).
   */
  label?: string;
  /**
   * The caption text (for label and item types).
   */
  caption?: string;
  /**
   * The indicator color (for item type).
   * Can be a hex color or a color name.
   */
  indicatorColor?: string;
  /**
   * The icon name (for item type with icon).
   */
  icon?: string;
  /**
   * The text content (for text type).
   */
  text?: string;
  /**
   * If true, applies dark mode styles.
   * @default false
   */
  darkMode?: boolean;
}

/**
 * TooltipItem component
 *
 * Renders different types of tooltip items for the advanced variant.
 */
export const TooltipItem = ({
  type,
  label,
  caption,
  indicatorColor,
  icon,
  text,
  darkMode = false,
}: TooltipItemProps) => {
  // Divider component - horizontal line with padding
  if (type === 'divider') {
    return (
      <div
        className={cn(
          'self-stretch',
          'py-0.5 px-1', // padding: 2px top/bottom, 4px left/right
          'flex items-center justify-start gap-2',
          'relative'
        )}
      >
        <div
          className={cn(
            'absolute left-1 right-1', // horizontal padding from parent
            'h-px',
            darkMode ? 'bg-[rgba(255,255,255,0.1)]' : 'bg-[rgba(39,39,42,0.1)]' // stroke color from Figma
          )}
        />
      </div>
    );
  }

  // Text component (plain text) - HORIZONTAL layout like Caption variant
  // Padding: 2px top/bottom, 4px left/right, gap: 8px
  if (type === 'text') {
    const textColor = darkMode ? 'text-[rgba(255,255,255,0.5)]' : 'text-[#6F6F77]';
    return (
      <div className={cn('self-stretch', 'py-0.5 px-1', 'flex items-center justify-start gap-2')}>
        <span className={cn('flex-1', 'text-xs leading-4 font-normal', 'break-words', textColor)}>
          {text}
        </span>
      </div>
    );
  }

  // Label component (label + caption) - HORIZONTAL layout
  // Padding: 2px top/bottom, 4px left/right, gap: 8px
  if (type === 'label') {
    const labelColor = darkMode ? 'text-white' : 'text-[#111115]';
    const captionColor = darkMode ? 'text-[rgba(255,255,255,0.5)]' : 'text-[#6F6F77]';

    return (
      <div className={cn('self-stretch', 'py-0.5 px-1', 'flex items-center justify-start gap-2')}>
        {label && (
          <span className={cn('flex-1', 'text-xs leading-4 font-medium', 'break-words', labelColor)}>
            {label}
          </span>
        )}
        {caption && (
          <span className={cn('text-xs leading-4 font-normal', 'break-words', captionColor)}>
            {caption}
          </span>
        )}
      </div>
    );
  }

  // Item component (indicator/icon + label + caption) - HORIZONTAL layout
  // Indicator: 8x8 with borderRadius 2 (not 16x16 circle!)
  // Padding: 2px top/bottom, 4px left/right, gap: 6px
  if (type === 'item') {
    const labelColor = darkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[#4E4E55]';
    const captionColor = darkMode ? 'text-[rgba(255,255,255,0.5)]' : 'text-[#6F6F77]';

    return (
      <div className={cn('self-stretch', 'py-0.5 px-1', 'flex items-center justify-start gap-1.5')}>
        {indicatorColor && (
          <div className={cn('w-4 h-4', 'flex items-center justify-center', 'overflow-hidden', 'flex-shrink-0')}>
            <div
              className={cn('w-2 h-2', 'rounded-[2px]', 'relative')}
              style={{ backgroundColor: indicatorColor }}
            />
          </div>
        )}
        {icon && (
          <div className={cn('w-4 h-4', 'flex items-center justify-center', 'overflow-hidden', 'flex-shrink-0')}>
            <div className={cn('w-2 h-2 rounded-[2px]', indicatorColor ? `bg-[${indicatorColor}]` : 'bg-[#6F6F77]')} />
          </div>
        )}
        {label && (
          <span className={cn('flex-1', 'text-xs leading-4 font-medium', 'break-words', labelColor)}>
            {label}
          </span>
        )}
        {caption && (
          <span className={cn('text-xs leading-4 font-normal', 'break-words', captionColor)}>
            {caption}
          </span>
        )}
      </div>
    );
  }

  return null;
};
