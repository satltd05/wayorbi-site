import { SiteLink } from '../components/SiteLink';
import { photoCredit } from '../components/TravelPhotoFrame';
import { getPhoto } from '../data/travelPhotos';

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden pt-24">
      <img src="/photos/exp-6-b.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <span className="absolute bottom-2 right-4 text-[10px] text-ink-soft">{photoCredit(getPhoto('exp-6-b'))}</span>
      <div className="container-text relative text-center">
        <p className="font-display text-7xl font-semibold text-sky/40">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Cette page n’existe pas.</h1>
        <p className="mt-4 text-lg text-ink-soft">Le lien est peut-être incomplet. Les carnets et les voyageurs restent à portée de clic.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <SiteLink to="/" className="btn-primary">
            Retour à l’accueil
          </SiteLink>
          <SiteLink to="/carnets" className="btn-secondary">
            Voir les carnets
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
