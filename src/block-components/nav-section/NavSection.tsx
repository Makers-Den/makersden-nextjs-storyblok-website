import clsxm from '@/lib/clsxm';
import { type NavSectionSbContent } from '@/lib/storyblok';

import { NavSectionLinkItem } from './NavSectionLinkItem';

interface NavSectionProps {
  blok: NavSectionSbContent;
  textColor: 'white' | 'black';
}

export function NavSection({ blok, textColor }: NavSectionProps) {
  return (
    <div className='group relative'>
      {/* Trigger Button */}
      <button
        className={clsxm(
          'cursor-pointer px-2 py-1 text-base font-normal transition-colors hover:opacity-70',
          textColor === 'white' ? 'text-white' : 'text-black',
        )}
        aria-haspopup='true'
      >
        {blok.title}
      </button>

      {/* Dropdown Panel */}
      <div
        className={clsxm(
          // Positioning
          'absolute top-full right-0 mt-2',

          // Invisible bridge using pseudo-element to prevent hover break
          'before:absolute before:right-0 before:left-0',
          'before:top-[-30px] before:h-8 before:content-[""]',

          // Visibility
          'hidden group-hover:block',

          // Appearance
          'z-50 min-w-[280px] rounded-lg bg-white p-6 shadow-lg',
        )}
      >
        {/* Menu Items */}
        {blok.items && blok.items.length > 0 && (
          <div className='space-y-2'>
            {blok.items.map((item) => (
              <NavSectionLinkItem key={item._uid} blok={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
