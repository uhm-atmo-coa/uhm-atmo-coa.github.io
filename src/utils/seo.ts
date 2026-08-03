import { routes, type RoutePath } from './routes';

export const siteUrl = 'https://uhm-atmo-coa.github.io';
export const siteName = 'ATMO Coalition';

/**
 * Per-route metadata baked into each prerendered HTML file at build time.
 * Kept in English deliberately: crawlers index the prerendered markup, and the
 * client swaps to the visitor's language after hydration.
 */
type PageMeta = {
  title: string;
  description: string;
};

const meta: Record<RoutePath, PageMeta> = {
  '/': {
    title: 'ATMO Coalition — University of Hawaiʻi at Mānoa',
    description:
      'The ATMO Coalition is a student-led group in the Department of Atmospheric Sciences at the University of Hawaiʻi at Mānoa, building community and support for atmospheric science students.',
  },
  '/about': {
    title: 'About — ATMO Coalition',
    description:
      'Learn about the ATMO Coalition: our mission, our focus areas, and how we support atmospheric sciences students at the University of Hawaiʻi at Mānoa.',
  },
  '/board': {
    title: 'Meet the Board — ATMO Coalition',
    description:
      'Meet the student board members leading the ATMO Coalition at the University of Hawaiʻi at Mānoa.',
  },
  '/contact': {
    title: 'Contact — ATMO Coalition',
    description:
      'Get in touch with the ATMO Coalition at the University of Hawaiʻi at Mānoa.',
  },
};

export const notFoundMeta: PageMeta = {
  title: 'Page not found — ATMO Coalition',
  description: 'The page you are looking for does not exist.',
};

export function getPageMeta(path: string): PageMeta {
  return meta[path as RoutePath] ?? notFoundMeta;
}

export const prerenderRoutes = routes.map((route) => route.path);
