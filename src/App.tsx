import { Component, Suspense, lazy, useEffect, useRef, type ReactNode } from 'react';
import { MotionConfig, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SiteLink } from './components/SiteLink';
import { matchPath, scrollToHash, useLocation } from './lib/router';
import { getCarnet, getTraveler } from './lib/carnets';
import { SITE } from './config/site';

const HomePage = lazy(() => import('./pages/HomePage'));
const ConceptPage = lazy(() => import('./pages/ConceptPage'));
const CarnetsPage = lazy(() => import('./pages/CarnetsPage'));
const CarnetDetailPage = lazy(() => import('./pages/CarnetDetailPage'));
const AtelierPage = lazy(() => import('./pages/AtelierPage'));
const ExplorerPage = lazy(() => import('./pages/ExplorerPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const TravelerPage = lazy(() => import('./pages/TravelerPage'));
const TravelDnaPage = lazy(() => import('./pages/TravelDnaPage'));
const MySpacePage = lazy(() => import('./pages/MySpacePage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const BetaPage = lazy(() => import('./pages/BetaPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const CreditsPage = lazy(() => import('./pages/CreditsPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

interface RouteDef {
  pattern: string;
  render: (params: Record<string, string>) => ReactNode;
  meta: (params: Record<string, string>) => { title: string; description?: string } | null;
}

const ROUTES: RouteDef[] = [
  { pattern: '/', render: () => <HomePage />, meta: () => ({ title: 'Wayorbi — Le réseau social des carnets de voyage', description: SITE.description }) },
  { pattern: '/concept', render: () => <ConceptPage />, meta: () => ({ title: 'Le concept — Wayorbi', description: 'Pourquoi Wayorbi rassemble expériences, informations pratiques et conseils de voyageurs dans des carnets structurés.' }) },
  { pattern: '/carnets', render: () => <CarnetsPage />, meta: () => ({ title: 'Carnets de voyage d’exemple — Wayorbi', description: 'Neuf carnets d’exemple avec itinéraires, transports, budgets, adresses et conseils.' }) },
  {
    pattern: '/carnets/:id',
    render: ({ id }) => <CarnetDetailPage key={id} id={id} />,
    meta: ({ id }) => {
      const carnet = getCarnet(id);
      return carnet ? { title: `${carnet.title} (${carnet.country}) — carnet d’exemple Wayorbi`, description: carnet.summary } : null;
    },
  },
  { pattern: '/atelier', render: () => <AtelierPage />, meta: () => ({ title: 'Atelier carnet — Wayorbi', description: 'Essayer la création d’un carnet de voyage en deux étapes, avec un brouillon gardé dans le navigateur.' }) },
  { pattern: '/explorer', render: () => <ExplorerPage />, meta: () => ({ title: 'Explorer les voyages — Wayorbi', description: 'Rechercher des carnets par destination, budget, durée, type de voyage et transport.' }) },
  { pattern: '/communaute', render: () => <CommunityPage />, meta: () => ({ title: 'Voyageurs et communauté — Wayorbi', description: 'Profils de voyageurs, stories, échanges et visibilité : la dimension sociale de Wayorbi.' }) },
  {
    pattern: '/voyageurs/:id',
    render: ({ id }) => <TravelerPage key={id} id={id} />,
    meta: ({ id }) => {
      const traveler = getTraveler(id);
      return traveler ? { title: `${traveler.name} (${traveler.handle}) — profil fictif Wayorbi`, description: traveler.bio } : null;
    },
  },
  { pattern: '/travel-dna', render: () => <TravelDnaPage />, meta: () => ({ title: 'Travel DNA — Wayorbi', description: 'Huit critères pour recevoir des suggestions de carnets et de voyageurs, avec un calcul transparent.' }) },
  { pattern: '/mon-espace', render: () => <MySpacePage />, meta: () => ({ title: 'Mon espace (démo) — Wayorbi', description: 'Carnets enregistrés, voyageurs suivis, commentaires et brouillon, gardés dans ce navigateur.' }) },
  { pattern: '/fonctionnalites', render: () => <FeaturesPage />, meta: () => ({ title: 'Fonctionnalités — Wayorbi', description: 'Ce qui se teste sur ce site et ce qui viendra avec l’application Wayorbi.' }) },
  { pattern: '/beta', render: () => <BetaPage />, meta: () => ({ title: 'Bêta-test de la maquette — Wayorbi', description: 'Tester la maquette interactive de Wayorbi et partager son avis.' }) },
  { pattern: '/faq', render: () => <FaqPage />, meta: () => ({ title: 'Questions fréquentes — Wayorbi', description: 'Le projet, les démonstrations, les données et le bêta-test.' }) },
  { pattern: '/credits', render: () => <CreditsPage />, meta: () => ({ title: 'Crédits photos — Wayorbi', description: 'Auteurs et licences des photos de voyage utilisées sur le site.' }) },
  { pattern: '/mentions-legales', render: () => <LegalPage />, meta: () => ({ title: 'Mentions légales — Wayorbi' }) },
  { pattern: '/confidentialite', render: () => <PrivacyPage />, meta: () => ({ title: 'Confidentialité — Wayorbi' }) },
];

function resolve(pathname: string) {
  for (const route of ROUTES) {
    const params = matchPath(route.pattern, pathname);
    if (params) {
      const meta = route.meta(params);
      if (meta) return { element: route.render(params), meta };
    }
  }
  return { element: <NotFoundPage />, meta: { title: 'Page introuvable — Wayorbi', description: SITE.description } };
}

class ErrorBoundary extends Component<{ children: ReactNode; resetKey: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidUpdate(previous: { resetKey: string }) {
    if (previous.resetKey !== this.props.resetKey && this.state.failed) this.setState({ failed: false });
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="container-text flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">Cette page n’a pas pu s’afficher.</h1>
        <p className="mt-3 text-ink-soft">Recharge la page ; si le problème continue, écris à {SITE.contactEmail}.</p>
        <SiteLink to="/" className="btn-primary mt-6">
          Retour à l’accueil
        </SiteLink>
      </div>
    );
  }
}

function PageFallback() {
  return <div className="min-h-[70vh]" aria-busy="true" aria-label="Chargement de la page" />;
}

export default function App() {
  const { pathname } = useLocation();
  const { element, meta } = resolve(pathname);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description ?? SITE.description);
  }, [meta.title, meta.description]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (window.location.hash) scrollToHash(window.location.hash);
      return;
    }
    if (!window.location.hash) mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-mist">
        <a href="#contenu-principal" className="skip-link">
          Aller au contenu
        </a>
        <Navbar currentPath={pathname} />
        <main id="contenu-principal" ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
          <ErrorBoundary resetKey={pathname}>
            <Suspense fallback={<PageFallback />}>
              <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                {element}
              </motion.div>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
