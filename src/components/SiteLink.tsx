import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

export function navigate(to: string) {
  if (typeof window === 'undefined') return;
  const [path, hash] = to.split('#');
  const next = `${path || window.location.pathname}${hash ? `#${hash}` : ''}`;
  window.history.pushState(null, '', next);
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (hash) {
    window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 30);
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; children: ReactNode };

export function SiteLink({ to, children, onClick, ...props }: SiteLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === '_blank') return;
    if (to.startsWith('http') || to.startsWith('mailto:')) return;
    event.preventDefault();
    navigate(to);
  };
  return <a href={to} {...props} onClick={handleClick}>{children}</a>;
}
