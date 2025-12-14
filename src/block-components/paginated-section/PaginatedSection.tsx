import { storyblokEditable } from '@storyblok/react/rsc';

import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { renderText, richTextToString } from '@/lib/richTextUtils';
import {
  type ArticleSbContent,
  type PaginatedSectionSbContent,
  type StoryblokStory,
} from '@/lib/storyblok';
import {
  findStories,
  RESOLVED_RELATIONS,
} from '@/lib/storyblok/storyblokRepository';

import { ArticleList } from '@/components/article-list/ArticleList';
import { Container } from '@/components/container/Container';
import { SectionWrapper } from '@/components/section-wrapper/SectionWrapper';
import { HeadingMd } from '@/components/typography/Typography';

export async function PaginatedSection({
  blok,
}: {
  blok: PaginatedSectionSbContent;
}) {
  // Fetch all articles
  const allArticles: StoryblokStory<ArticleSbContent>[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { stories, total } = await findStories<
      StoryblokStory<ArticleSbContent>
    >({
      contentType: blok.contentType,
      resolveRelations: RESOLVED_RELATIONS,
      perPage: 100,
      sortBy: 'content.date:desc',
      page,
    });

    allArticles.push(...stories);

    if (allArticles.length >= total) {
      hasMore = false;
    } else {
      page += 1;
    }
  }

  // Transform articles to include string intro for client component
  const articlesWithStringIntro = allArticles.map((article) => ({
    ...article,
    content: {
      ...article.content,
      intro:
        article.content.intro && isRichtextNotEmpty(article.content.intro)
          ? richTextToString(article.content.intro)
          : undefined,
    },
  }));

  return (
    <SectionWrapper
      color={blok.backgroundColor}
      spacingTop={blok.spacingTop}
      spacingBottom={blok.spacingBottom}
      {...storyblokEditable(blok)}
    >
      <Container>
        {/* Title */}
        <div className='mb-12'>
          <div className='mb-8'>
            <HeadingMd className='mb-4'>{blok.title}</HeadingMd>
            <div className='bg-border h-px w-40' />
          </div>

          {blok.description && isRichtextNotEmpty(blok.description) && (
            <div className='max-w-3xl'>{renderText(blok.description)}</div>
          )}
        </div>

        {/* Article List */}
        <ArticleList articles={articlesWithStringIntro} />
      </Container>
    </SectionWrapper>
  );
}
