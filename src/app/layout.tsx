import { type ReactNode } from 'react';

function FallbackLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default FallbackLayout;
