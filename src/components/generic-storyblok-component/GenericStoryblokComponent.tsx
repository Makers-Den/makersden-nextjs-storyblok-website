import { StoryblokServerComponent as BaseStoryblokComponent } from '@storyblok/react/rsc';
import React, { type JSX } from 'react';

import { type Locale } from '@/i18n/config';

import { type Translations } from '@/types';

type Props = React.ComponentProps<typeof BaseStoryblokComponent> & {
  locale: Locale;
  translations: Translations;
};

export function GenericStoryblokComponent(props: Props): JSX.Element {
  return <BaseStoryblokComponent {...props} />;
}
