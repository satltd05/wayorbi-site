import HeroSection from '../components/HeroSection';
import FeedSection from '../components/FeedSection';
import InteractiveJournalSection from '../components/InteractiveJournalSection';
import ConceptOverviewSection from '../components/ConceptOverviewSection';
import JoinProjectSection from '../components/JoinProjectSection';
import { CTA } from './Shared';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeedSection />
      <InteractiveJournalSection />
      <ConceptOverviewSection />
      <CTA
        title="Trouver le prochain voyage avec huit critères"
        description="Envies, budget, rythme, transport, rencontres… Le Travel DNA suggère des carnets et des voyageurs, et explique chaque suggestion."
        button="Configurer mon Travel DNA"
        to="/travel-dna"
      />
      <JoinProjectSection />
    </>
  );
}
