export const getPixelValue = (v: string | number): string => {
  if (typeof v === 'number') return `${v}px`;
  const numericValue = parseFloat(v);
  if (!isNaN(numericValue) && String(numericValue) === v.trim()) {
    return `${numericValue}px`;
  }
  return v;
};
