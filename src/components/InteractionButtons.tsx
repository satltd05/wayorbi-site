// Interactions simulées : elles fonctionnent vraiment, mais restent enregistrées dans ce navigateur.
import { Bookmark, Heart, UserCheck, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { demoActions, useDemoState } from '../lib/demoStore';

const DEMO_HINT = 'Démonstration : enregistré uniquement dans ce navigateur';

type Variant = 'full' | 'icon' | 'overlay';

function Pop({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <motion.span key={String(active)} initial={{ scale: active ? 0.6 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }} className="inline-flex">
      {children}
    </motion.span>
  );
}

const base = 'inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky';
const sizes: Record<Variant, string> = {
  full: 'min-h-10 px-4 text-sm border',
  icon: 'h-10 w-10 border',
  overlay: 'h-10 w-10 bg-white/90 backdrop-blur text-ink shadow-sm hover:bg-white',
};

export function LikeButton({ carnetId, variant = 'full' }: { carnetId: string; variant?: Variant }) {
  const { likes } = useDemoState();
  const active = likes.includes(carnetId);
  const label = active ? 'Tu aimes ce carnet' : 'J’aime';
  return (
    <button
      type="button"
      onClick={() => demoActions.toggleLike(carnetId)}
      aria-pressed={active}
      aria-label={variant === 'full' ? undefined : label}
      title={DEMO_HINT}
      className={`${base} ${sizes[variant]} ${variant !== 'overlay' ? (active ? 'border-like/30 bg-like/10 text-like' : 'border-line bg-white text-ink-soft hover:text-like') : active ? 'text-like' : ''}`}
    >
      <Pop active={active}>
        <Heart size={17} aria-hidden="true" fill={active ? 'currentColor' : 'none'} />
      </Pop>
      {variant === 'full' && <span>{active ? 'Tu aimes' : 'J’aime'}</span>}
    </button>
  );
}

export function SaveButton({ carnetId, variant = 'full' }: { carnetId: string; variant?: Variant }) {
  const { saves } = useDemoState();
  const active = saves.includes(carnetId);
  const label = active ? 'Retirer de mes carnets enregistrés' : 'Enregistrer le carnet';
  return (
    <button
      type="button"
      onClick={() => demoActions.toggleSave(carnetId)}
      aria-pressed={active}
      aria-label={variant === 'full' ? undefined : label}
      title={DEMO_HINT}
      className={`${base} ${sizes[variant]} ${variant !== 'overlay' ? (active ? 'border-sky/30 bg-sky/10 text-sky' : 'border-line bg-white text-ink-soft hover:text-sky') : active ? 'text-sky' : ''}`}
    >
      <Pop active={active}>
        <Bookmark size={17} aria-hidden="true" fill={active ? 'currentColor' : 'none'} />
      </Pop>
      {variant === 'full' && <span>{active ? 'Enregistré' : 'Enregistrer'}</span>}
    </button>
  );
}

export function FollowButton({ travelerId, name, size = 'md' }: { travelerId: string; name: string; size?: 'sm' | 'md' }) {
  const { follows } = useDemoState();
  const active = follows.includes(travelerId);
  return (
    <button
      type="button"
      onClick={() => demoActions.toggleFollow(travelerId)}
      aria-pressed={active}
      aria-label={active ? `Ne plus suivre ${name}` : `Suivre ${name}`}
      title={DEMO_HINT}
      className={`${base} ${size === 'sm' ? 'min-h-9 px-3 text-xs' : 'min-h-10 px-4 text-sm'} ${
        active ? 'border border-line bg-white text-ink' : 'border border-transparent bg-ink text-white hover:bg-night'
      }`}
    >
      <Pop active={active}>{active ? <UserCheck size={16} aria-hidden="true" /> : <UserPlus size={16} aria-hidden="true" />}</Pop>
      <span>{active ? 'Tu suis' : 'Suivre'}</span>
    </button>
  );
}
