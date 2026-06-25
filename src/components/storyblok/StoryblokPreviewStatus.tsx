import { draftMode } from 'next/headers';

type StoryblokPreviewStatusProps = {
  slug?: string;
};

const getNormalizedEnvironmentValue = (value?: string) =>
  value?.trim().toLowerCase();

const isDraftContentEnvironment = () =>
  process.env.NODE_ENV === 'development' ||
  getNormalizedEnvironmentValue(process.env.SITE_ENVIRONMENT) === 'preview' ||
  getNormalizedEnvironmentValue(process.env.STORYBLOK_VERSION) === 'draft' ||
  getNormalizedEnvironmentValue(process.env.VERCEL_ENV) === 'preview';

const getEnvironmentLabel = () => {
  const explicitEnvironment = process.env.SITE_ENVIRONMENT?.trim();

  if (explicitEnvironment) {
    return explicitEnvironment;
  }

  const vercelEnvironment = process.env.VERCEL_ENV?.trim();

  if (vercelEnvironment) {
    return vercelEnvironment;
  }

  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
};

const getStoryLabel = (slug?: string) => {
  const normalizedSlug = slug?.replace(/^\/+|\/+$/g, '');

  return normalizedSlug || 'home';
};

export async function StoryblokPreviewStatus({
  slug,
}: StoryblokPreviewStatusProps) {
  const isPreview = (await draftMode()).isEnabled;

  if (!isPreview && !isDraftContentEnvironment()) {
    return null;
  }

  const storyLabel = getStoryLabel(slug);
  const environmentLabel = getEnvironmentLabel();

  return (
    <div
      aria-live='polite'
      className='text-brand-navy pointer-events-none fixed right-3 bottom-3 z-[100] flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-md bg-[rgb(var(--ink-rgb)/0.96)] px-3 py-2 font-mono text-[11px] leading-none font-semibold shadow-[0_18px_48px_rgba(0,0,0,0.6)] backdrop-blur-md md:right-4 md:bottom-4'
      data-nosnippet
      role='status'
    >
      <span className='text-brand-navy flex items-center gap-1.5'>
        <span
          aria-hidden='true'
          className='bg-brand-green h-1.5 w-1.5 rounded-full shadow-[0_0_10px_rgba(109,218,132,0.75)]'
        />
        Draft preview:
      </span>
      <span
        className='text-brand-navy/75 max-w-[min(16rem,42vw)] truncate'
        title={storyLabel}
      >
        {storyLabel}
      </span>
      <span className='bg-brand-navy rounded-sm px-1.5 py-1 text-[rgb(var(--ink-rgb))]'>
        env: {environmentLabel}
      </span>
    </div>
  );
}
