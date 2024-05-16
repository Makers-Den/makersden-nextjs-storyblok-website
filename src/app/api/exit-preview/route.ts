import { cookies, draftMode } from 'next/dist/client/components/headers';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get('slug') ?? '';

  draftMode().disable();

  const cookieStore = cookies();
  const bypassCookie = cookieStore.get('__prerender_bypass');
  if (bypassCookie) {
    cookieStore.set({
      name: '__prerender_bypass',
      value: bypassCookie?.value,
      // Past date & time to invalidate the cookie
      expires: new Date(0),
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'none',
    });
  }

  return NextResponse.redirect(`${req.nextUrl.origin}/${slug}`);
};
