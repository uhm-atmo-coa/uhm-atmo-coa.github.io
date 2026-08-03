export const routes = [
  {
    key: 'home',
    label: 'Home',
    path: '/',
  },
  {
    key: 'about',
    label: 'About',
    path: '/about',
  },
  {
    key: 'board',
    label: 'Meet the Board',
    path: '/board',
  },
  {
    key: 'contact',
    label: 'Contact',
    path: '/contact',
  },
] as const;

export type RoutePath = (typeof routes)[number]['path'];

export function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function getRoute(pathname: string) {
  const normalizedPath = normalizePath(pathname);

  return routes.find((route) => route.path === normalizedPath);
}

export function navigateTo(path: RoutePath) {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedPath = normalizePath(path);

  if (window.location.pathname === normalizedPath) {
    return;
  }

  window.history.pushState({}, '', normalizedPath);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
