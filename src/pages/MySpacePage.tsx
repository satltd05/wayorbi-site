import { useMemo, useState } from 'react';
import { Bookmark, Heart, MessageCircle, PenLine, Sparkles, Trash2, Users } from 'lucide-react';
import { CARNETS } from '../data/carnets';
import { TRAVELERS } from '../data/travelers';
import { getCarnet } from '../lib/carnets';
import { demoActions, useDemoState } from '../lib/demoStore';
import { DNA_FIELDS, isValidDna } from '../lib/dna';
import { draftTotal, isDraftStarted, readDraft } from '../lib/atelierDraft';
import { formatEuros, plural } from '../lib/format';
import CarnetCard from '../components/CarnetCard';
import TravelerCard from '../components/TravelerCard';
import { SiteLink } from '../components/SiteLink';
import DemoNote, { DemoTag } from '../components/DemoNote';

function Empty({ children, to, label }: { children: string; to: string; label: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-line bg-white p-6">
      <p className="text-ink-soft">{children}</p>
      <SiteLink to={to} className="btn-ghost mt-2 !px-0">
        {label}
      </SiteLink>
    </div>
  );
}

export default function MySpacePage() {
  const state = useDemoState();
  const [cleared, setCleared] = useState(false);
  const draft = useMemo(() => (cleared ? null : readDraft()), [cleared]);
  const saved = CARNETS.filter((c) => state.saves.includes(c.id));
  const liked = CARNETS.filter((c) => state.likes.includes(c.id));
  const followed = TRAVELERS.filter((t) => state.follows.includes(t.id));
  const dna = isValidDna(state.dna) ? state.dna : null;

  const clearAll = () => {
    if (!window.confirm('Effacer toutes tes données de démonstration (carnets enregistrés, « j’aime », abonnements, commentaires, Travel DNA et brouillon) ?')) return;
    demoActions.clearAll();
    setCleared(true);
  };

  const counters = [
    { icon: <Bookmark size={18} aria-hidden="true" />, value: saved.length, label: 'carnets enregistrés' },
    { icon: <Heart size={18} aria-hidden="true" />, value: liked.length, label: '« j’aime »' },
    { icon: <Users size={18} aria-hidden="true" />, value: followed.length, label: 'voyageurs suivis' },
    { icon: <MessageCircle size={18} aria-hidden="true" />, value: state.comments.length, label: 'commentaires' },
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-28 sm:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(50rem 24rem at 90% -10%, rgba(140,111,230,0.16), transparent 60%), radial-gradient(40rem 22rem at 0% 0%, rgba(31,184,222,0.14), transparent 60%)' }} />
        <div className="container-wide relative">
          <p className="text-sm font-medium text-sky">Mon espace · démonstration</p>
          <h1 className="mt-3 font-display text-[2.5rem] font-semibold leading-[1.05] text-ink sm:text-5xl">Ce que tu as gardé pendant ta visite</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            Carnets enregistrés, voyageurs suivis, commentaires, Travel DNA et brouillon de carnet sont conservés <strong className="text-ink">uniquement dans ce navigateur</strong>. Il ne s’agit pas d’un compte : rien n’est envoyé ni publié.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="chip">
              Profil de démo : <strong className="ml-1 text-ink">{state.visibility === 'public' ? 'public' : 'privé'}</strong>
            </span>
            <SiteLink to="/communaute#echanges-titre" className="btn-ghost">
              Changer la visibilité
            </SiteLink>
            <button type="button" onClick={clearAll} className="btn-secondary">
              <Trash2 size={16} aria-hidden="true" /> Effacer mes données de démo
            </button>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {counters.map((c) => (
              <div key={c.label} className="rounded-2xl border border-line bg-white p-4">
                <dt className="flex items-center gap-2 text-sm text-muted">
                  <span className="text-sky">{c.icon}</span> {c.label}
                </dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-ink">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-pad bg-white" aria-labelledby="enregistres-titre">
        <div className="container-wide space-y-16">
          <div>
            <h2 id="enregistres-titre" className="font-display text-3xl font-semibold text-ink">
              Mes carnets enregistrés
            </h2>
            <div className="mt-6">
              {saved.length === 0 ? (
                <Empty to="/explorer" label="Parcourir les carnets">
                  Aucun carnet enregistré. Utilise le signet sur une photo de carnet pour le retrouver ici.
                </Empty>
              ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {saved.map((carnet) => (
                    <CarnetCard key={carnet.id} carnet={carnet} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Carnets que j’aime</h2>
              <div className="mt-5">
                {liked.length === 0 ? (
                  <Empty to="/carnets" label="Voir les carnets">
                    Tu n’as encore aimé aucun carnet.
                  </Empty>
                ) : (
                  <ul className="space-y-1">
                    {liked.map((carnet) => (
                      <li key={carnet.id}>
                        <CarnetCard carnet={carnet} variant="compact" />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Voyageurs suivis</h2>
              <div className="mt-5">
                {followed.length === 0 ? (
                  <Empty to="/communaute" label="Découvrir les voyageurs">
                    Tu ne suis encore personne.
                  </Empty>
                ) : (
                  <ul className="space-y-3">
                    {followed.map((traveler) => (
                      <li key={traveler.id} className="rounded-2xl border border-line p-3">
                        <TravelerCard traveler={traveler} compact />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
                <Sparkles size={20} className="text-violet" aria-hidden="true" /> Mon Travel DNA
              </h2>
              <div className="mt-5">
                {dna ? (
                  <div className="rounded-[var(--radius-card)] border border-line p-5">
                    <ul className="flex flex-wrap gap-2">
                      {DNA_FIELDS.map((field) => (
                        <li key={field.key} className="pill">
                          {dna[field.key]}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <SiteLink to="/travel-dna" className="btn-secondary">
                        Modifier
                      </SiteLink>
                      <SiteLink to="/explorer?tri=dna" className="btn-primary">
                        Explorer selon mon profil
                      </SiteLink>
                    </div>
                  </div>
                ) : (
                  <Empty to="/travel-dna" label="Configurer mon Travel DNA">
                    Ton Travel DNA n’est pas encore configuré.
                  </Empty>
                )}
              </div>
            </div>
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
                <PenLine size={20} className="text-sky" aria-hidden="true" /> Mon brouillon de carnet
              </h2>
              <div className="mt-5">
                {draft && isDraftStarted(draft) ? (
                  <div className="rounded-[var(--radius-card)] border border-line p-5">
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-xl font-semibold text-ink">{draft.title || 'Carnet sans titre'}</span>
                      <DemoTag>Brouillon non publié</DemoTag>
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {draft.destination || 'Destination à préciser'} · {plural(draft.steps.length, 'étape', 'étapes')} · {formatEuros(draftTotal(draft))} de budget saisi
                    </p>
                    <SiteLink to="/atelier" className="btn-primary mt-4">
                      Reprendre dans l’atelier
                    </SiteLink>
                  </div>
                ) : (
                  <Empty to="/atelier" label="Commencer un carnet">
                    Aucun brouillon en cours.
                  </Empty>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Mes commentaires</h2>
            <div className="mt-5">
              {state.comments.length === 0 ? (
                <Empty to="/carnets" label="Lire un carnet">
                  Tu n’as encore commenté aucun carnet.
                </Empty>
              ) : (
                <ul className="space-y-3">
                  {state.comments.map((comment) => {
                    const carnet = getCarnet(comment.carnetId);
                    return (
                      <li key={comment.id} className="flex items-start justify-between gap-4 rounded-2xl border border-line p-4">
                        <div>
                          <p className="text-sm text-muted">
                            Sur{' '}
                            <SiteLink to={`/carnets/${comment.carnetId}#commentaires`} className="font-semibold text-ink hover:text-sky">
                              {carnet?.title ?? 'un carnet'}
                            </SiteLink>
                          </p>
                          <p className="mt-1 whitespace-pre-line text-ink-soft">{comment.text}</p>
                        </div>
                        <button type="button" onClick={() => demoActions.deleteComment(comment.id)} className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs text-muted hover:bg-mist hover:text-like">
                          <Trash2 size={13} aria-hidden="true" /> Supprimer
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <DemoNote>Dans l’application, ces éléments seront liés à ton compte et à tes réglages de confidentialité. Sur ce site, tu peux tout effacer à tout moment.</DemoNote>
        </div>
      </section>
    </>
  );
}
