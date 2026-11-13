import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { SiteLink } from './SiteLink';

const NAV_LINKS = [
  { href: '/concept', label: 'Le concept' },
  { href: '/carnets', label: 'Carnets' },
  { href: '/explorer', label: 'Explorer' },
  { href: '/communaute', label: 'Communauté' },
  { href: '/travel-dna', label: 'Travel DNA' },
  { href: '/fonctionnalites', label: 'Fonctionnalités' },
];

export default function Navbar({ currentPath = '/' }: { currentPath?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setMobileOpen(false), [currentPath]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-[#E4E9F1] shadow-[0_8px_24px_rgba(17,24,39,0.05)]' : 'bg-[#F2F5F9]/90 backdrop-blur-xl border-b border-white/60'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-4">
        <SiteLink to="/" aria-label="Wayorbi, accueil" className="flex items-center gap-2.5 group shrink-0">
          <img src="/logo-wayorbi.png" alt="" className="h-10 w-10 rounded-xl shadow-[0_4px_15px_rgba(55,98,210,.15)]" />
          <span className="font-display text-xl font-bold tracking-tight text-[#111827] group-hover:text-[#496BE6] transition">Wayorbi<span className="text-[#8C7EE6]">.</span></span>
        </SiteLink>
        <nav aria-label="Navigation principale" className="hidden xl:flex items-center gap-5 text-[13px] font-semibold text-[#606B82]">
          {NAV_LINKS.map((link) => (
            <SiteLink key={link.href} to={link.href} aria-current={currentPath === link.href ? 'page' : undefined} className={`relative py-2 whitespace-nowrap transition-colors hover:text-[#3556D1] ${currentPath === link.href ? 'text-[#3556D1]' : ''}`}>
              {link.label}{currentPath === link.href && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#5472F7]" />}
            </SiteLink>
          ))}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <SiteLink to="/beta" className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#2563EB] via-[#5B7CFA] to-[#7C3AED] hover:brightness-110 shadow-[0_8px_20px_rgba(74,143,245,0.26)] transition-all">
            Tester Wayorbi <ArrowUpRight size={15}/>
          </SiteLink>
          <button type="button" onClick={() => setMobileOpen(v => !v)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'} className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl hover:bg-white text-[#111827] focus-visible:ring-2 focus-visible:ring-blue-500">
            {mobileOpen ? <X size={21}/> : <Menu size={21}/>}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav id="mobile-navigation" aria-label="Menu mobile" className="xl:hidden max-h-[80vh] overflow-y-auto bg-white/98 border-t border-[#E4E9F1] px-4 sm:px-8 py-4 grid grid-cols-2 gap-2 shadow-xl">
          {NAV_LINKS.map(link => <SiteLink key={link.href} to={link.href} onClick={() => setMobileOpen(false)} className={`p-3 rounded-xl text-sm font-semibold ${currentPath===link.href ? 'bg-[#EAF0FF] text-[#3158CF]' : 'bg-[#F6F8FC] text-[#374151]'}`}>{link.label}</SiteLink>)}
          <SiteLink to="/beta" onClick={() => setMobileOpen(false)} className="col-span-2 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-center text-white text-sm font-bold">Participer à la bêta</SiteLink>
        </nav>
      )}
    </header>
  );
}
