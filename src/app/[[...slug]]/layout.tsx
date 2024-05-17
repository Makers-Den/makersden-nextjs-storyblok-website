import { type ReactNode } from 'react';

import { BasicLayout } from '@/app/BasicLayout';

export function EnglishLayout(props: { children: ReactNode }) {
  return <BasicLayout {...props} lang='en' />;
}

export default EnglishLayout;
