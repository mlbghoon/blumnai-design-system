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

  it('cleans orphaned keys when allKeys changes', () => {
    const { result, rerender } = renderHook(
      ({ keys }) => useInteractiveLegend(keys, true),
      { initialProps: { keys: ['a', 'b', 'c'] } }
    );

    act(() => result.current.toggleSeries('a'));
    act(() => result.current.toggleSeries('c'));
    expect(result.current.hiddenSeries.size).toBe(2);

    rerender({ keys: ['b', 'd'] });
    expect(result.current.isHidden('a')).toBe(false);
    expect(result.current.isHidden('c')).toBe(false);
    expect(result.current.hiddenSeries.size).toBe(0);
  });

  it('toggle works correctly after allKeys changes', () => {
    const { result, rerender } = renderHook(
      ({ keys }) => useInteractiveLegend(keys, true),
      { initialProps: { keys: ['x', 'y'] } }
    );

    rerender({ keys: ['p', 'q', 'r'] });

    act(() => result.current.toggleSeries('p'));
    expect(result.current.isHidden('p')).toBe(true);

    act(() => result.current.toggleSeries('q'));
    expect(result.current.isHidden('q')).toBe(true);

    act(() => result.current.toggleSeries('r'));
    expect(result.current.isHidden('r')).toBe(false);
  });
});
