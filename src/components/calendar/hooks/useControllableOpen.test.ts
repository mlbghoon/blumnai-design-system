import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useControllableOpen } from './useControllableOpen';

describe('useControllableOpen', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uncontrolled: setter updates internal state', () => {
    const { result } = renderHook(() => useControllableOpen({}));
    expect(result.current[0]).toBe(false);
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
  });

  it('uncontrolled: onOpenChange still fires if provided', () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useControllableOpen({ onOpenChange }));
    act(() => result.current[1](true));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(result.current[0]).toBe(true);
  });

  it('uncontrolled: respects defaultOpen', () => {
    const { result } = renderHook(() => useControllableOpen({ defaultOpen: true }));
    expect(result.current[0]).toBe(true);
  });

  it('controlled: setter fires onOpenChange without changing internal state', () => {
    const onOpenChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ open }) => useControllableOpen({ open, onOpenChange }),
      { initialProps: { open: false } },
    );
    act(() => result.current[1](true));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(result.current[0]).toBe(false);
    rerender({ open: true });
    expect(result.current[0]).toBe(true);
  });

  it('setOpen identity is stable across renders even when onOpenChange changes', () => {
    const { result, rerender } = renderHook(
      ({ onOpenChange }) => useControllableOpen({ onOpenChange }),
      { initialProps: { onOpenChange: vi.fn() } },
    );
    const firstSetter = result.current[1];
    rerender({ onOpenChange: vi.fn() });
    expect(result.current[1]).toBe(firstSetter);
  });

  it('setOpen calls latest onOpenChange after prop change (ref-latest pattern)', () => {
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();
    const { result, rerender } = renderHook(
      ({ onOpenChange }) => useControllableOpen({ onOpenChange }),
      { initialProps: { onOpenChange: firstCallback } },
    );
    rerender({ onOpenChange: secondCallback });
    act(() => result.current[1](true));
    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledWith(true);
  });

  it('dev warning fires when controlled without onOpenChange', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderHook(() => useControllableOpen({ open: true }));
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toMatch(/`open` prop provided without `onOpenChange`/);
  });

  it('dev warning does not fire for uncontrolled', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderHook(() => useControllableOpen({}));
    expect(warn).not.toHaveBeenCalled();
  });

  it('dev warning does not fire when onOpenChange is provided', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderHook(() => useControllableOpen({ open: true, onOpenChange: vi.fn() }));
    expect(warn).not.toHaveBeenCalled();
  });

  it('dev warning fires only once per hook instance', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { rerender } = renderHook(
      ({ open }) => useControllableOpen({ open }),
      { initialProps: { open: true } },
    );
    rerender({ open: false });
    rerender({ open: true });
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
