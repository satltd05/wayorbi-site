import { useState } from 'react';
import { TRAVELERS, type Traveler } from '../data/travelers';
import TravelerAvatar from './TravelerAvatar';
import StoryViewer from './StoryViewer';

/** Rangée de stories (fictives) façon réseau social ; la lecture enchaîne les voyageurs. */
export default function StoriesRow({ travelers = TRAVELERS, tone = 'light' }: { travelers?: Traveler[]; tone?: 'light' | 'dark' }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const current = openIndex === null ? null : travelers[openIndex];

  return (
    <>
      <ul className="no-scrollbar -mx-1 flex gap-4 overflow-x-auto px-1 pb-1" aria-label="Stories des voyageurs (exemples fictifs)">
        {travelers.map((traveler, index) => (
          <li key={traveler.id} className="shrink-0">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group flex w-20 flex-col items-center gap-2 rounded-2xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky"
              aria-label={`Voir la story de ${traveler.name}`}
            >
              <TravelerAvatar traveler={traveler} size="lg" ring className="transition-transform group-hover:scale-105" />
              <span className={`w-full truncate text-center text-xs font-medium ${tone === 'dark' ? 'text-white/85' : 'text-ink-soft'}`}>{traveler.name}</span>
            </button>
          </li>
        ))}
      </ul>
      {current && (
        <StoryViewer
          open
          onClose={() => setOpenIndex(null)}
          traveler={current}
          slides={current.story}
          title="Story du moment"
          onFinished={() => setOpenIndex((i) => (i !== null && i < travelers.length - 1 ? i + 1 : null))}
        />
      )}
    </>
  );
}
