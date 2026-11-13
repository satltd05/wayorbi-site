import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { SITE } from '../config/site';
import { demoActions } from '../lib/demoStore';
import { SiteLink } from '../components/SiteLink';
import { PageHero } from './Shared';

const STORED = [
  ['Carnets enregistrés, « j’aime », voyageurs suivis', 'Quand tu utilises ces boutons de démonstration.'],
  ['Commentaires', 'Quand tu ajoutes un commentaire sous un carnet.'],
  ['Travel DNA', 'Quand tu affiches tes suggestions.'],
  ['Visibilité du profil de démonstration', 'Quand tu choisis « public » ou « privé ».'],
  ['Brouillon de l’atelier carnet', 'Pendant que tu remplis l’atelier.'],
];

export default function PrivacyPage() {
  const [done, setDone] = useState(false);
  const clear = () => {
    if (!window.confirm('Effacer toutes les données de démonstration enregistrées dans ce navigateur ?')) return;
    demoActions.clearAll();
    setDone(true);
  };

  return (
    <>
      <PageHero kicker="Confidentialité" title="Politique de confidentialité" description="Ce site ne crée pas de compte, ne dépose pas de cookie de suivi et n’envoie aucune donnée de démonstration à un serveur." />
      <section className="pb-20">
        <div className="container-text space-y-10 leading-relaxed text-ink-soft">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Ce que le site enregistre, et où</h2>
            <p className="mt-4">
              Les démonstrations utilisent le stockage local de ton navigateur (<em>localStorage</em>). Ces informations restent sur ton appareil : elles ne sont ni transmises, ni visibles par d’autres personnes, ni utilisées pour te suivre.
            </p>
            <ul className="mt-5 divide-y divide-line rounded-[var(--radius-card)] border border-line bg-white">
              {STORED.map(([what, when]) => (
                <li key={what} className="p-4">
                  <p className="font-semibold text-ink">{what}</p>
                  <p className="text-sm">{when}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="button" onClick={clear} className="btn-secondary">
                <Trash2 size={16} aria-hidden="true" /> Effacer mes données de démo
              </button>
              <p role="status" className="text-sm text-success">
                {done ? 'Les données de démonstration ont été effacées de ce navigateur.' : ''}
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Cookies et mesure d’audience</h2>
            <p className="mt-4">Ce site n’utilise ni cookie publicitaire, ni outil de mesure d’audience, ni bouton de réseau social tiers. Les polices et les photos sont hébergées avec le site : afficher une page n’envoie pas de requête à Google Fonts ou à Wikimedia.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Formulaire de contact</h2>
            <p className="mt-4">
              Le formulaire de l’accueil ne transmet rien : il prépare un e-mail dans ta propre messagerie. Si tu l’envoies, ton message parvient à {SITE.contactEmail} et sert uniquement à te répondre.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Hébergement</h2>
            <p className="mt-4">
              Comme tout site web, l’hébergeur peut conserver des journaux techniques (adresse IP, date, page demandée) pour assurer la sécurité et le bon fonctionnement du service. Ses coordonnées figurent dans les{' '}
              <SiteLink to="/mentions-legales" className="text-sky underline-offset-4 hover:underline">
                mentions légales
              </SiteLink>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Bêta-test de la maquette</h2>
            <p className="mt-4">La maquette du bêta-test est un site distinct, avec ses propres informations de confidentialité, présentées au moment de participer.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Tes droits</h2>
            <p className="mt-4">
              Pour toute question sur tes données, écris à{' '}
              <a href={`mailto:${SITE.contactEmail}`} className="text-sky underline-offset-4 hover:underline">
                {SITE.contactEmail}
              </a>
              . Tu peux aussi saisir la CNIL (cnil.fr).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
