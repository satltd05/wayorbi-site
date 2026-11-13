import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';
import Modal from './Modal';
import TravelerAvatar from './TravelerAvatar';
import { SiteLink } from './SiteLink';
import { getPhoto } from '../data/travelPhotos';
import type { StorySlide, Traveler } from '../data/travelers';
import { photoCredit } from './TravelPhotoFrame';

const SLIDE_MS = 5000;

/**
 * Lecteur de story (fictive) : barres de progression, avance automatique,
 * flèches du clavier, pause, et Échap pour fermer.
 */
export default function StoryViewer({
  open,
  onClose,
  traveler,
  slides,
  title,
  onFinished,
}: {
  open: boolean;
  onClose: () => void;
  traveler: Traveler;
  slides: StorySlide[];
  title: string;
  /** Appelé à la fin de la dernière image (par exemple pour passer au voyageur suivant). */
  onFinished?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (open) {
      setIndex(0);
      setPaused(!!reduceMotion);
    }
  }, [open, traveler.id, title, reduceMotion]);

  const next = useCallback(() => {
    if (index < slides.length - 1) setIndex(index + 1);
    else (onFinished ?? onClose)();
  }, [index, slides.length, onFinished, onClose]);
  const previous = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    if (!open || paused) return;
    const timer = window.setTimeout(next, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [open, paused, index, next]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, next, previous]);

  const slide = slides[Math.min(index, slides.length - 1)];
  if (!slide) return null;
  const photo = getPhoto(slide.photo);

  return (
    <Modal open={open} onClose={onClose} label={`Story de ${traveler.name} : ${title}`} className="relative w-[min(92vw,26rem)]">
      <div className="relative aspect-[9/16] max-h-[86vh] w-full overflow-hidden rounded-[1.75rem] bg-night text-white shadow-2xl">
        <img key={photo.id} src={photo.src} alt={photo.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/65 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/75 to-transparent" />

        <div className="absolute inset-x-0 top-0 p-4">
          <div className="flex gap-1" aria-hidden="true">
            {slides.map((s, i) => (
              <span key={`${s.photo}-${i}`} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
                <span
                  key={`${index}-${paused}`}
                  className="block h-full origin-left rounded-full bg-gradient-to-r from-lagoon via-sky to-violet"
                  style={
                    i < index
                      ? { transform: 'scaleX(1)' }
                      : i === index
                        ? paused
                          ? { transform: 'scaleX(0.5)' }
                          : { animation: `story-progress ${SLIDE_MS}ms linear forwards` }
                        : { transform: 'scaleX(0)' }
                  }
                />
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <TravelerAvatar traveler={traveler} size="sm" />
            <div className="min-w-0 flex-1">
              <SiteLink to={`/voyageurs/${traveler.id}`} onClick={onClose} className="block truncate text-sm font-semibold hover:underline">
                {traveler.name} <span className="font-normal text-white/75">{traveler.handle}</span>
              </SiteLink>
              <p className="text-xs text-white/75">
                {title} · <span className="demo-tag bg-white/15 text-white">Story fictive</span>
              </p>
            </div>
            <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Reprendre la lecture' : 'Mettre en pause'} className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/25">
              {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
            <button type="button" onClick={onClose} aria-label="Fermer la story" className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/25">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-display text-xl leading-snug">{slide.caption}</p>
          <p className="mt-2 text-[10px] text-white/70">
            {photo.place} · {photoCredit(photo)}
          </p>
        </div>

        <button type="button" onClick={previous} disabled={index === 0} aria-label="Image précédente" className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/25 hover:bg-black/40 disabled:opacity-0">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button type="button" onClick={next} aria-label={index === slides.length - 1 ? 'Terminer la story' : 'Image suivante'} className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/25 hover:bg-black/40">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-white/75">
        Image {index + 1} sur {slides.length} · flèches du clavier pour naviguer, Échap pour fermer
      </p>
    </Modal>
  );
}
