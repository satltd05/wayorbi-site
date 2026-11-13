import { Bell, Bookmark, Camera, Lock, MessageCircle, Send, Star, Users } from 'lucide-react';
import { TRAVELERS } from '../data/travelers';
import { getTraveler } from '../lib/carnets';
import { demoActions, useDemoState } from '../lib/demoStore';
import TravelerCard from '../components/TravelerCard';
import StoriesRow from '../components/StoriesRow';
import TravelerAvatar from '../components/TravelerAvatar';
import { SiteLink } from '../components/SiteLink';
import DemoNote, { DemoTag } from '../components/DemoNote';
import { CTA, FeatureCard, PageHero, SectionHeading } from './Shared';

const CONVERSATION = [
  { from: 'lena', text: 'Coucou ! Tu as pris le train de nuit pour Huế, finalement ?' },
  { from: 'emma', text: 'Oui, en compartiment de quatre. Je mets les horaires dans mon carnet ce soir.' },
  { from: 'lena', text: 'Super, je l’enregistre pour mon voyage de mars.' },
];

const FORMATS = [
  { icon: <Camera size={20} aria-hidden="true" />, title: 'Stories', text: 'Des moments partagés pendant 24 heures, puis gardés « à la une » sur le profil.', status: 'Démo sur ce site', to: '/communaute#stories' },
  { icon: <Star size={20} aria-hidden="true" />, title: 'Carnets enregistrés', text: 'Garder les carnets qui inspirent un futur voyage et les retrouver dans son espace.', status: 'Démo sur ce site', to: '/mon-espace' },
  { icon: <MessageCircle size={20} aria-hidden="true" />, title: 'Messages et groupes', text: 'Échanges individuels ou en groupe, avec photos, vidéos et messages vocaux.', status: 'Prévu dans l’application', to: '' },
  { icon: <Bell size={20} aria-hidden="true" />, title: 'Notifications', text: 'Être prévenu d’une réponse, d’un nouvel abonné ou d’un carnet publié par un voyageur suivi.', status: 'Prévu dans l’application', to: '' },
];

export default function CommunityPage() {
  const { visibility, follows } = useDemoState();

  return (
    <>
      <PageHero
        kicker="Voyageurs et communauté"
        title="Des voyageurs à suivre, des carnets à échanger"
        description="Wayorbi met en relation les personnes qui voyagent : on suit un profil, on pose une question sous un carnet, on garde les idées pour plus tard. Les profils ci-dessous sont fictifs."
        photos={['bergen-1', 'hue', 'exp-5-b']}
        actions={
          <SiteLink to="/travel-dna" className="btn-primary">
            Trouver des voyageurs qui me ressemblent
          </SiteLink>
        }
      />

      <section id="stories" className="scroll-mt-24 pb-16" aria-labelledby="stories-titre">
        <div className="container-wide">
          <div className="rounded-[1.5rem] border border-line bg-white p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 id="stories-titre" className="font-display text-2xl font-semibold text-ink">
                Stories du moment
              </h2>
              <DemoTag>Stories fictives</DemoTag>
            </div>
            <StoriesRow />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white" aria-labelledby="voyageurs-titre">
        <div className="container-wide">
          <SectionHeading
            id="voyageurs-titre"
            title="Les voyageurs"
            description={
              follows.length > 0
                ? `Tu suis ${follows.length} voyageur${follows.length > 1 ? 's' : ''} : retrouve-les dans ton espace.`
                : 'Chacun a son style : train, randonnée, gastronomie, bains chauds… Suis ceux qui t’inspirent.'
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TRAVELERS.map((traveler) => (
              <TravelerCard key={traveler.id} traveler={traveler} />
            ))}
          </div>
          <DemoNote className="mt-8">Profils fictifs, sans photo de visage. Le bouton « Suivre » fonctionne en démonstration : l’abonnement reste dans ce navigateur.</DemoNote>
        </div>
      </section>

      <section className="section-pad bg-mist" aria-labelledby="echanges-titre">
        <div className="container-wide">
          <SectionHeading id="echanges-titre" title="Échanger, en gardant le contrôle" description="Messages privés, groupes de voyage et choix de visibilité du profil font partie du concept." />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-line bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-ink">Aperçu de la messagerie</h3>
                <span className="tag">Prévu dans l’application</span>
              </div>
              <ul className="mt-5 space-y-3" aria-label="Exemple de conversation fictive">
                {CONVERSATION.map((message, index) => {
                  const author = getTraveler(message.from);
                  if (!author) return null;
                  const mine = message.from === 'lena';
                  return (
                    <li key={index} className={`flex items-end gap-2 ${mine ? '' : 'flex-row-reverse'}`}>
                      <TravelerAvatar traveler={author} size="xs" />
                      <p className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${mine ? 'rounded-bl-sm bg-mist text-ink' : 'rounded-br-sm bg-sky text-white'}`}>{message.text}</p>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-2 text-sm text-muted" aria-hidden="true">
                <span className="flex-1">Écrire un message…</span>
                <Send size={16} />
              </div>
              <DemoNote className="mt-3">Conversation fictive et non interactive : la messagerie n’est pas disponible sur ce site.</DemoNote>
            </div>
            <div className="rounded-[1.5rem] border border-line bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-ink">Profil public ou privé</h3>
                <DemoTag />
              </div>
              <p className="mt-3 text-ink-soft">Un profil public partage ses carnets avec la communauté. Un profil privé les réserve aux personnes approuvées.</p>
              <div role="radiogroup" aria-label="Visibilité de ton profil de démonstration" className="mt-6 grid grid-cols-2 gap-2">
                {(
                  [
                    ['public', 'Public', <Users key="u" size={16} aria-hidden="true" />],
                    ['prive', 'Privé', <Lock key="l" size={16} aria-hidden="true" />],
                  ] as const
                ).map(([value, label, icon]) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={visibility === value}
                    onClick={() => demoActions.setVisibility(value)}
                    className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl border text-sm font-semibold ${visibility === value ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-soft hover:border-sky/40'}`}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
              <p className="mt-4 rounded-2xl bg-mist p-4 text-sm text-ink-soft">
                {visibility === 'public'
                  ? 'Ton profil de démonstration est public : dans l’application, tes carnets publiés seraient visibles par toute la communauté.'
                  : 'Ton profil de démonstration est privé : dans l’application, seules les personnes que tu acceptes verraient tes carnets.'}
              </p>
              <SiteLink to="/mon-espace" className="btn-ghost mt-3">
                <Bookmark size={15} aria-hidden="true" /> Voir mon espace
              </SiteLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white" aria-labelledby="formats-titre">
        <div className="container-wide">
          <SectionHeading id="formats-titre" title="Ce que la communauté pourra faire" description="Certaines fonctions sont déjà démontrées sur ce site ; d’autres viendront avec l’application." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FORMATS.map((format) => (
              <FeatureCard
                key={format.title}
                icon={format.icon}
                title={format.title}
                description={format.text}
                footer={
                  format.to ? (
                    <SiteLink to={format.to} className="tag hover:underline">
                      {format.status}
                    </SiteLink>
                  ) : (
                    <span className="tag bg-mist text-muted">{format.status}</span>
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      <CTA title="Et si tes envies de voyage devenaient des rencontres ?" description="Le Travel DNA suggère des carnets et des voyageurs à partir de huit critères." button="Découvrir mon Travel DNA" to="/travel-dna" />
    </>
  );
}
