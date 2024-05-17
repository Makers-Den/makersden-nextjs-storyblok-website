import { Container } from '@/components/container/Container';
import {
  HeadingLg,
  HeadingXl,
  TextLg,
} from '@/components/typography/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { BasicLayout } from '@/app/BasicLayout';

function StyleguidePage() {
  return (
    <BasicLayout locale='en'>
      <Container>
        <HeadingXl>Styleguide2</HeadingXl>
        <TextLg>
          Sometimes its convenient to develop components in isolation
        </TextLg>
        <section>
          <HeadingLg>Accordion</HeadingLg>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </Container>
    </BasicLayout>
  );
}

export default StyleguidePage;

export const generateMetadata = () => ({
  noIndex: true,
});
