import React, { type CSSProperties } from 'react';
import Balancer from 'react-wrap-balancer';

import clsxm from '../../lib/clsxm';

import { type WithHighlighMetadata } from '@/types';

export type TypographyVariant =
  | 'textSm'
  | 'text'
  | 'textLg'
  | 'headingXl'
  | 'heading2Xl'
  | 'headingLg'
  | 'headingMd'
  | 'headingSm'
  | 'quotation'
  | 'tagText'
  | 'tagTextSm'
  | 'bold'
  | 'italic'
  | 'lightEmphasis'
  | 'darkEmphasis';

export type Tag =
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'div'
  | 'section'
  | 'strong'
  | 'ul'
  | 'ol'
  | 'li'
  | 'figText'
  | 'b'
  | 'em';
export interface TypographyProps {
  variant?: TypographyVariant;
  as?: Tag;
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: CSSProperties | undefined;
  useBalancer?: boolean;
}

export const variantToClasses: Record<TypographyVariant, string[]> = {
  textSm: [
    'text-xs',
    'leading-[1.25] md:leading-[2.08]',
    'text-current',
    'font-primary',
  ],
  text: [
    'text-sm md:text-base',
    'leading-[1.43] md:leading-[1.56]',
    'font-primary',
  ],
  textLg: [
    'text-base md:text-lg',
    'leading-[1.38] md:leading-[1.44]',
    'font-primary',
  ],
  heading2Xl: [
    'text-current',
    'font-display',
    'font-black',
    'uppercase',
    'antialiased',
    'text-[clamp(3.125rem,6.5vw,5.75rem)]',
    'leading-[1.09] md:leading-[1]',
    'break-words',
    'whitespace-pre-line',
    'tracking-wide',
  ],
  headingXl: [
    'text-current',
    'font-display',
    'font-black',
    'text-superWhite',
    'uppercase',
    'antialiased',
    'text-[clamp(3.125rem,6.5vw,5.75rem)]',
    'leading-[1.09] md:leading-[1]',
    'break-words',
    'whitespace-pre-line',
    'tracking-wide',
  ],
  headingLg: [
    'antialiased',
    'font-extrabold',
    'text-current',
    'font-display',
    'text-[clamp(2.25rem,4.18vw,4.375rem)]',
    'tracking-[0.01em]',
    'leading-[1.09] md:leading-[1]',
    'break-words',
  ],
  headingMd: [
    'antialiased',
    'font-extrabold',
    'text-current',
    'font-display',
    'text-[clamp(2rem,2.39vw,2.5rem)]',
    'tracking-[0.01em]',
    'leading-[1] md:leading-[1.03]',
    'break-words',
  ],
  headingSm: [
    'antialiased',
    'font-bold',
    'text-current',
    'font-display',
    'text-[clamp(1.25rem,2vw,1.875rem)]',
    'tracking-[0.01em]',
    'leading-[1.20] md:leading-[1.10]',
    'break-words',
  ],
  tagText: [
    'text-sm',
    'md:text-base',
    'font-normal',
    'text-current',
    'font-tag',
    'leading-[1.14] md:leading-[1]',
  ],
  tagTextSm: [
    'text-xs',
    'md:text-sm',
    'font-light',
    'text-current',
    'font-tag',
    'leading-[1.14] md:leading-[1]',
  ],
  quotation: ['text-xl', 'font-normal', 'leading-[1.5] italic'],
  bold: ['font-semibold', 'not-italic'],
  italic: ['px-1', 'italic'],
  lightEmphasis: ['font-primary', 'not-italic', 'text-green-400'],
  darkEmphasis: ['bg-dullViolet', 'not-italic', 'text-white', 'font-semibold'],
};
/**
 * Simple typography component
 */
export const Typography = ({
  variant = 'text',
  as = 'p',
  className,
  children,
  useBalancer = false,
  ...rest
}: TypographyProps) =>
  React.createElement(
    as,
    {
      className: clsxm(variantToClasses[variant], className),
      ...rest,
    },
    useBalancer ? <Balancer>{children}</Balancer> : children,
  );

export type TypographyPropsWithoutVariant = Omit<TypographyProps, 'variant'> &
  WithHighlighMetadata['__highlightMetadata'];

// * Body Text

export const TextSm = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='textSm' as='p' {...props} />
);

/** Equivalent to "Paragraph" in Design System */
export const Text = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='text' as='p' {...props} />
);

export const TextLg = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='textLg' as='p' {...props} />
);

// * Headings

export const HeadingSm = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='headingSm' as='h4' {...props} />
);

export const HeadingMd = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='headingMd' as='h3' {...props} />
);

export const HeadingLg = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='headingLg' as='h2' {...props} />
);

/** There should only be one instance of an HugeHeading (H1) tag on the page.
 *  Used in Hero block and on Blog Post pages and Contact (as H2).
 */
export const HeadingXl = (props: TypographyPropsWithoutVariant) => {
  return <Typography variant='headingXl' as='h1' {...props} />;
};

/** There should only be one instance of an HugeHeading (H1) tag on the page.
 *  Used in Hero block and on Blog Post pages and Contact (as H2).
 */
export const Heading2Xl = (props: TypographyPropsWithoutVariant) => {
  return <Typography variant='headingXl' as='h1' {...props} />;
};
// *

// * Others

export const Bold = ({
  as = 'b',
  variant = 'bold',
  className,
  children,
  ...rest
}: TypographyProps) =>
  React.createElement(
    as,
    { className: clsxm(variantToClasses[variant], className), ...rest },
    children,
  );

/** Used in Richtext */
export const LightEmphasis = ({
  as = 'em',
  variant = 'lightEmphasis',
  className,
  children,
  ...rest
}: TypographyProps) =>
  React.createElement(
    as,
    { className: clsxm(variantToClasses[variant], className), ...rest },
    children,
  );

export const Italic = ({
  as = 'em',
  variant = 'italic',
  className,
  children,
  ...rest
}: TypographyProps) =>
  React.createElement(
    as,
    { className: clsxm(variantToClasses[variant], className), ...rest },
    children,
  );

export const Quotation = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='quotation' as='p' {...props} />
);

export const TagTextSm = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='tagTextSm' as='p' {...props} />
);

export const TagText = (props: TypographyPropsWithoutVariant) => (
  <Typography variant='tagText' as='p' {...props} />
);
