import type { TravelPhoto } from '../data/travelPhotos';

/** Crédit court d'une photo : « © Auteur, Licence ». */
export function photoCredit(photo: TravelPhoto) {
  return `© ${photo.author}, ${photo.license}`;
}

type TravelPhotoFrameProps = {
  photo: TravelPhoto;
  /** Classes du conteneur (taille, ratio, arrondi). */
  className?: string;
  /** Affiche le lieu et le crédit en surimpression, comme sur la maquette Wayorbi. */
  showCredit?: boolean;
  /** Charge l'image immédiatement (photos visibles dès l'arrivée sur la page). */
  eager?: boolean;
};

/**
 * Photo de voyage recadrée dans son conteneur, avec le crédit de l'auteur en surimpression.
 * Le conteneur fixe la taille ; l'image le remplit sans déformation.
 */
export default function TravelPhotoFrame({ photo, className = '', showCredit = true, eager = false }: TravelPhotoFrameProps) {
  return (
    <figure className={`relative overflow-hidden bg-gradient-to-br from-[#DBE5F6] to-[#E6DFF4] ${className}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {showCredit && (
        <figcaption className="absolute inset-x-0 top-0 px-3 pt-2 pb-5 text-right text-[10px] leading-tight font-medium text-white/95 bg-gradient-to-b from-black/45 to-transparent [text-shadow:0_1px_2px_rgba(0,0,0,.5)]">
          {photo.place} · {photoCredit(photo)}
        </figcaption>
      )}
    </figure>
  );
}
