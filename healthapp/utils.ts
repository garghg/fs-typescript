export const parseIntArgs = (value: unknown): number | null => {
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  if (typeof value === 'string' && !isNaN(Number(value))) {
    return Number(value);
  }
  return null;
};