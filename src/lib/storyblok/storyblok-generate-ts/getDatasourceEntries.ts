/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import dotenv from 'dotenv';
import StoryblokClient from 'storyblok-js-client';

dotenv.config();

const storyblokClient = new StoryblokClient(
  {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    cache: {
      clear: 'auto',
      type: 'memory',
    },
  },
  'https://api.storyblok.com/v2'
);

type Datasource = {
  id: number;
  name: string;
  value: string;
  dimension_value: string | null;
};

export const getDatasourceEntries = (
  datasource_slug: string
): Promise<Datasource[]> =>
  storyblokClient
    .get(`cdn/datasource_entries`, { datasource: datasource_slug })
    .then((response) => response.data.datasource_entries);
