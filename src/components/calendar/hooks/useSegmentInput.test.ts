import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useSegmentInput } from './useSegmentInput';
import type { SegmentConfig } from './useSegmentInput';

const YEAR: SegmentConfig = {
  name: 'year',
  maxLength: 4,
  placeholder: 'yyyy',
  validate: (v) => {
    const n = parseInt(v, 10);
    return n >= 1 && n <= 9999;
  },
};
const MONTH: SegmentConfig = {
  name: 'month',
  maxLength: 2,
  placeholder: 'mm',
  validate: (v) => {
    const n = parseInt(v, 10);
    return n >= 1 && n <= 12;
  },
};

const renderWith = (opts: {
  onComplete?: (values: Record<string, string>) => void;
  onClear?: () => void;
  externalInvalid?: boolean;
}) =>
  renderHook(
    ({ externalInvalid }: { externalInvalid?: boolean }) =>
      useSegmentInput({
        segments: [YEAR, MONTH],
        onComplete: opts.onComplete ?? (() => {}),
        onClear: opts.onClear ?? (() => {}),
        externalInvalid,
      }),
    { initialProps: { externalInvalid: opts.externalInvalid } }
  );

describe('useSegmentInput', () => {
  describe('handleChange', () => {
    it('updates segment value on typing', () => {
      const { result } = renderWith({});
      act(() => result.current.handleChange('year', '2026'));
      expect(result.current.values.year).toBe('2026');
    });

    it('truncates input to maxLength', () => {
      const { result } = renderWith({});
      act(() => result.current.handleChange('year', '20265'));
      expect(result.current.values.year).toBe('2026');
    });

    it('strips non-digit characters', () => {
      const { result } = renderWith({});
      act(() => result.current.handleChange('year', '20a26'));
      expect(result.current.values.year).toBe('2026');
    });

    it('triggers onComplete when all segments are filled and valid', () => {
      const onComplete = vi.fn();
      const { result } = renderWith({ onComplete });
      act(() => result.current.handleChange('year', '2026'));
      act(() => result.current.handleChange('month', '04'));
      expect(onComplete).toHaveBeenCalledWith({ year: '2026', month: '04' });
    });

    it('does not call onComplete when segments are not all filled', () => {
      const onComplete = vi.fn();
      const { result } = renderWith({ onComplete });
      act(() => result.current.handleChange('year', '2026'));
      // month 미입력
      expect(onComplete).not.toHaveBeenCalled();
    });

    it('sets hasInvalidDate=true when all filled but one fails validate', () => {
      const onComplete = vi.fn();
      const { result } = renderWith({ onComplete });
      act(() => result.current.handleChange('year', '2026'));
      act(() => result.current.handleChange('month', '13')); // 유효 범위 벗어남
      expect(onComplete).not.toHaveBeenCalled();
      expect(result.current.hasInvalidDate).toBe(true);
    });
  });

  describe('onClear', () => {
    it('fires when all segments become empty', () => {
      const onClear = vi.fn();
      const { result } = renderWith({ onClear });
      act(() => result.current.handleChange('year', '2026'));
      act(() => result.current.handleChange('year', ''));
      expect(onClear).toHaveBeenCalled();
    });
  });

  describe('setValues', () => {
    it('replaces current values and resets hasInvalidDate', () => {
      const { result } = renderWith({});
      act(() => result.current.handleChange('year', '2026'));
      act(() => result.current.handleChange('month', '13'));
      expect(result.current.hasInvalidDate).toBe(true);
      act(() => result.current.setValues({ year: '2025', month: '01' }));
      expect(result.current.values).toEqual({ year: '2025', month: '01' });
      expect(result.current.hasInvalidDate).toBe(false);
    });
  });

  describe('handleKeyDown', () => {
    it('Backspace on empty segment moves focus to previous', () => {
      const { result } = renderWith({});
      const yearRef = document.createElement('input');
      const monthRef = document.createElement('input');
      result.current.refs.year.current = yearRef;
      result.current.refs.month.current = monthRef;
      const focusSpy = vi.spyOn(yearRef, 'focus');
      const selectSpy = vi.spyOn(yearRef, 'select');

      const preventDefault = vi.fn();
      const event = {
        key: 'Backspace',
        preventDefault,
        currentTarget: monthRef,
      } as unknown as React.KeyboardEvent;

      act(() => result.current.handleKeyDown('month', event));
      expect(preventDefault).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
      expect(selectSpy).toHaveBeenCalled();
    });

    it('Tab (forward) moves to next segment', () => {
      const { result } = renderWith({});
      const yearRef = document.createElement('input');
      const monthRef = document.createElement('input');
      result.current.refs.year.current = yearRef;
      result.current.refs.month.current = monthRef;
      const focusSpy = vi.spyOn(monthRef, 'focus');

      const preventDefault = vi.fn();
      const event = {
        key: 'Tab',
        shiftKey: false,
        preventDefault,
        currentTarget: yearRef,
      } as unknown as React.KeyboardEvent;

      act(() => result.current.handleKeyDown('year', event));
      expect(preventDefault).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
    });

    it('Shift+Tab (backward) moves to previous segment', () => {
      const { result } = renderWith({});
      const yearRef = document.createElement('input');
      const monthRef = document.createElement('input');
      result.current.refs.year.current = yearRef;
      result.current.refs.month.current = monthRef;
      const focusSpy = vi.spyOn(yearRef, 'focus');

      const preventDefault = vi.fn();
      const event = {
        key: 'Tab',
        shiftKey: true,
        preventDefault,
        currentTarget: monthRef,
      } as unknown as React.KeyboardEvent;

      act(() => result.current.handleKeyDown('month', event));
      expect(preventDefault).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('focus/blur', () => {
    it('handleFocus sets activeSegment and fires onFocus prop', () => {
      const onFocus = vi.fn();
      const { result } = renderHook(() =>
        useSegmentInput({
          segments: [YEAR, MONTH],
          onComplete: vi.fn(),
          onClear: vi.fn(),
          onFocus,
        })
      );
      act(() => result.current.handleFocus('year'));
      expect(result.current.activeSegment).toBe('year');
      expect(onFocus).toHaveBeenCalled();
    });

    it('handleBlur pads short value then clears active when none focused', async () => {
      vi.useFakeTimers();
      const onBlur = vi.fn();
      const { result } = renderHook(() =>
        useSegmentInput({
          segments: [YEAR, MONTH],
          onComplete: vi.fn(),
          onClear: vi.fn(),
          onBlur,
        })
      );
      act(() => result.current.handleFocus('month'));
      act(() => result.current.handleChange('month', '4')); // padding 대상

      act(() => {
        result.current.handleBlur('month');
        vi.runAllTimers();
      });

      expect(result.current.values.month).toBe('04');
      expect(result.current.activeSegment).toBeNull();
      expect(onBlur).toHaveBeenCalled();
      vi.useRealTimers();
    });
  });

  describe('externalInvalid', () => {
    it('false by default → hasInvalidDate reflects internal only', () => {
      const { result } = renderWith({});
      expect(result.current.hasInvalidDate).toBe(false);
    });

    it('true → hasInvalidDate true even when internal is valid', () => {
      const { result } = renderWith({ externalInvalid: true });
      expect(result.current.hasInvalidDate).toBe(true);
    });

    it('OR with internal invalid', () => {
      const { result, rerender } = renderWith({ externalInvalid: false });
      // 내부 invalid 만들기
      act(() => result.current.handleChange('year', '2026'));
      act(() => result.current.handleChange('month', '13'));
      expect(result.current.hasInvalidDate).toBe(true);

      // externalInvalid true + 내부 invalid 제거 → 여전히 true
      act(() => result.current.setValues({ year: '2026', month: '01' }));
      rerender({ externalInvalid: true });
      expect(result.current.hasInvalidDate).toBe(true);

      // 모두 false
      rerender({ externalInvalid: false });
      expect(result.current.hasInvalidDate).toBe(false);
    });
  });
});
