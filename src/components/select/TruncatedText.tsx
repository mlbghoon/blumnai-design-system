import * as React from 'react';

import { cn } from '@/lib/utils';
import { TooltipTrigger } from '../tooltip';

interface TruncatedTextProps {
  children: React.ReactNode;
  className?: string;
  tooltipContent?: React.ReactNode;
  /**
   * 오버플로우 시 자동 툴팁 표시 비활성화. 외부에서 다른 툴팁을 제공할 때 충돌 방지용
   */
  disableTooltip?: boolean;
}

const TruncatedText = React.memo<TruncatedTextProps>(
  ({ children, className, tooltipContent, disableTooltip }) => {
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

    if (disableTooltip) {
      return (
        <span ref={textRef} className={cn('block truncate', className)}>
          {children}
        </span>
      );
    }

    return (
      <TooltipTrigger
        content={tooltipContent ?? children}
        open={open}
        onOpenChange={handleOpenChange}
        placement="top"
        delay={100}
        asChild
        // Searchable Select 등 `PortalContainerProvider` 가 걸린 popover 안에서
        // 렌더될 때, 툴팁이 popover 의 overflow-hidden viewport 안으로 portal 되어
        // 잘리는 문제 방지. 항상 document.body + z-index 10001 로 띄운다.
        escapePortalContext
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
