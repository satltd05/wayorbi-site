import { ArrowRight, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { SiteLink } from '../components/SiteLink';

export function PageHero({ eyebrow, title, description, icon, actions, dark = false }: { eyebrow:string; title:ReactNode; description:string; icon?:ReactNode; actions?:ReactNode; dark?:boolean }) {
  return <section className={`relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-24 ${dark ? 'text-white bg-[#101B3A]' : 'text-[#15203E] bg-[#F2F5FA]'}`}>
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-80" style={{ background: dark ? 'radial-gradient(circle at 85% 40%,rgba(142,98,255,.35),transparent 40%),radial-gradient(circle at 5% 0%,rgba(37,166,250,.28),transparent 35%)' : 'radial-gradient(circle at 86% 32%,rgba(160,120,252,.19),transparent 38%),radial-gradient(circle at 6% 0%,rgba(44,192,239,.18),transparent 34%)' }}/>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 items-center gap-8">
      <div className="lg:col-span-9">
        <p className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide mb-7 ${dark?'bg-white/10 text-[#BDD0FF] border border-white/15':'bg-white text-[#5265DB] border border-[#E1E8F5]'}`}><Sparkles size={14}/>{eyebrow}</p>
        <h1 className="font-display font-bold tracking-[-.045em] leading-[1.08] text-4xl sm:text-5xl md:text-6xl max-w-4xl">{title}</h1>
        <p className={`mt-7 text-base sm:text-lg leading-relaxed max-w-2xl ${dark ? 'text-[#C4CDE7]' : 'text-[#606C82]'}`}>{description}</p>
        {actions && <div className="flex flex-wrap gap-3 mt-9">{actions}</div>}
      </div>
      {icon && <div className="hidden lg:flex lg:col-span-3 items-center justify-center"><div className={`w-56 h-56 rounded-[54px] rotate-[-8deg] flex items-center justify-center ${dark ? 'bg-white/10 border-white/15 text-[#9BB9FF]' : 'bg-white border-[#DDE6FB] text-[#6485F3]'} border shadow-[0_24px_60px_rgba(70,100,220,.14)]`}>{icon}</div></div>}
    </div>
  </section>;
}
export function CTA({ title, description, button, to }: {title:string;description:string;button:string;to:string}) {
  return <section className="bg-[#F2F5FA] py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#1E49B9] via-[#5364DD] to-[#7D42D4] text-white p-8 sm:p-12 lg:p-16"><div aria-hidden="true" className="absolute right-[-50px] top-[-80px] h-72 w-72 rounded-full border-[60px] border-white/10"/><div className="relative max-w-2xl"><p className="text-xs uppercase font-bold tracking-widest text-[#C8E1FF] mb-4">La suite du voyage</p><h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2><p className="text-[#E3E8FF] mt-4 leading-relaxed">{description}</p><SiteLink to={to} className="inline-flex items-center gap-2 mt-7 bg-white text-[#2449B6] px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#EAF1FF] transition">{button}<ArrowRight size={17}/></SiteLink></div></div></div></section>;
}
export function SectionHeading({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}) {
  return <div className="max-w-3xl mb-10 sm:mb-14"><p className="text-[#596BE4] uppercase tracking-[.15em] text-[11px] font-extrabold mb-3">{eyebrow}</p><h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#17223C] font-bold tracking-tight">{title}</h2>{description && <p className="text-[#667187] mt-4 leading-relaxed">{description}</p>}</div>;
}
export function FeatureCard({icon,title,description,tag}:{icon:ReactNode;title:string;description:string;tag?:string}) {
 return <article className="rounded-3xl bg-white border border-[#E6EBF5] p-6 sm:p-7 shadow-[0_8px_32px_rgba(30,52,91,.035)] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(30,52,91,.09)] transition-all"><span className="inline-flex p-3 rounded-2xl text-[#4E6FF1] bg-[#EDF3FF] mb-5">{icon}</span>{tag && <p className="text-xs text-[#6174D7] font-bold mb-2">{tag}</p>}<h3 className="font-display font-bold text-lg text-[#182440] mb-3">{title}</h3><p className="text-sm leading-relaxed text-[#647087]">{description}</p></article>;
}
export function HomeLinkGrid(){
 const items=[{title:'Des carnets vivants',sub:'Étapes, anecdotes, itinéraires et budgets dans une seule expérience.',to:'/carnets',num:'01',gradient:'from-[#D1F4FE] to-[#DDE5FE]'},{title:'Une communauté de voyageurs',sub:'Des profils, des stories et des échanges autour d’expériences vécues.',to:'/communaute',num:'02',gradient:'from-[#E7E7FF] to-[#F4E0FF]'},{title:'Une découverte sur mesure',sub:'Un Travel DNA pour explorer selon tes envies et ton style de voyage.',to:'/travel-dna',num:'03',gradient:'from-[#DAF3FA] to-[#DCEEFF]'}];
 return <section className="bg-[#F2F5FA] py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Un univers à explorer" title="Bien plus qu'un simple carnet de voyage" description="Découvrez les différentes facettes de Wayorbi à travers des pages dédiées et des démonstrations interactives."/><div className="grid md:grid-cols-3 gap-5">{items.map(item=><SiteLink to={item.to} key={item.num} className={`group rounded-[28px] p-7 sm:p-8 min-h-[290px] bg-gradient-to-br ${item.gradient} border border-white flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(70,80,160,.09)] transition-all`}><span className="font-mono text-xs font-bold text-[#526FD8]">{item.num} / WAYORBI</span><div><h3 className="font-display text-2xl font-bold text-[#172445] leading-snug">{item.title}</h3><p className="text-[#51617D] text-sm mt-3 leading-relaxed">{item.sub}</p><span className="inline-flex gap-2 mt-6 items-center text-sm font-bold text-[#2E57D4]">Explorer <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform"/></span></div></SiteLink>)}</div></div></section>;
}
