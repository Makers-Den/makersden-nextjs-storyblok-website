import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { BasicLayout } from '@/app/BasicLayout';
import { routing } from '@/i18n/routing';

async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <BasicLayout locale={locale}>{children}</BasicLayout>;
}

export default LocaleLayout;
