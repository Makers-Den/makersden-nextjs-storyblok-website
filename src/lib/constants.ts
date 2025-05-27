import { env } from '@/env';

/** Base url of the production/canonical deployment without trailing slash */
export const CANONICAL_BASE_URL_NO_SLASH = env.NEXT_PUBLIC_SITE_URL;

/** Base url of the production/canonical deployment (with trailing slash) */
export const CANONICAL_BASE_URL = `${CANONICAL_BASE_URL_NO_SLASH}/`;

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isPreviewEnv = process.env.VERCEL_ENV === 'preview';

/** Configured in CMS preview url as a query param */
export const PREVIEW_SECRET = '1337_m4k3r5_c0d1nG';

/**
 * Google Tag Manager id. https://tagmanager.google.com
 * IMPORTANT: this should always be the CLIENT container (NOT server)
 */
export const GTM_ID = '';

export const ENABLE_GTM = process.env.NEXT_PUBLIC_ENABLE_GTM === 'true';
