import { StoryblokComponent as BaseStoryblokComponent } from '@storyblok/react/rsc';
import React from 'react';

import { type Translations } from '@/types';

type Props = React.ComponentProps<typeof BaseStoryblokComponent> & {
  translations: Translations;
};

export function GenericStoryblokComponent(props: Props): JSX.Element {
  return <BaseStoryblokComponent {...props} />;
}
