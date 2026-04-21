import { startOfMonth } from 'date-fns';

/**
 * 날짜가 min/max 경계 밖인지 판정 (day 단위).
 *
 * `DatePicker`/`DateRangePicker`의 typed input 경계 검증에 사용됩니다.
 * `min`/`max`가 지정되지 않으면 해당 방향은 무제한으로 간주.
 */
export const isOutOfBounds = (d: Date, min?: Date, max?: Date): boolean => {
  if (min && d < min) return true;
  if (max && d > max) return true;
  return false;
};

/**
 * 월 단위 경계 판정. `min`/`max`에 day가 포함되어 있어도 month start로 정규화해 비교합니다.
 *
 * `MonthPicker`/`MonthRangePicker`의 typed input 경계 검증에 사용됩니다.
 * 예: `max = 2026-04-15`이면 2026년 4월은 in-bounds(같은 월의 어느 일이든),
 *      2026년 5월부터 out-of-bounds로 판정.
 */
export const isOutOfBoundsMonth = (d: Date, min?: Date, max?: Date): boolean => {
  const monthStart = startOfMonth(d);
  if (min && monthStart < startOfMonth(min)) return true;
  if (max && monthStart > startOfMonth(max)) return true;
  return false;
};
