import Link from 'next/link';
import { type SVGProps } from 'react';

import { type LinkSbContent, sbLinkToHref } from '@/lib/storyblok';

function Header({ navItems }: { navItems: LinkSbContent[] }) {
  return (
    <header className='bg-gray-900 px-4 py-3 text-white md:px-6 md:py-4'>
      <div className='container mx-auto flex max-w-6xl items-center justify-between'>
        <Link className='flex items-center gap-2 font-semibold' href='#'>
          <MountainIcon className='h-6 w-6' />
          <span>Acme Inc</span>
        </Link>
        <nav className='hidden space-x-4 md:flex'>
          {navItems.map((item) => (
            <Link
              className='hover:underline'
              href={sbLinkToHref(item.link)}
              key={item._uid}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function MountainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  );
}

export default Header;
