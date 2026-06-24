'use client';

import * as Accordion from '@radix-ui/react-accordion';

import clsxm from '@/lib/clsxm';
import {
  type FooterSectionSbContent,
  type LinkSbContent,
  type SbAsset,
  type SocialLinkSbContent,
} from '@/lib/storyblok';

import { Container } from '@/components/container/Container';
import { MakersDenFullLogo } from '@/components/icons/MakersDenFullLogo';
import { SvgIcon } from '@/components/icons/SvgIcon';
import { StoryblokImage } from '@/components/images/StoryblokImage';
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';
import { Text, TextSm } from '@/components/typography/Typography';

type FooterProps = {
  footerSections?: FooterSectionSbContent[];
  footerBottomLinks?: LinkSbContent[];
  footerSocialLinks?: SocialLinkSbContent[];
  copyrightNotice?: string;
  logo?: SbAsset;
  layoutType?: 'default' | 'leadPage';
};

const isSocialLink = (blok: unknown): blok is SocialLinkSbContent => {
  return Boolean(
    blok &&
    typeof blok === 'object' &&
    'component' in blok &&
    (blok as { component?: string }).component === 'SocialLink',
  );
};

const hasUsableLink = (link?: LinkSbContent['link']) => {
  if (!link) {
    return false;
  }

  if ('url' in link && link.url) {
    return true;
  }

  if ('cached_url' in link && link.cached_url) {
    return true;
  }

  if ('story' in link && link.story?.full_slug) {
    return true;
  }

  if ('email' in link && link.email) {
    return true;
  }

  return false;
};

export function Footer({
  footerSections,
  footerBottomLinks,
  footerSocialLinks,
  copyrightNotice,
  logo,
}: FooterProps) {
  // Create link columns from Storyblok sections
  const linkColumns = (footerSections ?? [])
    .map((section) => ({
      ...section,
      links: section.links ?? [],
    }))
    .filter((section) => section.title || section.links.length > 0);

  const legalLinks = footerBottomLinks ?? [];

  const socialLinks = Array.isArray(footerSocialLinks)
    ? footerSocialLinks.filter(isSocialLink)
    : [];

  const showBottomRow = Boolean(copyrightNotice) || legalLinks.length > 0;

  return (
    <footer className='border-brand-green/15 bg-brand-navy border-t text-white'>
      <Container className='px-2 py-12 md:px-3 md:py-16'>
        <div className='mb-12 flex flex-col gap-8 md:mb-16 md:gap-12 lg:flex-row lg:justify-between'>
          {/* Left Section: Logo */}
          <div className='flex flex-col gap-6 md:max-w-xs lg:max-w-sm'>
            {/* Logo */}
            <div className='flex flex-col gap-3'>
              {logo?.filename ? (
                <StoryblokImage
                  storyblokImage={logo}
                  className='h-8 w-auto'
                  width={120}
                  height={32}
                />
              ) : (
                <>
                  <MakersDenFullLogo className='h-6 w-[164px]' />
                  <TextSm as='p' className='max-w-sm text-white/65'>
                    Reusable Storyblok website templates shaped by Makers Den
                    for fast editorial launches.
                  </TextSm>
                </>
              )}
            </div>

            {/* Social Media Icons */}
            {socialLinks.length > 0 && (
              <div className='flex items-center gap-3'>
                {socialLinks.map((social) => {
                  const innerContent = social.icon?.filename ? (
                    <StoryblokImage
                      storyblokImage={social.icon}
                      className='h-4 w-4 object-contain'
                      width={16}
                      height={16}
                    />
                  ) : (
                    <span className='text-xs font-semibold uppercase'>
                      {social.name}
                    </span>
                  );

                  if (hasUsableLink(social.link)) {
                    return (
                      <StoryblokLink
                        key={social._uid}
                        link={social.link}
                        aria-label={social.name ?? 'Social link'}
                        className='border-brand-green/25 hover:border-brand-green hover:bg-brand-green hover:text-brand-navy flex h-10 w-10 items-center justify-center rounded-full border bg-white/5 text-white transition-colors'
                      >
                        {innerContent}
                      </StoryblokLink>
                    );
                  }

                  return (
                    <span
                      key={social._uid}
                      className='border-brand-green/15 flex h-10 w-10 items-center justify-center rounded-full border bg-white/5 text-white/55'
                    >
                      {innerContent}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop: Link Columns | Mobile: Accordion */}
          {linkColumns.length > 0 && (
            <>
              {/* Mobile Accordion */}
              <div className='md:hidden'>
                <Accordion.Root type='single' collapsible>
                  {linkColumns.map((column) => (
                    <Accordion.Item
                      key={column._uid}
                      value={column._uid}
                      className='border-brand-green/15 border-b'
                    >
                      <Accordion.Header className='flex'>
                        <Accordion.Trigger
                          className={clsxm(
                            'group flex w-full items-center justify-between py-4',
                            'transition-opacity hover:opacity-70',
                          )}
                        >
                          <TextSm
                            as='span'
                            className='font-semibold tracking-wide text-white uppercase'
                          >
                            {column.title}
                          </TextSm>
                          <div className='flex h-8 w-8 items-center justify-center'>
                            <SvgIcon
                              name='ChevronDown'
                              className={clsxm(
                                'text-brand-green h-4 w-4 transition-transform duration-200',
                                'group-data-[state=open]:rotate-180',
                              )}
                            />
                          </div>
                        </Accordion.Trigger>
                      </Accordion.Header>

                      <Accordion.Content
                        className={clsxm(
                          'overflow-hidden',
                          'data-[state=open]:animate-accordion-down',
                          'data-[state=closed]:animate-accordion-up',
                        )}
                      >
                        {column.links.length > 0 && (
                          <ul className='space-y-3 pb-4'>
                            {column.links.map((link) => {
                              const label =
                                link.name?.trim() || 'Untitled link';
                              return (
                                <li key={link._uid}>
                                  {hasUsableLink(link.link) ? (
                                    <StoryblokLink
                                      link={link.link}
                                      className='hover:text-brand-green text-white/65 transition-colors'
                                    >
                                      <Text as='span'>{label}</Text>
                                    </StoryblokLink>
                                  ) : (
                                    <Text as='span' className='text-white/40'>
                                      {label}
                                    </Text>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </div>

              {/* Desktop: Link Columns */}
              <div className='hidden gap-12 md:flex lg:gap-16'>
                {linkColumns.map((column) => (
                  <div key={column._uid} className='min-w-[140px]'>
                    {column.title && (
                      <Text
                        as='h3'
                        className='mb-4 font-semibold tracking-wide text-white'
                      >
                        {column.title}
                      </Text>
                    )}

                    {column.links.length > 0 && (
                      <ul className='space-y-3'>
                        {column.links.map((link) => {
                          const label = link.name?.trim() || 'Untitled link';

                          return (
                            <li key={link._uid}>
                              {hasUsableLink(link.link) ? (
                                <StoryblokLink
                                  link={link.link}
                                  className='hover:text-brand-green text-white/65 transition-colors'
                                >
                                  <Text as='span'>{label}</Text>
                                </StoryblokLink>
                              ) : (
                                <Text as='span' className='text-white/40'>
                                  {label}
                                </Text>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom Section: Copyright and Legal Links */}
        {showBottomRow && (
          <div className='border-brand-green/15 flex flex-col items-start justify-between gap-4 border-t pt-6 md:flex-row md:items-center md:pt-8'>
            {/* Copyright */}
            {copyrightNotice && (
              <TextSm as='p' className='text-white/55'>
                {copyrightNotice}
              </TextSm>
            )}

            {/* Legal Links */}
            {legalLinks.length > 0 && (
              <ul className='flex flex-wrap gap-6'>
                {legalLinks.map((link) => {
                  const label = link.name?.trim() || 'Untitled link';
                  return (
                    <li key={link._uid}>
                      {hasUsableLink(link.link) ? (
                        <StoryblokLink
                          link={link.link}
                          className='hover:text-brand-green text-white/55 transition-colors'
                        >
                          <TextSm as='span'>{label}</TextSm>
                        </StoryblokLink>
                      ) : (
                        <TextSm as='span' className='text-white/40'>
                          {label}
                        </TextSm>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </Container>
    </footer>
  );
}
