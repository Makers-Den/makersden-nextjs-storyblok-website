import React, { type SVGProps } from 'react';

export const LinkArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M1 1L17 17M17 17V4.04762M17 17H4.04762' stroke='#6DDA84' />
    </svg>
  );
};
