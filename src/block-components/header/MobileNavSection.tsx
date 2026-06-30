import { useTranslations } from 'next-intl';

import { type NavSectionSbContent } from '@/lib/storyblok';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { NavSectionLinkItem } from '@/block-components/nav-section/NavSectionLinkItem';

interface MobileNavSectionProps {
  blok: NavSectionSbContent;
  onLinkClick: () => void;
}

export function MobileNavSection({ blok, onLinkClick }: MobileNavSectionProps) {
  const t = useTranslations('navigation');

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value={blok._uid}>
        {/* Trigger */}
        <AccordionTrigger className='text-[20px] leading-[24px] font-medium text-white'>
          <span>{blok.title}</span>
        </AccordionTrigger>

        {/* Content */}
        <AccordionContent className='pb-2'>
          <div className='mt-6 ml-5 flex flex-col gap-6 pb-2'>
            {blok.items && blok.items.length > 0 ? (
              blok.items.map((item) => (
                <div key={item._uid} onClick={onLinkClick}>
                  <NavSectionLinkItem blok={item} />
                </div>
              ))
            ) : (
              <div className='text-sm font-medium text-white/55 uppercase'>
                {t('noItems')}
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
