import type { Traveler } from '../data/travelers';
import { initials } from '../lib/format';

const SIZES = {
  xs: 'h-7 w-7 text-[11px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-24 w-24 text-2xl',
};

/**
 * Avatar d'un voyageur fictif : initiales sur un dégradé (aucune photo de visage).
 * `ring` affiche l'anneau dégradé des stories.
 */
export default function TravelerAvatar({ traveler, size = 'sm', ring = false, className = '' }: { traveler: Traveler; size?: keyof typeof SIZES; ring?: boolean; className?: string }) {
  const avatar = (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${SIZES[size]} ${ring ? '' : className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${traveler.gradient[0]}, ${traveler.gradient[1]})` }}
    >
      {initials(traveler.name)}
    </span>
  );
  if (!ring) return avatar;
  return (
    <span className={`inline-flex shrink-0 rounded-full p-[3px] bg-[conic-gradient(from_200deg,#1fb8de,#3d7bf2,#8c6fe6,#1fb8de)] ${className}`}>
      <span className="inline-flex rounded-full bg-white p-[2px]">{avatar}</span>
    </span>
  );
}
