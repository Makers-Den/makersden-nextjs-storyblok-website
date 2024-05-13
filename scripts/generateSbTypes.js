/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

if (!process.env.STORYBLOK_SPACE_ID) {
  console.error(
    'STORYBLOK_SPACE_ID env var is not set. Set it via e.g. .env file'
  );
  process.exit(-1);
}

const storyblokToTypescript = require('../scripts-dist/storyblokToTypescript');

storyblokToTypescript.default({
  // required
  componentsJson: require(`../storyblok-components/components.${process.env.STORYBLOK_SPACE_ID}.json`), // pull components with storyblok
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
