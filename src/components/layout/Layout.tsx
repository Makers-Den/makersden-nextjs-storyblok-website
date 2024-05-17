import { type Locale } from 'i18n.config';

import { type GlobalSettingsSbContent } from '@/lib/storyblok/blockLibraryTypes';
import { type StoryblokStory } from '@/lib/storyblok/sbInternalTypes';

import { Footer } from '@/block-components/footer/Footer';
import { Header } from '@/block-components/header/Header';

type LayoutProps = {
  children: React.ReactNode;
  locale: Locale;
  globalSettings: StoryblokStory<GlobalSettingsSbContent>;
};

export function Layout({ children, locale, globalSettings }: LayoutProps) {
  const { navItems = [], footerItems = [] } = globalSettings.content;

  return (
    <div className='flex min-h-screen flex-col'>
      <Header navItems={navItems} locale={locale} />
      {children}
      <Footer footerItems={footerItems} />
    </div>
  );
}
