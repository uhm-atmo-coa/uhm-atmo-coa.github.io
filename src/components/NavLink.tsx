import type { MouseEvent, ReactNode } from 'react';
import { navigateTo, type RoutePath } from '../utils/routes';

interface NavLinkProps {
  children: ReactNode;
  currentPath: string;
  href: RoutePath;
}

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export default function NavLink({ children, currentPath, href }: NavLinkProps) {
  const isActive = currentPath === href;

  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={[
        'rounded-brand-full px-4 py-1.5 text-brand-sm font-brand-medium transition-colors',
        isActive
          ? 'bg-brand-solar-gold text-brand-navy'
          : 'text-brand-neutral-cloud hover:bg-brand-white/10 hover:text-brand-white',
      ].join(' ')}
      href={href}
      onClick={(event) => {
        if (event.defaultPrevented || event.button !== 0 || isModifiedEvent(event)) {
          return;
        }

        event.preventDefault();
        navigateTo(href);
      }}
    >
      {children}
    </a>
  );
}
