// Données de démonstration du visiteur : abonnements, « j'aime », enregistrements, commentaires,
// Travel DNA et visibilité du profil. Tout reste dans le navigateur (localStorage) : rien n'est envoyé.
import { useSyncExternalStore } from 'react';
import type { DnaPreferences } from './dna';

export interface LocalComment {
  id: string;
  carnetId: string;
  text: string;
  createdAt: string;
}

export interface DemoState {
  follows: string[];
  likes: string[];
  saves: string[];
  comments: LocalComment[];
  dna: DnaPreferences | null;
  visibility: 'public' | 'prive';
}

export const DEMO_STORAGE_KEY = 'wayorbi_demo_v1';
export const ATELIER_STORAGE_KEY = 'wayorbi_atelier_brouillon_v1';

const EMPTY: DemoState = { follows: [], likes: [], saves: [], comments: [], dna: null, visibility: 'public' };

const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((v) => typeof v === 'string');

function load(): DemoState {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<DemoState>;
    return {
      follows: isStringArray(parsed.follows) ? parsed.follows : [],
      likes: isStringArray(parsed.likes) ? parsed.likes : [],
      saves: isStringArray(parsed.saves) ? parsed.saves : [],
      comments: Array.isArray(parsed.comments)
        ? parsed.comments.filter((c): c is LocalComment => !!c && typeof c.text === 'string' && typeof c.carnetId === 'string' && typeof c.id === 'string')
        : [],
      dna: parsed.dna && typeof parsed.dna === 'object' ? (parsed.dna as DnaPreferences) : null,
      visibility: parsed.visibility === 'prive' ? 'prive' : 'public',
    };
  } catch {
    return EMPTY;
  }
}

let state: DemoState = typeof window === 'undefined' ? EMPTY : load();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function update(updater: (current: DemoState) => DemoState) {
  state = updater(state);
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* stockage indisponible (navigation privée) : la démo fonctionne le temps de la visite */
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === DEMO_STORAGE_KEY || event.key === null) {
      state = load();
      emit();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function useDemoState(): DemoState {
  return useSyncExternalStore(subscribe, () => state, () => EMPTY);
}

const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);

export const demoActions = {
  toggleFollow: (travelerId: string) => update((s) => ({ ...s, follows: toggle(s.follows, travelerId) })),
  toggleLike: (carnetId: string) => update((s) => ({ ...s, likes: toggle(s.likes, carnetId) })),
  toggleSave: (carnetId: string) => update((s) => ({ ...s, saves: toggle(s.saves, carnetId) })),
  addComment: (carnetId: string, text: string) =>
    update((s) => ({
      ...s,
      comments: [...s.comments, { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, carnetId, text: text.trim().slice(0, 500), createdAt: new Date().toISOString() }],
    })),
  deleteComment: (commentId: string) => update((s) => ({ ...s, comments: s.comments.filter((c) => c.id !== commentId) })),
  setDna: (dna: DnaPreferences) => update((s) => ({ ...s, dna })),
  clearDna: () => update((s) => ({ ...s, dna: null })),
  setVisibility: (visibility: DemoState['visibility']) => update((s) => ({ ...s, visibility })),
  /** Efface toutes les données de démonstration de ce navigateur, brouillon de l'atelier compris. */
  clearAll: () => {
    try {
      localStorage.removeItem(ATELIER_STORAGE_KEY);
    } catch {
      /* rien à faire */
    }
    update(() => EMPTY);
  },
};
