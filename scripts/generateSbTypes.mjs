/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import dotenv from 'dotenv';
import storyblokToTypescript from '../scripts-dist/storyblokToTypescript.mjs';
import fs from 'node:fs';

dotenv.config();

if (!process.env.STORYBLOK_SPACE_ID) {
  console.error(
    'STORYBLOK_SPACE_ID env var is not set. Set it via e.g. .env file',
  );
  process.exit(-1);
}

const __dirname = new URL('.', import.meta.url).pathname;
const componentsJson = fs.readFileSync(
  __dirname +
    `/../storyblok-components/components/${process.env.STORYBLOK_SPACE_ID}/components.json`,
  'utf-8',
); // pull components with storyblok

const componentsJsonArr = JSON.parse(componentsJson);

storyblokToTypescript({
  // required
  componentsJson: {
    components: componentsJsonArr,
  },
  // required
  path: __dirname + '/../src/lib/storyblok/blockLibraryTypes.ts', // make sure path exists
  // optional type prefix (default: none)
  titlePrefix: '',
  // optional type name suffix (default: [Name]_Storyblok)
  titleSuffix: '_sb_content',
  // optional compilerOptions which get passed through to json-schema-to-typescript
  compilerOptions: {
    unknownAny: false,
    bannerComment: '',
    unreachableDefinitions: true,
    additionalProperties: false,
  },
  // optional function for custom types (key, obj) => {}
  // customTypeParser: exampleCustomParser,
});
