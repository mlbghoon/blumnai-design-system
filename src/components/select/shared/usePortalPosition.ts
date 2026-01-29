import { useRef, useEffect, useLayoutEffect, useCallback } from 'react';

export const usePortalPosition = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  portal: boolean,
) => {
  const portalRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!containerRef.current || !portalRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const gap = 8;

    portalRef.current.style.top = `${rect.bottom + window.scrollY + gap}px`;
    portalRef.current.style.left = `${rect.left + window.scrollX}px`;
    portalRef.current.style.width = `${rect.width}px`;
  }, [containerRef]);

  useLayoutEffect(() => {
    if (!isOpen || !portal) return;
    updatePosition();
  }, [isOpen, portal, updatePosition]);

  useEffect(() => {
    if (!isOpen || !portal) return;

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, portal, updatePosition]);

  return portalRef;
};
