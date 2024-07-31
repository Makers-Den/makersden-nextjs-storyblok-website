import clsx from 'clsx';
import { type ReactNode } from 'react';

export type ContainerProps = {
  useGridLayout?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
};

export const Container = ({ className, id, children }: ContainerProps) => (
  <section {...(id && { id })} className={clsx('container mx-auto', className)}>
    {children}
  </section>
);
