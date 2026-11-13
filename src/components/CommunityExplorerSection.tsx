import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { EXPLORER_ENTRIES, type ExplorerEntry } from '../data/wayorbiConceptData';
import { EXPLORER_PHOTOS, getPhoto } from '../data/travelPhotos';
import TravelPhotoFrame from './TravelPhotoFrame';

const entryPhotos = (entry: ExplorerEntry) => (EXPLORER_PHOTOS[entry.id] ?? []).map(getPhoto);

type FilterType = 'all' | 'itineraire' | 'budget' | 'bon-plan';

const FILTER_OPTIONS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Tout voir' },
  { id: 'itineraire', label: 'Itinéraires' },
  { id: 'budget', label: 'Budgets' },
  { id: 'bon-plan', label: 'Bons plans' },
];

export default function CommunityExplorerSection() {
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<ExplorerEntry | null>(null);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXPLORER_ENTRIES.filter((entry) => {
      const matchesCategory = filter === 'all' || entry.category === filter;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        entry.title.toLowerCase().includes(q) ||
        entry.destination.toLowerCase().includes(q) ||
        entry.excerpt.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  useEffect(() => {
    if (!selectedEntry) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedEntry(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedEntry]);

  return (
    <section
      id="communaute"
      className="bg-white text-[#111827] py-20 sm:py-24 lg:py-28 border-t border-[#E4E9F1]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold text-[#5468DC]">
              Découverte & entraide
            </p>
            <h2
              className="font-display font-bold tracking-tight text-[#111827] text-3xl sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Explorer des idées de voyages par destination, budget ou conseil
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              Parcourez ces fiches de démonstration pour voir comment la communauté structure ses itinéraires, budgets réels et bons plans locaux.
            </p>
          </div>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div
            role="tablist"
            aria-label="Filtrer les exemples communautaires"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#F2F5F9] border border-[#E4E9F1] self-start"
          >
            {FILTER_OPTIONS.map((opt) => {
              const active = filter === opt.id;
              return (
                <button
                  key={opt.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setFilter(opt.id)}
                  className={`min-h-[40px] px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5] ${
                    active
                      ? 'bg-white text-[#111827] shadow-sm'
                      : 'text-[#4B5563] hover:text-[#111827]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="w-4 h-4 text-[#8A94A6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une destination..."
              aria-label="Rechercher une destination ou un conseil"
              className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-xl bg-[#F7F9FC] border border-[#E4E9F1] text-sm text-[#111827] placeholder:text-[#8A94A6] focus:outline-none focus:bg-white focus:border-[#6E85EF] focus:ring-2 focus:ring-[#6E85EF]/20"
            />
          </div>
        </div>

        {/* Cards Grid or Empty State */}
        {filteredEntries.length === 0 ? (
          <div className="rounded-[18px] bg-[#F7F9FC] border border-[#E4E9F1] p-10 text-center space-y-4">
            <p className="text-[#111827] font-medium">
              Aucun exemple ne correspond à « {query} » dans cette catégorie.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter('all');
                setQuery('');
              }}
              className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#2563EB] to-[#6E85EF] hover:brightness-105 transition-all"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map((entry, idx) => (
              <motion.button
                key={entry.id}
                type="button"
                onClick={() => setSelectedEntry(entry)}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group text-left rounded-[18px] overflow-hidden bg-white border border-[#E4E9F1] flex flex-col shadow-[0_1px_2px_rgba(17,24,39,0.04),0_6px_20px_rgba(17,24,39,0.06)] hover:border-[#6E85EF]/50 hover:shadow-[0_2px_4px_rgba(17,24,39,0.05),0_14px_32px_rgba(17,24,39,0.1)] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5]"
              >
                {entryPhotos(entry)[0] && (
                  <div className="relative">
                    <TravelPhotoFrame photo={entryPhotos(entry)[0]} className="aspect-[16/10] w-full" />
                    <span className="absolute left-3 bottom-3 inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-[#5468DC] shadow-sm">
                      {entry.categoryLabel}
                    </span>
                  </div>
                )}
                <div className="p-6 flex flex-1 flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#4B5563]">
                    <span className="font-semibold text-[#5468DC]">{entry.destination}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{entry.duration}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#111827] group-hover:text-[#5468DC] transition-colors leading-snug">
                    {entry.title}
                  </h3>

                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {entry.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4E9F1] flex items-center justify-between gap-3 text-xs text-[#4B5563]">
                  <span className="truncate">{entry.metricsLine}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#111827] group-hover:text-[#5468DC] shrink-0">
                    <span>Consulter</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Accessible Detail Modal */}
      {selectedEntry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1736]/55 backdrop-blur-sm"
          onClick={() => setSelectedEntry(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-entry-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-[20px] bg-white text-[#111827] border border-[#E4E9F1] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
          >
            {entryPhotos(selectedEntry).length > 0 && (
              <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 grid grid-cols-3 gap-1 h-52 sm:h-64">
                {entryPhotos(selectedEntry).map((photo, index) => (
                  <TravelPhotoFrame
                    key={photo.id}
                    photo={photo}
                    eager
                    className={`h-full ${index === 0 ? 'col-span-2' : ''}`}
                  />
                ))}
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm text-[#4B5563]">
                  <span className="font-semibold text-[#5468DC]">{selectedEntry.categoryLabel}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{selectedEntry.destination}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{selectedEntry.duration}</span>
                </p>
                <h3
                  id="modal-entry-title"
                  className="font-display text-2xl font-bold text-[#111827] leading-snug"
                >
                  {selectedEntry.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                aria-label="Fermer la fenêtre de détail"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#4B5563] hover:text-[#111827] hover:bg-[#F2F5F9] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <p className="text-[#374151] leading-relaxed text-[15px]">
              {selectedEntry.excerpt}
            </p>

            <div className="space-y-2.5">
              <h4 className="text-sm font-semibold text-[#111827]">
                Points clés retenus dans cet exemple
              </h4>
              <ul className="space-y-2 text-sm text-[#374151]">
                {selectedEntry.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4A8FF5] shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedEntry.budgetSample && (
              <div className="rounded-xl bg-[#F7F9FC] border border-[#E4E9F1] p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#111827]">Budget d’exemple documenté</span>
                  <span className="font-mono font-semibold text-[#5468DC] tabular-nums">
                    {selectedEntry.budgetSample.total} ({selectedEntry.budgetSample.daily})
                  </span>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {selectedEntry.budgetSample.breakdown.map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-[#4B5563]">
                      <dt>{row.label}</dt>
                      <dd className="font-mono font-medium text-[#111827] tabular-nums">
                        {row.amount}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-[#E4E9F1]">
              <span className="text-xs text-[#4B5563]">{selectedEntry.authorHandle}</span>
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="min-h-[40px] px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#2563EB] to-[#6E85EF] hover:brightness-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
