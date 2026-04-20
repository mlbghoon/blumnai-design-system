import { cn } from '@/lib/utils';
import { useTableFontSize, getTableFontClasses } from '../components/TableFontSizeContext';

type DateFormat = 'date' | 'datetime' | 'time';
type Locale = 'ko' | 'en' | 'ja' | 'zh';

interface CellDateRangeProps {
  startDate: Date | string | number | null | undefined;
  endDate: Date | string | number | null | undefined;
  format?: DateFormat;
  locale?: Locale;
  separator?: string;
  className?: string;
}

const formatDate = (
  date: Date,
  format: DateFormat,
  _locale: Locale
): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const dateStr = `${year}.${month}.${day}`;
  const timeStr = `${hours}:${minutes}`;

  switch (format) {
    case 'date':
      return dateStr;
    case 'time':
      return timeStr;
    case 'datetime':
      return `${dateStr} ${timeStr}`;
    default:
      return dateStr;
  }
};

const parseDate = (value: Date | string | number): Date | null => {
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export function CellDateRange({
  startDate,
  endDate,
  format = 'date',
  locale = 'ko',
  separator = '~',
  className,
}: CellDateRangeProps) {
  const start = startDate != null ? parseDate(startDate) : null;
  const end = endDate != null ? parseDate(endDate) : null;
  const fontSize = useTableFontSize();
  const fontClasses = getTableFontClasses(fontSize);

  if (!start && !end) {
    return (
      <span className={cn(
        'font-body letter-spacing-tracking-tight text-hint',
        fontClasses,
        className
      )}>
        -
      </span>
    );
  }

  const startStr = start ? formatDate(start, format, locale) : '-';
  const endStr = end ? formatDate(end, format, locale) : '-';

  return (
    <span className={cn(
      'font-body letter-spacing-tracking-tight text-default tabular-nums',
      fontClasses,
      className
    )}>
      {startStr}
      <span className="text-muted padding-x-4">{separator}</span>
      {endStr}
    </span>
  );
}
