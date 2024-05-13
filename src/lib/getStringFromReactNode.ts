// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { ReactNode } from 'react';

export const getStringFromReactNode = (element: ReactNode): string => {
  const retriveNestedString = (item) => {
    while (typeof item !== 'string') {
      item = item?.props.children ?? '';
      if (typeof item === 'string') {
        return item;
      }
    }
  };

  return element
    ?.map((item) =>
      typeof item === 'string' ? item : retriveNestedString(item)
    )
    .join('');
};
