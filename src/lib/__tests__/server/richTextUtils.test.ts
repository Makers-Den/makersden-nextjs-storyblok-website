import { NODE_PARAGRAPH } from 'storyblok-rich-text-react-renderer';

import {
  convertSbRichTextToInlineString,
  richTextToString,
} from '@/lib/richTextUtils';
import { type SbRichtext } from '@/lib/storyblok';

jest.mock('server-only', () => ({}));
describe('convertSbRichTextToInlineString', () => {
  it('should convert a valid SbRichtext to an inline string', () => {
    const richtext: SbRichtext = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Hello' },
            { type: 'text', text: ' ' },
            { type: 'text', text: 'World' },
          ],
        },
      ],
    };
    const expectedOutput = 'Hello World';
    expect(convertSbRichTextToInlineString(richtext)).toBe(expectedOutput);
  });

  it('should return an empty string for an empty SbRichtext', () => {
    const richtext: SbRichtext = {
      type: 'doc',
      content: [],
    };
    const expectedOutput = '';
    expect(convertSbRichTextToInlineString(richtext)).toBe(expectedOutput);
  });

  it('should return an empty string for SbRichtext with no content', () => {
    const richtext: SbRichtext = {
      type: 'doc',
    };
    const expectedOutput = '';
    expect(convertSbRichTextToInlineString(richtext)).toBe(expectedOutput);
  });
});

describe('richTextToString', () => {
  it('should convert a valid SbRichtext to a string', () => {
    const richText: SbRichtext = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          content: [
            { type: 'text', text: 'Heading TEST <span>children</span>' },
          ],
        },
        {
          type: NODE_PARAGRAPH,
          content: [{ type: 'text', text: 'Paragraph' }],
        },
      ],
    };
    const expectedOutput = 'Heading TEST <span>children</span> Paragraph';
    expect(richTextToString(richText)).toBe(expectedOutput);
  });

  it('should return an empty string for an empty SbRichtext', () => {
    const richText: SbRichtext = {
      type: 'doc',
      content: [
        {
          type: NODE_PARAGRAPH,
          content: [],
        },
      ],
    };
    const expectedOutput = '';
    expect(richTextToString(richText)).toBe(expectedOutput);
  });
});
