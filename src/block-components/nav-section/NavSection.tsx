import clsxm from '@/lib/clsxm';
import { type NavSectionSbContent } from '@/lib/storyblok';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { NavSectionLinkItem } from './NavSectionLinkItem';

interface NavSectionProps {
  blok: NavSectionSbContent;
  textColor: 'white' | 'black';
}

export function NavSection({ blok, textColor }: NavSectionProps) {
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
                <NavSectionLinkItem blok={item} />
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
