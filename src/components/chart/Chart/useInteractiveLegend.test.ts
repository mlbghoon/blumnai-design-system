import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useInteractiveLegend } from './useInteractiveLegend';

describe('useInteractiveLegend', () => {
  it('toggles a series hidden and visible', () => {
    const { result } = renderHook(() => useInteractiveLegend(['a', 'b', 'c'], true));

    act(() => result.current.toggleSeries('b'));
    expect(result.current.isHidden('b')).toBe(true);
    expect(result.current.isHidden('a')).toBe(false);

    act(() => result.current.toggleSeries('b'));
    expect(result.current.isHidden('b')).toBe(false);
  });

  it('prevents hiding the last visible series', () => {
    const { result } = renderHook(() => useInteractiveLegend(['a', 'b'], true));

    act(() => result.current.toggleSeries('a'));
    expect(result.current.isHidden('a')).toBe(true);

    act(() => result.current.toggleSeries('b'));
    expect(result.current.isHidden('b')).toBe(false);
  });

  it('is no-op for single-series chart', () => {
    const { result } = renderHook(() => useInteractiveLegend(['only'], true));

    act(() => result.current.toggleSeries('only'));
    expect(result.current.isHidden('only')).toBe(false);
  });

  it('re-enables hidden series', () => {
    const { result } = renderHook(() => useInteractiveLegend(['a', 'b', 'c'], true));

    act(() => result.current.toggleSeries('a'));
    act(() => result.current.toggleSeries('c'));
    expect(result.current.isHidden('a')).toBe(true);
    expect(result.current.isHidden('c')).toBe(true);

    act(() => result.current.toggleSeries('a'));
    expect(result.current.isHidden('a')).toBe(false);
    expect(result.current.isHidden('c')).toBe(true);
  });

  it('returns no-op when disabled', () => {
    const { result } = renderHook(() => useInteractiveLegend(['a', 'b'], false));

    expect(result.current.hiddenSeries.size).toBe(0);
    act(() => result.current.toggleSeries('a'));
    expect(result.current.isHidden('a')).toBe(false);
  });
});
