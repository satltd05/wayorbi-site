const euroFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export function formatEuros(amount: number) {
  return euroFormatter.format(Math.round(amount));
}

/** « 1 jour », « 3 jours » (en français, 0 et 1 restent au singulier). */
export function plural(count: number, singular: string, pluralForm: string) {
  return `${count} ${count >= 2 ? pluralForm : singular}`;
}

/** Texte comparable : minuscules, sans accents. */
export function normalizeText(text: string) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
