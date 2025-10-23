import { storyblokEditable } from '@storyblok/react/rsc';

import {
  renderHeadingLg as renderHeadingLg,
  renderText,
} from '@/lib/richTextUtils';
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
        {blok.title && renderHeadingLg(blok.title)}
        <Accordion type='single' collapsible className='w-full'>
          {blok.faqItems.map(({ _uid, question, answer }, idx) => (
            <AccordionItem key={_uid} value={`item-${idx}`}>
              {question && (
                <AccordionTrigger>{renderText(question)}</AccordionTrigger>
              )}
              {answer && (
                <AccordionContent>{renderText(answer)}</AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </SectionWrapper>
  );
}
