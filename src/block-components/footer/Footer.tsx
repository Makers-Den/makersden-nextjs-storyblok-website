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
import { SvgIcon } from '@/components/icons/SvgIcon';
import { StoryblokImage } from '@/components/images/StoryblokImage';
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';
import {
  HeadingLg,
  HeadingSm,
  Text,
  TextSm,
} from '@/components/typography/Typography';

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
    <footer className='bg-black text-white'>
      <Container className='px-2 py-3 md:px-3 md:py-12'>
        <div className='mb-3 flex flex-col gap-3 md:mb-12 md:gap-12 lg:flex-row lg:justify-between'>
          {/* Left Section: Logo, Social Links, Newsletter */}
          <div className='flex flex-col gap-6 md:gap-5'>
            {/* Logo */}
            <div className='flex items-center gap-2'>
              {logo?.filename ? (
                <StoryblokImage
                  storyblokImage={logo}
                  className='h-[60px] w-auto'
                  width={120}
                  height={60}
                />
              ) : (
                <HeadingLg as='span' className='font-semibold'>
                  ACME Industries
                </HeadingLg>
              )}
            </div>

            {/* Social Media Icons */}
            {socialLinks.length > 0 && (
              <div className='flex items-center gap-6 md:gap-3.5'>
                {socialLinks.map((social) => {
                  const innerContent = social.icon?.filename ? (
                    <StoryblokImage
                      storyblokImage={social.icon}
                      className='h-[26px] w-[26px] object-contain md:h-4 md:w-4'
                      width={26}
                      height={26}
                    />
                  ) : (
                    <span className='text-[10px] leading-none font-semibold uppercase'>
                      {social.name}
                    </span>
                  );

                  if (hasUsableLink(social.link)) {
                    return (
                      <StoryblokLink
                        key={social._uid}
                        link={social.link}
                        aria-label={social.name ?? 'Social link'}
                        className='flex items-center justify-center text-white transition-opacity hover:opacity-70'
                      >
                        {innerContent}
                      </StoryblokLink>
                    );
                  }

                  return (
                    <span
                      key={social._uid}
                      className='flex items-center justify-center text-white/70'
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
              <div className='py-3 md:hidden'>
                <Accordion.Root type='single' collapsible>
                  {linkColumns.map((column) => (
                    <Accordion.Item
                      key={column._uid}
                      value={column._uid}
                      className='border-b-0'
                    >
                      <Accordion.Header className='flex'>
                        <Accordion.Trigger
                          className={clsxm(
                            'group flex w-full items-center justify-between py-3',
                            'transition-opacity hover:opacity-70',
                          )}
                        >
                          <HeadingSm as='span'>{column.title}</HeadingSm>
                          <div className='flex h-8 w-8 items-center justify-center'>
                            <SvgIcon
                              name='ChevronDown'
                              className={clsxm(
                                'h-4 w-4 text-white transition-transform duration-200',
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
                          <ul className='space-y-3 pb-3'>
                            {column.links.map((link) => {
                              const label =
                                link.name?.trim() || 'Untitled link';
                              return (
                                <li key={link._uid}>
                                  {hasUsableLink(link.link) ? (
                                    <StoryblokLink
                                      link={link.link}
                                      className='transition-opacity hover:opacity-70'
                                    >
                                      <Text as='span'>{label}</Text>
                                    </StoryblokLink>
                                  ) : (
                                    <Text as='span' className='text-white/70'>
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
              <div className='hidden flex-col gap-8 sm:flex-row sm:gap-12 md:flex lg:gap-0 lg:space-x-0'>
                {linkColumns.map((column) => (
                  <div key={column._uid} className='min-w-[150px]'>
                    {column.title && (
                      <HeadingSm as='h3' className='mb-3 text-[20px]'>
                        {column.title}
                      </HeadingSm>
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
                                  className='transition-opacity hover:opacity-70'
                                >
                                  <Text as='span'>{label}</Text>
                                </StoryblokLink>
                              ) : (
                                <Text as='span' className='text-white/70'>
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
          <div className='flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-3 md:flex-row md:items-center md:gap-4 md:pt-4'>
            {legalLinks.length > 0 && (
              <ul className='flex flex-wrap gap-5 md:gap-3'>
                {legalLinks.map((link, idx) => {
                  const label = link.name?.trim() || 'Untitled link';
                  return (
                    <li key={link._uid} className='flex items-center'>
                      {idx > 0 && (
                        <span className='mr-5 text-white/30 md:mr-3'>|</span>
                      )}
                      {hasUsableLink(link.link) ? (
                        <StoryblokLink
                          link={link.link}
                          className='transition-opacity hover:opacity-70'
                        >
                          <Text as='span'>{label}</Text>
                        </StoryblokLink>
                      ) : (
                        <TextSm as='span' className='text-white/70'>
                          {label}
                        </TextSm>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
            {copyrightNotice && <TextSm as='p'>{copyrightNotice}</TextSm>}
          </div>
        )}
      </Container>
    </footer>
  );
}
