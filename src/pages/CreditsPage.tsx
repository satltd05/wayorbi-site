import { ExternalLink } from 'lucide-react';
import { PageHero, SectionHeading } from './Shared';
import { CARNETS } from '../data/carnets';
import { TRAVEL_PHOTOS, type TravelPhoto } from '../data/travelPhotos';
import TravelPhotoFrame from '../components/TravelPhotoFrame';
import { SiteLink } from '../components/SiteLink';

/** Chaque photo du site, rangée sous le premier carnet qui l'utilise ; les autres sont regroupées à la fin. */
function buildGroups() {
  const used = new Set<string>();
  const groups: { title: string; to?: string; photos: TravelPhoto[] }[] = CARNETS.map((carnet) => {
    const ids = [carnet.cover, ...carnet.steps.flatMap((s) => [...s.photos, ...s.places.flatMap((p) => (p.photo ? [p.photo] : []))])];
    const photos = [...new Set(ids)].filter((id) => !used.has(id)).map((id) => {
      used.add(id);
      return TRAVEL_PHOTOS.find((p) => p.id === id) as TravelPhoto;
    });
    return { title: `${carnet.country} · ${carnet.title}`, to: `/carnets/${carnet.id}`, photos };
  });
  const others = TRAVEL_PHOTOS.filter((p) => !used.has(p.id));
  if (others.length) groups.push({ title: 'Autres illustrations du site', photos: [...others] });
  return groups.filter((g) => g.photos.length > 0);
}

function CreditCard({ photo }: { photo: TravelPhoto }) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
      <TravelPhotoFrame photo={photo} credit="none" className="aspect-[16/10] w-full" />
      <div className="space-y-1.5 p-4 text-sm">
        <h3 className="font-sans font-semibold text-ink">{photo.place}</h3>
        <p className="text-ink-soft">Photo : {photo.author}</p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {photo.licenseUrl ? (
            <a href={photo.licenseUrl} target="_blank" rel="noreferrer" className="font-semibold text-sky hover:underline">
              {photo.license}
            </a>
          ) : (
            <span className="font-semibold text-sky">{photo.license}</span>
          )}
          <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ink-soft hover:text-ink">
            Source <ExternalLink size={12} aria-hidden="true" />
          </a>
        </p>
      </div>
    </article>
  );
}

export default function CreditsPage() {
  const groups = buildGroups();
  return (
    <>
      <PageHero
        kicker="Crédits photos"
        title="Merci aux photographes qui font voyager"
        description={`Les ${TRAVEL_PHOTOS.length} photos de ce site viennent de Wikimedia Commons. Elles sont publiées sous licence libre (Creative Commons ou domaine public), redimensionnées pour le web et recadrées à l’affichage. Elles illustrent des carnets fictifs : elles n’ont pas été prises par les voyageurs présentés.`}
      />
      {groups.map((group, index) => (
        <section key={group.title} className={`py-14 sm:py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-mist'}`}>
          <div className="container-wide">
            <SectionHeading
              kicker={`${group.photos.length} photo${group.photos.length > 1 ? 's' : ''}`}
              title={group.title}
              action={
                group.to ? (
                  <SiteLink to={group.to} className="btn-secondary">
                    Voir le carnet
                  </SiteLink>
                ) : undefined
              }
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {group.photos.map((photo) => (
                <CreditCard key={photo.id} photo={photo} />
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="py-12">
        <div className="container-text text-sm text-muted">
          <p>Le logo et l’animation du logo appartiennent au projet Wayorbi. Les polices Fraunces et Inter sont distribuées sous licence SIL Open Font License 1.1. Les icônes proviennent de la bibliothèque Lucide (licence ISC).</p>
        </div>
      </section>
    </>
  );
}
