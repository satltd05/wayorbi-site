import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { isExternalLink, navigate } from '../lib/router';

export { navigate };

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; children: ReactNode };

/** Lien interne sans rechargement de page ; les liens externes et e-mails gardent leur comportement normal. */
export function SiteLink({ to, children, onClick, ...props }: SiteLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (props.target === '_blank' || isExternalLink(to)) return;
    event.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
