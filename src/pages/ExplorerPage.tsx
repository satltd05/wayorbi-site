import { useId, useMemo } from 'react';
import { Lightbulb, RotateCcw, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CARNETS, type Carnet, type Interest, type TransportMode, type TripType } from '../data/carnets';
import { TRAVELERS } from '../data/travelers';
import { allTips, carnetDays, carnetHaystack, matchesQuery, perPerson, transportsUsed } from '../lib/carnets';
import { normalizeText, plural } from '../lib/format';
import { navigate, useLocation } from '../lib/router';
import { useDemoState } from '../lib/demoStore';
import { isValidDna, scoreCarnet } from '../lib/dna';
import CarnetCard from '../components/CarnetCard';
import TravelerCard from '../components/TravelerCard';
import { SiteLink } from '../components/SiteLink';
import DemoNote from '../components/DemoNote';
import { photoCredit } from '../components/TravelPhotoFrame';
import { getPhoto } from '../data/travelPhotos';

const BUDGETS = [
  { value: 'moins-600', label: 'Moins de 600 €', test: (v: number) => v < 600 },
  { value: '600-1000', label: '600 à 1 000 €', test: (v: number) => v >= 600 && v <= 1000 },
  { value: 'plus-1000', label: 'Plus de 1 000 €', test: (v: number) => v > 1000 },
];
const DURATIONS = [
  { value: 'court', label: '6 jours ou moins', test: (d: number) => d <= 6 },
  { value: 'moyen', label: '7 à 10 jours', test: (d: number) => d >= 7 && d <= 10 },
  { value: 'long', label: '11 jours et plus', test: (d: number) => d >= 11 },
];
const TYPES: TripType[] = ['Découverte & tourisme', 'Nature & aventure', 'Détente'];
const TRANSPORTS: TransportMode[] = ['Train', 'Bus', 'Voiture', 'Avion', 'Bateau'];
const INTERESTS: Interest[] = ['Nature & aventure', 'Culture & visites', 'Gastronomie', 'Détente'];
const SORTS = [
  { value: 'pertinence', label: 'Pertinence' },
  { value: 'dna', label: 'Selon mon Travel DNA' },
  { value: 'duree', label: 'Durée, du plus court au plus long' },
  { value: 'budget', label: 'Budget par personne, croissant' },
];
const COUNTRIES = [...new Set(CARNETS.map((c) => c.country))].sort((a, b) => a.localeCompare(b, 'fr'));
const FILTER_KEYS = ['q', 'dest', 'budget', 'duree', 'type', 'transport', 'envie', 'tri'] as const;

function SelectField({ label, value, onChange, options, allLabel }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; allLabel: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-ink-soft">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field cursor-pointer">
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ExplorerPage() {
  const { query } = useLocation();
  const { dna } = useDemoState();
  const savedDna = isValidDna(dna) ? dna : null;
  const filters = Object.fromEntries(FILTER_KEYS.map((key) => [key, query.get(key) ?? ''])) as Record<(typeof FILTER_KEYS)[number], string>;
  const sort = filters.tri || 'pertinence';

  const setFilter = (key: (typeof FILTER_KEYS)[number], value: string) => {
    const params = new URLSearchParams(query);
    if (value) params.set(key, value);
    else params.delete(key);
    const search = params.toString();
    navigate(`/explorer${search ? `?${search}` : ''}`, { replace: true, keepScroll: true });
  };
  const reset = () => navigate('/explorer', { replace: true, keepScroll: true });
  const activeCount = FILTER_KEYS.filter((k) => k !== 'tri' && filters[k]).length;

  const results = useMemo(() => {
    const list = CARNETS.filter((carnet) => {
      if (filters.q && !matchesQuery(carnetHaystack(carnet), filters.q)) return false;
      if (filters.dest && carnet.region !== filters.dest && carnet.country !== filters.dest) return false;
      const budget = BUDGETS.find((b) => b.value === filters.budget);
      if (budget && !budget.test(perPerson(carnet))) return false;
      const duration = DURATIONS.find((d) => d.value === filters.duree);
      if (duration && !duration.test(carnetDays(carnet))) return false;
      if (filters.type && carnet.tripType !== filters.type) return false;
      if (filters.transport && !transportsUsed(carnet).includes(filters.transport as TransportMode) && !carnet.access.includes(filters.transport as TransportMode)) return false;
      if (filters.envie && !carnet.interests.includes(filters.envie as Interest)) return false;
      return true;
    });
    const withScore = list.map((carnet) => ({ carnet, match: savedDna ? scoreCarnet(carnet, savedDna) : null }));
    const titleHits = (c: Carnet) => (filters.q ? (matchesQuery(`${c.title} ${c.country}`, filters.q) ? 1 : 0) : 0);
    withScore.sort((a, b) => {
      if (sort === 'dna' && a.match && b.match) return b.match.score - a.match.score;
      if (sort === 'duree') return carnetDays(a.carnet) - carnetDays(b.carnet);
      if (sort === 'budget') return perPerson(a.carnet) - perPerson(b.carnet);
      return titleHits(b.carnet) - titleHits(a.carnet) || Number(b.carnet.featured) - Number(a.carnet.featured);
    });
    return withScore;
  }, [filters.q, filters.dest, filters.budget, filters.duree, filters.type, filters.transport, filters.envie, sort, savedDna]);

  const tips = useMemo(() => {
    const list = allTips().filter((t) => !filters.q || matchesQuery(`${t.title} ${t.detail} ${t.step.city} ${t.carnet.country}`, filters.q));
    if (filters.q) return list.slice(0, 6);
    const seen = new Set<string>();
    return list.filter((t) => (seen.has(t.carnet.id) ? false : (seen.add(t.carnet.id), true))).slice(0, 6);
  }, [filters.q]);

  const travelers = useMemo(() => {
    const q = filters.q ? normalizeText(filters.q) : '';
    return TRAVELERS.filter((t) => (!filters.envie || t.interests.includes(filters.envie as Interest)) && (!q || normalizeText(`${t.name} ${t.label} ${t.bio} ${t.interests.join(' ')}`).includes(q)));
  }, [filters.q, filters.envie]);

  return (
    <>
      <section className="relative overflow-hidden bg-night pb-14 pt-28 text-white sm:pt-32">
        <img src="/photos/exp-3-b.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/70 to-night" />
        <span className="absolute bottom-2 right-4 text-[10px] text-white/55">{photoCredit(getPhoto('exp-3-b'))}</span>
        <div className="container-wide relative">
          <p className="text-sm font-medium text-lagoon">Explorer · {CARNETS.length} carnets d’exemple</p>
          <h1 className="mt-3 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl">Trouver le voyage qui te ressemble</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">Cherche une destination, une envie ou un conseil, puis affine par budget, durée, type de voyage et transport.</p>
          <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mt-8 max-w-2xl">
            <label htmlFor="explorer-recherche" className="sr-only">
              Rechercher une destination, une envie ou un conseil
            </label>
            <Search size={20} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="explorer-recherche"
              type="search"
              value={filters.q}
              onChange={(e) => setFilter('q', e.target.value)}
              placeholder="Kyoto, randonnée, train de nuit, bains chauds…"
              className="h-14 w-full rounded-full border border-white/20 bg-white pl-14 pr-5 text-base text-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] placeholder:text-muted focus:outline-none focus:ring-4 focus:ring-lagoon/40"
            />
          </form>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filtrer par envie">
            {INTERESTS.map((interest) => (
              <button
                key={interest}
                type="button"
                aria-pressed={filters.envie === interest}
                onClick={() => setFilter('envie', filters.envie === interest ? '' : interest)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filters.envie === interest ? 'border-white bg-white text-ink' : 'border-white/25 bg-white/10 text-white hover:bg-white/20'}`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-10 sm:py-14" aria-labelledby="resultats-titre">
        <div className="container-wide">
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-4 sm:p-5">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
              <SlidersHorizontal size={16} aria-hidden="true" /> Affiner
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              <SelectField label="Destination" value={filters.dest} onChange={(v) => setFilter('dest', v)} allLabel="Toutes" options={[{ value: 'Europe', label: 'Europe' }, { value: 'Asie', label: 'Asie' }, ...COUNTRIES.map((c) => ({ value: c, label: c }))]} />
              <SelectField label="Budget par personne" value={filters.budget} onChange={(v) => setFilter('budget', v)} allLabel="Tous" options={BUDGETS} />
              <SelectField label="Durée" value={filters.duree} onChange={(v) => setFilter('duree', v)} allLabel="Toutes" options={DURATIONS} />
              <SelectField label="Type de voyage" value={filters.type} onChange={(v) => setFilter('type', v)} allLabel="Tous" options={TYPES.map((t) => ({ value: t, label: t }))} />
              <SelectField label="Transport" value={filters.transport} onChange={(v) => setFilter('transport', v)} allLabel="Tous" options={TRANSPORTS.map((t) => ({ value: t, label: t }))} />
              <div>
                <label htmlFor="explorer-tri" className="mb-1.5 block text-xs font-semibold text-ink-soft">
                  Trier par
                </label>
                <select id="explorer-tri" value={sort} onChange={(e) => setFilter('tri', e.target.value === 'pertinence' ? '' : e.target.value)} className="field cursor-pointer">
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {sort === 'dna' && !savedDna && (
            <p className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-violet/25 bg-violet/5 px-4 py-3 text-sm text-ink-soft">
              <Sparkles size={16} className="text-violet" aria-hidden="true" /> Pour trier selon ton Travel DNA, configure-le d’abord.
              <SiteLink to="/travel-dna" className="font-semibold text-sky underline-offset-4 hover:underline">
                Configurer mon Travel DNA
              </SiteLink>
            </p>
          )}

          <div className="mb-6 mt-8 flex flex-wrap items-center justify-between gap-3">
            <h2 id="resultats-titre" className="font-display text-2xl font-semibold text-ink" aria-live="polite">
              {results.length === 0 ? 'Aucun carnet' : plural(results.length, 'carnet', 'carnets')}
              {activeCount > 0 && <span className="ml-2 font-sans text-base font-normal text-muted">({plural(activeCount, 'filtre actif', 'filtres actifs')})</span>}
            </h2>
            {activeCount > 0 && (
              <button type="button" onClick={reset} className="btn-secondary !min-h-10 !py-2">
                <RotateCcw size={15} aria-hidden="true" /> Réinitialiser
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="rounded-[var(--radius-card)] border border-dashed border-line bg-white p-10 text-center">
              <p className="font-display text-2xl font-semibold text-ink">Aucun carnet ne correspond à ces critères.</p>
              <p className="mt-2 text-ink-soft">Retire un filtre ou essaie un autre mot : « train », « famille », « randonnée »…</p>
              <button type="button" onClick={reset} className="btn-primary mt-6">
                Voir tous les carnets
              </button>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {results.map(({ carnet, match }) => (
                <CarnetCard key={carnet.id} carnet={carnet} reasons={sort === 'dna' && match ? match.reasons.slice(0, 4) : undefined} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-pad bg-white" aria-labelledby="conseils-titre">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="conseils-titre" className="font-display text-3xl font-semibold text-ink">
              {filters.q ? `Conseils liés à « ${filters.q} »` : 'Conseils de voyageurs'}
            </h2>
            {tips.length === 0 ? (
              <p className="mt-4 text-ink-soft">Aucun conseil ne contient ces mots pour l’instant.</p>
            ) : (
              <ul className="mt-6 space-y-3">
                {tips.map((tip) => (
                  <li key={`${tip.carnet.id}-${tip.step.id}`}>
                    <SiteLink to={`/carnets/${tip.carnet.id}#etape-${tip.step.id}`} className="group flex gap-4 rounded-2xl border border-line p-4 hover:border-sky/40">
                      <Lightbulb size={20} className="mt-0.5 shrink-0 text-lagoon" aria-hidden="true" />
                      <span>
                        <span className="block font-semibold text-ink group-hover:text-sky">{tip.title}</span>
                        <span className="mt-1 block text-sm text-ink-soft">{tip.detail}</span>
                        <span className="mt-2 block text-xs text-muted">
                          {tip.step.city} · {tip.carnet.title}
                        </span>
                      </span>
                    </SiteLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside className="lg:col-span-5">
            <h2 className="font-display text-3xl font-semibold text-ink">Voyageurs à découvrir</h2>
            {travelers.length === 0 ? (
              <p className="mt-4 text-ink-soft">Aucun voyageur ne correspond à cette recherche.</p>
            ) : (
              <ul className="mt-6 space-y-4">
                {travelers.map((traveler) => (
                  <li key={traveler.id} className="rounded-2xl border border-line p-3">
                    <TravelerCard traveler={traveler} compact />
                  </li>
                ))}
              </ul>
            )}
            <DemoNote className="mt-6">Profils et carnets fictifs. Suivre un voyageur fonctionne en démonstration : l’abonnement est gardé dans ce navigateur.</DemoNote>
          </aside>
        </div>
      </section>
    </>
  );
}
