import { useMemo } from 'react';
import type { Ref, RefCallback } from 'react';
import { composeRefs } from './compose-refs';

/**
 * 여러 ref를 합쳐 하나의 ref 콜백을 반환합니다.
 *
 * @deprecated 내부적으로 `composeRefs`(plain 함수)에 위임합니다.
 * rest-args 배열은 매 렌더마다 새로 생성되므로, 이 훅의 memoization은
 * 항상 무효화되어 매 렌더마다 새로운 콜백을 반환합니다. 즉 콜백 식별자
 * 안정성이 필요하다면 이 훅으로는 얻을 수 없습니다 — 호출자가 직접
 * `useMemo`/`useCallback`으로 refs를 감싸거나, 내부 `composeRefs`
 * 헬퍼를 직접 사용하세요.
 *
 * 기존 consumer를 위한 backwards-compat 용도로 유지됩니다.
 */
export function useMergeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => composeRefs(...refs), refs);
}
