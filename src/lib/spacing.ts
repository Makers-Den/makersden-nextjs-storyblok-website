import { type Spacing } from './storyblok';

const tailwindSpacingTopMap: Record<Spacing, string> = {
  none: 'pt-0',
  xs: 'pt-4',
  sm: 'pt-8',
  md: 'pt-16',
  lg: 'pt-24',
  xl: 'pt-32',
  '2xl': 'pt-40',
  '3xl': 'pt-48',
  '4xl': 'pt-56',
} as const;

const tailwindSpacingBottomMap: Record<Spacing, string> = {
  none: 'pb-0',
  xs: 'pb-4',
  sm: 'pb-8',
  md: 'pb-16',
  lg: 'pb-24',
  xl: 'pb-32',
  '2xl': 'pb-40',
  '3xl': 'pb-48',
  '4xl': 'pb-56',
} as const;

export function toTailwindSpacingTop(spacing: Spacing): string {
  return tailwindSpacingTopMap[spacing];
}

export function toTailwindSpacingBottom(spacing: Spacing): string {
  return tailwindSpacingBottomMap[spacing];
}
