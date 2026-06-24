import { draftMode } from 'next/headers';

type StoryblokPreviewStatusProps = {
  slug?: string;
};

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

  if (!isPreview) {
    return null;
  }

  const storyLabel = getStoryLabel(slug);
  const environmentLabel = getEnvironmentLabel();

  return (
    <div
      aria-live='polite'
      className='border-brand-green/35 bg-brand-navy-soft/95 text-foreground pointer-events-none fixed right-3 bottom-3 z-[100] flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-md border px-3 py-2 font-mono text-[11px] leading-none font-semibold shadow-[0_12px_32px_rgba(0,0,0,0.45)] ring-1 ring-black/25 backdrop-blur-md md:right-4 md:bottom-4'
      data-nosnippet
      role='status'
    >
      <span className='text-brand-green flex items-center gap-1.5'>
        <span
          aria-hidden='true'
          className='bg-brand-green h-1.5 w-1.5 rounded-full shadow-[0_0_10px_rgba(109,218,132,0.75)]'
        />
        Draft preview
      </span>
      <span
        className='text-foreground/75 max-w-[min(16rem,42vw)] truncate'
        title={storyLabel}
      >
        {storyLabel}
      </span>
      <span className='text-foreground/85 rounded-sm border border-white/10 bg-white/5 px-1.5 py-1'>
        env: {environmentLabel}
      </span>
    </div>
  );
}
