import { useState } from 'react';
import { ArrowRight, BookOpen, Camera, PenLine } from 'lucide-react';
import { CARNETS, type TripType } from '../data/carnets';
import CarnetCard from '../components/CarnetCard';
import InteractiveJournalSection from '../components/InteractiveJournalSection';
import { SiteLink } from '../components/SiteLink';
import DemoNote from '../components/DemoNote';
import { CTA, PageHero, SectionHeading } from './Shared';

const TYPES: (TripType | 'Tous')[] = ['Tous', 'Découverte & tourisme', 'Nature & aventure', 'Détente'];

export default function CarnetsPage() {
  const [type, setType] = useState<TripType | 'Tous'>('Tous');
  const [featured, ...others] = CARNETS;
  const list = type === 'Tous' ? others : CARNETS.filter((c) => c.tripType === type);

  return (
    <>
      <PageHero
        kicker={`${CARNETS.length} carnets d’exemple`}
        title="Des carnets qui racontent tout le voyage"
        description="Un carnet Wayorbi relie un souvenir à une étape, un trajet, une adresse, une dépense et un conseil concret. Ces exemples fictifs montrent le format imaginé pour l’application."
        photos={['kyoto-2', 'norvege-cover', 'lisbonne-1']}
        actions={
          <>
            <SiteLink to="/explorer" className="btn-primary">
              Filtrer les carnets <ArrowRight size={17} aria-hidden="true" />
            </SiteLink>
            <SiteLink to="/atelier" className="btn-secondary">
              Créer un carnet
            </SiteLink>
          </>
        }
      />

      <section className="pb-20" aria-labelledby="tous-carnets">
        <div className="container-wide">
          <SectionHeading
            id="tous-carnets"
            title="Tous les carnets"
            description="Du train de nuit vietnamien aux bains chauds islandais : chaque carnet a sa carte, ses étapes, son budget et ses conseils."
            action={
              <div role="group" aria-label="Filtrer par type de voyage" className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button key={t} type="button" className="chip" aria-pressed={type === t} onClick={() => setType(t)}>
                    {t}
                  </button>
                ))}
              </div>
            }
          />
          {type === 'Tous' && (
            <div className="mb-14">
              <CarnetCard carnet={featured} variant="feature" />
            </div>
          )}
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((carnet) => (
              <CarnetCard key={carnet.id} carnet={carnet} />
            ))}
          </div>
          <DemoNote className="mt-10">Carnets, voyageurs et budgets fictifs. Les lieux et les transports existent ; les photos d’illustration viennent de Wikimedia Commons.</DemoNote>
        </div>
      </section>

      <InteractiveJournalSection />

      <section className="section-pad bg-mist" aria-labelledby="creer-titre">
        <div className="container-wide">
          <SectionHeading
            id="creer-titre"
            title="Créer un carnet en deux temps"
            description="Le carnet se construit en deux étapes : d’abord le cadre du voyage, ensuite le récit, étape par étape. Un brouillon peut être repris plus tard."
          />
          <ol className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: <BookOpen size={22} aria-hidden="true" />,
                title: 'Les informations du voyage',
                text: 'Destination, dates, durée, nombre de voyageurs, type de séjour, rythme, budget par catégorie et couverture.',
                tags: ['Destination', 'Dates', 'Voyageurs', 'Rythme', 'Budget', 'Couverture'],
              },
              {
                icon: <PenLine size={22} aria-hidden="true" />,
                title: 'Les expériences vécues',
                text: 'Étapes, transports, activités, restaurants, hébergements, conseils et médias, dans l’ordre du voyage.',
                tags: ['Étapes', 'Transports', 'Activités', 'Adresses', 'Conseils', 'Photos et vidéos'],
              },
            ].map((item, index) => (
              <li key={item.title} className="rounded-[1.5rem] border border-line bg-white p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sky/10 text-sky">{item.icon}</span>
                  <span className="text-sm font-medium text-muted">Étape {index + 1} sur 2</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-ink-soft">{item.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="pill">
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <SiteLink to="/atelier" className="btn-primary">
              Essayer l’atelier carnet <ArrowRight size={17} aria-hidden="true" />
            </SiteLink>
            <p className="flex items-center gap-2 text-sm text-muted">
              <Camera size={15} aria-hidden="true" /> L’ajout de photos et de vidéos arrivera avec l’application.
            </p>
          </div>
        </div>
      </section>

      <CTA title="Envie de chercher par budget ou par durée ?" description="Explorer filtre les carnets par destination, budget, durée, type de voyage et transport." button="Ouvrir Explorer" to="/explorer" />
    </>
  );
}
