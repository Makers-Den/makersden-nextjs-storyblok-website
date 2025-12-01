'use client';

import { useEffect, useRef, useState } from 'react';

import clsxm from '@/lib/clsxm';
import { type LinkSbContent, type NavSectionSbContent } from '@/lib/storyblok';

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

  const isTextWhite = navType !== 'white';
  const isTextDark = navType === 'white';

  return (
    <>
      {/* Original Header - Full size, scrolls naturally */}
      <header
        ref={originalHeaderRef}
        className={clsxm(
          'z-40',
          navType === 'transparent' && 'bg-transparent',
          navType === 'black' && 'bg-black',
          navType === 'white' && 'bg-white',
          'py-2 md:py-12',
        )}
      >
        <Container className='flex w-full items-center justify-between'>
          {/* Logo and Navigation Container */}
          <div className='flex flex-1 items-center justify-between'>
            {/* Logo */}
            <Link
              className={clsxm(
                'flex shrink-0 items-center gap-3',
                isTextWhite ? 'text-white' : 'text-black',
              )}
              href='/'
            >
              {/* TODO: Replace with your logo component or image */}
              <div
                className={clsxm(
                  'flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-lg font-bold md:h-[80px] md:w-[80px]',
                  isTextWhite ? 'bg-white text-black' : 'bg-black text-white',
                )}
              >
                <span className='text-[24px] md:text-[32px]'>L</span>
              </div>
              <span className='color-inherit text-[32px] leading-normal font-semibold whitespace-nowrap'>
                ACME
              </span>
            </Link>

            {/* Navigation Items */}
            {layoutType === 'default' && (
              <nav
                className={clsxm(
                  'hidden flex-1 items-center justify-end lg:flex lg:gap-[18px]',
                  isTextWhite && 'text-white',
                  isTextDark && 'text-black',
                )}
              >
                {navItems.map((item) => {
                  if (isLink(item)) {
                    return (
                      <StoryblokLink
                        className='rounded-lg px-5 py-4 text-[20px] leading-normal font-medium text-inherit transition-colors hover:bg-gray-100 hover:text-black'
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
          </div>

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
                  'h-8 w-8',
                  isTextWhite ? 'text-white' : 'text-black',
                )}
              />
            </button>
          )}
        </Container>
      </header>

      {/* Sticky Header - Compact, slides down when original is out of view */}
      <header
        className={clsxm(
          'fixed top-0 right-0 left-0 z-50',
          'bg-white shadow-[0px_1.2px_6.66px_0px_rgba(0,0,0,0.2)]',
          'py-2 md:py-4',
          'transition-transform duration-300',
          showStickyHeader ? 'translate-y-0' : 'translate-y-[-100%]',
        )}
      >
        <Container className='flex w-full items-center justify-between'>
          {/* Logo and Navigation Container */}
          <div className='flex flex-1 items-center'>
            {/* Logo */}
            <Link className='flex shrink-0 items-center gap-2' href='/'>
              {/* TODO: Replace with your logo component or image */}
              <div className='flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-lg bg-black font-bold text-white md:h-[80px] md:w-[80px]'>
                <span className='text-[24px] md:text-[32px]'>L</span>
              </div>
              <span className='text-[32px] leading-normal font-semibold whitespace-nowrap text-black'>
                ACME
              </span>
            </Link>

            {/* Navigation Items */}
            {layoutType === 'default' && (
              <nav className='hidden flex-1 items-center justify-end gap-3 text-black lg:flex'>
                {navItems.map((item) => {
                  if (isLink(item)) {
                    return (
                      <StoryblokLink
                        className='rounded-lg px-5 py-4 text-[20px] leading-normal font-medium text-inherit transition-colors hover:bg-gray-100 hover:text-black'
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
                        textColor='black'
                      />
                    );
                  }

                  return null;
                })}
              </nav>
            )}
          </div>

          {/* Mobile Menu Button */}
          {layoutType === 'default' && (
            <button
              onClick={() => setIsMenuOpen(true)}
              className='p-2 lg:hidden'
              aria-label='Open menu'
            >
              <SvgIcon name='Menu' className={clsxm('h-8 w-8', 'text-black')} />
            </button>
          )}
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className='fixed inset-0 z-[60] bg-white md:hidden'>
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
