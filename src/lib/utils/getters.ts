export const getNumberFromCSSValue = (str: string) => {
  const chars = str
    .split('')
    .filter((char) => /\d/.test(char) || char === '.')
    .join('');

  return parseInt(chars);
};

export const getDimensionsFromStoryblokAssetFilename = (filename: string) => ({
  width: parseFloat(filename?.split('/')[5]?.split('x')[0] || ''),
  height: parseFloat(filename?.split('/')[5]?.split('x')[1] || ''),
});

export const getFirstItemFromArray = <T>(arr: T[]): T | null =>
  arr.at(0) || null;

export const getHrefFromFullSlug = (fullSlug: string) => '/' + fullSlug;

interface PathsObject {
  [key: string]: string;
}

export const getBreadcrumbNameFromBlogOverviewPaths = (obj: PathsObject) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [
        key,
        value
          ?.split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      ];
    })
  );
};

export const getTwoDigitsNumber = (num: number) => {
  return num < 10 ? `0${num}` : num;
};
