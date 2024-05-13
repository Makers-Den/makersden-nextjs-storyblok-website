/**
 * @param path Without leading slash
 * @returns Dev url
 */
export const getDevUrl = (path: string) => `localhost:3000/${path}`;
