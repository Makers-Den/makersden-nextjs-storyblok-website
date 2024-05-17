import { type ReactNode } from 'react';

import { BasicLayout } from '@/app/BasicLayout';

export function GermanLayout(props: { children: ReactNode }) {
  return <BasicLayout {...props} lang='de' />;
}

export default GermanLayout;
