import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { BETA, isBetaOpen } from '../config/site';
import { SiteLink } from '../components/SiteLink';
import { CTA, PageHero, SectionHeading } from './Shared';

const STEPS = [
  { title: 'Quelques questions', text: 'Partager ton rapport au voyage et à ce type de plateforme.' },
  { title: 'Des missions guidées', text: 'Suivre les consignes proposées, essayer les écrans et créer des carnets, réels ou fictifs.' },
  { title: 'Un retour constructif', text: 'Dire ce qui t’intéresse, ce qui bloque et ce que tu améliorerais.' },
];

const GOOD_TEST = [
  'Prendre le temps de réaliser toutes les missions.',
  'Tester plusieurs fonctionnalités, pas seulement l’accueil.',
  'Partager les incompréhensions autant que les points positifs.',
  'Proposer des idées concrètes de simplification ou d’amélioration.',
];

export default function BetaPage() {
  const open = isBetaOpen();

  if (!open) {
    return (
      <>
        <PageHero
          kicker="Bêta-test de la maquette"
          title="Le bêta-test est terminé"
          description={`La phase de test de la maquette s’est achevée le ${BETA.lastDayLabel}. Merci à toutes les personnes qui ont pris le temps de la parcourir et de partager leur avis : leurs retours aident à décider de la suite du projet.`}
          photos={['geiranger-1', 'kyoto-3', 'sagres-2']}
          actions={
            <>
              <SiteLink to="/#rejoindre" className="btn-primary">
                Suivre le projet <ArrowRight size={17} aria-hidden="true" />
              </SiteLink>
              <SiteLink to="/carnets" className="btn-secondary">
                Voir les carnets d’exemple
              </SiteLink>
            </>
          }
        />
        <CTA title="Les démonstrations restent ouvertes" description="Carnets, Explorer, profils et Travel DNA se testent toujours sur ce site, sans inscription." button="Découvrir le concept" to="/concept" />
      </>
    );
  }

  return (
    <>
      <PageHero
        kicker={`Bêta-test ouvert jusqu’au ${BETA.lastDayLabel}`}
        title="Ton avis peut façonner la suite de Wayorbi"
        description="Une maquette interactive pour découvrir le concept, réaliser des missions guidées et donner des retours sérieux et constructifs. Tu peux aussi explorer librement les écrans."
        photos={['geiranger-1', 'kyoto-3', 'sagres-2']}
        actions={
          <a href={BETA.url} target="_blank" rel="noreferrer" className="btn-primary">
            Accéder à la maquette <ExternalLink size={16} aria-hidden="true" />
          </a>
        }
      />

      <section className="section-pad bg-white" aria-labelledby="deroulement-titre">
        <div className="container-wide">
          <SectionHeading
            id="deroulement-titre"
            title="Comment se passe le test"
            description="Les consignes exactes et les missions sont présentées dans la maquette. Voici le déroulement général."
          />
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-[1.5rem] border border-line bg-mist p-7">
                <span className="font-display text-5xl font-semibold text-sky/35" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 rounded-2xl border border-sky/20 bg-sky/5 p-5 text-ink-soft">
            <strong className="text-ink">Période annoncée : jusqu’au {BETA.lastDayLabel}.</strong> L’accès dépend de la disponibilité du site de test. Il s’agit d’un test de concept, pas du lancement public d’un réseau social.
          </p>
        </div>
      </section>

      <section className="section-pad bg-mist" aria-labelledby="utile-titre">
        <div className="container-wide grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="utile-titre" title="Un retour utile vaut mieux qu’un simple clic" className="!mb-6" />
            <p className="text-lg leading-relaxed text-ink-soft">Le test sert à vérifier que le concept est compréhensible, que la création d’un carnet semble naturelle et que Wayorbi répond aux attentes des voyageurs. Les commentaires détaillés sont les plus précieux.</p>
            <a href={BETA.url} target="_blank" rel="noreferrer" className="btn-primary mt-7">
              Commencer le parcours <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="rounded-[1.5rem] bg-night p-8 text-white">
            <h3 className="font-display text-2xl font-semibold">Pour un test vraiment utile</h3>
            <ul className="mt-6 space-y-4">
              {GOOD_TEST.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-lagoon" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA title="Tu préfères d’abord découvrir le concept ?" description="Parcours les carnets d’exemple et les démonstrations avant de tester la maquette." button="Comprendre Wayorbi" to="/concept" />
    </>
  );
}
