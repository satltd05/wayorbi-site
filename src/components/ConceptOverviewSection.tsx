import { useId, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CARNETS } from '../data/carnets';
import type { BudgetLevel } from '../data/travelers';
import type { PhotoId } from '../data/travelPhotos';
import { budgetLevel, perPersonPerDay } from '../lib/carnets';
import { formatEuros, plural } from '../lib/format';
import TravelPhotoFrame from './TravelPhotoFrame';
import { SiteLink } from './SiteLink';

const PHASES: { id: string; label: string; title: string; text: string; photo: PhotoId; to: string; cta: string }[] = [
  {
    id: 'avant',
    label: 'Avant le départ',
    title: 'S’inspirer de ceux qui sont partis',
    text: 'Chercher une destination, comparer les budgets et les rythmes, enregistrer les carnets et les conseils qui donnent envie.',
    photo: 'exp-3-a',
    to: '/explorer',
    cta: 'Explorer les carnets',
  },
  {
    id: 'pendant',
    label: 'Pendant le voyage',
    title: 'Garder le fil de l’aventure',
    text: 'Noter chaque étape, le trajet emprunté, les adresses, les dépenses et les moments marquants, au fil de la route.',
    photo: 'tokyo-1',
    to: '/atelier',
    cta: 'Essayer l’atelier carnet',
  },
  {
    id: 'apres',
    label: 'Au retour',
    title: 'Partager une histoire utile',
    text: 'Publier un carnet structuré, répondre aux questions des autres voyageurs et inspirer les prochains départs.',
    photo: 'bergen-1',
    to: '/communaute',
    cta: 'Voir la communauté',
  },
];

const LEVELS: BudgetLevel[] = ['Petit budget', 'Équilibré', 'Confort'];

/** Moyenne par personne et par jour des carnets d'exemple de chaque niveau. */
function averageDaily(level: BudgetLevel) {
  const list = CARNETS.filter((c) => budgetLevel(c) === level);
  return { value: list.reduce((sum, c) => sum + perPersonPerDay(c), 0) / list.length, count: list.length };
}

export default function ConceptOverviewSection() {
  const [phaseId, setPhaseId] = useState('pendant');
  const [level, setLevel] = useState<BudgetLevel>('Équilibré');
  const [days, setDays] = useState(8);
  const [people, setPeople] = useState(2);
  const daysId = useId();
  const peopleId = useId();
  const phase = PHASES.find((p) => p.id === phaseId) ?? PHASES[0];
  const daily = useMemo(() => averageDaily(level), [level]);
  const total = daily.value * days * people;

  return (
    <section id="concept" className="section-pad scroll-mt-20 bg-white" aria-labelledby="concept-titre">
      <div className="container-wide">
        <div className="mb-10 max-w-3xl">
          <h2 id="concept-titre" className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.6rem]">
            Un même carnet, avant, pendant et après le voyage
          </h2>
          <p className="mt-4 text-lg text-ink-soft">Plutôt que de disperser souvenirs, trajets et dépenses entre plusieurs applications, Wayorbi rassemble tout dans un récit que d’autres peuvent suivre.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-[1.5rem] border border-line p-5 sm:p-6 lg:col-span-7">
            <div role="radiogroup" aria-label="Moment du voyage" className="flex flex-wrap gap-2">
              {PHASES.map((p, index) => (
                <button key={p.id} type="button" role="radio" aria-checked={p.id === phaseId} onClick={() => setPhaseId(p.id)} className="chip">
                  {index + 1}. {p.label}
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:items-center">
              <TravelPhotoFrame key={phase.photo} photo={phase.photo} credit="short" creditPosition="bottom" className="aspect-[4/3] rounded-[1.25rem]" />
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink">{phase.title}</h3>
                <p className="mt-3 text-ink-soft">{phase.text}</p>
                <SiteLink to={phase.to} className="btn-ghost mt-3 !px-0">
                  {phase.cta} <ArrowRight size={16} aria-hidden="true" />
                </SiteLink>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-night p-6 text-white sm:p-7 lg:col-span-5">
            <h3 className="font-display text-2xl font-semibold">Estimer un budget à partir des carnets</h3>
            <p className="mt-2 text-sm text-white/70">Le calcul part du coût moyen par personne et par jour des carnets d’exemple du niveau choisi.</p>
            <div role="radiogroup" aria-label="Niveau de budget" className="mt-5 grid grid-cols-3 gap-1 rounded-2xl bg-white/10 p-1">
              {LEVELS.map((l) => (
                <button key={l} type="button" role="radio" aria-checked={l === level} onClick={() => setLevel(l)} className={`min-h-10 rounded-xl px-2 text-xs font-semibold sm:text-sm ${l === level ? 'bg-white text-night' : 'text-white/80 hover:text-white'}`}>
                  {l}
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-5">
              <div>
                <label htmlFor={daysId} className="flex justify-between text-sm text-white/80">
                  Durée <span className="font-semibold text-white">{plural(days, 'jour', 'jours')}</span>
                </label>
                <input id={daysId} type="range" min={3} max={21} value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-2 w-full accent-lagoon" />
              </div>
              <div>
                <label htmlFor={peopleId} className="flex justify-between text-sm text-white/80">
                  Voyageurs <span className="font-semibold text-white">{people}</span>
                </label>
                <input id={peopleId} type="range" min={1} max={6} value={people} onChange={(e) => setPeople(Number(e.target.value))} className="mt-2 w-full accent-lagoon" />
              </div>
            </div>
            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="text-sm text-white/70">
                Environ {formatEuros(daily.value)} par personne et par jour ({plural(daily.count, 'carnet', 'carnets')} de ce niveau)
              </p>
              <p className="mt-1 font-display text-4xl font-semibold tabular-nums" aria-live="polite">
                {formatEuros(total)}
              </p>
              <p className="mt-3 text-xs text-white/60">Ordre de grandeur tiré d’exemples fictifs, hors trajet aller-retour : pas un devis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
