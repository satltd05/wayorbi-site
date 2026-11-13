import { useEffect, useState } from 'react';
import { Bookmark, Menu, X } from 'lucide-react';
import { SiteLink } from './SiteLink';
import { isBetaOpen } from '../config/site';
import { useDemoState } from '../lib/demoStore';

const NAV_LINKS = [
  { href: '/carnets', label: 'Carnets', match: ['/carnets', '/atelier'] },
  { href: '/explorer', label: 'Explorer', match: ['/explorer'] },
  { href: '/communaute', label: 'Voyageurs', match: ['/communaute', '/voyageurs'] },
  { href: '/travel-dna', label: 'Travel DNA', match: ['/travel-dna'] },
  { href: '/concept', label: 'Le concept', match: ['/concept'] },
  { href: '/fonctionnalites', label: 'Fonctionnalités', match: ['/fonctionnalites'] },
];

const isActive = (path: string, prefixes: string[]) => prefixes.some((p) => path === p || path.startsWith(`${p}/`));

export default function Navbar({ currentPath = '/' }: { currentPath?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { saves, follows } = useDemoState();
  const kept = saves.length + follows.length;
  const betaOpen = isBetaOpen();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [currentPath]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-200 ${
        scrolled || open ? 'border-b border-line bg-white/92 shadow-[0_8px_24px_-16px_rgba(19,32,63,0.35)] backdrop-blur-xl' : 'border-b border-transparent bg-mist/70 backdrop-blur-md'
      }`}
    >
      <div className="container-wide flex h-[72px] items-center justify-between gap-4">
        <SiteLink to="/" aria-label="Wayorbi, accueil" className="flex shrink-0 items-center gap-2.5">
          <img src="/logo-wayorbi.png" alt="" width={40} height={40} className="h-10 w-10 rounded-xl shadow-[0_4px_14px_rgba(55,98,210,0.18)]" />
          <span className="wordmark text-[1.55rem] leading-none">Wayorbi</span>
        </SiteLink>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(currentPath, link.match);
            return (
              <SiteLink
                key={link.href}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${active ? 'bg-ink text-white' : 'text-ink-soft hover:bg-white hover:text-ink'}`}
              >
                {link.label}
              </SiteLink>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <SiteLink
            to="/mon-espace"
            aria-current={currentPath === '/mon-espace' ? 'page' : undefined}
            className="relative inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-3.5 text-sm font-medium text-ink hover:border-sky/50"
          >
            <Bookmark size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Mon espace</span>
            {kept > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-sky px-1 text-[11px] font-semibold text-white" aria-label={`${kept} éléments gardés`}>
                {kept}
              </span>
            )}
          </SiteLink>
          <SiteLink to="/beta" className={`hidden md:inline-flex ${betaOpen ? 'btn-primary' : 'btn-secondary'} !min-h-10 !py-2`}>
            {betaOpen ? 'Tester la maquette' : 'Bêta terminée'}
          </SiteLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink xl:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu" className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white px-4 py-4 xl:hidden">
          <ul className="grid gap-1 sm:grid-cols-2">
            {[...NAV_LINKS, { href: '/atelier', label: 'Atelier carnet', match: ['/atelier'] }, { href: '/faq', label: 'Questions fréquentes', match: ['/faq'] }].map((link) => (
              <li key={link.href}>
                <SiteLink
                  to={link.href}
                  aria-current={isActive(currentPath, link.match) ? 'page' : undefined}
                  className={`block rounded-2xl px-4 py-3 text-base font-medium ${isActive(currentPath, link.match) ? 'bg-ink text-white' : 'text-ink hover:bg-mist'}`}
                >
                  {link.label}
                </SiteLink>
              </li>
            ))}
          </ul>
          <SiteLink to="/beta" className={`mt-3 w-full ${betaOpen ? 'btn-primary' : 'btn-secondary'}`}>
            {betaOpen ? 'Tester la maquette (bêta)' : 'Le bêta-test est terminé'}
          </SiteLink>
        </nav>
      )}
    </header>
  );
}
