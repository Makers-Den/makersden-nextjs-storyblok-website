import clsxm from '@/lib/clsxm';
import { toCssVariableName } from '@/lib/colors';
import { toTailwindSpacingBottom, toTailwindSpacingTop } from '@/lib/spacing';
import { type Colors, type Spacing } from '@/lib/storyblok';

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
        className,
      )}
      style={{
        backgroundColor: color && `var(${toCssVariableName(color)})`,
      }}
    >
      {children}
    </section>
  );
}
