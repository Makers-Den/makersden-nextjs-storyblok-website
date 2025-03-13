'use client';

import { type Locale, locales } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  // `pathname` will contain the current route without the locale e.g. `/about`
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className='text-black'>
      <select value={locale} onChange={changeLocale} className='...'>
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
}
