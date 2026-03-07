export const MONTHS_KO = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
export const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatYearMonth = (date: Date): string =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;

export const isMonthDisabled = (
  year: number,
  month: number,
  opts: { disabledFuture?: boolean; minDate?: Date; maxDate?: Date },
): boolean => {
  if (opts.disabledFuture) {
    const now = new Date();
    if (year > now.getFullYear() || (year === now.getFullYear() && month > now.getMonth())) {
      return true;
    }
  }

  if (opts.minDate) {
    if (year < opts.minDate.getFullYear() || (year === opts.minDate.getFullYear() && month < opts.minDate.getMonth())) {
      return true;
    }
  }

  if (opts.maxDate) {
    if (year > opts.maxDate.getFullYear() || (year === opts.maxDate.getFullYear() && month > opts.maxDate.getMonth())) {
      return true;
    }
  }

  return false;
};
