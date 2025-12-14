import { type Datasources, type PageSbContent } from './blockLibraryTypes';
import { type StoryblokStory } from './sbInternalTypes';

export type WithTotal<T> = { total: number; stories: T };

export type Filter = {
  condition: string;
  value: string;
};

// TODO: I assume we could autogenerate these
export type ContentTypeName =
  | 'Page'
  | 'Post'
  | 'Article'
  | 'GlobalSettings'
  | 'FaqSettings'
  | 'TeamMember'
  | 'Category'
  | 'ClientTestimonial'
  | 'PostsOverview';

export type FindStoriesArgs = {
  /** e.g. 'events/' */
  startsWith?: string;
  excludingSlugs?: string;
  /** https://www.storyblok.com/docs/api/content-delivery#filter-queries/overview  */
  filterQuery?: Filter | Filter[];
  /** e.g. 'featured,home' */
  withTag?: string;

  /** e.g. 'first_published_at:desc' */
  sortBy?: string;
  /** default: 25, max: 100 */
  perPage?: number;
  /** default: 1 */
  page?: number;

  resolveRelations?: string;

  contentType?: ContentTypeName;

  locale?: string;
  isPreview?: boolean;
};

/**
 * Some of you might like to define the order of your entries in Storyblok, utilizing the move functionality.
 * To receive the order just like in Storyblok you can make use of the position property.
 *
 * Attention: The position property is only sorted within one folder
 */
export type HasPosition = { position: number };

export type FindStoryArgs = {
  slug: string;
  locale?: string;
  isPreview?: boolean;
  /** E.g. Post.categories,FeaturedPosts.posts, otherwise it'll just be an array of uids */
  resolveRelations?: string;
  resolveLinks?: 'link' | 'url' | 'story';
};

export type FindStoryFn = <StoryType = StoryblokStory<PageSbContent>>(
  args: FindStoryArgs,
) => Promise<{ story?: StoryType | undefined }>;

export type FindStoriesFn = <StoryType = StoryblokStory<PageSbContent>>(
  args: FindStoriesArgs,
) => Promise<WithTotal<(StoryType & HasPosition)[]>>;

export type FindDatasourcesEntriesArgs = {
  datasource: Datasources;
  dimension?: string;
  /** default: 25, max: 100 */
  perPage?: number;
  /** default: 1 */
  page?: number;
};

export type DatasourceEntry<Val extends string = string> = {
  id: number;
  value: Val;
  name: string;
};

export type FindDatasourcesEntriesFn = <Val extends string = string>(
  args: FindDatasourcesEntriesArgs,
) => Promise<DatasourceEntry<Val>[]>;
