import { storyblokEditable } from '@storyblok/react/rsc';

import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { renderText } from '@/lib/richTextUtils';
import { type RichTextContentSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';

export function RichTextContent({ blok }: { blok: RichTextContentSbContent }) {
  if (!blok.text || !isRichtextNotEmpty(blok.text)) {
    return null;
  }

  return (
    <section
      className='text-foreground py-12 md:py-16'
      {...storyblokEditable(blok)}
    >
      <Container className='max-w-3xl py-10'>{renderText(blok.text)}</Container>
    </section>
  );
}
