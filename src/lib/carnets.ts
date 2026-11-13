// Calculs dérivés des carnets : budgets, durées, transports, recherche, carte.
import { CARNETS, type Carnet, type CarnetStep, type Companion, type ExpenseCategory, type Expenses, type MeetingLevel, type TransportMode } from '../data/carnets';
import { TRAVELERS, type BudgetLevel, type Traveler } from '../data/travelers';
import { normalizeText } from './format';

export const EXPENSE_CATEGORIES: { key: ExpenseCategory; label: string; color: string }[] = [
  { key: 'hebergement', label: 'Hébergement', color: '#3d7bf2' },
  { key: 'transport', label: 'Transport', color: '#1fb8de' },
  { key: 'restauration', label: 'Restauration', color: '#8c6fe6' },
  { key: 'activites', label: 'Activités', color: '#14a99a' },
  { key: 'autres', label: 'Autres', color: '#9aa6bd' },
];

export function getCarnet(id: string): Carnet | undefined {
  return CARNETS.find((carnet) => carnet.id === id);
}

export function getTraveler(id: string): Traveler | undefined {
  return TRAVELERS.find((traveler) => traveler.id === id);
}

export function carnetDays(carnet: Carnet) {
  return carnet.steps.reduce((sum, step) => sum + step.days, 0);
}

export function stepTotal(step: CarnetStep) {
  return Object.values(step.budget).reduce((sum, value) => sum + value, 0);
}

export function carnetExpenses(carnet: Carnet): Expenses {
  const totals: Expenses = { hebergement: 0, transport: 0, restauration: 0, activites: 0, autres: 0 };
  for (const step of carnet.steps) {
    for (const { key } of EXPENSE_CATEGORIES) totals[key] += step.budget[key];
  }
  return totals;
}

export function carnetTotal(carnet: Carnet) {
  return Object.values(carnetExpenses(carnet)).reduce((sum, value) => sum + value, 0);
}

export function perPerson(carnet: Carnet) {
  return carnetTotal(carnet) / carnet.travelers;
}

export function perPersonPerDay(carnet: Carnet) {
  return perPerson(carnet) / carnetDays(carnet);
}

/** Niveau de budget calculé à partir du coût par personne et par jour. */
export function budgetLevel(carnet: Carnet): BudgetLevel {
  const daily = perPersonPerDay(carnet);
  if (daily < 65) return 'Petit budget';
  if (daily <= 120) return 'Équilibré';
  return 'Confort';
}

export function transportsUsed(carnet: Carnet): TransportMode[] {
  return [...new Set(carnet.steps.map((step) => step.arrival.mode))];
}

export function companionLabel(companion: Companion) {
  return { Solo: 'En solo', Duo: 'En duo', Amis: 'Entre amis', Famille: 'En famille' }[companion];
}

export function meetingsLabel(level: MeetingLevel) {
  return ['En autonomie', 'Quelques rencontres', 'Rencontres fréquentes'][level];
}

export function carnetsByAuthor(authorId: string) {
  return CARNETS.filter((carnet) => carnet.authorId === authorId);
}

export function similarCarnets(carnet: Carnet, count = 3) {
  return CARNETS.filter((other) => other.id !== carnet.id)
    .map((other) => ({
      other,
      score:
        other.interests.filter((interest) => carnet.interests.includes(interest)).length * 2 +
        (other.tripType === carnet.tripType ? 2 : 0) +
        (other.region === carnet.region ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ other }) => other);
}

export function travelerStats(traveler: Traveler) {
  const carnets = carnetsByAuthor(traveler.id);
  return {
    carnets: carnets.length,
    countries: new Set(carnets.map((c) => c.country)).size,
    days: carnets.reduce((sum, c) => sum + carnetDays(c), 0),
    tips: carnets.reduce((sum, c) => sum + c.steps.length, 0),
  };
}

export interface TipEntry {
  carnet: Carnet;
  step: CarnetStep;
  title: string;
  detail: string;
}

export function allTips(): TipEntry[] {
  return CARNETS.flatMap((carnet) => carnet.steps.map((step) => ({ carnet, step, title: step.tip.title, detail: step.tip.detail })));
}

const haystackCache = new WeakMap<Carnet, string>();

/** Tout le texte d'un carnet, sans accents, pour la recherche. */
export function carnetHaystack(carnet: Carnet) {
  let value = haystackCache.get(carnet);
  if (!value) {
    const author = getTraveler(carnet.authorId);
    value = normalizeText(
      [
        carnet.title,
        carnet.country,
        carnet.region,
        carnet.summary,
        carnet.tripType,
        carnet.interests.join(' '),
        author?.name ?? '',
        ...carnet.steps.flatMap((step) => [step.city, step.area, step.story, step.arrival.detail, step.activities.join(' '), step.places.map((p) => `${p.name} ${p.note}`).join(' '), step.tip.title, step.tip.detail]),
      ].join(' '),
    );
    haystackCache.set(carnet, value);
  }
  return value;
}

/** Tous les mots de la recherche doivent apparaître dans le carnet (sans tenir compte des accents). */
export function matchesQuery(text: string, query: string) {
  const words = normalizeText(query).split(/\s+/).filter(Boolean);
  const target = normalizeText(text);
  return words.every((word) => target.includes(word));
}

/**
 * Place les étapes sur une carte stylisée : projection équirectangulaire corrigée par la latitude,
 * puis mise à l'échelle dans le cadre en gardant les proportions réelles.
 */
export function projectSteps(points: { lat: number; lon: number }[], width = 800, height = 500, padding = 90) {
  if (points.length === 0) return [];
  const lat0 = ((points.reduce((sum, p) => sum + p.lat, 0) / points.length) * Math.PI) / 180;
  const raw = points.map((p) => ({ x: p.lon * Math.cos(lat0), y: -p.lat }));
  const xs = raw.map((r) => r.x);
  const ys = raw.map((r) => r.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const spanX = Math.max(Math.max(...xs) - minX, 1e-6);
  const spanY = Math.max(Math.max(...ys) - minY, 1e-6);
  const scale = Math.min((width - 2 * padding) / spanX, (height - 2 * padding) / spanY);
  const offsetX = (width - spanX * scale) / 2;
  const offsetY = (height - spanY * scale) / 2;
  return raw.map((r) => ({ x: offsetX + (r.x - minX) * scale, y: offsetY + (r.y - minY) * scale }));
}

/** Tracé courbe reliant les points (une légère courbe entre deux étapes, comme une trajectoire). */
export function curvedPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy) || 1;
    const bend = Math.min(60, length * 0.18);
    const cx = mx - (dy / length) * bend;
    const cy = my + (dx / length) * bend;
    d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}
