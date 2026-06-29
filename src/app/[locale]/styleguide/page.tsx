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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/button-link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { BasicLayout } from '@/app/BasicLayout';

function StyleguidePage() {
  return (
    <BasicLayout locale='en'>
      <Container>
        <HeadingXl>Styleguide</HeadingXl>
        <TextLg>
          Sometimes its convenient to develop components in isolation
        </TextLg>
        <section className='mt-12 space-y-6'>
          <HeadingLg>Buttons</HeadingLg>
          <div className='flex flex-wrap items-center gap-4'>
            <Button>Default</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='accent'>Accent</Button>
            <Button variant='ghost'>Ghost</Button>
            <ButtonLink href='/' size='pill'>
              Button Link
            </ButtonLink>
          </div>
        </section>
        <section className='mt-12 space-y-6'>
          <HeadingLg>Badge & Card</HeadingLg>
          <Card className='border-border/30 bg-card/30 max-w-sm'>
            <CardHeader>
              <Badge className='w-fit'>Makers Den</Badge>
            </CardHeader>
            <CardContent>
              <HeadingLg as='h3'>Reusable primitive</HeadingLg>
              <TextLg className='text-muted-foreground mt-4'>
                The card, badge, and button primitives use the template theme
                tokens.
              </TextLg>
            </CardContent>
          </Card>
        </section>
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
