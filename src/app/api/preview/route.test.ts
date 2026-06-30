/** @jest-environment node */

import { NextRequest } from 'next/server';

import { GET } from './route';

const mockEnable = jest.fn();
const mockGetCookie = jest.fn();
const mockSetCookie = jest.fn();

jest.mock('next/headers', () => ({
  cookies: jest.fn(async () => ({
    get: mockGetCookie,
    set: mockSetCookie,
  })),
  draftMode: jest.fn(async () => ({
    enable: mockEnable,
  })),
}));

describe('preview route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCookie.mockReturnValue(undefined);
  });

  it('rejects requests with an invalid preview secret', async () => {
    const request = new NextRequest(
      'https://example.com/api/preview?slug=about&secret=invalid',
    );

    const response = await GET(request);

    expect(response.status).toBe(401);
    await expect(response.text()).resolves.toBe('Invalid token');
    expect(mockEnable).not.toHaveBeenCalled();
  });

  it('enables draft mode when the preview secret is valid', async () => {
    const request = new NextRequest(
      'https://example.com/api/preview?slug=about&secret=test-preview-secret',
    );

    const response = await GET(request);

    expect(mockEnable).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'https://example.com/about?slug=about',
    );
  });

  it('normalizes the default locale home preview to the site root', async () => {
    const request = new NextRequest(
      'https://example.com/api/preview?slug=home&secret=test-preview-secret',
    );

    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'https://example.com/?slug=home',
    );
  });

  it('normalizes a Storyblok German home switch to the localized root', async () => {
    const request = new NextRequest(
      'https://example.com/api/preview?slug=home&secret=test-preview-secret&_storyblok_lang=de',
    );

    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'https://example.com/de?slug=home&_storyblok_lang=de',
    );
  });

  it('normalizes slash-prefixed Storyblok slugs without double slashes', async () => {
    const request = new NextRequest(
      'https://example.com/api/preview?slug=/services&secret=test-preview-secret&_storyblok_lang=de',
    );

    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'https://example.com/de/services?slug=%2Fservices&_storyblok_lang=de',
    );
  });

  it('does not duplicate a locale prefix when Storyblok sends one', async () => {
    const request = new NextRequest(
      'https://example.com/api/preview?slug=de/services&secret=test-preview-secret&_storyblok_lang=de',
    );

    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'https://example.com/de/services?slug=de%2Fservices&_storyblok_lang=de',
    );
  });

  it('forwards the normalized locale when Storyblok sends an unsupported language', async () => {
    const request = new NextRequest(
      'https://example.com/api/preview?slug=about&secret=test-preview-secret&_storyblok_lang=fr',
    );

    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'https://example.com/about?slug=about&_storyblok_lang=en',
    );
  });
});
