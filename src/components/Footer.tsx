import { Mail } from 'lucide-react';
import { SiteLink } from './SiteLink';
import { BETA, SITE, isBetaOpen } from '../config/site';

const COLUMNS = [
  { title: 'Découvrir', links: [['Le concept', '/concept'], ['Carnets d’exemple', '/carnets'], ['Explorer', '/explorer'], ['Voyageurs', '/communaute']] },
  { title: 'Essayer', links: [['Atelier carnet', '/atelier'], ['Travel DNA', '/travel-dna'], ['Mon espace', '/mon-espace'], ['Bêta-test', '/beta']] },
  { title: 'Le projet', links: [['Fonctionnalités', '/fonctionnalites'], ['Questions fréquentes', '/faq'], ['Suivre le projet', '/#rejoindre']] },
  { title: 'Informations', links: [['Mentions légales', '/mentions-legales'], ['Confidentialité', '/confidentialite'], ['Crédits photos', '/credits']] },
];

export default function Footer() {
  const betaOpen = isBetaOpen();
  return (
    <footer className="relative overflow-hidden bg-night text-white/75">
      <div aria-hidden="true" className="absolute -right-32 -top-48 h-[34rem] w-[34rem] rounded-full bg-indigo/20 blur-[120px]" />
      <div className="container-wide relative py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <SiteLink to="/" className="inline-flex items-center gap-2.5">
              <img src="/logo-wayorbi.png" alt="" width={36} height={36} className="h-9 w-9 rounded-xl" />
              <span className="font-display text-2xl font-semibold text-white">Wayorbi</span>
            </SiteLink>
            <p className="max-w-xs text-sm leading-relaxed">
              Un projet de réseau social consacré aux carnets de voyage : des expériences vécues, structurées pour inspirer les prochains départs.
            </p>
            <a href={`mailto:${SITE.contactEmail}`} className="inline-flex items-center gap-2 text-sm text-white hover:underline">
              <Mail size={15} aria-hidden="true" /> {SITE.contactEmail}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="mb-4 font-sans text-sm font-semibold text-white">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map(([label, to]) => (
                    <li key={to}>
                      <SiteLink to={to} className="text-sm hover:text-white">
                        {label}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© 2026 Wayorbi · Projet en développement. {betaOpen ? `Bêta de la maquette ouverte jusqu’au ${BETA.lastDayLabel}.` : `Bêta de la maquette terminée le ${BETA.lastDayLabel}.`}</p>
          <p>Les carnets, profils et interactions de ce site sont des démonstrations fictives.</p>
        </div>
      </div>
    </footer>
  );
}
