import { cn } from '@/lib/utils';
import { useTableFontSize, getTableFontClasses } from '../components/TableFontSizeContext';

type DateFormat = 'date' | 'datetime' | 'time';
type Locale = 'ko' | 'en' | 'ja' | 'zh';

interface CellDateProps {
  value: Date | string | number | null | undefined;
  format?: DateFormat;
  locale?: Locale;
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

export function CellDate({
  value,
  format = 'date',
  locale = 'ko',
  className,
}: CellDateProps) {
  const fontSize = useTableFontSize();
  const fontClasses = getTableFontClasses(fontSize);

  if (value == null) {
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

  const date = parseDate(value);

  if (!date) {
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

  const displayValue = formatDate(date, format, locale);

  return (
    <span className={cn(
      'font-body letter-spacing-tracking-tight text-default tabular-nums',
      fontClasses,
      className
    )}>
      {displayValue}
    </span>
  );
}
