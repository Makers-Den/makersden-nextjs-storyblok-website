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
      className='relative block overflow-hidden rounded-[10px] transition-transform duration-200 hover:scale-[1.02]'
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
        <div className='absolute top-[14px] left-4 rounded-[32px] border-2 border-white bg-black px-8 py-4'>
          <span className='font-display text-xl leading-[20px] font-medium text-white'>
            {blok.pillText}
          </span>
        </div>
      )}
    </CardWrapper>
  );
}
