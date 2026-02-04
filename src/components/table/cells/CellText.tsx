import { useState, useCallback } from 'react';

import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';
import { Icon } from '../../icons/Icon';

interface CellTextProps {
  value: string | number | null | undefined;
  tooltip?: boolean;
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

  const content = (
    <span className={cn('truncate', className)}>{displayValue}</span>
  );

  if (!tooltip && !copyable) {
    return content;
  }

  if (copyable) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                'inline-flex items-center gap-4 truncate max-w-full',
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
          </TooltipTrigger>
          <TooltipContent>
            {copied ? '복사됨!' : '클릭하여 복사'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>{displayValue}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
