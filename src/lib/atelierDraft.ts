// Brouillon de l'atelier carnet, conservé uniquement dans ce navigateur.
import { ATELIER_STORAGE_KEY } from './demoStore';
import type { PhotoId } from '../data/travelPhotos';

export interface DraftStep {
  id: string;
  city: string;
  transport: string;
  experience: string;
  activities: string;
  restaurant: string;
  lodging: string;
  tip: string;
}

export interface Draft {
  title: string;
  destination: string;
  dateStart: string;
  dateEnd: string;
  travelers: string;
  kind: string;
  pace: string;
  cover: PhotoId | '';
  budgetTransport: number;
  budgetStay: number;
  budgetFood: number;
  budgetActivities: number;
  budgetOther: number;
  intro: string;
  steps: DraftStep[];
}

export const newDraftStep = (): DraftStep => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  city: '',
  transport: 'Train',
  experience: '',
  activities: '',
  restaurant: '',
  lodging: '',
  tip: '',
});

export const emptyDraft = (): Draft => ({
  title: '',
  destination: '',
  dateStart: '',
  dateEnd: '',
  travelers: '2',
  kind: 'Découverte & tourisme',
  pace: 'Équilibré',
  cover: '',
  budgetTransport: 0,
  budgetStay: 0,
  budgetFood: 0,
  budgetActivities: 0,
  budgetOther: 0,
  intro: '',
  steps: [newDraftStep()],
});

/** Relit le brouillon, y compris ceux créés par l'ancienne version de l'atelier (champs manquants complétés). */
export function readDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(ATELIER_STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<Draft>;
    if (!value || typeof value.title !== 'string' || !Array.isArray(value.steps)) return null;
    const base = emptyDraft();
    return {
      ...base,
      ...value,
      steps: value.steps.map((step) => ({ ...newDraftStep(), ...step })),
    } as Draft;
  } catch {
    return null;
  }
}

export function writeDraft(draft: Draft) {
  try {
    localStorage.setItem(ATELIER_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    /* stockage indisponible */
  }
}

export function draftTotal(draft: Draft) {
  return draft.budgetTransport + draft.budgetStay + draft.budgetFood + draft.budgetActivities + draft.budgetOther;
}

export function isDraftStarted(draft: Draft | null) {
  return !!draft && (draft.title.trim() !== '' || draft.destination.trim() !== '' || draft.steps.some((s) => s.city.trim() !== ''));
}
