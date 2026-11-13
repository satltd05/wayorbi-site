import { ArrowRight, BookOpen, Bookmark, Map, MessagesSquare, Search, Sparkles, Users, Wallet, X } from 'lucide-react';
import { SiteLink } from '../components/SiteLink';
import TravelPhotoFrame from '../components/TravelPhotoFrame';
import { CTA, FeatureCard, PageHero, SectionHeading } from './Shared';
import type { PhotoId } from '../data/travelPhotos';

const SOURCES = [
  { name: 'Réseaux sociaux', gives: 'l’inspiration', misses: 'sans le budget ni l’itinéraire' },
  { name: 'Cartes en ligne', gives: 'les lieux', misses: 'sans le récit de ceux qui y sont allés' },
  { name: 'Blogs', gives: 'des conseils', misses: 'souvent dispersés et difficiles à comparer' },
  { name: 'Sites de réservation', gives: 'des prix', misses: 'sans le coût réel d’un voyage complet' },
  { name: 'Forums', gives: 'des expériences', misses: 'éparpillées dans des fils de discussion' },
];

const PHASES: { title: string; text: string; photo: PhotoId }[] = [
  { title: 'Avant le départ : s’inspirer', text: 'Chercher des voyages qui correspondent à son budget, à son rythme et à ses envies, et garder les carnets utiles.', photo: 'exp-1-b' },
  { title: 'Pendant le voyage : garder le fil', text: 'Rassembler étapes, trajets, adresses, photos, dépenses et conseils au fil de la route.', photo: 'hanoi' },
  { title: 'Au retour : partager', text: 'Publier un carnet structuré, échanger avec d’autres voyageurs et inspirer les prochains départs.', photo: 'bergen-2' },
];

const PILLARS = [
  { icon: <BookOpen size={20} aria-hidden="true" />, title: 'Des carnets structurés', text: 'Étapes, expériences, médias et informations pratiques réunis dans un même récit.', to: '/carnets/japon', cta: 'Voir un carnet' },
  { icon: <Wallet size={20} aria-hidden="true" />, title: 'Des budgets lisibles', text: 'Un coût total et cinq catégories de dépenses pour comprendre comment chacun voyage.', to: '/carnets/norvege#budget', cta: 'Voir un budget' },
  { icon: <Map size={20} aria-hidden="true" />, title: 'Des itinéraires clairs', text: 'Une carte du parcours et le transport choisi pour passer d’une étape à l’autre.', to: '/carnets/ecosse#itineraire', cta: 'Voir un itinéraire' },
  { icon: <Users size={20} aria-hidden="true" />, title: 'Des profils de voyageurs', text: 'Suivre des voyageurs, découvrir leurs carnets, leurs conseils et leurs stories.', to: '/communaute', cta: 'Voir les voyageurs' },
  { icon: <Bookmark size={20} aria-hidden="true" />, title: 'L’inspiration gardée', text: 'Enregistrer les carnets et les conseils qui donnent envie de préparer son prochain voyage.', to: '/mon-espace', cta: 'Voir mon espace' },
  { icon: <Sparkles size={20} aria-hidden="true" />, title: 'Une découverte personnalisée', text: 'Le Travel DNA rapproche les envies de chacun des carnets et des voyageurs.', to: '/travel-dna', cta: 'Essayer le Travel DNA' },
];

export default function ConceptPage() {
  return (
    <>
      <PageHero
        kicker="Le concept"
        title="Chaque voyage a une histoire. Chaque histoire peut en inspirer d’autres."
        description="Wayorbi est un projet de réseau social entièrement consacré au voyage. Les voyageurs y partagent leurs expériences réelles sous forme de carnets, pour que d’autres puissent les découvrir et s’en inspirer."
        photos={['exp-1-b', 'food-pho', 'geiranger-2']}
        actions={
          <>
            <SiteLink to="/carnets/japon" className="btn-primary">
              Voir un carnet complet <ArrowRight size={17} aria-hidden="true" />
            </SiteLink>
            <SiteLink to="/fonctionnalites" className="btn-secondary">
              Les fonctionnalités
            </SiteLink>
          </>
        }
      />

      <section className="section-pad bg-white" aria-labelledby="constat-titre">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="constat-titre" className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Préparer un voyage, c’est jongler entre cinq outils
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">Les informations existent, mais elles sont dispersées, parfois imprécises, et difficiles à assembler en un itinéraire cohérent.</p>
            <p className="mt-6 rounded-[var(--radius-card)] bg-night p-6 text-lg leading-relaxed text-white">
              Wayorbi rassemble les expériences, les informations pratiques et les conseils des voyageurs dans un même espace communautaire.
            </p>
          </div>
          <ul className="space-y-3 lg:col-span-7">
            {SOURCES.map((source) => (
              <li key={source.name} className="flex items-start gap-4 rounded-2xl border border-line p-4 sm:p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mist text-muted">
                  <Search size={16} aria-hidden="true" />
                </span>
                <p className="text-ink-soft">
                  <strong className="text-ink">{source.name}</strong> donnent {source.gives}, {source.misses}.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-mist" aria-labelledby="parcours-titre">
        <div className="container-wide">
          <SectionHeading id="parcours-titre" title="Un compagnon pour tout le voyage" description="Le carnet accompagne chaque moment, de l’envie de partir au partage du retour." />
          <ol className="grid gap-6 lg:grid-cols-3">
            {PHASES.map((phase, index) => (
              <li key={phase.title} className="overflow-hidden rounded-[1.5rem] border border-line bg-white">
                <TravelPhotoFrame photo={phase.photo} credit="short" creditPosition="bottom" className="aspect-[16/10]" />
                <div className="p-6">
                  <p className="text-sm font-medium text-sky">Moment {index + 1}</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{phase.title}</h3>
                  <p className="mt-2 text-ink-soft">{phase.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-white" aria-labelledby="piliers-titre">
        <div className="container-wide">
          <SectionHeading id="piliers-titre" title="Un réseau social construit autour du voyage vécu" description="Chaque pilier du concept a sa démonstration sur ce site." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <FeatureCard
                key={pillar.title}
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.text}
                footer={
                  <SiteLink to={pillar.to} className="btn-ghost !px-0">
                    {pillar.cta} <ArrowRight size={15} aria-hidden="true" />
                  </SiteLink>
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-mist" aria-labelledby="nom-titre">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 id="nom-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Way + Orbis
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              « Way », le chemin, le parcours. « Orbis », le monde en latin. Le logo reprend cette idée : un globe autour duquel un avion trace son orbite.
            </p>
            <h3 className="mt-10 font-display text-2xl font-semibold text-ink">Ce que Wayorbi n’est pas</h3>
            <ul className="mt-4 space-y-2">
              {['Un simple blog de voyage', 'Un comparateur de prix', 'Une plateforme de réservation'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-ink-soft">
                  <X size={18} className="shrink-0 text-like" aria-hidden="true" /> {item}
                </li>
              ))}
              <li className="flex items-center gap-3 font-semibold text-ink">
                <MessagesSquare size={18} className="shrink-0 text-sky" aria-hidden="true" /> Un réseau social de partage d’expériences de voyage
              </li>
            </ul>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="concept-orbit" x1="0" x2="1">
                  <stop offset="0" stopColor="#1fb8de" />
                  <stop offset="0.5" stopColor="#3d7bf2" />
                  <stop offset="1" stopColor="#b89ede" />
                </linearGradient>
              </defs>
              <ellipse cx="200" cy="200" rx="185" ry="70" fill="none" stroke="url(#concept-orbit)" strokeWidth="2.5" transform="rotate(-20 200 200)" />
            </svg>
            <img src="/logo-wayorbi.png" alt="Logo Wayorbi : un globe et un avion en orbite" className="absolute left-1/2 top-1/2 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] shadow-[var(--shadow-lift)]" />
          </div>
        </div>
      </section>

      <CTA title="Le concept prend vie dans les démonstrations" description="Carnets d’exemple, Explorer, profils de voyageurs et Travel DNA : tout se teste sur ce site, sans inscription." button="Voir les carnets" to="/carnets" />
    </>
  );
}
