export const parseIntArgs = (value: unknown): number | null => {
  if (typeof value !== 'string' || isNaN(Number(value))) {
    return null;
  }
  return Number(value);
};