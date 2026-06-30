import { storyblokEditable } from '@storyblok/react/rsc';

import { type ImageCardLinkSbContent, sbLinkToHref } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { defaultLocale, type Locale } from '@/i18n/config';

export function ImageCardLink({
  blok,
  locale = defaultLocale,
}: {
  blok: ImageCardLinkSbContent;
  locale?: Locale;
}) {
  if (!blok.image) {
    return null;
  }

  const href = sbLinkToHref(blok.link, locale);
  const hasLink = Boolean(href && href !== '#');
  const CardWrapper = hasLink ? StoryblokLink : 'div';
  const wrapperProps = hasLink ? { link: blok.link!, locale } : {};

  return (
    <Card
      asChild
      className='relative block border-0 bg-transparent transition-opacity hover:opacity-90'
    >
      <CardWrapper {...wrapperProps} {...storyblokEditable(blok)}>
        {/* Cover Image */}
        <div className='relative aspect-video w-full'>
          <StoryblokImage
            storyblokImage={blok.image}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>

        {/* Pill Badge */}
        {blok.pillText && (
          <Badge className='bg-brand-navy absolute top-4 left-4 px-4 py-2 text-white'>
            {blok.pillText}
          </Badge>
        )}
      </CardWrapper>
    </Card>
  );
}
