import { CalendarDays, Users, Wallet } from 'lucide-react';
import type { Carnet } from '../data/carnets';
import { getPhoto } from '../data/travelPhotos';
import { carnetDays, getTraveler, perPerson } from '../lib/carnets';
import { formatEuros, plural } from '../lib/format';
import { SiteLink } from './SiteLink';
import TravelerAvatar from './TravelerAvatar';
import { SaveButton } from './InteractionButtons';
import { photoCredit } from './TravelPhotoFrame';

function Meta({ carnet, className = '' }: { carnet: Carnet; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted ${className}`}>
      <li className="inline-flex items-center gap-1.5">
        <CalendarDays size={15} aria-hidden="true" /> {plural(carnetDays(carnet), 'jour', 'jours')}
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Users size={15} aria-hidden="true" /> {plural(carnet.travelers, 'voyageur', 'voyageurs')}
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Wallet size={15} aria-hidden="true" /> {formatEuros(perPerson(carnet))} / pers.
      </li>
    </ul>
  );
}

/** Carte d'un carnet : photo de couverture, auteur, titre et repères (durée, voyageurs, budget). */
export default function CarnetCard({
  carnet,
  variant = 'default',
  reasons,
  headingLevel = 3,
}: {
  carnet: Carnet;
  variant?: 'default' | 'feature' | 'compact';
  reasons?: string[];
  headingLevel?: 2 | 3 | 4;
}) {
  const author = getTraveler(carnet.authorId);
  const cover = getPhoto(carnet.cover);
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  const href = `/carnets/${carnet.id}`;

  if (variant === 'compact') {
    return (
      <article className="group relative flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-white">
        <img src={cover.src} alt="" loading="lazy" className="h-16 w-20 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0">
          <Heading className="truncate font-display text-base font-semibold text-ink">
            <SiteLink to={href} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:text-sky">
              {carnet.title}
            </SiteLink>
          </Heading>
          <p className="text-sm text-muted">
            {carnet.country} · {plural(carnetDays(carnet), 'jour', 'jours')}
          </p>
        </div>
      </article>
    );
  }

  const feature = variant === 'feature';
  return (
    <article className={`group relative ${feature ? 'grid gap-6 lg:grid-cols-5 lg:items-center' : ''}`}>
      <div className={`relative overflow-hidden rounded-[var(--radius-photo)] ${feature ? 'aspect-[4/3] lg:col-span-3' : 'aspect-[4/3]'}`}>
        <img
          src={cover.src}
          alt={cover.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur">{carnet.tripType}</span>
        <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,.6)]">{photoCredit(cover)}</span>
      </div>
      <div className={feature ? 'lg:col-span-2' : 'mt-4'}>
        {author && (
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <TravelerAvatar traveler={author} size="xs" />
            <span>
              {author.name} · <span className="text-muted">{carnet.country}</span>
            </span>
          </p>
        )}
        <Heading className={`mt-2 font-display font-semibold leading-snug text-ink ${feature ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>
          <SiteLink to={href} className="after:absolute after:inset-0 after:z-[1] focus-visible:outline-none group-hover:text-sky">
            {carnet.title}
          </SiteLink>
        </Heading>
        {feature && <p className="mt-3 text-ink-soft leading-relaxed">{carnet.summary}</p>}
        <Meta carnet={carnet} className="mt-3" />
        {reasons && reasons.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Critères en commun avec ton Travel DNA">
            {reasons.map((reason) => (
              <li key={reason} className="tag">
                {reason}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="absolute right-3 top-3 z-[2]">
        <SaveButton carnetId={carnet.id} variant="overlay" />
      </div>
    </article>
  );
}
