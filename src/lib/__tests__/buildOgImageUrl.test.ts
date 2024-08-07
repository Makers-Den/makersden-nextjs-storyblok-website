import { buildOgImageUrl } from '@/lib/buildOgImageUrl';

jest.mock('@/lib/constants', () => ({
  isDevelopment: false,
}));
describe('Open Graph function should work correctly', () => {
  const imageLink =
    'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/290814_2200-732x549.jpg';

  it('should return "default-og" image as there is no title provided', () => {
    const result = buildOgImageUrl({
      illustration: imageLink,
    });
    expect(result).toContain('default-og');
  });

  it('should return provided image as the image was provided', () => {
    const result = buildOgImageUrl({
      title: 'Mobile Application Development',
      image: imageLink,
    });
    expect(result).toContain(imageLink);
  });

  it('should return "og" image as there is no provided image', () => {
    const result = buildOgImageUrl({
      title: 'Mobile Application Development',
      illustration: imageLink,
    });
    expect(result).toContain('og?title=Mobile%20Application%20Development');
  });
});
