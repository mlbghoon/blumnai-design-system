import { useCallback, useEffect, useRef, useState } from 'react';

declare const process: { env: { NODE_ENV?: string } } | undefined;

interface UseControllableOpenParams {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

/**
 * Controlled/uncontrolled open-state merge.
 *
 * - When `open` is provided, the picker is controlled: setter only fires `onOpenChange`.
 * - When `open` is undefined, the picker manages internal state; `onOpenChange` still fires if provided.
 * - Setter identity is stable across renders (ref-latest pattern).
 * - Dev warning when `open` is provided without `onOpenChange`.
 */
export function useControllableOpen({
  open,
  onOpenChange,
  defaultOpen = false,
}: UseControllableOpenParams): [boolean, (next: boolean) => void] {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internalOpen;

  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });

  const warnedRef = useRef(false);
  useEffect(() => {
    const isDev = typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production';
    if (isDev && isControlled && !onOpenChange && !warnedRef.current) {
      warnedRef.current = true;
      console.warn(
        '[useControllableOpen] `open` prop provided without `onOpenChange`. The picker cannot close (outside-click / ESC / Apply will fire onOpenChange but nothing will respond).',
      );
    }
  }, [isControlled, onOpenChange]);

  const setOpen = useCallback((next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChangeRef.current?.(next);
  }, [isControlled]);

  return [actualOpen, setOpen];
}
