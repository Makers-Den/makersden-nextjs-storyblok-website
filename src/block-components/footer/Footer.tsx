import Link from 'next/link';

import { type LinkSbContent, sbLinkToHref } from '@/lib/storyblok';

export function Footer({ footerItems }: { footerItems: LinkSbContent[] }) {
  return (
    <footer className='flex bg-gray-900 px-4 py-6 text-white md:px-6 md:py-8'>
      <div className='container mx-auto flex max-w-6xl justify-between'>
        <p className='text-sm'>© 2024 Acme Inc. All rights reserved.</p>
        <div className='space-x-4 md:flex'>
          {footerItems.map((item) => (
            <Link
              className='hover:text-gray-900 hover:underline dark:hover:text-gray-50'
              href={sbLinkToHref(item.link)}
              key={item._uid}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
