import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useIsMobile } from './use-mobile';

/**
 * Minimal matchMedia mock scoped to this test file. Tracks registered
 * listeners so tests can trigger change events directly.
 *
 * If a future hook or component test also needs matchMedia, consider
 * promoting this to src/test-setup.ts as a global mock.
 */
interface MockMediaQueryList {
  matches: boolean;
  media: string;
  addEventListener: (type: 'change', listener: () => void) => void;
  removeEventListener: (type: 'change', listener: () => void) => void;
}

function installMatchMediaMock(initialMatches: boolean) {
  const listeners = new Set<() => void>();
  let matches = initialMatches;

  const mql: MockMediaQueryList = {
    get matches() {
      return matches;
    },
    media: '(max-width: 767px)',
    addEventListener: (_type, listener) => {
      listeners.add(listener);
    },
    removeEventListener: (_type, listener) => {
      listeners.delete(listener);
    },
  };

  const matchMediaFn = vi.fn(() => mql);
  vi.stubGlobal('matchMedia', matchMediaFn);
  // Also attach to window for code paths that read window.matchMedia explicitly
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: matchMediaFn,
  });

  return {
    setMatches(value: boolean) {
      matches = value;
      for (const listener of listeners) listener();
    },
    listenerCount: () => listeners.size,
    matchMediaFn,
  };
}

describe('useIsMobile', () => {
  let controller: ReturnType<typeof installMatchMediaMock>;

  beforeEach(() => {
    controller = installMatchMediaMock(false);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the real viewport value on first render (no undefined→false flash)', () => {
    // Install mock set to "mobile = true" BEFORE renderHook runs.
    vi.unstubAllGlobals();
    controller = installMatchMediaMock(true);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('returns false when matchMedia reports desktop viewport', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('updates when a change event fires', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      controller.setMatches(true);
    });
    expect(result.current).toBe(true);

    act(() => {
      controller.setMatches(false);
    });
    expect(result.current).toBe(false);
  });

  it('removes the change listener on unmount', () => {
    const { unmount } = renderHook(() => useIsMobile());
    expect(controller.listenerCount()).toBeGreaterThan(0);

    unmount();
    expect(controller.listenerCount()).toBe(0);
  });
});
