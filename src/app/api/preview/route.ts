import { draftMode } from 'next/headers';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';
import { defaultLocale } from '@/i18n/config';
import { buildLocalizedPath, isLocale } from '@/i18n/paths';

export const GET = async (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get('slug') ?? '';
  const secret = req.nextUrl.searchParams.get('secret');
  const storyblokLang = req.nextUrl.searchParams.get('_storyblok_lang');

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== env.PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  (await draftMode()).enable();
  const cookieStore = cookies();
  const bypassCookie = (await cookieStore).get('__prerender_bypass');
  if (bypassCookie) {
    (await cookieStore).set('__prerender_bypass', bypassCookie.value, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'none',
    });
  }

  const urlBase = req.nextUrl.origin;
  const requestedLocale = storyblokLang ?? undefined;
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  // Hack to force it to use the local ssl proxy on localhost
  const computedOrigin = urlBase.startsWith('https')
    ? // Not sure why, but seems next14 gets the protocol wrong
      urlBase.replace('https://localhost:3000', 'https://localhost:3010')
    : urlBase.replace('http://localhost:3000', 'https://localhost:3010');

  const redirectUrl = new URL(computedOrigin);
  redirectUrl.pathname = buildLocalizedPath(slug, locale);

  const redirectSearchParams = new URLSearchParams();
  redirectSearchParams.set('slug', slug);

  if (storyblokLang) {
    redirectSearchParams.set('_storyblok_lang', storyblokLang);
  }

  redirectUrl.search = redirectSearchParams.toString();

  return NextResponse.redirect(redirectUrl);
};
