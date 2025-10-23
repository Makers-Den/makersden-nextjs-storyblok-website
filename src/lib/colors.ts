import { type Colors } from './storyblok';

export function toCssVariableName(color: Colors): string {
  return `--${color}`;
}
