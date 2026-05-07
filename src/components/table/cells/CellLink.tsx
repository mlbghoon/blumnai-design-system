import { useCallback, useRef, useEffect, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Icon, RiExternalLinkLine } from '../../icons/Icon';
import { useTableTooltipOptional } from '../components/useTableTooltip';
import { useTableFontSize, getTableFontClasses } from '../components/TableFontSizeContext';

interface CellLinkProps {
  href: string;
  label?: string;
  tooltip?: boolean | ReactNode;
  external?: boolean;
  className?: string;
}

export function CellLink({
  href,
  label,
  tooltip,
  external = false,
  className,
}: CellLinkProps) {
  const displayLabel = label || href;
  const elementRef = useRef<HTMLAnchorElement>(null);
  const tableTooltip = useTableTooltipOptional();
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fontSize = useTableFontSize();

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      tableTooltip?.hideTooltip();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTooltipContent = useCallback((): ReactNode => {
    if (typeof tooltip === 'boolean') {
      return displayLabel;
    }
    return tooltip;
  }, [tooltip, displayLabel]);

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

  return (
    <a
      ref={elementRef}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center ds-gap-4 truncate group',
        'text-state-primary',
        'font-body letter-spacing-tracking-tight',
        getTableFontClasses(fontSize),
        className
      )}
      onMouseEnter={tooltip ? handleMouseEnter : undefined}
      onMouseLeave={tooltip ? handleMouseLeave : undefined}
    >
      <span className="truncate group-hover:underline">{displayLabel}</span>
      {external && (
        <Icon
          icon={RiExternalLinkLine}
          size={12}
          aria-hidden="true"
        />
      )}
    </a>
  );
}
