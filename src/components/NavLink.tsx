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
        'rounded-brand-full border px-brand-md py-2 text-brand-sm font-brand-medium transition-colors',
        isActive
          ? 'border-brand-solar-gold bg-brand-solar-gold text-brand-navy'
          : 'border-brand-atmospheric-blue/50 text-brand-white hover:border-brand-atmospheric-aqua hover:bg-brand-white/10',
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
