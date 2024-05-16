import { draftMode } from 'next/headers';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { PREVIEW_SECRET } from '@/lib/constants';

export const GET = async (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get('slug') ?? '';
  const secret = req.nextUrl.searchParams.get('secret');
  const url = req.url || '';
  // get the storyblok params for the bridge to work
  // TODO: check the validity of this
  const params = url.split('?');

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  draftMode().enable();
  const cookieStore = cookies();
  const bypassCookie = cookieStore.get('__prerender_bypass');
  if (bypassCookie) {
    cookieStore.set('__prerender_bypass', bypassCookie.value, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'none',
    });
  }

  const urlBase = req.nextUrl.origin;

  // Hack to force it to use the local ssl proxy on localhost
  const computedOrigin = urlBase.startsWith('https')
    ? // Not sure why, but seems next14 gets the protocol wrong
      urlBase.replace('https://localhost:3000', 'https://localhost:3010')
    : urlBase.replace('http://localhost:3000', 'https://localhost:3010');

  console.log('SLUG', slug);

  return NextResponse.redirect(`${computedOrigin}/${slug}?${params[1]}`);
};
