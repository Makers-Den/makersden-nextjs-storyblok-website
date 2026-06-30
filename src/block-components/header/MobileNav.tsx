import { useTranslations } from 'next-intl';

import clsxm from '@/lib/clsxm';
import { type LinkSbContent, type NavSectionSbContent } from '@/lib/storyblok';

import { MakersDenFullLogo } from '@/components/icons/MakersDenFullLogo';
import { SvgIcon } from '@/components/icons/SvgIcon';
import LocaleSwitcher from '@/components/local-switcher/LocaleSwitcher';
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';
import { Button } from '@/components/ui/button';

import { type Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';

import { MobileNavSection } from './MobileNavSection';

// Type guards
function isLink(
  item: LinkSbContent | NavSectionSbContent,
): item is LinkSbContent {
  return item.component === 'Link';
}

function isNavSection(
  item: LinkSbContent | NavSectionSbContent,
): item is NavSectionSbContent {
  return item.component === 'NavSection';
}

interface MobileNavProps {
  navItems: (LinkSbContent | NavSectionSbContent)[];
  locale: Locale;
  onClose: () => void;
  onLinkClick: () => void;
}

export function MobileNav({
  navItems,
  locale,
  onClose,
  onLinkClick,
}: MobileNavProps) {
  const t = useTranslations('navigation');

  return (
    <div className='bg-brand-navy flex h-full flex-col text-white'>
      {/* Header with Logo and Close Button */}
      <div className='flex items-center justify-between px-5 py-2'>
        <Link
          className='flex shrink-0 items-center text-white'
          href='/'
          onClick={onLinkClick}
          aria-label={t('homeLabel')}
        >
          <MakersDenFullLogo className='h-6 w-[164px]' />
        </Link>
        <Button
          variant='ghost'
          size='icon'
          onClick={onClose}
          className='text-white'
          aria-label={t('closeMenu')}
        >
          <SvgIcon name='Close' className='h-5 w-5 text-white' />
        </Button>
      </div>

      <div className='px-6 pt-4'>
        <LocaleSwitcher locale={locale} />
      </div>

      {/* Navigation Items */}
      <nav className='flex-1 overflow-y-auto px-6 py-5'>
        <div className='flex flex-col gap-[18px]'>
          {navItems.map((item) => {
            if (isLink(item)) {
              return (
                <StoryblokLink
                  className={clsxm(
                    'rounded-md text-[20px] leading-[24px] font-medium text-white',
                    'hover:text-brand-green transition-colors',
                  )}
                  link={item.link}
                  locale={locale}
                  key={item._uid}
                  onClick={onLinkClick}
                >
                  {item.name}
                </StoryblokLink>
              );
            }

            if (isNavSection(item)) {
              return (
                <MobileNavSection
                  key={item._uid}
                  blok={item}
                  locale={locale}
                  onLinkClick={onLinkClick}
                />
              );
            }

            return null;
          })}
        </div>
      </nav>
    </div>
  );
}
