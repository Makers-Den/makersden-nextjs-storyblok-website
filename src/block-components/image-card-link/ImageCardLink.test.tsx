import { render, screen } from '@testing-library/react';

import { type ImageCardLinkSbContent } from '@/lib/storyblok';

import { ImageCardLink } from './ImageCardLink';

jest.mock('@storyblok/react/rsc', () => ({
  storyblokEditable: (blok: { _uid: string }) => ({
    'data-storyblok-uid': blok._uid,
  }),
}));

jest.mock('@/components/images/StoryblokImage', () => ({
  StoryblokImage: ({ className }: { className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt='Card image' className={className} src='/card-image.jpg' />
  ),
}));

describe('ImageCardLink', () => {
  it('keeps URL Storyblok links clickable when wrapped in Card', () => {
    render(
      <ImageCardLink
        blok={
          {
            _uid: 'image-card-1',
            component: 'ImageCardLink',
            image: {
              id: 1,
              filename: 'https://a.storyblok.com/f/1/1200x800/card.jpg',
              alt: 'Card image',
            },
            link: {
              linktype: 'url',
              url: 'https://example.com/demo',
            },
            pillText: 'Demo',
          } as ImageCardLinkSbContent
        }
      />,
    );

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', 'https://example.com/demo');
    expect(link).toHaveAttribute('data-storyblok-uid', 'image-card-1');
    expect(screen.getByText('Demo')).toBeVisible();
  });
});
