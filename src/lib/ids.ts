export const generateId = (prefix: string): string =>
  `${prefix}_${crypto.getRandomValues(new Uint8Array(6))}`;
