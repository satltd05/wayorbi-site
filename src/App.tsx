import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InteractiveJournalSection from './components/InteractiveJournalSection';
import EcosystemBentoSection from './components/EcosystemBentoSection';
import CommunityExplorerSection from './components/CommunityExplorerSection';
import JoinProjectSection from './components/JoinProjectSection';
import Footer from './components/Footer';
import { HomeLinkGrid } from './pages/Shared';
import { AtelierPage, TravelDNAPage } from './pages/InteractivePages';
import { BetaPage, CarnetsPage, CommunityPage, ConceptPage, ExplorerPage, FAQPage, FeaturesPage } from './pages/EditorialPages';
import { SiteLink } from './components/SiteLink';
import { CreditsPage } from './pages/CreditsPage';

const PAGE_TITLES: Record<string,string> = {
 '/':'Wayorbi — Le voyage vécu et partagé',
 '/concept':'Le concept — Wayorbi',
 '/carnets':'Carnets de voyage — Wayorbi',
 '/atelier':'Atelier carnet — Wayorbi',
 '/explorer':'Explorer — Wayorbi',
 '/communaute':'Communauté — Wayorbi',
 '/travel-dna':'Travel DNA — Wayorbi',
 '/fonctionnalites':'Fonctionnalités — Wayorbi',
 '/beta':'Participer à la bêta — Wayorbi',
 '/faq':'Questions fréquentes — Wayorbi',
 '/credits':'Crédits photos — Wayorbi',
};
function HomePage(){return <><HeroSection/><HomeLinkGrid/><InteractiveJournalSection/><EcosystemBentoSection/><CommunityExplorerSection/><section className="bg-[#EDF3FF] py-10"><div className="container-wide flex flex-wrap items-center justify-between gap-5"><div><p className="text-xs font-bold text-[#526BDC] uppercase tracking-wider">Découvrir la vision entière</p><h2 className="font-display text-2xl sm:text-3xl text-[#1A2947] font-bold mt-1">Toutes les facettes de Wayorbi ont leur page.</h2></div><SiteLink to="/fonctionnalites" className="btn-primary">Voir les fonctionnalités</SiteLink></div></section><JoinProjectSection/></>}
export default function App(){
 const [pathname,setPathname]=useState(()=>window.location.pathname.replace(/\/$/,'') || '/');
 useEffect(()=>{
   const sync=()=>setPathname(window.location.pathname.replace(/\/$/,'')||'/');
   window.addEventListener('popstate',sync);
   return ()=>window.removeEventListener('popstate',sync);
 },[]);
 useEffect(()=>{
   document.title=PAGE_TITLES[pathname] || 'Page introuvable — Wayorbi';
   const desc=document.querySelector('meta[name="description"]');
   if(desc) desc.setAttribute('content',pathname==='/'?'Découvrez Wayorbi, un projet de réseau social dédié aux carnets de voyage, aux itinéraires, aux budgets et aux rencontres.':`Découvrez ${PAGE_TITLES[pathname]||'Wayorbi'} : concept, démonstrations et expériences de voyage imaginées pour Wayorbi.`);
 },[pathname]);
 const page=(()=>{switch(pathname){
 case '/':return <HomePage/>;
 case '/concept':return <ConceptPage/>;
 case '/carnets':return <CarnetsPage/>;
 case '/atelier':return <AtelierPage/>;
 case '/explorer':return <ExplorerPage/>;
 case '/communaute':return <CommunityPage/>;
 case '/travel-dna':return <TravelDNAPage/>;
 case '/fonctionnalites':return <FeaturesPage/>;
 case '/beta':return <BetaPage/>;
 case '/faq':return <FAQPage/>;
 case '/credits':return <CreditsPage/>;
 default:return <div className="min-h-[65vh] bg-[#F3F6FB] flex items-center justify-center pt-24"><div className="px-6 text-center"><p className="font-display text-7xl font-bold text-[#BECFF8]">404</p><h1 className="font-display text-3xl font-bold mt-3 text-[#1C2946]">Cette page n'existe pas.</h1><p className="text-[#68758C] mt-3">Mais il reste beaucoup à découvrir sur Wayorbi.</p><SiteLink to="/" className="btn-primary mt-7">Retour à l'accueil</SiteLink></div></div>;
 }})();
 return <MotionConfig reducedMotion="user"><div className="min-h-screen flex flex-col bg-[#F2F5F9]"><a href="#contenu-principal" className="skip-link">Aller au contenu</a><Navbar currentPath={pathname}/><main id="contenu-principal" className="flex-1">{page}</main><Footer/></div></MotionConfig>
}
