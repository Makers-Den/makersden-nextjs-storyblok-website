import { storyblokEditable } from '@storyblok/react/rsc';

import { renderHeadingLg, renderText, renderTextLg } from '@/lib/richTextUtils';
import { type FaqSectionSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';
import { SectionWrapper } from '@/components/section-wrapper/SectionWrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FaqSection({ blok }: { blok: FaqSectionSbContent }) {
  return (
    <SectionWrapper
      color={blok.backgroundColor}
      spacingTop={blok.spacingTop}
      spacingBottom={blok.spacingBottom}
      {...storyblokEditable(blok)}
    >
      <Container>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:gap-16'>
          {/* Title on the left */}
          {blok.title && (
            <div className='flex items-center'>
              {renderHeadingLg(blok.title, 'h2')}
            </div>
          )}

          {/* Accordion on the right */}
          <Accordion
            type='single'
            collapsible
            className='flex w-full flex-col gap-8'
            defaultValue='item-0'
          >
            {blok.faqItems.map(({ _uid, question, answer }, idx) => (
              <AccordionItem
                key={_uid}
                value={`item-${idx}`}
                className='rounded-[10px] border-2 border-gray-300 bg-white px-6 py-6'
              >
                {question && (
                  <AccordionTrigger className='gap-4 hover:no-underline'>
                    {renderTextLg(question)}
                  </AccordionTrigger>
                )}
                {answer && (
                  <AccordionContent className='max-w-[80ch] pt-2'>
                    {renderText(answer)}
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </SectionWrapper>
  );
}
