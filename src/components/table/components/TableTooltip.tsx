import { useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from '@floating-ui/react';

import { Tooltip } from '../../tooltip/Tooltip/Tooltip';
import { TableTooltipContext, type TableTooltipContextValue } from './TableTooltipContext';
import { usePortalContainer } from '../../../utils/PortalContainerContext';

interface TableTooltipProviderProps {
  children: ReactNode;
}

export function TableTooltipProvider({ children }: TableTooltipProviderProps) {
  const portalContainer = usePortalContainer();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [floating, setFloating] = useState<HTMLDivElement | null>(null);

  const { floatingStyles } = useFloating({
    open: isOpen && anchor !== null,
    placement: 'top',
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
    elements: {
      reference: anchor,
      floating,
    },
  });

  const showTooltip = useCallback(
    (anchorElement: HTMLElement, tooltipContent: ReactNode) => {
      setAnchor(anchorElement);
      setContent(tooltipContent);
      setIsOpen(true);
    },
    []
  );

  const hideTooltip = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        hideTooltip();
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isOpen, hideTooltip]);

  const contextValue = useMemo<TableTooltipContextValue>(
    () => ({ showTooltip, hideTooltip }),
    [showTooltip, hideTooltip]
  );

  const shouldShow = isOpen && anchor !== null;

  return (
    <TableTooltipContext.Provider value={contextValue}>
      {children}
      {shouldShow &&
        createPortal(
          <div
            ref={setFloating}
            style={{ ...floatingStyles, zIndex: 50 }}
          >
            <Tooltip maxWidth={600}>{content}</Tooltip>
          </div>,
          portalContainer ?? document.body
        )}
    </TableTooltipContext.Provider>
  );
}
