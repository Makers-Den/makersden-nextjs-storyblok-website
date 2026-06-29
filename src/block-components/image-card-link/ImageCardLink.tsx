import { storyblokEditable } from '@storyblok/react/rsc';

import { type ImageCardLinkSbContent, sbLinkToHref } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function ImageCardLink({ blok }: { blok: ImageCardLinkSbContent }) {
  if (!blok.image) {
    return null;
  }

  const href = sbLinkToHref(blok.link);
  const hasLink = Boolean(href && href !== '#');
  const CardWrapper = hasLink ? StoryblokLink : 'div';
  const wrapperProps = hasLink ? { link: blok.link! } : {};

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
