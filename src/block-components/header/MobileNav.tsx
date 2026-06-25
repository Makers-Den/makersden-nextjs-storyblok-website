import clsxm from '@/lib/clsxm';
import { type LinkSbContent, type NavSectionSbContent } from '@/lib/storyblok';

import { MakersDenFullLogo } from '@/components/icons/MakersDenFullLogo';
import { SvgIcon } from '@/components/icons/SvgIcon';
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';

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
  onClose: () => void;
  onLinkClick: () => void;
}

export function MobileNav({ navItems, onClose, onLinkClick }: MobileNavProps) {
  return (
    <div className='bg-brand-navy flex h-full flex-col text-white'>
      {/* Header with Logo and Close Button */}
      <div className='flex items-center justify-between px-5 py-2'>
        <Link
          className='flex shrink-0 items-center text-white'
          href='/'
          onClick={onLinkClick}
          aria-label='Makers Den home'
        >
          <MakersDenFullLogo className='h-6 w-[164px]' />
        </Link>
        <button
          onClick={onClose}
          className='hover:bg-brand-green/10 rounded-md p-2 transition-colors'
          aria-label='Close menu'
        >
          <SvgIcon name='Close' className='h-5 w-5 text-white' />
        </button>
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
