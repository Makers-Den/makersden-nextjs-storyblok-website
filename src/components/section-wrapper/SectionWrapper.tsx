import clsxm from '@/lib/clsxm';
import { toCssVariableName } from '@/lib/colors';
import { toTailwindSpacingBottom, toTailwindSpacingTop } from '@/lib/spacing';
import { type Colors, type Spacing } from '@/lib/storyblok';

const sectionColorClasses: Partial<Record<Colors, string>> = {
  red: 'text-white',
  green: 'text-brand-navy',
  blue: 'text-white',
  black: 'text-white',
  white: 'bg-panel text-white',
  gray: 'text-white',
};

const sectionColorValues: Partial<Record<Colors, string>> = {
  white: 'rgb(var(--panel-rgb))',
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
      style={{
        backgroundColor:
          color &&
          (sectionColorValues[color] ?? `var(${toCssVariableName(color)})`),
      }}
    >
      {children}
    </section>
  );
}
