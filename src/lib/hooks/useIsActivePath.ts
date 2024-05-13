import { usePathname, useRouter } from 'next/navigation';

/**
 * will return { isActive: true } if path (one or more) matches the current url path.
 */
export const useIsActivePath = (path: string | string[]) => {
  const router = useRouter();
  const routerPath = usePathname();
  if (Array.isArray(path)) {
    return {
      router,
      isActive: path.reduce(
        (acc, p) => acc || Boolean(routerPath?.includes(p)),
        false
      ),
    };
  }

  if (path.includes('services')) {
    const linkSegments = path.split('/');
    const pathSegments = routerPath?.replace('#', '/#').split('/');
    const lastLinkSegment = linkSegments[linkSegments.length - 1];
    const lastPathSegment = pathSegments?.[pathSegments.length - 1];
    return { router, isActive: lastPathSegment === lastLinkSegment };
  }

  return { router, isActive: routerPath?.includes(path) };
};
