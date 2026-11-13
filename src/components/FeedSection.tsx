import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { CARNETS, type Carnet } from '../data/carnets';
import { TRAVELERS } from '../data/travelers';
import { getPhoto } from '../data/travelPhotos';
import { carnetDays, getTraveler, perPerson } from '../lib/carnets';
import { useDemoState } from '../lib/demoStore';
import { isValidDna, recommendCarnets } from '../lib/dna';
import { formatEuros, plural } from '../lib/format';
import StoriesRow from './StoriesRow';
import TravelerAvatar from './TravelerAvatar';
import TravelerCard from './TravelerCard';
import CarnetCard from './CarnetCard';
import { LikeButton, SaveButton } from './InteractionButtons';
import { SiteLink } from './SiteLink';
import { photoCredit } from './TravelPhotoFrame';
import { DemoTag } from './DemoNote';

function FeedPost({ carnet }: { carnet: Carnet }) {
  const author = getTraveler(carnet.authorId);
  const cover = getPhoto(carnet.cover);
  const { comments } = useDemoState();
  const commentCount = carnet.comments.length + comments.filter((c) => c.carnetId === carnet.id).length;
  if (!author) return null;
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-line bg-white">
      <header className="flex items-center gap-3 p-4">
        <TravelerAvatar traveler={author} size="sm" />
        <p className="min-w-0 flex-1 text-sm text-ink-soft">
          <SiteLink to={`/voyageurs/${author.id}`} className="font-semibold text-ink hover:text-sky">
            {author.name}
          </SiteLink>{' '}
          a publié un carnet · {carnet.country}
        </p>
      </header>
      <SiteLink to={`/carnets/${carnet.id}`} className="group relative block aspect-[16/9] overflow-hidden" aria-label={`Lire le carnet ${carnet.title}`}>
        <img src={cover.src} alt={cover.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="absolute bottom-2 right-3 text-[10px] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,.6)]">{photoCredit(cover)}</span>
      </SiteLink>
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-2xl font-semibold leading-snug text-ink">
          <SiteLink to={`/carnets/${carnet.id}`} className="hover:text-sky">
            {carnet.title}
          </SiteLink>
        </h3>
        <p className="mt-2 line-clamp-2 text-ink-soft">{carnet.summary}</p>
        <p className="mt-3 text-sm text-muted">
          {plural(carnetDays(carnet), 'jour', 'jours')} · {plural(carnet.travelers, 'voyageur', 'voyageurs')} · {formatEuros(perPerson(carnet))} par personne
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <LikeButton carnetId={carnet.id} />
          <SiteLink to={`/carnets/${carnet.id}#commentaires`} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-semibold text-ink-soft hover:text-sky">
            <MessageCircle size={17} aria-hidden="true" /> {commentCount}
            <span className="sr-only">commentaires</span>
          </SiteLink>
          <SaveButton carnetId={carnet.id} />
          <SiteLink to={`/carnets/${carnet.id}`} className="btn-ghost ml-auto">
            Lire le carnet
          </SiteLink>
        </div>
      </div>
    </article>
  );
}

/** Aperçu du fil d'accueil de l'application : stories, publications, suggestions. */
export default function FeedSection() {
  const { follows, dna } = useDemoState();
  const followedPosts = CARNETS.filter((c) => follows.includes(c.authorId));
  const posts = [...followedPosts, ...CARNETS.filter((c) => c.featured && !follows.includes(c.authorId))].slice(0, 3);
  const suggestions = isValidDna(dna) ? recommendCarnets(dna, 2) : [];
  const toDiscover = TRAVELERS.filter((t) => !follows.includes(t.id)).slice(0, 3);

  return (
    <section className="section-pad bg-mist" aria-labelledby="fil-titre">
      <div className="container-wide">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="fil-titre" className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.6rem]">
              Le fil Wayorbi, comme dans l’application
            </h2>
            <p className="mt-4 text-lg text-ink-soft">Stories, carnets des voyageurs suivis et suggestions personnalisées. Suis un voyageur ou aime un carnet : le fil s’adapte.</p>
          </div>
          <DemoTag>Données fictives, interactions gardées dans ce navigateur</DemoTag>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="rounded-[1.5rem] border border-line bg-white p-4 sm:p-5">
              <StoriesRow />
            </div>
            <p className="text-sm font-medium text-muted">{followedPosts.length > 0 ? 'Les carnets des voyageurs que tu suis' : 'Carnets à la une'}</p>
            {posts.map((carnet) => (
              <FeedPost key={carnet.id} carnet={carnet} />
            ))}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:col-span-4">
            <div className="rounded-[1.5rem] border border-line bg-white p-5">
              <h3 className="font-display text-xl font-semibold text-ink">Voyageurs à découvrir</h3>
              {toDiscover.length === 0 ? (
                <p className="mt-3 text-sm text-ink-soft">Tu suis déjà tous les voyageurs de la démo.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {toDiscover.map((traveler) => (
                    <li key={traveler.id}>
                      <TravelerCard traveler={traveler} compact />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-[1.5rem] bg-night p-5 text-white">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
                <Sparkles size={18} className="text-lagoon" aria-hidden="true" /> Suggestions pour toi
              </h3>
              {suggestions.length > 0 ? (
                <ul className="mt-4 space-y-1">
                  {suggestions.map(({ carnet }) => (
                    <li key={carnet.id} className="rounded-2xl bg-white/95 text-ink">
                      <CarnetCard carnet={carnet} variant="compact" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-white/75">Configure ton Travel DNA : le fil te proposera des carnets selon tes envies, ton budget et ton rythme.</p>
              )}
              <SiteLink to="/travel-dna" className="btn-on-dark mt-4 w-full">
                {suggestions.length > 0 ? 'Ajuster mon Travel DNA' : 'Configurer mon Travel DNA'} <ArrowRight size={16} aria-hidden="true" />
              </SiteLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
