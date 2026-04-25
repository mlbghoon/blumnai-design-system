import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { TooltipTrigger } from '../../tooltip/Tooltip/TooltipTrigger';
import { Icon } from '../../icons/Icon';
import { useTableTooltipOptional } from '../components/useTableTooltip';
import { useCellAlign } from '../components/useCellAlign';
import { useTableFontSize, getTableFontClasses } from '../components/TableFontSizeContext';

interface CellTextProps {
  value: string | number | null | undefined;
  /**
   * 클립보드에 복사할 값 (미지정 시 `value` 사용).
   *
   * `value`를 truncate해서 짧게 표시하되, 복사 시에는 원문 전체를 넘겨야 할 때 사용합니다.
   * 예: 5KB 메모를 100자만 표시하고 전체 텍스트를 복사하는 경우.
   */
  copyValue?: string;
  tooltip?: boolean | ReactNode;
  copyable?: boolean;
  onCopy?: (value: string) => void;
  className?: string;
}

export function CellText({
  value,
  copyValue,
  tooltip = false,
  copyable = false,
  onCopy,
  className,
}: CellTextProps) {
  const [copied, setCopied] = useState(false);
  const displayValue = value ?? '-';
  const elementRef = useRef<HTMLSpanElement | HTMLButtonElement>(null);
  const tableTooltip = useTableTooltipOptional();
  const cellAlign = useCellAlign();
  const fontSize = useTableFontSize();
  const fontClasses = getTableFontClasses(fontSize);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      tableTooltip?.hideTooltip();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    const payload = copyValue ?? (value == null ? null : String(value));
    if (payload == null || payload === '') return;

    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      onCopy?.(payload);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Failed to copy
    }
  }, [value, copyValue, onCopy]);

  const getTooltipContent = useCallback((): ReactNode => {
    if (typeof tooltip === 'boolean') {
      return displayValue;
    }
    return tooltip;
  }, [tooltip, displayValue]);

  const handleMouseEnter = useCallback(() => {
    if (!tooltip || !tableTooltip || !elementRef.current) return;

    hoverTimeoutRef.current = setTimeout(() => {
      if (elementRef.current) {
        tableTooltip.showTooltip(elementRef.current, getTooltipContent());
      }
    }, 200);
  }, [tooltip, tableTooltip, getTooltipContent]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    tableTooltip?.hideTooltip();
  }, [tableTooltip]);

  const useSingletonTooltip = tooltip && tableTooltip;

  const content = (
    <span
      ref={elementRef as React.RefObject<HTMLSpanElement>}
      className={cn(
        'block w-full min-w-[0px] truncate font-body letter-spacing-tracking-tight text-default',
        fontClasses,
        cellAlign === 'center' && 'text-center',
        cellAlign === 'right' && 'text-right',
        className,
      )}
      onMouseEnter={useSingletonTooltip ? handleMouseEnter : undefined}
      onMouseLeave={useSingletonTooltip ? handleMouseLeave : undefined}
    >
      {displayValue}
    </span>
  );

  if (!tooltip && !copyable) {
    return content;
  }

  if (copyable) {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${displayValue}`}
        className={cn(
          'inline-flex items-center ds-gap-4 truncate max-w-full',
          'font-body letter-spacing-tracking-tight text-default',
          fontClasses,
          'hover:text-state-primary cursor-pointer',
          className
        )}
      >
        <span className="truncate">{displayValue}</span>
        <Icon
          iconType={['document', copied ? 'file-check' : 'file-copy']}
          size={12}
          color={copied ? 'success' : 'default-subtle'}
          className={cn(
            'shrink-0 opacity-0 group-hover/cell:opacity-100 transition-opacity',
            copied && 'opacity-100'
          )}
        />
      </button>
    );
  }

  if (useSingletonTooltip) {
    return content;
  }

  return (
    <TooltipTrigger
      content={typeof tooltip === 'boolean' ? String(displayValue) : tooltip}
      delay={200}
      maxWidth={600}
    >
      {content}
    </TooltipTrigger>
  );
}
