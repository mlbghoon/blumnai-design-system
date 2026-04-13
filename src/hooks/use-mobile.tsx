import * as React from 'react';

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  // SSR의 안전한 기본값. 실제 모바일 클라이언트에서는 첫 client render에서
  // getSnapshot()이 true를 반환하므로 hydration mismatch 경고가 발생할 수 있음.
  // 아래 JSDoc 참조.
  return false;
}

/**
 * 뷰포트 폭이 768px 미만일 때 `true`를 반환합니다.
 *
 * `useSyncExternalStore`를 사용하여 첫 client render에서 올바른 값을 반환합니다
 * (layout flash 없음). 모듈 스코프의 subscribe/getSnapshot을 사용하므로 여러
 * consumer가 하나의 media query listener를 공유합니다.
 *
 * ## SSR hydration 주의사항
 *
 * `getServerSnapshot`은 desktop을 가정하고 `false`를 반환합니다. 실제 모바일
 * 클라이언트에서는 서버가 렌더한 HTML이 `false`로 간주되고, 첫 client render는
 * `true`를 반환합니다. 이 훅의 값에 따라 다르게 렌더하는 엘리먼트에 대해
 * React가 dev 모드에서 hydration mismatch 경고를 발생시킵니다.
 *
 * 이는 media-query 훅의 근본적인 한계이며 이 구현의 특이사항이 아닙니다.
 * consumer는 다음 두 가지 방법으로 경고를 회피할 수 있습니다:
 *
 * 1. 조건부 렌더되는 엘리먼트에 `suppressHydrationWarning`을 사용
 * 2. `useHasMounted` 플래그로 조건부 렌더를 hydration 이후로 지연 (flash를
 *    감수하는 대신 hydration match를 얻음)
 *
 * Radix, Mantine, usehooks-ts 등 주요 media-query 훅 구현도 모두 같은
 * tradeoff를 가지고 동일한 대응을 권장합니다.
 */
export function useIsMobile(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
