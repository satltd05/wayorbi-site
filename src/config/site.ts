// Réglages centraux du site : contact, bêta-test et informations légales.

export const SITE = {
  name: 'Wayorbi',
  contactEmail: 'contact@wayorbi.com',
  description:
    'Wayorbi est un projet de réseau social consacré aux carnets de voyage : des récits structurés qui relient étapes, transports, budgets et conseils. Ce site présente le concept et des démonstrations.',
};

/** Bêta-test de la maquette interactive (concept test). */
export const BETA = {
  url: 'https://wayorbi-concept-test.pages.dev/',
  /** Dernier jour annoncé du test, inclus. */
  lastDayLabel: '1er décembre 2026',
  /** Le test se termine à minuit, heure de Paris, à la fin du 1er décembre 2026. */
  endsAt: new Date('2026-12-02T00:00:00+01:00'),
};

/** Le bêta-test est-il encore ouvert ? Calculé à chaque affichage, aucune mise à jour manuelle nécessaire. */
export function isBetaOpen(now: Date = new Date()): boolean {
  return now.getTime() < BETA.endsAt.getTime();
}

/**
 * Informations légales, à compléter par l'éditrice ou l'éditeur avant la mise en ligne.
 * Une valeur vide s'affiche « À compléter » sur la page Mentions légales :
 * rien n'est inventé à la place de la personne responsable du site.
 */
export const LEGAL = {
  /** Nom et prénom de la personne qui édite le site, ou dénomination de la structure. */
  editorName: '',
  /** Statut : par exemple « Entrepreneur individuel », avec SIREN le cas échéant. */
  editorStatus: '',
  /** Adresse postale ou de domiciliation. */
  editorAddress: '',
  /** Directrice ou directeur de la publication. */
  publicationDirector: '',
  /** Hébergeur du site : nom, adresse et moyen de contact (à reprendre des conditions de l'hébergeur choisi). */
  hostName: '',
  hostAddress: '',
  hostContact: '',
};
