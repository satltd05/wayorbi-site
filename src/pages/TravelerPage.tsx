import { useState } from 'react';
import { BookOpen, Lightbulb, MapPin, MessageCircle } from 'lucide-react';
import { TRAVELERS, type Traveler } from '../data/travelers';
import { getPhoto } from '../data/travelPhotos';
import { carnetsByAuthor, getTraveler, travelerStats } from '../lib/carnets';
import { plural } from '../lib/format';
import TravelerAvatar from '../components/TravelerAvatar';
import CarnetCard from '../components/CarnetCard';
import TravelerCard from '../components/TravelerCard';
import StoryViewer from '../components/StoryViewer';
import { FollowButton } from '../components/InteractionButtons';
import { SiteLink } from '../components/SiteLink';
import DemoNote, { DemoTag } from '../components/DemoNote';
import { photoCredit } from '../components/TravelPhotoFrame';
import NotFoundPage from './NotFoundPage';

function similarTravelers(traveler: Traveler) {
  return TRAVELERS.filter((t) => t.id !== traveler.id)
    .map((t) => ({ t, score: t.interests.filter((i) => traveler.interests.includes(i)).length + t.companions.filter((c) => traveler.companions.includes(c)).length * 0.5 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ t }) => t);
}

export default function TravelerPage({ id }: { id: string }) {
  const traveler = getTraveler(id);
  const [highlight, setHighlight] = useState<number | null>(null);
  if (!traveler) return <NotFoundPage />;

  const carnets = carnetsByAuthor(traveler.id);
  const stats = travelerStats(traveler);
  const banner = getPhoto(traveler.banner);
  const tips = carnets.flatMap((carnet) => carnet.steps.map((step) => ({ carnet, step })));
  const current = highlight === null ? null : traveler.highlights[highlight];

  return (
    <>
      <section className="relative">
        <div className="relative h-64 overflow-hidden sm:h-80">
          <img src={banner.src} alt={banner.alt} className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute bottom-2 right-4 text-[10px] text-white/85">
            {banner.place} · {photoCredit(banner)}
          </span>
        </div>
        <div className="container-wide relative">
          <div className="-mt-14 flex flex-col gap-6 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-5">
              <TravelerAvatar traveler={traveler} size="xl" className="ring-[6px] ring-mist" />
              <div className="pb-1">
                <p>
                  <DemoTag>Profil fictif</DemoTag>
                </p>
                <h1 className="mt-1 font-display text-4xl font-semibold text-ink sm:text-5xl">{traveler.name}</h1>
                <p className="text-muted">{traveler.handle}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <FollowButton travelerId={traveler.id} name={traveler.name} />
              <button type="button" disabled className="btn-secondary cursor-not-allowed opacity-60" title="La messagerie arrivera avec l’application">
                <MessageCircle size={16} aria-hidden="true" /> Message (bientôt)
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-lg font-medium text-ink">{traveler.label}</p>
              <p className="story-text mt-3">{traveler.bio}</p>
              <p className="mt-4 flex items-center gap-1.5 text-sm text-muted">
                <MapPin size={15} aria-hidden="true" /> {traveler.home ?? 'Ville non partagée par ce voyageur'}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Types d’expériences">
                {traveler.interests.map((interest) => (
                  <li key={interest} className="pill">
                    {interest}
                  </li>
                ))}
                <li className="pill">Rythme {traveler.pace.toLowerCase()}</li>
                <li className="pill">{traveler.budget}</li>
              </ul>
            </div>
            <dl className="grid grid-cols-2 gap-3 self-start lg:col-span-5">
              {[
                [plural(stats.carnets, 'carnet', 'carnets'), 'publiés'],
                [plural(stats.countries, 'pays', 'pays'), 'racontés'],
                [plural(stats.days, 'jour', 'jours'), 'de voyage'],
                [plural(stats.tips, 'conseil', 'conseils'), 'partagés'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-line bg-white p-4">
                  <dt className="text-xs text-muted">{label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {traveler.highlights.length > 0 && (
            <div className="mt-10">
              <h2 className="font-sans text-sm font-semibold text-ink-soft">Stories à la une</h2>
              <ul className="no-scrollbar mt-3 flex gap-5 overflow-x-auto pb-2">
                {traveler.highlights.map((h, index) => {
                  const photo = getPhoto(h.slides[0].photo);
                  return (
                    <li key={h.title} className="shrink-0">
                      <button type="button" onClick={() => setHighlight(index)} className="group flex w-24 flex-col items-center gap-2" aria-label={`Voir la story à la une « ${h.title} »`}>
                        <span className="rounded-full bg-[conic-gradient(from_200deg,#1fb8de,#3d7bf2,#8c6fe6,#1fb8de)] p-[3px]">
                          <span className="block rounded-full bg-white p-[2px]">
                            <img src={photo.src} alt="" className="h-20 w-20 rounded-full object-cover transition-transform group-hover:scale-105" />
                          </span>
                        </span>
                        <span className="truncate text-sm font-medium text-ink">{h.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="section-pad" aria-labelledby="carnets-publies">
        <div className="container-wide">
          <h2 id="carnets-publies" className="flex items-center gap-3 font-display text-3xl font-semibold text-ink">
            <BookOpen size={24} className="text-sky" aria-hidden="true" /> Carnets publiés
          </h2>
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {carnets.map((carnet) => (
              <CarnetCard key={carnet.id} carnet={carnet} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white" aria-labelledby="conseils-voyageur">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="conseils-voyageur" className="flex items-center gap-3 font-display text-3xl font-semibold text-ink">
              <Lightbulb size={24} className="text-lagoon" aria-hidden="true" /> Ses conseils
            </h2>
            <ul className="mt-6 space-y-3">
              {tips.map(({ carnet, step }) => (
                <li key={`${carnet.id}-${step.id}`}>
                  <SiteLink to={`/carnets/${carnet.id}#etape-${step.id}`} className="group block rounded-2xl border border-line p-4 hover:border-sky/40">
                    <span className="block font-semibold text-ink group-hover:text-sky">{step.tip.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{step.tip.detail}</span>
                    <span className="mt-2 block text-xs text-muted">
                      {step.city} · {carnet.country}
                    </span>
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-10 lg:col-span-5">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Activité récente</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                {carnets.map((carnet) => (
                  <li key={carnet.id} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky" />
                    <span>
                      A publié le carnet{' '}
                      <SiteLink to={`/carnets/${carnet.id}`} className="font-semibold text-ink hover:text-sky">
                        « {carnet.title} »
                      </SiteLink>
                    </span>
                  </li>
                ))}
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lagoon" />
                  <span>A partagé {plural(stats.tips, 'conseil de terrain', 'conseils de terrain')}</span>
                </li>
              </ul>
              <DemoNote className="mt-4">Activité fictive, sans date : elle illustre le fil d’activité d’un profil.</DemoNote>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Voyageurs proches</h2>
              <ul className="mt-4 space-y-4">
                {similarTravelers(traveler).map((t) => (
                  <li key={t.id} className="rounded-2xl border border-line p-3">
                    <TravelerCard traveler={t} compact />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {current && (
        <StoryViewer
          open
          onClose={() => setHighlight(null)}
          traveler={traveler}
          slides={current.slides}
          title={`À la une : ${current.title}`}
          onFinished={() => setHighlight((h) => (h !== null && h < traveler.highlights.length - 1 ? h + 1 : null))}
        />
      )}
    </>
  );
}
