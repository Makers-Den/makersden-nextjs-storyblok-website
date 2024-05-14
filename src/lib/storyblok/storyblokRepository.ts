import { type ISbStoriesParams } from '@storyblok/react/rsc';

import type { PageSbContent } from './blockLibraryTypes';
import type { StoryblokStory } from './sbInternalTypes';
import { storyblokClient } from './storyblokClient';
import {
  type ContentTypeName,
  type DatasourceEntry,
  type Filter,
  type FindDatasourcesEntriesArgs,
  type FindDatasourcesEntriesFn,
  type FindStoriesArgs,
  type FindStoriesFn,
  type FindStoryArgs,
  type FindStoryFn,
  type HasPosition,
  type WithTotal,
} from './storyblokRepositoryTypes';
import { isDevelopment } from '../constants';

/** These pages exist, but should not be included in site map */
export const SITEMAP_EXCLUDED_SLUGS = ['home', 'not-found', 'dev-page'];

export const ALL_PAGE_TYPES: ContentTypeName[] = ['Page'];

export const RESOLVED_RELATIONS_ARRAY = [];
/**
 * The default set of story relations that should be resolved when fetching a story.
 * Each element is in the format of [block name].[field name]
 *
 * You have to explicitly use this when relevant.
 * If a relation isn't resolved, it'll just be an array of uuids.
 * If a relation is resolved, it'll be an array of stories with content populated.
 */
export const RESOLVED_RELATIONS = RESOLVED_RELATIONS_ARRAY.join(',');

/**
 * Get the data for a single story, usually a page
 *
 * @throws if no story with this slug or some other connection error
 * @returns story data
 */
export const findStory: FindStoryFn = async <
  StoryType = StoryblokStory<PageSbContent>
>({
  slug,
  locale,
  isPreview,
  resolveRelations,
}: FindStoryArgs) => {
  const storiesParams: ISbStoriesParams = {
    version: 'published',
    language: locale,
    resolve_relations: resolveRelations,
  };

  if (isPreview) {
    // set the version to draft in the preview mode
    storiesParams.version = 'draft';
  }

  if (isPreview ?? isDevelopment) {
    // Forces the latest content version
    storiesParams.cv = Date.now();
  }

  const response = await storyblokClient.get(
    `cdn/stories/${slug}`,
    storiesParams
  );

  const data = response.data as { story?: StoryType } | null;

  if (!data || !data.story) {
    throw new Error(`No story data received from Storyblok for slug ${slug}`);
  }

  return data;
};

/**
 * NextJS `getStaticPaths` returns an array of these.
 */
export type StaticPathParams = {
  params: { slug: string[] };
  locale?: string;
};

const unique = (arr: string[]) => {
  return Array.from(new Set(arr));
};

/**
 * Note: this will include separate entries for localized stories, with the locale encoded in slug.
 */
export const findAllPageSlugs = async (locales?: string[]) => {
  // Note, will only work for up to the 100 first stories,
  // if you have 100+ of a page type you'll have to implement paging

  const allPageStoryResults = await Promise.all(
    (locales ?? [undefined])
      .map((locale) =>
        ALL_PAGE_TYPES.map((contentType) =>
          findStories({ contentType, perPage: 100, locale })
        )
      )
      .flat()
  );

  const allSlugsWithLocale = allPageStoryResults
    .map((result) => result.stories.map((story) => story.full_slug))
    .flat();

  const allSlugsWithoutLocale = allSlugsWithLocale.filter((slug) => {
    const maybeLocaleId = slug.split('/')[0];
    return !(locales ?? []).includes(maybeLocaleId);
  });

  return {
    allSlugsWithLocale,
    allSlugsWithoutLocale: unique(allSlugsWithoutLocale),
  };
};

/** Returns an empty object unless values are set for the keys in the opts */
const emptyOr = (opts: Record<string, unknown>) =>
  Object.keys(opts).some((key) => typeof opts[key] !== 'undefined') ? opts : {};

const buildFilterQuery = (query: Filter | Filter[] | undefined) => {
  if (!query) {
    return {};
  }

  const queries = Array.isArray(query) ? query : [query];

  return queries.reduce((acc, { condition, value }) => {
    return { ...acc, [`filter_query${condition}`]: value };
  }, {});
};

/**
 * Get the data of multiple stores, like a list of the latest articles
 * E.g. findStories({ startsWith: 'events/', sortBy: 'first_published_at:desc',  })
 * @returns list
 */
export const findStories: FindStoriesFn = async <
  StoryType = StoryblokStory<PageSbContent>
>({
  startsWith,
  excludingSlugs,
  filterQuery,
  sortBy,
  resolveRelations,
  withTag,
  perPage = 10,
  page = 1,
  locale,
  isPreview,
  contentType,
}: FindStoriesArgs): Promise<WithTotal<(StoryType & HasPosition)[]>> => {
  const storiesParams: ISbStoriesParams = {
    version: 'published',
    ...emptyOr({ language: locale }),
    ...emptyOr({ starts_with: startsWith }),
    ...emptyOr({ excluding_slugs: excludingSlugs }),
    ...emptyOr({ with_tag: withTag }),
    ...buildFilterQuery(filterQuery),
    ...emptyOr({ content_type: contentType }),
    ...emptyOr({ sort_by: sortBy }),

    per_page: perPage,
    page: page,

    ...emptyOr({ resolve_relations: resolveRelations }),
  };

  if (isPreview) {
    // set the version to draft in the preview mode
    storiesParams.version = 'draft';
  }

  if (isPreview ?? isDevelopment) {
    // Forces the latest content version
    storiesParams.cv = Date.now();
  }

  const response = await storyblokClient.get(`cdn/stories`, storiesParams);

  const data = response.data as {
    stories?: (StoryType & HasPosition)[];
  } | null;

  if (!data?.stories) {
    throw new Error(
      `No story data received from Storyblok query ${JSON.stringify(
        storiesParams
      )}`
    );
  }

  return {
    stories: [...data.stories],
    total: Number(response.total),
  };
};

export type DatasourceEntriesResponse<Val extends string = string> = {
  datasource_entries: DatasourceEntry<Val>[];
};

export const findDatasourcesEntries: FindDatasourcesEntriesFn = async <
  Val extends string = string
>({
  datasource,
  dimension,
  perPage = 25,
  page = 1,
}: FindDatasourcesEntriesArgs) => {
  const response = await storyblokClient.get('cdn/datasource_entries', {
    datasource,
    ...emptyOr({ dimension }),
    per_page: perPage,
    page: page,
  });

  return (
    (response.data as unknown as DatasourceEntriesResponse<Val>)
      .datasource_entries || null
  );
};
