export const truncate = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.substring(0, maxLength - 1) + '...' : str;
};
