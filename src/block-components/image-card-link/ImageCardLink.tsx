import { storyblokEditable } from '@storyblok/react/rsc';

import { type ImageCardLinkSbContent } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';

export function ImageCardLink({ blok }: { blok: ImageCardLinkSbContent }) {
  if (!blok.image) {
    return null;
  }

  const hasLink = Boolean(
    blok.link && 'cached_url' in blok.link && blok.link.cached_url,
  );
  const CardWrapper = hasLink ? StoryblokLink : 'div';
  const wrapperProps = hasLink ? { link: blok.link! } : {};

  return (
    <CardWrapper
      {...wrapperProps}
      {...storyblokEditable(blok)}
      className='relative block overflow-hidden rounded-md transition-opacity hover:opacity-90'
    >
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
        <div className='bg-brand-navy absolute top-4 left-4 rounded-sm px-4 py-2'>
          <span className='font-display text-sm leading-none font-bold text-white'>
            {blok.pillText}
          </span>
        </div>
      )}
    </CardWrapper>
  );
}
