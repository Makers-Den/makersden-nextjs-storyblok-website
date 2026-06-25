import * as Accordion from '@radix-ui/react-accordion';
import { useTranslations } from 'next-intl';

import clsxm from '@/lib/clsxm';
import { type NavSectionSbContent } from '@/lib/storyblok';

import { SvgIcon } from '@/components/icons/SvgIcon';

import { NavSectionLinkItem } from '@/block-components/nav-section/NavSectionLinkItem';

interface MobileNavSectionProps {
  blok: NavSectionSbContent;
  onLinkClick: () => void;
}

export function MobileNavSection({ blok, onLinkClick }: MobileNavSectionProps) {
  const t = useTranslations('navigation');

  return (
    <Accordion.Root type='single' collapsible>
      <Accordion.Item value={blok._uid}>
        {/* Trigger */}
        <Accordion.Header className='flex'>
          <Accordion.Trigger
            className={clsxm(
              'flex w-full items-center justify-between',
              'text-[20px] leading-[24px] font-medium text-white',
              'hover:text-brand-green transition-colors',
              'group',
            )}
          >
            <span>{blok.title}</span>
            <div className='flex h-8 w-8 items-center justify-center'>
              <SvgIcon
                name='ChevronDown'
                className={clsxm(
                  'h-4 w-4 text-current transition-transform duration-200',
                  'group-data-[state=open]:rotate-180',
                )}
              />
            </div>
          </Accordion.Trigger>
        </Accordion.Header>

        {/* Content */}
        <Accordion.Content
          className={clsxm(
            'overflow-hidden',
            'data-[state=open]:animate-accordion-down',
            'data-[state=closed]:animate-accordion-up',
          )}
        >
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
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
