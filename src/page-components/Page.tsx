import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';

import type { JsonLdMetadataSbContent, PageSbContent } from '@/lib/storyblok';

import { JsonLdMetadata } from '@/components/json-ld-metadata/JsonLdMetadata';
import { HeadingLg } from '@/components/typography/Typography';

function Page({ blok }: { blok: PageSbContent }) {
  return (
    <>
      {blok.additionalMetadata?.map((el: JsonLdMetadataSbContent) => (
        <JsonLdMetadata jsonLd={el.jsonLd as unknown as string} key={el._uid} />
      ))}
      <main
        className='container mx-auto my-6 max-w-6xl flex-1'
        {...storyblokEditable(blok)}
      >
        {!blok.body && (
          <HeadingLg className='mt-20'>
            Add your first block to see some content
          </HeadingLg>
        )}
        {blok.body?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
    </>
  );
}

export default Page;
