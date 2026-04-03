import * as React from 'react';

import { cn } from '@/lib/utils';
import { TooltipTrigger } from '../tooltip';

interface TruncatedTextProps {
  children: React.ReactNode;
  className?: string;
  tooltipContent?: React.ReactNode;
}

const TruncatedText = React.memo<TruncatedTextProps>(
  ({ children, className, tooltipContent }) => {
    const textRef = React.useRef<HTMLSpanElement>(null);
    const [open, setOpen] = React.useState(false);

    const handleOpenChange = React.useCallback((newOpen: boolean) => {
      if (newOpen) {
        const el = textRef.current;
        if (el && el.scrollWidth > el.clientWidth) {
          setOpen(true);
        }
      } else {
        setOpen(false);
      }
    }, []);

    return (
      <TooltipTrigger
        content={tooltipContent ?? children}
        open={open}
        onOpenChange={handleOpenChange}
        placement="top"
        delay={100}
        asChild
      >
        <span ref={textRef} className={cn('block truncate', className)}>
          {children}
        </span>
      </TooltipTrigger>
    );
  }
);
TruncatedText.displayName = 'TruncatedText';

export { TruncatedText };
export type { TruncatedTextProps };
