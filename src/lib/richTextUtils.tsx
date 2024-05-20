/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type ReactNode, isValidElement } from 'react';
import {
  type RenderOptions,
  MARK_BOLD,
  MARK_STYLED,
  MARK_UNDERLINE,
  NODE_CODEBLOCK,
  NODE_HEADING,
  NODE_IMAGE,
  NODE_LI,
  NODE_OL,
  NODE_PARAGRAPH,
  NODE_QUOTE,
  NODE_UL,
  render,
} from 'storyblok-rich-text-react-renderer';
import 'server-only';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import {
  type Tag,
  type TypographyVariant,
  HeadingLg,
  HeadingMd,
  HeadingSm,
  HeadingXl,
  LightEmphasis,
  Text,
  TextLg,
  Typography,
} from '@/components/typography/Typography';

import clsxm from './clsxm';
import { getStringFromReactNode } from './getStringFromReactNode';
import { sentenceToId } from './sentenceToId';
import { type SbAsset, type SbRichtext } from './storyblok';

export type RichTextType = {
  type: string;
  content: {
    type: string;
    content: {
      text: string;
      type: string;
    }[];
  }[];
};

const convertChildrenWithPropsToString = (children: ReactNode): ReactNode => {
  if (Array.isArray(children)) {
    return children
      .map((nestedElement) => {
        if (Object.prototype.hasOwnProperty.call(nestedElement, 'props')) {
          return convertChildrenWithPropsToString(nestedElement.props.children);
        }
        return nestedElement;
      })
      .join('');
  } else if (
    isValidElement(children) &&
    Object.prototype.hasOwnProperty.call(children, 'props')
  ) {
    return convertChildrenWithPropsToString(children.props.children);
  }
  return children;
};

export const richTextToString = (richText: SbRichtext): string =>
  render(richText, {
    nodeResolvers: {
      //@ts-expect-error
      [NODE_HEADING]: (children) =>
        convertChildrenWithPropsToString(children) ?? '',
      //@ts-expect-error
      [NODE_CODEBLOCK]: (children) =>
        convertChildrenWithPropsToString(children) ?? '',
      //@ts-expect-error
      [NODE_IMAGE]: (children) =>
        convertChildrenWithPropsToString(children) ?? '',
      //@ts-expect-error
      [NODE_PARAGRAPH]: (children) =>
        convertChildrenWithPropsToString(children) ?? '',
      //@ts-expect-error
      [NODE_QUOTE]: (children) =>
        convertChildrenWithPropsToString(children) ?? '',
      //@ts-expect-error
      [NODE_OL]: (children) => convertChildrenWithPropsToString(children) ?? '',
      //@ts-expect-error
      [NODE_UL]: (children) => convertChildrenWithPropsToString(children) ?? '',
      //@ts-expect-error
      [NODE_LI]: (children) => convertChildrenWithPropsToString(children) ?? '',
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  })?.join(' ');

export const defaultRenderOptions: RenderOptions = {
  blokResolvers: {},
  markResolvers: {
    [MARK_BOLD]: (children) => (
      <strong className='text-grey-100 font-bold'>{children}</strong>
    ),
    [MARK_UNDERLINE]: (children) => (
      <u className=' text-primary-600'>{children}</u>
    ),
    [MARK_STYLED]: (children, { class: cls }) => {
      if (cls === 'subscript') {
        return <sub>{children}</sub>;
      }

      if (cls === 'superscript') {
        return <sup>{children}</sup>;
      }

      if (cls === 'lightEmphasis') {
        return <LightEmphasis>{children}</LightEmphasis>;
      }

      if (cls === 'highlightBox') {
        return (
          <span className='border-grey-400 bg-grey-200 text-grey-900 block rounded-sm border p-3 font-bold'>
            {children}
          </span>
        );
      }

      if (cls === 'markGreen') {
        return <span className='text-green inline-block'>{children}</span>;
      }

      if (cls === 'quoteRight') {
        return (
          <q className='mb-4 text-center text-3xl font-bold md:float-right md:-mr-20 md:ml-10 md:max-w-[45%] md:text-left'>
            {children}
          </q>
        );
      }

      if (cls === 'quote') {
        return (
          <q className='my-6 text-center text-3xl font-bold'>{children}</q>
        );
      }

      return <span className={cls}>{children}</span>;
    },
  },
  nodeResolvers: {
    [NODE_QUOTE]: (children) => (
      <blockquote className='border-gray mb-5 pl-4 italic text-black'>
        {children}
      </blockquote>
    ),
    [NODE_PARAGRAPH]: (children) => (
      <Text className='text-grey-200 my-7'>{children}</Text>
    ),
    [NODE_UL]: (children) => (
      <ul className='ml-[1rem] list-disc'>{children}</ul>
    ),
    [NODE_OL]: (children) => (
      <ol className='ml-[1rem] list-decimal font-normal'>{children}</ol>
    ),
    // Negative vertical margins is to counter the spacing from the paragraphs.
    // Storyblok Rich Text Editor always wraps the content in a paragraph which adds unnecessary spacing.
    [NODE_LI]: (children) => <li className='-my-1 ml-4'>{children}</li>,
    [NODE_HEADING]: (children, { level }) => {
      const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';

      if (tag === 'h1') {
        return <HeadingLg as='h1'>{children}</HeadingLg>;
      }

      if (tag === 'h2') {
        return (
          <HeadingMd
            as='h2'
            className='mb-6 mt-16 md:mt-20'
            id={sentenceToId(getStringFromReactNode(children) || '')}
          >
            {children}
          </HeadingMd>
        );
      }

      if (tag === 'h3') {
        return (
          <HeadingSm
            as='h3'
            className='mb-6 mt-10 md:mt-14'
            id={sentenceToId(getStringFromReactNode(children) || '')}
          >
            {children}
          </HeadingSm>
        );
      }

      if (tag === 'h4') {
        return (
          <HeadingSm
            as='h4'
            className='mb-6 mt-6'
            id={sentenceToId(getStringFromReactNode(children) || '')}
          >
            {children}
          </HeadingSm>
        );
      }

      return (
        <Typography variant='headingSm' as={tag} className='mb-4'>
          {children}
        </Typography>
      );
    },
    [NODE_IMAGE]: (children, { src }) => {
      // eslint-disable-next-line @next/next/no-img-element
      const image = {
        filename: src,
      } as SbAsset;
      return (
        <StoryblokImage
          className='m-7 mx-auto'
          storyblokImage={image}
          sizes='(min-width: 1460px) 57.375rem, (min-width: 768px) 66vw, 100vw'
        />
      );
    },
  },
};

type RenderOptionKey = keyof RenderOptions;

/**
 * Does a deep merge, allowing you to e.g. just override `nodeResolvers.NODE_PARAGRAPH`
 * without affecting the rest.
 */
const mergeInOverrides = (overrides: RenderOptions) => {
  const opts: RenderOptions = Object.keys(
    defaultRenderOptions
  ).reduce<RenderOptions>((acc: RenderOptions, key: string) => {
    return {
      ...acc,
      [key]: {
        ...defaultRenderOptions[key as RenderOptionKey],
        ...overrides[key as RenderOptionKey],
      },
    };
  }, {} as RenderOptions);

  return opts;
};

/**
 * Default rich text rendering function.
 * It'll use our default config, but allow you to override specific options with overrides.
 */
export const renderText = (text: SbRichtext, overrides: RenderOptions = {}) =>
  render(text, mergeInOverrides(overrides));

/** Renders paragraphs as large text */
export const renderTextLg = (text: SbRichtext) =>
  renderText(text, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <TextLg className='my-7'>{children}</TextLg>
      ),
    },
  });

/** Render paragraphs as visual huge headings, but still remain semantic paragraphs by default */
export const renderHeadingXl = (text: SbRichtext, tag: Tag = 'p') =>
  renderText(text, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <HeadingXl as={tag}>{children}</HeadingXl>
      ),
    },
  });

/** Render paragraphs as visual big headings, but still remain semantic paragraphs by default */
export const renderHeadingLg = (text: SbRichtext, tag: Tag = 'p') =>
  renderText(text, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <HeadingLg as={tag} className='my-0'>
          {children}
        </HeadingLg>
      ),
    },
  });

export const renderHeadingMd = (text: SbRichtext, tag: Tag = 'p') =>
  renderText(text, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <HeadingMd as={tag} className='my-0'>
          {children}
        </HeadingMd>
      ),
    },
  });

/** Renders paragraphs with the given options */
export const renderTextWithOptions = (
  text: SbRichtext,
  options?: {
    className?: string;
    variant?: TypographyVariant;
    useBalancer?: boolean;
  }
) => {
  const { className, variant = 'text', useBalancer } = options ?? {};
  return renderText(text, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <Typography
          useBalancer={useBalancer}
          className={clsxm('text-grey-200 my-2', className)}
          variant={variant}
        >
          {children}
        </Typography>
      ),
    },
  });
};

export const richtextToString = (richtext: SbRichtext) => {
  return (richtext as RichTextType).content
    .map((block) => {
      return block.content.map((inline) => inline.text).join('');
    })
    .join('\n');
};

export const checkIfPropertyExist = (entries: unknown, key: string) => {
  return Object.prototype.hasOwnProperty.call(entries, key);
};
