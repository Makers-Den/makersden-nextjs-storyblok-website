import { storyblokEditable } from '@storyblok/react/rsc';

import { type CtaLinkSbContent, sbLinkToHref } from '@/lib/storyblok';

import { ButtonLink, type ButtonProps } from '@/components/button';

export function CtaLink({ blok }: { blok: CtaLinkSbContent }) {
  const href = sbLinkToHref(blok.link);

  // Don't render if there's no valid link or no name
  if (!href || href === '#' || !blok.name) {
    return null;
  }

  const iconFilename = blok.icon?.filename ?? null;

  // Map the Storyblok type field to Button variant
  // Empty string or undefined defaults to "default" variant
  const variant: ButtonProps['variant'] =
    blok.type === '' || !blok.type ? 'default' : blok.type;

  return (
    <ButtonLink
      href={href}
      variant={variant}
      size={blok.size || 'default'}
      arrow={blok.alwaysShowArrow ? 'always' : 'hover'}
      icon={iconFilename ?? undefined}
      {...storyblokEditable(blok)}
    >
      {blok.name}
    </ButtonLink>
  );
}
