import { useState, useCallback, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { TooltipTrigger } from '../../tooltip/Tooltip/TooltipTrigger';
import { Icon } from '../../icons/Icon';
import { useTableTooltipOptional } from '../components/useTableTooltip';

interface CellTextProps {
  value: string | number | null | undefined;
  tooltip?: boolean | ReactNode;
  copyable?: boolean;
  className?: string;
}

export function CellText({
  value,
  tooltip = false,
  copyable = false,
  className,
}: CellTextProps) {
  const [copied, setCopied] = useState(false);
  const displayValue = value ?? '-';
  const elementRef = useRef<HTMLSpanElement | HTMLButtonElement>(null);
  const tableTooltip = useTableTooltipOptional();
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    if (value == null) return;

    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Failed to copy
    }
  }, [value]);

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
      className={cn('block w-full min-w-[0px] truncate font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-default', className)}
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
        className={cn(
          'inline-flex items-center ds-gap-4 truncate max-w-full',
          'font-body size-xs line-height-leading-4 letter-spacing-tracking-tight text-default',
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
            'shrink-0 opacity-0 group-hover:opacity-100 transition-opacity',
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
