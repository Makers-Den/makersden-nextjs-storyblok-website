import clsx from 'clsx';
import { type ReactNode } from 'react';

export type ContainerProps = {
  useGridLayout?: boolean;
  className?: string;
  children: ReactNode;
};

export const Container = ({ className, children }: ContainerProps) => (
  <section className={clsx('container mx-auto', className)}>{children}</section>
);
