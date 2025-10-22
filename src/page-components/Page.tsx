import type { JsonLdMetadataSbContent, PageSbContent } from '@/lib/storyblok';

import { GenericStoryblokComponent } from '@/components/generic-storyblok-component/GenericStoryblokComponent';
import { JsonLdMetadata } from '@/components/json-ld-metadata/JsonLdMetadata';
import { HeadingLg } from '@/components/typography/Typography';

import { type PageComponentProps } from '@/types';

function Page({ blok, translations }: PageComponentProps<PageSbContent>) {
  return (
    <>
      {blok.additionalMetadata?.map((el: JsonLdMetadataSbContent) => (
        <JsonLdMetadata jsonLd={el.jsonLd as unknown as string} key={el._uid} />
      ))}
      <main>
        {!blok.body && (
          <HeadingLg className='mt-20'>
            Add your first block to see some content
          </HeadingLg>
        )}
        {blok.body?.map((nestedBlok) => (
          <GenericStoryblokComponent
            blok={nestedBlok}
            key={nestedBlok._uid}
            translations={translations}
          />
        ))}
      </main>
    </>
  );
}

export default Page;
