import { MapPin } from 'lucide-react';
import type { Traveler } from '../data/travelers';
import { getPhoto } from '../data/travelPhotos';
import { travelerStats } from '../lib/carnets';
import { plural } from '../lib/format';
import { SiteLink } from './SiteLink';
import TravelerAvatar from './TravelerAvatar';
import { FollowButton } from './InteractionButtons';

/** Carte d'un voyageur fictif : bannière photo, avatar, style de voyage, bouton suivre. */
export default function TravelerCard({ traveler, compact = false }: { traveler: Traveler; compact?: boolean }) {
  const stats = travelerStats(traveler);
  const banner = getPhoto(traveler.banner);

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <TravelerAvatar traveler={traveler} size="md" />
        <div className="min-w-0 flex-1">
          <SiteLink to={`/voyageurs/${traveler.id}`} className="block truncate font-semibold text-ink hover:text-sky">
            {traveler.name}
          </SiteLink>
          <p className="truncate text-xs text-muted">{traveler.label}</p>
        </div>
        <FollowButton travelerId={traveler.id} name={traveler.name} size="sm" />
      </div>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
      <div className="relative h-28">
        <img src={banner.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="relative px-5 pb-5">
        <div className="-mt-8 flex items-end justify-between gap-3">
          <TravelerAvatar traveler={traveler} size="lg" className="ring-4 ring-white" />
          <div className="relative z-[2]">
            <FollowButton travelerId={traveler.id} name={traveler.name} size="sm" />
          </div>
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
          <SiteLink to={`/voyageurs/${traveler.id}`} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:text-sky">
            {traveler.name}
          </SiteLink>
        </h3>
        <p className="text-sm text-muted">{traveler.handle}</p>
        <p className="mt-3 text-sm text-ink-soft">{traveler.label}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <MapPin size={13} aria-hidden="true" /> {traveler.home ?? 'Ville non partagée'}
        </p>
        <p className="mt-4 border-t border-line pt-3 text-sm text-ink-soft">
          {plural(stats.carnets, 'carnet', 'carnets')} · {plural(stats.countries, 'pays', 'pays')} · {plural(stats.days, 'jour', 'jours')} de voyage
        </p>
      </div>
    </article>
  );
}
