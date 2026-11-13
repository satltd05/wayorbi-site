import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { SiteLink } from './SiteLink';
import { getPhoto, type PhotoId } from '../data/travelPhotos';
import { isBetaOpen, BETA } from '../config/site';
import { photoCredit } from './TravelPhotoFrame';

const LOGO_VIDEO_SRC = '/media/logo-wayorbi-anime.mp4';
const ORBIT_PATH = 'M 40 160 A 360 112 0 1 1 760 160 A 360 112 0 1 1 40 160';

function FloatingCard({ photo, title, detail, to, className }: { photo: PhotoId; title: string; detail: string; to: string; className: string }) {
  const p = getPhoto(photo);
  return (
    <SiteLink to={to} className={`group absolute z-20 hidden w-44 rounded-2xl bg-white p-2 shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-1 lg:block ${className}`}>
      <span className="relative block aspect-[4/3] overflow-hidden rounded-xl">
        <img src={p.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </span>
      <span className="block px-1.5 pb-1 pt-2">
        <span className="block text-sm font-semibold text-ink group-hover:text-sky">{title}</span>
        <span className="block text-xs text-muted">{detail}</span>
        <span className="mt-1 block truncate text-[9px] text-muted/80">{photoCredit(p)}</span>
      </span>
    </SiteLink>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);
  const betaOpen = isBetaOpen();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [reduceMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().then(() => setIsPlaying(true)).catch(() => {});
    else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="accueil" ref={sectionRef} className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(42rem 30rem at 78% 30%, rgba(61,123,242,0.20), transparent 65%), radial-gradient(36rem 26rem at 95% 85%, rgba(140,111,230,0.20), transparent 65%), radial-gradient(40rem 26rem at 0% 0%, rgba(31,184,222,0.16), transparent 60%)',
        }}
      />
      <div className="container-wide relative grid items-center gap-12 lg:grid-cols-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5"
        >
          <p className="text-sm font-medium text-sky">Projet de réseau social du voyage, en développement</p>
          <h1 className="mt-4 font-display text-[2.8rem] font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-[4.2rem]">
            Partage tes voyages. Inspire les prochains départs.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Wayorbi réunit les carnets de voyage des voyageurs : étapes, transports, budgets et conseils, racontés pour que d’autres puissent s’en inspirer. Ce site présente le concept avec des carnets d’exemple et des démonstrations.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <SiteLink to="/carnets" className="btn-primary">
              Parcourir les carnets <ArrowRight size={17} aria-hidden="true" />
            </SiteLink>
            {betaOpen ? (
              <SiteLink to="/beta" className="btn-secondary">
                Tester la maquette
              </SiteLink>
            ) : (
              <SiteLink to="/concept" className="btn-secondary">
                Découvrir le concept
              </SiteLink>
            )}
          </div>
          <p className="mt-6 text-sm text-muted">
            Carnets et profils fictifs, aucune inscription. {betaOpen ? `Bêta de la maquette ouverte jusqu’au ${BETA.lastDayLabel}.` : 'Le bêta-test de la maquette est terminé.'}
          </p>
        </motion.div>

        <motion.div style={reduceMotion ? undefined : { y: mediaY }} className="relative lg:col-span-7">
          {/* L'orbite : l'ellipse et le point qui la parcourt passent derrière le logo animé */}
          <svg aria-hidden="true" viewBox="0 0 800 320" className="pointer-events-none absolute -inset-x-[8%] top-1/2 z-0 w-[116%] -translate-y-1/2">
            <defs>
              <linearGradient id="hero-orbit" x1="0" x2="1">
                <stop offset="0" stopColor="#1fb8de" />
                <stop offset="0.55" stopColor="#3d7bf2" />
                <stop offset="1" stopColor="#b89ede" />
              </linearGradient>
            </defs>
            <g transform="rotate(-9 400 160)">
              <path d={ORBIT_PATH} fill="none" stroke="url(#hero-orbit)" strokeWidth="2.2" strokeOpacity="0.9" />
              {!reduceMotion && (
                <circle r="7" fill="#ffffff" stroke="#1fb8de" strokeWidth="3">
                  <animateMotion dur="16s" repeatCount="indefinite" path={ORBIT_PATH} />
                </circle>
              )}
            </g>
          </svg>

          <div className="relative z-10 mx-auto w-full max-w-[38rem] rounded-[1.6rem] bg-white/85 p-1.5 shadow-[0_30px_70px_-30px_rgba(61,123,242,0.55)] backdrop-blur-md">
            <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-[#dcebff]">
              <video
                ref={videoRef}
                src={LOGO_VIDEO_SRC}
                poster="/wayorbi-apercu.jpg"
                autoPlay={!reduceMotion}
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Animation du logo Wayorbi : un globe bleu et un avion en orbite"
                className="h-full w-full object-contain"
              />
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={isPlaying ? 'Mettre l’animation du logo en pause' : 'Lire l’animation du logo'}
                className="absolute bottom-3 right-3 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-white/90 px-3 text-xs font-semibold text-ink backdrop-blur hover:bg-white"
              >
                {isPlaying ? <Pause size={14} className="text-sky" aria-hidden="true" /> : <Play size={14} className="text-sky" aria-hidden="true" />}
                {isPlaying ? 'Pause' : 'Lire'}
              </button>
            </div>
          </div>

          {/* Partie avant de l'orbite, dessinée par-dessus le cadre pour donner la profondeur */}
          <svg aria-hidden="true" viewBox="0 0 800 320" className="pointer-events-none absolute -inset-x-[8%] top-1/2 z-[15] w-[116%] -translate-y-1/2">
            <g transform="rotate(-9 400 160)">
              <path d="M 40 160 A 360 112 0 0 0 760 160" fill="none" stroke="url(#hero-orbit)" strokeWidth="2.2" strokeOpacity="0.9" />
            </g>
          </svg>

          <FloatingCard photo="kyoto-2" title="Kyoto à l’aube" detail="Carnet Japon · étape 4" to="/carnets/japon#etape-kyoto" className="-left-6 -top-10" />
          <FloatingCard photo="bergen-1" title="Arrivée par la mer" detail="Carnet Norvège · Bergen" to="/carnets/norvege#etape-bergen" className="-bottom-12 right-0" />
        </motion.div>
      </div>
    </section>
  );
}
