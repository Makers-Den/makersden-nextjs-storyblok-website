import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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
import { routing } from '@/i18n/routing';

async function StyleguidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations('styleguide');

  return (
    <BasicLayout locale={locale}>
      <Container>
        <HeadingXl>{t('title')}</HeadingXl>
        <TextLg>{t('description')}</TextLg>
        <section className='mt-12 space-y-6'>
          <HeadingLg>{t('buttons.title')}</HeadingLg>
          <div className='flex flex-wrap items-center gap-4'>
            <Button>{t('buttons.default')}</Button>
            <Button variant='outline'>{t('buttons.outline')}</Button>
            <Button variant='secondary'>{t('buttons.secondary')}</Button>
            <Button variant='accent'>{t('buttons.accent')}</Button>
            <Button variant='ghost'>{t('buttons.ghost')}</Button>
            <ButtonLink href='/' size='pill'>
              {t('buttons.link')}
            </ButtonLink>
          </div>
        </section>
        <section className='mt-12 space-y-6'>
          <HeadingLg>{t('badgeCard.title')}</HeadingLg>
          <Card className='border-border/30 bg-card/30 max-w-sm'>
            <CardHeader>
              <Badge className='w-fit'>{t('badgeCard.badge')}</Badge>
            </CardHeader>
            <CardContent>
              <HeadingLg as='h3'>{t('badgeCard.heading')}</HeadingLg>
              <TextLg className='text-muted-foreground mt-4'>
                {t('badgeCard.description')}
              </TextLg>
            </CardContent>
          </Card>
        </section>
        <section>
          <HeadingLg>{t('accordion.title')}</HeadingLg>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>
                {t('accordion.accessible.question')}
              </AccordionTrigger>
              <AccordionContent>
                {t('accordion.accessible.answer')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>
                {t('accordion.styled.question')}
              </AccordionTrigger>
              <AccordionContent>
                {t('accordion.styled.answer')}
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
