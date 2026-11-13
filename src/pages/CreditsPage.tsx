import { Camera, ExternalLink } from 'lucide-react';
import { PageHero, SectionHeading } from './Shared';
import { CONCEPT_JOURNEYS, EXPLORER_ENTRIES } from '../data/wayorbiConceptData';
import { EXPLORER_PHOTOS, getPhoto, JOURNEY_COVERS, STEP_PHOTOS, type TravelPhoto } from '../data/travelPhotos';
import TravelPhotoFrame from '../components/TravelPhotoFrame';

const GROUPS: { title: string; photos: TravelPhoto[] }[] = [
  ...CONCEPT_JOURNEYS.map((journey) => ({
    title: `Carnet ${journey.country} · ${journey.title}`,
    photos: [JOURNEY_COVERS[journey.id], ...journey.steps.flatMap((step) => STEP_PHOTOS[step.id] ?? [])]
      .filter(Boolean)
      .map(getPhoto),
  })),
  {
    title: 'Explorer · Itinéraires, budgets et bons plans',
    photos: EXPLORER_ENTRIES.flatMap((entry) => EXPLORER_PHOTOS[entry.id] ?? []).map(getPhoto),
  },
];

function CreditCard({ photo }: { photo: TravelPhoto }) {
  return (
    <article className="rounded-[18px] overflow-hidden bg-white border border-[#E4E9F1] shadow-[0_1px_2px_rgba(17,24,39,0.04),0_6px_20px_rgba(17,24,39,0.06)]">
      <TravelPhotoFrame photo={photo} showCredit={false} className="aspect-[16/10] w-full" />
      <div className="p-4 space-y-1.5 text-sm">
        <h3 className="font-semibold text-[#111827]">{photo.place}</h3>
        <p className="text-[#4B5563]">Photo : {photo.author}</p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {photo.licenseUrl ? (
            <a href={photo.licenseUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#5468DC] hover:underline">
              {photo.license}
            </a>
          ) : (
            <span className="font-semibold text-[#5468DC]">{photo.license}</span>
          )}
          <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#4B5563] hover:text-[#111827]">
            Source <ExternalLink size={12} aria-hidden="true" />
          </a>
        </p>
      </div>
    </article>
  );
}

export function CreditsPage() {
  const total = GROUPS.reduce((n, g) => n + g.photos.length, 0);
  return (
    <>
      <PageHero
        eyebrow="Crédits photos"
        title={<>Merci aux photographes <span className="gradient-text">qui font voyager.</span></>}
        description={`Les ${total} photos qui illustrent les carnets d'exemple viennent de Wikimedia Commons. Elles sont publiées sous licence libre (Creative Commons ou domaine public), redimensionnées pour le web et recadrées à l'affichage.`}
        icon={<Camera size={108} strokeWidth={1.2} />}
      />
      {GROUPS.map((group, index) => (
        <section key={group.title} className={`py-14 sm:py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F3F6FB]'}`}>
          <div className="container-wide">
            <SectionHeading eyebrow={`${group.photos.length} photos`} title={group.title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {group.photos.map((photo) => <CreditCard key={photo.id} photo={photo} />)}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
