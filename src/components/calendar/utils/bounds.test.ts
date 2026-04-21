import { describe, expect, it } from 'vitest';
import { isOutOfBounds, isOutOfBoundsMonth } from './bounds';

describe('isOutOfBounds', () => {
  const d = (y: number, m: number, day: number) => new Date(y, m - 1, day);

  it('returns false when no min/max specified', () => {
    expect(isOutOfBounds(d(2026, 4, 21))).toBe(false);
  });

  it('returns false when value is between min and max', () => {
    expect(isOutOfBounds(d(2026, 4, 21), d(2026, 1, 1), d(2026, 12, 31))).toBe(false);
  });

  it('returns true when value is before min', () => {
    expect(isOutOfBounds(d(2025, 12, 31), d(2026, 1, 1), d(2026, 12, 31))).toBe(true);
  });

  it('returns true when value is after max', () => {
    expect(isOutOfBounds(d(2027, 1, 1), d(2026, 1, 1), d(2026, 12, 31))).toBe(true);
  });

  it('returns false when value exactly equals min (in-bounds)', () => {
    expect(isOutOfBounds(d(2026, 1, 1), d(2026, 1, 1), d(2026, 12, 31))).toBe(false);
  });

  it('returns false when value exactly equals max (in-bounds)', () => {
    expect(isOutOfBounds(d(2026, 12, 31), d(2026, 1, 1), d(2026, 12, 31))).toBe(false);
  });

  it('handles min-only constraint', () => {
    expect(isOutOfBounds(d(2025, 12, 31), d(2026, 1, 1))).toBe(true);
    expect(isOutOfBounds(d(2030, 1, 1), d(2026, 1, 1))).toBe(false);
  });

  it('handles max-only constraint', () => {
    expect(isOutOfBounds(d(2027, 1, 1), undefined, d(2026, 12, 31))).toBe(true);
    expect(isOutOfBounds(d(2020, 1, 1), undefined, d(2026, 12, 31))).toBe(false);
  });

  it('respects time-of-day when comparing same day', () => {
    const min = new Date(2026, 3, 21, 12, 0, 0);
    const earlier = new Date(2026, 3, 21, 10, 0, 0);
    const later = new Date(2026, 3, 21, 14, 0, 0);
    expect(isOutOfBounds(earlier, min)).toBe(true);
    expect(isOutOfBounds(later, min)).toBe(false);
  });
});

describe('isOutOfBoundsMonth', () => {
  const d = (y: number, m: number, day: number) => new Date(y, m - 1, day);

  it('returns false when no min/max specified', () => {
    expect(isOutOfBoundsMonth(d(2026, 4, 21))).toBe(false);
  });

  it('returns false when month is within bounds', () => {
    expect(isOutOfBoundsMonth(d(2026, 4, 1), d(2026, 1, 1), d(2026, 12, 1))).toBe(false);
  });

  it('returns true when month is before min-month', () => {
    expect(isOutOfBoundsMonth(d(2025, 12, 1), d(2026, 1, 1))).toBe(true);
  });

  it('returns true when month is after max-month', () => {
    expect(isOutOfBoundsMonth(d(2027, 1, 1), undefined, d(2026, 12, 1))).toBe(true);
  });

  it('normalizes min to start of month (day ignored)', () => {
    // max = 2026-04-15 → 2026-04-01이 정규화된 max-month → 4월 말일도 in-bounds
    expect(isOutOfBoundsMonth(d(2026, 4, 30), undefined, d(2026, 4, 15))).toBe(false);
    // 2026-05-01은 5월이라 out-of-bounds
    expect(isOutOfBoundsMonth(d(2026, 5, 1), undefined, d(2026, 4, 15))).toBe(true);
  });

  it('normalizes max to start of month for comparison', () => {
    // min = 2026-04-15 → 2026-04-01이 정규화된 min-month → 4월 1일도 in-bounds
    expect(isOutOfBoundsMonth(d(2026, 4, 1), d(2026, 4, 15))).toBe(false);
    // 2026-03 는 이전 월이라 out-of-bounds
    expect(isOutOfBoundsMonth(d(2026, 3, 31), d(2026, 4, 15))).toBe(true);
  });

  it('both same month regardless of day → in-bounds', () => {
    expect(isOutOfBoundsMonth(d(2026, 4, 1), d(2026, 4, 20), d(2026, 4, 20))).toBe(false);
    expect(isOutOfBoundsMonth(d(2026, 4, 30), d(2026, 4, 20), d(2026, 4, 20))).toBe(false);
  });
});
