'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const useOnNavigation = (onPathnameChange: () => void) => {
  const pathname = usePathname();
  const savedPathNameRef = useRef(pathname);
  const initialLoad = useRef(0);
  useEffect(() => {
    if (savedPathNameRef.current !== pathname || initialLoad.current === 0) {
      onPathnameChange();
      initialLoad.current = initialLoad.current + 1;
      savedPathNameRef.current = pathname;
    }
  }, [pathname, onPathnameChange]);
};
