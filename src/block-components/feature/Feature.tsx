import { storyblokEditable } from '@storyblok/react/rsc';
import { Facebook, Twitter } from 'lucide-react';

import { type FeatureSbContent } from '@/lib/storyblok';

const iconMap = {
  twitter: Twitter,
  facebook: Facebook,
};

export function Feature({ blok }: { blok: FeatureSbContent }) {
  const Icon = blok.icons ? iconMap[blok.icons] : null;

  return (
    <div
      className='group border-border bg-card hover:border-primary/50 relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md'
      {...storyblokEditable(blok)}
    >
      {/* Gradient overlay on hover */}
      <div className='from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

      {/* Content */}
      <div className='relative z-10 flex flex-col gap-4'>
        {/* Icon */}
        {Icon && (
          <div className='bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110'>
            <Icon className='h-6 w-6' />
          </div>
        )}

        {/* Title */}
        {blok.name && (
          <h3 className='text-foreground group-hover:text-primary text-lg font-semibold transition-colors duration-300'>
            {blok.name}
          </h3>
        )}
      </div>

      {/* Decorative corner accent */}
      <div className='bg-primary/5 group-hover:bg-primary/10 absolute -top-8 -right-8 h-24 w-24 rounded-full transition-all duration-300 group-hover:scale-150' />
    </div>
  );
}
