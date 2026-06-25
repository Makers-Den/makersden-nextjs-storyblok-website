import clsxm from '@/lib/clsxm';
import { toTailwindSpacingBottom, toTailwindSpacingTop } from '@/lib/spacing';
import { type Colors, type Spacing } from '@/lib/storyblok';

const sectionColorClasses: Partial<Record<Colors, string>> = {
  red: '',
  green: '',
  blue: '',
  black: '',
  white: '',
  gray: '',
  transparent: '',
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
