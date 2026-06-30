'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import clsxm from '@/lib/clsxm';
import { type ArticleSbContent, type StoryblokStory } from '@/lib/storyblok';

import { PaginatedList } from '@/components/pagination/PaginatedList';

import { type Locale } from '@/i18n/config';

import { ArticleCard } from './ArticleCard';

const ITEMS_PER_PAGE = 6;

interface ArticleListProps {
  articles: StoryblokStory<ArticleSbContent & { intro?: string }>[];
  locale: Locale;
}

export function ArticleList({ articles, locale }: ArticleListProps) {
  const t = useTranslations('article');
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <PaginatedList
      items={articles}
      itemsPerPage={ITEMS_PER_PAGE}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      emptyMessage={t('empty')}
      renderItems={(currentArticles) => {
        const isOnlyItem = currentArticles.length === 1;

        return (
          <div
            className={clsxm(
              isOnlyItem
                ? 'grid grid-cols-1'
                : 'grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3',
            )}
          >
            {currentArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                isOnlyItem={isOnlyItem}
                locale={locale}
              />
            ))}
          </div>
        );
      }}
    />
  );
}
