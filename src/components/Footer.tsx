import { ArrowUpRight, Globe2, Mail } from 'lucide-react';
import { SiteLink } from './SiteLink';
const cols = [
  {title:'Découvrir', links:[['Le concept','/concept'],['Carnets interactifs','/carnets'],['Explorer les exemples','/explorer']]},
  {title:'La plateforme', links:[['Fonctionnalités','/fonctionnalites'],['Communauté','/communaute'],['Travel DNA','/travel-dna']]},
  {title:'Le projet', links:[['Participer à la bêta','/beta'],['Questions fréquentes','/faq'],['Crédits photos','/credits'],['Nous contacter','mailto:contact@wayorbi.com']]},
];
export default function Footer() {
  return <footer className="relative bg-[#111C3B] text-[#C2CDE9] overflow-hidden">
    <div aria-hidden="true" className="absolute right-[-120px] top-[-200px] w-[550px] h-[550px] rounded-full bg-[#526FF5]/15 blur-[120px]"/>
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4 space-y-5">
          <SiteLink to="/" className="text-white font-display text-3xl font-bold tracking-tight">Wayorbi<span className="text-[#8DA1FF]">.</span></SiteLink>
          <p className="text-sm leading-relaxed max-w-xs">Des voyages vécus, des itinéraires partagés, des conseils qui font la différence. Un réseau social de voyage en construction.</p>
          <span className="inline-flex gap-2 text-xs items-center rounded-full px-3 py-1.5 border border-white/20"><Globe2 size={14}/> Projet indépendant en développement</span>
        </div>
        {cols.map(col => <div className="md:col-span-2" key={col.title}><h3 className="text-white text-sm font-bold mb-4">{col.title}</h3><nav className="flex flex-col items-start gap-3">{col.links.map(([label,to]) => <SiteLink key={to} to={to} className="text-sm text-[#B7C2DE] hover:text-white transition">{label}</SiteLink>)}</nav></div>)}
        <div className="md:col-span-2"><h3 className="text-white text-sm font-bold mb-4">Un mot ?</h3><a href="mailto:contact@wayorbi.com" className="inline-flex items-center gap-2 text-sm hover:text-white"><Mail size={15}/> Nous écrire <ArrowUpRight size={13}/></a></div>
      </div>
      <div className="border-t border-white/15 mt-12 pt-6 flex flex-col sm:flex-row gap-3 justify-between text-xs text-[#9FAECF]"><span>© 2026 Wayorbi · Projet de plateforme en cours de création.</span><span>Les carnets, profils et budgets illustrés sont des exemples fictifs.</span></div>
    </div>
  </footer>;
}
