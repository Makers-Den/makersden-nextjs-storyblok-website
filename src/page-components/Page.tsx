import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';

import { JsonLdMetadataSbContent, PageSbContent } from '@/lib/storyblok';

import { JsonLdMetadata } from '@/components/json-ld-metadata/JsonLdMetadata';
import { Layout } from '@/components/layout/Layout';
import { BigHeading } from '@/components/typography/Typography';

function Page({ blok }: { blok: PageSbContent }) {
  return (
    <Layout>
      {blok.additionalMetadata?.map((el: JsonLdMetadataSbContent) => (
        <JsonLdMetadata jsonLd={el.jsonLd as unknown as JSON} key={el._uid} />
      ))}
      <main {...storyblokEditable(blok)}>
        {!blok.body && (
          <BigHeading className='mt-20'>
            Add your first block to see some content
          </BigHeading>
        )}
        {blok.body?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
    </Layout>
  );
}

export default Page;
