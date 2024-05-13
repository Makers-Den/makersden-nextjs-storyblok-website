/* eslint-disable @typescript-eslint/ban-ts-comment */
import { isValidElement, ReactNode } from 'react';
import {
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
  RenderOptions,
} from 'storyblok-rich-text-react-renderer';
import 'server-only';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import {
  BigHeading,
  HugeHeading,
  LargeText,
  LightEmphasis,
  MediumHeading,
  SmallHeading,
  Tag,
  Text,
  Typography,
  TypographyVariant,
} from '@/components/typography/Typography';

import clsxm from './clsxm';
import { getStringFromReactNode } from './getStringFromReactNode';
import { sentenceToId } from './sentenceToId';
import { SbAsset, SbRichtext } from './storyblok';

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
        convertChildrenWithPropsToString(children) || '',
      //@ts-expect-error
      [NODE_CODEBLOCK]: (children) =>
        convertChildrenWithPropsToString(children) || '',
      //@ts-expect-error
      [NODE_IMAGE]: (children) =>
        convertChildrenWithPropsToString(children) || '',
      //@ts-expect-error
      [NODE_PARAGRAPH]: (children) =>
        convertChildrenWithPropsToString(children) || '',
      //@ts-expect-error
      [NODE_QUOTE]: (children) =>
        convertChildrenWithPropsToString(children) || '',
      //@ts-expect-error
      [NODE_OL]: (children) => convertChildrenWithPropsToString(children) || '',
      //@ts-expect-error
      [NODE_UL]: (children) => convertChildrenWithPropsToString(children) || '',
      //@ts-expect-error
      [NODE_LI]: (children) => convertChildrenWithPropsToString(children) || '',
    },
  })?.join(' ');

export const defaultRenderOptions: RenderOptions = {
  blokResolvers: {},
  markResolvers: {
    [MARK_BOLD]: (children) => (
      <strong className='font-bold text-grey-100'>{children}</strong>
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
          <span className='block rounded-sm border border-grey-400 bg-grey-200 p-3 font-bold text-grey-900'>
            {children}
          </span>
        );
      }

      if (cls === 'markGreen') {
        return <span className='inline-block text-green'>{children}</span>;
      }

      if (cls === 'quoteRight') {
        return (
          <q className='mb-4 text-center text-3xl font-bold md:float-right md:ml-10 md:-mr-20 md:max-w-[45%] md:text-left'>
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
      <Text className='my-7 text-grey-200'>{children}</Text>
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
        return <BigHeading as='h1'>{children}</BigHeading>;
      }

      if (tag === 'h2') {
        return (
          <MediumHeading
            as='h2'
            className='mb-6 mt-16 md:mt-20'
            id={sentenceToId(getStringFromReactNode(children) || '')}
          >
            {children}
          </MediumHeading>
        );
      }

      if (tag === 'h3') {
        return (
          <SmallHeading
            as='h3'
            className='mb-6 mt-10 md:mt-14'
            id={sentenceToId(getStringFromReactNode(children) || '')}
          >
            {children}
          </SmallHeading>
        );
      }

      if (tag === 'h4') {
        return (
          <SmallHeading
            as='h4'
            className='mb-6 mt-6'
            id={sentenceToId(getStringFromReactNode(children) || '')}
          >
            {children}
          </SmallHeading>
        );
      }

      return (
        <Typography variant='smallHeading' as={tag} className='mb-4'>
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
export const renderTextLarge = (text: SbRichtext) =>
  renderText(text, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <LargeText className='my-7'>{children}</LargeText>
      ),
    },
  });

/** Render paragraphs as visual huge headings, but still remain semantic paragraphs by default */
export const renderHugeHeading = (text: SbRichtext, tag: Tag = 'p') =>
  renderText(text, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <HugeHeading as={tag}>{children}</HugeHeading>
      ),
    },
  });

/** Render paragraphs as visual big headings, but still remain semantic paragraphs by default */
export const renderBigHeading = (text: SbRichtext, tag: Tag = 'p') =>
  renderText(text, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <BigHeading as={tag} className='my-0'>
          {children}
        </BigHeading>
      ),
    },
  });

export const renderMediumHeading = (text: SbRichtext, tag: Tag = 'p') =>
  renderText(text, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <MediumHeading as={tag} className='my-0'>
          {children}
        </MediumHeading>
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
  const { className, variant = 'text', useBalancer } = options || {};
  return renderText(text, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <Typography
          useBalancer={useBalancer}
          className={clsxm('my-2 text-grey-200', className)}
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
