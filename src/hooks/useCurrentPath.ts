import { useEffect, useState } from 'react';
import { normalizePath } from '../utils/routes';

function readCurrentPath(fallbackPath: string) {
  if (typeof window === 'undefined') {
    return normalizePath(fallbackPath);
  }

  return normalizePath(window.location.pathname);
}

/**
 * `fallbackPath` is only used where there is no `window` — i.e. the prerender
 * pass, which renders each route to its own HTML file. In the browser the path
 * always comes from the real location, so hydration matches the served file.
 */
export function useCurrentPath(fallbackPath = '/') {
  const [currentPath, setCurrentPath] = useState(() => readCurrentPath(fallbackPath));

  useEffect(() => {
    const syncPath = () => {
      setCurrentPath(readCurrentPath(fallbackPath));
    };

    window.addEventListener('popstate', syncPath);

    return () => {
      window.removeEventListener('popstate', syncPath);
    };
  }, [fallbackPath]);

  return currentPath;
}
