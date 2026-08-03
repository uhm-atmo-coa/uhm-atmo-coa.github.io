import NavLink from './NavLink';
import { routes } from '../utils/routes';

interface SiteNavProps {
  currentPath: string;
}

export default function SiteNav({ currentPath }: SiteNavProps) {
  return (
    <nav aria-label="Primary" className="flex flex-wrap items-center justify-center gap-1">
      {routes.map((route) => (
        <NavLink key={route.path} currentPath={currentPath} href={route.path}>
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
}
