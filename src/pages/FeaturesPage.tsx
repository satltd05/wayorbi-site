import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Compass, Users } from 'lucide-react';
import { SiteLink } from '../components/SiteLink';
import { CTA, PageHero, SectionHeading } from './Shared';

type Feature = { title: string; text: string; demo?: string };

const SECTIONS: { title: string; intro: string; icon: ReactNode; features: Feature[] }[] = [
  {
    title: 'Découvrir',
    intro: 'Trouver l’inspiration et les voyageurs qui comptent pour soi.',
    icon: <Compass size={22} aria-hidden="true" />,
    features: [
      { title: 'Accueil personnalisé', text: 'Stories des comptes suivis, voyageurs à découvrir, carnets à la une et suggestions.', demo: '/' },
      { title: 'Recherche et filtres', text: 'Destination, budget, durée, type de voyage et transport.', demo: '/explorer' },
      { title: 'Travel DNA', text: 'Des suggestions de carnets et de voyageurs à partir de huit critères.', demo: '/travel-dna' },
      { title: 'Recommandations par intelligence artificielle', text: 'Une piste pour plus tard : affiner les suggestions à partir des préférences.' },
    ],
  },
  {
    title: 'Raconter',
    intro: 'Créer un carnet riche et structuré, sans perdre les détails utiles.',
    icon: <BookOpen size={22} aria-hidden="true" />,
    features: [
      { title: 'Création guidée en deux étapes', text: 'Les informations du voyage, puis les étapes et les expériences.', demo: '/atelier' },
      { title: 'Brouillon repris plus tard', text: 'Sur ce site, le brouillon reste dans le navigateur.', demo: '/mon-espace' },
      { title: 'Budget détaillé par catégorie', text: 'Hébergement, transport, restauration, activités et autres dépenses.', demo: '/carnets/islande#budget' },
      { title: 'Photos et vidéos', text: 'Ajouter ses propres médias à chaque étape.' },
      { title: 'Publication du carnet', text: 'Rendre un carnet visible par la communauté ou par ses abonnés.' },
    ],
  },
  {
    title: 'Partager',
    intro: 'Échanger avec d’autres voyageurs, en gardant le contrôle de sa visibilité.',
    icon: <Users size={22} aria-hidden="true" />,
    features: [
      { title: 'Profils de voyageurs', text: 'Bannière, biographie, carnets, conseils, stories à la une et activité.', demo: '/voyageurs/lena' },
      { title: 'Suivre, aimer, commenter, enregistrer', text: 'Sur ce site, ces interactions sont gardées dans le navigateur.', demo: '/carnets/portugal' },
      { title: 'Stories', text: 'Des moments partagés 24 heures, puis gardés à la une.', demo: '/communaute#stories' },
      { title: 'Profil public ou privé', text: 'Choisir qui peut voir ses carnets.', demo: '/communaute#echanges-titre' },
      { title: 'Messages privés et groupes', text: 'Échanges avec photos, vidéos et messages vocaux.' },
      { title: 'Notifications', text: 'Réponses, nouveaux abonnés, carnets publiés par les voyageurs suivis.' },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        kicker="Fonctionnalités"
        title="Ce qui se teste ici, ce qui viendra ensuite"
        description="Voici le périmètre imaginé pour Wayorbi. Chaque fonctionnalité indique si elle a une démonstration sur ce site ou si elle est prévue pour l’application. Rien n’est présenté comme déjà disponible au public."
        photos={['takayama-1', 'haivan', 'exp-5-a']}
      />

      <section className="section-pad bg-white" aria-labelledby="legende-titre">
        <div className="container-wide">
          <h2 id="legende-titre" className="sr-only">
            Légende
          </h2>
          <ul className="mb-10 flex flex-wrap gap-3 text-sm">
            <li className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 font-medium text-success">
              <CheckCircle2 size={16} aria-hidden="true" /> Démo sur ce site
            </li>
            <li className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 font-medium text-muted">
              <Clock3 size={16} aria-hidden="true" /> Prévu dans l’application
            </li>
          </ul>
          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <article key={section.title} className="grid gap-8 rounded-[1.5rem] border border-line p-6 sm:p-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sky/10 text-sky">{section.icon}</span>
                  <h3 className="mt-4 font-display text-3xl font-semibold text-ink">{section.title}</h3>
                  <p className="mt-2 text-ink-soft">{section.intro}</p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                  {section.features.map((feature) => (
                    <li key={feature.title} className="rounded-2xl bg-mist p-4">
                      <p className="font-semibold text-ink">{feature.title}</p>
                      <p className="mt-1 text-sm text-ink-soft">{feature.text}</p>
                      {feature.demo ? (
                        <SiteLink to={feature.demo} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-success hover:underline">
                          <CheckCircle2 size={15} aria-hidden="true" /> Démo sur ce site <ArrowRight size={14} aria-hidden="true" />
                        </SiteLink>
                      ) : (
                        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted">
                          <Clock3 size={15} aria-hidden="true" /> Prévu dans l’application
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-mist" aria-labelledby="transparence-titre">
        <div className="container-text">
          <SectionHeading id="transparence-titre" title="En toute transparence" />
          <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>Ce site est un site de présentation. Ses démonstrations fonctionnent réellement, mais avec des données fictives enregistrées uniquement dans le navigateur du visiteur.</p>
            <p>Il ne propose ni compte, ni publication, ni messagerie, ni réseau social opérationnel. La maquette du bêta-test permet de parcourir des écrans et de donner son avis sur le concept.</p>
          </div>
        </div>
      </section>

      <CTA title="Donner son avis sur le concept" description="Le bêta-test de la maquette sert à recueillir des retours sérieux pour faire évoluer Wayorbi." button="Comprendre le bêta-test" to="/beta" />
    </>
  );
}
