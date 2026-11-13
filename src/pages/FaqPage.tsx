import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BETA, SITE, isBetaOpen } from '../config/site';
import { SiteLink } from '../components/SiteLink';
import { CTA, PageHero } from './Shared';
import type { ReactNode } from 'react';

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  const betaOpen = isBetaOpen();
  const faqs: [string, ReactNode][] = [
    [
      'Wayorbi est-il déjà un réseau social disponible ?',
      'Non. Wayorbi est un projet de réseau social consacré au voyage, en cours de développement. Ce site présente la vision, des carnets d’exemple et des démonstrations ; il ne remplace pas la future application.',
    ],
    [
      'Les carnets, les voyageurs et les budgets sont-ils réels ?',
      'Non, ce sont des exemples fictifs qui montrent le format imaginé. Les lieux et les transports existent, mais les voyageurs, leurs récits et leurs budgets sont illustratifs : ce ne sont ni des devis ni des dépenses vérifiées.',
    ],
    [
      'Les « j’aime », abonnements et commentaires sont-ils vraiment enregistrés ?',
      <>
        Ils fonctionnent, mais uniquement dans ton navigateur : personne d’autre ne les voit et rien n’est envoyé à un serveur. Tu peux tout retrouver et tout effacer depuis{' '}
        <SiteLink to="/mon-espace" className="font-semibold text-sky underline-offset-4 hover:underline">
          Mon espace
        </SiteLink>
        .
      </>,
    ],
    ['En quoi un carnet est-il différent d’une simple publication ?', 'Un carnet relie les photos et le récit à un voyage structuré : durée, dates, étapes, transports, type d’expérience, adresses, conseils et dépenses.'],
    ['Puis-je créer un compte ou publier un carnet ici ?', 'Pas sur ce site. L’atelier carnet permet d’essayer la création d’un carnet : le brouillon reste dans ton navigateur et peut être exporté, mais il n’est ni publié ni partagé.'],
    ['À quoi sert le Travel DNA ?', 'C’est un ensemble de huit préférences de voyage (budget, rythme, envies, transport, rencontres…) qui sert à personnaliser la découverte. Sur ce site, une règle simple et transparente calcule les suggestions ; il n’y a pas d’intelligence artificielle.'],
    [
      'Comment fonctionne le bêta-test ?',
      betaOpen
        ? `Une maquette interactive propose un parcours de missions guidées, avec la possibilité d’explorer librement. Des questions recueillent l’avis des participants. Le test est ouvert jusqu’au ${BETA.lastDayLabel}.`
        : `Le bêta-test de la maquette s’est terminé le ${BETA.lastDayLabel}. Les retours des participants aident à décider de la suite du projet.`,
    ],
    [
      'D’où viennent les photos ?',
      <>
        Ce sont des photos libres de droits publiées sur Wikimedia Commons. Leurs auteurs et leurs licences sont indiqués sur chaque image et sur la page{' '}
        <SiteLink to="/credits" className="font-semibold text-sky underline-offset-4 hover:underline">
          Crédits photos
        </SiteLink>
        .
      </>,
    ],
    ['Comment contacter le projet ?', `Écris à ${SITE.contactEmail}. Le formulaire de l’accueil prépare un message dans ta messagerie ; ce site ne collecte pas tes coordonnées.`],
  ];

  return (
    <>
      <PageHero kicker="Questions fréquentes" title="Tout comprendre de Wayorbi et de ce site" description="Le projet, les démonstrations, les données et le bêta-test : les réponses aux questions qui reviennent le plus." />
      <section className="pb-20" aria-label="Questions et réponses">
        <div className="container-text">
          <ul className="space-y-3">
            {faqs.map(([question, answer], index) => {
              const expanded = open === index;
              return (
                <li key={question} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
                  <h2 className="font-sans text-base">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`faq-${index}`}
                      id={`faq-q-${index}`}
                      onClick={() => setOpen(expanded ? null : index)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-ink hover:bg-mist sm:p-6"
                    >
                      <span>{question}</span>
                      <ChevronDown size={20} className={`shrink-0 text-sky transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                  </h2>
                  {expanded && (
                    <div id={`faq-${index}`} role="region" aria-labelledby={`faq-q-${index}`} className="px-5 pb-6 leading-relaxed text-ink-soft sm:px-6">
                      {answer}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CTA title="Une question restée sans réponse ?" description={`Écris directement à ${SITE.contactEmail}.`} button="Nous écrire" to={`mailto:${SITE.contactEmail}`} />
    </>
  );
}
