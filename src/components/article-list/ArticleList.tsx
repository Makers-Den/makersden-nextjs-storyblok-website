'use client';

import { useState } from 'react';

import clsxm from '@/lib/clsxm';
import { type ArticleSbContent, type StoryblokStory } from '@/lib/storyblok';

import { PaginatedList } from '@/components/pagination/PaginatedList';

import { ArticleCard } from './ArticleCard';

const ITEMS_PER_PAGE = 6;

interface ArticleListProps {
  articles: StoryblokStory<ArticleSbContent & { intro?: string }>[];
}

export function ArticleList({ articles }: ArticleListProps) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <PaginatedList
      items={articles}
      itemsPerPage={ITEMS_PER_PAGE}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      emptyMessage='No articles found.'
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
              />
            ))}
          </div>
        );
      }}
    />
  );
}
