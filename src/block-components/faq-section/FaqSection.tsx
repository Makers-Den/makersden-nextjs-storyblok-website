import { storyblokEditable } from '@storyblok/react/rsc';

import {
  renderHeadingLg as renderHeadingLg,
  renderText,
} from '@/lib/richTextUtils';
import { type FaqSectionSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FaqSection({ blok }: { blok: FaqSectionSbContent }) {
  return (
    <Container className='py-20'>
      {blok.title && renderHeadingLg(blok.title)}
      <Accordion
        type='single'
        collapsible
        className='w-full'
        {...storyblokEditable(blok)}
      >
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
  );
}
