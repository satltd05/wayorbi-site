import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Pause, Play } from 'lucide-react';

const LOGO_VIDEO_SRC = '/media/logo-wayorbi-anime.mp4';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [prefersReducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="accueil"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F2F5F9] text-[#111827] pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28"
    >
      {/* Luminous atmospheric cyan-blue-lilac halos harmonizing with the animated Wayorbi logo */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: prefersReducedMotion ? 0.85 : haloOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute -top-24 left-[8%] h-[460px] w-[460px] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-6 right-[8%] h-[520px] w-[520px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(140,126,230,0.24) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[320px] w-[760px] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(74,143,245,0.18) 0%, transparent 72%)' }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Animated 16:9 Logo Centerpiece — prominent on mobile and right focal anchor on desktop */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: mediaY }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:order-2 relative"
          >
            {/* Complementary luminous aura matching the video's cyan-blue-violet gradient */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 sm:-inset-6 rounded-[32px] bg-gradient-to-tr from-[#22D3EE]/35 via-[#4A8FF5]/25 to-[#B89EDE]/40 blur-2xl"
            />

            <div className="relative rounded-[22px] p-1.5 bg-white/80 backdrop-blur-md border border-white shadow-[0_20px_60px_rgba(74,143,245,0.22)]">
              <div className="relative aspect-video w-full overflow-hidden rounded-[17px] bg-[#DCEBFF]">
                <video
                  ref={videoRef}
                  src={LOGO_VIDEO_SRC}
                  poster="/wayorbi-apercu.jpg"
                  autoPlay={!prefersReducedMotion}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-label="Animation officielle du logo Wayorbi présentant le globe bleu et l'avion en orbite"
                  className="h-full w-full object-contain"
                />

                {/* Accessible Play/Pause control */}
                <button
                  type="button"
                  onClick={togglePlayback}
                  aria-label={isPlaying ? "Mettre l'animation du logo en pause" : "Lire l'animation du logo"}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-xl bg-white/85 hover:bg-white text-xs font-medium text-[#111827] backdrop-blur-md border border-[#E4E9F1] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5]"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#4A8FF5]" aria-hidden="true" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#4A8FF5]" aria-hidden="true" />
                      <span>Lire</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Editorial Value Proposition */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: copyY }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:order-1 space-y-6"
          >
            <p className="text-sm font-semibold text-[#5468DC]">
              Réseau social de voyage · Carnets interactifs
            </p>

            <h1
              className="font-display font-bold tracking-tight text-[#111827] leading-[1.08]"
              style={{
                fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)',
                textWrap: 'balance',
              }}
            >
              Partagez vos voyages.{' '}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#5B7CFA] to-[#8C7EE6] bg-clip-text text-transparent">
                Inspirez les prochains départs.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl">
              Wayorbi réunit des carnets de voyage interactifs, des itinéraires vécus, des budgets réels et des conseils de terrain pour aider chaque voyageur à préparer son prochain départ en confiance.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#carnets"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-xl text-sm sm:text-base font-medium text-white bg-gradient-to-r from-[#2563EB] via-[#5B7CFA] to-[#7C3AED] hover:brightness-105 transition-all duration-200 whitespace-nowrap shrink-0 shadow-[0_10px_28px_rgba(74,143,245,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5]"
              >
                <span>Explorer un carnet</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#concept"
                className="inline-flex items-center min-h-[44px] px-3 text-sm sm:text-base font-medium text-[#111827] hover:text-[#5468DC] underline underline-offset-4 decoration-[#CBD5E1] hover:decoration-[#5468DC] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5] rounded-md"
              >
                Découvrir le concept
              </a>
            </div>

            <div className="pt-4 border-t border-[#E4E9F1] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#4B5563]">
              <span>Carnets interactifs</span>
              <span aria-hidden="true" className="text-[#8A94A6]">·</span>
              <span>Budgets transparents</span>
              <span aria-hidden="true" className="text-[#8A94A6]">·</span>
              <span>Entraide voyageurs</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
