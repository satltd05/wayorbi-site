import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteLink } from '../components/SiteLink';
import TravelPhotoFrame from '../components/TravelPhotoFrame';
import type { PhotoId } from '../data/travelPhotos';

/** Trois photos assemblées : une grande et deux petites. */
export function PhotoCollage({ photos, className = '' }: { photos: PhotoId[]; className?: string }) {
  const [a, b, c] = photos;
  return (
    <div className={`grid h-[260px] grid-cols-6 grid-rows-6 gap-3 sm:h-[400px] lg:h-[460px] ${className}`}>
      {a && <TravelPhotoFrame photo={a} eager credit="short" creditPosition="bottom" className="col-span-4 row-span-6 rounded-[1.5rem]" />}
      {b && <TravelPhotoFrame photo={b} eager credit="short" creditPosition="bottom" className="col-span-2 row-span-3 rounded-[1.25rem]" />}
      {c && <TravelPhotoFrame photo={c} eager credit="short" creditPosition="bottom" className="col-span-2 row-span-3 rounded-[1.25rem]" />}
    </div>
  );
}

/** En-tête de page : titre, texte, actions, et une mosaïque de photos quand la page s'y prête. */
export function PageHero({
  kicker,
  title,
  description,
  actions,
  photos,
  children,
}: {
  kicker?: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  photos?: PhotoId[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(56rem 28rem at 92% -8%, rgba(140,111,230,0.16), transparent 62%), radial-gradient(48rem 26rem at -8% -4%, rgba(31,184,222,0.16), transparent 60%)',
        }}
      />
      <div className={`container-wide relative grid grid-cols-1 items-center gap-10 ${photos ? 'lg:grid-cols-12' : ''}`}>
        <div className={photos ? 'lg:col-span-6' : 'max-w-3xl'}>
          {kicker && <p className="text-sm font-medium text-sky">{kicker}</p>}
          <h1 className="mt-3 font-display text-[2.5rem] font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-[3.6rem]">{title}</h1>
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{description}</div>
          {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
          {children}
        </div>
        {photos && <PhotoCollage photos={photos} className="lg:col-span-6" />}
      </div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  action,
  id,
  className = '',
}: {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="max-w-3xl">
        {kicker && <p className="mb-2 text-sm font-medium text-sky">{kicker}</p>}
        <h2 id={id} className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.6rem]">
          {title}
        </h2>
        {description && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Bandeau de fin de page sur fond nuit, avec l'orbite du logo en filigrane. */
export function CTA({ title, description, button, to, secondary }: { title: string; description: string; button: string; to: string; secondary?: ReactNode }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[2rem] bg-night px-6 py-12 text-white sm:px-12 sm:py-16">
          <svg aria-hidden="true" viewBox="0 0 600 300" className="pointer-events-none absolute -right-24 -top-10 h-[130%] w-auto opacity-60">
            <defs>
              <linearGradient id="cta-orbit" x1="0" x2="1">
                <stop offset="0" stopColor="#1fb8de" />
                <stop offset="0.5" stopColor="#3d7bf2" />
                <stop offset="1" stopColor="#b89ede" />
              </linearGradient>
            </defs>
            <ellipse cx="300" cy="150" rx="270" ry="95" fill="none" stroke="url(#cta-orbit)" strokeWidth="2" transform="rotate(-14 300 150)" />
            <ellipse cx="300" cy="150" rx="200" ry="62" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" transform="rotate(-14 300 150)" />
          </svg>
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">{description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SiteLink to={to} className="btn-secondary">
                {button} <ArrowRight size={17} aria-hidden="true" />
              </SiteLink>
              {secondary}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeatureCard({ icon, title, description, footer }: { icon: ReactNode; title: string; description: string; footer?: ReactNode }) {
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 sm:p-7">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky/10 text-sky">{icon}</span>
      <h3 className="mt-5 font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{description}</p>
      {footer && <div className="mt-5">{footer}</div>}
    </article>
  );
}
