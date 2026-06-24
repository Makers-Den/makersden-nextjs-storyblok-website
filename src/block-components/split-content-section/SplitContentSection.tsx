import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import { type SplitContentSectionSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';

function getProportionClasses(sectionsProportions?: string): string {
  switch (sectionsProportions) {
    case '33/66':
      return 'md:grid-cols-[1fr_2fr]';
    case '66/33':
      return 'md:grid-cols-[2fr_1fr]';
    case '50/50':
    default:
      return 'md:grid-cols-2';
  }
}

export function SplitContentSection({
  blok,
}: {
  blok: SplitContentSectionSbContent;
}) {
  return (
    <section
      className='text-foreground py-16 md:py-20'
      {...storyblokEditable(blok)}
    >
      <Container
        className={`grid grid-cols-1 items-start gap-6 md:gap-10 ${getProportionClasses(blok.sectionsProportions)}`}
      >
        <div className='flex flex-col items-start justify-center gap-6'>
          {blok.leftSection?.map((child) => (
            <StoryblokServerComponent blok={child} key={child._uid} />
          ))}
        </div>
        <div className='flex flex-col items-start justify-center gap-6'>
          {blok.rightSection?.map((child) => (
            <StoryblokServerComponent blok={child} key={child._uid} />
          ))}
        </div>
      </Container>
    </section>
  );
}
