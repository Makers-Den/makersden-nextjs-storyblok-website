import { storyblokEditable } from '@storyblok/react/rsc';

import { renderHeadingMd, renderText, renderTextLg } from '@/lib/richTextUtils';
import { type FaqSectionSbContent } from '@/lib/storyblok';

import { AnimateOnScroll } from '@/components/animate-on-scroll/AnimateOnScroll';
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
        <AnimateOnScroll>
          <div className='mx-auto max-w-3xl'>
            {/* Title */}
            {blok.title && (
              <div className='mb-12 text-center'>
                {renderHeadingMd(blok.title, 'h3')}
              </div>
            )}

            {/* Accordion list */}
            <Accordion type='single' collapsible defaultValue='item-0'>
              {blok.faqItems.map(({ _uid, question, answer }, idx) => (
                <AccordionItem key={_uid} value={`item-${idx}`}>
                  {question && (
                    <AccordionTrigger className='text-left text-base font-semibold hover:no-underline md:text-lg'>
                      {renderTextLg(question)}
                    </AccordionTrigger>
                  )}

                  {answer && (
                    <AccordionContent className='text-muted-foreground'>
                      {renderText(answer)}
                    </AccordionContent>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimateOnScroll>
      </Container>
    </SectionWrapper>
  );
}
