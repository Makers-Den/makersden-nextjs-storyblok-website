import clsxm from '@/lib/clsxm';
import { toTailwindSpacingBottom, toTailwindSpacingTop } from '@/lib/spacing';
import { type Colors, type Spacing } from '@/lib/storyblok';

const sectionColorClasses: Partial<Record<Colors, string>> = {
  red: 'bg-[var(--red)] text-white',
  green: 'bg-[var(--green)] text-brand-navy',
  blue: 'bg-[var(--blue)] text-white',
  black: 'bg-[var(--black)] text-white',
  white: 'bg-panel text-white',
  gray: 'bg-[var(--gray)] text-white',
  transparent: 'bg-transparent',
};

export type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  color?: Colors;
  spacingTop?: Spacing;
  spacingBottom?: Spacing;
};

export function SectionWrapper({
  children,
  className,
  color,
  spacingTop,
  spacingBottom,
  ...rest
}: SectionWrapperProps) {
  return (
    <section
      {...rest}
      className={clsxm(
        spacingTop && toTailwindSpacingTop(spacingTop),
        spacingBottom && toTailwindSpacingBottom(spacingBottom),
        color && sectionColorClasses[color],
        className,
      )}
    >
      {children}
    </section>
  );
}
