import { LEGAL, SITE } from '../config/site';
import { SiteLink } from '../components/SiteLink';
import { PageHero } from './Shared';

function Value({ value }: { value: string }) {
  return value ? <>{value}</> : <span className="rounded bg-[#fff4d6] px-1.5 py-0.5 text-sm font-medium text-[#8a5a00]">À compléter</span>;
}

export default function LegalPage() {
  const missing = Object.values(LEGAL).some((v) => !v);
  return (
    <>
      <PageHero kicker="Informations légales" title="Mentions légales" description="Les informations sur l’éditeur et l’hébergeur du site, conformément à la loi pour la confiance dans l’économie numérique." />
      <section className="pb-20">
        <div className="container-text space-y-10 text-ink-soft">
          {missing && (
            <p role="note" className="rounded-2xl border border-[#f0d58a] bg-[#fffaf0] p-4 text-sm text-[#7a5200]">
              Certaines informations sont encore à compléter par l’éditeur du site avant sa mise en ligne (fichier <code>src/config/site.ts</code>).
            </p>
          )}
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Éditeur du site</h2>
            <dl className="mt-4 space-y-2">
              <div>
                <dt className="inline font-semibold text-ink">Nom : </dt>
                <dd className="inline">
                  <Value value={LEGAL.editorName} />
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-ink">Statut : </dt>
                <dd className="inline">
                  <Value value={LEGAL.editorStatus} />
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-ink">Adresse : </dt>
                <dd className="inline">
                  <Value value={LEGAL.editorAddress} />
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-ink">Contact : </dt>
                <dd className="inline">
                  <a href={`mailto:${SITE.contactEmail}`} className="text-sky underline-offset-4 hover:underline">
                    {SITE.contactEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-ink">Direction de la publication : </dt>
                <dd className="inline">
                  <Value value={LEGAL.publicationDirector} />
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Hébergement</h2>
            <dl className="mt-4 space-y-2">
              <div>
                <dt className="inline font-semibold text-ink">Hébergeur : </dt>
                <dd className="inline">
                  <Value value={LEGAL.hostName} />
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-ink">Adresse : </dt>
                <dd className="inline">
                  <Value value={LEGAL.hostAddress} />
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-ink">Contact : </dt>
                <dd className="inline">
                  <Value value={LEGAL.hostContact} />
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Nature du site</h2>
            <p className="mt-4 leading-relaxed">
              Ce site présente Wayorbi, un projet de réseau social consacré au voyage, en cours de développement. Les carnets, profils, budgets et interactions présentés sont des démonstrations fictives. Le site ne propose ni vente, ni réservation, ni création de compte.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Propriété intellectuelle</h2>
            <p className="mt-4 leading-relaxed">
              Le nom Wayorbi, le logo, son animation et les textes du site appartiennent à leur auteur. Les photographies proviennent de Wikimedia Commons et restent soumises à leur licence d’origine : leurs auteurs et licences sont indiqués sur la page{' '}
              <SiteLink to="/credits" className="text-sky underline-offset-4 hover:underline">
                Crédits photos
              </SiteLink>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Données personnelles</h2>
            <p className="mt-4 leading-relaxed">
              Voir la{' '}
              <SiteLink to="/confidentialite" className="text-sky underline-offset-4 hover:underline">
                politique de confidentialité
              </SiteLink>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
