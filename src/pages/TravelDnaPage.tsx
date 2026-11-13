import { useMemo, useState } from 'react';
import { ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { DNA_DEFAULT, DNA_FIELDS, isValidDna, nextStepFor, recommendCarnets, recommendTravelers, type DnaKey, type DnaPreferences } from '../lib/dna';
import { demoActions, useDemoState } from '../lib/demoStore';
import { scrollToHash } from '../lib/router';
import CarnetCard from '../components/CarnetCard';
import TravelerCard from '../components/TravelerCard';
import { SiteLink } from '../components/SiteLink';
import DemoNote from '../components/DemoNote';
import { PageHero } from './Shared';

const RULES = [
  ['Ton envie', 'jusqu’à 5 points si c’est l’envie principale du carnet, 3 si elle en fait partie'],
  ['Horizon rêvé', '3 points pour la bonne région ; « À découvrir » favorise les destinations moins fréquentées'],
  ['Budget', '3 points si le coût par personne et par jour correspond, 1 si c’est proche'],
  ['Transport', '3 points s’il est utilisé sur place, 1,5 s’il sert à rejoindre la destination'],
  ['Avec qui', '2,5 points si le carnet a été vécu dans la même configuration'],
  ['Rythme', '2 points si le rythme est le même, 0,5 s’il est voisin'],
  ['Rencontres', 'jusqu’à 2 points selon le niveau de rencontres du voyage ; décide aussi combien de voyageurs te sont suggérés'],
  ['Objectif', '« Préparer » renforce budget et transport et favorise les carnets détaillés ; « Trouver des idées » varie les types de voyage ; « Partager » met en avant les voyageurs et l’atelier'],
];

export default function TravelDnaPage() {
  const reduceMotion = useReducedMotion();
  const { dna } = useDemoState();
  const saved = isValidDna(dna) ? dna : null;
  const [prefs, setPrefs] = useState<DnaPreferences>(saved ?? DNA_DEFAULT);
  const [revealed, setRevealed] = useState(!!saved);

  const carnets = useMemo(() => recommendCarnets(prefs), [prefs]);
  const travelers = useMemo(() => recommendTravelers(prefs), [prefs]);
  const next = nextStepFor(prefs, carnets[0]?.carnet);

  const choose = (key: DnaKey, value: string) => {
    const updated = { ...prefs, [key]: value } as DnaPreferences;
    setPrefs(updated);
    if (revealed) demoActions.setDna(updated);
  };
  const reveal = () => {
    setRevealed(true);
    demoActions.setDna(prefs);
    window.setTimeout(() => scrollToHash('resultats'), reduceMotion ? 0 : 50);
  };
  const reset = () => {
    setPrefs(DNA_DEFAULT);
    setRevealed(false);
    demoActions.clearDna();
  };

  return (
    <>
      <PageHero
        kicker="Travel DNA · démonstration"
        title="Ton ADN de voyageur, en huit critères"
        description="Budget, rythme, envies, transport, rencontres… Configure tes préférences pour voir comment Wayorbi pourrait personnaliser l’inspiration. Ici, une règle simple et transparente fait le calcul : il n’y a pas d’intelligence artificielle."
        photos={['exp-2-a', 'siusi', 'reykjadalur']}
        actions={
          <a href="#questionnaire" className="btn-primary">
            Commencer <ArrowRight size={17} aria-hidden="true" />
          </a>
        }
      />

      <section id="questionnaire" className="scroll-mt-24 pb-16" aria-labelledby="questionnaire-titre">
        <div className="container-wide grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 id="questionnaire-titre" className="sr-only">
              Tes préférences de voyage
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DNA_FIELDS.map((field, index) => (
                <fieldset key={field.key} className="min-w-0 rounded-[var(--radius-card)] border border-line bg-white p-5">
                  <legend className="sr-only">{field.title}</legend>
                  <p className="text-xs font-medium text-muted">Critère {index + 1} sur 8</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink" aria-hidden="true">
                    {field.title}
                  </h3>
                  <p className="mt-1 min-h-10 text-sm text-ink-soft">{field.description}</p>
                  <div role="radiogroup" aria-label={field.title} className="mt-3 flex flex-wrap gap-2">
                    {field.values.map((value) => (
                      <button key={value} type="button" role="radio" aria-checked={prefs[field.key] === value} onClick={() => choose(field.key, value)} className="chip">
                        {value}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>
          <aside className="rounded-[1.5rem] bg-night p-6 text-white lg:sticky lg:top-28 lg:col-span-4 sm:p-7">
            <div className="flex items-center justify-between">
              <Sparkles size={24} className="text-lagoon" aria-hidden="true" />
              <span className="text-xs text-white/65">{saved ? 'Enregistré dans ce navigateur' : 'Pas encore enregistré'}</span>
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold">Ton Travel DNA</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {DNA_FIELDS.map((field) => (
                <li key={field.key} className="rounded-full bg-white/12 px-3 py-1.5 text-xs">
                  {prefs[field.key]}
                </li>
              ))}
            </ul>
            <button type="button" onClick={reveal} className="btn-secondary mt-7 w-full">
              {revealed ? 'Voir mes suggestions' : 'Voir mes suggestions et enregistrer'}
            </button>
            <button type="button" onClick={reset} className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 text-sm text-white/75 hover:text-white">
              <RefreshCw size={14} aria-hidden="true" /> Réinitialiser
            </button>
            <p className="mt-4 text-xs leading-relaxed text-white/60">Tes réponses restent dans ce navigateur. Explorer peut ensuite trier les carnets selon ce profil.</p>
          </aside>
        </div>
      </section>

      {revealed && (
        <section id="resultats" className="section-pad scroll-mt-24 bg-white" aria-labelledby="resultats-titre" aria-live="polite">
          <div className="container-wide">
            <h2 id="resultats-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Trois carnets pour toi
            </h2>
            <p className="mt-3 text-ink-soft">Les étiquettes indiquent les critères que chaque carnet partage avec ton Travel DNA. Modifie un critère : les suggestions se mettent à jour.</p>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
              {carnets.map((match) => (
                <CarnetCard key={match.carnet.id} carnet={match.carnet} reasons={match.reasons} />
              ))}
            </div>

            <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="font-display text-2xl font-semibold text-ink">Voyageurs à suivre</h2>
                {travelers.length === 0 ? (
                  <p className="mt-3 text-ink-soft">Tu préfères voyager entre vous : aucun voyageur n’est suggéré. Les carnets restent consultables en toute autonomie.</p>
                ) : (
                  <ul className="mt-5 space-y-3">
                    {travelers.map(({ traveler, reasons }) => (
                      <li key={traveler.id} className="rounded-2xl border border-line p-3">
                        <TravelerCard traveler={traveler} compact />
                        {reasons.length > 0 && <p className="mt-2 pl-[3.75rem] text-xs text-muted">En commun : {reasons.join(', ')}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="rounded-[1.5rem] bg-gradient-to-br from-sky to-violet p-7 text-white lg:col-span-5">
                <p className="text-sm text-white/80">Selon ton objectif : {prefs.objectif.toLowerCase()}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{next.title}</h3>
                <p className="mt-3 text-white/85">{next.text}</p>
                <SiteLink to={next.to} className="btn-secondary mt-6">
                  {next.label} <ArrowRight size={17} aria-hidden="true" />
                </SiteLink>
              </div>
            </div>

            <details className="mt-14 rounded-[var(--radius-card)] border border-line bg-mist p-5 sm:p-6">
              <summary className="cursor-pointer font-semibold text-ink">Comment le calcul fonctionne</summary>
              <p className="mt-3 text-sm text-ink-soft">Chaque carnet reçoit des points selon tes huit critères ; les trois meilleurs sont proposés. Aucune donnée ne quitte ton navigateur.</p>
              <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {RULES.map(([term, detail]) => (
                  <div key={term} className="rounded-2xl bg-white p-4">
                    <dt className="text-sm font-semibold text-ink">{term}</dt>
                    <dd className="mt-1 text-sm text-ink-soft">{detail}</dd>
                  </div>
                ))}
              </dl>
            </details>
            <DemoNote className="mt-6">Simulation : à terme, une intelligence artificielle pourrait affiner ces suggestions. Ce n’est pas le cas sur ce site.</DemoNote>
          </div>
        </section>
      )}
    </>
  );
}
