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
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const previewSlug = slug?.length ? slug.join('/') : 'home';

  return (
    <BasicLayout locale={locale} previewSlug={previewSlug}>
      {children}
    </BasicLayout>
  );
}

export default LocaleLayout;
