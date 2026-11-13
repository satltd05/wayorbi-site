import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Compass, MapPin, Navigation, Wallet } from 'lucide-react';
import { CONCEPT_JOURNEYS, type JourneyStep } from '../data/wayorbiConceptData';
import { getPhoto, JOURNEY_COVERS, STEP_PHOTOS } from '../data/travelPhotos';
import TravelPhotoFrame, { photoCredit } from './TravelPhotoFrame';

/** Galerie de l'étape : une grande photo et des vignettes pour passer de l'une à l'autre. */
function StepGallery({ stepId, city }: { stepId: string; city: string }) {
  const photos = (STEP_PHOTOS[stepId] ?? []).map(getPhoto);
  const [activeIndex, setActiveIndex] = useState(0);
  if (photos.length === 0) return null;
  const current = photos[activeIndex] ?? photos[0];

  return (
    <div className="space-y-2.5">
      <TravelPhotoFrame photo={current} className="aspect-[16/10] w-full rounded-2xl shadow-[0_10px_28px_rgba(17,24,39,0.12)]" />
      {photos.length > 1 && (
        <div role="group" aria-label={`Photos de l'étape ${city}`} className="grid grid-cols-3 gap-2">
          {photos.map((photo, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                aria-label={`Afficher la photo ${index + 1} : ${photo.place}`}
                className={`relative aspect-[16/10] overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-[#F7F9FC] transition-all focus-visible:outline-none focus-visible:ring-[#4A8FF5] ${
                  isActive ? 'ring-[#4A8FF5]' : 'ring-transparent opacity-70 hover:opacity-100'
                }`}
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

function buildCurvePath(steps: JourneyStep[]): string {
  if (steps.length < 2) return '';
  const pts = steps.map((s) => ({ x: s.mapX * 8, y: s.mapY * 5 }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const midX = (p0.x + p1.x) / 2;
    const midY = (p0.y + p1.y) / 2 - 28;
    d += ` Q ${midX} ${midY}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export default function InteractiveJournalSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(CONCEPT_JOURNEYS[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const journey = useMemo(
    () => CONCEPT_JOURNEYS.find((j) => j.id === selectedJourneyId) ?? CONCEPT_JOURNEYS[0],
    [selectedJourneyId],
  );

  const activeStep = journey.steps[activeStepIndex] ?? journey.steps[0];
  const pathD = useMemo(() => buildCurvePath(journey.steps), [journey.steps]);

  const stepBudgetTotal =
    activeStep.budget.hebergement +
    activeStep.budget.transport +
    activeStep.budget.repas +
    activeStep.budget.activites;

  const journeyTotalBudget = useMemo(
    () =>
      journey.steps.reduce(
        (acc, s) => acc + s.budget.hebergement + s.budget.transport + s.budget.repas + s.budget.activites,
        0,
      ),
    [journey.steps],
  );

  const handleSelectJourney = (id: string) => {
    setSelectedJourneyId(id);
    setActiveStepIndex(0);
  };

  const handlePrevStep = () => {
    setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : journey.steps.length - 1));
  };

  const handleNextStep = () => {
    setActiveStepIndex((prev) => (prev < journey.steps.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="carnets" className="bg-white text-[#111827] py-20 sm:py-24 lg:py-28 border-t border-[#E4E9F1]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold text-[#5468DC]">
              Aperçu interactif du concept
            </p>
            <h2
              className="font-display font-bold tracking-tight text-[#111827] text-3xl sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Un carnet de voyage vivant, relié à sa carte et à son budget réel
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              Explorez ces exemples de carnets Wayorbi pour voir comment chaque étape associe tracé géographique, récit, conseils pratiques et dépenses documentées.
            </p>
          </div>
        </motion.div>

        {/* Choix du carnet : une carte photo par exemple */}
        <div role="tablist" aria-label="Choisir un exemple de carnet" className="grid grid-cols-3 gap-3 sm:gap-5 mb-8">
          {CONCEPT_JOURNEYS.map((item) => {
            const isSelected = item.id === journey.id;
            const cover = getPhoto(JOURNEY_COVERS[item.id]);
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => handleSelectJourney(item.id)}
                className={`group relative h-28 sm:h-44 lg:h-52 overflow-hidden rounded-[18px] text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5] focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'ring-2 ring-[#4A8FF5] ring-offset-2 shadow-[0_14px_32px_rgba(74,143,245,0.28)]'
                    : 'opacity-80 hover:opacity-100 hover:-translate-y-0.5 shadow-[0_6px_20px_rgba(17,24,39,0.08)]'
                }`}
              >
                <img
                  src={cover.src}
                  alt=""
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0D1736]/85 via-[#0D1736]/20 to-transparent" />
                <span className="hidden sm:block absolute top-2 right-3 text-[10px] font-medium text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,.6)]">
                  {photoCredit(cover)}
                </span>
                <span className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-white">
                  <span className="block font-display text-base sm:text-2xl font-bold leading-tight">{item.country}</span>
                  <span className="hidden sm:block text-xs sm:text-sm text-white/85 mt-1 truncate">
                    {item.title} · {item.totalDays} jours
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Map + Journal split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Interactive Cartographic Canvas */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:sticky lg:top-28 flex flex-col justify-between rounded-[20px] bg-[#0D1736] text-white border border-[#1E2E5C] overflow-hidden shadow-[0_12px_36px_rgba(17,24,39,0.10)]"
          >
            {/* Map Top Metadata Bar */}
            <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {journey.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {journey.totalDays} jours <span aria-hidden="true">·</span> {journey.season}{' '}
                  <span aria-hidden="true">·</span> {journey.steps.length} étapes illustrées
                </p>
              </div>
              <div className="font-mono text-xs text-cyan-300 tabular-nums">
                {activeStep.coordinates}
              </div>
            </div>

            {/* Interactive SVG Map Canvas */}
            <div className="relative flex-1 min-h-[320px] sm:min-h-[380px] p-4 sm:p-6 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 28% 32%, rgba(74,143,245,0.22), transparent 55%), radial-gradient(circle at 75% 68%, rgba(184,158,222,0.20), transparent 55%)',
                }}
              />

              <svg
                viewBox="0 0 800 500"
                className="w-full h-full max-h-[400px] overflow-visible select-none"
                role="img"
                aria-label={`Carte interactive de l'itinéraire ${journey.title}`}
              >
                <defs>
                  <linearGradient id={`routeGrad-${journey.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="50%" stopColor="#4A8FF5" />
                    <stop offset="100%" stopColor="#B89EDE" />
                  </linearGradient>
                </defs>

                {[100, 200, 300, 400].map((y) => (
                  <line
                    key={`h-${y}`}
                    x1="20"
                    y1={y}
                    x2="780"
                    y2={y}
                    stroke="rgba(184,205,248,0.10)"
                    strokeDasharray="4 6"
                  />
                ))}
                {[160, 320, 480, 640].map((x) => (
                  <line
                    key={`v-${x}`}
                    x1={x}
                    y1="20"
                    x2={x}
                    y2="480"
                    stroke="rgba(184,205,248,0.10)"
                    strokeDasharray="4 6"
                  />
                ))}

                <path
                  d="M 70 390 Q 240 310, 410 360 T 730 290"
                  fill="none"
                  stroke="rgba(74,143,245,0.14)"
                  strokeWidth="1.5"
                />
                <path
                  d="M 110 150 Q 320 90, 500 175 T 710 120"
                  fill="none"
                  stroke="rgba(184,158,222,0.14)"
                  strokeWidth="1.5"
                />

                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(184,205,248,0.22)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <motion.path
                  key={journey.id}
                  d={pathD}
                  fill="none"
                  stroke={`url(#routeGrad-${journey.id})`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? false : { pathLength: 0.15, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />

                {journey.steps.map((step, index) => {
                  const cx = step.mapX * 8;
                  const cy = step.mapY * 5;
                  const isActive = index === activeStepIndex;

                  return (
                    <g
                      key={step.id}
                      onClick={() => setActiveStepIndex(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveStepIndex(index);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Sélectionner l'étape ${step.order} : ${step.city}`}
                      aria-pressed={isActive}
                      className="cursor-pointer focus:outline-none"
                    >
                      {isActive && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={26}
                          fill="rgba(74,143,245,0.22)"
                          stroke="rgba(110,231,249,0.65)"
                          strokeWidth="1.5"
                        />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? 15 : 12}
                        fill={isActive ? '#22D3EE' : '#16244D'}
                        stroke={isActive ? '#FFFFFF' : '#93C5FD'}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      <text
                        x={cx}
                        y={cy + 4}
                        textAnchor="middle"
                        className="font-mono text-[11px] font-semibold"
                        fill={isActive ? '#0D1736' : '#E2E8F0'}
                      >
                        {step.order}
                      </text>
                      <text
                        x={cx}
                        y={cy + 34}
                        textAnchor="middle"
                        className="font-display text-[14px] font-semibold"
                        fill={isActive ? '#FFFFFF' : '#CBD5E1'}
                      >
                        {step.city}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Step Navigation Strip */}
            <div className="px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.03]">
              <div className="flex items-center gap-2 overflow-x-auto">
                {journey.steps.map((step, idx) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      idx === activeStepIndex
                        ? 'bg-gradient-to-r from-[#4A8FF5]/35 to-[#8C7EE6]/35 text-white border border-cyan-300/45'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {`0${step.order}. ${step.city}`}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  aria-label="Étape précédente"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-slate-200 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  aria-label="Étape suivante"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-slate-200 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Active Journal Step & Real Budget Breakdown */}
          <div className="lg:col-span-5 flex">
            <AnimatePresence mode="wait">
              <motion.article
                key={`${journey.id}-${activeStep.id}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-[20px] bg-[#F7F9FC] border border-[#E4E9F1] p-6 sm:p-7 flex flex-col justify-between gap-6"
              >
                <div className="space-y-5">
                  <StepGallery stepId={activeStep.id} city={activeStep.city} />

                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-[#4B5563]">
                    <span className="font-mono font-semibold text-[#5468DC] tabular-nums">
                      Étape 0{activeStep.order} / 0{journey.steps.length}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeStep.region}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeStep.duration}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#111827] flex items-center gap-2.5">
                      <MapPin className="w-5 h-5 text-[#4A8FF5] shrink-0" aria-hidden="true" />
                      <span>{activeStep.city}</span>
                    </h3>
                    <p className="mt-1.5 text-sm text-[#4B5563] flex items-center gap-2">
                      <Navigation className="w-3.5 h-3.5 text-[#6E85EF] shrink-0" aria-hidden="true" />
                      <span>{activeStep.transport}</span>
                    </p>
                  </div>

                  <p className="text-[#374151] leading-relaxed text-[15px]">
                    {activeStep.story}
                  </p>

                  <div className="rounded-xl bg-white border border-[#E4E9F1] p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#111827]">
                      <Compass className="w-4 h-4 text-[#4A8FF5] shrink-0" aria-hidden="true" />
                      <span>Conseil de terrain : {activeStep.tipTitle}</span>
                    </div>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                      {activeStep.tipDetail}
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#E4E9F1] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
                      <Wallet className="w-4 h-4 text-[#8C7EE6]" aria-hidden="true" />
                      <span>Budget indicatif de l’étape</span>
                    </div>
                    <span className="font-mono text-base font-semibold text-[#111827] tabular-nums">
                      {stepBudgetTotal} €
                    </span>
                  </div>

                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center justify-between text-[#4B5563]">
                      <dt>Hébergement</dt>
                      <dd className="font-mono font-medium text-[#111827] tabular-nums">
                        {activeStep.budget.hebergement} €
                      </dd>
                    </div>
                    <div className="flex items-center justify-between text-[#4B5563]">
                      <dt>Transport</dt>
                      <dd className="font-mono font-medium text-[#111827] tabular-nums">
                        {activeStep.budget.transport} €
                      </dd>
                    </div>
                    <div className="flex items-center justify-between text-[#4B5563]">
                      <dt>Repas</dt>
                      <dd className="font-mono font-medium text-[#111827] tabular-nums">
                        {activeStep.budget.repas} €
                      </dd>
                    </div>
                    <div className="flex items-center justify-between text-[#4B5563]">
                      <dt>Activités</dt>
                      <dd className="font-mono font-medium text-[#111827] tabular-nums">
                        {activeStep.budget.activites} €
                      </dd>
                    </div>
                  </dl>

                  <div className="pt-2 border-t border-[#E4E9F1] flex items-center justify-between text-xs text-[#4B5563]">
                    <span>Total cumulé sur l’exemple complet ({journey.totalDays} jours)</span>
                    <span className="font-mono font-semibold text-[#5468DC] tabular-nums">
                      {journeyTotalBudget} €
                    </span>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
