import { FaBeer } from '@react-icons/all-files/fa/FaBeer';

import clsxm from '@/lib/clsxm';
import { type LinkSbContent, type NavSectionSbContent } from '@/lib/storyblok';

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
    <div className='flex h-full flex-col bg-white'>
      {/* Header with Logo and Close Button */}
      <div className='flex items-center justify-between border-b border-gray-200 px-5 py-2'>
        <Link
          className='flex shrink-0 items-center gap-3'
          href='/'
          onClick={onLinkClick}
        >
          <FaBeer className='h-[60px] w-[60px] md:h-[80px] md:w-[80px]' />
          <span className='text-[32px] leading-normal font-semibold whitespace-nowrap text-black'>
            ACME
          </span>
        </Link>
        <button
          onClick={onClose}
          className='rounded-lg p-2 transition-colors hover:bg-gray-100'
          aria-label='Close menu'
        >
          <SvgIcon name='Close' className='h-5 w-5 text-black' />
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
                    'rounded-lg text-[20px] leading-[24px] font-medium text-black',
                    'hover:text-blue transition-colors',
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
