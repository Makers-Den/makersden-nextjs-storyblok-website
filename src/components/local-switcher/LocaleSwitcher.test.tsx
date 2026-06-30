import { render, screen } from '@testing-library/react';
import {
  type AnchorHTMLAttributes,
  createElement,
  type ReactNode,
} from 'react';

import { type Locale } from '@/i18n/config';

import LocaleSwitcher from './LocaleSwitcher';

let mockPathname = '/about';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    return (key: string, values?: Record<string, string>) => {
      const translations: Record<string, string> = {
        label: 'Language',
        'names.de': 'German',
        'names.en': 'English',
        switchTo: `Switch language to ${values?.language}`,
        unavailable: `${values?.language} unavailable`,
      };

      return translations[key] ?? key;
    };
  },
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    locale,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    href: string;
    locale?: Locale;
  }) => (
    <a data-href={href} data-locale={locale} href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => mockPathname,
}));

describe('LocaleSwitcher', () => {
  beforeEach(() => {
    mockPathname = '/about';
  });

  it('uses next-intl locale navigation only for inactive locale links', () => {
    render(
      createElement(LocaleSwitcher, {
        locale: 'en',
        availableLocales: ['en', 'de'],
      }),
    );

    const englishLink = screen.getByRole('link', {
      name: 'Switch language to English',
    });
    const germanLink = screen.getByRole('link', {
      name: 'Switch language to German',
    });

    expect(englishLink).toHaveAttribute('data-href', '/about');
    expect(englishLink).not.toHaveAttribute('data-locale');
    expect(germanLink).toHaveAttribute('data-href', '/about');
    expect(germanLink).toHaveAttribute('data-locale', 'de');
  });

  it('does not force a locale prefix for the active German link', () => {
    render(
      createElement(LocaleSwitcher, {
        locale: 'de',
        availableLocales: ['en', 'de'],
      }),
    );

    const englishLink = screen.getByRole('link', {
      name: 'Switch language to English',
    });
    const germanLink = screen.getByRole('link', {
      name: 'Switch language to German',
    });

    expect(englishLink).toHaveAttribute('data-locale', 'en');
    expect(germanLink).not.toHaveAttribute('data-locale');
  });

  it('falls back to the homepage when no pathname is available', () => {
    mockPathname = '';

    render(createElement(LocaleSwitcher, { locale: 'de' }));

    expect(
      screen.getByRole('link', { name: 'Switch language to English' }),
    ).toHaveAttribute('data-href', '/');
  });
});
