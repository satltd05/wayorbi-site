// Petit routeur basé sur l'API History : chemins propres (/carnets/japon) et paramètres d'URL (?type=…).
import { useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('popstate', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('popstate', listener);
  };
}

const getSnapshot = () => window.location.pathname + window.location.search;

export function normalizePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export interface LocationState {
  pathname: string;
  search: string;
  query: URLSearchParams;
}

export function useLocation(): LocationState {
  const href = useSyncExternalStore(subscribe, getSnapshot, () => '/');
  const url = new URL(href, 'https://wayorbi.local');
  return { pathname: normalizePath(decodeURI(url.pathname)), search: url.search, query: url.searchParams };
}

export function isExternalLink(to: string) {
  return /^(https?:|mailto:|tel:)/.test(to);
}

/** Change de page sans rechargement. `replace` évite d'empiler l'historique (filtres). */
export function navigate(to: string, options: { replace?: boolean; keepScroll?: boolean } = {}) {
  const url = new URL(to, window.location.href);
  const samePath = normalizePath(url.pathname) === normalizePath(window.location.pathname);
  const next = url.pathname + url.search + url.hash;
  if (options.replace) window.history.replaceState(null, '', next);
  else window.history.pushState(null, '', next);
  listeners.forEach((listener) => listener());

  if (url.hash) {
    scrollToHash(url.hash);
  } else if (!options.keepScroll && !samePath) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }
}

/** Fait défiler jusqu'à l'ancre, en attendant si besoin que la page (chargée en différé) l'affiche. */
export function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return;
  let tries = 0;
  const attempt = () => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else if (tries++ < 30) window.setTimeout(attempt, 60);
  };
  window.setTimeout(attempt, 40);
}

/** Compare un chemin à un motif du type `/carnets/:id` et renvoie les paramètres. */
export function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  const patternParts = normalizePath(pattern).split('/');
  const pathParts = normalizePath(pathname).split('/');
  if (patternParts.length !== pathParts.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    if (p.startsWith(':')) params[p.slice(1)] = pathParts[i];
    else if (p !== pathParts[i]) return null;
  }
  return params;
}
