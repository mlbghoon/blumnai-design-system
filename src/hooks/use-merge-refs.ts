import { useCallback } from 'react';
import type { Ref, RefCallback } from 'react';

export function useMergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return useCallback((node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && typeof ref === 'object') {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
