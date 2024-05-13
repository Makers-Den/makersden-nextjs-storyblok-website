import { CANONICAL_BASE_URL } from './constants';

/**
 * @param path Without leading slash
 * @returns Cananocical url
 */
export const getCanonicalUrl = (path: string) => `${CANONICAL_BASE_URL}${path}`;
