import { storyblokEditable } from '@storyblok/react/rsc';

import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { renderHeadingLg, renderText } from '@/lib/richTextUtils';
import { type TitleAndTextSbContent } from '@/lib/storyblok';

export function TitleAndText({ blok }: { blok: TitleAndTextSbContent }) {
  const hasTitle = blok.title && isRichtextNotEmpty(blok.title);
  const hasText = blok.text && isRichtextNotEmpty(blok.text);

  if (!hasTitle && !hasText) {
    return null;
  }

  return (
    <div {...storyblokEditable(blok)} className='flex flex-col gap-4'>
      {/* Title - renders paragraphs as HeadingLg h2, headings use default mapping */}
      {hasTitle && <div>{renderHeadingLg(blok.title!, 'h2')}</div>}

      {/* Text - standard rich text rendering */}
      {hasText && <div>{renderText(blok.text!)}</div>}
    </div>
  );
}
