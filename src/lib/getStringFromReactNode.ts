import { type ReactNode } from 'react';

/* eslint-disable */
export const getStringFromReactNode = (element: ReactNode): string => {
  const retrieveNestedString = (
    item: { props: { children: string } } | string,
  ) => {
    while (typeof item !== 'string') {
      item = item?.props.children ?? '';
      if (typeof item === 'string') {
        return item;
      }
    }
  };

  if (Array.isArray(element)) {
    return element
      .map((item: any) =>
        typeof item === 'string' ? item : retrieveNestedString(item),
      )
      .join('');
  }

  return '';
};
