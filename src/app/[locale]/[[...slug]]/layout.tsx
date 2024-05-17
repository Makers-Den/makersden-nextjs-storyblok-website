import { type ReactNode } from 'react';

import { BasicLayout } from '@/app/BasicLayout';

export function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
  return <BasicLayout locale={locale}>{children}</BasicLayout>;
}

export default LocaleLayout;
