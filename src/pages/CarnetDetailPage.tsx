import { useState } from 'react';
import { BedDouble, Check, ChevronRight, Lightbulb, Link2, MapPin, MessageCircle, UtensilsCrossed, Landmark } from 'lucide-react';
import type { Carnet, Place } from '../data/carnets';
import { getPhoto } from '../data/travelPhotos';
import {
  budgetLevel,
  carnetDays,
  carnetExpenses,
  carnetsByAuthor,
  companionLabel,
  getCarnet,
  getTraveler,
  meetingsLabel,
  perPerson,
  similarCarnets,
  stepTotal,
  transportsUsed,
} from '../lib/carnets';
import { formatEuros, plural } from '../lib/format';
import { SiteLink } from '../components/SiteLink';
import TravelerAvatar from '../components/TravelerAvatar';
import TravelPhotoFrame, { photoCredit } from '../components/TravelPhotoFrame';
import TransportIcon from '../components/TransportIcon';
import RouteMap from '../components/RouteMap';
import BudgetBreakdown from '../components/BudgetBreakdown';
import CommentsSection from '../components/CommentsSection';
import CarnetCard from '../components/CarnetCard';
import { FollowButton, LikeButton, SaveButton } from '../components/InteractionButtons';
import DemoNote, { DemoTag } from '../components/DemoNote';
import NotFoundPage from './NotFoundPage';

const SECTIONS = [
  ['apercu', 'Aperçu'],
  ['itineraire', 'Itinéraire'],
  ['etapes', 'Étapes'],
  ['budget', 'Budget'],
  ['adresses', 'Adresses'],
  ['conseils', 'Conseils'],
  ['commentaires', 'Commentaires'],
] as const;

const PLACE_ICON = {
  hebergement: <BedDouble size={16} aria-hidden="true" />,
  restaurant: <UtensilsCrossed size={16} aria-hidden="true" />,
  lieu: <Landmark size={16} aria-hidden="true" />,
};
const PLACE_LABEL = { hebergement: 'Hébergement', restaurant: 'Restaurant', lieu: 'Lieu' };

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split('#')[0]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt('Copier le lien de ce carnet :', window.location.href.split('#')[0]);
    }
  };
  return (
    <button type="button" onClick={copy} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink-soft hover:text-sky">
      {copied ? <Check size={17} aria-hidden="true" /> : <Link2 size={17} aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Lien copié' : 'Copier le lien'}</span>
    </button>
  );
}

function PlaceItem({ place, stepCity }: { place: Place; stepCity?: string }) {
  const photo = place.photo ? getPhoto(place.photo) : null;
  return (
    <li className="flex gap-3 rounded-2xl border border-line bg-white p-3">
      {photo ? (
        <img src={photo.src} alt={photo.alt} loading="lazy" className="h-16 w-16 shrink-0 rounded-xl object-cover" title={photoCredit(photo)} />
      ) : (
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-mist text-sky">{PLACE_ICON[place.kind]}</span>
      )}
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted">
          {PLACE_LABEL[place.kind]}
          {stepCity ? ` · ${stepCity}` : ''}
        </p>
        <p className="font-semibold text-ink">{place.name}</p>
        <p className="text-sm text-ink-soft">{place.note}</p>
      </div>
    </li>
  );
}

function StepArticle({ carnet, index }: { carnet: Carnet; index: number }) {
  const step = carnet.steps[index];
  const [lead, ...rest] = step.photos;
  return (
    <article id={`etape-${step.id}`} className="scroll-mt-36 border-t border-line pt-10 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-display text-5xl font-semibold text-sky/30" aria-hidden="true">
          {index + 1}
        </span>
        <div>
          <h3 className="font-display text-3xl font-semibold text-ink">
            <span className="sr-only">Étape {index + 1} : </span>
            {step.city}
          </h3>
          <p className="text-sm text-muted">
            {step.area} · {plural(step.days, 'jour', 'jours')}
          </p>
        </div>
      </div>
      <p className="mt-4 inline-flex items-start gap-2 rounded-2xl bg-mist px-4 py-2.5 text-sm text-ink-soft">
        <TransportIcon mode={step.arrival.mode} className="mt-0.5 shrink-0 text-sky" />
        <span>
          <strong className="text-ink">{step.arrival.mode} · </strong>
          {step.arrival.detail}
        </span>
      </p>

      <div className={`mt-6 grid gap-3 ${rest.length ? 'sm:grid-cols-3' : ''}`}>
        <TravelPhotoFrame photo={lead} className={`aspect-[16/10] rounded-[1.25rem] ${rest.length ? 'sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[22rem]' : ''}`} />
        {rest.slice(0, 2).map((photo) => (
          <TravelPhotoFrame key={photo} photo={photo} credit="short" className="aspect-[16/10] rounded-[1.25rem] sm:aspect-auto sm:min-h-[10.6rem]" />
        ))}
      </div>
      {rest.length > 2 && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {rest.slice(2).map((photo) => (
            <TravelPhotoFrame key={photo} photo={photo} credit="short" className="aspect-[16/9] rounded-[1.25rem]" />
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="story-text">{step.story}</p>
          <h4 className="mt-6 font-sans text-sm font-semibold text-ink">Activités et visites</h4>
          <ul className="mt-3 space-y-2">
            {step.activities.map((activity) => (
              <li key={activity} className="flex gap-2.5 text-ink-soft">
                <Check size={18} className="mt-0.5 shrink-0 text-lagoon" aria-hidden="true" />
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 lg:col-span-5">
          <div className="rounded-[var(--radius-card)] border border-lagoon/30 bg-lagoon/[0.07] p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Lightbulb size={17} className="text-lagoon" aria-hidden="true" /> Conseil : {step.tip.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.tip.detail}</p>
          </div>
          <ul className="space-y-2">
            {step.places.map((place) => (
              <PlaceItem key={place.name} place={place} />
            ))}
          </ul>
          <p className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm text-ink-soft border border-line">
            <span>Dépenses de l’étape</span>
            <strong className="tabular-nums text-ink">{formatEuros(stepTotal(step))}</strong>
          </p>
        </div>
      </div>
    </article>
  );
}

export default function CarnetDetailPage({ id }: { id: string }) {
  const carnet = getCarnet(id);
  const [selectedStep, setActiveStep] = useState(0);
  if (!carnet) return <NotFoundPage />;
  const activeStep = Math.min(selectedStep, carnet.steps.length - 1);

  const author = getTraveler(carnet.authorId);
  const cover = getPhoto(carnet.cover);
  const days = carnetDays(carnet);
  const expenses = carnetExpenses(carnet);
  const moreFromAuthor = carnetsByAuthor(carnet.authorId).filter((c) => c.id !== carnet.id);
  const allPlaces = carnet.steps.flatMap((step) => step.places.map((place) => ({ place, city: step.city })));

  return (
    <>
      {/* Couverture */}
      <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden bg-night pt-28 text-white">
        <img src={cover.src} alt={cover.alt} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/55 to-night/10" />
        <div className="container-wide pb-12 sm:pb-16">
          <nav aria-label="Fil d’Ariane" className="flex items-center gap-1.5 text-sm text-white/75">
            <SiteLink to="/carnets" className="hover:text-white">
              Carnets
            </SiteLink>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{carnet.country}</span>
          </nav>
          <p className="mt-4">
            <DemoTag>Carnet d’exemple fictif</DemoTag>
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">{carnet.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{carnet.summary}</p>
          {author && (
            <p className="mt-6 flex items-center gap-3">
              <TravelerAvatar traveler={author} size="md" />
              <span className="text-sm">
                Carnet de{' '}
                <SiteLink to={`/voyageurs/${author.id}`} className="font-semibold underline-offset-4 hover:underline">
                  {author.name}
                </SiteLink>
                <span className="block text-white/70">{author.handle}</span>
              </span>
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <LikeButton carnetId={carnet.id} />
            <SaveButton carnetId={carnet.id} />
            <ShareButton />
            <SiteLink to="#commentaires" className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
              <MessageCircle size={17} aria-hidden="true" /> Commenter
            </SiteLink>
          </div>
        </div>
        <span className="absolute bottom-2 right-4 text-[10px] text-white/70">
          {cover.place} · {photoCredit(cover)}
        </span>
      </section>

      {/* Sommaire collant */}
      <nav aria-label="Sections du carnet" className="sticky top-[72px] z-30 border-b border-line bg-white/92 backdrop-blur-xl">
        <ul className="container-wide no-scrollbar flex gap-1 overflow-x-auto py-2">
          {SECTIONS.map(([anchor, label]) => (
            <li key={anchor} className="shrink-0">
              <SiteLink to={`#${anchor}`} className="block rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft hover:bg-mist hover:text-ink">
                {label}
              </SiteLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Aperçu */}
      <section id="apercu" className="section-pad scroll-mt-32 bg-white" aria-labelledby="apercu-titre">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="apercu-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Le voyage en bref
            </h2>
            <p className="story-text mt-5">{carnet.summary}</p>
            <ul className="mt-6 space-y-3">
              {carnet.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-lg text-ink">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-lagoon to-violet" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5">
            <h3 className="font-sans text-sm font-semibold text-muted">Fiche du voyage</h3>
            <dl className="mt-3 divide-y divide-line rounded-[var(--radius-card)] border border-line">
              {[
                ['Destination', `${carnet.country} (${carnet.region})`],
                ['Période', carnet.period],
                ['Durée', plural(days, 'jour', 'jours')],
                ['Voyageurs', `${plural(carnet.travelers, 'personne', 'personnes')} · ${companionLabel(carnet.companion).toLowerCase()}`],
                ['Type de voyage', carnet.tripType],
                ['Rythme', carnet.pace],
                ['Rencontres', meetingsLabel(carnet.meetings)],
                ['Budget', `${formatEuros(perPerson(carnet))} par personne · ${budgetLevel(carnet).toLowerCase()}`],
              ].map(([term, value]) => (
                <div key={term} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted">{term}</dt>
                  <dd className="text-right font-medium text-ink">{value}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-muted">Transports</dt>
                <dd className="flex flex-wrap justify-end gap-2">
                  {transportsUsed(carnet).map((mode) => (
                    <span key={mode} className="tag">
                      <TransportIcon mode={mode} size={13} /> {mode}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Itinéraire */}
      <section id="itineraire" className="scroll-mt-32 bg-mist py-16 sm:py-20" aria-labelledby="itineraire-titre">
        <div className="container-wide">
          <h2 id="itineraire-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            L’itinéraire
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">Les étapes sont placées selon leurs coordonnées réelles. Sélectionne une étape pour la mettre en avant.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="overflow-hidden rounded-[1.5rem] bg-night p-3 sm:p-6 lg:col-span-8">
              <div className="aspect-[8/5]">
                <RouteMap steps={carnet.steps} activeIndex={activeStep} onSelect={setActiveStep} label={`Carte de l’itinéraire : ${carnet.steps.map((s) => s.city).join(', ')}`} />
              </div>
            </div>
            <ol className="space-y-2 lg:col-span-4">
              {carnet.steps.map((step, index) => (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => setActiveStep(index)}
                    aria-pressed={index === activeStep}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${index === activeStep ? 'border-sky/40 bg-white shadow-[var(--shadow-soft)]' : 'border-transparent hover:bg-white'}`}
                  >
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold ${index === activeStep ? 'bg-lagoon text-night' : 'bg-white text-ink border border-line'}`}>{index + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink">{step.city}</span>
                      <span className="flex items-center gap-1.5 text-xs text-muted">
                        <TransportIcon mode={step.arrival.mode} size={13} /> {step.arrival.mode} · {plural(step.days, 'jour', 'jours')}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <SiteLink to={`#etape-${carnet.steps[activeStep].id}`} className="btn-ghost">
                  Lire l’étape « {carnet.steps[activeStep].city} »
                </SiteLink>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section id="etapes" className="section-pad scroll-mt-32 bg-white" aria-labelledby="etapes-titre">
        <div className="container-wide">
          <h2 id="etapes-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Les étapes, une par une
          </h2>
          <div className="mt-10 space-y-14">
            {carnet.steps.map((step, index) => (
              <StepArticle key={step.id} carnet={carnet} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Budget */}
      <section id="budget" className="scroll-mt-32 bg-night py-16 text-white sm:py-20" aria-labelledby="budget-titre">
        <div className="container-wide grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="budget-titre" className="font-display text-3xl font-semibold sm:text-4xl">
              Ce que le voyage a coûté
            </h2>
            <p className="mt-4 leading-relaxed text-white/75">Les dépenses sont notées à chaque étape puis additionnées en cinq catégories. {carnet.budgetNote}</p>
            <table className="mt-8 w-full text-sm">
              <caption className="sr-only">Dépenses par étape</caption>
              <thead>
                <tr className="text-left text-white/60">
                  <th scope="col" className="pb-2 font-medium">Étape</th>
                  <th scope="col" className="pb-2 text-right font-medium">Jours</th>
                  <th scope="col" className="pb-2 text-right font-medium">Dépenses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {carnet.steps.map((step) => (
                  <tr key={step.id}>
                    <th scope="row" className="py-2.5 text-left font-medium text-white">{step.city}</th>
                    <td className="py-2.5 text-right tabular-nums text-white/80">{step.days}</td>
                    <td className="py-2.5 text-right tabular-nums text-white">{formatEuros(stepTotal(step))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-[1.5rem] bg-white/5 p-5 sm:p-7 lg:col-span-7">
            <BudgetBreakdown expenses={expenses} travelers={carnet.travelers} days={days} note={carnet.budgetNote} tone="dark" />
          </div>
        </div>
      </section>

      {/* Adresses */}
      <section id="adresses" className="section-pad scroll-mt-32 bg-mist" aria-labelledby="adresses-titre">
        <div className="container-wide">
          <h2 id="adresses-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Hébergements, restaurants et lieux
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">Des types d’adresses décrits par le voyageur, sans établissement mis en avant : le carnet est un exemple.</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {(['hebergement', 'restaurant', 'lieu'] as const).map((kind) => {
              const items = allPlaces.filter(({ place }) => place.kind === kind);
              if (items.length === 0) return null;
              return (
                <div key={kind}>
                  <h3 className="flex items-center gap-2 font-sans text-base font-semibold text-ink">
                    <span className="text-sky">{PLACE_ICON[kind]}</span> {kind === 'hebergement' ? 'Hébergements' : kind === 'restaurant' ? 'Restaurants' : 'Lieux'}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {items.map(({ place, city }) => (
                      <PlaceItem key={`${city}-${place.name}`} place={place} stepCity={city} />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conseils */}
      <section id="conseils" className="section-pad scroll-mt-32 bg-white" aria-labelledby="conseils-titre">
        <div className="container-wide">
          <h2 id="conseils-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Les conseils de terrain
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {carnet.steps.map((step, index) => (
              <li key={step.id} className="rounded-[var(--radius-card)] border border-line p-5">
                <p className="flex items-center gap-2 text-xs font-medium text-muted">
                  <MapPin size={13} aria-hidden="true" /> Étape {index + 1} · {step.city}
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-ink">{step.tip.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.tip.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Commentaires */}
      <section id="commentaires" className="section-pad scroll-mt-32 bg-mist" aria-labelledby="commentaires-titre">
        <div className="container-text">
          <h2 id="commentaires-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Questions et échanges
          </h2>
          <p className="mt-3 text-ink-soft">Dans l’application, les voyageurs pourront poser leurs questions directement sous un carnet.</p>
          <div className="mt-8">
            <CommentsSection carnet={carnet} />
          </div>
        </div>
      </section>

      {/* Auteur et suite */}
      <section className="section-pad bg-white" aria-labelledby="suite-titre">
        <div className="container-wide">
          {author && (
            <div className="mb-14 flex flex-col gap-5 rounded-[1.5rem] border border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-center gap-4">
                <TravelerAvatar traveler={author} size="lg" />
                <div>
                  <p className="font-display text-2xl font-semibold text-ink">{author.name}</p>
                  <p className="text-sm text-muted">{author.label}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <FollowButton travelerId={author.id} name={author.name} />
                <SiteLink to={`/voyageurs/${author.id}`} className="btn-secondary">
                  Voir le profil
                </SiteLink>
              </div>
            </div>
          )}
          {moreFromAuthor.length > 0 && author && (
            <>
              <h2 className="font-display text-3xl font-semibold text-ink">Les autres carnets de {author.name}</h2>
              <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {moreFromAuthor.map((other) => (
                  <CarnetCard key={other.id} carnet={other} />
                ))}
              </div>
            </>
          )}
          <h2 id="suite-titre" className="mt-16 font-display text-3xl font-semibold text-ink">
            Des carnets proches
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {similarCarnets(carnet).map((other) => (
              <CarnetCard key={other.id} carnet={other} />
            ))}
          </div>
          <DemoNote className="mt-12">
            Carnet d’exemple fictif créé pour présenter le format Wayorbi. Les lieux et transports sont réels, mais le voyage, le voyageur et les budgets sont illustratifs. Photos : Wikimedia Commons, voir les{' '}
            <SiteLink to="/credits" className="underline">
              crédits photos
            </SiteLink>
            .
          </DemoNote>
        </div>
      </section>
    </>
  );
}
