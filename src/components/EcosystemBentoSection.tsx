import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Bookmark, Check } from 'lucide-react';
import { ECOSYSTEM_PILLARS, type TravelPace } from '../data/wayorbiConceptData';

const TIMELINE_PHASES = [
  {
    id: 'prepare',
    label: 'Avant le départ',
    summary:
      'Collectez des étapes inspirantes issues d’autres carnets, comparez les saisons et estimez un budget réaliste selon votre rythme.',
    detail: 'Envies de voyage · Estimation par poste · Période conseillée',
  },
  {
    id: 'during',
    label: 'Pendant le voyage',
    summary:
      'Ajoutez vos récits, photos et dépenses directement à chaque halte pour conserver un carnet structuré au fil de la route.',
    detail: 'Notes géolocalisées · Tracé continu · Suivi des dépenses sur place',
  },
  {
    id: 'after',
    label: 'Au retour',
    summary:
      'Partagez un carnet complet avec vos proches ou la communauté Wayorbi, avec vos conseils pratiques directement reliés aux étapes.',
    detail: 'Carnet consultable · Bons plans de terrain · Bilan budgétaire clair',
  },
];

const TRAVEL_PROFILES = [
  {
    id: 'nature',
    label: 'Nature & randonnée',
    paceLabel: 'Rythme modéré · Étapes de 2 à 3 jours',
    focus: 'Sentiers balisés, refuges accessibles en transport public et conseils d’équipement de saison.',
    wishlist: 'Fjords de Norvège · Dolomites · Alpes juliennes',
  },
  {
    id: 'rail',
    label: 'Train & itinérance',
    paceLabel: 'Rythme fluide · Correspondances optimisées',
    focus: 'Boucles sans voiture, pass ferroviaires régionaux et hébergements proches des gares.',
    wishlist: 'Écosse en rail · Japon alpin · Côte Atlantique',
  },
  {
    id: 'culture',
    label: 'Culture & adresses locales',
    paceLabel: 'Rythme curieux · Quartiers et marchés',
    focus: 'Créneaux calmes pour les visites, petites tables locales et répartition transparente des coûts.',
    wishlist: 'Andalousie · Kyoto · Porto & Lisbonne',
  },
];

const COMMUNITY_STOPS = [
  {
    id: 'save-1',
    title: 'Traversée en ferry Myrdal – Flåm',
    meta: 'Norvège · 1 journée · Transport & rando',
  },
  {
    id: 'save-2',
    title: 'Boucle pédestre sur la Costa Vicentina',
    meta: 'Portugal · 2 jours · Sentier côtier',
  },
  {
    id: 'save-3',
    title: 'Nuit en minshuku dans les Alpes japonaises',
    meta: 'Japon · 1 nuit · Budget transparent',
  },
];

const PACE_DAILY_COST: Record<TravelPace, { label: string; lodging: number; food: number; transport: number }> = {
  economique: { label: 'Économique', lodging: 32, food: 22, transport: 16 },
  equilibre: { label: 'Équilibré', lodging: 68, food: 34, transport: 24 },
  confort: { label: 'Confort', lodging: 135, food: 54, transport: 36 },
};

export default function EcosystemBentoSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activePhase, setActivePhase] = useState(TIMELINE_PHASES[1].id);
  const [pace, setPace] = useState<TravelPace>('equilibre');
  const [days, setDays] = useState<number>(10);
  const [activeProfileId, setActiveProfileId] = useState(TRAVEL_PROFILES[0].id);
  const [savedStops, setSavedStops] = useState<string[]>(['save-1']);

  const currentPhase = TIMELINE_PHASES.find((p) => p.id === activePhase) ?? TIMELINE_PHASES[0];
  const currentProfile =
    TRAVEL_PROFILES.find((p) => p.id === activeProfileId) ?? TRAVEL_PROFILES[0];

  const budgetEstimate = useMemo(() => {
    const base = PACE_DAILY_COST[pace];
    const lodging = base.lodging * days;
    const food = base.food * days;
    const transport = base.transport * days;
    return {
      lodging,
      food,
      transport,
      total: lodging + food + transport,
    };
  }, [pace, days]);

  const toggleSaveStop = (id: string) => {
    setSavedStops((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section
      id="concept"
      className="bg-[#F2F5F9] text-[#111827] py-20 sm:py-24 lg:py-28 border-t border-[#E4E9F1]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-3 mb-12"
        >
          <p className="text-sm font-semibold text-[#5468DC]">
            Le concept Wayorbi
          </p>
          <h2
            className="font-display font-bold tracking-tight text-[#111827] text-3xl sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Un espace pensé autour du profil voyageur, des itinéraires et du partage réel
          </h2>
          <p className="text-base text-[#4B5563] leading-relaxed">
            Plutôt que de disperser vos souvenirs, vos trajets et vos dépenses entre plusieurs outils, Wayorbi articule chaque voyage autour d’un carnet clair et d’un profil de voyageur personnalisé.
          </p>
        </motion.div>

        {/* Asymmetric Bento Grid */}
        <div id="profil" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 01 (col-span-2): Carnets interactifs */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 rounded-[20px] bg-white border border-[#E4E9F1] p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-[0_6px_20px_rgba(17,24,39,0.05)]"
          >
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111827]">
                {ECOSYSTEM_PILLARS[0].number}. {ECOSYSTEM_PILLARS[0].title}
              </h3>
              <p className="text-[#4B5563] leading-relaxed">
                {ECOSYSTEM_PILLARS[0].description}
              </p>
            </div>

            <div className="space-y-4">
              <div
                role="tablist"
                aria-label="Moments d'utilisation d'un carnet"
                className="flex flex-wrap gap-2"
              >
                {TIMELINE_PHASES.map((phase) => {
                  const selected = phase.id === activePhase;
                  return (
                    <button
                      key={phase.id}
                      role="tab"
                      type="button"
                      aria-selected={selected}
                      onClick={() => setActivePhase(phase.id)}
                      className={`min-h-[40px] px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5] ${
                        selected
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#6E85EF] text-white shadow-sm'
                          : 'bg-[#F2F5F9] text-[#4B5563] border border-[#E4E9F1] hover:text-[#111827]'
                      }`}
                    >
                      {phase.label}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-xl bg-[#F7F9FC] border border-[#E4E9F1] p-5 space-y-2">
                <p className="text-[#111827] text-[15px] leading-relaxed">
                  {currentPhase.summary}
                </p>
                <p className="text-xs text-[#5468DC] font-medium">{currentPhase.detail}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 02 (col-span-1): Budgets réels simulator */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 rounded-[20px] bg-gradient-to-br from-[#0F1B3D] via-[#172554] to-[#28205C] text-white border border-[#2C3E7B] p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-[0_12px_32px_rgba(37,99,235,0.16)]"
          >
            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold text-white">
                {ECOSYSTEM_PILLARS[1].number}. {ECOSYSTEM_PILLARS[1].title}
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Aperçu de la ventilation budgétaire selon le niveau de confort choisi.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white/10">
                {(['economique', 'equilibre', 'confort'] as TravelPace[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPace(mode)}
                    className={`min-h-[38px] px-2 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      pace === mode
                        ? 'bg-white text-[#111827]'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {PACE_DAILY_COST[mode].label}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-200 mb-1.5">
                  <label htmlFor="duration-range">Durée du séjour</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{days} jours</span>
                </div>
                <input
                  id="duration-range"
                  type="range"
                  min={4}
                  max={21}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-cyan-300 cursor-pointer"
                />
              </div>

              <div className="pt-3 border-t border-white/15 space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-200">
                  <span>Hébergement</span>
                  <span className="font-mono tabular-nums">{budgetEstimate.lodging} €</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Repas & vie locale</span>
                  <span className="font-mono tabular-nums">{budgetEstimate.food} €</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Transports sur place</span>
                  <span className="font-mono tabular-nums">{budgetEstimate.transport} €</span>
                </div>
                <div className="pt-2 border-t border-white/15 flex justify-between items-baseline">
                  <span className="font-medium text-white">Total estimatif</span>
                  <span className="font-mono text-lg font-semibold text-cyan-300 tabular-nums">
                    {budgetEstimate.total} €
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 03 (col-span-1): Profil voyageur & envies (inspired by #/profil) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 rounded-[20px] bg-white border border-[#E4E9F1] p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-[0_6px_20px_rgba(17,24,39,0.05)]"
          >
            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold text-[#111827]">
                {ECOSYSTEM_PILLARS[2].number}. Profil & style de voyage
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Votre profil reflète votre façon de voyager et rassemble les destinations qui vous inspirent.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {TRAVEL_PROFILES.map((profile) => (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setActiveProfileId(profile.id)}
                    className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5] ${
                      activeProfileId === profile.id
                        ? 'bg-[#5468DC] text-white'
                        : 'bg-[#F2F5F9] text-[#4B5563] border border-[#E4E9F1] hover:text-[#111827]'
                    }`}
                  >
                    {profile.label}
                  </button>
                ))}
              </div>

              <div className="rounded-xl bg-[#F7F9FC] border border-[#E4E9F1] p-4 space-y-2">
                <p className="text-xs font-semibold text-[#5468DC]">{currentProfile.paceLabel}</p>
                <p className="text-sm text-[#374151] leading-relaxed">{currentProfile.focus}</p>
                <p className="text-xs text-[#4B5563] pt-1 border-t border-[#E4E9F1]">
                  Envies associées : {currentProfile.wishlist}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 04 (col-span-2): Communauté & sauvegarde d'étapes */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 rounded-[20px] bg-white border border-[#E4E9F1] p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-[0_6px_20px_rgba(17,24,39,0.05)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111827]">
                  {ECOSYSTEM_PILLARS[3].number}. {ECOSYSTEM_PILLARS[3].title}
                </h3>
                <p className="text-[#4B5563] leading-relaxed">
                  {ECOSYSTEM_PILLARS[3].description}
                </p>
              </div>
              <div className="text-sm font-semibold text-[#5468DC] font-mono tabular-nums shrink-0">
                {savedStops.length} étape{savedStops.length > 1 ? 's' : ''} retenue{savedStops.length > 1 ? 's' : ''}
              </div>
            </div>

            <div className="divide-y divide-[#E4E9F1] rounded-xl bg-[#F7F9FC] border border-[#E4E9F1]">
              {COMMUNITY_STOPS.map((stop) => {
                const isSaved = savedStops.includes(stop.id);
                return (
                  <div
                    key={stop.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-medium text-[#111827] text-sm sm:text-base">
                        {stop.title}
                      </p>
                      <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">{stop.meta}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSaveStop(stop.id)}
                      aria-pressed={isSaved}
                      className={`inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5] ${
                        isSaved
                          ? 'bg-[#6E85EF]/15 text-[#5468DC] border border-[#6E85EF]/35'
                          : 'bg-white text-[#4B5563] border border-[#E4E9F1] hover:text-[#111827]'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Enregistrée</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Garder l’étape</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
