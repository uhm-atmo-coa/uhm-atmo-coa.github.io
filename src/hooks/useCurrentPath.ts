import { useEffect, useState } from 'react';
import { normalizePath } from '../utils/routes';

function readCurrentPath() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return normalizePath(window.location.pathname);
}

export function useCurrentPath() {
  const [currentPath, setCurrentPath] = useState(readCurrentPath);

  useEffect(() => {
    const syncPath = () => {
      setCurrentPath(readCurrentPath());
    };

    window.addEventListener('popstate', syncPath);

    return () => {
      window.removeEventListener('popstate', syncPath);
    };
  }, []);

  return currentPath;
}
