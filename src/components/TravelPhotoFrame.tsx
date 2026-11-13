import { getPhoto, type PhotoId, type TravelPhoto } from '../data/travelPhotos';

/** Crédit court d'une photo : « © Auteur, Licence ». */
export function photoCredit(photo: TravelPhoto) {
  return `© ${photo.author}, ${photo.license}`;
}

type TravelPhotoFrameProps = {
  photo: TravelPhoto | PhotoId;
  /** Classes du conteneur (taille, ratio, arrondi). */
  className?: string;
  /** Crédit en surimpression : complet (lieu + auteur), court (auteur) ou masqué. */
  credit?: 'full' | 'short' | 'none';
  creditPosition?: 'top' | 'bottom';
  /** Charge l'image immédiatement (photos visibles dès l'arrivée sur la page). */
  eager?: boolean;
  /** Image décorative : le texte alternatif est vidé quand le contenu est déjà décrit à côté. */
  decorative?: boolean;
  imgClassName?: string;
};

/**
 * Photo de voyage recadrée dans son conteneur, avec le crédit de l'auteur en surimpression
 * (les licences Creative Commons demandent de citer l'auteur).
 */
export default function TravelPhotoFrame({
  photo,
  className = '',
  credit = 'full',
  creditPosition = 'top',
  eager = false,
  decorative = false,
  imgClassName = '',
}: TravelPhotoFrameProps) {
  const p = typeof photo === 'string' ? getPhoto(photo) : photo;
  const top = creditPosition === 'top';
  return (
    <figure className={`relative overflow-hidden bg-gradient-to-br from-[#dbe5f6] to-[#e6dff4] ${className}`}>
      <img
        src={p.src}
        alt={decorative ? '' : p.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
      {credit !== 'none' && (
        <figcaption
          className={`pointer-events-none absolute inset-x-0 px-3 text-right text-[10px] font-medium leading-tight text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,.6)] ${
            top ? 'top-0 pt-2 pb-5 bg-gradient-to-b from-black/40 to-transparent' : 'bottom-0 pb-2 pt-5 bg-gradient-to-t from-black/40 to-transparent'
          }`}
        >
          {credit === 'full' ? `${p.place} · ${photoCredit(p)}` : photoCredit(p)}
        </figcaption>
      )}
    </figure>
  );
}
