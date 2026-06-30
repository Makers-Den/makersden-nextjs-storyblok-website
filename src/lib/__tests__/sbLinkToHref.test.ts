import { type SbMultilink } from '../storyblok/sbInternalTypes';
import {
  sbLinkToButtonLinkProps,
  sbLinkToHref,
} from '../storyblok/sbLinkToHref';

describe('sbLinkToHref', () => {
  test.each([
    {
      input: {
        linktype: 'url',
        url: 'https://example.com/test#anchor',
      } as SbMultilink,
      expectedOutput: 'https://example.com/test#anchor',
    },
    {
      input: {
        linktype: 'story',
        story: {
          full_slug: 'home',
        },
        cached_url: 'https://example.com',
      } as SbMultilink,
      expectedOutput: '/',
    },
    {
      input: {
        linktype: 'story',
        cached_url: 'en/about',
      } as SbMultilink,
      expectedOutput: '/about',
    },
    {
      input: {
        linktype: 'asset',
        url: 'https://a.storyblok.com/example_asset.svg',
        cached_url: 'https://example.com',
      } as SbMultilink,
      expectedOutput: 'https://a.storyblok.com/example_asset.svg',
    },
    {
      input: {
        linktype: 'email',
        email: 'test@test.com',
      } as SbMultilink,
      expectedOutput: 'mailto:test@test.com',
    },
  ])(
    'should convert a valid SbMultilink to href',
    ({ input, expectedOutput }) => {
      expect(sbLinkToHref(input)).toBe(expectedOutput);
    },
  );

  it('should return # for an invalid story link', () => {
    const input: SbMultilink = {
      linktype: 'story',
      url: '',
      cached_url: '',
    };
    expect(sbLinkToHref(input)).toEqual('#');
  });

  it('should prefix internal story links for German', () => {
    const input: SbMultilink = {
      linktype: 'story',
      cached_url: 'about/team',
    };

    expect(sbLinkToHref(input, 'de')).toEqual('/de/about/team');
  });

  it('should pass locale through button link props for story links', () => {
    const input: SbMultilink = {
      linktype: 'story',
      cached_url: 'about/team',
    };

    expect(sbLinkToButtonLinkProps(input, 'Team', 'de')).toMatchObject({
      href: '/de/about/team',
      children: 'Team',
    });
  });

  it('should handle undefined input', () => {
    const input: SbMultilink | undefined = undefined;
    expect(sbLinkToHref(input)).toEqual('');
  });

  it('should handle empty fields in SbMultilink', () => {
    const input: SbMultilink = {
      linktype: '',
      url: '',
      cached_url: '',
    };
    expect(sbLinkToHref(input)).toEqual('#');
  });
});
