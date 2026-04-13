import { useEffect, useState } from 'react';

/**
 * 입력 값을 지정된 시간만큼 지연시킨 복사본을 반환합니다.
 * `value`가 바뀌지 않고 `delay` ms가 지난 후에만 업데이트됩니다.
 * 검색, 자동완성 등에서 키 입력마다 API 호출을 하지 않으려 할 때 사용합니다.
 *
 * @param value 추적할 값
 * @param delay 지연 시간 (ms). 기본값 300ms.
 *
 * @example
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebouncedValue(query, 300);
 *
 * useEffect(() => {
 *   if (debouncedQuery) void fetchSearchResults(debouncedQuery);
 * }, [debouncedQuery]);
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
