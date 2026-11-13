import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUp, Check, Download, Plus, Trash2 } from 'lucide-react';
import { getPhoto, type PhotoId } from '../data/travelPhotos';
import { draftTotal, emptyDraft, newDraftStep, readDraft, writeDraft, type Draft, type DraftStep } from '../lib/atelierDraft';
import { formatEuros, plural } from '../lib/format';
import BudgetBreakdown from '../components/BudgetBreakdown';
import TravelPhotoFrame from '../components/TravelPhotoFrame';
import { SiteLink } from '../components/SiteLink';
import DemoNote from '../components/DemoNote';
import { CTA, PageHero } from './Shared';

const COVERS: PhotoId[] = ['japon-cover', 'norvege-cover', 'portugal-cover', 'exp-1-a', 'exp-2-a', 'exp-3-a', 'exp-4-a', 'exp-5-a', 'exp-6-a', 'kyoto-1', 'braies', 'vik'];
const TRANSPORTS = ['Train', 'Avion', 'Voiture', 'Bus', 'Bateau', 'Marche', 'Vélo', 'Autre'];
const BUDGET_FIELDS = [
  ['budgetStay', 'Hébergement'],
  ['budgetTransport', 'Transport'],
  ['budgetFood', 'Restauration'],
  ['budgetActivities', 'Activités'],
  ['budgetOther', 'Autres'],
] as const;

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-muted">{hint}</span>}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function tripDays(draft: Draft) {
  if (!draft.dateStart || !draft.dateEnd) return undefined;
  const diff = (new Date(draft.dateEnd).getTime() - new Date(draft.dateStart).getTime()) / 86_400_000;
  return Number.isFinite(diff) && diff >= 0 ? diff + 1 : undefined;
}

const lines = (text: string) => text.split('\n').map((l) => l.trim()).filter(Boolean);

export default function AtelierPage() {
  const [draft, setDraft] = useState<Draft>(() => readDraft() ?? emptyDraft());
  const [phase, setPhase] = useState<1 | 2>(1);
  const [view, setView] = useState<'edition' | 'apercu'>('edition');
  const [notice, setNotice] = useState('');

  useEffect(() => writeDraft(draft), [draft]);

  const total = draftTotal(draft);
  const days = tripDays(draft);
  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((prev) => ({ ...prev, [key]: value }));
  const updateStep = (id: string, key: keyof Omit<DraftStep, 'id'>, value: string) =>
    setDraft((prev) => ({ ...prev, steps: prev.steps.map((s) => (s.id === id ? { ...s, [key]: value } : s)) }));
  const moveStep = (index: number, delta: number) =>
    setDraft((prev) => {
      const steps = [...prev.steps];
      const target = index + delta;
      if (target < 0 || target >= steps.length) return prev;
      [steps[index], steps[target]] = [steps[target], steps[index]];
      return { ...prev, steps };
    });

  const exportDraft = () => {
    const payload = { ...draft, metadata: { type: 'brouillon de démonstration', publie: false, plateforme: 'Wayorbi' } };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wayorbi-carnet-brouillon.json';
    link.click();
    URL.revokeObjectURL(url);
    setNotice('Le brouillon a été téléchargé au format JSON.');
  };
  const reset = () => {
    if (!window.confirm('Effacer ce brouillon de ce navigateur ?')) return;
    setDraft(emptyDraft());
    setPhase(1);
    setView('edition');
    setNotice('Brouillon effacé de ce navigateur.');
  };
  const goTo = (next: 1 | 2 | 'apercu') => {
    if (next === 'apercu') setView('apercu');
    else {
      setPhase(next);
      setView('edition');
    }
    document.getElementById('atelier')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <PageHero
        kicker="Atelier carnet · démonstration locale"
        title="Commence à raconter ton voyage"
        description="Un atelier pour essayer la création d’un carnet Wayorbi : les informations du voyage, puis les étapes, les adresses et les conseils. Le brouillon reste dans ton navigateur et peut être repris à tout moment."
        photos={['exp-4-a', 'food-nata', 'flam-1']}
      />

      <section id="atelier" className="scroll-mt-24 bg-mist py-14 sm:py-16">
        <div className="container-wide">
          <DemoNote className="mb-6 rounded-2xl border border-lagoon/25 bg-white p-4 text-sm">
            Démonstration : le brouillon est sauvegardé automatiquement dans ce navigateur. Aucun compte n’est créé et rien n’est publié. L’ajout de photos et de vidéos viendra avec l’application ; ici, tu choisis une couverture parmi des photos d’illustration.
          </DemoNote>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div role="group" aria-label="Étapes de l’atelier" className="flex flex-wrap gap-1 rounded-full border border-line bg-white p-1">
              {(
                [
                  [1, '1. Mon voyage'],
                  [2, '2. Mes étapes'],
                  ['apercu', 'Aperçu'],
                ] as const
              ).map(([key, label]) => {
                const active = key === 'apercu' ? view === 'apercu' : view === 'edition' && phase === key;
                return (
                  <button key={label} type="button" aria-pressed={active} onClick={() => goTo(key)} className={`rounded-full px-4 py-2 text-sm font-semibold ${active ? 'bg-ink text-white' : 'text-ink-soft hover:bg-mist'}`}>
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={exportDraft} className="btn-secondary !min-h-10 !py-2">
                <Download size={16} aria-hidden="true" /> Exporter
              </button>
              <button type="button" onClick={reset} className="btn-secondary !min-h-10 !py-2">
                <Trash2 size={16} aria-hidden="true" /> Effacer
              </button>
            </div>
          </div>

          <p role="status" className={notice ? 'mb-5 flex items-center gap-2 rounded-2xl bg-success/10 p-3 text-sm text-success' : 'sr-only'}>
            {notice && <Check size={16} aria-hidden="true" />} {notice}
          </p>

          {view === 'edition' && phase === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goTo(2);
              }}
              className="grid gap-6 lg:grid-cols-12"
            >
              <div className="space-y-6 rounded-[1.5rem] border border-line bg-white p-6 sm:p-8 lg:col-span-8">
                <div>
                  <p className="text-sm font-medium text-muted">Étape 1 sur 2</p>
                  <h2 className="mt-1 font-display text-3xl font-semibold text-ink">Les informations du voyage</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Titre du voyage (obligatoire)">
                    <input className="field" value={draft.title} required maxLength={90} onChange={(e) => update('title', e.target.value)} placeholder="Une semaine entre mer et montagne" />
                  </Field>
                  <Field label="Destination (obligatoire)">
                    <input className="field" value={draft.destination} required maxLength={90} onChange={(e) => update('destination', e.target.value)} placeholder="Italie, Dolomites…" />
                  </Field>
                  <Field label="Début du voyage">
                    <input className="field" type="date" value={draft.dateStart} onChange={(e) => update('dateStart', e.target.value)} />
                  </Field>
                  <Field label="Fin du voyage">
                    <input className="field" type="date" min={draft.dateStart || undefined} value={draft.dateEnd} onChange={(e) => update('dateEnd', e.target.value)} />
                  </Field>
                  <Field label="Nombre de voyageurs">
                    <input className="field" type="number" min={1} max={30} value={draft.travelers} onChange={(e) => update('travelers', e.target.value)} />
                  </Field>
                  <Field label="Type de voyage">
                    <select className="field" value={draft.kind} onChange={(e) => update('kind', e.target.value)}>
                      {['Découverte & tourisme', 'Nature & aventure', 'Détente'].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Rythme">
                    <select className="field" value={draft.pace} onChange={(e) => update('pace', e.target.value)}>
                      {['Détente', 'Équilibré', 'Intense'].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Description du carnet">
                  <textarea className="field" rows={4} value={draft.intro} maxLength={1500} onChange={(e) => update('intro', e.target.value)} placeholder="Quel voyage as-tu envie de raconter ?" />
                </Field>

                <fieldset>
                  <legend className="text-sm font-semibold text-ink">Couverture</legend>
                  <p className="mt-0.5 text-xs text-muted">Photos d’illustration ; dans l’application, tu utiliseras les tiennes.</p>
                  <div role="radiogroup" aria-label="Photo de couverture" className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {COVERS.map((id) => {
                      const photo = getPhoto(id);
                      const selected = draft.cover === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          aria-label={photo.place}
                          onClick={() => update('cover', selected ? '' : id)}
                          className={`relative aspect-square overflow-hidden rounded-xl ring-2 ring-offset-2 transition ${selected ? 'ring-sky' : 'ring-transparent hover:opacity-90'}`}
                        >
                          <img src={photo.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                          {selected && (
                            <span className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-sky text-white">
                              <Check size={14} aria-hidden="true" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-semibold text-ink">Budget total, en euros</legend>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {BUDGET_FIELDS.map(([key, label]) => (
                      <Field key={key} label={label}>
                        <input className="field" type="number" min={0} step={1} value={draft[key]} onChange={(e) => update(key, Math.max(0, Number(e.target.value) || 0))} />
                      </Field>
                    ))}
                  </div>
                </fieldset>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                  <p className="text-sm text-ink-soft">
                    Budget saisi : <strong className="text-ink">{formatEuros(total)}</strong>
                  </p>
                  <button type="submit" className="btn-primary">
                    Continuer vers les étapes <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <aside className="h-fit rounded-[1.5rem] bg-night p-7 text-white lg:col-span-4">
                <h3 className="font-display text-2xl font-semibold">Chaque détail a sa place</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">Dates, voyageurs, type de voyage, rythme et budget par catégorie permettent aux autres de comprendre comment tu as voyagé, et combien cela a coûté.</p>
                <p className="mt-6 text-xs text-white/60">Sauvegarde automatique dans ce navigateur.</p>
              </aside>
            </form>
          )}

          {view === 'edition' && phase === 2 && (
            <div className="rounded-[1.5rem] border border-line bg-white p-6 sm:p-8">
              <p className="text-sm font-medium text-muted">Étape 2 sur 2</p>
              <h2 className="mt-1 font-display text-3xl font-semibold text-ink">Les étapes et les expériences</h2>
              <p className="mt-2 text-ink-soft">Ajoute tes étapes dans l’ordre du voyage : transport, moments vécus, activités, adresses et conseils.</p>
              <ol className="mt-8 space-y-5">
                {draft.steps.map((step, index) => (
                  <li key={step.id} className="rounded-[var(--radius-card)] border border-line bg-mist p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <h3 className="font-display text-xl font-semibold text-ink">Étape {index + 1}</h3>
                      <div className="flex gap-1">
                        <button type="button" onClick={() => moveStep(index, -1)} disabled={index === 0} aria-label={`Monter l’étape ${index + 1}`} className="grid h-9 w-9 place-items-center rounded-full text-ink-soft hover:bg-white disabled:opacity-30">
                          <ArrowUp size={16} aria-hidden="true" />
                        </button>
                        <button type="button" onClick={() => moveStep(index, 1)} disabled={index === draft.steps.length - 1} aria-label={`Descendre l’étape ${index + 1}`} className="grid h-9 w-9 place-items-center rounded-full text-ink-soft hover:bg-white disabled:opacity-30">
                          <ArrowDown size={16} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => update('steps', draft.steps.filter((s) => s.id !== step.id))}
                          disabled={draft.steps.length === 1}
                          aria-label={`Supprimer l’étape ${index + 1}`}
                          className="grid h-9 w-9 place-items-center rounded-full text-ink-soft hover:bg-white hover:text-like disabled:opacity-30"
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Ville ou lieu">
                        <input className="field" value={step.city} onChange={(e) => updateStep(step.id, 'city', e.target.value)} placeholder="Florence, Italie" />
                      </Field>
                      <Field label="Transport pour y arriver">
                        <select className="field" value={step.transport} onChange={(e) => updateStep(step.id, 'transport', e.target.value)}>
                          {TRANSPORTS.map((v) => (
                            <option key={v}>{v}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <Field label="Ce que tu as vécu">
                        <textarea className="field" rows={3} value={step.experience} onChange={(e) => updateStep(step.id, 'experience', e.target.value)} placeholder="Un moment marquant, une rencontre…" />
                      </Field>
                      <Field label="Activités et visites" hint="Une par ligne">
                        <textarea className="field" rows={3} value={step.activities} onChange={(e) => updateStep(step.id, 'activities', e.target.value)} placeholder={'Musée des Offices\nCoucher de soleil à San Miniato'} />
                      </Field>
                      <Field label="Restaurant ou adresse gourmande">
                        <input className="field" value={step.restaurant} onChange={(e) => updateStep(step.id, 'restaurant', e.target.value)} placeholder="Trattoria de quartier près du marché" />
                      </Field>
                      <Field label="Hébergement">
                        <input className="field" value={step.lodging} onChange={(e) => updateStep(step.id, 'lodging', e.target.value)} placeholder="Chambre d’hôtes dans l’Oltrarno" />
                      </Field>
                    </div>
                    <div className="mt-4">
                      <Field label="Ton conseil">
                        <textarea className="field" rows={2} value={step.tip} onChange={(e) => updateStep(step.id, 'tip', e.target.value)} placeholder="Le bon plan que tu partagerais" />
                      </Field>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap justify-between gap-3">
                <button type="button" onClick={() => update('steps', [...draft.steps, newDraftStep()])} className="btn-secondary">
                  <Plus size={17} aria-hidden="true" /> Ajouter une étape
                </button>
                <button type="button" onClick={() => goTo('apercu')} className="btn-primary">
                  Voir l’aperçu du carnet <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {view === 'apercu' && (
            <article className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[var(--shadow-soft)]">
              <div className="relative flex min-h-[280px] flex-col justify-end bg-gradient-to-br from-lagoon via-sky to-violet p-8 text-white sm:p-12">
                {draft.cover && <TravelPhotoFrame photo={draft.cover} credit="short" creditPosition="top" className="!absolute inset-0" eager />}
                {draft.cover && <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-transparent" />}
                <div className="relative">
                  <p className="text-sm font-medium text-white/85">Carnet de démonstration · non publié</p>
                  <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">{draft.title || 'Ton carnet de voyage'}</h2>
                  <p className="mt-2 text-white/90">{draft.destination || 'Destination à préciser'}</p>
                </div>
              </div>
              <div className="p-6 sm:p-10">
                <ul className="flex flex-wrap gap-2">
                  {[draft.kind, `Rythme ${draft.pace.toLowerCase()}`, plural(Number(draft.travelers) || 1, 'voyageur', 'voyageurs'), plural(draft.steps.length, 'étape', 'étapes'), days ? plural(days, 'jour', 'jours') : 'Dates à préciser'].map((v) => (
                    <li key={v} className="pill">
                      {v}
                    </li>
                  ))}
                </ul>
                <p className="story-text mt-6">{draft.intro || 'Ajoute une description pour présenter ton voyage.'}</p>

                {total > 0 && (
                  <div className="mt-10 rounded-[var(--radius-card)] border border-line p-5 sm:p-6">
                    <h3 className="mb-5 font-display text-2xl font-semibold text-ink">Budget</h3>
                    <BudgetBreakdown
                      expenses={{ hebergement: draft.budgetStay, transport: draft.budgetTransport, restauration: draft.budgetFood, activites: draft.budgetActivities, autres: draft.budgetOther }}
                      travelers={Number(draft.travelers) || 1}
                      days={days}
                    />
                  </div>
                )}

                <h3 className="mt-10 font-display text-2xl font-semibold text-ink">Le parcours</h3>
                <ol className="mt-6 space-y-2">
                  {draft.steps.map((step, index) => (
                    <li key={step.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-semibold text-white">{index + 1}</span>
                        <span aria-hidden="true" className="mt-2 w-0.5 flex-1 bg-gradient-to-b from-lagoon/60 to-violet/30" />
                      </div>
                      <div className="flex-1 pb-8">
                        <h4 className="font-display text-xl font-semibold text-ink">{step.city || `Étape ${index + 1} à compléter`}</h4>
                        <p className="text-sm font-medium text-sky">{step.transport}</p>
                        <p className="mt-2 text-ink-soft">{step.experience || 'Aucune expérience décrite pour le moment.'}</p>
                        {lines(step.activities).length > 0 && (
                          <ul className="mt-3 space-y-1">
                            {lines(step.activities).map((a) => (
                              <li key={a} className="flex gap-2 text-sm text-ink-soft">
                                <Check size={16} className="mt-0.5 shrink-0 text-lagoon" aria-hidden="true" /> {a}
                              </li>
                            ))}
                          </ul>
                        )}
                        {(step.restaurant || step.lodging) && (
                          <p className="mt-3 text-sm text-ink-soft">
                            {step.restaurant && (
                              <span className="mr-4">
                                <strong className="text-ink">Restaurant :</strong> {step.restaurant}
                              </span>
                            )}
                            {step.lodging && (
                              <span>
                                <strong className="text-ink">Hébergement :</strong> {step.lodging}
                              </span>
                            )}
                          </p>
                        )}
                        {step.tip && (
                          <p className="mt-3 rounded-2xl bg-lagoon/10 p-3 text-sm text-ink-soft">
                            <strong className="text-ink">Conseil :</strong> {step.tip}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" onClick={() => goTo(2)} className="btn-secondary">
                    Modifier les étapes
                  </button>
                  <button type="button" onClick={exportDraft} className="btn-primary">
                    <Download size={17} aria-hidden="true" /> Exporter le brouillon
                  </button>
                  <SiteLink to="/mon-espace" className="btn-ghost">
                    Retrouver le brouillon dans mon espace
                  </SiteLink>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      <CTA title="La future application ira plus loin" description="Photos et vidéos, publication, visibilité publique ou privée et échanges autour des carnets : l’atelier en montre la logique, l’application les rendra réels." button="Voir les fonctionnalités prévues" to="/fonctionnalites" />
    </>
  );
}
