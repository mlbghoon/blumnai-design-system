import type { Ref, RefCallback } from 'react';

/**
 * 여러 ref를 하나의 ref 콜백으로 합성합니다.
 * 전달된 각 ref(콜백 형태든 객체 형태든)가 동일한 node를 받습니다.
 *
 * 훅이 아니기 때문에 호출할 때마다 새로운 함수를 반환합니다.
 * 호출자가 ref 식별자 안정성을 원한다면 직접 `useMemo`/`useCallback`으로 감싸야 합니다.
 *
 * 참고: 이 파일은 현재 의도적으로 `src/index.ts`에서 공개 export되지 않습니다.
 * `useMergeRefs`가 내부적으로 이 함수에 위임하여 사용합니다.
 * 외부 consumer가 필요해지면 별도 PR에서 export 여부를 결정하세요.
 *
 * @example
 * const Component = forwardRef<HTMLDivElement, Props>((props, forwardedRef) => {
 *   const localRef = useRef<HTMLDivElement>(null);
 *   return <div ref={composeRefs(localRef, forwardedRef)} />;
 * });
 */
export function composeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): RefCallback<T> {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}
