'use client';

import Link from 'next/link';

import clsxm from '@/lib/clsxm';

import { type Locale, locales } from '@/i18n/config';
import { usePathname } from '@/i18n/navigation';
import { buildLocalizedPath } from '@/i18n/paths';

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  de: 'DE',
};

export default function LocaleSwitcher({
  locale,
  availableLocales = locales,
  className,
}: {
  locale: Locale;
  availableLocales?: readonly Locale[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      aria-label='Language'
      className={clsxm(
        'inline-flex h-9 shrink-0 items-center rounded-full border border-white/18 bg-white/7 p-1 text-[12px] font-semibold tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur',
        className,
      )}
    >
      {locales.map((loc) => {
        const isActive = locale === loc;
        const isAvailable = availableLocales.includes(loc);
        const itemClassName = clsxm(
          'flex h-7 min-w-9 items-center justify-center rounded-full px-3 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy',
          isActive
            ? 'bg-brand-green text-brand-navy'
            : 'text-white/70 hover:bg-white/10 hover:text-white',
          !isAvailable && 'pointer-events-none opacity-35',
        );

        if (!isAvailable) {
          return (
            <span
              key={loc}
              aria-disabled='true'
              className={itemClassName}
              title={`${localeLabels[loc]} unavailable`}
            >
              {localeLabels[loc]}
            </span>
          );
        }

        return (
          <Link
            key={loc}
            href={buildLocalizedPath(pathname || '/', loc)}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`Switch language to ${loc === 'en' ? 'English' : 'German'}`}
            className={itemClassName}
          >
            {localeLabels[loc]}
          </Link>
        );
      })}
    </div>
  );
}
