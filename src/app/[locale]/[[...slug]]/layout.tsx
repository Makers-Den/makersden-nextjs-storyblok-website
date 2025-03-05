import { type ReactNode } from 'react';

import { BasicLayout } from '@/app/BasicLayout';

async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return <BasicLayout locale={locale}>{children}</BasicLayout>;
}

export default LocaleLayout;
