'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import clsxm from '@/lib/clsxm';
import { type LinkSbContent, type NavSectionSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';
import { MakersDenFullLogo } from '@/components/icons/MakersDenFullLogo';
import { SvgIcon } from '@/components/icons/SvgIcon';
import LocaleSwitcher from '@/components/local-switcher/LocaleSwitcher';
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';
import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/button-link';

import { NavSection } from '@/block-components/nav-section/NavSection';
import { type Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { buildLocalizedPath } from '@/i18n/paths';

import { MobileNav } from './MobileNav';

const MAKERS_DEN_CONTACT_URL = 'https://makersden.io/contact';

// Type guards
function isLink(
  item: LinkSbContent | NavSectionSbContent,
): item is LinkSbContent {
  return item.component === 'Link';
}

function isNavSection(
  item: LinkSbContent | NavSectionSbContent,
): item is NavSectionSbContent {
  return item.component === 'NavSection';
}

export function Header({
  navItems,
  locale,
  availableLocales,
  layoutType,
  navType,
}: {
  navItems: (LinkSbContent | NavSectionSbContent)[];
  locale: Locale;
  availableLocales: readonly Locale[];
  layoutType: 'default' | 'leadPage';
  navType: 'white' | 'black' | 'transparent';
}) {
  const t = useTranslations('navigation');
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const originalHeaderRef = useRef<HTMLHeadingElement>(null);

  // Track original header height for CSS variable
  useEffect(() => {
    const setHeaderHeightCssVar = () => {
      if (originalHeaderRef.current) {
        document.documentElement.style.setProperty(
          '--nav-h',
          `${originalHeaderRef.current.offsetHeight}px`,
        );
      }
    };
    setHeaderHeightCssVar();
    window.addEventListener('resize', setHeaderHeightCssVar);
    return () => window.removeEventListener('resize', setHeaderHeightCssVar);
  }, []);

  // Detect when original header leaves viewport
  useEffect(() => {
    if (!originalHeaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky header when original is not visible
        setShowStickyHeader(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(originalHeaderRef.current);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const navClass =
    navType === 'transparent'
      ? 'bg-transparent'
      : navType === 'black'
        ? 'bg-brand-navy'
        : 'bg-brand-navy';

  return (
    <>
      {/* Original Header - Full size, scrolls naturally */}
      <header
        ref={originalHeaderRef}
        className={clsxm('z-40', navClass, 'py-3 md:py-5')}
      >
        <Container className='flex w-full items-center justify-between'>
          {/* Left: Logo */}
          <Link
            className='flex shrink-0 items-center text-white'
            href={buildLocalizedPath('home', locale)}
            aria-label={t('homeLabel')}
          >
            <MakersDenFullLogo className='h-5 w-[136px] md:h-6 md:w-[164px]' />
          </Link>

          {/* Center: Navigation Items */}
          {layoutType === 'default' && (
            <nav className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-white lg:flex'>
              {navItems.map((item) => {
                if (isLink(item)) {
                  return (
                    <StoryblokLink
                      className='hover:text-brand-green px-2 py-1 text-base font-normal text-inherit transition-colors'
                      link={item.link}
                      locale={locale}
                      key={item._uid}
                    >
                      {item.name}
                    </StoryblokLink>
                  );
                }

                if (isNavSection(item)) {
                  return (
                    <NavSection
                      key={item._uid}
                      blok={item}
                      locale={locale}
                      textColor='white'
                    />
                  );
                }

                return null;
              })}
            </nav>
          )}

          {/* Right: CTA Button + Mobile Menu */}
          <div className='flex items-center gap-4'>
            {layoutType === 'default' && (
              <LocaleSwitcher
                locale={locale}
                availableLocales={availableLocales}
                className='hidden lg:inline-flex'
              />
            )}

            {layoutType === 'default' && (
              <ButtonLink
                href={MAKERS_DEN_CONTACT_URL}
                size='pill'
                className='hidden lg:inline-flex'
              >
                {t('talkToMakersDen')}
              </ButtonLink>
            )}

            {/* Mobile Menu Button */}
            {layoutType === 'default' && (
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsMenuOpen(true)}
                className='lg:hidden'
                aria-label={t('openMenu')}
              >
                <SvgIcon name='Menu' className='h-6 w-6 text-white' />
              </Button>
            )}
          </div>
        </Container>
      </header>

      {/* Sticky Header - Compact, slides down when original is out of view */}
      <header
        className={clsxm(
          'fixed top-0 right-0 left-0 z-50',
          'bg-brand-navy text-white',
          'py-3 md:py-4',
          'transition-transform',
          showStickyHeader ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <Container className='flex w-full items-center justify-between'>
          {/* Left: Logo */}
          <Link
            className='flex shrink-0 items-center text-white'
            href={buildLocalizedPath('home', locale)}
            aria-label={t('homeLabel')}
          >
            <MakersDenFullLogo className='h-5 w-[136px] md:h-6 md:w-[164px]' />
          </Link>

          {/* Center: Navigation Items */}
          {layoutType === 'default' && (
            <nav className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-white lg:flex'>
              {navItems.map((item) => {
                if (isLink(item)) {
                  return (
                    <StoryblokLink
                      className='hover:text-brand-green px-2 py-1 text-base font-normal text-inherit transition-colors'
                      link={item.link}
                      locale={locale}
                      key={item._uid}
                    >
                      {item.name}
                    </StoryblokLink>
                  );
                }

                if (isNavSection(item)) {
                  return (
                    <NavSection
                      key={item._uid}
                      blok={item}
                      locale={locale}
                      textColor='white'
                    />
                  );
                }

                return null;
              })}
            </nav>
          )}

          {/* Right: CTA Button + Mobile Menu */}
          <div className='flex items-center gap-4'>
            {layoutType === 'default' && (
              <LocaleSwitcher
                locale={locale}
                availableLocales={availableLocales}
                className='hidden lg:inline-flex'
              />
            )}

            {layoutType === 'default' && (
              <ButtonLink
                href={MAKERS_DEN_CONTACT_URL}
                size='pill'
                className='hidden lg:inline-flex'
              >
                {t('talkToMakersDen')}
              </ButtonLink>
            )}

            {/* Mobile Menu Button */}
            {layoutType === 'default' && (
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsMenuOpen(true)}
                className='lg:hidden'
                aria-label={t('openMenu')}
              >
                <SvgIcon name='Menu' className='h-6 w-6 text-white' />
              </Button>
            )}
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className='bg-brand-navy fixed inset-0 z-60 lg:hidden'>
          <MobileNav
            navItems={navItems}
            locale={locale}
            availableLocales={availableLocales}
            onClose={() => setIsMenuOpen(false)}
            onLinkClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
