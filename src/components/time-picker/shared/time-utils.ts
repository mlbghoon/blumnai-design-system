import type { TimeSegment, TimeFormat, TimeValue } from '../time-picker.types';

export const SEGMENT_PLACEHOLDERS: Record<TimeSegment, string> = {
  hour: 'hh',
  minute: 'mm',
  second: 'ss',
};

export const SEGMENT_MAX_LENGTH: Record<TimeSegment, number> = {
  hour: 2,
  minute: 2,
  second: 2,
};

export const getSegmentMax = (segment: TimeSegment, format: TimeFormat): number => {
  switch (segment) {
    case 'hour':
      return format === '24h' ? 23 : 12;
    case 'minute':
    case 'second':
      return 59;
  }
};

export const getSegmentMin = (segment: TimeSegment, format: TimeFormat): number => {
  if (segment === 'hour' && format === '12h') return 1;
  return 0;
};

export const validateSegment = (segment: TimeSegment, value: string, format: TimeFormat): boolean => {
  const num = parseInt(value, 10);
  if (isNaN(num)) return false;

  const min = getSegmentMin(segment, format);
  const max = getSegmentMax(segment, format);
  return num >= min && num <= max;
};

export const padSegment = (value: string): string => {
  if (!value) return '';
  return value.padStart(2, '0');
};

export const convert24To12Hour = (hour24: number): { hour12: number; period: 'AM' | 'PM' } => {
  if (hour24 === 0) return { hour12: 12, period: 'AM' };
  if (hour24 === 12) return { hour12: 12, period: 'PM' };
  if (hour24 > 12) return { hour12: hour24 - 12, period: 'PM' };
  return { hour12: hour24, period: 'AM' };
};

export const convert12To24Hour = (hour12: number, period: 'AM' | 'PM'): number => {
  if (period === 'AM') {
    return hour12 === 12 ? 0 : hour12;
  }
  return hour12 === 12 ? 12 : hour12 + 12;
};

export const formatTimeValue = (v: TimeValue | undefined, showSeconds: boolean): string => {
  if (!v) return '';
  const h = String(v.hour).padStart(2, '0');
  const m = String(v.minute).padStart(2, '0');
  if (showSeconds && v.second !== undefined) {
    const s = String(v.second).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
  return `${h}:${m}`;
};

export const isTimeEqual = (a: TimeValue | undefined, b: TimeValue): boolean => {
  if (!a) return false;
  return a.hour === b.hour && a.minute === b.minute && (a.second ?? 0) === (b.second ?? 0);
};

export const timeToSegments = (
  time: TimeValue | undefined,
  format: TimeFormat
): { segments: Record<TimeSegment, string>; period: 'AM' | 'PM' } => {
  if (!time) return { segments: { hour: '', minute: '', second: '' }, period: 'AM' };

  let displayHour = time.hour;
  let period: 'AM' | 'PM' = 'AM';

  if (format === '12h') {
    const converted = convert24To12Hour(time.hour);
    displayHour = converted.hour12;
    period = converted.period;
  }

  return {
    segments: {
      hour: padSegment(String(displayHour)),
      minute: padSegment(String(time.minute)),
      second: time.second !== undefined ? padSegment(String(time.second)) : '',
    },
    period,
  };
};

export const segmentsToTime = (
  segments: Record<TimeSegment, string>,
  period: 'AM' | 'PM',
  format: TimeFormat,
  showSeconds: boolean
): TimeValue | undefined => {
  const { hour, minute, second } = segments;
  if (!hour || !minute || hour.length < 2 || minute.length < 2) return undefined;
  if (showSeconds && (!second || second.length < 2)) return undefined;

  const hourNum = parseInt(hour, 10);
  const minuteNum = parseInt(minute, 10);
  const secondNum = showSeconds ? parseInt(second, 10) : undefined;

  if (!validateSegment('hour', hour, format)) return undefined;
  if (!validateSegment('minute', minute, format)) return undefined;
  if (showSeconds && !validateSegment('second', second, format)) return undefined;

  let hour24 = hourNum;
  if (format === '12h') {
    hour24 = convert12To24Hour(hourNum, period);
  }

  const result: TimeValue = { hour: hour24, minute: minuteNum };
  if (showSeconds && secondNum !== undefined) {
    result.second = secondNum;
  }
  return result;
};
