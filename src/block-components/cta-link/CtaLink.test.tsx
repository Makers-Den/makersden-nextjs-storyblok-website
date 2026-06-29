import { render, screen } from '@testing-library/react';
import { createElement } from 'react';

import { type CtaLinkSbContent } from '@/lib/storyblok';

import { CtaLink } from './CtaLink';

jest.mock('@storyblok/react/rsc', () => ({
  storyblokEditable: (blok: { _uid: string }) => ({
    'data-storyblok-uid': blok._uid,
  }),
}));

describe('CtaLink', () => {
  it('maps Storyblok CTA variants onto the themed ButtonLink', () => {
    render(
      createElement(CtaLink, {
        blok: {
          _uid: 'cta-1',
          component: 'CtaLink',
          name: 'Contact',
          type: 'outline',
          link: {
            linktype: 'story',
            story: { full_slug: 'contact' },
            cached_url: 'contact',
          },
        } as CtaLinkSbContent,
      }),
    );

    const link = screen.getByRole('link', { name: 'Contact' });

    expect(link).toHaveAttribute('href', '/contact');
    expect(link).toHaveAttribute('data-storyblok-uid', 'cta-1');
    expect(link).toHaveClass('rounded-full');
    expect(link).toHaveClass('text-brand-green');
  });

  it('does not render when the Storyblok link is missing', () => {
    const { container } = render(
      createElement(CtaLink, {
        blok: {
          _uid: 'cta-empty',
          component: 'CtaLink',
          name: 'Contact',
        } as CtaLinkSbContent,
      }),
    );

    expect(container).toBeEmptyDOMElement();
  });
});
