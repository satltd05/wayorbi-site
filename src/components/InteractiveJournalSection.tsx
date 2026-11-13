import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Lightbulb, MapPin, Wallet } from 'lucide-react';
import { CARNETS, type CarnetStep } from '../data/carnets';
import { getPhoto } from '../data/travelPhotos';
import { carnetDays, carnetTotal, EXPENSE_CATEGORIES, stepTotal } from '../lib/carnets';
import { formatEuros, plural } from '../lib/format';
import TravelPhotoFrame, { photoCredit } from './TravelPhotoFrame';
import TransportIcon from './TransportIcon';
import RouteMap from './RouteMap';
import { SiteLink } from './SiteLink';

const FEATURED = CARNETS.filter((carnet) => carnet.featured);

/** Galerie de l'étape : une grande photo et des vignettes pour passer de l'une à l'autre. */
function StepGallery({ step }: { step: CarnetStep }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = step.photos;
  const current = photos[Math.min(activeIndex, photos.length - 1)];

  return (
    <div className="space-y-2.5">
      <TravelPhotoFrame photo={current} className="aspect-[16/10] w-full rounded-2xl shadow-[var(--shadow-soft)]" />
      {photos.length > 1 && (
        <div role="group" aria-label={`Photos de l’étape ${step.city}`} className="grid grid-cols-4 gap-2">
          {photos.map((id, index) => {
            const photo = getPhoto(id);
            const isActive = index === activeIndex;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                aria-label={`Afficher la photo ${index + 1} : ${photo.place}`}
                className={`relative aspect-[16/10] overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-mist transition-all focus-visible:outline-none focus-visible:ring-sky ${isActive ? 'ring-sky' : 'ring-transparent opacity-70 hover:opacity-100'}`}
              >
                <img src={photo.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Aperçu interactif d'un carnet : carte de l'itinéraire, étapes, photos et budget de chaque étape. */
export default function InteractiveJournalSection() {
  const reduceMotion = useReducedMotion();
  const [carnetId, setCarnetId] = useState(FEATURED[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const carnet = FEATURED.find((c) => c.id === carnetId) ?? FEATURED[0];
  const step = carnet.steps[Math.min(stepIndex, carnet.steps.length - 1)];
  const select = (id: string) => {
    setCarnetId(id);
    setStepIndex(0);
  };
  const go = (delta: number) => setStepIndex((i) => (i + delta + carnet.steps.length) % carnet.steps.length);

  return (
    <section id="carnets" className="section-pad scroll-mt-20 bg-white" aria-labelledby="carnet-interactif-titre">
      <div className="container-wide">
        <div className="mb-10 max-w-3xl">
          <h2 id="carnet-interactif-titre" className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.6rem]">
            Un carnet relie chaque étape à sa carte, ses photos et ses dépenses
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">Choisis un carnet d’exemple, puis parcours ses étapes sur la carte.</p>
        </div>

        <div role="group" aria-label="Choisir un carnet d’exemple" className="mb-8 grid grid-cols-3 gap-3 sm:gap-5">
          {FEATURED.map((item) => {
            const selected = item.id === carnet.id;
            const cover = getPhoto(item.cover);
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => select(item.id)}
                className={`group relative h-28 overflow-hidden rounded-[1.25rem] text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 sm:h-44 lg:h-52 ${
                  selected ? 'ring-2 ring-sky ring-offset-2 shadow-[var(--shadow-glow)]' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <img src={cover.src} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
                <span className="absolute right-3 top-2 hidden text-[10px] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,.6)] sm:block">{photoCredit(cover)}</span>
                <span className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5">
                  <span className="block font-display text-base font-semibold leading-tight sm:text-2xl">{item.country}</span>
                  <span className="mt-1 hidden truncate text-sm text-white/85 sm:block">
                    {item.title} · {plural(carnetDays(item), 'jour', 'jours')}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="overflow-hidden rounded-[1.5rem] bg-night text-white lg:sticky lg:top-28 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <h3 className="font-display text-xl font-semibold">{carnet.title}</h3>
                <p className="text-sm text-white/70">
                  {plural(carnetDays(carnet), 'jour', 'jours')} · {carnet.period} · {plural(carnet.steps.length, 'étape', 'étapes')}
                </p>
              </div>
              <p className="text-sm text-white/70">
                Total : <strong className="text-white">{formatEuros(carnetTotal(carnet))}</strong> pour {carnet.travelers}
              </p>
            </div>
            <div className="aspect-[8/5] p-2 sm:p-4">
              <RouteMap steps={carnet.steps} activeIndex={stepIndex} onSelect={setStepIndex} label={`Carte de l’itinéraire ${carnet.title}`} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-6">
              <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
                {carnet.steps.map((s, index) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStepIndex(index)}
                    aria-pressed={index === stepIndex}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${index === stepIndex ? 'bg-white text-night' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}
                  >
                    {index + 1}. {s.city}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Étape précédente" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:bg-white/10">
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Étape suivante" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:bg-white/10">
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.article
                key={`${carnet.id}-${step.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-[1.5rem] border border-line bg-mist p-5 sm:p-6"
                aria-live="polite"
              >
                <StepGallery step={step} />
                <p className="mt-5 text-sm text-muted">
                  Étape {stepIndex + 1} sur {carnet.steps.length} · {step.area} · {plural(step.days, 'jour', 'jours')}
                </p>
                <h3 className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold text-ink">
                  <MapPin size={20} className="text-sky" aria-hidden="true" /> {step.city}
                </h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
                  <TransportIcon mode={step.arrival.mode} className="mt-0.5 shrink-0 text-indigo" /> {step.arrival.detail}
                </p>
                <p className="mt-4 leading-relaxed text-ink-soft">{step.story}</p>
                <div className="mt-4 rounded-2xl border border-line bg-white p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Lightbulb size={16} className="text-lagoon" aria-hidden="true" /> {step.tip.title}
                  </p>
                  <p className="mt-1.5 text-sm text-ink-soft">{step.tip.detail}</p>
                </div>
                <div className="mt-4 border-t border-line pt-4">
                  <p className="flex items-center justify-between text-sm font-semibold text-ink">
                    <span className="flex items-center gap-2">
                      <Wallet size={16} className="text-violet" aria-hidden="true" /> Dépenses de l’étape
                    </span>
                    <span className="tabular-nums">{formatEuros(stepTotal(step))}</span>
                  </p>
                  <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                    {EXPENSE_CATEGORIES.map(({ key, label }) => (
                      <div key={key} className="flex justify-between text-ink-soft">
                        <dt>{label}</dt>
                        <dd className="tabular-nums text-ink">{formatEuros(step.budget[key])}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <SiteLink to={`/carnets/${carnet.id}#etape-${step.id}`} className="btn-primary mt-6 w-full">
                  Ouvrir le carnet complet <ArrowRight size={17} aria-hidden="true" />
                </SiteLink>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
