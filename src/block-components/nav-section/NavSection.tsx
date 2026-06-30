import clsxm from '@/lib/clsxm';
import { type NavSectionSbContent } from '@/lib/storyblok';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { type Locale } from '@/i18n/config';

import { NavSectionLinkItem } from './NavSectionLinkItem';

interface NavSectionProps {
  blok: NavSectionSbContent;
  locale: Locale;
  textColor: 'white' | 'black';
}

export function NavSection({ blok, locale, textColor }: NavSectionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={clsxm(
          'hover:text-brand-green cursor-pointer px-2 py-1 text-base font-normal transition-colors',
          textColor === 'white' ? 'text-white' : 'text-brand-navy',
        )}
      >
        {blok.title}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {blok.items && blok.items.length > 0 && (
          <div className='space-y-2'>
            {blok.items.map((item) => (
              <DropdownMenuItem key={item._uid} asChild>
                <NavSectionLinkItem blok={item} locale={locale} />
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
