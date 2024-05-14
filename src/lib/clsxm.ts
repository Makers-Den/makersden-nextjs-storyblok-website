import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));
/** Merge classes with tailwind-merge with clsx full feature */
export default clsxm;
