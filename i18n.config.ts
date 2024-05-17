import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const { Link, usePathname, useRouter, redirect, permanentRedirect } =
  createSharedPathnamesNavigation({ locales: locales });
