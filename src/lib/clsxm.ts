import { type ClassValue } from 'clsx';

import { cn } from './utils';

/** Merge classes with tailwind-merge with clsx full feature */
const clsxm = (...classes: ClassValue[]) => cn(...classes);
/** Merge classes with tailwind-merge with clsx full feature */
export default clsxm;
