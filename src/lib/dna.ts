// Travel DNA : une règle de démonstration TRANSPARENTE (pas d'IA). Chacun des 8 critères influe
// sur le résultat, et chaque suggestion indique les critères qui l'expliquent.
import { CARNETS, type Carnet, type Companion, type Interest, type MeetingLevel, type Pace } from '../data/carnets';
import { TRAVELERS, type BudgetLevel, type Traveler } from '../data/travelers';
import { budgetLevel, companionLabel, transportsUsed } from './carnets';

export type MeetingsPreference = 'J’adore rencontrer' | 'Pourquoi pas' | 'Je préfère rester entre nous';
export type TransportPreference = 'Train' | 'Avion' | 'Voiture' | 'Peu importe';
export type DestinationPreference = 'Europe' | 'Asie' | 'À découvrir';
export type Goal = 'Trouver des idées' | 'Préparer un voyage' | 'Partager mes expériences';

export interface DnaPreferences {
  budget: BudgetLevel;
  rythme: Pace;
  profil: Companion;
  rencontres: MeetingsPreference;
  envie: Interest;
  transport: TransportPreference;
  destination: DestinationPreference;
  objectif: Goal;
}

export type DnaKey = keyof DnaPreferences;

export const DNA_FIELDS: { key: DnaKey; title: string; description: string; values: string[] }[] = [
  { key: 'envie', title: 'Ton envie du moment', description: 'Ce que tu cherches avant tout.', values: ['Nature & aventure', 'Culture & visites', 'Gastronomie', 'Détente'] },
  { key: 'destination', title: 'Horizon rêvé', description: 'Une région de prédilection, ou l’envie d’être surpris.', values: ['Europe', 'Asie', 'À découvrir'] },
  { key: 'budget', title: 'Ton budget', description: 'Comparé au coût par personne et par jour des carnets.', values: ['Petit budget', 'Équilibré', 'Confort'] },
  { key: 'rythme', title: 'Ton rythme', description: 'Comment aimes-tu remplir tes journées ?', values: ['Détente', 'Équilibré', 'Intense'] },
  { key: 'profil', title: 'Avec qui pars-tu ?', description: 'Le contexte change la façon de voyager.', values: ['Solo', 'Duo', 'Amis', 'Famille'] },
  { key: 'transport', title: 'Ton transport favori', description: 'Pour rejoindre la destination ou se déplacer sur place.', values: ['Train', 'Avion', 'Voiture', 'Peu importe'] },
  { key: 'rencontres', title: 'Les rencontres', description: 'Auberges, chez l’habitant… ou en autonomie ?', values: ['J’adore rencontrer', 'Pourquoi pas', 'Je préfère rester entre nous'] },
  { key: 'objectif', title: 'Ton objectif', description: 'Ce que tu attends de Wayorbi.', values: ['Trouver des idées', 'Préparer un voyage', 'Partager mes expériences'] },
];

export const DNA_DEFAULT: DnaPreferences = {
  envie: 'Nature & aventure',
  destination: 'Europe',
  budget: 'Équilibré',
  rythme: 'Équilibré',
  profil: 'Duo',
  transport: 'Train',
  rencontres: 'Pourquoi pas',
  objectif: 'Trouver des idées',
};

const MEETING_LEVEL: Record<MeetingsPreference, MeetingLevel> = { 'J’adore rencontrer': 2, 'Pourquoi pas': 1, 'Je préfère rester entre nous': 0 };
const BUDGET_ORDER: BudgetLevel[] = ['Petit budget', 'Équilibré', 'Confort'];
const PACE_ORDER: Pace[] = ['Détente', 'Équilibré', 'Intense'];

export interface CarnetMatch {
  carnet: Carnet;
  score: number;
  /** Critères qui expliquent la suggestion, en langage clair. */
  reasons: string[];
}

export function scoreCarnet(carnet: Carnet, prefs: DnaPreferences): CarnetMatch {
  let score = 0;
  const reasons: string[] = [];
  const preparing = prefs.objectif === 'Préparer un voyage';

  // Envie (critère principal)
  if (carnet.interests[0] === prefs.envie) {
    score += 5;
    reasons.push(prefs.envie);
  } else if (carnet.interests.includes(prefs.envie)) {
    score += 3;
    reasons.push(prefs.envie);
  }

  // Destination
  if (prefs.destination === 'À découvrir') {
    if (carnet.lesserKnown) {
      score += 3;
      reasons.push('Destination moins fréquentée');
    }
  } else if (carnet.region === prefs.destination) {
    score += 3;
    reasons.push(prefs.destination);
  }

  // Budget (calculé à partir du coût par personne et par jour)
  const budgetGap = Math.abs(BUDGET_ORDER.indexOf(budgetLevel(carnet)) - BUDGET_ORDER.indexOf(prefs.budget));
  const budgetWeight = preparing ? 1.5 : 1;
  if (budgetGap === 0) {
    score += 3 * budgetWeight;
    reasons.push(prefs.budget);
  } else if (budgetGap === 1) score += 1 * budgetWeight;

  // Rythme
  const paceGap = Math.abs(PACE_ORDER.indexOf(carnet.pace) - PACE_ORDER.indexOf(prefs.rythme));
  if (paceGap === 0) {
    score += 2;
    reasons.push(`Rythme ${prefs.rythme.toLowerCase()}`);
  } else if (paceGap === 1) score += 0.5;

  // Avec qui
  if (carnet.companion === prefs.profil) {
    score += 2.5;
    reasons.push(companionLabel(prefs.profil));
  }

  // Transport
  const transportWeight = preparing ? 1.5 : 1;
  if (prefs.transport === 'Peu importe') score += 1;
  else if (transportsUsed(carnet).includes(prefs.transport)) {
    score += 3 * transportWeight;
    reasons.push(prefs.transport);
  } else if (carnet.access.includes(prefs.transport)) {
    score += 1.5 * transportWeight;
    reasons.push(`${prefs.transport} pour s’y rendre`);
  }

  // Rencontres
  const meetingGap = Math.abs(carnet.meetings - MEETING_LEVEL[prefs.rencontres]);
  score += 2 - meetingGap;
  if (meetingGap === 0) reasons.push(['En autonomie', 'Quelques rencontres', 'Rencontres fréquentes'][carnet.meetings]);

  // Objectif : préparer un voyage favorise les carnets les plus détaillés (plus d'étapes)
  if (preparing && carnet.steps.length >= 4) score += 1;

  return { carnet, score, reasons };
}

/** Trois carnets suggérés. « Trouver des idées » privilégie la variété des types de voyage. */
export function recommendCarnets(prefs: DnaPreferences, count = 3): CarnetMatch[] {
  const ranked = CARNETS.map((carnet) => scoreCarnet(carnet, prefs)).sort((a, b) => b.score - a.score);
  if (prefs.objectif !== 'Trouver des idées') return ranked.slice(0, count);
  const picked: CarnetMatch[] = [];
  for (const match of ranked) {
    if (picked.length === count) break;
    const sameType = picked.filter((p) => p.carnet.tripType === match.carnet.tripType).length;
    if (sameType < 2) picked.push(match);
  }
  return picked;
}

export interface TravelerMatch {
  traveler: Traveler;
  reasons: string[];
}

/** Voyageurs à suivre : leur nombre dépend du critère « rencontres », leur choix des envies et du style. */
export function recommendTravelers(prefs: DnaPreferences): TravelerMatch[] {
  const count = { 'J’adore rencontrer': 3, 'Pourquoi pas': 2, 'Je préfère rester entre nous': 0 }[prefs.rencontres];
  if (count === 0) return [];
  return TRAVELERS.map((traveler) => {
    const reasons: string[] = [];
    let score = 0;
    if (traveler.interests.includes(prefs.envie)) {
      score += 3;
      reasons.push(prefs.envie);
    }
    if (traveler.companions.includes(prefs.profil)) {
      score += 1.5;
      reasons.push(companionLabel(prefs.profil));
    }
    if (traveler.budget === prefs.budget) {
      score += 1;
      reasons.push(prefs.budget);
    }
    if (traveler.pace === prefs.rythme) score += 1;
    if (prefs.objectif === 'Partager mes expériences') score += traveler.meetings;
    return { traveler, reasons, score };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ traveler, reasons }) => ({ traveler, reasons }));
}

/** Prochaine étape proposée selon l'objectif. */
export function nextStepFor(prefs: DnaPreferences, best?: Carnet): { title: string; text: string; to: string; label: string } {
  if (prefs.objectif === 'Préparer un voyage' && best) {
    return {
      title: 'Prépare ton voyage à partir d’un carnet',
      text: `Le carnet « ${best.title} » détaille chaque transport, chaque adresse et le budget étape par étape.`,
      to: `/carnets/${best.id}#budget`,
      label: 'Voir le budget détaillé',
    };
  }
  if (prefs.objectif === 'Partager mes expériences') {
    return {
      title: 'Raconte ton propre voyage',
      text: 'L’atelier te guide en deux étapes : les informations du voyage, puis les étapes et les conseils.',
      to: '/atelier',
      label: 'Commencer un carnet',
    };
  }
  return {
    title: 'Continue à explorer',
    text: 'Explorer trie les carnets selon ton Travel DNA quand tu choisis ce tri.',
    to: '/explorer?tri=dna',
    label: 'Explorer selon mon Travel DNA',
  };
}

export function isValidDna(value: unknown): value is DnaPreferences {
  if (!value || typeof value !== 'object') return false;
  return DNA_FIELDS.every((field) => field.values.includes((value as Record<string, string>)[field.key]));
}
