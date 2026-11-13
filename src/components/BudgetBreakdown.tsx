import type { Expenses } from '../data/carnets';
import { EXPENSE_CATEGORIES } from '../lib/carnets';
import { formatEuros } from '../lib/format';

/** Répartition des dépenses en cinq catégories, avec totaux par personne et par jour. */
export default function BudgetBreakdown({
  expenses,
  travelers,
  days,
  note,
  tone = 'light',
}: {
  expenses: Expenses;
  travelers: number;
  /** Sans durée connue, le coût par jour n'est pas affiché. */
  days?: number;
  note?: string;
  tone?: 'light' | 'dark';
}) {
  const total = Object.values(expenses).reduce((sum, value) => sum + value, 0);
  const dark = tone === 'dark';
  const muted = dark ? 'text-white/70' : 'text-muted';
  const people = Math.max(1, travelers);
  const tiles = [
    ['Total', formatEuros(total)],
    ['Par personne', formatEuros(total / people)],
    ...(days ? [['Par personne et par jour', formatEuros(total / people / days)]] : []),
  ];
  return (
    <div>
      <dl className={`grid gap-3 ${tiles.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {tiles.map(([label, value]) => (
          <div key={label} className={`rounded-2xl p-3 sm:p-4 ${dark ? 'bg-white/10' : 'bg-mist'}`}>
            <dt className={`text-xs ${muted}`}>{label}</dt>
            <dd className={`mt-1 font-display text-xl font-semibold tabular-nums sm:text-2xl ${dark ? 'text-white' : 'text-ink'}`}>{value}</dd>
          </div>
        ))}
      </dl>

      <div className={`mt-5 flex h-3 w-full overflow-hidden rounded-full ${dark ? 'bg-white/10' : 'bg-mist'}`} role="img" aria-label="Répartition des dépenses par catégorie">
        {EXPENSE_CATEGORIES.filter(({ key }) => expenses[key] > 0).map(({ key, color }) => (
          <span key={key} style={{ width: `${(expenses[key] / total) * 100}%`, background: color }} className="h-full first:rounded-l-full last:rounded-r-full" />
        ))}
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {EXPENSE_CATEGORIES.map(({ key, label, color }) => (
          <li key={key} className={`flex items-center justify-between gap-3 text-sm ${dark ? 'text-white/85' : 'text-ink-soft'}`}>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
              {label}
            </span>
            <span className="tabular-nums">
              <strong className={dark ? 'text-white' : 'text-ink'}>{formatEuros(expenses[key])}</strong>
              <span className={`ml-2 text-xs ${muted}`}>{total ? Math.round((expenses[key] / total) * 100) : 0} %</span>
            </span>
          </li>
        ))}
      </ul>
      {note && <p className={`mt-4 text-xs ${muted}`}>{note} Budget indicatif d’un carnet d’exemple : ni devis, ni dépense vérifiée.</p>}
    </div>
  );
}
