'use client';

import { useEffect, useRef, useState } from 'react';

import clsxm from '@/lib/clsxm';
import { type LinkSbContent, type NavSectionSbContent } from '@/lib/storyblok';

import { ButtonLink } from '@/components/button';
import { Container } from '@/components/container/Container';
import { SvgIcon } from '@/components/icons/SvgIcon';
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';

import { NavSection } from '@/block-components/nav-section/NavSection';
import { type Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';

import { MobileNav } from './MobileNav';

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
  locale: _locale,
  layoutType,
  navType,
}: {
  navItems: (LinkSbContent | NavSectionSbContent)[];
  locale: Locale;
  layoutType: 'default' | 'leadPage';
  navType: 'white' | 'black' | 'transparent';
}) {
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

  const isTextWhite = navType === 'black';

  return (
    <>
      {/* Original Header - Full size, scrolls naturally */}
      <header
        ref={originalHeaderRef}
        className={clsxm(
          'z-40',
          navType === 'transparent' && 'bg-transparent',
          navType === 'black' && 'bg-black',
          navType === 'white' && 'bg-background',
          'py-3 md:py-5',
        )}
      >
        <Container className='flex w-full items-center justify-between'>
          {/* Left: Logo */}
          <Link
            className={clsxm(
              'flex shrink-0 items-center gap-2',
              isTextWhite ? 'text-white' : 'text-black',
            )}
            href='/'
          >
            <div
              className={clsxm(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold',
                isTextWhite ? 'bg-white text-black' : 'bg-black text-white',
              )}
            >
              <span className='text-lg'>L</span>
            </div>
            <span className='text-xl font-semibold'>ACME</span>
          </Link>

          {/* Center: Navigation Items */}
          {layoutType === 'default' && (
            <nav
              className={clsxm(
                'absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex',
                isTextWhite ? 'text-white' : 'text-black',
              )}
            >
              {navItems.map((item) => {
                if (isLink(item)) {
                  return (
                    <StoryblokLink
                      className='px-2 py-1 text-base font-normal text-inherit transition-colors hover:opacity-70'
                      link={item.link}
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
                      textColor={isTextWhite ? 'white' : 'black'}
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
              <ButtonLink
                href='/'
                size='pill'
                className='hidden lg:inline-flex'
              >
                Get Started
              </ButtonLink>
            )}

            {/* Mobile Menu Button */}
            {layoutType === 'default' && (
              <button
                onClick={() => setIsMenuOpen(true)}
                className='p-2 lg:hidden'
                aria-label='Open menu'
              >
                <SvgIcon
                  name='Menu'
                  className={clsxm(
                    'h-6 w-6',
                    isTextWhite ? 'text-white' : 'text-black',
                  )}
                />
              </button>
            )}
          </div>
        </Container>
      </header>

      {/* Sticky Header - Compact, slides down when original is out of view */}
      <header
        className={clsxm(
          'fixed top-0 right-0 left-0 z-50',
          'bg-background shadow-[0px_1.2px_6.66px_0px_rgba(0,0,0,0.1)]',
          'py-3 md:py-4',
          'transition-transform duration-300',
          showStickyHeader ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <Container className='flex w-full items-center justify-between'>
          {/* Left: Logo */}
          <Link
            className='flex shrink-0 items-center gap-2 text-black'
            href='/'
          >
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black font-bold text-white'>
              <span className='text-lg'>L</span>
            </div>
            <span className='text-xl font-semibold'>ACME</span>
          </Link>

          {/* Center: Navigation Items */}
          {layoutType === 'default' && (
            <nav className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-black lg:flex'>
              {navItems.map((item) => {
                if (isLink(item)) {
                  return (
                    <StoryblokLink
                      className='px-2 py-1 text-base font-normal text-inherit transition-colors hover:opacity-70'
                      link={item.link}
                      key={item._uid}
                    >
                      {item.name}
                    </StoryblokLink>
                  );
                }

                if (isNavSection(item)) {
                  return (
                    <NavSection key={item._uid} blok={item} textColor='black' />
                  );
                }

                return null;
              })}
            </nav>
          )}

          {/* Right: CTA Button + Mobile Menu */}
          <div className='flex items-center gap-4'>
            {layoutType === 'default' && (
              <ButtonLink
                href='/'
                size='pill'
                className='hidden lg:inline-flex'
              >
                Get Started
              </ButtonLink>
            )}

            {/* Mobile Menu Button */}
            {layoutType === 'default' && (
              <button
                onClick={() => setIsMenuOpen(true)}
                className='p-2 lg:hidden'
                aria-label='Open menu'
              >
                <SvgIcon name='Menu' className='h-6 w-6 text-black' />
              </button>
            )}
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className='fixed inset-0 z-60 bg-white md:hidden'>
          <MobileNav
            navItems={navItems}
            onClose={() => setIsMenuOpen(false)}
            onLinkClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
