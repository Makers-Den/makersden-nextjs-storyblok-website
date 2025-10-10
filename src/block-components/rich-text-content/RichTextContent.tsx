import { storyblokEditable } from '@storyblok/react/rsc';

import { renderText } from '@/lib/richTextUtils';
import { type RichTextContentSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';

export function RichTextContent({ blok }: { blok: RichTextContentSbContent }) {
  return (
    <Container className='py-12' {...storyblokEditable(blok)}>
      {blok.text && renderText(blok.text)}
    </Container>
  );
}
