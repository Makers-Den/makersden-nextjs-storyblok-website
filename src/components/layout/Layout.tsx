import { type GlobalSettingsSbContent } from '@/lib/storyblok/blockLibraryTypes';
import { type StoryblokStory } from '@/lib/storyblok/sbInternalTypes';

import { Footer } from '@/block-components/footer/Footer';
import { Header } from '@/block-components/header/Header';
import { type Locale } from '@/i18n/config';

type LayoutProps = {
  children: React.ReactNode;
  locale: Locale;
  globalSettings: StoryblokStory<GlobalSettingsSbContent>;
  availableLocales: readonly Locale[];
  layoutType: 'default' | 'leadPage';
  navType: 'white' | 'black' | 'transparent';
};

export function Layout({
  children,
  locale,
  globalSettings,
  availableLocales,
  layoutType,
  navType,
}: LayoutProps) {
  const {
    navItems = [],
    footerSections = [],
    footerBottomLinks = [],
    footerSocialLinks = [],
    footerCopyrightNotice = '',
    logo,
  } = globalSettings.content;

  return (
    <div className='makers-den-canvas flex min-h-screen flex-col'>
      <Header
        navItems={navItems}
        locale={locale}
        availableLocales={availableLocales}
        layoutType={layoutType}
        navType={navType}
      />
      {children}
      <Footer
        footerSections={footerSections}
        footerBottomLinks={footerBottomLinks}
        footerSocialLinks={footerSocialLinks}
        copyrightNotice={footerCopyrightNotice}
        logo={logo}
        locale={locale}
      />
    </div>
  );
}
